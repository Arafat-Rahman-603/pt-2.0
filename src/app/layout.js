import "@/app/globals.css";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import { buildMetadata, buildJsonLd, viewport as siteViewport } from "@/lib/seo";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = buildMetadata();
export const viewport = siteViewport;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="grain overflow-x-clip bg-ink text-gray-200 antialiased">
        {/* Structured data for search engines & AI assistants */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Script
          src={site.chatWidget.src}
          data-business-id={site.chatWidget.businessId}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
