import React, { useState } from 'react';
import { Award, GraduationCap, Building2, Users, HeartHandshake, CheckCircle2, Send, Globe } from 'lucide-react';
import { TESTIMONIALS } from '../../data/nfcsData';
import { NewsletterBanner } from '../NewsletterBanner';

export const AlumniView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 dark:bg-amber-950 dark:text-amber-300 px-3 py-1 rounded-full inline-block">
            Global Alumni & Graduate Network
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            NFCS UNN Alumni Body
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Uniting generations of Catholic graduates from the Lion Den. Our alumni network supports chapter projects, student endowment funds, career mentorship, and spiritual communion worldwide.
          </p>
        </div>

        {/* Alumni Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Global Chapter Network</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Connect with fellow UNN Catholic graduates across Nigeria, the United Kingdom, United States, Canada, and beyond.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Student Welfare & Endowment</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Alumni contributions fund indigent tuition grants, chapel expansion initiatives, and annual congress sponsorships.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Career Guidance & NYSC</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Alumni host annual career preparation workshops for graduating finalists, providing job referrals and professional guidance.
            </p>
          </div>
        </div>

        {/* Alumni Spotlights */}
        <div className="space-y-6">
          <div className="border-b border-stone-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">Alumni Reflections & Testimonials</h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">Hear from past student leaders and graduates of NFCS UNN</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-stone-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-white">{t.name}</p>
                    <p className="text-[10px] text-stone-500 dark:text-slate-400">{t.department} ({t.gradYear || 'Alumnus'})</p>
                  </div>
                  <span className="text-xs font-extrabold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full">
                    NFCS Alumnus
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Registration Form */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Alumni Directory Registration</h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">Are you an NFCS UNN graduate? Register your details to stay connected.</p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-stone-900 dark:text-white">Registration Successful!</h3>
              <p className="text-xs text-stone-600 dark:text-slate-400">
                Welcome to the NFCS UNN Global Alumni Directory. We will keep you updated on chapter reunions and alumni events.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Graduation Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2022"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#4D2EAB] hover:bg-[#3b2285] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Register to Alumni Network
              </button>
            </form>
          )}
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
