import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Compass, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageTab } from '../types';
import { SITE_INFO } from '../data/nfcsData';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
  isModelReady?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, isModelReady = true }) => {
  const fullHeadline = 'Building A Strong Catholic Community In UNN';
  const [displayedHeadline, setDisplayedHeadline] = useState('');

  useEffect(() => {
    if (!isModelReady) return;
    let idx = 0;
    setDisplayedHeadline('');
    const timer = setInterval(() => {
      idx++;
      setDisplayedHeadline(fullHeadline.slice(0, idx));
      if (idx >= fullHeadline.length) {
        clearInterval(timer);
      }
    }, 42);

    return () => clearInterval(timer);
  }, [isModelReady]);

  return (
    <section id="hero" className="relative -mt-[70px] pt-[76px] lg:pt-[96px] pb-24 lg:pb-36 overflow-x-hidden bg-transparent text-white transition-colors duration-400">
      {/* Ambient Glowing Subtle Orbs */}
      <div className="absolute -top-24 left-1/6 w-96 h-96 bg-[#4D2EAB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/6 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Restructured Editorial Hero Layout with tighter spacing, 5vw left padding */}
        <div className="max-w-3xl pt-[7vh] pl-[5vw] space-y-3.5 text-left">

          {/* 'Living the Faith.' in Cormorant Garamond font-[650] with small amber period */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={isModelReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-[1.75rem] lg:text-[2.1rem] font-cormorant font-[650] text-slate-100 tracking-wide leading-none"
          >
            Living the Faith<span className="text-amber-400">.</span>
          </motion.div>

          {/* Large Editorial Headline in Cormorant Garamond Serif */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={isModelReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl lg:text-7xl font-cormorant font-light tracking-tight text-white leading-[1.08] min-h-[2.1em] sm:min-h-[1.95em]"
          >
            <span className="font-cormorant font-light text-white">
              {displayedHeadline}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-amber-400 font-light ml-0.5 select-none"
            >
              _
            </motion.span>
          </motion.h1>

          {/* Subtext in Inter (Sans-Serif Body) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isModelReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-200 font-sans text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-2xl pt-1"
          >
            Growing together in prayer, academic excellence, leadership, and lifelong Catholic brotherhood.
          </motion.p>

          {/* Actions Row: Go to Portal & Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isModelReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a
              href={SITE_INFO.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-2xl hover:shadow-purple-900/30 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Go to Portal</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('impact-stats');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-full border border-white/25 backdrop-blur-xl shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-200" />
              <span>Explore</span>
            </button>

            {/* Community Avatar Pill */}
            <div className="flex items-center gap-3 pl-1 sm:pl-3 pt-2 sm:pt-0">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/40 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                  alt="Member"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/40 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                  alt="Member"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white/40 object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                  alt="Member"
                />
              </div>
              <span className="text-xs text-slate-300 font-light flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-400 inline" />
                5,000+ UNN Catholic Students
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
