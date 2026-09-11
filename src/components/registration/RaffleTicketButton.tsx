import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

interface RaffleTicketButtonProps {
  onClick?: () => void;
  className?: string;
}

// Precise SVG Path tracing a classic raffle ticket (320px x 72px):
// - 4 rounded corners (r=10)
// - Top & bottom semicircular perforation notch cutouts at x=84 (r=9)
// - Left & right semicircular edge notch cutouts at y=36 (r=9)
const TICKET_PATH =
  'M 10 0 L 75 0 A 9 9 0 0 0 93 0 L 310 0 A 10 10 0 0 1 320 10 L 320 27 A 9 9 0 0 0 320 45 L 320 62 A 10 10 0 0 1 310 72 L 93 72 A 9 9 0 0 0 75 72 L 10 72 A 10 10 0 0 1 0 62 L 0 45 A 9 9 0 0 0 0 27 L 0 10 A 10 10 0 0 1 10 0 Z';

export const RaffleTicketButton: React.FC<RaffleTicketButtonProps> = React.memo(({
  onClick,
  className = 'mb-28 md:mb-0 md:mt-16',
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={`relative w-[280px] min-[360px]:w-[295px] sm:w-[325px] max-w-[calc(100vw-32px)] h-[66px] sm:h-[72px] cursor-pointer select-none group focus:outline-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)] hover:drop-shadow-[0_14px_40px_rgba(251,226,2,0.38)] transition-all duration-300 ${className}`}
      aria-label="Book Raffle Tickets Now"
    >
      {/* SVG Ticket Shell: Background fill, notch borders, perforation, and moving laser beam */}
      <svg
        viewBox="0 0 320 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Rich brand green ticket body gradient */}
          <linearGradient id="ticket-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#166C16" />
            <stop offset="55%" stopColor="#175319" />
            <stop offset="100%" stopColor="#0D3510" />
          </linearGradient>

          {/* Ambient inner gold glow */}
          <radialGradient id="ticket-inner-glow" cx="65%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBE202" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FBE202" stopOpacity="0" />
          </radialGradient>

          {/* Glowing laser comet for moving border effect */}
          <linearGradient id="ticket-beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBE202" stopOpacity="0" />
            <stop offset="40%" stopColor="#FBE202" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FBE202" stopOpacity="0.2" />
          </linearGradient>

          {/* Drop shadow filter for laser beam */}
          <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Ticket Solid Background Body */}
        <path d={TICKET_PATH} fill="url(#ticket-bg-gradient)" />

        {/* 2. Soft Gold Radial Ambient Light */}
        <path d={TICKET_PATH} fill="url(#ticket-inner-glow)" />

        {/* 3. Base Ticket Outline Border (subtle 15% opacity, 0.75px fine line) */}
        <path
          d={TICKET_PATH}
          fill="none"
          stroke="rgba(245, 245, 245, 0.15)"
          strokeWidth="0.75"
        />

        {/* 4. Vertical Perforation Dashed Line between Stub & Main Ticket */}
        <line
          x1="84"
          y1="9"
          x2="84"
          y2="63"
          stroke="rgba(255, 255, 255, 0.18)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* 5. Continuous Moving Border Laser Comet traveling around ticket contour */}
        <motion.path
          d={TICKET_PATH}
          fill="none"
          stroke="url(#ticket-beam-gradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#beam-glow)"
          initial={{ pathLength: 0.22, pathOffset: 0 }}
          animate={{ pathOffset: [0, 1] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Ticket Face Content */}
      <div className="absolute inset-0 flex items-center">
        {/* Left Stub Section (width ~84px) */}
        <div className="w-[78px] sm:w-[84px] h-full flex flex-col items-center justify-center text-center pl-2 sm:pl-3 select-none">
          <span className="text-[10px] sm:text-[11px] font-black text-[#FBE202] tracking-wider font-mono leading-none">
            № 2026
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold text-white/70 uppercase tracking-widest mt-1">
            RAFFLE
          </span>
          <span className="text-[7px] font-semibold text-white/40 tracking-wider">
            ADMIT 1
          </span>
        </div>

        {/* Right Main Ticket Body */}
        <div className="flex-1 h-full flex items-center  justify-between pl-4 pr-4 sm:pr-5">
          <div className="flex flex-col items-start text-left">
            <span className="text-base sm:text-lg font-black text-white uppercase tracking-wider leading-tight drop-shadow-sm group-hover:text-[#FBE202] transition-colors">
              Buy Now
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-[#FBE202] tracking-wide flex items-center gap-1 mt-0.5">
              <span>₦200 / TICKET</span>
            </span>
          </div>

          {/* Action Arrow in Circular Badge */}
          <div className="size-8 sm:size-9 rounded-full bg-[#FBE202]/15 border border-[#FBE202]/40 flex items-center justify-center shrink-0 group-hover:bg-[#FBE202] group-hover:border-[#FBE202] transition-colors">
            <ArrowDown className="size-4 sm:size-4.5 text-[#FBE202] group-hover:text-[#175319] group-hover:translate-y-0.5 transition-all stroke-[2.5]" />
          </div>
        </div>
      </div>
    </motion.button>
  );
});

export default RaffleTicketButton;
