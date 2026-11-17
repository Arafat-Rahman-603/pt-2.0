"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Buttery smooth scrolling (Lenis). Native sticky / useScroll keep working
 * because Lenis drives the real window scroll position.
 * Disabled entirely for users who prefer reduced motion.
 */
export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return children;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: { offset: -72 },
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
