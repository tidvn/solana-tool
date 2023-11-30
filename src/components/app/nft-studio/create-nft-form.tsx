"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { TrashIcon } from '@radix-ui/react-icons'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@radix-ui/react-separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ImagePicker } from "@/components/app/nft-studio/ImagePicker"
import { uploadImageToIPFS, uploadMetadataToIPFS } from "@/lib/upload"
import { Metaplex, toMetaplexFileFromBrowser } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl } from "@solana/web3.js";


const nftFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  symbol: z.string().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  type: z.string().optional(),
  royalty: z.string().max(2, { message: "Royalty must be less than 99" }).refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }).default("0").optional(),
  attributes: z
    .array(
      z.object({
        trait_type: z.string().min(2, { message: "Please enter a type." }),
        value: z.string().min(2, { message: "Please enter a value." }),
      })
    )
    .optional(),

})

type NftFormValues = z.infer<typeof nftFormSchema>

export function CreateNftForm() {
  const [file, setFile] = useState<File>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const connection = new Connection(clusterApiUrl("devnet"));
  const form = useForm<NftFormValues>({
    resolver: zodResolver(nftFormSchema),
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "attributes",
    control: form.control,
  })

  async function onSubmit(data: NftFormValues) {
    try {
      setIsLoading(true)
      if (!file) {
        return
      }
      // const { uri, metadata } = await metaplex
      //   .nfts()
      //   .uploadMetadata({
      //     name: data.name,
      //     description: data.description,
      //     symbol: data.symbol,
      //     external_url: data.link,
      //     attributes: data.attributes,
      //     image: await toMetaplexFileFromBrowser(file)
      //   });
      // const nft = await metaplex
      //   .nfts()
      //   .create({
      //     uri,
      //     name: data.name,
      //     sellerFeeBasisPoints: 100 * parseInt(data.royalty ? data.royalty : ""),
      //   });
      //   console.log(nft)
      // const image_cid = await uploadImageToIPFS(file)
      // const uri_data = {
      //   name: data.name,
      //   description: data.description,
      //   symbol: data.symbol,
      //   image: `ipfs://${image_cid}`,
      //   external_url: data.link,
      //   seller_fee_basis_points: 100 * parseInt(data.royalty ? data.royalty : ""),
      //   attributes: data.attributes
      // }
      // const uri = await uploadMetadataToIPFS(uri_data)
      //   let tx = createNft (umi,{
      //     mint,
      //     name: data.name,
      //     symbol: data.symbol,
      //     uri: uri,
      //     sellerFeeBasisPoints: percentAmount(3,2)
      // }) 
    } catch (e: any) {
      console.log(e.message)
    } finally {
      setIsLoading(false)
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <div className="h-full px-4 py-6 lg:px-8">

      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0  rounded-md border border-dashed">

        <div className="lg:p-8 ">
          <ImagePicker setFile={setFile} />

        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create NFT
              </h1>
              <p className="text-sm text-muted-foreground">
                You can create a single NFT or editions. Open Editions allow you to create an unlimited number of prints. Limited Editions allow you to set a limit to how many prints can be created from the original.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="basics" className="h-full space-y-6">
                  <div className="space-between flex items-center">
                    <TabsList>
                      <TabsTrigger value="basics" className="relative">
                        Basics
                      </TabsTrigger>
                      <TabsTrigger value="properties">Properties</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent
                    value="basics"
                    className="border-none p-0 outline-none"
                  ><FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a Name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="symbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Symbol</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a symbol" {...field} />
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
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the website or link to your project" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NFT type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue="1f1">
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1f1">One of One</SelectItem>
                              <SelectItem value="limited">Limited Edition</SelectItem>
                              <SelectItem value="open">Open Edition</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="royalty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sales Royalties</FormLabel>
                          <FormControl>
                            <Input type="number"  {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />


                  </TabsContent>
                  <TabsContent
                    value="properties"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                  >
                    <div>
                      {fields.map((field, index) => (<>
                        <div className="mt-4 grid grid-cols-12 gap-2">
                          <div className="col-span-5">
                            <FormField
                              control={form.control}
                              key={field.id}
                              name={`attributes.${index}.trait_type`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="e. g. Size"  {...field} />
                                  </FormControl>
                                  <FormMessage />

                                </FormItem>
                              )}
                            /></div>
                          <div className="col-span-6">
                            <FormField
                              control={form.control}
                              key={field.id}
                              name={`attributes.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="e. g. Medium" {...field} />
                                  </FormControl>
                                  <FormMessage />

                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="col-span-1"><Button
                            type="button"
                            variant="outline"
                            className="p-2"
                            onClick={() => remove(index)}
                          >
                            <TrashIcon />
                          </Button></div>

                        </div>

                      </>

                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ trait_type: "", value: "" })}
                      >
                        Add Property
                      </Button>
                    </div>
                    <Separator className="my-4" />
                  </TabsContent>
                </Tabs>
                <Button type="submit" disabled={isloading}>{isloading ? "Creating..." : "Create NFT"} </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>


  )
}