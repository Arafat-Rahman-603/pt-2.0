"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    live: "https://portfolio-webpage-blue.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/pt-2.0", 
    img: "/p.png",
    desc: "Personal portfolio built with React and Tailwind CSS.",
    tech: ["Next.js", "Tailwind", "Framer Motion"]
  },
  {
    title: "Messaging App",
    live: "https://nexchat-frontend.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/nexchat-frontend",
    img: "/p-5.png",
    desc: "Real-time messaging app with authentication and sockets.",
    tech: ["Zustand", "MongoDB", "Socket.io", "JWT"]
  },
  {
    title: "E-commerce Website",
    live: "https://nextshop-two.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/nextshop-frontend",
    img: "/p4.png",
    desc: "Full-stack e-commerce platform with modern UI.",
    tech: ["Next.js", "MongoDB", "Redux","Express.js"]
  },
  {
    title: "Home Rent App",
    live: "https://home-rent-one.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/Home-Rent",
    img: "/p1.png",
    desc: "Property browsing demo platform.",
    tech: ["React", "Express", "MongoDB","Redux"]
  },
  {
    title: "Global Chat App",
    live: "https://chatterly-puce.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/Fontend",
    img: "/p2.png",
    desc: "Simple global chat application.",
    tech: ["React", "Socket.io","Express.js"]
  },
  {
    title: "K72 Clone",
    live: "https://k72-ca-eta.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/K72-ca",
    img: "/p3.png",
    desc: "Frontend clone with animation effects.",
    tech: ["React", "GSAP","Tailwind"]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

export default function Projects() {
  return (
    <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-gray-950 to-black">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Projects
        </span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {projects.map((p, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -8 }}
            className="
              group rounded-2xl overflow-hidden
              bg-white/5 border border-white/10
              backdrop-blur-lg shadow-xl
              hover:border-cyan-400/40
              transition-all duration-300
            "
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {p.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {p.desc}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <a
                  href={p.live}
                  target="_blank"
                  className="
                    flex-1 text-center
                    px-4 py-2 rounded-lg
                    bg-gradient-to-r from-blue-500 to-cyan-500
                    text-white text-sm font-medium
                    hover:scale-105 transition
                  "
                >
                  Live Demo
                </a>

                <a
                  href={p.code}
                  target="_blank"
                  className="
                    flex-1 text-center
                    px-4 py-2 rounded-lg
                    border border-white/15
                    text-gray-200 text-sm
                    hover:bg-white/5
                    hover:scale-105 transition
                  "
                >
                  Source Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
