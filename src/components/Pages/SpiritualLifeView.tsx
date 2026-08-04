import React, { useState } from 'react';
import { MASS_SCHEDULES, PIOUS_SOCIETIES, SITE_INFO } from '../../data/nfcsData';
import { Cross, Clock, MapPin, Calendar, Heart, Sparkles, BookOpen, Users, Shield } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const SpiritualLifeView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Devotional', 'Charity & Service', 'Liturgical'];

  const filteredSocieties = selectedCategory === 'All'
    ? PIOUS_SOCIETIES
    : PIOUS_SOCIETIES.filter((s) => s.category === selectedCategory);

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Spiritual Life & Activities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Mass Schedules, Forums & Pious Societies at UNN
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Nourishing your soul through the Holy Sacraments, mid-week general fellowships, First & Final Year Forums, and active pious societies at St. Peter's Chaplaincy.
          </p>
        </div>

        {/* Section 1: Mass & Sacraments Schedule Card Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-stone-900">Holy Mass & Sacramental Schedule</h2>
              <p className="text-xs text-stone-500">St. Peter's Catholic Chaplaincy, UNN Nsukka</p>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full hidden sm:inline-block">
              Daily Sacramental Grace
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MASS_SCHEDULES.map((sched, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Cross className="w-5 h-5" />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {sched.type}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 mt-2">{sched.day}</h3>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                  {sched.times.map((time, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{time}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium pt-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{sched.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: General Fellowships & Student Forums */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* General Fellowships */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">General Fellowships</h3>
            <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 py-1 px-3 rounded-full inline-block">
              Every Tuesday @ 5:00 PM
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Our mid-week general gatherings bring Catholic students from all faculties together for soul-stirring praise, worship, Bible sharing, topical talks on student life, and fervent intercessory prayers.
            </p>
            <ul className="text-xs text-stone-600 space-y-1.5 pt-2 list-disc list-inside">
              <li>Praise & Worship led by STPEC Choir</li>
              <li>Exposition & Word Reflections</li>
              <li>Brotherly & Sisterly Fellowship</li>
            </ul>
          </div>

          {/* First Year Forum (FYF) */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">First Year Forum (FYF)</h3>
            <p className="text-xs text-amber-800 font-semibold bg-amber-50 py-1 px-3 rounded-full inline-block">
              For Freshers & Direct Entry
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Designed specifically to welcome, orient, and integrate freshers into campus life at UNN. We provide course registration support, hostel advice, academic tutorials, and spiritual mentorship.
            </p>
            <ul className="text-xs text-stone-600 space-y-1.5 pt-2 list-disc list-inside">
              <li>Fresher Welcome Party & Orientation</li>
              <li>Academic Tutorial Groups</li>
              <li>Spiritual Integration into Chaplaincy</li>
            </ul>
          </div>

          {/* Final Year Forum (FYF) */}
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Final Year Forum (FYF)</h3>
            <p className="text-xs text-purple-800 font-semibold bg-purple-50 py-1 px-3 rounded-full inline-block">
              For Finalists & Class of 2026
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Preparing graduating students for life after UNN. Focuses on project defense perseverance, job market readiness, NYSC orientation, career ethics, and graduating thanksgiving Mass.
            </p>
            <ul className="text-xs text-stone-600 space-y-1.5 pt-2 list-disc list-inside">
              <li>Career & NYSC Preparation Workshops</li>
              <li>Finalist Thanksgiving Holy Mass</li>
              <li>Smooth Transition to NFCS Alumni Body</li>
            </ul>
          </div>

        </div>

        {/* Section 3: Pious Societies Catalog */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
                Pious Societies & Ministries
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Find Your Spiritual Family
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Join any of our active Marian, liturgical, or charitable societies at St. Peter's Chaplaincy
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSocieties.map((society) => (
              <div
                key={society.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white bg-emerald-800 px-2.5 py-1 rounded-lg">
                      {society.acronym}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                      {society.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900">{society.name}</h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {society.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700">Meeting:</span>
                    <span className="font-bold text-emerald-800">{society.meetingDay} @ {society.meetingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-500">
                    <span>Venue:</span>
                    <span className="font-medium">{society.venue}</span>
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
