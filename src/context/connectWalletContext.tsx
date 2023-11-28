import type { FC } from "react"
import React, { useMemo } from "react"
import {
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
  SolanaMobileWalletAdapter,
} from "@solana-mobile/wallet-adapter-mobile"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  // BackpackWalletAdapter,
  // GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  // SolflareWalletAdapter,
  // SolletExtensionWalletAdapter,
  // SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

// Default styles that can be overridden by your app
// require("@/styles/wallet.css")

type Props = {
  children?: React.ReactNode
}
export const Wallet: FC<Props> = ({ children }: Props) => {
  const network = WalletAdapterNetwork.Devnet

  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: "Solana Tool",
          uri: "https://solana-tool.vercel.app",
          icon: "https://github.com/fluidicon.png",
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: WalletAdapterNetwork.Devnet,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),
      // new BackpackWalletAdapter(),
      new PhantomWalletAdapter(),
      // new SolflareWalletAdapter({ network }),
      // new GlowWalletAdapter(),
      new LedgerWalletAdapter(),
      // new SolletWalletAdapter({ network }),
      // new SlopeWalletAdapter(),
      // new SolletExtensionWalletAdapter({ network }),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
