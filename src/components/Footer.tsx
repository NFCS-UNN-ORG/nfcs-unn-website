import React, { useState } from 'react';
import { SITE_INFO } from '../data/nfcsData';
import { MapPin, Phone, Mail, Send, Check, Heart, Sparkles } from 'lucide-react';
import { PageTab } from '../types';
import { NfcsLogo } from './NfcsLogo';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Banner Row (Matches Figma "Join Us And Make An Impact!" layout) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 border-b border-stone-800 gap-6">
          <div className="flex items-center gap-4">
            <div className="shrink-0 p-1 bg-white/10 rounded-full">
              <NfcsLogo size={52} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">NFCS UNN Chapter</h3>
              <p className="text-xs text-stone-400 font-medium">
                {SITE_INFO.motto} • Slogan: "{SITE_INFO.slogan}"
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Join Us & Stand Firm In Catholic Faith!
            </h2>
          </div>
        </div>

        {/* 4 Columns Grid + Newsletter Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-stone-800">
          
          {/* Column 1: Join Newsletter & Contact (Matches Figma Left Footer block) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Join Our Newsletter</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Get weekly Gospel reflections, St. Peter's Chaplaincy announcements, and forum updates.
            </p>

            {subscribed ? (
              <div className="bg-emerald-900/80 border border-emerald-700 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-600 w-full"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Submit
                </button>
              </form>
            )}

            <div className="pt-2 text-xs space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{SITE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{SITE_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About NFCS & History
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('initiatives')} className="hover:text-white transition-colors">
                  Projects & Welfare Initiatives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('donations')} className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Donate & Support Funds</span>
                  <Sparkles className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('get-involved')} className="hover:text-white transition-colors">
                  Get Involved (Alumni Network)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('spiritual')} className="hover:text-white transition-colors">
                  Mass Schedules & Confession
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-life')} className="hover:text-white transition-colors">
                  Student Life & Faculties
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                  Upcoming Events
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Photo & Video Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reports')} className="hover:text-white transition-colors">
                  Reports & Publications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('success-stories')} className="hover:text-white transition-colors">
                  Success Stories & Impact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us & Branches
                </button>
              </li>
              <li>
                <a
                  href="https://portal.nfcsunn.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-semibold"
                >
                  Portal Login (portal.nfcsunn.org)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Forums & Pious Societies */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Forums & Pious Societies</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>First Year Forum (FYF)</li>
              <li>Final Year Forum (FYF)</li>
              <li>Legion of Mary (LOM)</li>
              <li>Catholic Charismatic Renewal (CCRN)</li>
              <li>Block Rosary Crusade (BRC)</li>
              <li>St. Vincent de Paul Society</li>
              <li>Faculty Associations (CASSOS, ACES, FECAMDS)</li>
            </ul>
          </div>

          {/* Column 4: Design & Code Mapping */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Design & Developer Guide</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Mapped directly from the uploaded Figma wireframe to Next.js / React, Aceternity UI, and Tailwind CSS.
            </p>
            <button
              onClick={() => onNavigate('figma-guide')}
              className="inline-block bg-stone-900 hover:bg-stone-800 border border-stone-700 text-emerald-400 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
            >
              View Figma Breakdown & Strategy
            </button>
          </div>

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
