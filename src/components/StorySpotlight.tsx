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
    <section className="bg-white py-16 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Student Voices
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Stories Of Lives Transformed Through Faith At UNN
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Student Photo Frame */}
            <div className="md:col-span-5">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-200 shadow-md">
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
                <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {current.role}
                </span>
              </div>
            </div>

            {/* Quote & Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Quote className="w-5 h-5 fill-emerald-800" />
              </div>

              <blockquote className="text-base sm:text-lg font-bold text-stone-900 leading-snug italic">
                "{current.quote}"
              </blockquote>

              <div>
                <h4 className="font-bold text-stone-900 text-base">{current.name}</h4>
                <p className="text-xs text-stone-500 font-medium">{current.department}</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('spiritual')}
                  className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                >
                  <span>Read Student Forum Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Carousel Slider Navigation Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-200/80">
            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-emerald-700' : 'w-2.5 bg-stone-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
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
