import React from 'react';
import { EXCO_MEMBERS } from '../../data/nfcsData';
import { NewsletterBanner } from '../NewsletterBanner';
import { AboutHero } from '../about/AboutHero';
import { ExcoCard } from '../about/ExcoCard';

export const AboutPageView: React.FC = () => {
  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-10 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <AboutHero />

        {/* Executive Council Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Chapter Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              NFCS UNN Executive Council (2025/2026 Academic Session)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400">
              Dedicated student executives leading spiritual, welfare, and academic initiatives across UNN.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXCO_MEMBERS.map((member) => (
              <ExcoCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      <NewsletterBanner />
    </div>
  );
};
