import React from 'react';
import { ArrowUpRight, Cross, Heart, Sparkles, BookOpen } from 'lucide-react';
import { PageTab } from '../types';
import { SITE_INFO } from '../data/nfcsData';
import { NfcsLogo } from './NfcsLogo';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
  onOpenPortalModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenPortalModal }) => {
  return (
    <section className="relative bg-stone-100/70 pt-16 pb-24 overflow-hidden border-b border-stone-200">
      {/* Repeating Diagonal Marquee Background Strip (Matches Figma Hero background ribbon) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] rotate-[-6deg] bg-emerald-700/10 py-3 pointer-events-none select-none overflow-hidden whitespace-nowrap z-0">
        <div className="text-emerald-900/20 font-black text-2xl sm:text-4xl tracking-widest uppercase flex gap-8 animate-marquee">
          <span>LIVING THE FAITH • WHO CARES? NFCS DOES! • ST. PETER'S CHAPLAINCY UNN • EST. 1956 •</span>
          <span>LIVING THE FAITH • WHO CARES? NFCS DOES! • ST. PETER'S CHAPLAINCY UNN • EST. 1956 •</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Angled Media Frame (Matching Left Hero Image Box in Figma Wireframe) */}
          <div className="hidden lg:block lg:col-span-3 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-stone-200/80">
              <div className="relative aspect-4/5 rounded-xl bg-stone-200 overflow-hidden flex flex-col items-center justify-center p-4 group">
                <img
                  src="https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=600"
                  alt="St. Peter's Chaplaincy Mass"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white mt-auto text-center p-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-600 px-2 py-0.5 rounded-full">
                    Chaplaincy Life
                  </span>
                  <p className="text-xs font-semibold mt-1">St. Peter's Holy Mass</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Hero Content Column */}
          <div className="lg:col-span-6 text-center max-w-2xl mx-auto space-y-5">
            
            {/* Official Seal Emblem */}
            <div className="flex justify-center mb-1">
              <div className="p-2 bg-white rounded-full shadow-lg border border-stone-200 hover:scale-105 transition-transform">
                <NfcsLogo size={88} />
              </div>
            </div>

            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-emerald-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{SITE_INFO.chapter}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Living The Faith, Building A Strong Catholic Community At UNN
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Welcoming all students to their spiritual home at <strong className="text-stone-800 font-semibold">{SITE_INFO.chaplaincy}</strong>. 
              Growing together in prayer, academic excellence, leadership, and lifelong Catholic brotherhood.
            </p>

            {/* Slogan Banner */}
            <div className="py-2 px-4 bg-white/80 backdrop-blur-xs rounded-xl border border-stone-200 inline-block">
              <span className="text-xs sm:text-sm font-bold text-emerald-800">
                Slogan: <span className="italic">"{SITE_INFO.slogan}"</span>
              </span>
            </div>

            {/* Action Buttons Row (Matches Figma Pill Buttons) */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('spiritual')}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Join NFCS & View Mass Times</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm px-6 py-3 rounded-full border border-stone-300 shadow-xs hover:border-stone-400 transition-all"
              >
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Explore Our History</span>
              </button>
            </div>

          </div>

          {/* Right Angled Media Frame (Matching Right Hero Image Box in Figma Wireframe) */}
          <div className="hidden lg:block lg:col-span-3 transform rotate-6 hover:rotate-0 transition-transform duration-500">
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-stone-200/80">
              <div className="relative aspect-4/5 rounded-xl bg-stone-200 overflow-hidden flex flex-col items-center justify-center p-4 group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="First Year Forum Students"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="relative z-10 text-white mt-auto text-center p-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-600 px-2 py-0.5 rounded-full">
                    Student Life
                  </span>
                  <p className="text-xs font-semibold mt-1">First Year Forum Orientation</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
