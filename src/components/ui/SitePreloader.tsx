import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SitePreloaderProps {
  isModelReady: boolean;
  onComplete?: () => void;
}

export const SitePreloader: React.FC<SitePreloaderProps> = ({ isModelReady, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExitDone, setIsExitDone] = useState(false);
  const progressRef = useRef(0);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    let timeoutId: any;

    const runStep = () => {
      if (hasCompletedRef.current) return;

      const current = progressRef.current;

      if (current >= 100) {
        hasCompletedRef.current = true;
        // Hold on 100% briefly so user sees the completed ring
        timeoutId = setTimeout(() => {
          setIsExitDone(true);
          if (onComplete) onComplete();
        }, 320);
        return;
      }

      let next: number;
      let delay: number;

      // Realistic jump increments starting strictly from 0
      if (current === 0) {
        // First jump from 0
        next = Math.floor(Math.random() * 8) + 14; // ~14 - 21
        delay = Math.floor(Math.random() * 100) + 180; // 180 - 280ms
      } else if (current < 35) {
        next = current + Math.floor(Math.random() * 14) + 12; // jumps to ~28 - 45
        delay = Math.floor(Math.random() * 120) + 200;
      } else if (current < 60) {
        next = current + Math.floor(Math.random() * 12) + 15; // jumps to ~50 - 70
        delay = Math.floor(Math.random() * 140) + 220;
      } else if (current < 80) {
        // Jump into 80s (like 83 in screenshot)
        next = Math.min(current + Math.floor(Math.random() * 10) + 12, 85); // jumps to ~80 - 85
        delay = Math.floor(Math.random() * 150) + 240;
      } else if (current < 95) {
        // If 3D model is still preparing and we've reached ~83+, hold lightly
        if (!isModelReady && current >= 83) {
          delay = 200;
          timeoutId = setTimeout(runStep, delay);
          return;
        }
        next = Math.min(current + Math.floor(Math.random() * 8) + 8, 97); // ~92 - 97
        delay = Math.floor(Math.random() * 120) + 180;
      } else {
        // Final snap to 100
        next = 100;
        delay = 160;
      }

      next = Math.min(next, 100);
      progressRef.current = next;
      setProgress(next);

      timeoutId = setTimeout(runStep, delay);
    };

    // Begin immediately from 0 with initial delay
    timeoutId = setTimeout(runStep, 100);

    return () => clearTimeout(timeoutId);
  }, [isModelReady, onComplete]);

  // Radius 140 -> circumference 2 * Math.PI * 140 = 879.645
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  if (isExitDone) return null;

  return (
    <motion.div
      key="site-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      animate={
        progress === 100
          ? { opacity: 0, transition: { duration: 0.6, delay: 0.25, ease: 'easeInOut' } }
          : { opacity: 1 }
      }
      className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Center Circular Counter */}
      <div className="relative flex items-center justify-center">
        {/* SVG Progress Circle */}
        <svg
          className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          viewBox="0 0 320 320"
        >
          {/* Subtle Background Track */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="rgba(250, 243, 224, 0.12)"
            strokeWidth="1.5"
          />

          {/* Foreground Active Progress Stroke with smooth transition */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="#FAF3E0"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(90 160 160)"
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>

        {/* Big Centered Number in Serif font */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-7xl sm:text-8xl md:text-9xl font-light text-[#FAF3E0] tracking-tight tabular-nums select-none"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            {progress}
          </span>
        </div>
      </div>

      {/* Bottom Loading... Text */}
      <div className="absolute bottom-10 sm:bottom-14 left-0 right-0 flex justify-center">
        <span className="text-white/80 text-xs sm:text-[13px] font-normal tracking-wide animate-pulse">
          Loading...
        </span>
      </div>
    </motion.div>
  );
};
