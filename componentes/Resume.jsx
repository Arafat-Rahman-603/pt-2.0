"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Resume() {
  const [open, setOpen] = useState(false);
  const resumePath = "/ArafatRahmanResume.pdf";

  return (
    <section id="resume" className="py-20 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-6">My Resume</h2>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3">
          <a
            href={resumePath}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            📥 Download Resume
          </a>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            📄 View Resume
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          The resume will open in a modal for quick preview. Use the download button to save a copy.
        </p>
      </div>

      {/* Modal preview */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ y: 30, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold">Arafat Rahman — Resume</h3>
              <div className="flex gap-2">
                <a
                  href={resumePath}
                  download
                  className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
                >
                  Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 rounded border text-sm"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="h-[70vh]">
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
