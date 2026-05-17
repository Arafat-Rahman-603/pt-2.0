"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  Keyboard,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const reviews = [
  {
    name: "Sakib Hasan",
    project: "NextShop — E-commerce Website",
    avatar: "SH",
    avatarColor: "from-violet-500 to-purple-600",
    rating: 5,
    date: "",
    review:
      "I commissioned the NextShop platform for my online store and the result blew me away. The UI is slick and modern, checkout flow is seamless, and the admin panel is intuitive. Product loading is blazing fast thanks to Next.js. Highly recommended for anyone looking to launch a premium e-commerce experience!",
  },
  {
    name: "Noor Rahman",
    project: "Chatterly — Global Chat App",
    avatar: "NR",
    avatarColor: "from-emerald-500 to-teal-600",
    rating: 5,
    date: "",
    review:
      "Chatterly is exactly what our team needed for real-time collaboration. Messages appear instantly, the interface is clean, and it just works — even on slow connections. The developer went above and beyond with smooth animations and a thoughtful UX that keeps conversations flowing naturally. Brilliant work!",
  },
  {
    name: "Nil Ahmed",
    project: "AetherAI — Customer Support Platform",
    avatar: "NA",
    avatarColor: "from-cyan-500 to-blue-600",
    rating: 5,
    date: "",
    review:
      "We integrated AetherAI into our support workflow and response times dropped dramatically. The AI handles routine queries perfectly, the dashboard is easy to navigate, and the whole system scales without issues. The attention to detail — from the onboarding flow to the real-time analytics — is exceptional.",
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-white/15"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function Reviews() {
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
      id="reviews"
      className="py-24 px-4 md:px-10 overflow-hidden"
    >
      {/* ── Heading ── */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Client Reviews
          </span>
        </h2>
        <p className="text-gray-400 mt-4 text-sm md:text-base max-w-xl mx-auto">
          Real feedback from people who trusted me with their ideas.
        </p>
      </motion.div>

      {/* ── Swiper ── */}
      <div className="max-w-6xl mx-auto relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, Keyboard, EffectCoverflow]}
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
            640:  { slidesPerView: 1.5,  spaceBetween: 28 },
            900:  { slidesPerView: 2,    spaceBetween: 32 },
            1200: { slidesPerView: 2.4,  spaceBetween: 36 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          keyboard={{ enabled: true }}
          loop={true}
          loopAdditionalSlides={3}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="reviews-swiper !pb-14"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i}>
              <div
                className="
                  group rounded-2xl p-7
                  bg-white/5 border border-white/10
                  backdrop-blur-lg shadow-2xl
                  hover:border-cyan-400/50
                  transition-colors duration-300
                  cursor-grab active:cursor-grabbing
                  select-none
                  h-full
                "
              >
                {/* Quote mark */}
                <div className="text-cyan-400/30 text-6xl font-serif leading-none mb-2 select-none">
                  {`"`}
                </div>

                {/* Star rating */}
                <StarRating count={r.rating} />

                {/* Review text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-5">
                  {r.review}
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-11 h-11 rounded-full flex items-center justify-center
                      bg-gradient-to-br ${r.avatarColor}
                      text-white text-sm font-bold shadow-lg flex-shrink-0
                    `}
                  >
                    {r.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate group-hover:text-cyan-400 transition-colors duration-300">
                      {r.name}
                    </p>
                    <p className="text-cyan-400 text-xs truncate">{r.project}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{r.date}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Autoplay progress ring */}
          <div slot="container-end" className="autoplay-progress-rv">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20" />
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>

      {/* ── Custom CSS ── */}
      <style>{`
        /* Slide Animations */
        .reviews-swiper .swiper-slide > div {
          transition: transform 0.45s ease, opacity 0.45s ease;
          opacity: 0.75;
          transform: scale(0.92);
        }
        .reviews-swiper .swiper-slide-active > div {
          opacity: 1;
          transform: scale(1);
        }

        /* Nav arrows */
        .reviews-swiper .swiper-button-prev,
        .reviews-swiper .swiper-button-next {
          color: #22d3ee;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: background 0.25s, transform 0.2s;
        }
        .reviews-swiper .swiper-button-prev:hover,
        .reviews-swiper .swiper-button-next:hover {
          background: rgba(34,211,238,0.15);
          transform: scale(1.1);
        }
        .reviews-swiper .swiper-button-prev::after,
        .reviews-swiper .swiper-button-next::after {
          font-size: 16px;
          font-weight: 700;
        }

        /* Pagination bullets */
        .reviews-swiper .swiper-pagination-bullet {
          background: rgba(255,255,255,0.3);
          opacity: 1;
          transition: background 0.25s, width 0.3s;
        }
        .reviews-swiper .swiper-pagination-bullet-active {
          background: #22d3ee;
          width: 24px;
          border-radius: 4px;
        }

        /* Autoplay progress ring */
        .autoplay-progress-rv {
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
        .autoplay-progress-rv svg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .autoplay-progress-rv svg circle {
          fill: none;
          stroke: #22d3ee;
          stroke-width: 3;
          stroke-dasharray: 125.6px;
          stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
          transition: stroke-dashoffset 0.1s linear;
        }
      `}</style>
    </section>
  );
}
