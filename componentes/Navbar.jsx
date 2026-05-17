"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, FolderOpen, User, Zap, Mail } from "lucide-react";

const sections = [
  { id: "home", icon: Home },
  { id: "projects", icon: FolderOpen },
  { id: "about", icon: User },
  { id: "skills", icon: Zap },
  { id: "contact", icon: Mail },
];

const sidebarVariants = {
  closed: { x: "100%", opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.06, delayChildren: 0.15 } },
  exit: { x: "100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
};

const linkVariants = {
  closed: { x: 40, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 200;
      sections.forEach(({ id }) => {
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#030712]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
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
          {sections.map(({ id }) => (
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
        <motion.button
          className="md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              style={{ zIndex: 55 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed top-0 right-0 w-[280px] h-screen md:hidden flex flex-col"
              style={{
                zIndex: 60,
                background: "linear-gradient(195deg, rgba(6,182,212,0.08) 0%, rgba(3,7,18,0.97) 30%, rgba(3,7,18,0.99) 100%)",
                backdropFilter: "blur(24px) saturate(1.4)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
                  Navigation
                </span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 my-3 h-px bg-gradient-to-r from-cyan-500/30 via-white/8 to-transparent" />

              {/* Nav Links */}
              <div className="flex flex-col gap-1 px-4 py-2 flex-1">
                {sections.map(({ id, icon: Icon }, index) => {
                  const isActive = active === id;
                  return (
                    <motion.a
                      key={id}
                      variants={linkVariants}
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      className="relative group flex items-center gap-4 px-4 py-3.5 rounded-2xl capitalize text-[15px] font-medium transition-all duration-300"
                      style={{
                        background: isActive ? "rgba(6,182,212,0.1)" : "transparent",
                        border: isActive ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                          style={{
                            background: "linear-gradient(180deg, #22d3ee, #3b82f6)",
                            boxShadow: "0 0 12px rgba(34,211,238,0.5)",
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2))"
                            : "rgba(255,255,255,0.04)",
                          border: isActive
                            ? "1px solid rgba(6,182,212,0.3)"
                            : "1px solid rgba(255,255,255,0.06)",
                          boxShadow: isActive ? "0 0 16px rgba(6,182,212,0.15)" : "none",
                        }}
                      >
                        <Icon
                          size={18}
                          className={`transition-colors duration-300 ${
                            isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
                          }`}
                        />
                      </div>

                      {/* Label */}
                      <span
                        className={`transition-colors duration-300 ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                        }`}
                      >
                        {id}
                      </span>

                      {/* Active dot */}
                      {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                      )}
                    </motion.a>
                  );
                })}
              </div>

              {/* Bottom section */}
              <div className="p-4 mt-auto">
                {/* Divider */}
                <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* Hire Me CTA */}
                <motion.a
                  variants={linkVariants}
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="relative flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-2xl text-[15px] font-semibold text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #2563eb, #06b6d4)",
                    boxShadow: "0 4px 20px rgba(6,182,212,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                  Hire Me
                </motion.a>

                {/* Credit */}
                <p className="text-center text-[10px] text-gray-600 mt-4 tracking-wide">
                  © {new Date().getFullYear()} Arafat Rahman
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
