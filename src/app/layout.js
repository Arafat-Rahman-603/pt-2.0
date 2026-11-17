import "@/app/globals.css";
import Script from "next/script";

// Complete SEO and AI-focused metadata configuration following Next.js App Router best practices
export const metadata = {
  // Base URL for resolving relative social sharing images or URLs
  metadataBase: new URL("https://arafatcodes.vercel.app"),

  // Search Engine Verification (Google Search Console)
  verification: {
    google: "F5Yfey5DY9iRhWKZ6SDon_5oqUGWtqqYr30K6xJuDtw",
  },

  // Keywords to assist AI models & standard indexers in categorization
  keywords: [
    "Arafat Rahman",
    "Arafatcodes",
    "Full Stack Software Developer",
    "Frontend Developer Bangladesh",
    "MERN Stack Developer",
    "Next.js Developer Dhaka",
    "React Developer",
    "Software Engineer Portfolio"
  ],

  // Canonical and template titles
  title: {
    default: "Arafat Rahman | Full Stack Software Developer Portfolio",
    template: "%s | Arafat Rahman"
  },

  // Concise, highly descriptive description optimized for search snippets and AI summaries
  description:
    "Official portfolio of Arafat Rahman, Full Stack Software Developer from Bangladesh specializing in React, Next.js, Node.js, and MongoDB. Browse projects, skills, and resume.",

  // Canonical URL settings to eliminate duplicate content issues
  alternates: {
    canonical: "/",
  },

  // Open Graph configuration for rich media previews on social channels (Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    title: "Arafat Rahman | Full Stack Software Developer Portfolio",
    description:
      "Official portfolio of Arafat Rahman, Full Stack Software Developer from Bangladesh specializing in React, Next.js, Node.js, and MongoDB.",
    url: "https://arafatcodes.vercel.app",
    siteName: "Arafat Rahman Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Arafat Rahman - Portfolio Website Preview"
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter/X Card configuration
  twitter: {
    card: "summary_large_image",
    title: "Arafat Rahman | Full Stack Software Developer Portfolio",
    description:
      "Official portfolio of Arafat Rahman, Full Stack Software Developer from Bangladesh specializing in React, Next.js, Node.js, and MongoDB.",
    images: ["/preview.png"],
  },

  // Robots directions to allow full crawling and high-quality snippets
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  // Schema.org structured data to enable Google Rich Results and help AI overview systems map profiles correctly
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Arafat Rahman",
    "jobTitle": "Full Stack Software Developer",
    "url": "https://arafatcodes.vercel.app",
    "image": "https://arafatcodes.vercel.app/pic1.png",
    "description": "Full Stack Software Developer from Bangladesh specializing in React, Next.js, Node.js, MongoDB, and modern web applications.",
    "sameAs": [
      "https://github.com/Arafat-Rahman-603",
      "https://www.linkedin.com/in/arafatrahman603",
      "https://www.facebook.com/profile.php?id=100080753802018"
    ],
    "knowsAbout": [
      "Software Development",
      "Web Development",
      "Full Stack Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
      "MERN Stack"
    ],
    "gender": "Male",
    "nationality": {
      "@type": "Country",
      "name": "Bangladesh"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Arafat Rahman Portfolio",
    "url": "https://arafatcodes.vercel.app",
    "author": {
      "@type": "Person",
      "name": "Arafat Rahman"
    },
    "description": "Portfolio website of Arafat Rahman, Full Stack Software Developer."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://arafatcodes.vercel.app"
      }
    ]
  };

  return (
    <html lang="en">
      <body className="bg-[#030712] text-white overflow-x-hidden">
        {/* Injecting JSON-LD schema blocks inside script tags to feed structured metadata to AI assistants and crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema, breadcrumbSchema])
          }}
        />
        {children}
        {/* Moved third-party analytics script inside the body wrapper for compliance with HTML validation standards */}
        <Script
          src="https://aether-ai-support.vercel.app/AetherAI.js"
          data-business-id="user_3BZsYd7NMzub7pnZ3PFXyimBBCQ"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

