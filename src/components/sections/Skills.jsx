"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { hexToRgb } from "@/lib/utils";

function SkillBar({ name, level, from, to, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <li ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-200">{name}</span>
        <span className="font-mono text-xs text-gray-500">{level}%</span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})`, width: `${level}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: inView ? 1 : 0 }}
          transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </li>
  );
}

export default function Skills({ data }) {
  return (
    <section id="skills" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />

        <div className="grid gap-6 md:grid-cols-3">
          {data.categories.map((cat, ci) => (
            <Reveal key={cat.title} delay={ci * 0.12} y={70} className="h-full">
              <TiltCard max={8} accent={hexToRgb(cat.accentFrom)} className="h-full rounded-3xl">
                <div className="glass relative h-full overflow-hidden rounded-3xl p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-40 blur-3xl"
                    style={{ background: cat.accentFrom }}
                  />
                  <div className="relative mb-7 flex items-center gap-4">
                    <span
                      className="grid size-12 place-items-center rounded-2xl text-white shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${cat.accentFrom}, ${cat.accentTo})` }}
                    >
                      <Icon name={cat.icon} className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">{cat.title}</h3>
                      <p className="text-xs text-gray-500">{cat.skills.length} skills</p>
                    </div>
                  </div>
                  <ul className="relative space-y-4">
                    {cat.skills.map((s, si) => (
                      <SkillBar key={s.name} {...s} from={cat.accentFrom} to={cat.accentTo} delay={ci * 0.1 + si * 0.07} />
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Reveal y={16}>
            <p className="mb-6 text-center font-display text-xs uppercase tracking-[0.3em] text-gray-500">All Technologies</p>
          </Reveal>
          <RevealGroup as="ul" stagger={0.035} className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {data.badges.map((b) => (
              <RevealItem
                as="li"
                key={b}
                y={16}
                whileHover={{ y: -4, scale: 1.06 }}
                className="glass cursor-default rounded-full px-4 py-2 text-sm text-gray-300 transition-[color,border-color,box-shadow] hover:border-cyan-400/40 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                {b}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
