import { site } from "@/lib/content";

// Dynamic sitemap.xml (Next.js App Router)
export default function sitemap() {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
