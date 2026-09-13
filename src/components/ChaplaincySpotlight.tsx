import React from 'react';
import { SITE_INFO } from '../data/nfcsData';
import { ShieldCheck, Users, Church, ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';
import { NfcsLogo } from './NfcsLogo';

interface ChaplaincySpotlightProps {
  onNavigate: (tab: PageTab) => void;
}

export const ChaplaincySpotlight: React.FC<ChaplaincySpotlightProps> = ({ onNavigate }) => {
  return (
    <section className="bg-transparent py-20 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Asymmetric Image Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=600"
                  alt="St. Peter's Chaplaincy Altar"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="bg-[#16342a]/90 backdrop-blur-xl border border-white/15 text-white p-4 rounded-2xl shadow-xl">
                <p className="text-2xl font-black text-amber-300">1956</p>
                <p className="text-xs text-slate-300 font-medium">NFCS Founded Nationally</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/15 shadow-xl flex items-center gap-3">
                <NfcsLogo size={44} />
                <div>
                  <h4 className="font-bold text-white text-sm">St. Peter's Chaplaincy</h4>
                  <p className="text-xs text-slate-300">UNN Nsukka Campus Spiritual Hub</p>
                </div>
              </div>

              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="NFCS Executive Council & Student Gathering"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Right Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-white/10 px-3.5 py-1 rounded-full inline-block border border-white/15 backdrop-blur-md">
              About NFCS UNN & Chaplaincy
            </span>

            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight leading-tight">
              Dedicated To Nurturing Catholic Faith & Character Across UNN Nsukka Campus
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Under the pastoral leadership of <strong className="text-white font-medium">{SITE_INFO.chaplain}</strong> and the Executive Council, <strong className="text-white font-medium">{SITE_INFO.fullName} (UNN Chapter)</strong> serves as a spiritual anchor for thousands of Catholic undergraduates, postgraduates, and academic staff.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              Through strategic chaplaincy initiatives, pious societies, academic mentorship, and active social outreach, we ensure that every student's journey at UNN is spiritually grounded and academically fruitful.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="flex items-center gap-2 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Meet Our Executives & Read History</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
