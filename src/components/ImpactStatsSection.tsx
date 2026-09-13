import React from 'react';
import { SITE_INFO } from '../data/nfcsData';
import { Users, Church, Award } from 'lucide-react';

export const ImpactStatsSection: React.FC = () => {
  return (
    <section className="bg-transparent py-16 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column Title & Eyebrow */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-medium uppercase tracking-wider text-amber-300 bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/15 backdrop-blur-md shadow-xs">
              Our Campus Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white leading-tight">
              Real Spiritual & Academic Impact <br className="hidden sm:inline" />
              <span className="font-normal text-white">Through Collective Fellowship</span>
            </h2>
          </div>

          {/* Right Column Paragraph */}
          <div className="lg:col-span-6">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              At <strong className="text-white font-medium">{SITE_INFO.chapter}</strong>, we have cultivated a rich legacy of spiritual growth, academic excellence, and selfless community service. Through daily Holy Masses, faculty-level fellowships, and charitable outreaches at St. Peter's Chaplaincy, we empower Catholic students to excel both on campus and beyond.
            </p>
          </div>
        </div>

        {/* 2 Media Cards Grid with 135deg Gradient & Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div
            style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
            className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-white/15 backdrop-blur-xl group hover:border-white/30 transition-all duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800"
              alt="General Fellowship gathering at UNN"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-medium text-amber-300 tracking-wide">St. Peter's Fellowship</span>
              <h4 className="text-lg font-semibold text-white">Mid-Week Praise & Adoration</h4>
            </div>
          </div>

          <div
            style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
            className="relative aspect-16/9 rounded-2xl overflow-hidden shadow-xl border border-white/15 backdrop-blur-xl group hover:border-white/30 transition-all duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
              alt="Students in academic tutorials"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-medium text-amber-300 tracking-wide">Academic Welfare</span>
              <h4 className="text-lg font-semibold text-white">Faculty Tutorials & Peer Mentorship</h4>
            </div>
          </div>
        </div>

        {/* Big Numbers Row with 135deg Gradient & Glassmorphism */}
        <div
          style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(77, 46, 171, 0.10) 100%)' }}
          className="backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center hover:border-white/25 transition-all"
        >
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-light text-white tracking-tight flex items-center justify-center gap-2">
              <Users className="w-8 h-8 text-amber-400" />
              <span className="font-semibold">5,000+</span>
            </div>
            <p className="text-xs sm:text-sm font-light text-slate-300">Active Catholic Students</p>
          </div>

          <div className="space-y-1 border-y sm:border-y-0 sm:border-x border-white/10 py-4 sm:py-0">
            <div className="text-4xl sm:text-5xl font-light text-white tracking-tight flex items-center justify-center gap-2">
              <Church className="w-8 h-8 text-amber-400" />
              <span className="font-semibold">50+ Yrs</span>
            </div>
            <p className="text-xs sm:text-sm font-light text-slate-300">National Legacy (Est. 1956)</p>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-light text-white tracking-tight flex items-center justify-center gap-2">
              <Award className="w-8 h-8 text-amber-400" />
              <span className="font-semibold">15+</span>
            </div>
            <p className="text-xs sm:text-sm font-light text-slate-300">Pious Societies & Forums</p>
          </div>
        </div>

      </div>
    </section>
  );
};
