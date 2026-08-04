import React from 'react';
import { ArrowUpRight, Compass, Target, CheckCircle2 } from 'lucide-react';
import { PageTab } from '../types';
import { SITE_INFO } from '../data/nfcsData';

interface VisionMissionSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ onNavigate }) => {
  return (
    <section className="bg-stone-50 py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Blocks */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Vision & Mission
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Fostering A Vibrant Catholic Community Where Students Flourish Spiritually & Academically
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Vision Box */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">Our Vision</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  To create a welcoming, saintly, and intellectually vibrant environment where every Catholic student at UNN discovers their divine purpose and thrives in faith.
                </p>
              </div>

              {/* Mission Box */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base">Our Mission</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  To empower students by providing sound liturgical formation at St. Peter's Chaplaincy, fostering academic excellence, and cultivating Christian fellowship across UNN.
                </p>
              </div>
            </div>

            {/* Key Pillars Checklist */}
            <div className="space-y-2 pt-2 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Daily & Sunday Mass celebrations at St. Peter's Chaplaincy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>First Year & Final Year Forum orientation and mentorship programs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Active Faculty Catholic Associations (CASSOS, ACES, FECAMDS, CLA, CABS)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('spiritual')}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xs transition-colors"
              >
                <span>Join Our Fellowships</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-800 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full border border-stone-300 shadow-xs transition-colors"
              >
                <span>Read More About Us</span>
              </button>
            </div>

          </div>

          {/* Right Column Image Box */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 rounded-3xl shadow-xl border border-stone-200">
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=800"
                  alt="St. Peter's Chaplaincy UNN Main Church"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Spiritual Home
                  </span>
                  <h4 className="text-lg font-bold">St. Peter's Catholic Chaplaincy, UNN</h4>
                  <p className="text-xs text-stone-300 mt-1">Nurturing souls at Nsukka campus since 1956.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
