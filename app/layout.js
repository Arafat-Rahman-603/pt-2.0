import "@/app/globals.css";

export const metadata = {
  title: "Arafat Rahman | Frontend Developer",
  description: "Portfolio of Arafat Rahman - Frontend Developer from Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}