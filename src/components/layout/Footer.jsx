"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Icon from "@/components/ui/Icon";

export default function Footer({ data, navigation, socials, siteName }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/5 pt-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-60 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative px-5 sm:px-8 lg:px-16">
      <div className="container-x">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-2xl font-bold text-gradient">{siteName}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{data.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
              {navigation.links.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group relative text-sm text-gray-400 transition-colors hover:text-white">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  data-cursor="hover"
                  className="glass grid size-11 place-items-center rounded-full text-gray-400 transition-[color,transform] hover:-translate-y-1 hover:text-white"
                >
                  <Icon name={s.icon} className="size-4" />
                  <span className="sr-only">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Giant scroll-scaled sign-off */}
        <motion.p
          aria-hidden="true"
          style={{ y, scale }}
          className="mt-16 select-none text-balance text-center font-display text-[clamp(2.25rem,0.5rem+5vw,6.5rem)] font-bold leading-[0.95] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.3)]"
        >
          {data.bigText}
        </motion.p>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-xs text-gray-500 sm:flex-row">
          <p>
            © {year} <span className="text-gray-300">{siteName}</span>. All rights reserved.
          </p>
          <p>{data.credit}</p>
          <a href="#home" className="inline-flex items-center gap-1.5 text-gray-400 transition-colors hover:text-cyan-300">
            Back to top <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
}
