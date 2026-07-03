"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Keyboard,
  Mousewheel,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const projects = [
  { 
    title: "Floka",
    live: "https://floka-one.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603",
    img: "/floka.png",
    desc: "Floka is a next-generation animated website",
    tech: ["Next.js", "Tailwind", "Framer Motion", "Three.js", "Resend", "JWT"],
  },
  {
    title: "Fancy Planet",
    live: "https://fancyplanet.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/project-0012",
    img: "/fancy.png",
    desc: "Fancy Planet is a cutting-edge e-commerce platform where style meets substance. Explore a curated collection of premium products, enjoy seamless browsing, and discover new favorites with every click.",
    tech: ["Next.js", "Tailwind", "MongoDB", "Express.js", "Nodemailer", "JWT"],
  },
  {
    title: "WebCrafter AI",
    live: "https://webcrafter-ai.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/WebCrafter-AI",
    img: "/webcrafter.png",
    desc: "Developed an AI-powered web app that generates websites from user prompts. Built using Next.js and Node.js, with AI integration for real-time UI and content generation.",
    tech: ["Next.js", "Tailwind", "MongoDB", "Express.js", "Nodemailer", "OpenRouter"],
  },
  {
    title: "AetherAI",
    live: "https://aether-ai-support.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/AetherAI",
    img: "/ai-sup.png",
    desc: "AetherAI is an AI-powered SaaS platform for customer support, enabling businesses to provide instant and intelligent responses to user queries.",
    tech: ["Next.js", "Tailwind", "MongoDB", "Clerk"],
  },
  {
    title: "Uber (Clone)",
    live: "https://uber-beta-ten.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/Uber-Clone",
    img: "/uber.png",
    desc: "Uber clone with real-time location tracking and ride booking.",
    tech: ["React.js", "Tailwind", "Express.js", "MongoDB", "JWT", "Zustand"],
  },
  {
    title: "Portfolio Website",
    live: "/",
    code: "https://github.com/Arafat-Rahman-603/pt-2.0",
    img: "/p.png",
    desc: "Personal portfolio built with Next.js and Tailwind CSS featuring smooth animations.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    title: "Chatterly",
    live: "https://nexchat-frontend.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/nexchat-frontend",
    img: "/p-5.png",
    desc: "Real-time messaging app with authentication and sockets.",
    tech: ["Zustand", "MongoDB", "Socket.io", "JWT"],
  },
  {
    title: "E-commerce Website",
    live: "https://nextshop-two.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/nextshop-frontend",
    img: "/p4.png",
    desc: "Full-stack e-commerce platform with modern UI.",
    tech: ["Next.js", "MongoDB", "Redux", "Express.js"],
  },
  {
    title: "Home Rent App",
    live: "https://home-rent-one.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/Home-Rent",
    img: "/p1.png",
    desc: "Property browsing demo platform.",
    tech: ["React", "Express", "MongoDB", "Redux"],
  },
  {
    title: "Global Chat App",
    live: "https://chatterly-puce.vercel.app",
    code: "https://github.com/Arafat-Rahman-603/Fontend",
    img: "/p2.png",
    desc: "Simple global chat application.",
    tech: ["React", "Socket.io", "Express.js"],
  },
  {
    title: "K72 Clone",
    live: "https://k72-ca-eta.vercel.app/",
    code: "https://github.com/Arafat-Rahman-603/K72-ca",
    img: "/p3.png",
    desc: "Frontend clone with stunning GSAP animation effects.",
    tech: ["React", "GSAP", "Tailwind"],
  },
];

/* ─────────────────────────────────────────────
   Parallax image that follows cursor direction
───────────────────────────────────────────── */
function ParallaxImage({ src, alt, index, total }) {
  const containerRef = useRef(null);

  // Raw mouse position (0 = center)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring smoothing
  const springCfg = { stiffness: 180, damping: 28, mass: 0.6 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  // Map spring values → translateX/Y (±12 px range, image is oversized to hide gaps)
  const tx = useTransform(x, [-1, 1], [-12, 12]);
  const ty = useTransform(y, [-1, 1], [-12, 12]);

  const handleMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -1 … +1
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden h-48"
    >
      <motion.img
        src={src}
        alt={alt}
        draggable="false"
        style={{ x: tx, y: ty, scale: 1.12 }}
        className="h-full w-full object-cover"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      {/* slide index badge */}
      <span className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded-full bg-black/50 border border-white/10 text-gray-300 pointer-events-none">
        {String(index + 1).padStart(2, "0")} / {total}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function Projects() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (_s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <section
      id="projects"
      className="py-24 px-4 md:px-10 overflow-hidden"
    >
      {/* ── Heading ── */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Projects
        </span>
      </motion.h2>

      <motion.p
        className="text-center text-gray-400 mb-14 text-sm md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Swipe or use arrows to explore — {projects.length} projects total
      </motion.p>

      {/* ── Swiper ── */}
      <div className="max-w-7xl mx-auto relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, Keyboard, Mousewheel, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          centeredSlides={true}
          slidesPerView={1.15}
          spaceBetween={24}
          breakpoints={{
            640:  { slidesPerView: 1.6,  spaceBetween: 28 },
            900:  { slidesPerView: 2.4,  spaceBetween: 32 },
            1200: { slidesPerView: 3,    spaceBetween: 36 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          loop={true}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="projects-swiper !pb-14"
        >
          {projects.map((p, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.75, scale: 0.92 }}
                  transition={{ duration: 0.45 }}
                  className="
                    group rounded-2xl overflow-hidden
                    bg-white/5 border border-white/10
                    backdrop-blur-lg shadow-2xl
                    hover:border-cyan-400/50
                    transition-colors duration-300
                    cursor-grab active:cursor-grabbing
                    select-none
                  "
                >
                  {/* ── Parallax image ── */}
                  <ParallaxImage src={p.img} alt={p.title} index={i} total={projects.length} />

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {p.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                      {p.desc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-400/20 text-cyan-300"
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
                        rel="noopener noreferrer"
                        className="
                          flex-1 text-center
                          px-4 py-2 rounded-lg text-sm font-medium
                          bg-gradient-to-r from-blue-500 to-cyan-500
                          text-white hover:opacity-90
                          hover:scale-105 transition-all duration-200
                          shadow-lg shadow-cyan-500/20
                        "
                      >
                        Live Demo
                      </a>
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          flex-1 text-center
                          px-4 py-2 rounded-lg text-sm
                          border border-white/15
                          text-gray-200
                          hover:bg-white/8 hover:border-white/30
                          hover:scale-105 transition-all duration-200
                        "
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </SwiperSlide>
          ))}

          {/* Autoplay progress ring */}
          <div slot="container-end" className="autoplay-progress">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>

      {/* ── Swiper custom CSS ── */}
      <style>{`
        /* Nav arrows */
        .projects-swiper .swiper-button-prev,
        .projects-swiper .swiper-button-next {
          color: #22d3ee;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: background 0.25s, transform 0.2s;
        }
        .projects-swiper .swiper-button-prev:hover,
        .projects-swiper .swiper-button-next:hover {
          background: rgba(34,211,238,0.15);
          transform: scale(1.1);
        }
        .projects-swiper .swiper-button-prev::after,
        .projects-swiper .swiper-button-next::after {
          font-size: 16px;
          font-weight: 700;
        }

        /* Pagination bullets */
        .projects-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transition: background 0.25s, width 0.3s;
        }
        .projects-swiper .swiper-pagination-bullet-active {
          background: #22d3ee;
          width: 24px;
          border-radius: 4px;
        }

        /* Autoplay progress ring */
        .autoplay-progress {
          position: absolute;
          right: 16px;
          bottom: 16px;
          z-index: 10;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: #22d3ee;
          font-weight: 600;
        }
        .autoplay-progress svg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .autoplay-progress svg circle {
          fill: none;
          stroke: #22d3ee;
          stroke-width: 3;
          stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
          stroke-dasharray: 125.6px;
          transition: stroke-dashoffset 0.1s linear;
        }
      `}</style>
    </section>
  );
}
