import { Metadata } from "next"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { DigitalAsset, fetchAllDigitalAssetByCreator, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'

import { AlbumArtwork } from "@/components/app/nft-studio/album-artwork"
import { PodcastEmptyPlaceholder } from "@/components/app/nft-studio/podcast-empty-placeholder"
import { listenNowAlbums, madeForYouAlbums } from "@/data/albums"
import NftStudioLayout from "@/components/app/nft-studio/layout-page"
import { useEffect, useState } from "react"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { useWallet } from "@solana/wallet-adapter-react"
import { generateSigner, publicKey } from "@metaplex-foundation/umi"
import { any } from "zod"
import { handlePublicKey } from "@/utils/handlePublicKey"
import { it } from "node:test"
import { getMetadata } from "@/utils/getMetadata"

export default function MusicPage() {
    const wallet = useWallet();
    const { connected,publicKey } = wallet
    const [assets, setAssets] = useState<any>();

    const umi = createUmi("https://api.devnet.solana.com")
        .use(walletAdapterIdentity(wallet))
        .use(mplTokenMetadata())

    const mint = generateSigner(umi);


    useEffect(() => {
        const fetchData = async () => {
            if (publicKey) {
                try {
                    const assets = await Promise.all(await fetchAllDigitalAssetByCreator(umi, handlePublicKey(publicKey)));
                    
                    const dataPromises = assets.map(async (item: any) => {
                        console.log(item.metadata.collectionDetails)
                        return await getMetadata(item.metadata.uri);
                    });
                    const data = await Promise.all(dataPromises);
                    setAssets(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [publicKey]);

    return (
        <>
            <NftStudioLayout>

                <div className="h-full px-4 py-6 lg:px-8">
                    <Tabs defaultValue="music" className="h-full space-y-6">
                        <div className="space-between flex items-center">
                            <TabsList>
                                <TabsTrigger value="music" className="relative">
                                    Music
                                </TabsTrigger>
                                <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                                <TabsTrigger value="live" disabled>
                                    Live
                                </TabsTrigger>
                            </TabsList>
                            <div className="ml-auto mr-4">
                                <Button>
                                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                                    Add music
                                </Button>
                            </div>
                        </div>
                        <TabsContent
                            value="music"
                            className="border-none p-0 outline-none"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        Listen Now
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Top picks for you. Updated daily.
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="relative">
                                <ScrollArea>
                                    <div className="flex space-x-4 pb-4">
                                        {assets && assets.map((item: any) =>
                                        //  {
                                        //     console.log(item)

                                        //     return ""
                                        // }
                                            (
                                                <AlbumArtwork
                                                    key={item.name}
                                                    data={item}
                                                    className="w-[250px]"
                                                    aspectRatio="portrait"
                                                    width={250}
                                                    height={330}
                                                />
                                            )
                                        )}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                            <div className="mt-6 space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Made for You
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Your personal playlists. Updated daily.
                                </p>
                            </div>
                            <Separator className="my-4" />
                            <div className="relative">
                                <ScrollArea>
                                    <div className="flex space-x-4 pb-4">
                                        {/* {madeForYouAlbums.map((album) => (
                                            <AlbumArtwork
                                                key={album.name}
                                                album={album}
                                                className="w-[150px]"
                                                aspectRatio="square"
                                                width={150}
                                                height={150}
                                            />
                                        ))} */}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                        </TabsContent>
                        <TabsContent
                            value="podcasts"
                            className="h-full flex-col border-none p-0 data-[state=active]:flex"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        New Episodes
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        Your favorite podcasts. Updated daily.
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <PodcastEmptyPlaceholder />
                        </TabsContent>
                    </Tabs>
                </div>

            </NftStudioLayout>
        </>
    )
}

