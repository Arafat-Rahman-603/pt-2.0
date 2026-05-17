"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "1+", label: "Years Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "12+", label: "Technologies" },
  { value: "100%", label: "Passion" },
];

const highlights = [
  {
    icon: "🎯",
    title: "Problem Solver",
    desc: "I love breaking down complex challenges into clean, elegant solutions.",
  },
  {
    icon: "⚡",
    title: "Performance Focused",
    desc: "Every app I build is optimized for speed, accessibility, and scalability.",
  },
  {
    icon: "🎨",
    title: "UI/UX Driven",
    desc: "I care deeply about pixel-perfect, intuitive, and beautiful interfaces.",
  },
];

const tags = [
  "React", "Next.js", "TypeScript", "Node.js",
  "MongoDB", "Tailwind CSS", "Framer Motion", "REST APIs",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 px-6 md:px-16 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-700/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-700/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section Label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-5"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-medium">
            About Me
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-500" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Who{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            I Am
          </span>
        </motion.h2>

        <motion.p
          className="text-center text-gray-500 max-w-xl mx-auto mb-14 text-base leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A passionate developer from Bangladesh building modern, scalable,
          and visually stunning web experiences.
        </motion.p>

        {/* Main Card */}
        <motion.div
          className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.4)] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {/* Top accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

          <div className="p-8 md:p-12">

            {/* Bio */}
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Frontend Developer · MERN Stack
              </div>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                {"Hello! I'm"}{" "}
                <span className="font-semibold text-white">Arafat Rahman</span>, a
                passionate Front-End Developer who loves turning complex ideas into
                clean, user-friendly experiences.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                I specialise in building modern UIs with{" "}
                <span className="text-white font-medium">React & Next.js</span>, crafting
                robust backends with{" "}
                <span className="text-white font-medium">Node.js & MongoDB</span>, and
                delivering delightful interactions through smooth animations and
                thoughtful design.
              </p>
            </div>

            {/* Stats Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center p-5 rounded-xl bg-white/4 border border-white/6 hover:border-cyan-500/30 hover:bg-white/6 transition-all duration-300 group"
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div
              className="grid md:grid-cols-3 gap-4 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  variants={itemVariants}
                  className="group p-6 rounded-xl border border-white/6 bg-white/3 hover:border-cyan-500/25 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{h.icon}</div>
                  <h3 className="text-white font-semibold mb-1.5 text-sm">{h.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech Tags */}
            <div className="mb-10">
              <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-600 mb-4">
                Tech I Work With
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={itemVariants}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/8 bg-white/4 text-gray-300 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/8 transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="https://github.com/Arafat-Rahman-603"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-7 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:from-cyan-500 group-hover:to-blue-600" />
                <span className="relative flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View GitHub
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                className="px-7 py-3 rounded-xl border border-white/12 text-sm font-semibold text-gray-200 backdrop-blur-md hover:bg-white/6 hover:border-white/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me →
              </motion.a>
            </div>

          </div>

          {/* Bottom accent line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
