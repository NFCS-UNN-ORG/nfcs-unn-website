import React from 'react';
import { GraduationCap, BookOpen, FileText, Users, Award, ShieldAlert, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { FACULTY_ASSOCIATIONS } from '../../data/nfcsData';
import { NewsletterBanner } from '../NewsletterBanner';

export const AcademicSupportView: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full inline-block">
            Academic Excellence & Support Unit
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Academic Support Services
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            NFCS UNN provides free peer tutorials, comprehensive past question repositories, study groups, and specialized exam period spiritual and academic support.
          </p>
        </div>

        {/* 4 Pillars of Academic Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Free Peer Tutorials</h3>
            <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
              Senior students in 300L - 500L host weekly tutorial sessions for difficult general courses (GSP, MTH, PHY, CHM, COS) and departmental subjects.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Past Questions Bank</h3>
            <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
              Organized electronic and physical archives of UNN past semester exam papers, solution guides, and lecture summaries categorized by faculty.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Study Groups & Clinics</h3>
            <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
              Facilitated study circles meeting at St. Peter's Chaplaincy grounds and library pavilions for collaborative problem-solving.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Exam Period Support</h3>
            <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
              Holy Mass for examinees, overnight silent study halls, exam welfare refreshments, and special intercessory Holy Hours before exams begin.
            </p>
          </div>
        </div>

        {/* Faculty Tutorial Schedules */}
        <div className="space-y-6">
          <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">Faculty Association Tutorial Centers</h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">Weekly tutorial hubs run by NFCS Faculty Chapters across UNN campus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY_ASSOCIATIONS.map((fac) => (
              <div
                key={fac.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white bg-emerald-800 dark:bg-emerald-600 px-3 py-1 rounded-lg">
                      {fac.acronym}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                      Faculty Tutorial Hub
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">{fac.fullName}</h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-600 dark:text-slate-400">
                    <span>Tutorial Schedule:</span>
                    <span className="font-bold text-stone-900 dark:text-white">Saturdays @ 10:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600 dark:text-slate-400">
                    <span>Resource Center:</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">Past Question Library</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
