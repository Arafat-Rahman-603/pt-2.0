import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { cn } from "@/lib/utils";

/** Eyebrow + split-text title + subtitle used by every section. */
export default function SectionHeading({ eyebrow, title, highlight, subtitle, align = "center", className }) {
  const full = [title, highlight].filter(Boolean).join(" ");
  const highlightWords = highlight ? highlight.split(" ") : [];

  return (
    <div className={cn("mb-14 md:mb-20", align === "center" ? "text-center mx-auto" : "text-left", "max-w-3xl", className)}>
      {eyebrow && (
        <Reveal y={12} className={cn("mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-400" />
          <span className="font-display text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/90">{eyebrow}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-400" />
        </Reveal>
      )}
      <SplitText
        as="h2"
        text={full}
        highlight={highlightWords}
        className="block font-display text-[clamp(2.25rem,1.5rem+3.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white"
      />
      {subtitle && (
        <Reveal delay={0.15} y={20}>
          <p className={cn("mt-5 text-base leading-relaxed text-gray-400 md:text-lg", align === "center" && "mx-auto max-w-xl")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
