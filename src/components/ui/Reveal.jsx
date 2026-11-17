"use client";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Fades + slides children in when scrolled into view.
 * `as` lets you render any motion element (div, li, section…).
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 40,
  x = 0,
  scale = 1,
  blur = false,
  once = true,
  amount = 0.25,
  className,
  ...rest
}) {
  const Cmp = motion[as] ?? motion.div;
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

/** Parent that staggers its <RevealItem> children. */
export function RevealGroup({ children, className, stagger = 0.08, amount = 0.2, as = "div" }) {
  const Cmp = motion[as] ?? motion.div;
  return (
    <Cmp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Cmp>
  );
}

export function RevealItem({ children, className, as = "div", y = 30, ...rest }) {
  const Cmp = motion[as] ?? motion.div;
  return (
    <Cmp
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Cmp>
  );
}
