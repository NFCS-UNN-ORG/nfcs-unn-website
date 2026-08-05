import React, { useState } from 'react';
import { Users, GraduationCap, Compass, Briefcase, Award, CheckCircle2, Send } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const MentorshipView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 px-3 py-1 rounded-full inline-block">
            Peer & Alumni Mentorship Program
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            NFCS Mentorship Network
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connecting freshers and junior students with experienced 400L/500L student leaders and distinguished NFCS Alumni for academic excellence, spiritual direction, and career growth.
          </p>
        </div>

        {/* Mentorship Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Academic Mentorship</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Paired guidance for course registration, study techniques, CGPA improvement strategies, and final year thesis supervision advice.
            </p>
            <ul className="text-xs text-stone-500 dark:text-slate-400 space-y-1.5 pt-2 list-disc list-inside">
              <li>1-on-1 tutoring pairings</li>
              <li>Exam preparation roadmap</li>
              <li>Departmental past question review</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Spiritual Direction</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Personalized encouragement to maintain a vibrant Catholic prayer life, sacramental discipline, and moral purity amidst university pressures.
            </p>
            <ul className="text-xs text-stone-500 dark:text-slate-400 space-y-1.5 pt-2 list-disc list-inside">
              <li>Chaplaincy retreat accompaniment</li>
              <li>Daily Rosary & Mass accountability</li>
              <li>Vocation discernment support</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Career & Skill Mentorship</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              Connect with NFCS UNN Alumni in Law, Tech, Engineering, Medicine, and Public Service for internship advice, CV reviews, and career coaching.
            </p>
            <ul className="text-xs text-stone-500 dark:text-slate-400 space-y-1.5 pt-2 list-disc list-inside">
              <li>CV & Resume polishing</li>
              <li>NYSC & Post-grad planning</li>
              <li>Industry networking webinars</li>
            </ul>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Join the Mentorship Program</h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">Sign up as a mentee seeking guidance or as a mentor sharing experience.</p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setRole('mentee')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  role === 'mentee'
                    ? 'bg-[#4D2EAB] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
                }`}
              >
                Request a Mentor (Mentee)
              </button>
              <button
                onClick={() => setRole('mentor')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  role === 'mentor'
                    ? 'bg-[#4D2EAB] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300'
                }`}
              >
                Become a Mentor
              </button>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-stone-900 dark:text-white">Application Received</h3>
              <p className="text-xs text-stone-600 dark:text-slate-400">
                Thank you! The NFCS UNN Mentorship Committee will review your details and pair you within 5-7 working days.
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
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Faculty & Department *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engineering - Electrical"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Level / Grad Year *</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]">
                    <option>100 Level / Fresher</option>
                    <option>200 Level</option>
                    <option>300 Level</option>
                    <option>400 Level</option>
                    <option>500L / Finalist</option>
                    <option>Alumnus / Alumna</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                  {role === 'mentee' ? 'What area do you need mentorship in?' : 'What area can you mentor students in?'}
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your goals or subjects..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:ring-2 focus:ring-[#4D2EAB]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#4D2EAB] hover:bg-[#3b2285] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit {role === 'mentee' ? 'Mentee Request' : 'Mentor Application'}
              </button>
            </form>
          )}
        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
