"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Rocket, Code2, Palette, Cloud, Users, Shield,
  ChevronLeft, ChevronRight, Database,
  Lock, Server, GitBranch, MessageSquare, Layers,
  Monitor, Sparkles, User,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   PAGE DATA
   ──────────────────────────────────────────────────────────── */
const PAGES = [
  {
    id: 1,
    title: "Hi, I'm Arafat Rahman",
    description:
      "A passionate Full-Stack Developer turning complex ideas into clean, user-friendly experiences.",
    icon: User,
    accentFrom: "#a855f7",
    accentTo: "#ec4899",
  },
  {
    id: 2,
    title: "MERN Stack Specialist",
    description:
      "Building responsive full-stack web applications with React, Next.js, Node.js, Express, and MongoDB.",
    icon: Code2,
    accentFrom: "#6366f1",
    accentTo: "#06b6d4",
  },
  {
    id: 3,
    title: "Fluid Framer Animations",
    description:
      "Designing beautiful, pixel-perfect interfaces with smooth transitions and micro-interactions using Framer Motion.",
    icon: Palette,
    accentFrom: "#10b981",
    accentTo: "#06b6d4",
  },
  {
    id: 4,
    title: "Optimized Performance",
    description:
      "Every project is crafted for optimal rendering, accessibility, and high performance from day one.",
    icon: Cloud,
    accentFrom: "#f59e0b",
    accentTo: "#ef4444",
  },
  {
    id: 5,
    title: "Version Control & Teams",
    description:
      "Experienced in writing scalable architectures, Git-based workflows, and collaborating effectively to build products.",
    icon: Users,
    accentFrom: "#ec4899",
    accentTo: "#8b5cf6",
  },
  {
    id: 6,
    title: "Production Deployment",
    description:
      "Deploying secure apps to Vercel, Railway, Render, Docker, and configuring automated CI/CD workflows.",
    icon: Shield,
    accentFrom: "#3b82f6",
    accentTo: "#8b5cf6",
  },
];

const TOTAL_SPREADS = PAGES.length / 2;

/* ── Pre-computed particle positions ─────────────────────── */
const PARTICLES = [
  { x: 12, y: 18, s: 2, d: 5, dl: 0 },
  { x: 85, y: 12, s: 3, d: 4, dl: 1 },
  { x: 45, y: 80, s: 2, d: 6, dl: 0.5 },
  { x: 70, y: 55, s: 1.5, d: 3, dl: 2 },
  { x: 25, y: 65, s: 2.5, d: 5, dl: 1.5 },
  { x: 90, y: 75, s: 2, d: 4, dl: 0.8 },
  { x: 15, y: 40, s: 1, d: 7, dl: 3 },
  { x: 55, y: 15, s: 3, d: 3.5, dl: 0.3 },
  { x: 75, y: 35, s: 1.5, d: 5.5, dl: 2.2 },
  { x: 35, y: 90, s: 2, d: 4.5, dl: 1.8 },
  { x: 60, y: 50, s: 1, d: 6, dl: 0.7 },
  { x: 8, y: 85, s: 2.5, d: 3.8, dl: 1.2 },
];

/* ────────────────────────────────────────────────────────────
   PAGE ILLUSTRATION (per-page inline graphics)
   ──────────────────────────────────────────────────────────── */
function PageIllustration({ pageId }) {
  switch (pageId) {
    case 1:
      return (
        <div className="mt-4 flex items-center gap-3">
          <motion.div
            className="w-7 h-7 rounded-lg border border-purple-400/25 bg-purple-500/10"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />
          <motion.div
            className="w-5 h-5 rounded-full border border-pink-400/25 bg-pink-500/10"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
          <motion.div
            className="w-9 h-3 rounded-full border border-violet-400/20 bg-violet-500/5"
            animate={{ scaleX: [1, 1.4, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
        </div>
      );

    case 2:
      return (
        <div className="mt-4 p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] md:text-[11px] leading-relaxed overflow-hidden">
          <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-red-400/50" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <span className="w-2 h-2 rounded-full bg-green-400/50" />
          </div>
          <div>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-cyan-300">developer</span>{" "}
            <span className="text-white/40">=</span>{" "}
            <span className="text-yellow-300">{"{"}</span>
          </div>
          <div className="pl-3">
            <span className="text-blue-300">name</span>
            <span className="text-white/40">:</span>{" "}
            <span className="text-green-300">"Arafat Rahman"</span>,
          </div>
          <div className="pl-3">
            <span className="text-blue-300">skills</span>
            <span className="text-white/40">:</span>{" "}
            <span className="text-green-300">["React", "Next.js", "Node", ...]</span>
          </div>
          <div>
            <span className="text-yellow-300">{"}"}</span>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="mt-4 space-y-1.5">
          <div className="flex gap-1.5">
            <div className="h-2.5 flex-1 rounded bg-white/10 border border-white/5" />
            <div className="h-2.5 w-6 rounded bg-white/5" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-14 w-1/3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Layers size={12} className="text-white/15" />
            </div>
            <div className="h-14 flex-1 rounded-lg bg-white/5 border border-white/10" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-6 flex-1 rounded bg-white/5 border border-white/5" />
            <div className="h-6 flex-1 rounded bg-white/5 border border-white/5" />
            <div className="h-6 flex-1 rounded bg-white/5 border border-white/5" />
          </div>
        </div>
      );

    case 4:
      return (
        <div className="mt-4 flex items-center justify-between">
          {[
            { icon: Server, label: "Vercel" },
            { icon: Cloud, label: "Railway" },
            { icon: Monitor, label: "Docker" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <item.icon size={14} className="text-white/35" />
              </div>
              <span className="text-[8px] text-white/25">{item.label}</span>
            </div>
          ))}
        </div>
      );

    case 5:
      return (
        <div className="mt-4 flex items-center gap-2">
          {[GitBranch, MessageSquare, Layers].map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <Icon size={14} className="text-white/30" />
            </div>
          ))}
        </div>
      );

    case 6:
      return (
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[
            { icon: Lock, label: "Auth" },
            { icon: Database, label: "DB" },
            { icon: Shield, label: "Secure" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 border border-white/5"
            >
              <item.icon size={12} className="text-white/35" />
              <span className="text-[8px] text-white/30">{item.label}</span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

/* ────────────────────────────────────────────────────────────
   SINGLE PAGE CONTENT
   ──────────────────────────────────────────────────────────── */
function PageContent({ page, side }) {
  const isLeft = side === "left";
  const Icon = page.icon;

  return (
    <div
      className={`relative w-full h-full flex flex-col overflow-hidden ${
        isLeft ? "rounded-l-2xl" : "rounded-r-2xl"
      }`}
      style={{
        background:
          "linear-gradient(145deg, rgba(18, 12, 38, 0.95) 0%, rgba(12, 8, 28, 0.98) 100%)",
        padding: "clamp(1rem, 2.5vw, 2rem)",
      }}
    >
      {/* Accent glow */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${page.accentFrom}, transparent)` }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${page.accentTo}, transparent)` }}
      />

      {/* Page number */}
      <span className="text-[10px] font-mono tracking-[0.3em] text-white/20 select-none">
        {String(page.id).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center min-h-0 mt-2">
        {/* Icon */}
        <div
          className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center mb-3 md:mb-5 shrink-0"
          style={{
            background: `linear-gradient(135deg, ${page.accentFrom}18, ${page.accentTo}0D)`,
            border: `1px solid ${page.accentFrom}25`,
          }}
        >
          <Icon size={18} style={{ color: page.accentFrom }} />
        </div>

        {/* Title */}
        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-white mb-1.5 md:mb-3 leading-tight">
          {page.title}
        </h3>

        {/* Description */}
        <p className="text-[10px] md:text-sm text-white/45 leading-relaxed">
          {page.description}
        </p>

        {/* Illustration */}
        <PageIllustration pageId={page.id} />
      </div>

      {/* Decorative dot grid */}
      <div
        className={`absolute bottom-3 ${isLeft ? "left-3" : "right-3"} grid grid-cols-3 gap-0.5 opacity-20`}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-0.5 h-0.5 rounded-full bg-white/60" />
        ))}
      </div>

      {/* Corner fold (right pages) */}
      {!isLeft && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 opacity-15 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.15) 50%)",
          }}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */
export default function DigitalBrochure() {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipTarget, setFlipTarget] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms
  const bookRotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const bookRotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  /* ── Reduced motion ─────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ── Mouse parallax ─────────────────────────────────────── */
  const handleMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  /* ── Navigation handlers ────────────────────────────────── */
  const goToNextSpread = useCallback(() => {
    if (isFlipping) return;
    const next = (currentSpread + 1) % TOTAL_SPREADS;
    if (prefersReducedMotion) {
      setCurrentSpread(next);
      return;
    }
    setFlipTarget(next);
    setIsFlipping(true);
  }, [isFlipping, currentSpread, prefersReducedMotion]);

  const goToPrevSpread = useCallback(() => {
    if (isFlipping) return;
    setCurrentSpread((prev) => (prev - 1 + TOTAL_SPREADS) % TOTAL_SPREADS);
  }, [isFlipping]);

  const goToSpread = useCallback(
    (index) => {
      if (isFlipping || index === currentSpread) return;
      setCurrentSpread(index);
    },
    [isFlipping, currentSpread]
  );

  const handleFlipComplete = useCallback(() => {
    if (flipTarget !== null) setCurrentSpread(flipTarget);
    setIsFlipping(false);
    setFlipTarget(null);
  }, [flipTarget]);

  /* ── Auto-flip timer ────────────────────────────────────── */
  useEffect(() => {
    if (isHovered || isFlipping) return;
    const timer = setTimeout(goToNextSpread, 4000);
    return () => clearTimeout(timer);
  }, [isHovered, isFlipping, currentSpread, goToNextSpread]);

  /* ── Keyboard navigation ────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goToNextSpread();
      else if (e.key === "ArrowLeft") goToPrevSpread();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToNextSpread, goToPrevSpread]);

  /* ── Derived page content ───────────────────────────────── */
  const leftPage = PAGES[currentSpread * 2];
  const rightPage =
    isFlipping && flipTarget !== null
      ? PAGES[flipTarget * 2 + 1]
      : PAGES[currentSpread * 2 + 1];

  const flipFront =
    flipTarget !== null ? PAGES[currentSpread * 2 + 1] : PAGES[0];
  const flipBack =
    flipTarget !== null ? PAGES[flipTarget * 2] : PAGES[0];

  const flipEase = [0.645, 0.045, 0.355, 1];

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <section
      id="brochure"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 md:py-28 px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Ambient glow orbs ─────────────────────────────── */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />

      {/* ── Floating particles ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-300/25"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
            animate={
              prefersReducedMotion
                ? {}
                : { y: [-8, 8, -8], opacity: [0.15, 0.4, 0.15] }
            }
            transition={{
              repeat: Infinity,
              duration: p.d,
              delay: p.dl,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Decorative thin lines ─────────────────────────── */}
      <div className="absolute top-24 left-10 w-px h-20 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-24 right-10 w-px h-20 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-5 w-16 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-5 w-16 h-px bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent pointer-events-none" />

      {/* ── Section header ────────────────────────────────── */}
      <motion.div
        className="text-center mb-12 md:mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={16} className="text-purple-400/60" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400/60">
            Digital Brochure
          </span>
          <Sparkles size={16} className="text-purple-400/60" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Discover{" "}
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            My Journey
          </span>
        </h2>
      </motion.div>

      {/* ══════════════════════════════════════════════════════
          BOOK
          ══════════════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10"
        style={
          prefersReducedMotion
            ? {}
            : { rotateX: bookRotateX, rotateY: bookRotateY }
        }
      >
        {/* Floating animation wrapper */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="region"
          aria-label="Digital Brochure — auto-flipping book presentation"
          aria-roledescription="book"
        >
          {/* Book drop shadow */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(139,92,246,0.2), transparent 70%)",
              filter: "blur(12px)",
            }}
          />

          {/* Perspective container */}
          <div
            style={{
              perspective: "2000px",
              width: "clamp(300px, 82vw, 780px)",
              height: "clamp(230px, 50vw, 460px)",
            }}
          >
            {/* 3D context */}
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 60px -10px rgba(139,92,246,0.12)",
                borderRadius: "1rem",
              }}
            >
              {/* ── Left page ── */}
              <div
                className="absolute top-0 left-0 w-1/2 h-full"
                style={{ zIndex: 1 }}
              >
                <div
                  className="w-full h-full rounded-l-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRight: "none",
                  }}
                >
                  <PageContent page={leftPage} side="left" />
                </div>
                {/* Page stack edges (left) */}
                <div className="absolute top-2 bottom-2 -left-[2px] w-[2px] rounded-full bg-white/5" />
                <div className="absolute top-3 bottom-3 -left-[4px] w-px rounded-full bg-white/[0.03]" />
              </div>

              {/* ── Right page (static / underneath during flip) ── */}
              <div
                className="absolute top-0 left-1/2 w-1/2 h-full"
                style={{ zIndex: 1 }}
              >
                <div
                  className="w-full h-full rounded-r-2xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderLeft: "none",
                  }}
                >
                  <PageContent page={rightPage} side="right" />
                </div>
                {/* Page stack edges (right) */}
                <div className="absolute top-2 bottom-2 -right-[2px] w-[2px] rounded-full bg-white/5" />
                <div className="absolute top-3 bottom-3 -right-[4px] w-px rounded-full bg-white/[0.03]" />
              </div>

              {/* ── Flipping page overlay ── */}
              {isFlipping && flipTarget !== null && (
                <motion.div
                  className="absolute top-0 left-1/2 w-1/2 h-full"
                  style={{
                    zIndex: 20,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: 0.85, ease: flipEase }}
                  onAnimationComplete={handleFlipComplete}
                >
                  {/* Front face — current right page */}
                  <div
                    className="absolute inset-0 rounded-r-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderLeft: "none",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    <PageContent page={flipFront} side="right" />
                  </div>

                  {/* Back face — next left page */}
                  <div
                    className="absolute inset-0 rounded-l-2xl overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRight: "none",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                    }}
                  >
                    <PageContent page={flipBack} side="left" />
                  </div>
                </motion.div>
              )}

              {/* ── Dynamic page-flip shadow ── */}
              {isFlipping && (
                <motion.div
                  className="absolute top-0 left-1/2 w-1/2 h-full rounded-r-2xl pointer-events-none"
                  style={{ zIndex: 15 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0] }}
                  transition={{ duration: 0.85, ease: flipEase }}
                >
                  <div
                    className="w-full h-full rounded-r-2xl"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0.4), transparent)",
                    }}
                  />
                </motion.div>
              )}

              {/* ── Spine ── */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 pointer-events-none"
                style={{ zIndex: 30 }}
              >
                <div className="w-full h-full bg-gradient-to-b from-transparent via-black/50 to-transparent" />
              </div>
              {/* Spine shadow (left side) */}
              <div
                className="absolute top-0 bottom-0 w-2 pointer-events-none"
                style={{ left: "calc(50% - 8px)", zIndex: 5 }}
              >
                <div className="w-full h-full bg-gradient-to-l from-black/15 to-transparent" />
              </div>
              {/* Spine shadow (right side) */}
              <div
                className="absolute top-0 bottom-0 left-1/2 w-2 pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-black/15 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Navigation controls ───────────────────────────── */}
      <div className="relative z-10 flex items-center gap-6 mt-10 md:mt-14">
        {/* Previous */}
        <motion.button
          onClick={goToPrevSpread}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous pages"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Brochure navigation">
          {Array.from({ length: TOTAL_SPREADS }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToSpread(i)}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              role="tab"
              aria-selected={currentSpread === i}
              aria-label={`Go to pages ${i * 2 + 1} and ${i * 2 + 2}`}
            >
              <div
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    currentSpread === i
                      ? "linear-gradient(135deg, #a855f7, #ec4899)"
                      : "rgba(255,255,255,0.15)",
                  boxShadow:
                    currentSpread === i
                      ? "0 0 10px rgba(168,85,247,0.4)"
                      : "none",
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={goToNextSpread}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next pages"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Page indicator */}
      <div className="relative z-10 mt-4 text-[11px] font-mono text-white/20 tracking-wider select-none">
        {String(currentSpread * 2 + 1).padStart(2, "0")}–
        {String(currentSpread * 2 + 2).padStart(2, "0")}{" "}
        <span className="text-white/10">
          / {String(PAGES.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
