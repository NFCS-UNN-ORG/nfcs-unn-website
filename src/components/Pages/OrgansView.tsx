import React from 'react';
import { NFCS_ORGANS } from '../../data/nfcsData';
import { Shield, Clock, MapPin, CheckCircle2, Users, Music, Megaphone, HeartHandshake, BookOpen } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const OrgansView: React.FC = () => {
  const getOrganIcon = (acronym: string) => {
    switch (acronym) {
      case 'ELC':
        return <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case 'STPEC Choir':
        return <Music className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'UPO':
        return <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'PMC':
        return <Megaphone className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'WSO':
        return <HeartHandshake className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      default:
        return <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full inline-block">
            NFCS UNN Organizational Structure
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            The 5 Organs of NFCS UNN
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every Catholic student at UNN is encouraged to belong to at least one organ to serve God with their talents, build lasting Christian friendships, and grow spiritually.
          </p>
        </div>

        {/* 5 Organs Grid */}
        <div className="space-y-8">
          <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">Active Organs & Meeting Schedules</h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">Regular meeting days, times, and venues at St. Peter's Catholic Chaplaincy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NFCS_ORGANS.map((organ) => (
              <div
                key={organ.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-slate-800 flex items-center justify-center">
                      {getOrganIcon(organ.acronym)}
                    </div>
                    <span className="text-xs font-extrabold text-white bg-[#4D2EAB] dark:bg-indigo-600 px-3 py-1 rounded-xl">
                      {organ.acronym}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">{organ.name}</h3>
                    <p className="text-xs text-stone-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {organ.description}
                    </p>
                  </div>

                  {/* Core Responsibilities */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-slate-500">
                      Core Duties:
                    </p>
                    {organ.roles.map((role, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 text-xs text-stone-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meeting Schedule Badge */}
                <div className="pt-4 border-t border-stone-100 dark:border-slate-800 space-y-2 bg-stone-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 dark:text-slate-300">Meeting Day:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{organ.meetingDay}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700 dark:text-slate-300">Meeting Time:</span>
                    <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {organ.meetingTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-slate-400 pt-1 border-t border-stone-200/60 dark:border-slate-700">
                    <span>Venue:</span>
                    <span className="font-medium text-stone-800 dark:text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {organ.venue}
                    </span>
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
