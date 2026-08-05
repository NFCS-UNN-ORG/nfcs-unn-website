import React from 'react';
import { SITE_INFO } from '../data/nfcsData';
import { PageTab } from '../types';
import { FooterNewsletter } from './footer/FooterNewsletter';
import { FooterLinks } from './footer/FooterLinks';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Top Banner */}
        <FooterNewsletter />

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-stone-800">
          <FooterLinks onNavigate={onNavigate} />
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} NFCS UNN Chapter. St. Peter's Catholic Chaplaincy. All rights reserved.</p>
          <div className="flex items-center gap-1 font-semibold text-emerald-500">
            <span>{SITE_INFO.motto}</span>
            <span>•</span>
            <span>Est. 1956</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
