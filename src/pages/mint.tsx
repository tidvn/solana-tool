import { Button } from "@/components/ui/button";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";


export default function MintPage() {
  const StartMint = () => {
    let tx = createNft(umi, {
      mint,
      name: "Nurs #1",
      symbol: "TDNFT",
      uri: nft.uri,
      sellerFeeBasisPoints: percentAmount(3, 2)
    })
  }
  return (
    <Button onClick={StartMint} >mint</Button>
  )
}
