import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/app/keypair/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Generate KeyPair",
    href: "/keypair/generate",
  },
  {
    title: "Convert KeyPair",
    href: "/keypair/convert",
  },
  {
    title: "Sign Messgae",
    href: "/keypair/sign",
  },
]

interface KeypairLayoutProps {
  children: React.ReactNode
}

export default function KeypairLayout({ children }: KeypairLayoutProps) {
  return (
    <>
      
      <div className="hidden space-y-6 p-8 pt-6 md:block">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
