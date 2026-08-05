import React from 'react';
import { FACULTY_ASSOCIATIONS } from '../../data/nfcsData';
import { GraduationCap } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const FacultiesView: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 dark:bg-sky-950 dark:text-sky-300 px-3 py-1 rounded-full inline-block">
            Faculty Catholic Associations
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Catholic Associations Across UNN Faculties
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connect with your faculty chapter for specialized academic support, peer tutorial groups, and spiritual fellowship tailored to your field of study.
          </p>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACULTY_ASSOCIATIONS.map((fac) => (
            <div
              key={fac.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-white bg-sky-800 dark:bg-sky-600 px-3 py-1 rounded-lg">
                    {fac.acronym}
                  </span>
                  {fac.patronSaint && (
                    <span className="text-[10px] font-bold text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950 px-2.5 py-0.5 rounded-full">
                      Patron: {fac.patronSaint}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-white">{fac.fullName}</h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 font-semibold">{fac.faculty}</p>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                  {fac.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between text-xs text-stone-500 dark:text-slate-400 font-medium">
                <span>Status: Active Chapter</span>
                <span className="text-sky-700 dark:text-sky-400 font-bold">UNN Campus</span>
              </div>
            </div>
          ))}
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
