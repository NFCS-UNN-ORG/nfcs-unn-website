import React from 'react';
import { ArrowUpRight, Calendar, Users, Heart, BookOpen, Shield, Cross } from 'lucide-react';
import { PageTab } from '../types';

interface CampaignsGridProps {
  onNavigate: (tab: PageTab) => void;
}

export const CampaignsGrid: React.FC<CampaignsGridProps> = ({ onNavigate }) => {
  const campaigns = [
    {
      category: 'First Year Forum',
      title: 'Fresher Orientation & Mentorship',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
      description: 'Guiding 100L and Direct Entry students through UNN course registration, hostel living, and spiritual stability.',
      progress: '100% Onboarding',
    },
    {
      category: 'Final Year Forum',
      title: 'Graduation Thanksgiving & NYSC Prep',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600',
      description: 'Career guidance, moral integrity in leadership, alumni transition, and thanksgiving Mass for graduating Lions.',
      progress: 'Class of 2026',
    },
    {
      category: 'Spiritual Fellowship',
      title: 'Tuesday Praise, Worship & Word',
      image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=600',
      description: 'Weekly mid-week fellowship at St. Peter\'s Chaplaincy to recharge spiritually and build Christian bonds.',
      progress: 'Every Tuesday 5PM',
    },
    {
      category: 'Pious Devotion',
      title: 'Block Rosary & Marian Processions',
      image: 'https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=600',
      description: 'Daily evening Rosary devotions at St. Peter\'s Grotto and May/October Marian processions around campus.',
      progress: 'Daily @ 6:30PM',
    },
    {
      category: 'Faculty Chapters',
      title: 'CASSOS, ACES, FECAMDS & CLA',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
      description: 'Uniting Catholic students within Engineering, Social Sciences, Medical Sciences, Law, and Arts faculties.',
      progress: '5 Faculties',
    },
    {
      category: 'Charity & Mercy',
      title: 'St. Vincent de Paul Prison & Hospital Visits',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
      description: 'Putting faith into action by donating food, clothes, and spiritual comfort to prisoners, hospitals, and indigent students.',
      progress: 'Caritas Mission',
    },
  ];

  return (
    <section className="bg-transparent py-16 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left Title & Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1 rounded-full inline-block border border-white/15 backdrop-blur-md">
              Our Initiatives
            </span>
            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
              Join Our Programs & Be A Part Of Spiritual & Social Transformation
            </h2>
          </div>

          <div>
            <button
              onClick={() => onNavigate('spiritual')}
              className="inline-flex items-center gap-1.5 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all shrink-0 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>See All Programs</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((card, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-4 border border-white/15 shadow-xl hover:border-white/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(77, 46, 171, 0.12) 100%)',
              }}
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-slate-900 mb-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <span className="absolute top-3 left-3 bg-[#080A26]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs uppercase border border-white/20 backdrop-blur-md">
                    • {card.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 font-light">
                  {card.description}
                </p>
              </div>

              <div>
                <div className="bg-white/5 p-2 rounded-lg mb-3 border border-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-300">
                    <span>Schedule / Status</span>
                    <span className="text-amber-300 font-semibold">{card.progress}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('spiritual')}
                  className="w-full flex items-center justify-center gap-1 text-xs font-semibold text-white hover:text-amber-300 bg-white/10 hover:bg-white/20 py-2 rounded-xl border border-white/15 transition-all cursor-pointer"
                >
                  <span>Participate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
