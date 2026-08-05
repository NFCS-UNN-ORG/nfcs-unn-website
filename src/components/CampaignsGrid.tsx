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
    <section className="bg-white py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left Title & Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our Initiatives
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Join Our Programs & Be A Part Of Spiritual & Social Transformation
            </h2>
          </div>

          <div>
            <button
              onClick={() => onNavigate('spiritual')}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xs transition-colors shrink-0"
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
              className="bg-stone-50 rounded-2xl p-4 border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-200 mb-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-stone-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs uppercase">
                    • {card.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div>
                <div className="bg-white p-2 rounded-lg mb-3 border border-stone-200/80">
                  <div className="flex justify-between items-center text-xs font-semibold text-stone-700">
                    <span>Schedule / Status</span>
                    <span className="text-emerald-800 font-bold">{card.progress}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('spiritual')}
                  className="w-full flex items-center justify-center gap-1 text-xs font-bold text-stone-800 hover:text-emerald-800 bg-white hover:bg-emerald-50 py-2 rounded-xl border border-stone-200 transition-colors"
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
