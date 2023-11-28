"use client"

import Link from "next/link"
import type { Wallet } from "@solana/wallet-adapter-react"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ConnectWallet } from "@/components/app/header/WalletButton"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const { toast } = useToast()
  const onConnectWallet = async () => {
    try {
      toast({
        description: "Connected",
      })
    } catch (e) {
      toast({
        description: "Wallet not found.",
      })
    }
  }
  return (
    // bg-background
    <header className="sticky bg-background top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ConnectWallet />

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
