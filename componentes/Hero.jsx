"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "MERN Stack Developer",
  "React Developer",
  "Next.js Developer",
  "JavaScript Enthusiast",
];

const floatingOrbs = [
  { size: 500, top: "-10%", left: "50%", color: "from-blue-700/25 to-cyan-600/10", duration: 8 },
  { size: 350, top: "60%", left: "-5%", color: "from-violet-700/20 to-blue-600/10", duration: 10 },
  { size: 280, top: "30%", left: "80%", color: "from-cyan-500/20 to-blue-500/5", duration: 7 },
];

export default function Hero() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 60 : 140;

    const timer = setTimeout(() => {
      setText(
        isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1200);
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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 overflow-hidden bg-gray-950"
    >
      {/* Ambient Orbs */}
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-[100px] pointer-events-none`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            translateX: "-50%",
          }}
          animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Fade masks */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-950 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs text-gray-300"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for freelance work
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="relative mb-8"
        >
          {/* Spinning ring */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 75%, #38bdf8 85%, #3b82f6 90%, transparent 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-xl opacity-50" />
          <img
            src="/pic1.png"
            alt="Arafat Rahman"
            className="relative w-36 h-36 rounded-full object-cover border-2 border-white/20 shadow-2xl"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            Arafat
          </span>
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          className="mt-4 h-9 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <span className="text-xl md:text-2xl font-medium text-gray-300 tracking-wide">
            {text}
            <span className="ml-0.5 inline-block w-0.5 h-6 bg-cyan-400 animate-pulse align-middle" />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          I craft responsive, high-performance web apps with{" "}
          <span className="text-white font-medium">React, Next.js, Tailwind CSS,</span>{" "}
          <span className="text-white font-medium">Node.js</span> &amp;{" "}
          <span className="text-white font-medium">MongoDB</span> — focused on clean UI and
          seamless UX.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:from-cyan-500 group-hover:to-blue-600" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-opacity duration-300 rounded-xl" />
            <span className="relative flex items-center gap-2">🚀 View Projects</span>
          </motion.a>

          <motion.a
            href="/ArafatRahmanResume.pdf"
            download
            className="px-8 py-3.5 rounded-xl border border-white/12 text-sm font-semibold text-gray-200 backdrop-blur-md hover:bg-white/6 hover:border-white/20 hover:scale-105 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            📄 Download Resume
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          {[
            { label: "Projects Built", value: "20+" },
            { label: "Technologies", value: "10+" },
            { label: "Coffee Cups", value: "∞" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
