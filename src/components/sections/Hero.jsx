"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import PortraitStage from "@/components/three/PortraitStage";

const EASE = [0.16, 1, 0.3, 1];

/** Typewriter that cycles through roles */
function RoleTyper({ roles }) {
  const [state, setState] = useState({ text: "", i: 0, del: false });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const { text, i, del } = state;
    const current = roles[i];
    let delay = del ? 45 : 95;
    let next;
    if (!del && text === current) {
      delay = 1400;
      next = { ...state, del: true };
    } else if (del && text === "") {
      delay = 250;
      next = { text: "", i: (i + 1) % roles.length, del: false };
    } else {
      next = { ...state, text: del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1) };
    }
    const t = setTimeout(() => setState(next), delay);
    return () => clearTimeout(t);
  }, [state, roles, reduce]);

  return (
    <span className="inline-flex items-center">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{reduce ? roles[0] : state.text}</span>
      <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-cyan-400" />
    </span>
  );
}

export default function Hero({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  const [first, ...rest] = data.name.split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-16 lg:pt-24"
    >
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        {/* ── Copy ── */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs text-gray-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {data.badge}
          </motion.div>

          <h1 className="font-display text-[clamp(2.75rem,1.6rem+5.2vw,6.25rem)] font-bold leading-[0.95] tracking-tight text-white">
            <SplitText text={data.greeting} animateOnMount delay={0.15} className="block text-[0.45em] font-medium text-gray-400" />
            <SplitText text={first} animateOnMount delay={0.3} wordClassName="text-gradient" className="block" />
            {rest.length > 0 && <SplitText text={rest.join(" ")} animateOnMount delay={0.42} className="block" />}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-5 font-display text-lg text-cyan-200/90 md:text-2xl"
          >
            <RoleTyper roles={data.roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg lg:mx-0"
          >
            {data.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
            className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <MagneticButton href={data.primaryCta.href}>
              {data.primaryCta.label}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={data.secondaryCta.href} download={data.secondaryCta.download} variant="ghost">
              <Download className="size-4" aria-hidden="true" />
              {data.secondaryCta.label}
            </MagneticButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6 max-lg:mx-auto"
          >
            {data.stats.map((s) => (
              <div key={s.label} className="border-l border-white/10 pl-4 text-left">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white md:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dd aria-hidden="true" className="mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── 3D Portrait ── */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="order-1 lg:order-2"
        >
          <PortraitStage
            portrait={data.portrait}
            className="mx-auto aspect-[4/5] w-[min(62vw,24rem)] lg:w-full lg:max-w-[34rem]"
          />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#journey"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gray-500 hover:text-cyan-300 md:flex"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/15 pt-1.5">
          <motion.span
            className="block h-2 w-0.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
