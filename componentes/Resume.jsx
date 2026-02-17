"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Resume() {
  const [open, setOpen] = useState(false);
  const resumePath = "/ArafatRahmanResume.pdf";

  return (
    <section id="resume" className="py-24 px-6 md:px-16 bg-gradient-to-b from-gray-950 to-black text-white">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Resume
        </span>
      </motion.h2>

      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex gap-4 flex-wrap justify-center">
          {/* Download Button */}
          <a
            href={resumePath}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            📥 Download Resume
          </a>

          {/* View Button */}
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg shadow hover:bg-gray-700 hover:scale-105 transition transform"
          >
            📄 View Resume
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-2 max-w-md text-center">
          Preview your resume quickly in the modal or download it for later use.
        </p>
      </motion.div>

      {/* Modal Preview */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ y: 30, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.95 }}
            className="w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="font-semibold text-lg">Arafat Rahman — Resume</h3>
              <div className="flex gap-2">
                <a
                  href={resumePath}
                  download
                  className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                >
                  Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 rounded border border-gray-600 text-sm hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="h-[75vh] md:h-[80vh] w-full bg-white/5">
              <iframe
                src={resumePath}
                className="w-full h-full"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
