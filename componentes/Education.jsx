"use client";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 md:px-16 bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">Education</h2>
      <motion.div
        className="text-gray-300 text-center"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <p>📖 SSC (2025), Science Group</p>
        <p>🎓 Currently in HSC 1st Year</p>
        <p>🏫 Sonargaon Govt. College, Bangladesh</p>
      </motion.div>
    </section>
  );
}
