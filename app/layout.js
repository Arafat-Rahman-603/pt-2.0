import "@/app/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Arafat Rahman | Frontend Developer",
  description:
    "Portfolio of Arafat Rahman - Frontend Developer from Bangladesh",
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
