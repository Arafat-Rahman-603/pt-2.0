"use client";
import { motion } from "framer-motion";

const skills = [
  "HTML", "CSS", "JavaScript (ES6)", "React.js", "Redux Toolkit",
  "Tailwind CSS", "Bootstrap", "Node.js", "Express.js", "MongoDB",
  "JWT", "Cloudinary", "Socket.io", "Zustand",
  "Git", "GitHub", "Next.js"
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Skills & Tools</h2>
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        {skills.map((s, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700"
          >
            {s}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
