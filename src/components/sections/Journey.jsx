"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

/**
 * "Digital brochure" reimagined as scroll-stacking chapter cards:
 * each card pins, and shrinks back as the next one slides over it.
 */
function ChapterCard({ chapter, index, total, progress }) {
  const targetScale = 1 - (total - index - 1) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [0, index === total - 1 ? 0 : 0.35]);

  return (
    <div className="sticky flex h-[78dvh] items-start justify-center" style={{ top: `calc(6rem + ${index * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1022]/90 p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-10 md:p-12"
      >
        {/* accent glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(circle, ${chapter.accentFrom}, transparent 70%)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${chapter.accentTo}, transparent 70%)` }}
        />

        <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <div className="flex items-center gap-5 md:flex-col md:items-start">
            <span
              className="font-display text-7xl font-bold leading-none text-transparent md:text-9xl"
              style={{ WebkitTextStroke: `1.5px ${chapter.accentFrom}` }}
              aria-hidden="true"
            >
              {String(chapter.id).padStart(2, "0")}
            </span>
            <span
              className="grid size-14 place-items-center rounded-2xl border"
              style={{
                background: `linear-gradient(135deg, ${chapter.accentFrom}26, ${chapter.accentTo}14)`,
                borderColor: `${chapter.accentFrom}40`,
                color: chapter.accentFrom,
              }}
            >
              <Icon name={chapter.icon} className="size-6" />
            </span>
          </div>

          <div>
            <p className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-gray-500">
              Chapter {chapter.id} / {total}
            </p>
            <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">{chapter.title}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">{chapter.description}</p>
            {chapter.tags?.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {chapter.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor: `${chapter.accentFrom}40`, color: chapter.accentFrom, background: `${chapter.accentFrom}10` }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* darken when covered by the next card */}
        <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.article>
    </div>
  );
}

export default function Journey({ data }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const total = data.chapters.length;

  return (
    <section id="journey" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />

        <div ref={container} className="relative mx-auto max-w-5xl">
          {data.chapters.map((c, i) => (
            <ChapterCard key={c.id} chapter={c} index={i} total={total} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
