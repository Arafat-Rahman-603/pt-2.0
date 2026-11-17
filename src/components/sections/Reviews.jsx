"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

function ReviewCard({ r }) {
  return (
    <TiltCard max={7} className="h-full rounded-3xl">
      <figure className="glass relative flex h-full flex-col rounded-3xl p-7 md:p-8">
        <Quote className="size-10 text-cyan-400/30" aria-hidden="true" />
        <div className="mt-4 flex gap-1" role="img" aria-label={`${r.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-white/15"}`} aria-hidden="true" />
          ))}
        </div>
        <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-gray-300">“{r.review}”</blockquote>
        <figcaption className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
          <span
            className="grid size-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-lg"
            style={{ background: `linear-gradient(135deg, ${r.accentFrom}, ${r.accentTo})` }}
            aria-hidden="true"
          >
            {r.avatar}
          </span>
          <span className="min-w-0">
            <span className="block truncate font-semibold text-white">{r.name}</span>
            <span className="block truncate text-xs text-cyan-300/80">{r.project}</span>
          </span>
        </figcaption>
      </figure>
    </TiltCard>
  );
}

export default function Reviews({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // staggered parallax columns
  const ys = [
    useTransform(scrollYProgress, [0, 1], [60, -60]),
    useTransform(scrollYProgress, [0, 1], [120, -120]),
    useTransform(scrollYProgress, [0, 1], [30, -30]),
  ];

  return (
    <section id="reviews" ref={ref} className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {data.items.map((r, i) => (
            <motion.div key={r.name} style={{ y: ys[i % ys.length] }} className="max-md:transform-none!">
              <Reveal delay={i * 0.1} y={60} className="h-full">
                <ReviewCard r={r} />
              </Reveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
