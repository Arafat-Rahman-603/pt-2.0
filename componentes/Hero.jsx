"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20"
    >
      <motion.img
        src="/pic1.png"
        alt="Arafat Rahman"
        className="w-32 h-32 rounded-full border-4 border-blue-500 mb-6 object-cover"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.7 }}
      />

      <motion.h1
        className="text-4xl md:text-6xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Hi, I'm <span className="text-blue-500">Arafat Rahman</span>
      </motion.h1>

      <motion.h2
        className="mt-2 text-xl md:text-2xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Front-End Developer from Bangladesh
      </motion.h2>

      <motion.p
        className="mt-4 text-lg text-gray-400 max-w-xl leading-relaxed"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        I build responsive, scalable web applications with <b>React, Redux Toolkit, Tailwind CSS, Node.js</b>, and <b>MongoDB</b>. Passionate about creating user-focused, modern web solutions.
      </motion.p>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <a
          href="#projects"
          className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          🚀 View Projects
        </a>
        <a
          href="/ArafatRahmanResume.pdf"
          download
          className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
        >
          📄 Download Resume
        </a>
      </div>
    </section>
  );
}
