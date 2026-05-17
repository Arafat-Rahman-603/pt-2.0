"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = ["home", "projects", "about", "skills", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-gray-950/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "py-5 bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <motion.a
          href="#home"
          className="text-xl font-bold tracking-tight"
          whileHover={{ scale: 1.04 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Arafat
          </span>
          <span className="text-white">.</span>
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="relative px-4 py-2 rounded-lg capitalize text-sm font-medium transition-colors duration-200 group"
            >
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  active === id ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {id}
              </span>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-lg bg-white/8 border border-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* Hire Me CTA */}
          <motion.a
            href="#contact"
            className="ml-3 relative inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:opacity-90" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500 to-blue-600" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Hire Me
            </span>
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-72 h-screen bg-gray-950/95 backdrop-blur-2xl border-l border-white/10 flex flex-col p-8 shadow-2xl md:hidden"
          >
            <button
              className="self-end mb-8 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-2">
              {sections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`capitalize px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    active === id
                      ? "bg-white/8 text-white border border-white/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  {id}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-4 py-3 rounded-xl text-base font-semibold text-white text-center bg-gradient-to-r from-blue-600 to-cyan-500"
              >
                <span className="inline-flex items-center gap-2 justify-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Hire Me
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
