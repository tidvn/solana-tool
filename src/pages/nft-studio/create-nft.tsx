
import { CreateNftForm } from "@/components/app/nft-studio/create-nft-form"
import NftStudioLayout from "@/components/app/nft-studio/layout-page"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Image from "next/image"
import { cn } from "@/lib/utils";
import { MediaPicker } from "degen";
import { ImagePicker } from "@/components/app/nft-studio/ImagePicker";


export default function CreateNftPage() {
    const [imageBlob, setImageBlob] = useState<string>('');
    console.log(imageBlob)
    return (
        <>
            <NftStudioLayout>
                <div className="h-full px-4 py-6 lg:px-8">
                    
                    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0  rounded-md border border-dashed">

                        <div className="lg:p-8 ">
                            <ImagePicker/>

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
                                <CreateNftForm setImageBlob={setImageBlob} />

                            </div>
                        </div>
                    </div>
                </div>

            </NftStudioLayout>
        </>
    )
}

