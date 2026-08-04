import React from 'react';
import { SITE_INFO } from '../data/nfcsData';
import { Users, Church, HeartHandshake, Award } from 'lucide-react';

export const ImpactStatsSection: React.FC = () => {
  return (
    <section className="bg-white py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column Title & Eyebrow */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our Campus Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Real Spiritual & Academic Impact Through Collective Fellowship
            </h2>
          </div>

          {/* Right Column Paragraph */}
          <div className="lg:col-span-6">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              At <strong className="text-stone-800">{SITE_INFO.chapter}</strong>, we have cultivated a rich legacy of spiritual growth, academic excellence, and selfless community service. Through daily Holy Masses, faculty-level fellowships, and charitable outreaches at St. Peter's Chaplaincy, we empower Catholic students to excel both on campus and beyond.
            </p>
          </div>
        </div>

        {/* 2 Media Cards Grid (Matching Figma layout center media boxes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-200 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800"
              alt="General Fellowship gathering at UNN"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold text-emerald-300">St. Peter's Fellowship</span>
              <h4 className="text-lg font-bold">Mid-Week Praise & Adoration</h4>
            </div>
          </div>

          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-200 shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
              alt="Students in academic tutorials"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold text-emerald-300">Academic Welfare</span>
              <h4 className="text-lg font-bold">Faculty Tutorials & Peer Mentorship</h4>
            </div>
          </div>
        </div>

        {/* Big Numbers Row (Matching 500k / 200+ / 100+ row in Figma screenshot) */}
        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-emerald-700" />
              <span>5,000+</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Active Catholic Students</p>
          </div>

          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-stone-200 py-4 sm:py-0">
            <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight flex items-center justify-center gap-2">
              <Church className="w-8 h-8 text-emerald-700" />
              <span>50+ Yrs</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">National Legacy (Est. 1956)</p>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight flex items-center justify-center gap-2">
              <Award className="w-8 h-8 text-emerald-700" />
              <span>15+</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Pious Societies & Forums</p>
          </div>
        </div>

      </div>
    </section>
  );
};
