import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Cross, Users, Sparkles, BookOpen, Filter } from 'lucide-react';
import { MASS_SCHEDULES, NFCS_ORGANS } from '../../data/nfcsData';
import { NewsletterBanner } from '../NewsletterBanner';

export const CalendarView: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Mass & Confession', 'General Fellowship', 'Organ Meetings', 'Events & Retreats'];

  // Combined unified calendar items
  const calendarItems = [
    {
      id: 'c1',
      title: 'Sunday Holy Mass (1st, 2nd & 3rd Mass)',
      type: 'Mass & Confession',
      day: 'Every Sunday',
      time: '6:30 AM, 8:30 AM (Student Mass), 10:30 AM & 5:00 PM',
      venue: "St. Peter's Chaplaincy Main Church",
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      id: 'c2',
      title: 'NFCS Tuesday General Fellowship',
      type: 'General Fellowship',
      day: 'Every Tuesday',
      time: '5:00 PM - 7:00 PM',
      venue: "St. Peter's Chaplaincy Main Church",
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    },
    {
      id: 'c3',
      title: 'Evangelization & Liturgical Organ (ELC) Meeting',
      type: 'Organ Meetings',
      day: 'Every Wednesday',
      time: '4:00 PM',
      venue: "St. Peter's Chaplaincy Hall A",
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      id: 'c4',
      title: 'STPEC Choir & Music Ministry Rehearsal',
      type: 'Organ Meetings',
      day: 'Mondays & Fridays',
      time: '5:00 PM',
      venue: 'Choir Rehearsal Pavilion',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
    },
    {
      id: 'c5',
      title: 'Ushering & Protocol Organ (UPO) Meeting',
      type: 'Organ Meetings',
      day: 'Every Saturday',
      time: '4:00 PM',
      venue: "St. Peter's Chaplaincy Main Church",
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      id: 'c6',
      title: 'Publicity & Media Organ (PMC) Meeting',
      type: 'Organ Meetings',
      day: 'Every Sunday',
      time: '3:00 PM',
      venue: 'Chaplaincy ICT Center',
      badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
    },
    {
      id: 'c7',
      title: 'Welfare & Socials Organ (WSO) Meeting',
      type: 'Organ Meetings',
      day: 'Every Saturday',
      time: '2:00 PM',
      venue: 'Chaplaincy Social Pavilion',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    },
    {
      id: 'c8',
      title: 'Sacrament of Reconciliation (Confession)',
      type: 'Mass & Confession',
      day: 'Saturdays & Thursdays',
      time: '5:00 PM - 6:30 PM (Sat) & After 5:30 PM Mass (Thu)',
      venue: "St. Peter's Confessional Booths",
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      id: 'c9',
      title: 'First Year & Final Year Forum Gatherings',
      type: 'General Fellowship',
      day: 'Alternate Wednesdays',
      time: '5:00 PM',
      venue: 'Chaplaincy Conference Hall',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    },
    {
      id: 'c10',
      title: 'Annual Harvest, Bazaar & Cultural Thanksgiving',
      type: 'Events & Retreats',
      day: 'October 25, 2026',
      time: '9:00 AM Mass',
      venue: "St. Peter's Chaplaincy Grounds",
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    },
  ];

  const filteredItems = filter === 'All'
    ? calendarItems
    : calendarItems.filter((i) => i.type === filter);

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 px-3 py-1 rounded-full inline-block">
            Unified Chapter Schedule
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            NFCS UNN Chapter Calendar
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            All chaplaincy Masses, organ meetings, Tuesday General Fellowships, forums, and annual chapter retreats unified in one comprehensive calendar.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-bold text-stone-800 dark:text-slate-200">Filter Calendar:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#4D2EAB] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-100 border border-stone-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-stone-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${item.badgeColor}`}>
                    {item.type}
                  </span>
                  <CalendarIcon className="w-4 h-4 text-stone-400" />
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-white">{item.title}</h3>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-slate-800 space-y-2 text-xs text-stone-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="font-bold text-stone-800 dark:text-slate-200">{item.day}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{item.venue}</span>
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
