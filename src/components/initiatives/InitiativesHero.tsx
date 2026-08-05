import React from 'react';
import { Sparkles, Heart, Users } from 'lucide-react';
import { NfcsLogo } from '../NfcsLogo';

interface InitiativesHeroProps {
  onVolunteerClick: () => void;
}

export const InitiativesHero: React.FC<InitiativesHeroProps> = ({ onVolunteerClick }) => {
  return (
    <div className="relative bg-gradient-to-b from-stone-100 to-white dark:from-slate-900 dark:to-[#080A26] rounded-3xl p-8 sm:p-14 border border-stone-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
      <div className="absolute -top-3 -right-12 sm:right-10 bg-emerald-700 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest px-12 py-2.5 rotate-6 shadow-md z-10 border-b-2 border-emerald-900 pointer-events-none">
        EMPOWERING LIVES • BUILDING FUTURE
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-0">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>NFCS UNN Projects & Student Initiatives</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.15]">
            Join Our Projects & Student Welfare Initiatives For A Brighter Future
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Join our student-led initiatives to drive meaningful spiritual growth, support indigent undergraduates with tuition grants, upgrade St. Peter's Chaplaincy facilities, and build a brighter future for Catholic Lions & Lionesses at UNN.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#projects-grid"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-emerald-300 stroke-none" />
              <span>Support A Project</span>
            </a>
            <button
              onClick={onVolunteerClick}
              className="inline-flex items-center gap-2 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-stone-300 dark:border-slate-700 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
              <span>Volunteer In A Ministry</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="p-6 bg-white dark:bg-[#0C0F38] rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xl text-center space-y-3 max-w-sm w-full">
            <div className="flex justify-center">
              <NfcsLogo size={90} />
            </div>
            <h3 className="font-extrabold text-stone-900 dark:text-white text-sm">St. Peter's Chaplaincy Projects</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
              Transparency & accountability in service of God and fellow Catholic undergraduates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
