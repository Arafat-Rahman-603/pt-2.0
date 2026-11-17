"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar({ navigation, siteName }) {
  const { links, brand, cta } = navigation;
  const [active, setActive] = useState(links[0]?.id);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Compact on scroll, hide while scrolling down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Active section via IntersectionObserver (no scroll math)
  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [links]);

  // Close on Escape, lock scroll while menu open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[padding] duration-500",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full transition-all duration-500",
            scrolled
              ? "max-w-4xl border border-white/10 bg-[#030712]/70 px-3 py-2 pl-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "max-w-7xl border border-transparent px-2 py-2"
          )}
        >
          <a href="#home" className="group flex items-center gap-0.5 font-display text-xl font-bold tracking-tight" aria-label={`${siteName} — home`}>
            <span className="text-gradient">{brand}</span>
            <span className="text-cyan-400 transition-transform duration-300 group-hover:scale-150">.</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active === id ? "text-white" : "text-gray-400 hover:text-gray-100"
                    )}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={cta.href}
              data-cursor="hover"
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 sm:inline-flex"
            >
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" aria-hidden="true" />
              {cta.label}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass grid size-11 place-items-center rounded-full text-gray-200 md:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-[#030712]/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                className="space-y-2"
              >
                {links.map(({ id, label, icon }, i) => (
                  <motion.li
                    key={id}
                    variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { ease: EASE, duration: 0.6 } } }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-4 rounded-2xl border px-4 py-4 font-display text-2xl font-semibold transition-colors",
                        active === id ? "border-cyan-400/30 bg-cyan-400/10 text-white" : "border-transparent text-gray-400"
                      )}
                    >
                      <span className="font-mono text-xs text-gray-600">{String(i + 1).padStart(2, "0")}</span>
                      <Icon name={icon} className="size-5 text-cyan-400" />
                      {label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 py-4 font-semibold text-white"
            >
              <span className="size-2 rounded-full bg-emerald-300" aria-hidden="true" />
              {cta.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
