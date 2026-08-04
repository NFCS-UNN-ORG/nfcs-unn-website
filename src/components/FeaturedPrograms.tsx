import React from 'react';
import { ArrowUpRight, Users, HeartHandshake, ShieldCheck, Cross } from 'lucide-react';
import { PageTab } from '../types';

interface FeaturedProgramsProps {
  onNavigate: (tab: PageTab) => void;
}

export const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ onNavigate }) => {
  const cards = [
    {
      category: 'Spiritual Growth',
      title: 'St. Peter\'s Sunday Mass & Adoration',
      image: 'https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=600',
      description: 'Central student Holy Mass every Sunday at 8:30 AM, weekly confession, and Thursday Eucharistic Adoration.',
      statLabel: 'Active Participation',
      statPercent: '100%',
      tab: 'spiritual' as PageTab,
    },
    {
      category: 'Fresher Onboarding',
      title: 'First Year Forum (FYF) Orientation',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
      description: 'Dedicated mentorship, course advice, hostel adaptation, and spiritual integration for all new UNN students.',
      statLabel: 'Freshers Onboarded',
      statPercent: '95%',
      tab: 'spiritual' as PageTab,
    },
    {
      category: 'Pious Societies',
      title: 'Legion of Mary & Charismatic Renewal',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
      description: 'Join over 15 active Marian, liturgical, and devotional societies across campus for deep spiritual fellowship.',
      statLabel: 'Active Societies',
      statPercent: '15+ Societies',
      tab: 'spiritual' as PageTab,
    },
  ];

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 mb-16">
      <div className="text-center mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Featured Programs & Fellowships
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-xl border border-stone-200/90 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              {/* Image Container */}
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-100 mb-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-stone-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  • {card.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                {card.title}
              </h3>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                {card.description}
              </p>
            </div>

            <div>
              {/* Progress/Stat Indicator Bar (Matches Figma Wireframe bar design) */}
              <div className="bg-stone-100 p-2.5 rounded-lg mb-4">
                <div className="flex justify-between items-center text-xs text-stone-600 font-medium mb-1.5">
                  <span>{card.statLabel}</span>
                  <span className="font-bold text-emerald-800">{card.statPercent}</span>
                </div>
                <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full w-full"></div>
                </div>
              </div>

              {/* Card Action Link */}
              <button
                onClick={() => onNavigate(card.tab)}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-stone-800 hover:text-emerald-800 bg-stone-50 hover:bg-emerald-50 py-2.5 rounded-xl border border-stone-200 transition-colors group"
              >
                <span>Learn More & Attend</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
