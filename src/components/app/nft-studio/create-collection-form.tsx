"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { MediaPicker } from "degen"
import { useState } from "react"
import { Card } from "@/components/ui/card"

const profileFormSchema = z.object({
  collectionName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),

  description: z.string().max(160).min(0),

})

type ProfileFormValues = z.infer<typeof profileFormSchema>



export function CreateCollectionForm({ setImageBlob }: any) {
  const [uploadLoading, setuploadLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  })



  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MediaPicker
          onChange={async (file) => {
            setuploadLoading(true);
            if (file) {
              const blobUrl = URL.createObjectURL(file);
              setImageBlob(blobUrl);
            }else{
              setImageBlob("");
            }
            setuploadLoading(false);
          }
          }
          onReset={() => {
            setImageBlob('');
            setImageUrl('');
            setuploadLoading(false);
          }}
          compact
          label="Choose or drag and drop media"
        />
        <FormField
          control={form.control}
          name="collectionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name(Required)</FormLabel>
              <FormControl>
                <Input placeholder="Enter a Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}