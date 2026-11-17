"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Icon from "@/components/ui/Icon";
import MagneticButton from "@/components/ui/MagneticButton";

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
function ScrollLitParagraph({ text, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export default function About({ data }) {
  const imgWrap = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section id="about" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />

        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Portrait */}
          <Reveal y={60} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <motion.div ref={imgWrap} style={{ rotate }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <motion.div style={{ y: imgY }} className="absolute -inset-[10%]">
                <Image src={data.image} alt={data.imageAlt} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent" />
              <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl px-5 py-4">
                <p className="font-display text-lg font-semibold text-white">{data.name}</p>
                <p className="text-xs text-cyan-300/90">{data.badge}</p>
              </div>
            </motion.div>
            <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 via-blue-500/10 to-violet-500/30 blur-2xl" />
          </Reveal>

          {/* Copy */}
          <div>
            {data.bio.map((p, i) => (
              <ScrollLitParagraph
                key={i}
                text={p}
                className={i === 0 ? "font-display text-2xl font-medium leading-snug text-white md:text-3xl" : "mt-6 text-lg leading-relaxed text-gray-300"}
              />
            ))}

            <RevealGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {data.stats.map((s) => (
                <RevealItem key={s.label} className="glass rounded-2xl p-5 text-center">
                  <Counter value={s.value} suffix={s.suffix} className="font-display text-3xl font-bold text-gradient" />
                  <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-gray-500">{s.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
              {data.highlights.map((h) => (
                <RevealItem key={h.title} className="group glass rounded-2xl p-5 transition-colors hover:border-cyan-400/30">
                  <span className="mb-3 grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6">
                    <Icon name={h.icon} className="size-5" />
                  </span>
                  <h3 className="text-sm font-semibold text-white">{h.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{h.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <RevealGroup as="ul" className="mt-8 flex flex-wrap gap-2" stagger={0.04}>
              {data.tags.map((t) => (
                <RevealItem
                  as="li"
                  key={t}
                  y={12}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  {t}
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-10 flex flex-wrap gap-4">
              {data.ctas.map((c, i) => (
                <MagneticButton key={c.label} href={c.href} variant={i === 0 ? "primary" : "ghost"}>
                  {c.icon && <Icon name={c.icon} className="size-4" />}
                  {c.label}
                  {!c.icon && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
