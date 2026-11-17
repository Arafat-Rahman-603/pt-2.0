"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/useMediaQuery";

/**
 * Ring + dot cursor. Mouse-only (hidden on touch), driven by motion values
 * so moving the mouse never re-renders React. Grows over links / buttons
 * via event delegation (works for elements added later too).
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => setHover(!!e.target.closest("a, button, [data-cursor='hover'], input, textarea, label"));
    const leave = () => setVisible(false);
    const md = () => setDown(true);
    const mu = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", md);
    window.addEventListener("pointerup", mu);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", md);
      window.removeEventListener("pointerup", mu);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}>
      <motion.div
        className="absolute left-0 top-0 -ml-5 -mt-5 size-10 rounded-full border border-cyan-300/70 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.8 : hover ? 1.8 : 1, backgroundColor: hover ? "rgba(34,211,238,0.12)" : "rgba(34,211,238,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      <motion.div
        className="absolute left-0 top-0 -ml-1 -mt-1 size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
        style={{ x, y }}
        animate={{ scale: hover ? 0 : 1 }}
      />
    </div>
  );
}
