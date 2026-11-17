"use client";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Word-by-word masked reveal. Each word slides up from behind a clip mask.
 * Screen readers get the full sentence via aria-label.
 */
export default function SplitText({
  text,
  as = "span",
  className,
  wordClassName,
  highlight = [],
  highlightClassName = "text-gradient",
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}) {
  const Cmp = motion[as] ?? motion.span;
  const words = text.split(" ");
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Cmp
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${wordClassName ?? ""} ${
              highlight.includes(word) ? highlightClassName : ""
            }`}
            variants={{
              hidden: { y: "110%", rotate: 4 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Cmp>
  );
}
