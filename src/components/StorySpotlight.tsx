import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/nfcsData';
import { Quote, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';

interface StorySpotlightProps {
  onNavigate: (tab: PageTab) => void;
}

export const StorySpotlight: React.FC<StorySpotlightProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-transparent py-16 border-b border-white/10 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-medium uppercase tracking-wider text-amber-300 bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/15 backdrop-blur-md shadow-xs">
            Student Voices
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            Stories Of Lives Transformed <br className="hidden sm:inline" />
            <span className="font-normal text-white">Through Faith At UNN</span>
          </h2>
        </div>

        {/* Featured Testimonial Card with 135deg Gradient & Glassmorphism */}
        <div
          style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
          className="backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl relative max-w-4xl mx-auto hover:border-white/25 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Student Photo Frame */}
            <div className="md:col-span-5">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-800 shadow-md">
                <img
                  src={
                    currentIndex === 0
                      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
                      : currentIndex === 1
                      ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
                      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
                  }
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#4D2EAB] text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase shadow-xs">
                  {current.role}
                </span>
              </div>
            </div>

            {/* Quote & Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/10 text-amber-300 border border-white/15 flex items-center justify-center shadow-xs">
                <Quote className="w-5 h-5 fill-amber-300" />
              </div>

              <blockquote className="text-base sm:text-lg font-light text-white leading-relaxed italic">
                "{current.quote}"
              </blockquote>

              <div>
                <h4 className="font-semibold text-white text-base">{current.name}</h4>
                <p className="text-xs text-slate-300 font-light">{current.department}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('spiritual')}
                  className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-stone-900 font-semibold text-xs px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <span>Read Student Forum Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-900" />
                </button>
              </div>
            </div>

          </div>

          {/* Carousel Slider Navigation Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white transition-colors backdrop-blur-md cursor-pointer"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 text-white transition-colors backdrop-blur-md cursor-pointer"
                aria-label="Next story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
