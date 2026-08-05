import React from 'react';
import { Heart, Lock, CheckCircle2 } from 'lucide-react';
import { CHAPLAINCY_PROJECTS } from '../../data/nfcsData';

interface DonationFormProps {
  donationFrequency: 'monthly' | 'onetime';
  setDonatedFrequency: (freq: 'monthly' | 'onetime') => void;
  selectedPreset: number | null;
  handlePresetSelect: (amount: number) => void;
  customAmount: string;
  handleCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCause: string;
  setSelectedCause: (cause: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  isAnonymous: boolean;
  setIsAnonymous: (anon: boolean) => void;
  getFinalAmount: () => number;
  handleDonationSubmit: (e: React.FormEvent) => void;
  presets: number[];
}

export const DonationForm: React.FC<DonationFormProps> = ({
  donationFrequency,
  setDonatedFrequency,
  selectedPreset,
  handlePresetSelect,
  customAmount,
  handleCustomAmountChange,
  selectedCause,
  setSelectedCause,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  isAnonymous,
  setIsAnonymous,
  getFinalAmount,
  handleDonationSubmit,
  presets,
}) => {
  return (
    <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-extrabold text-stone-900 dark:text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-emerald-600 fill-emerald-600" />
          <span>Make A Contribution</span>
        </h2>
        <span className="text-xs text-stone-500 dark:text-slate-400 font-medium">Step 1 of 2</span>
      </div>

      <form onSubmit={handleDonationSubmit} className="space-y-5">
        {/* Frequency Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 dark:bg-slate-900 rounded-2xl">
          <button
            type="button"
            onClick={() => setDonatedFrequency('onetime')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              donationFrequency === 'onetime'
                ? 'bg-white dark:bg-[#4D2EAB] text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
            }`}
          >
            One-Time Donation
          </button>
          <button
            type="button"
            onClick={() => setDonatedFrequency('monthly')}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              donationFrequency === 'monthly'
                ? 'bg-white dark:bg-[#4D2EAB] text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
            }`}
          >
            Monthly Commitment
          </button>
        </div>

        {/* Amount Presets Grid */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-2">
            Select Amount (NGN ₦)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {presets.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handlePresetSelect(amt)}
                className={`py-3 px-3 rounded-2xl border text-sm font-extrabold transition-all cursor-pointer ${
                  selectedPreset === amt
                    ? 'bg-[#4D2EAB] text-white border-[#4D2EAB] shadow-md scale-102'
                    : 'bg-stone-50 dark:bg-slate-900/60 border-stone-200 dark:border-slate-800 text-stone-800 dark:text-slate-200 hover:border-stone-400'
                }`}
              >
                ₦{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount Input */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5">
            Or Enter Custom Amount (₦)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-400 dark:text-slate-500 text-sm">
              ₦
            </span>
            <input
              type="number"
              min="500"
              placeholder="e.g. 15000"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full pl-9 pr-4 py-3 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl text-stone-900 dark:text-white font-bold text-sm focus:outline-hidden focus:border-[#4D2EAB]"
            />
          </div>
        </div>

        {/* Target Campaign Cause */}
        <div>
          <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1.5">
            Designate Your Giving
          </label>
          <select
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="w-full px-4 py-3 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-2xl text-stone-900 dark:text-white text-xs font-bold focus:outline-hidden focus:border-[#4D2EAB]"
          >
            <option value="St. Peter's Chaplaincy Solar & Power Project">
              St. Peter's Chaplaincy Solar & Power Project
            </option>
            <option value="NFCS Indigent Student Tuition Support Fund">
              NFCS Indigent Student Tuition Support Fund
            </option>
            <option value="Chaplaincy Library & Academic Support">
              Chaplaincy Library & Academic Support
            </option>
            <option value="NFCS Choir Equipment & Liturgical Vestments">
              NFCS Choir Equipment & Liturgical Vestments
            </option>
            <option value="General Pastoral Welfare & Retreats">General Pastoral Welfare & Retreats</option>
            {CHAPLAINCY_PROJECTS.map((proj) => (
              <option key={proj.id} value={proj.title}>
                {proj.title}
              </option>
            ))}
          </select>
        </div>

        {/* Donor Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 dark:text-slate-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required={!isAnonymous}
              disabled={isAnonymous}
              placeholder={isAnonymous ? 'Anonymous Donor' : 'e.g. Bro. Chidiebere N.'}
              value={isAnonymous ? '' : fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-hidden focus:border-[#4D2EAB]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 dark:text-slate-400 mb-1">
              Email Address (For Digital Receipt)
            </label>
            <input
              type="email"
              required
              placeholder="e.g. donor@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs focus:outline-hidden focus:border-[#4D2EAB]"
            />
          </div>
        </div>

        {/* Anonymous Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-4 h-4 rounded-sm border-stone-300 text-[#4D2EAB] focus:ring-[#4D2EAB]"
          />
          <label htmlFor="anonymous" className="text-xs text-stone-600 dark:text-slate-400 cursor-pointer">
            Make my donation anonymous on public sponsor lists
          </label>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 bg-gradient-to-r from-[#4D2EAB] to-indigo-600 hover:from-[#3B2285] hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>
            Pledge ₦{getFinalAmount().toLocaleString()} {donationFrequency === 'monthly' ? '/ Month' : ''}
          </span>
          <CheckCircle2 className="w-5 h-5" />
        </button>

        <p className="text-[11px] text-center text-stone-500 dark:text-slate-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>256-bit Encrypted Security • Instant Bank Transfer Instructions</span>
        </p>
      </form>
    </div>
  );
};
