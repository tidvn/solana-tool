import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

import KeypairLayout from "@/components/app/keypair/layout-page"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair } from "@solana/web3.js"
import { decodeBase64, decodeUTF8 } from "tweetnacl-util"
import bs58 from "bs58"
import nacl from "tweetnacl"

const profileFormSchema = z.object({
  keypairJson: z.string(),
  message: z.string().max(500).min(4),

})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  keypairJson: "",
  message: "hello from solana",
}

const ProfileForm = () => {
  const wallet = useWallet();
  const [signature, setSignature] = useState("")
  const form = useForm<ProfileFormValues>({
    defaultValues,
    mode: "onChange",
  })


  // toast({
  //   title: "signWithKeypair:",
  //   description: (
  //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //     </pre>
  //   ),
  // })
  function signWithKeypair(data: ProfileFormValues) {
    if (!data.keypairJson) {
      return
    }
    try {
      const secretKey = JSON.parse(data.keypairJson).secretKey;
      const keypair = Keypair.fromSecretKey(bs58.decode(secretKey));
      const messageBytes = decodeUTF8(data.message);
      const signature = nacl.sign.detached(messageBytes, keypair.secretKey);      
      setSignature(bs58.encode(signature));
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
      })
    }

  }
  async function signWithWallet(data: ProfileFormValues) {

    try {
      if (wallet.connected) {
        const publicKey = wallet.publicKey;
        const messageBytes =  decodeUTF8(data.message);
        const signature = await wallet.signMessage(messageBytes);
        setSignature(bs58.encode(signature));
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
      })
    }


  }

  return (
    <KeypairLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => null)} className="space-y-8">
          <FormField
            control={form.control}
            name="keypairJson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KeyPair Json</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          /><div className="flex items-center space-x-2 pt-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">
                signature
              </Label>
              <Textarea
                id="signature"
                name="signature"
                value={signature}
                readOnly
              />
            </div>
          </div>
          <Button onClick={() => form.handleSubmit(signWithKeypair)()} >Sign With KeyPair</Button>
          <Button onClick={() => form.handleSubmit(signWithWallet)()}>Sign With Wallet</Button>

        </form>
      </Form>

    </KeypairLayout>
  )
}

export default ProfileForm
