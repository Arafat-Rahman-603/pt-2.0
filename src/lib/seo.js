import { site, socials } from "@/lib/content";

/** Next.js App Router metadata built from portfolio.json */
export function buildMetadata() {
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: site.titleTemplate },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    verification: { google: site.googleVerification },
    alternates: { canonical: "/" },
    openGraph: {
      title: site.title,
      description: site.shortDescription,
      url: site.url,
      siteName: `${site.name} Portfolio`,
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} - Portfolio Website Preview` }],
      locale: site.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.shortDescription,
      images: [site.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
};

/** Schema.org JSON-LD blocks (Person, WebSite, Breadcrumb) */
export function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      url: site.url,
      image: `${site.url}${site.profileImage}`,
      description: site.shortDescription,
      sameAs: socials.map((s) => s.href),
      knowsAbout: site.knowsAbout,
      gender: "Male",
      nationality: { "@type": "Country", name: site.country },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${site.name} Portfolio`,
      url: site.url,
      author: { "@type": "Person", name: site.name },
      description: `Portfolio website of ${site.name}, ${site.role}.`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site.url }],
    },
  ];
}
