import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';
import { NfcsLogo } from '../NfcsLogo';

export const DonationHero: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-4">
      <div className="inline-flex items-center gap-2 bg-[#4D2EAB]/10 dark:bg-indigo-950/80 border border-[#4D2EAB]/20 text-[#4D2EAB] dark:text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full">
        <Heart className="w-3.5 h-3.5 fill-[#4D2EAB] dark:fill-indigo-400" />
        <span>Support St. Peter's Chaplaincy & Student Welfare</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
        Invest In Faith, Education & Future Leaders At UNN
      </h1>

      <p className="text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed font-normal">
        Your generous contribution directly funds indigent student tuition relief, solar power infrastructure at St. Peter's Chaplaincy, and weekly Gospel outreaches.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-stone-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Transparent Stewardship</span>
        </div>
        <div className="flex items-center gap-1.5">
          <NfcsLogo size={20} />
          <span>Official UNN Chaplaincy Fund</span>
        </div>
      </div>
    </div>
  );
};
