import React, { useState } from 'react';
import { SITE_INFO } from '../../data/nfcsData';
import { Send, Check } from 'lucide-react';
import { NfcsLogo } from '../NfcsLogo';

export const FooterNewsletter: React.FC = () => {
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
    <>
      {/* Top Header Banner Row */}
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

      {/* Column 1 Newsletter */}
      <div className="md:col-span-4 space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Join Our Newsletter</h4>
        <p className="text-xs text-stone-400 leading-relaxed">
          Get weekly Gospel reflections, St. Peter's Chaplaincy announcements, and forum updates.
        </p>

        {subscribed ? (
          <div className="bg-emerald-900/80 border border-emerald-700 text-emerald-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Thank you for subscribing! God bless you.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-xs rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:border-indigo-500 flex-1"
            />
            <button
              type="submit"
              className="bg-[#4D2EAB] hover:bg-[#3B2285] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </>
  );
};
