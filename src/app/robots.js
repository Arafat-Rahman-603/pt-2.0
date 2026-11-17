import { site } from "@/lib/content";

// Dynamic robots.txt (Next.js App Router)
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
