import React from 'react';
import { Sparkles } from 'lucide-react';
import { SITE_INFO } from '../../data/nfcsData';
import { NfcsLogo } from '../NfcsLogo';

export const AboutHero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-stone-100 to-white dark:from-slate-900 dark:to-[#080A26] rounded-3xl p-8 sm:p-14 border border-stone-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
      <div className="absolute -top-3 -right-12 sm:right-10 bg-emerald-700 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest px-12 py-2.5 rotate-6 shadow-md z-10 border-b-2 border-emerald-900 pointer-events-none">
        Living The Faith • UNN Chapter
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-0">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>About NFCS UNN</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.15]">
            Together For A Better Tomorrow In Christ
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            The Nigeria Federation of Catholic Students (NFCS), University of Nigeria, Nsukka Chapter is a vibrant community dedicated to fostering spiritual growth, academic distinction, and moral leadership across the UNN campus.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-stone-700 dark:text-slate-300">
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800">
              <span className="text-emerald-800 dark:text-emerald-400">Motto:</span>
              <span>"{SITE_INFO.motto}"</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-slate-800">
              <span className="text-emerald-800 dark:text-emerald-400">Slogan:</span>
              <span>"{SITE_INFO.slogan}"</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative p-6 bg-white dark:bg-[#0C0F38] rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xl text-center space-y-3 max-w-sm w-full">
            <div className="flex justify-center">
              <NfcsLogo size={100} />
            </div>
            <h3 className="font-extrabold text-stone-900 dark:text-white text-base">St. Peter's Catholic Chaplaincy</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
              Headquartered at UNN Nsukka campus, guiding Catholic lions & lionesses since 1960.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
