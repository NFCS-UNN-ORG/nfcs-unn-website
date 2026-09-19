import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings2 } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';

export const CookieConsentBanner: React.FC = () => {
  const { isBannerOpen, isModalOpen, acceptAll, acceptEssentialOnly, openModal, closeBanner } = useCookieConsent();

  // If user has consented or banner is closed or the modal is currently open, don't show the banner
  if (!isBannerOpen || isModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md md:max-w-lg z-40 bg-white/95 dark:bg-[#0B0E2B]/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xl text-stone-900 dark:text-stone-100 ring-1 ring-black/5 dark:ring-white/10"
        role="region"
        aria-label="Cookie consent banner"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-500/20 shrink-0">
              <Cookie className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight">
                We Value Your Privacy & Trust
              </h3>
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                NFCS UNN • Chaplaincy Digital Portal
              </p>
            </div>
          </div>
          <button
            onClick={closeBanner}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
          We use strictly necessary cookies to ensure the website runs safely and preserves your session. With your approval, we also use anonymous analytics to optimize our Catholic community resources.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4D2EAB] dark:text-indigo-400 hover:underline py-1 px-2 cursor-pointer order-last sm:order-first text-center"
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={acceptEssentialOnly}
              className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700/80 rounded-xl transition-colors cursor-pointer text-center"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-white bg-[#4D2EAB] hover:bg-[#3B2285] rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer text-center"
            >
              Accept All
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
