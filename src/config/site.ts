export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Solana Tool",
  description:
    "Solana Tool",
  mainNav: [
    {
      title: "KeyPair",
      href: "/keypair/generate",
    },
    {
      title: "NFT Studio",
      href: "/nft-studio",
    },
    {
      title: "forms",
      href: "/forms",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/tidvn/solana-tool",
    docs: "https://ui.shadcn.com",
  },
  nftstorage_api_key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzQTFkMEMzN0Y0MURBMzQzQWY3MzE0NUMwYzBhMGJmQkY5QTNiRTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMTI3NDcwMzg2NCwibmFtZSI6InNvbGFuYS10b29sIn0.3qxPcEmBou5-IQEya1od-F_QwGKjHAMOYUTWR2Rz8MQ",
}
