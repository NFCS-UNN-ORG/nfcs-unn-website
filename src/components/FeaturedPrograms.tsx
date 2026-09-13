import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';

interface FeaturedProgramsProps {
  onNavigate: (tab: PageTab) => void;
}

export const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ onNavigate }) => {
  const cards = [
    {
      category: 'Spiritual Growth',
      title: "St. Peter's Sunday Mass & Adoration",
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
    {
      category: 'Campus Welfare',
      title: 'St. Vincent de Paul Charity & Outreach',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600',
      description: 'Providing food support, visitation to sick students, and emergency assistance to indigent campus members.',
      statLabel: 'Students Supported',
      statPercent: '300+ Annually',
      tab: 'spiritual' as PageTab,
    },
    {
      category: 'Liturgical Worship',
      title: 'STPEC Choir & Sacred Music Ministry',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600',
      description: 'Elevating Sunday and weekday Masses through Gregorian hymns, solemn chorals, and orchestral sacred music.',
      statLabel: 'Choral Rehearsals',
      statPercent: 'Weekly Sessions',
      tab: 'spiritual' as PageTab,
    },
    {
      category: 'Academic Excellence',
      title: 'Faculty Fellowships & Tutorials',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
      description: 'Free peer-to-peer tutorial sessions, past question revisions, and exam prayers across all UNN faculties.',
      statLabel: 'Faculties Covered',
      statPercent: '15 Faculties',
      tab: 'about' as PageTab,
    },
  ];

  // Duplicate cards for a seamless, continuous infinite marquee
  const marqueeCards = [...cards, ...cards];

  return (
    <section className="relative z-20 w-full -mt-12 sm:-mt-16 mb-20 overflow-hidden text-white">
      <div className="text-center mb-6 px-4">
        <span className="text-xs font-medium uppercase tracking-wider text-amber-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/15 shadow-xs backdrop-blur-md inline-block">
          Featured Programs & Fellowships
        </span>
      </div>

      {/* Marquee Wrapper with soft edge gradient mask */}
      <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="animate-marquee-cards flex gap-6 px-6">
          {marqueeCards.map((card, idx) => (
            <div
              key={idx}
              style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
              className="w-[300px] sm:w-[360px] shrink-0 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/15 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group hover:border-white/30"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-800 mb-4 shadow-inner">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-xs border border-white/15">
                    • {card.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {card.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 font-light">
                  {card.description}
                </p>
              </div>

              <div>
                {/* Progress/Stat Indicator Bar */}
                <div className="bg-white/5 p-2.5 rounded-lg mb-4 border border-white/10 backdrop-blur-sm">
                  <div className="flex justify-between items-center text-xs text-slate-300 font-light mb-1.5">
                    <span>{card.statLabel}</span>
                    <span className="font-semibold text-amber-300">{card.statPercent}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#4D2EAB] to-indigo-500 rounded-full w-full"></div>
                  </div>
                </div>

                {/* Card Action Link */}
                <button
                  onClick={() => onNavigate(card.tab)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-white hover:text-white bg-white/10 hover:bg-white/20 py-2.5 rounded-xl border border-white/15 transition-all backdrop-blur-md group cursor-pointer"
                >
                  <span>Learn More & Attend</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
