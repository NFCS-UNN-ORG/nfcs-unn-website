import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { SITE_INFO } from '../data/nfcsData';

export const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="bg-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        {/* Decorative background radial light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[11px] uppercase tracking-wider font-extrabold bg-emerald-800 text-emerald-200 px-3 py-1 rounded-full inline-block border border-emerald-700">
              Stay Connected • NFCS UNN Newsletter
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Get In Touch With Us & Receive Weekly Spiritual Reflections
            </h2>

            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              Subscribe to the official NFCS UNN newsletter to receive weekly Gospel meditations, upcoming Mass and fellowship schedules at St. Peter's Chaplaincy, and student announcements delivered straight to your inbox.
            </p>
          </div>

          {/* Subscription Input Box */}
          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="bg-emerald-800/90 border border-emerald-600 rounded-2xl p-5 text-center space-y-2 animate-in fade-in duration-300">
                <CheckCircle2 className="w-8 h-8 text-emerald-300 mx-auto" />
                <h4 className="font-bold text-white text-base">You're Subscribed!</h4>
                <p className="text-xs text-emerald-200">
                  Welcome to the NFCS UNN family. May God bless your academic session!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-2 px-3 text-emerald-200 w-full sm:w-auto flex-1">
                    <Mail className="w-4 h-4 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="bg-transparent border-none text-white placeholder-emerald-300/80 text-xs sm:text-sm focus:outline-hidden w-full py-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] text-emerald-200/80 text-center sm:text-left">
                  We respect your privacy. Unsubscribe anytime. Slogan: <span className="italic">"{SITE_INFO.slogan}"</span>
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
