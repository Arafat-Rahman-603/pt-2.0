"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setHovering(true);
    const removeHover = () => setHovering(false);

    window.addEventListener("mousemove", move);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-cyan-400 pointer-events-none z-100 mix-blend-difference"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: hovering ? 1.6 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 pointer-events-none z-50 shadow-[0_0_15px_rgba(34,211,238,0.9)]"
        animate={{
          x: pos.x - 6,
          y: pos.y - 6,
          scale: hovering ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );
}
