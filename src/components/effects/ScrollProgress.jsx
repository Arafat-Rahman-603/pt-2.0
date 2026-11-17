"use client";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

/** Thin gradient progress bar at the top + circular back-to-top button. */
export default function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const dash = useTransform(progress, [0, 1], [151, 0]);
  const [show, setShow] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 600));

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
      />
      <AnimatePresence>
        {show && (
          <motion.button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="glass fixed bottom-6 left-6 z-40 grid size-14 place-items-center rounded-full text-cyan-300"
          >
            <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
              <motion.circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="url(#sp-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="151"
                style={{ strokeDashoffset: dash }}
              />
              <defs>
                <linearGradient id="sp-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <ArrowUp className="size-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
