import React, { useState } from 'react';
import { PIOUS_SOCIETIES } from '../../data/nfcsData';
import { BookOpen, Clock, MapPin } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const SocietiesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Devotional', 'Charity & Service', 'Liturgical'];

  const filteredSocieties = selectedCategory === 'All'
    ? PIOUS_SOCIETIES
    : PIOUS_SOCIETIES.filter((s) => s.category === selectedCategory);

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 dark:bg-purple-950 dark:text-purple-300 px-3 py-1 rounded-full inline-block">
            Pious Societies & Ministries
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Find Your Spiritual Family
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join any of our active Marian, liturgical, or charitable societies at St. Peter's Catholic Chaplaincy, UNN.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">Active Pious Societies</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 border border-stone-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Societies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSocieties.map((society) => (
            <div
              key={society.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white bg-purple-800 dark:bg-purple-600 px-2.5 py-1 rounded-lg">
                    {society.acronym}
                  </span>
                  <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 bg-stone-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                    {society.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 dark:text-white">{society.name}</h3>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                  {society.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 space-y-1.5 text-xs text-stone-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-700 dark:text-slate-300">Meeting:</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">{society.meetingDay} @ {society.meetingTime}</span>
                </div>
                <div className="flex items-center justify-between text-stone-500 dark:text-slate-400">
                  <span>Venue:</span>
                  <span className="font-medium text-stone-800 dark:text-slate-200">{society.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
