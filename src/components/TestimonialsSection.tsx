import React from 'react';
import { TESTIMONIALS } from '../data/nfcsData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-transparent py-16 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1 rounded-full inline-block border border-white/15 backdrop-blur-md">
            Community Voices
          </span>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
            Hear From Our Students & Alumni: Together, We Stand Firm
          </h2>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-6 border border-white/15 shadow-xl hover:border-white/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(77, 46, 171, 0.12) 100%)',
              }}
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center">
                  <Quote className="w-5 h-5 fill-amber-300" />
                </div>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic font-light">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-4">
                <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                <p className="text-xs text-slate-400 font-light">
                  {item.department} {item.gradYear ? `(Class of ${item.gradYear})` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
