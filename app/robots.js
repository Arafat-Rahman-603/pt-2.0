// Dynamic robots.txt generation following Next.js App Router guidelines
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://arafatcodes.vercel.app/sitemap.xml",
  };
}
