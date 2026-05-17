"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.35)",
    borderColor: "rgba(6,182,212,0.5)",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML & CSS", level: 95 },
      { name: "Tailwind CSS", level: 89 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.35)",
    borderColor: "rgba(139,92,246,0.5)",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 83 },
      { name: "MongoDB", level: 80 },
      { name: "JWT Auth", level: 82 },
      { name: "Socket.io", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    icon: "🛠️",
    color: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.35)",
    borderColor: "rgba(16,185,129,0.5)",
    skills: [
      { name: "Git & GitHub", level: 91 },
      { name: "Redux Toolkit", level: 84 },
      { name: "Zustand", level: 80 },
      { name: "Cloudinary", level: 77 },
      { name: "Bootstrap", level: 86 },
    ],
  },
];

const techBadges = [
  "HTML", "CSS", "JavaScript", "React.js", "Next.js",
  "Node.js", "Express.js", "MongoDB", "Tailwind CSS",
  "Redux", "Zustand", "Git", "GitHub", "Socket.io",
  "JWT", "Cloudinary", "Bootstrap",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

/* ── Animated skill bar ─────────────────────────────────── */
function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="text-xs font-bold text-white/50">{level}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/5 border border-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
        >
          <span
            className="absolute inset-0 rounded-full opacity-60 blur-sm"
            style={{ background: "inherit" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ── 3-D Tilt Card wrapper ──────────────────────────────── */
function TiltCard({ cat, idx }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * -20;
    const rotateY = ((x / width) - 0.5) * 20;
    const shineX = (x / width) * 100;
    const shineY = (y / height) * 100;
    setTilt({ rotateX, rotateY, shine: { x: shineX, y: shineY } });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, shine: { x: 50, y: 50 } });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "900px", transformStyle: "preserve-3d" }}
      className="relative"
    >
      {/* Rotating 3D shell */}
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${isHovered ? "scale(1.04)" : "scale(1)"}`,
          transition: isHovered
            ? "transform 0.08s linear"
            : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
          transformStyle: "preserve-3d",
          borderRadius: "1rem",
          boxShadow: isHovered
            ? `0 28px 65px ${cat.glow}, 0 2px 0 rgba(255,255,255,0.06) inset`
            : `0 8px 32px rgba(0,0,0,0.4)`,
        }}
      >
        {/* ── Card body — matches Projects card style ── */}
        <div
          className={`
            rounded-2xl p-6 h-full relative overflow-hidden
            bg-white/5 backdrop-blur-lg shadow-2xl
            border transition-colors duration-300
            ${isHovered ? "border-cyan-400/50" : "border-white/10"}
          `}
        >
          {/* Glare overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              opacity: isHovered ? 0.1 : 0,
              transition: "opacity 0.3s ease",
              background: `radial-gradient(circle at ${tilt.shine.x}% ${tilt.shine.y}%, rgba(255,255,255,1) 0%, transparent 55%)`,
              pointerEvents: "none",
            }}
          />

          {/* Corner colour glow */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${cat.glow} 0%, transparent 70%)`,
              filter: "blur(24px)",
              transform: "translate(40%, -40%)",
              opacity: isHovered ? 1 : 0.6,
              transition: "opacity 0.3s ease",
            }}
          />

          {/* Icon + title — pop forward in Z */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{ transform: "translateZ(28px)", transformStyle: "preserve-3d" }}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${cat.color} shadow-lg`}
            >
              {cat.icon}
            </div>
            <div>
              <h3
                className={`text-lg font-bold transition-colors duration-300 ${isHovered ? "text-cyan-400" : "text-white"}`}
              >
                {cat.title}
              </h3>
              <p className="text-xs text-gray-500">{cat.skills.length} skills</p>
            </div>
          </div>

          {/* Skill bars */}
          <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
            {cat.skills.map((skill, sIdx) => (
              <SkillBar
                key={sIdx}
                name={skill.name}
                level={skill.level}
                color={cat.color}
                delay={idx * 0.1 + sIdx * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────── */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6 md:px-16 overflow-hidden"
    >
      {/* Background Orbs */}
      <div
        className="absolute top-[-80px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[-80px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-20 relative z-10"
      >
        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 rounded-full mb-5">
          What I Work With
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Skills &{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            Expertise
          </span>
        </h2>
        <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          A curated set of technologies I use to craft high-performance, scalable, and beautiful digital experiences.
        </p>
      </motion.div>

      {/* 3-D Skill Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        style={{ perspective: "1200px" }}
      >
        {skillCategories.map((cat, idx) => (
          <TiltCard key={idx} cat={cat} idx={idx} />
        ))}
      </motion.div>

      {/* Tech Badges */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 mt-20 max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <span className="text-sm text-gray-500 tracking-widest uppercase">
            All Technologies
          </span>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {techBadges.map((badge, i) => (
            <motion.span
              key={i}
              variants={badgeVariants}
              whileHover={{
                scale: 1.12,
                y: -4,
                boxShadow: "0 0 20px rgba(6,182,212,0.45)",
              }}
              className="px-4 py-2 rounded-full text-sm font-medium text-white/70 cursor-default select-none"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mt-20 max-w-3xl mx-auto grid grid-cols-3 gap-6"
      >
        {[
          { value: "12+", label: "Technologies" },
          { value: "1+", label: "Years Experience" },
          { value: "10+", label: "Projects Built" },
        ].map((stat, i) => (
          <div
            key={i}
            className="text-center rounded-2xl py-6 px-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
            }}
          >
            <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
