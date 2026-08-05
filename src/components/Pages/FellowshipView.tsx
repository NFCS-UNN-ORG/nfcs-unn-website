import React from 'react';
import { Users, Calendar, Clock, MapPin, Sparkles, BookOpen, Heart } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const FellowshipView: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 px-3 py-1 rounded-full inline-block">
            Mid-Week Spiritual Refreshment
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Student General Fellowship
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every Tuesday at 5:00 PM, Catholic students across all UNN faculties gather at St. Peter's Chaplaincy for praise, worship, Bible sharing, topical talks, and Christian brotherhood.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Praise & Worship</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Vibrant praise and worship led by STPEC Choir, raising hearts in gratitude and worship before Almighty God.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Exposition & Talks</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Inspiring talks on student life, academic integrity, Catholic apologetics, relationships, and spiritual maturity.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Brotherly Communion</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Warm fellowship, welcoming new students, sharing birthdays, and praying together as one Catholic family.
            </p>
          </div>
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
