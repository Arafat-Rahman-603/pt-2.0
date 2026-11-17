"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { cn, hexToRgb, isExternal } from "@/lib/utils";

function ProjectCard({ project, index, total, className, zoomOnScroll = false, eager = false }) {
  const liveExternal = isExternal(project.live);
  return (
    <TiltCard
      max={6}
      accent={hexToRgb(project.accent)}
      className={cn("h-full rounded-3xl", className)}
    >
      <article className="glass flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-white/20">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} — screenshot`}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 34rem, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105",
              zoomOnScroll && "sd-zoom"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b17] via-transparent to-transparent" />
          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[11px] text-gray-300 backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: project.accent }}
          />
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-2xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-400">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-gray-300">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-3 pt-6">
            <a
              href={project.live}
              target={liveExternal ? "_blank" : undefined}
              rel={liveExternal ? "noopener noreferrer" : undefined}
              data-cursor="hover"
              className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
            >
              Live Demo <span className="sr-only">of {project.title}</span>
              <ArrowUpRight className="size-4 transition-transform group-hover/btn:rotate-45" aria-hidden="true" />
            </a>
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm text-gray-200 transition-colors hover:border-white/40 hover:bg-white/5"
            >
              <Github className="size-4" aria-hidden="true" />
              Code <span className="sr-only">of {project.title}</span>
            </a>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

/* ── Desktop: pinned horizontal scroll ─────────────────────── */
function HorizontalProjects({ data }) {
  const section = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  // Horizontally off-screen images never trigger native lazy-loading in time,
  // so load them all once the section is within ~1 viewport.
  const near = useInView(section, { once: true, margin: "100% 0px" });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const total = data.items.length;

  return (
    <section id="projects" ref={section} className="relative" style={{ height: `calc(100dvh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-8 pl-16 pr-16">
          {/* intro panel */}
          <div className="flex w-[30rem] shrink-0 flex-col justify-center pr-6">
            <p className="mb-5 font-display text-xs uppercase tracking-[0.3em] text-cyan-300/90">{data.eyebrow}</p>
            <SplitText
              as="h2"
              text={`${data.title} ${data.highlight}`}
              highlight={data.highlight.split(" ")}
              className="block font-display text-7xl font-bold leading-[0.95] tracking-tight text-white"
            />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-gray-400">{data.subtitle}</p>
            <p className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <span className="font-display text-4xl font-bold text-white">{String(total).padStart(2, "0")}</span>
              projects — keep scrolling →
            </p>
          </div>

          {data.items.map((p, i) => (
            <div key={p.slug} className="w-[min(34rem,40vw)] shrink-0 py-4">
              <ProjectCard project={p} index={i} total={total} eager={near} />
            </div>
          ))}
        </motion.div>

        {/* progress */}
        <div className="absolute bottom-10 left-16 right-16 h-px bg-white/10">
          <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / tablet: revealed grid ────────────────────────── */
function GridProjects({ data }) {
  const total = data.items.length;
  return (
    <section id="projects" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} highlight={data.highlight} subtitle={data.subtitle} />
        <div className="grid gap-6 sm:grid-cols-2">
          {data.items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08} y={50}>
              <ProjectCard project={p} index={i} total={total} zoomOnScroll />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Projects({ data }) {
  const isDesktop = useIsDesktop();
  return isDesktop ? <HorizontalProjects data={data} /> : <GridProjects data={data} />;
}
