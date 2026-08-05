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
    <section className="bg-stone-100/60 py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Pillars of NFCS UNN
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Focused On Key Areas To Drive Meaningful Student Growth
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate(item.tab)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-900"
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
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            View All Fellowships & Schedules
          </button>
        </div>

      </div>
    </section>
  );
};
