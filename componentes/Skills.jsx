"use client";
import { motion } from "framer-motion";

const skills = [
  "HTML", "CSS", "JavaScript (ES6)", "React.js", "Redux Toolkit",
  "Tailwind CSS", "Bootstrap", "Node.js", "Express.js", "MongoDB",
  "JWT", "Cloudinary", "Socket.io", "Zustand",
  "Git", "GitHub", "Next.js"
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 }
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-16 bg-gradient-to-b from-gray-950 via-gray-900 to-black"
    >
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skills & Tools
        </span>
      </h2>

      {/* Skills Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-5 justify-center max-w-4xl mx-auto"
      >
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{
              scale: 1.08,
              y: -5
            }}
            className="
              px-5 py-3
              rounded-xl
              text-sm md:text-base
              font-medium
              bg-white/5
              border border-white/10
              backdrop-blur-md
              shadow-lg
              hover:border-cyan-400/50
              hover:shadow-cyan-500/20
              transition-all duration-300
              cursor-default
            "
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
