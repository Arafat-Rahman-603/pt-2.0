"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-black via-gray-950 to-gray-900"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          About Me
        </span>
      </motion.h2>

      {/* Card */}
      <motion.div
        className="
          max-w-3xl mx-auto
          p-8 md:p-10
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-lg
          shadow-2xl
          text-center
        "
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Intro Badge */}
        <div className="inline-block mb-5 px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Frontend Developer • MERN Stack
        </div>

        <p className="text-gray-300 leading-relaxed mb-4">
          Hello! I'm{" "}
          <span className="font-semibold text-white">Arafat Rahman</span>, a
          passionate Front-End Developer from Bangladesh. I build responsive,
          scalable, and interactive web applications using modern technologies.
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          I enjoy turning complex ideas into clean, user-friendly experiences
          that feel fast, modern, and meaningful.
        </p>


        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Arafat-Rahman-603"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-2.5
              rounded-lg
              bg-gradient-to-r from-blue-500 to-cyan-500
              text-white
              font-medium
              hover:scale-105
              transition
              shadow-lg
            "
          >
            View GitHub
          </a>

          <a
            href="#contact"
            className="
              px-6 py-2.5
              rounded-lg
              border border-white/15
              text-gray-200
              hover:bg-white/5
              hover:scale-105
              transition
            "
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
