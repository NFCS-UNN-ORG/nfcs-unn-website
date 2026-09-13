import React from 'react';
import { Cross, GraduationCap, Users, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';

interface PillarsGridProps {
  onNavigate: (tab: PageTab) => void;
}

export const PillarsGrid: React.FC<PillarsGridProps> = ({ onNavigate }) => {
  const pillars = [
    {
      icon: <Cross className="w-6 h-6 text-emerald-700" />,
      title: 'Spiritual Life & Mass',
      description: 'Sacramental life at St. Peter\'s Chaplaincy, Sunday Student Mass, Adoration, Confession, and Retreats.',
      tab: 'spiritual' as PageTab,
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-700" />,
      title: 'Academic Excellence',
      description: 'Peer-to-peer faculty tutorials, past question banks, career mentorship, and academic excellence seminars.',
      tab: 'student-life' as PageTab,
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-700" />,
      title: 'Student Forums',
      description: 'Dedicated First Year Forum (FYF) orientation and Final Year Forum (FYF) thanksgiving & transition support.',
      tab: 'spiritual' as PageTab,
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-700" />,
      title: 'Pious Societies',
      description: 'Legion of Mary, Charismatic Renewal, Block Rosary, Choir, St. Vincent de Paul, and Prison Ministry.',
      tab: 'spiritual' as PageTab,
    },
  ];

  return (
    <section className="bg-transparent py-16 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1 rounded-full inline-block border border-white/15 backdrop-blur-md">
            Pillars of NFCS UNN
          </span>
          <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
            Focused On Key Areas To Drive Meaningful Student Growth
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 border border-white/15 shadow-xl hover:border-white/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(77, 46, 171, 0.12) 100%)',
              }}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#4D2EAB] text-amber-300 transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate(item.tab)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-300 hover:text-amber-200 cursor-pointer"
                >
                  <span>Explore Pillar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Centered Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('spiritual')}
            className="bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-full shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            View All Fellowships & Schedules
          </button>
        </div>

      </div>
    </section>
  );
};
