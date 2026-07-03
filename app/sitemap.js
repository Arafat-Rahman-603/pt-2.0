// Dynamic sitemap generation following Next.js App Router guidelines
export default function sitemap() {
  const baseUrl = "https://arafatcodes.vercel.app";

  // Returns sitemap nodes with page URL, modification date, crawl frequency and priority
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
