import React, { useState } from 'react';
import { Heart, Send, ShieldCheck, Sparkles, CheckCircle2, Cross, Clock, MessageSquare } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const PrayerRequestView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Academic Success',
    intention: '',
    isPrivate: true,
    requestMassOffering: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.intention.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-slate-800 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full inline-block">
            St. Peter's Chaplaincy Intercessory Ministry
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Submit Your Prayer Intentions
          </h1>
          <p className="text-stone-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            "Ask and it will be given to you; seek and you will find." (Matthew 7:7). Our chaplaincy priests and NFCS intercessory team pray daily for your intentions during Holy Mass and Eucharistic Adoration.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Cross className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">Daily Mass Intentions</h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400">Remembered at St. Peter's Altar</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-stone-100 dark:border-slate-800">
                  <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-800 dark:text-slate-200">Daily Adoration Intercession</p>
                    <p className="text-stone-500 dark:text-slate-400 mt-0.5">Submitted prayer requests are laid before the Blessed Sacrament during Thursday Chaplaincy Holy Hour.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-stone-100 dark:border-slate-800">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-800 dark:text-slate-200">100% Strict Confidentiality</p>
                    <p className="text-stone-500 dark:text-slate-400 mt-0.5">Your personal information and prayer intention remain confidential within the Chaplaincy Pastoral Team.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-slate-800/60 rounded-2xl border border-stone-100 dark:border-slate-800">
                  <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-stone-800 dark:text-slate-200">Exam & Academic Intentions</p>
                    <p className="text-stone-500 dark:text-slate-400 mt-0.5">Special prayer focus for students preparing for continuous assessments, project defenses, and semester exams.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm space-y-6">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 dark:text-white">Prayer Request Received</h3>
                  <p className="text-stone-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                    May the Almighty Father grant your heartfelt prayers according to His divine grace and wisdom. Your request has been added to our daily intercession list.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        category: 'Academic Success',
                        intention: '',
                        isPrivate: true,
                        requestMassOffering: false,
                      });
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#4D2EAB] text-white font-bold text-xs rounded-full hover:bg-[#3b2285] transition-all cursor-pointer"
                  >
                    Submit Another Intention
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white">Prayer Request Form</h2>
                    <p className="text-xs text-stone-500 dark:text-slate-400">Fill in your details and prayer intentions below.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Your Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="Leave blank to remain anonymous"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#4D2EAB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#4D2EAB]"
                      >
                        <option value="Academic Success">Academic Success & Exams</option>
                        <option value="Health & Healing">Health & Healing</option>
                        <option value="Family & Relatives">Family & Loved Ones</option>
                        <option value="Thanksgiving">Thanksgiving & Testimony</option>
                        <option value="Spiritual Growth">Spiritual Guidance & Vocation</option>
                        <option value="Financial Breakthrough">Financial & Tuition Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Your Prayer Intention *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your prayer request here..."
                      value={formData.intention}
                      onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 text-stone-900 dark:text-white text-xs focus:outline-hidden focus:ring-2 focus:ring-[#4D2EAB]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isPrivate"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                      className="rounded text-[#4D2EAB] focus:ring-[#4D2EAB]"
                    />
                    <label htmlFor="isPrivate" className="text-xs text-stone-600 dark:text-slate-400">
                      Keep intention private for Chaplaincy Fathers & Intercessory Leader only
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#4D2EAB] hover:bg-[#3b2285] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Submit Prayer Request
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        <NewsletterBanner />
      </div>
    </div>
  );
};
