"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn, isExternal } from "@/lib/utils";

/**
 * Link/button that is gently pulled toward the cursor (desktop only —
 * touch devices never fire pointermove without a press, so it's inert there).
 */
export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  strength = 0.35,
  download,
  onClick,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    primary:
      "text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 shadow-[0_10px_40px_-10px_rgba(34,211,238,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(34,211,238,0.75)]",
    ghost: "text-gray-100 glass hover:bg-white/10",
  };

  const external = isExternal(href);
  const Cmp = href ? motion.a : motion.button;

  return (
    <Cmp
      ref={ref}
      href={href}
      download={download}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      data-cursor="hover"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-[box-shadow,background-color] duration-300",
        styles[variant],
        className
      )}
      {...rest}
    >
      {/* sheen sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </Cmp>
  );
}
