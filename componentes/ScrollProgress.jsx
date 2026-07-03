"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate percentage
      if (docHeight > 0) {
        const percent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollPercent(Math.round(percent));
      } else {
        setScrollPercent(0);
      }

      // Show button after scrolling 120px
      setIsVisible(scrollTop > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circle path mathematics
  const radius = 24;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius; // 2 * pi * 24 = 150.796
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed left-6 bottom-6 md:left-8 md:bottom-8 z-40 flex flex-col items-center justify-center w-16 h-16 rounded-full group cursor-pointer focus:outline-none select-none"
          style={{
            background: "rgba(3, 7, 18, 0.65)",
            backdropFilter: "blur(16px) saturate(1.4)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
          initial={{ opacity: 0, scale: 0.7, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.7, x: -20 }}
          whileHover={{ 
            scale: 1.08,
            boxShadow: "0 0 25px rgba(34, 211, 238, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.5)",
            borderColor: "rgba(34, 211, 238, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* SVG Progress Circle */}
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="scrollProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" /> {/* Cyan 400 */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue 500 */}
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle
              cx="32"
              cy="32"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Foreground Progress */}
            <motion.circle
              cx="32"
              cy="32"
              r={radius}
              fill="transparent"
              stroke="url(#scrollProgressGrad)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>

          {/* Interactive Content */}
          <div className="relative flex flex-col items-center justify-center mt-[-2px]">
            {/* Arrow Up Icon with hover animation */}
            <motion.div
              className="text-cyan-400 group-hover:text-cyan-300 transition-colors"
              animate={{ y: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <ArrowUp size={16} className="stroke-[2.5]" />
            </motion.div>
            
            {/* Percentage Text */}
            <span className="text-[10px] font-bold tracking-wider text-gray-300 group-hover:text-white transition-colors mt-0.5 select-none">
              {scrollPercent}%
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
