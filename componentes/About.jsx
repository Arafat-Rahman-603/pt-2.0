"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-16">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        About Me
      </motion.h2>

      <motion.div
        className="max-w-3xl mx-auto text-center leading-relaxed text-gray-700 dark:text-gray-300"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-4">
          Hello! I'm{" "}
          <span className="text-blue-500 font-semibold">Arafat Rahman</span>, a{" "}
          <b>Front-End Developer</b> from Bangladesh. I specialize in building
          responsive, scalable, and interactive web applications using modern
          technologies.
        </p>
        <p className="mb-4">
          My skills include{" "}
          <b>
            React, Redux Toolkit, Tailwind CSS, Bootstrap, JavaScript (ES6),
            Node.js, Express.js, and MongoDB
          </b>
          . I enjoy translating complex requirements into clean, user-friendly
          solutions that provide real value.
        </p>
        <p className="mb-8">
          I’m currently studying <b>HSC 1st Year</b> at Sonargaon Govt. College.
          Beyond coding, I love learning new technologies and continuously
          improving my craft to build modern and engaging user experiences.
        </p>

        {/* Contact Links */}
        <div className="flex flex-col items-center gap-3 mt-6">
          {/* GitHub */}
          <a
            href="https://github.com/Arafat-Rahman-603" // change to your GitHub username
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            {/* GitHub SVG Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 .297c-6.63 0-12 5.373-12 12 
                0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
                -.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.084-.729.084-.729 
                1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998 
                .108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 
                0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 
                0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405 
                c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 
                3.285-1.23.645 1.653.24 2.873.12 3.176 
                .765.84 1.23 1.91 1.23 3.22 
                0 4.61-2.805 5.625-5.475 5.92 
                .42.36.81 1.096.81 2.22 
                0 1.605-.015 2.896-.015 3.286 
                0 .315.21.69.825.57C20.565 22.092 
                24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                clipRule="evenodd"
              />
            </svg>
            GitHub: Arafat-Rahman-603
          </a>

          {/* Phone */}
          <a
            href="tel:01609611399"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            📞 Call: 01609611399
          </a>
        </div>
      </motion.div>
    </section>
  );
}
