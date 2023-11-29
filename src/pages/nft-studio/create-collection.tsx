
import { CreateCollectionForm } from "@/components/app/nft-studio/create-collection-form"
import NftStudioLayout from "@/components/app/nft-studio/layout-page"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import Image from "next/image"
import { cn } from "@/lib/utils";


export default function CreateCollectionPage() {
    const [imageBlob, setImageBlob] = useState<string>('');
    console.log(imageBlob)
    return (
        <>
            <NftStudioLayout>
                <div className="h-full px-4 py-6 lg:px-8">
                    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0  rounded-md border border-dashed">

                        <div className="lg:p-8 ">
                            <div style={{width: '100%', height: '100%', position: 'relative'}}  className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                                {imageBlob != "" && (<Image
                                    src={imageBlob}
                                    alt="collection"
                                    fill={true}
                                    objectFit='contain'
                                    className={cn(
                                        "h-auto w-auto object-cover transition-all aspect-[3/4]"
                                    )}
                                />)}
                            </div>

                        </div>
                        <div className="lg:p-8">
                            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                                <div className="flex flex-col space-y-2 text-left">
                                    <h1 className="text-2xl font-semibold tracking-tight">
                                        Create collection NFT
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Creating a collection NFT is required to ensure your NFTs are easily searchable and grouped together in wallets and marketplaces.
                                    </p>
                                </div>
                                <CreateCollectionForm setImageBlob={setImageBlob} />

                            </div>
                        </div>
                    </div>
                </div>

            </NftStudioLayout>
        </>
    )
}

