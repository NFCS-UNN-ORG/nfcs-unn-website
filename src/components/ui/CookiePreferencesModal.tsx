import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck, BarChart3, Sliders, Megaphone, Lock } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';

export const CookiePreferencesModal: React.FC = () => {
  const { isModalOpen, closeModal, preferences, savePreferences, acceptAll, acceptEssentialOnly } = useCookieConsent();

  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Sync state when preferences or modal opens
  useEffect(() => {
    if (preferences) {
      setAnalytics(preferences.analytics);
      setFunctional(preferences.functional);
      setMarketing(preferences.marketing);
    } else {
      setAnalytics(false);
      setFunctional(false);
      setMarketing(false);
    }
  }, [preferences, isModalOpen]);

  if (!isModalOpen) return null;

  const handleSave = () => {
    savePreferences({ analytics, functional, marketing });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0B0E2B] border border-stone-200 dark:border-stone-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-[#080A26]/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-500/20">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Cookie & Privacy Preferences</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  NFCS UNN Chapter • St. Peter's Catholic Chaplaincy
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
              aria-label="Close preferences modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <div className="px-5 sm:px-6 pt-4 pb-2 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            We respect your digital privacy. Select which cookie categories you permit us to use during your visits. Strictly necessary cookies are permanently enabled to guarantee essential safety and operations.
          </div>

          {/* Scrollable Categories Body */}
          <div className="p-5 sm:p-6 space-y-3.5 overflow-y-auto max-h-[50vh] pr-4 scrollbar-thin">
            {/* Category 1: Strictly Necessary */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 sm:max-w-[78%]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-bold">Strictly Necessary Cookies</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Required for site security, navigation, member authentication, and maintaining your privacy choices. Cannot be disabled.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Lock className="w-3 h-3" />
                  Always Active
                </span>
              </div>
            </div>

            {/* Category 2: Analytics */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 sm:max-w-[78%]">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span className="text-sm font-bold">Analytics & Performance</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Anonymously monitors how visitors browse chaplaincy announcements and reflection materials to help us improve user experience.
                </p>
              </div>
              <div className="flex items-center shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 dark:bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4D2EAB]"></div>
                </label>
              </div>
            </div>

            {/* Category 3: Functional */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 sm:max-w-[78%]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-bold">Functional & Experience</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Remembers your display preferences such as dark mode, prayer forum filters, and language customizations.
                </p>
              </div>
              <div className="flex items-center shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={functional}
                    onChange={(e) => setFunctional(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 dark:bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4D2EAB]"></div>
                </label>
              </div>
            </div>

            {/* Category 4: Marketing */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 sm:max-w-[78%]">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-bold">Outreach & Communications</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  Allows embedded YouTube liturgical recordings, social sharing tools, and federation event updates.
                </p>
              </div>
              <div className="flex items-center shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 dark:bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4D2EAB]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800/80 bg-stone-50/70 dark:bg-[#080A26]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={acceptEssentialOnly}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-200/60 hover:bg-stone-200 dark:bg-stone-800/80 dark:hover:bg-stone-700 rounded-xl transition-colors cursor-pointer text-center"
            >
              Essential Only
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSave}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 rounded-xl transition-colors cursor-pointer text-center"
              >
                Save My Choices
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#4D2EAB] hover:bg-[#3B2285] rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer text-center"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
