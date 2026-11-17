"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Two rows of tech names that slide in opposite directions as you scroll.
 * Scroll-linked (not auto-playing), so it never moves on its own.
 */
export default function TechMarquee({ items }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);
  const row = [...items, ...items, ...items];

  return (
    <section ref={ref} aria-label="Technologies" className="relative overflow-hidden py-10 md:py-14">
      <div className="mask-fade-x -rotate-2 space-y-4">
        {[x1, x2].map((x, r) => (
          <motion.ul
            key={r}
            style={reduce ? undefined : { x }}
            className="flex w-max gap-4 whitespace-nowrap"
            aria-hidden={r === 1 ? "true" : undefined}
          >
            {row.map((t, i) => (
              <li
                key={`${t}-${i}`}
                className={
                  r === 0
                    ? "font-display text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-bold uppercase tracking-tight text-white/90"
                    : "font-display text-[clamp(1.75rem,1rem+3vw,3.5rem)] font-bold uppercase tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.45)]"
                }
              >
                {t}
                <span className="mx-4 text-cyan-400/80" aria-hidden="true">✦</span>
              </li>
            ))}
          </motion.ul>
        ))}
      </div>
    </section>
  );
}
