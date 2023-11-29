import { Metadata } from "next"
import { Sidebar } from "@/components/app/nft-studio/sidebar"
import { playlists } from "@/data/playlists"


interface LayoutProps {
    children: React.ReactNode
}
export default function NftStudioLayout({ children }: LayoutProps) {
    return (
        <>
            <div className="hidden md:block">
                <div className="border-t">
                    <div className="bg-background">
                        <div className="grid lg:grid-cols-5">
                            <Sidebar playlists={playlists} className="hidden lg:block" />
                            <div className="col-span-3 lg:col-span-4 lg:border-l">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}