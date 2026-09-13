import React from 'react';
import { ArrowUpRight, Compass, Target, CheckCircle2 } from 'lucide-react';
import { PageTab } from '../types';

interface VisionMissionSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ onNavigate }) => {
  return (
    <section className="bg-transparent py-20 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Blocks */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-medium uppercase tracking-wider text-amber-300 bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/15 backdrop-blur-md shadow-xs">
                Vision & Mission
              </span>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white leading-tight">
                Fostering A Vibrant Catholic Community <br className="hidden sm:inline" />
                <span className="font-normal text-white">Where Students Flourish Spiritually & Academically</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Vision Box with 135deg Gradient */}
              <div
                style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
                className="backdrop-blur-xl p-5 rounded-2xl border border-white/15 shadow-xl space-y-2.5 hover:border-white/25 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 border border-white/15 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  To create a welcoming, saintly, and intellectually vibrant environment where every Catholic student at UNN discovers their divine purpose and thrives in faith.
                </p>
              </div>

              {/* Mission Box with 135deg Gradient */}
              <div
                style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
                className="backdrop-blur-xl p-5 rounded-2xl border border-white/15 shadow-xl space-y-2.5 hover:border-white/25 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 border border-white/15 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  To empower students by providing sound liturgical formation at St. Peter's Chaplaincy, fostering academic excellence, and cultivating Christian fellowship across UNN.
                </p>
              </div>
            </div>

            {/* Key Pillars Checklist */}
            <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300 font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Daily & Sunday Mass celebrations at St. Peter's Chaplaincy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>First Year & Final Year Forum orientation and mentorship programs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Active Faculty Catholic Associations (CASSOS, ACES, FECAMDS, CLA, CABS)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('spiritual')}
                className="flex items-center gap-2 bg-white hover:bg-slate-100 text-stone-900 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <span>Join Our Fellowships</span>
                <ArrowUpRight className="w-4 h-4 text-stone-900" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full border border-white/20 shadow-xs transition-all backdrop-blur-md cursor-pointer"
              >
                <span>Read More About Us</span>
              </button>
            </div>

          </div>

          {/* Right Column Image Box with 135deg Gradient & Glassmorphism */}
          <div className="lg:col-span-5">
            <div
              style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
              className="backdrop-blur-xl p-3 rounded-3xl shadow-xl border border-white/15 hover:border-white/25 transition-all"
            >
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=800"
                  alt="St. Peter's Chaplaincy UNN Main Church"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">
                    Spiritual Home
                  </span>
                  <h4 className="text-lg font-semibold">St. Peter's Catholic Chaplaincy, UNN</h4>
                  <p className="text-xs text-slate-300 mt-1 font-light">Nurturing souls at Nsukka campus since 1956.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
