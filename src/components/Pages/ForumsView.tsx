import React from 'react';
import { Sparkles, BookOpen, Users, CheckCircle2, GraduationCap } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const ForumsView: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full inline-block">
            Milestone Transition Forums
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            First Year & Final Year Forums
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Tailored guidance for students entering UNN as freshers and finalists preparing for graduation and life beyond campus.
          </p>
        </div>

        {/* Two Main Forums */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Year Forum */}
          <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-3 py-1 rounded-full inline-block">
                For Freshers & Direct Entry
              </span>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">First Year Forum (FYF)</h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                Welcoming and integrating freshers into UNN campus life. We offer hostel settling advice, course registration guidance, peer study groups, and spiritual integration into St. Peter's Chaplaincy.
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Fresher Orientation & Welcome Party</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>GSP & 100L Departmental Tutorial Groups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Fresher Thanksgiving Mass & Blessing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Year Forum */}
          <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-3 py-1 rounded-full inline-block">
                For Finalists & Graduating Students
              </span>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">Final Year Forum (FYF)</h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                Preparing graduating students for life after UNN. Focuses on project defense perseverance, career readiness, NYSC orientation, ethical leadership, and transition to the NFCS Alumni Association.
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-slate-800 text-xs text-stone-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Project Defense & Thesis Writing Workshops</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>NYSC & Career Readiness Seminars</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Finalist Thanksgiving Holy Mass & Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
