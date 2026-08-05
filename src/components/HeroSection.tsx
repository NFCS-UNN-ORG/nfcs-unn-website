import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { PageTab } from '../types';
import { SITE_INFO } from '../data/nfcsData';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative -mt-[70px] pt-[76px] lg:pt-[96px] pb-24 lg:pb-32 overflow-x-hidden bg-gradient-to-b from-[#F5F2FF] via-stone-50 to-white dark:from-[#0D103D] dark:via-[#080A26] dark:to-[#080A26] text-stone-900 dark:text-slate-100 transition-colors duration-400">
      {/* Ambient Glowing Background Orbs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#4D2EAB]/15 dark:bg-[#4D2EAB]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Repeating Diagonal Marquee Background Ribbon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] rotate-[-6deg] bg-[#4D2EAB]/5 dark:bg-white/5 py-3.5 pointer-events-none select-none overflow-hidden whitespace-nowrap z-0">
        <div className="text-[#4D2EAB]/15 dark:text-white/10 font-black text-2xl sm:text-4xl tracking-widest uppercase flex gap-8 animate-marquee">
          <span>LIVING THE FAITH • WHO CARES? NFCS DOES! • ST. PETER'S CHAPLAINCY UNN • EST. 1956 •</span>
          <span>LIVING THE FAITH • WHO CARES? NFCS DOES! • ST. PETER'S CHAPLAINCY UNN • EST. 1956 •</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Angled Media Frame */}
          <div className="hidden lg:block lg:col-span-3 transform -rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105">
            <div className="bg-[#4D2EAB]/5 dark:bg-slate-900/80 p-3 rounded-2xl shadow-2xl border border-[#4D2EAB]/20 dark:border-slate-800/80 backdrop-blur-md">
              <div className="relative aspect-4/5 rounded-xl bg-stone-200 dark:bg-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 group">
                <img
                  src="/assets/st-albert.jpg"
                  alt="St. Albert the Great"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white mt-auto text-center p-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-[#4D2EAB] px-2.5 py-1 rounded-full shadow-sm">
                    Patron Saint
                  </span>
                  <p className="text-xs font-semibold mt-1.5 text-white/95">St. Albert the Great</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Hero Content Column */}
          <div className="lg:col-span-6 text-center max-w-2xl mx-auto space-y-6">

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
              Living The Faith, Building A Strong Catholic Community At UNN
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Welcoming all students to their spiritual home at <strong className="text-stone-800 dark:text-white font-semibold">{SITE_INFO.chaplaincy}</strong>.
              Growing together in prayer, academic excellence, leadership, and lifelong Catholic brotherhood.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('spiritual')}
                className="flex items-center gap-2 bg-[#4D2EAB] hover:bg-[#3B2285] dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Join NFCS & View Mass Times</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-2 bg-[#4D2EAB]/10 dark:bg-slate-900/90 hover:bg-[#4D2EAB]/20 dark:hover:bg-slate-800 text-[#4D2EAB] dark:text-indigo-300 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full border border-[#4D2EAB]/30 dark:border-slate-700/80 shadow-xs transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#4D2EAB] dark:text-indigo-400" />
                <span>Explore Our History</span>
              </button>
            </div>

          </div>

          {/* Right Angled Media Frame */}
          <div className="hidden lg:block lg:col-span-3 transform rotate-6 hover:rotate-0 transition-all duration-500 hover:scale-105">
            <div className="bg-[#4D2EAB]/5 dark:bg-slate-900/80 p-3 rounded-2xl shadow-2xl border border-[#4D2EAB]/20 dark:border-slate-800/80 backdrop-blur-md">
              <div className="relative aspect-4/5 rounded-xl bg-stone-200 dark:bg-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="First Year Forum Students Orientation"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white mt-auto text-center p-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-600 px-2.5 py-1 rounded-full shadow-sm">
                    Student Life
                  </span>
                  <p className="text-xs font-semibold mt-1.5 text-white/95">First Year Forum Orientation</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
