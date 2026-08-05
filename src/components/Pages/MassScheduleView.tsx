import React from 'react';
import { MASS_SCHEDULES } from '../../data/nfcsData';
import { Cross, Clock, MapPin } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const MassScheduleView: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full inline-block">
            Holy Mass & Sacraments
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Mass Times & Confession Schedule
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Nourishing your soul through the Holy Sacraments, weekday Masses, and Eucharistic Adoration at St. Peter's Catholic Chaplaincy, UNN.
          </p>
        </div>

        {/* Mass Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASS_SCHEDULES.map((sched, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Cross className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    {sched.type}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white mt-2">{sched.day}</h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-300">
                  {sched.times.map((time, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 dark:text-slate-400 font-medium pt-3 border-t border-stone-100 dark:border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{sched.venue}</span>
              </div>
            </div>
          ))}
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
