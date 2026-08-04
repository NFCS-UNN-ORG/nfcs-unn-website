import React from 'react';
import { TESTIMONIALS } from '../data/nfcsData';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-white py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Community Voices
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Hear From Our Students & Alumni: Together, We Stand Firm
          </h2>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Quote className="w-5 h-5 fill-emerald-800" />
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200/80 mt-4">
                <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                <p className="text-xs text-stone-500 font-medium">
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
