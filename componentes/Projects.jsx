"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    link: "https://portfolio-webpage-blue.vercel.app",
    img: "/p.png",
    desc: "A personal portfolio website built with React and Tailwind CSS."
  },
  {
    title: "Messaging App",
    link: "https://nexchat-frontend.vercel.app/",
    img: "/p-5.png",
    desc: "A messaging app built with React, Tailwind, MongoDB, Express, JWT, Cloudinary, Socket.io, Zustand."
  },
  {
    title: "E-commerce Website",
    link: "https://nextshop-two.vercel.app/",
    img: "/p4.png",
    desc: "E-commerce website built with Next.js, Tailwind, MongoDB, Express, Clerk, Redux Toolkit."
  },
  {
    title: "Home Rent App (Demo)",
    link: "https://home-rent-one.vercel.app",
    img: "/p1.png",
    desc: "A demo home rent platform built with React, Tailwind, MongoDB, Express."
  },
  {
    title: "Mini Global Chat App (Demo)",
    link: "https://chatterly-puce.vercel.app",
    img: "/p2.png",
    desc: "A real-time chat app using React, Tailwind, MongoDB, Express."
  },
  {
    title: "K72 (Clone)",
    link: "https://k72-ca-eta.vercel.app/",
    img: "/p3.png",
    desc: "A K72 clone built with React, Bootstrap, MongoDB, Express, GSAP."
  }
];

// container animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
      staggerChildren: 0.15
    }
  }
};

// card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-24 px-6 md:px-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 My Projects
      </motion.h2>

      {/* Project Grid */}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl"
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {/* Image */}
            <div className="overflow-hidden">
              <motion.img
                src={p.img}
                alt={p.title}
                className="h-48 w-full object-cover"
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {p.desc}
              </p>
            </div>

            {/* Hover border glow */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-indigo-400/50 transition-all duration-300"></div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
