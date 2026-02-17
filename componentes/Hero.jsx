"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "MERN Stack Developer",
  "React Developer",
  "Next.js Developer",
  "JavaScript Enthusiast"
];

export default function Hero() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 80 : 160;

    const timer = setTimeout(() => {
      setText(
        isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="
        relative min-h-screen
        flex flex-col items-center justify-center
        text-center px-4 pt-20
        overflow-hidden
        bg-gradient-to-b from-black via-gray-950 to-gray-900
      "
    >
      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full top-20"></div>

      {/* Profile Image */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-md opacity-60"></div>

        <img
          src="/pic1.png"
          alt="Arafat Rahman"
          className="relative w-36 h-36 rounded-full object-cover border-4 border-white/10 shadow-2xl"
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Hi, I'm{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Arafat Rahman
        </span>
      </motion.h1>

      {/* Typing Role */}
      <h2 className="mt-3 text-xl md:text-2xl text-gray-300 h-8">
        {text}
        <span className="animate-pulse">|</span>
      </h2>

      {/* Description */}
      <motion.p
        className="mt-5 text-lg text-gray-400 max-w-xl leading-relaxed"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        I build responsive and scalable web apps using
        <span className="text-white font-medium"> React, Next.js, Tailwind CSS, Node.js </span>
        and
        <span className="text-white font-medium"> MongoDB</span>.
        Focused on clean UI and smooth user experience.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-8 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <a
          href="#projects"
          className="px-7 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow-lg hover:scale-105 transition"
        >
          🚀 View Projects
        </a>

        <a
          href="/ArafatRahmanResume.pdf"
          download
          className="px-7 py-3 rounded-lg border border-white/15 text-gray-200 backdrop-blur-md hover:bg-white/5 hover:scale-105 transition"
        >
          📄 Download Resume
        </a>
      </motion.div>
    </section>
  );
}
