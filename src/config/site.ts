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
      title: "dashboard",
      href: "/dashboard",
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
}
