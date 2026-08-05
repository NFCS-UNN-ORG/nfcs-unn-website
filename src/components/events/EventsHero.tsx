import React from 'react';
import { Sparkles, Calendar, Search } from 'lucide-react';

interface EventsHeroProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const EventsHero: React.FC<EventsHeroProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative bg-gradient-to-b from-stone-100 to-white dark:from-slate-900 dark:to-[#080A26] rounded-3xl p-8 sm:p-14 border border-stone-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>NFCS UNN Calendar & Gathering</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-[1.15]">
          Spiritual Retreats, Academic Summits & Campus Events
        </h1>

        <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Stay informed on upcoming Masses, retreats, seminars, cultural celebrations, and community outreaches at St. Peter's Catholic Chaplaincy, UNN.
        </p>

        {/* Search Input */}
        <div className="pt-2 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search event title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-stone-900 dark:text-white focus:outline-hidden focus:border-[#4D2EAB]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
