"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // hamburger icons

const sections = ["home", "projects", "about", "skills", "education", "resume", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-gray-900/80 dark:bg-gray-900/80 text-white transition-colors duration-300"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
    >
      {/* Brand */}
      <h1 className="font-bold text-xl">Arafat</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`capitalize transition-colors ${
              active === id ? "text-blue-400 font-semibold" : "hover:text-blue-400"
            }`}
          >
            {id}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-lg focus:outline-none"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="absolute top-0 right-0 w-2/3 h-screen bg-gray-900 text-white flex flex-col gap-6 p-6 shadow-lg md:hidden"
        >
          <button
            className="self-end mb-4"
            onClick={() => setMobileOpen(false)}
          >
            <X size={28} />
          </button>
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              className={`capitalize text-lg ${
                active === id ? "text-blue-400 font-semibold" : "hover:text-blue-400"
              }`}
            >
              {id}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
