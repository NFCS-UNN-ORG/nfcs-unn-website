import React from 'react';
import { PageTab } from '../../types';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SITE_INFO } from '../../data/nfcsData';

interface FooterLinksProps {
  onNavigate: (tab: PageTab) => void;
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Column 2: Quick Links */}
      <div className="md:col-span-2 space-y-3">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigation</h4>
        <ul className="space-y-2 text-xs text-stone-400">
          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              About Us & Exco
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('initiatives')} className="hover:text-white transition-colors cursor-pointer">
              Projects & Impact
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('donations')} className="hover:text-white transition-colors cursor-pointer">
              Support & Donate
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors cursor-pointer">
              Events Calendar
            </button>
          </li>
        </ul>
      </div>

      {/* Column 3: Structure & Resources */}
      <div className="md:col-span-3 space-y-3">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Structure & Resources</h4>
        <ul className="space-y-2 text-xs text-stone-400">
          <li>
            <button onClick={() => onNavigate('mass-confession')} className="hover:text-white transition-colors cursor-pointer">
              Mass Times & Confession
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('organs')} className="hover:text-white transition-colors cursor-pointer">
              5 NFCS Organs
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('calendar')} className="hover:text-white transition-colors cursor-pointer">
              Unified Calendar
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer">
              Reflections & Blog
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
              FAQ & Help Center
            </button>
          </li>
        </ul>
      </div>

      {/* Column 4: Contact & Location */}
      <div className="md:col-span-3 space-y-3">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Chaplaincy Contact</h4>
        <div className="space-y-2.5 text-xs text-stone-400">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{SITE_INFO.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{SITE_INFO.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{SITE_INFO.email}</span>
          </div>
        </div>
      </div>
    </>
  );
};
