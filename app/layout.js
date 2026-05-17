import "@/app/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Arafat's Code",
  description:
    "Portfolio of Arafat Rahman - Frontend Developer from Bangladesh",

  openGraph: {
    title: "Arafat's Code",
    description:
      "Portfolio of Arafat Rahman - Frontend Developer from Bangladesh",
    url: "https://arafatcodes.vercel.app",
    images: [
      {
        url: "https://arafatcodes.vercel.app/preview.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arafat's Code",
    description:
      "Portfolio of Arafat Rahman - Frontend Developer from Bangladesh",
    images: ["https://arafatcodes.vercel.app/preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-white overflow-x-hidden">
        {children}
      </body>
      <Script
        src="https://aether-ai-support.vercel.app/AetherAI.js"
        data-business-id="user_3BZsYd7NMzub7pnZ3PFXyimBBCQ"
      />
    </html>
  );
}
