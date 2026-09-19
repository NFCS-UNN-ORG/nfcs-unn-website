import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  savedAt: string;
}

interface CookieConsentContextValue {
  preferences: CookiePreferences | null;
  hasConsented: boolean;
  isBannerOpen: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  acceptEssentialOnly: () => void;
  savePreferences: (custom: { analytics: boolean; functional: boolean; marketing: boolean }) => void;
  openModal: () => void;
  closeModal: () => void;
  closeBanner: () => void;
  resetConsent: () => void;
}

const STORAGE_KEY = 'nfcs-cookie-consent';

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children?: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as CookiePreferences;
      }
    } catch {
      // Ignore parse errors
    }
    return null;
  });

  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show banner after mounting on client if no prior consent is found
  useEffect(() => {
    if (!preferences) {
      const timer = setTimeout(() => setIsBannerOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [preferences]);

  const saveToStorage = useCallback((prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      window.dispatchEvent(new CustomEvent('nfcs_cookie_consent_updated', { detail: prefs }));
    } catch {
      // Ignore storage errors
    }
    setPreferences(prefs);
    setIsBannerOpen(false);
    setIsModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      savedAt: new Date().toISOString(),
    };
    saveToStorage(prefs);
  }, [saveToStorage]);

  const acceptEssentialOnly = useCallback(() => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      savedAt: new Date().toISOString(),
    };
    saveToStorage(prefs);
  }, [saveToStorage]);

  const saveCustomPreferences = useCallback(
    (custom: { analytics: boolean; functional: boolean; marketing: boolean }) => {
      const prefs: CookiePreferences = {
        essential: true,
        analytics: custom.analytics,
        functional: custom.functional,
        marketing: custom.marketing,
        savedAt: new Date().toISOString(),
      };
      saveToStorage(prefs);
    },
    [saveToStorage]
  );

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const closeBanner = useCallback(() => {
    setIsBannerOpen(false);
  }, []);

  const resetConsent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setPreferences(null);
    setIsBannerOpen(true);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      preferences,
      hasConsented: preferences !== null,
      isBannerOpen,
      isModalOpen,
      acceptAll,
      acceptEssentialOnly,
      savePreferences: saveCustomPreferences,
      openModal,
      closeModal,
      closeBanner,
      resetConsent,
    }),
    [
      preferences,
      isBannerOpen,
      isModalOpen,
      acceptAll,
      acceptEssentialOnly,
      saveCustomPreferences,
      openModal,
      closeModal,
      closeBanner,
      resetConsent,
    ]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within a <CookieConsentProvider />');
  }
  return ctx;
}
