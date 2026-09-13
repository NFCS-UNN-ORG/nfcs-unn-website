import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import '../styles/raffle.css';

import { PosterCard } from '../components/registration/PosterCard';
import { EventHeader } from '../components/registration/EventHeader';
import { TicketCard } from '../components/registration/TicketCard';
import { RegistrationForm } from '../components/registration/RegistrationForm';
import { RaffleTicketButton } from '../components/registration/RaffleTicketButton';
import { Hero3DScatterText } from '../components/registration/Hero3DScatterText';
import { PrizesShowcase } from '../components/registration/PrizesShowcase';
import { CoinCursor } from '../components/registration/CoinCursor';
import { AnimatedTicketCounter } from '../components/registration/AnimatedTicketCounter';
import { launchCelebrationConfetti } from '../lib/confetti';
import {
  Printer,
  CheckCircle2,
  Mail,
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  ArrowDown,
  Loader2,
  Gift,
  X,
  Share2,
} from 'lucide-react';
import { formatPhoneDisplay, normalizeNigerianPhone } from '../lib/utils';

// Lazy-load the 3D Canvas
const ScrollHero3D = lazy(() => import('../components/registration/ScrollHero3D'));

const UNIT_PRICE = 200;
const PAYSTACK_PUBLIC_KEY = (import.meta as any).env?.VITE_PAYSTACK_PUBLIC_KEY || '';

// Bulk purchase bonus strategy: For every 10 tickets purchased, 1 extra is attached free
function calculateBonusTickets(qty: number): number {
  const q = parseInt(qty as any, 10) || 0;
  return Math.max(0, Math.floor(q / 10));
}

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).PaystackPop) return resolve();
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export default function RaffleTicketPurchase() {
  // Screen state: 'select' (Screen A) | 'form' (Screen B)
  const [screen, setScreen] = useState<'select' | 'form'>('select');

  // Staged entrance sequence for intro section:
  // 1. Letters fall randomly from above the screen on load.
  // 2. Pirate chest slides up into place right below the letters.
  // 3. Then the Book Now button appears.
  // 4. Finally the Ferris model animation begins and spins.
  const [isBookedOrScrolled, setIsBookedOrScrolled] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(true);
  const [chestVisible, setChestVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [startFerrisAnimation, setStartFerrisAnimation] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [referredBy, setReferredBy] = useState<string>('');
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Status & App State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [ticketsSold, setTicketsSold] = useState<number | null>(null);
  const [isFormInteracting, setIsFormInteracting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isGeneratingTickets, setIsGeneratingTickets] = useState(false);
  const isVerifyingRef = useRef(false);

  // Existing Buyer Referral Lookup Modal State
  const [isReferralLookupOpen, setIsReferralLookupOpen] = useState(false);
  const [lookupPhone, setLookupPhone] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookupResult, setLookupResult] = useState<any>(null);
  const [copiedLookupLink, setCopiedLookupLink] = useState(false);

  const handleReferralLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneInput = normalizeNigerianPhone(lookupPhone.trim()) || lookupPhone.trim();
    if (!phoneInput || phoneInput.length < 8) {
      setLookupError('Please enter a valid phone number');
      return;
    }
    setLookupLoading(true);
    setLookupError('');
    setLookupResult(null);

    try {
      const res = await fetch(`/api/referral-lookup?phone=${encodeURIComponent(phoneInput)}`);
      const data = await res.json();
      if (!res.ok) {
        setLookupError(data.error || 'Failed to check referral status');
      } else if (!data.found) {
        setLookupError(data.message || 'No ticket purchase found for this phone number.');
      } else {
        setLookupResult(data);
      }
    } catch (err) {
      setLookupError('Network error. Please check your connection and try again.');
    } finally {
      setLookupLoading(false);
    }
  };

  // Parse referral parameter from URL (e.g. ?ref=08012345678 or ?ref=+2348012345678)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get('ref') || params.get('referral');
      if (refCode) {
        const clean = normalizeNigerianPhone(refCode.trim()) || refCode.trim();
        setReferredBy(clean);
        try {
          localStorage.setItem('nfcs_raffle_ref', clean);
        } catch {}
      } else {
        try {
          const stored = localStorage.getItem('nfcs_raffle_ref');
          if (stored) {
            const cleanStored = normalizeNigerianPhone(stored) || stored;
            setReferredBy(cleanStored);
          }
        } catch {}
      }
    }
  }, []);
  const formDataRef = useRef({
    name: '',
    phone: '',
    email: '',
    gender: '',
    department: '',
  });

  const qtyNumber = Math.max(1, parseInt(quantity as any, 10) || 1);
  const bonusTickets = calculateBonusTickets(qtyNumber);
  const totalEntries = qtyNumber + bonusTickets;
  const totalAmount = qtyNumber * UNIT_PRICE;

  // Staged sequence safety timers:
  // Step 1: letters fall immediately on mount (heroTextVisible = true).
  // Step 2: pirate chest slides up under letters when letters land (~1.25s).
  // Step 3: book now button pops in right after.
  // Step 4: ferris wheel animation triggers ~650ms after button appears.
  const handleLettersLanded = () => {
    setChestVisible(true);
    setButtonVisible(true);
    setTimeout(() => {
      setStartFerrisAnimation(true);
    }, 650);
  };

  useEffect(() => {
    // Safety fallback timers if animation callbacks are delayed
    const chestFallback = setTimeout(() => setChestVisible(true), 1250);
    const buttonFallback = setTimeout(() => setButtonVisible(true), 1350);
    const ferrisFallback = setTimeout(() => setStartFerrisAnimation(true), 2000);
    return () => {
      clearTimeout(chestFallback);
      clearTimeout(buttonFallback);
      clearTimeout(ferrisFallback);
    };
  }, []);

  // Listen to window scroll to trigger 3D model final animation
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 80) {
        setIsBookedOrScrolled(true);
      } else {
        setIsBookedOrScrolled(false);
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // 1. Fetch live tickets sold count
  useEffect(() => {
    supabase
      .from('raffle_summary')
      .select('tickets_sold')
      .single()
      .then(({ data }) => {
        if (data && data.tickets_sold !== undefined) {
          setTicketsSold(data.tickets_sold);
        }
      });
  }, [result]);

  // 2. Check URL search parameters on mount (?order=..., ?ref=..., ?reference=..., ?trxref=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    let orderParam =
      params.get('order') ||
      params.get('id') ||
      params.get('reference') ||
      params.get('trxref');

    if (!orderParam && window.location.pathname.includes('/order/')) {
      const match = window.location.pathname.match(/\/order\/([^/?#]+)/);
      if (match) orderParam = match[1];
    }

    if (orderParam) {
      setInitialLoading(true);
      fetch(`/api/raffle-order?id=${encodeURIComponent(orderParam)}`)
        .then(async (res) => {
          if (!res.ok) {
            // Auto-heal: If order record doesn't exist yet, attempt direct verification with reference
            if (orderParam.startsWith('T') || orderParam.length > 8) {
              const vRes = await fetch('/api/verify-paystack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference: orderParam }),
              });
              if (vRes.ok) {
                return vRes.json();
              }
            }
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.error || 'Order not found');
          }
          return res.json();
        })
        .then((data) => {
          setResult(data);
          setIsBookedOrScrolled(true);
          launchCelebrationConfetti();
          // Jump directly to form section to show verified tickets
          setTimeout(() => {
            document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        })
        .catch((err) => {
          console.error('Failed to load order from URL:', err);
          setError('Could not find that ticket purchase record. You can buy tickets below.');
        })
        .finally(() => {
          setInitialLoading(false);
        });
    }
  }, []);

  // Paystack flow
  async function handlePay(formData?: {
    name: string;
    phone: string;
    email: string;
    gender: string;
    department: string;
  }) {
    setError('');
    setLoading(true);
    isVerifyingRef.current = false;

    // Resolve freshest values from formData, state, or ref
    const buyerName = (formData?.name ?? name ?? formDataRef.current.name).trim() || 'Valued Supporter';
    const buyerPhone = (formData?.phone ?? phone ?? formDataRef.current.phone).trim();
    const buyerEmail = (formData?.email ?? email ?? formDataRef.current.email).trim();
    const buyerGender = (formData?.gender ?? gender ?? formDataRef.current.gender).trim();
    const buyerDept = (formData?.department ?? department ?? formDataRef.current.department).trim();

    // Cache in ref and sessionStorage
    formDataRef.current = {
      name: buyerName,
      phone: buyerPhone,
      email: buyerEmail,
      gender: buyerGender,
      department: buyerDept,
    };

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('pending_raffle_buyer', JSON.stringify(formDataRef.current));
      } catch {}
    }

    let activeRef = referredBy;
    if (!activeRef && typeof window !== 'undefined') {
      try {
        activeRef = localStorage.getItem('nfcs_raffle_ref') || '';
      } catch {}
    }

    try {
      await loadPaystackScript();

      const handler = (window as any).PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: buyerEmail || `${buyerPhone.replace(/\D/g, '') || 'guest'}@ticket.nfcsunn.org`,
        amount: totalAmount * 100, // in kobo
        currency: 'NGN',
        metadata: {
          buyer_name: buyerName,
          buyer_phone: buyerPhone,
          buyer_email: buyerEmail || null,
          gender: buyerGender,
          department: buyerDept,
          quantity: qtyNumber,
          referred_by: activeRef ? (normalizeNigerianPhone(activeRef) || activeRef) : null,
        },
        callback: (response: any) => {
          isVerifyingRef.current = true;
          setIsGeneratingTickets(true);
          verifyAndIssue(response.reference, formDataRef.current);
        },
        onClose: () => {
          // If Paystack closed but verification is already in flight, do NOT unset loading
          if (!isVerifyingRef.current) {
            setLoading(false);
          }
        },
      });

      handler.openIframe();
    } catch (err: any) {
      console.error('Paystack initialization error:', err);
      setError('Could not open payment window. Please check your internet connection.');
      setLoading(false);
      setIsGeneratingTickets(false);
    }
  }

  async function verifyAndIssue(reference: string, savedData?: any) {
    setLoading(true);
    setError('');

    let buyerData = savedData || formDataRef.current;
    if (!buyerData?.phone && typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('pending_raffle_buyer');
        if (stored) buyerData = JSON.parse(stored);
      } catch {}
    }

    const buyerName = buyerData?.name || name || 'Valued Supporter';
    const buyerPhone = buyerData?.phone || phone;
    const buyerEmail = buyerData?.email || email;
    const buyerDept = buyerData?.department || department;
    const buyerGender = buyerData?.gender || gender;

    const canonicalBuyerPhone = normalizeNigerianPhone(buyerPhone) || buyerPhone;
    
    let activeRef = referredBy;
    if (!activeRef && typeof window !== 'undefined') {
      try {
        activeRef = localStorage.getItem('nfcs_raffle_ref') || '';
      } catch {}
    }
    const canonicalActiveRef = activeRef ? (normalizeNigerianPhone(activeRef) || activeRef) : null;

    try {
      const res = await fetch('/api/verify-paystack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          buyer_name: buyerName,
          buyer_phone: canonicalBuyerPhone,
          buyer_email: buyerEmail || null,
          name: buyerName,
          phone: canonicalBuyerPhone,
          email: buyerEmail || null,
          department: buyerDept || null,
          gender: buyerGender || null,
          quantity: qtyNumber,
          referred_by: canonicalActiveRef || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment verification failed');
      }

      setResult(data);
      launchCelebrationConfetti();
      setIsBookedOrScrolled(true);

      if (typeof window !== 'undefined') {
        if (data.order_id) {
          const newUrl = `${window.location.pathname}?order=${data.order_id}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }
        try {
          sessionStorage.setItem('last_successful_raffle_order', JSON.stringify(data));
        } catch {}
      }

      // Smooth scroll down to form section to ensure verified tickets are visible
      setTimeout(() => {
        document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Payment received but ticket issuing failed. Please contact support.');
    } finally {
      isVerifyingRef.current = false;
      setLoading(false);
      setIsGeneratingTickets(false);
    }
  }

  // Handle "Book tickets" click:
  // On mobile, smoothly scrolls and focuses directly on the actual ticket form past the flier card.
  // On desktop, smoothly scrolls the 2-column form section into view.
  const handleBookTicketsClick = () => {
    setIsBookedOrScrolled(true);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const target = isMobile
      ? document.getElementById('actual-ticket-form') || document.getElementById('form-section')
      : document.getElementById('form-section');

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      setTimeout(() => {
        target.focus({ preventScroll: true });
      }, 450);
    }
  };

  return (
    <div className="app-page raffle-page min-h-screen w-full max-w-full overflow-x-clip bg-[#0B0B0F] text-[#FFFFFF] relative selection:bg-[#4D2EAB] selection:text-white font-sans">
      {/* Custom Gold Coin Follower Cursor */}
      <CoinCursor />

      {/* Full-bleed atmospheric dark gradient backdrop */}
      <div
        aria-hidden="true"
        className="register-backdrop fixed inset-0 z-0 pointer-events-none"
      />

      {/* 3D Canvas fixed in background (starts intro & rotation in sequence step 4) */}
      <Suspense fallback={null}>
        <ScrollHero3D
          isFormInteracting={isFormInteracting}
          isBookedOrScrolled={isBookedOrScrolled}
          startAnimation={startFerrisAnimation}
        />
      </Suspense>

      {/* Atmospheric Contrast Overlay on top of 3D Canvas (reduced darkness by 14%) */}
      <div
        aria-hidden="true"
        className="model-overlay fixed inset-0 z-1 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(11, 11, 15, 0.50) 0%, rgba(11, 11, 15, 0.67) 60%, rgba(11, 11, 15, 0.82) 100%)',
        }}
      />
      {/* Vertical gradient scrim for top nav & bottom button visibility (reduced darkness by 14%) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-2 pointer-events-none bg-linear-to-b from-[#0B0B0F]/68 via-transparent to-[#0B0B0F]/77"
      />

      {/* ========================================================================= */}
      {/* 1. INTRODUCTION SECTION: Model load animation, headline, bottom button    */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full max-w-full min-h-screen flex flex-col justify-between items-center text-center px-3 sm:px-8 py-6 sm:py-8 select-none overflow-x-clip">
        {/* Minimal Top Brand Row (Logo moved to left on all screen sizes) */}
        <header className="w-full max-w-6xl mx-auto flex items-center justify-start">
          <a
            href="/"
            aria-label="Home"
            className="inline-flex items-center transition-opacity hover:opacity-85"
          >
            <img
              src="/nfcs-unn-logo.png"
              alt="NFCS UNN Logo"
              className="h-14 sm:h-15 w-auto object-contain select-none filter drop-shadow-md"
            />
          </a>
        </header>

        {/* Center: 3D Depth Volumetric text that zooms in towards camera & scatters on scroll down */}
        <div className="my-auto w-full max-w-full sm:pt-2 pb-0 relative flex flex-col items-center overflow-x-clip">
          {/* Diffused dark shield right behind the text (clipped cleanly, zero horizontal bleed) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none -z-10 bg-[#0B0B0F]/64 blur-[55px]"
          />

          <Hero3DScatterText
            isVisible={heroTextVisible}
            onLanded={handleLettersLanded}
          />

          {/* Grand & Cash Prize Showcase: Car & Treasure Chest images under the text */}
          <PrizesShowcase isVisible={chestVisible} className="-mt-3 sm:-mt-6 md:-mt-8 lg:-mt-12" />
        </div>

        {/* Center Bottom: Animated Button fading in from bottom */}
        <div className="-mt-6 sm:-mt-8 md:-mt-10 pb-4 sm:pb-6 w-full flex justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={buttonVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <RaffleTicketButton onClick={handleBookTicketsClick} />
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FORM & REGISTRATION SECTION: Scrolls into view from bottom             */}
      {/* ========================================================================= */}
      <section
        id="form-section"
        className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 lg:py-16 overflow-x-clip"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full max-w-full min-w-0">
          {/* LEFT COLUMN: Sticky in place on desktop, compact natural height, stays in view while right column scrolls */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 self-start w-full min-w-0 z-20">
            <PosterCard />
          </div>

          {/* RIGHT COLUMN: Scrolls independently with ticket selection & form */}
          <div className="lg:col-span-7 space-y-8 pb-32 w-full min-w-0">
            {/* Loading Initial Order from URL */}
            {initialLoading ? (
              <div className="p-12 rounded-3xl bg-white/4 border border-white/10 text-center space-y-4 my-8">
                <div className="size-9 border-3 border-emerald-300 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-base font-bold text-white">Looking up your ticket record…</p>
                <p className="text-xs text-white/50">Querying St. Peter's Chaplaincy raffle database</p>
              </div>
            ) : result ? (
              /* Screen C: Order Confirmation & Ticket Access */
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 pt-2"
              >
                {/* Verified Header */}
                <div className="p-6 sm:p-8 rounded-3xl bg-[#175319]/40 border-[0.5px] border-white/15 backdrop-blur-[34px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-4 text-center">
                  <div className="size-16 rounded-2xl bg-[#166C16]/40 border-[0.5px] border-white/15 text-[#FBE202] flex items-center justify-center mx-auto text-3xl shadow-inner">
                    🎟️
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FBE202] bg-[#166C16]/50 px-3.5 py-1 rounded-full uppercase tracking-wider border-[0.5px] border-white/15">
                    <CheckCircle2 className="size-3.5" />
                    <span>Payment Verified • You're In The Draw!</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Congratulations, {result.buyer_name || 'Valued Buyer'}!
                  </h2>

                  {/* Transaction ID */}
                  <div className="inline-block px-3.5 py-1.5 rounded-xl bg-white/10 border-[0.5px] border-white/12 text-white/90 text-xs font-mono font-bold">
                    {result.transaction_id ||
                      `FW-TXN-${(result.order_id || '2026').slice(0, 8).toUpperCase()}`}
                  </div>
                </div>

                {/* Details Summary */}
                <div className="p-5 sm:p-6 rounded-xl bg-white/4 border-[0.5px] border-white/10 text-xs space-y-3">
                  <div className="flex justify-between items-center pb-2.5 border-b-[0.5px] border-white/10">
                    <span className="text-white/50">Buyer Name</span>
                    <span className="font-extrabold text-white text-sm">
                      {result.buyer_name || name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2.5 border-b-[0.5px] border-white/10">
                    <span className="text-white/50">Phone Number</span>
                    <span className="font-bold text-white font-mono">
                      {result.buyer_phone || phone}
                    </span>
                  </div>
                  {(result.department || department) && (
                    <div className="flex justify-between items-center pb-2.5 border-b-[0.5px] border-white/10">
                      <span className="text-white/50">Department</span>
                      <span className="font-bold text-white">
                        {result.department || department}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Draw Entries</span>
                    <span className="font-extrabold text-[#FBE202] text-sm">
                      {result.tickets?.length || result.quantity} entries (₦
                      {Number(
                        result.total_amount || (result.tickets?.length || 1) * UNIT_PRICE
                      ).toLocaleString()}
                      )
                    </span>
                  </div>
                </div>

                {/* Tickets Issued List */}
                {result.tickets && result.tickets.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                      Your Official Ticket Numbers:
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 rounded-xl bg-white/3 border-[0.5px] border-white/10 tickets-scrollbar">
                      {result.tickets.map((t: any) => (
                        <span
                          key={t.ticket_number || t}
                          className="bg-[#166C16] text-[#FFFFFF] font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-lg shadow-md font-mono tracking-wider border-[0.5px] border-[#FBE202]/30"
                        >
                          {t.ticket_number || t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Print/Download Button */}
                <button
                  type="button"
                  onClick={() =>
                    printCustomerTickets(
                      result.tickets.map((t: any) => t.ticket_number || t),
                      result.buyer_name || name,
                      result.buyer_phone || phone,
                      result.department || department,
                      result.transaction_id
                    )
                  }
                  className="w-full py-4 px-6 rounded-xl bg-[#166C16] hover:bg-[#175319] text-[#FFFFFF] font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:shadow-2xl border-[0.5px] border-white/15 active:scale-98"
                >
                  <Printer className="w-5 h-5 text-[#FBE202]" />
                  <span>Download / Print Official Tickets</span>
                </button>

                {/* Automated Email Confirmation via Resend */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#175319]/40 border-[0.5px] border-white/15 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#FBE202] flex items-center gap-2">
                      <Mail className="size-4 text-[#FBE202]" /> Official Tickets Emailed
                    </span>
                  </div>
                  <p className="text-xs text-white/90 font-medium leading-relaxed">
                    A complete receipt with your ticket numbers has been dispatched to{' '}
                    <strong className="text-white font-mono underline decoration-[#FBE202]">
                      {result.buyer_email || email}
                    </strong>
                    .
                  </p>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    Please check your inbox to keep your numbers safe for the live draw on Sunday, 20th September 2026 at 1:00 PM.
                  </p>
                </div>

                {/* Viral Referral Milestone Card */}
                {(() => {
                  const promoterPhone = normalizeNigerianPhone(result.buyer_phone || phone) || (result.buyer_phone || phone);
                  const referralLink = typeof window !== 'undefined'
                    ? `${window.location.origin}/raffle-draw?ref=${encodeURIComponent(promoterPhone)}`
                    : `https://nfcsunn.org/raffle-draw?ref=${encodeURIComponent(promoterPhone)}`;
                  const shareText = `🎟️ Grab your Federation Week Raffle Ticket for ₦200 and stand a chance to win:\n🥇 1st: 5000mAh Powerbank + Airbuds\n🥈 2nd: 3kg Gas + 10kg Rice\n🥉 3rd: Pressing Iron\n\nBuy with my link here: ${referralLink}`;
                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

                  return (
                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#166C16]/60 via-[#175319]/80 to-[#0A2610] border border-[#FBE202]/40 shadow-xl space-y-3.5 text-left relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBE202]/20 border border-[#FBE202]/50 text-[#FBE202] text-xs font-black uppercase tracking-wider">
                          <span>🎁 Refer 10 Friends → Get 1 FREE Ticket</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-base font-black text-white leading-snug">
                          Want more chances to win without paying?
                        </h4>
                        <p className="text-xs text-white/80 font-medium mt-1 leading-relaxed">
                          Share your link with course mates & hostel friends. For every <strong>10 tickets</strong> bought through your link, you'll automatically receive an official <strong>FREE entry</strong> into the live draw!
                        </p>
                      </div>

                      {/* Referral Link Box */}
                      <div className="flex items-center gap-2 bg-black/40 border border-white/15 rounded-xl p-2.5">
                        <span className="text-xs text-[#FBE202] font-mono truncate flex-1 select-all">
                          {referralLink}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(referralLink);
                              setCopiedReferral(true);
                              setTimeout(() => setCopiedReferral(false), 2500);
                            }
                          }}
                          className="shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          {copiedReferral ? (
                            <>
                              <CheckCircle2 className="size-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <span>Copy Link</span>
                          )}
                        </button>
                      </div>

                      {/* WhatsApp Share Button */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-98 cursor-pointer"
                      >
                        <span className="text-lg">💬</span>
                        <span>Share on WhatsApp (Status & Groups)</span>
                      </a>
                    </div>
                  );
                })()}

                {/* Reset / Buy More */}
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setScreen('select');
                    setName('');
                    setPhone('');
                    setEmail('');
                    setGender('');
                    setDepartment('');
                    setQuantity(1);
                    if (typeof window !== 'undefined') {
                      window.history.pushState({}, '', '/raffle-draw');
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="size-3.5" />
                  <span>Purchase More Tickets</span>
                </button>
              </motion.div>
            ) : (
              /* Ticket Selection & Registration Flow */
              <div className="space-y-8">
                {/* Event Details: Date & Venue */}
                <div className="rounded-xl p-6 sm:p-7 bg-[#175319]/35 border-[0.5px] border-white/15 backdrop-blur-[34px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <EventHeader
                    title="Federation Week Grand Draw Details"
                    dateChip={{ month: 'SEP', day: '20' }}
                    dateText="Sunday, 20th September 2026"
                    timeText="1:00 PM • Live Stage Announcements at UNN"
                    locationTitle="St. Peter's Catholic Chaplaincy, UNN"
                    locationDetails="Main Campus Stage, University of Nigeria, Nsukka"
                    showBreadcrumb={screen === 'form'}
                    breadcrumbLabel="‹ Back to ticket selection"
                    onBreadcrumbClick={() => setScreen('select')}
                  />
                </div>

                {/* Actual Ticket Form Container (Screen A / Screen B) */}
                <div id="actual-ticket-form" className="scroll-mt-4 sm:scroll-mt-6 focus:outline-none">
                  <AnimatePresence mode="wait">
                    {screen === 'select' ? (
                      /* SCREEN A: Event Detail + Ticket Selection */
                      <motion.section
                        key="screen-a"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl p-6 sm:p-8 bg-[#175319]/35 border-[0.5px] border-white/15 backdrop-blur-[34px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-6"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                              Choose Ticket
                            </p>
                            <h2 className="text-lg font-black text-white mt-0.5">
                              Select your ticket package
                            </h2>
                          </div>
                          <div className="flex items-center gap-2">
                            {ticketsSold !== null && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FBE202] bg-[#166C16]/50 px-3 py-1 rounded-full border-[0.5px] border-[#FBE202]/25 shadow-xs">
                                <span className="size-2 rounded-full bg-[#FBE202] animate-pulse" />
                                <AnimatedTicketCounter count={ticketsSold} /> sold 🔥
                              </span>
                            )}
                            <span className="text-xs font-bold text-[#FBE202] bg-[#166C16]/50 px-2.5 py-1 rounded-full border-[0.5px] border-[#FBE202]/25 shadow-xs">
                              ₦{UNIT_PRICE} / ticket
                            </span>
                          </div>
                        </div>

                        {/* Ticket Card in Selectable Mode */}
                        <TicketCard
                          name="Standard Raffle Ticket"
                          subtitle="Grand draw entry for 1st, 2nd, and 3rd prizes"
                          unitPrice={UNIT_PRICE}
                          quantity={qtyNumber}
                          bonusTickets={bonusTickets}
                          totalEntries={totalEntries}
                          totalAmount={totalAmount}
                          isSelected={true}
                          onQuantityChange={(q) => setQuantity(q)}
                          mode="selectable"
                        />

                        {/* Proceed to Form Button */}
                        <motion.button
                          type="button"
                          onClick={() => setScreen('form')}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 px-6 rounded-xl bg-[#166C16] hover:bg-[#175319] text-[#FFFFFF] font-black text-base transition-all shadow-xl hover:shadow-2xl border-[0.5px] border-[#FBE202]/25 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Continue to Registration</span>
                          <span className="text-xs font-bold text-[#FBE202]">
                            (₦{totalAmount.toLocaleString()})
                          </span>
                          <ChevronRight className="w-4 h-4 ml-1 text-[#FBE202]" />
                        </motion.button>

                        {/* Referral Link & Progress Retrieval trigger button */}
                        <div className="pt-2 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setIsReferralLookupOpen(true);
                              setLookupError('');
                              setLookupResult(null);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FBE202]/90 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
                          >
                            <Gift className="size-4 text-[#FBE202]" />
                            <span>Already bought a ticket? Retrieve your referral link & stats</span>
                            <ChevronRight className="size-3.5 text-[#FBE202]" />
                          </button>
                        </div>
                      </motion.section>
                    ) : (
                      /* SCREEN B: Registration Form with Pinned Ticket Recap */
                      <motion.section
                        key="screen-b"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl p-6 sm:p-8 bg-[#175319]/35 border-[0.5px] border-white/15 backdrop-blur-[34px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-6"
                      >
                        {/* Pinned Ticket Recap at top of the panel */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                              Selected Ticket
                            </p>
                            <button
                              type="button"
                              onClick={() => setScreen('select')}
                              className="text-xs font-bold text-[#FBE202] hover:underline cursor-pointer"
                            >
                              Change selection
                            </button>
                          </div>
                          <TicketCard
                            name="Standard Raffle Ticket"
                            subtitle="Grand draw entry for 1st, 2nd, and 3rd prizes"
                            unitPrice={UNIT_PRICE}
                            quantity={qtyNumber}
                            bonusTickets={bonusTickets}
                            totalEntries={totalEntries}
                            totalAmount={totalAmount}
                            isSelected={true}
                            mode="confirmed"
                          />
                        </div>

                        {/* Form Details Section */}
                        <div className="pt-2">
                          <div className="mb-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                              Guest Details
                            </p>
                            <h3 className="text-lg font-black text-white mt-0.5">
                              Enter attendee information
                            </h3>
                          </div>

                          {loading && (
                            <div className="mb-4 p-4 rounded-2xl bg-[#166C16]/35 border-[0.5px] border-[#FBE202]/30 flex items-center gap-3 animate-pulse">
                              <Loader2 className="w-5 h-5 animate-spin text-[#FBE202] shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-white">Payment received! Issuing your official tickets…</p>
                                <p className="text-[11px] text-white/70">Writing verified draw stubs to database. Please do not close.</p>
                              </div>
                            </div>
                          )}

                          <RegistrationForm
                            name={name}
                            setName={setName}
                            phone={phone}
                            setPhone={setPhone}
                            email={email}
                            setEmail={setEmail}
                            gender={gender}
                            setGender={setGender}
                            department={department}
                            setDepartment={setDepartment}
                            totalAmount={totalAmount}
                            totalEntries={totalEntries}
                            loading={loading}
                            onSubmit={handlePay}
                            onFocusChange={setIsFormInteracting}
                            referredBy={referredBy}
                            setReferredBy={setReferredBy}
                          />

                          {error && (
                            <div className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                              ⚠️ {error}
                            </div>
                          )}
                        </div>
                      </motion.section>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Post-Payment Processing & Ticket Generation Backdrop/Overlay (locks view until tickets are ready) */}
      <AnimatePresence>
        {isGeneratingTickets && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto"
            style={{ cursor: 'wait' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="max-w-md w-full p-8 rounded-3xl bg-[#0A1E0D]/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col items-center space-y-5"
            >
              <div className="relative size-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#166C16] blur-xl opacity-70 animate-pulse" />
                <div className="size-20 rounded-full border-4 border-white/10 border-t-[#FBE202] animate-spin" />
                <span className="absolute text-3xl select-none">🎟️</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Payment Received!
                </h3>
                <p className="text-sm font-bold text-[#FBE202]">
                  Generating your official raffle tickets…
                </p>
                <p className="text-xs text-white/70 leading-relaxed pt-1">
                  We are assigning and securing your draw numbers in the St. Peter's Chaplaincy database. Please do not close or refresh this page.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono pt-1">
                <ShieldCheck className="size-3.5 text-[#22C55E]" />
                <span>Verified Paystack Transaction</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing Buyer Referral Retrieval & Progress Modal */}
      <AnimatePresence>
        {isReferralLookupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsReferralLookupOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-md bg-[#0D2E14] border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsReferralLookupOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-xl bg-[#FBE202]/10 border border-[#FBE202]/30 flex items-center justify-center text-[#FBE202]">
                  <Gift className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Referral Tracker</h3>
                  <p className="text-xs text-white/60">Look up your link & free ticket progress</p>
                </div>
              </div>

              {!lookupResult ? (
                <form onSubmit={handleReferralLookup} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1.5">
                      Your Registered Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={lookupPhone}
                      onChange={(e) => setLookupPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 text-sm font-medium focus:outline-none focus:border-[#FBE202] transition-colors"
                      required
                    />
                    <p className="text-[11px] text-white/50 mt-1">
                      Enter the phone number you used when purchasing your ticket.
                    </p>
                  </div>

                  {lookupError && (
                    <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-medium">
                      ⚠️ {lookupError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={lookupLoading}
                    className="w-full py-3 px-4 rounded-xl bg-[#166C16] hover:bg-[#175319] text-white font-bold text-sm transition-all shadow-lg border border-[#FBE202]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {lookupLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-[#FBE202]" />
                        <span>Verifying phone number…</span>
                      </>
                    ) : (
                      <>
                        <span>Retrieve My Referral Stats</span>
                        <ChevronRight className="size-4 text-[#FBE202]" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                (() => {
                  const promoterPhone = normalizeNigerianPhone(lookupResult?.buyer_phone || lookupResult?.phone || lookupPhone) || lookupPhone;
                  const referralLink = typeof window !== 'undefined'
                    ? `${window.location.origin}/raffle-draw?ref=${encodeURIComponent(promoterPhone)}`
                    : `https://nfcsunn.org/raffle-draw?ref=${encodeURIComponent(promoterPhone)}`;
                  const progressCount = Number(
                    lookupResult?.progress_in_current_cycle ??
                    lookupResult?.progress_in_current_milestone ??
                    (lookupResult?.total_referred_tickets ? lookupResult.total_referred_tickets % 10 : 0)
                  );
                  const totalReferred = Number(lookupResult?.total_referred_tickets || 0);
                  const bonusAwarded = Number(lookupResult?.bonus_tickets_awarded || 0);

                  return (
                    <div className="space-y-5">
                      {/* Buyer summary */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-white/60">Welcome back,</p>
                        <p className="text-base font-bold text-white">{lookupResult.buyer_name}</p>
                        <p className="text-xs text-[#FBE202] font-mono mt-0.5">{formatPhoneDisplay(promoterPhone)}</p>
                      </div>

                      {/* Progress Milestone */}
                      <div className="p-4 rounded-xl bg-[#166C16]/20 border border-[#FBE202]/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                            Progress to Next Free Ticket
                          </span>
                          <span className="text-xs font-black text-[#FBE202]">
                            {progressCount} / 10 Tickets
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-[#FBE202] to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (progressCount / 10) * 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-white/70 pt-1">
                          <span>Total Referred: <strong className="text-white">{totalReferred}</strong></span>
                          <span>Free Tickets Won: <strong className="text-[#FBE202]">{bonusAwarded}</strong></span>
                        </div>
                      </div>

                      {/* Referral Link Box */}
                      <div>
                        <label className="block text-xs font-bold text-white/70 uppercase tracking-wider mb-1.5">
                          Your Personal Referral Link
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={referralLink}
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs font-mono text-white select-all focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(referralLink);
                              setCopiedLookupLink(true);
                              setTimeout(() => setCopiedLookupLink(false), 2500);
                            }}
                            className="px-3.5 py-2.5 rounded-xl bg-[#FBE202] text-[#0A1E0D] font-bold text-xs hover:bg-[#FBE202]/90 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                          >
                            {copiedLookupLink ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      {/* 1-Tap Share to WhatsApp */}
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `🎟️ Grab your Federation Week Raffle Ticket for ₦200 and stand a chance to win:\n🥇 1st: 5000mAh Powerbank + Airbuds\n🥈 2nd: 3kg Gas + 10kg Rice\n🥉 3rd: Pressing Iron\n\nBuy with my link here: ${referralLink}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <Share2 className="size-4" />
                        <span>Share on WhatsApp Status / Group</span>
                      </a>

                      {/* Check another number */}
                      <button
                        type="button"
                        onClick={() => {
                          setLookupResult(null);
                          setLookupPhone('');
                        }}
                        className="w-full text-center text-xs text-white/50 hover:text-white/80 transition-colors py-1 cursor-pointer"
                      >
                        Check a different phone number
                      </button>
                    </div>
                  );
                })()
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Clean Black & White A4 Physical Raffle Drum Slips (16 per page, 2 cols x 8 rows)
function printCustomerTickets(
  ticketNumbers: string[],
  buyerName: string,
  buyerPhone: string,
  buyerDepartment: string,
  transactionId?: string
) {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Please allow popups for this site to download/print your tickets.');
    return;
  }

  const SLIPS_PER_PAGE = 16;
  const pages: string[][] = [];
  const list = ticketNumbers || [];
  for (let i = 0; i < list.length; i += SLIPS_PER_PAGE) {
    pages.push(list.slice(i, i + SLIPS_PER_PAGE));
  }

  const pagesHtml = pages
    .map((pageTickets, pageIdx) => {
      const slipsHtml = pageTickets
        .map(
          (num) => `
        <div class="slip">
          <div class="slip-header">
            <span class="org">NFCS UNN · ST. PETER'S CHAPLAINCY</span>
            <span class="draw-tag">GRAND DRAW</span>
          </div>
          
          <div class="slip-body">
            <div class="num-col">
              <div class="num-lbl">TICKET NUMBER</div>
              <div class="num-val">${num}</div>
              <div class="drum-cue">★ DROP IN RAFFLE DRUM ★</div>
            </div>
            
            <div class="info-col">
              <div class="info-row"><span class="lbl">NAME:</span> <span class="val bold-name">${buyerName || 'Valued Supporter'}</span></div>
              <div class="info-row"><span class="lbl">PHONE:</span> <span class="val mono">${buyerPhone || '—'}</span></div>
              <div class="info-row"><span class="lbl">DEPT:</span> <span class="val">${buyerDepartment || '—'}</span></div>
            </div>
          </div>
          
          <div class="slip-footer">
            <span class="cut-hint">✁ CUT LINE</span>
            <span class="fold-hint">─ ─ ─ FOLD IN HALF & DROP IN BOX ─ ─ ─</span>
            <span class="date-hint">20 SEP 2026</span>
          </div>
        </div>
      `
        )
        .join('');

      return `
        <div class="a4-sheet ${pageIdx < pages.length - 1 ? 'page-break' : ''}">
          <div class="sheet-header-meta">
            <span><strong>NFCS UNN FEDERATION WEEK 2026</strong> · Official Physical Raffle Drum Slips</span>
            <span>Page ${pageIdx + 1} of ${pages.length} (${list.length} total tickets)${transactionId ? ` · Ref: ${transactionId}` : ''}</span>
          </div>
          <div class="slips-grid">
            ${slipsHtml}
          </div>
        </div>
      `;
    })
    .join('');

  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Raffle Drum Slips — NFCS Federation Week 2026</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 6mm 6mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: #ffffff;
            color: #000000;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .a4-sheet {
            width: 100%;
            max-width: 198mm;
            min-height: 284mm;
            margin: 0 auto;
            background: #ffffff;
          }
          
          .page-break {
            page-break-after: always;
            break-after: page;
          }
          
          .sheet-header-meta {
            display: flex;
            justify-content: space-between;
            font-size: 6.5pt;
            color: #333333;
            padding: 0 2mm 1.5mm 2mm;
            border-bottom: 0.5px solid #666666;
            margin-bottom: 1.5mm;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          
          /* 16 Slips Grid: Exactly 2 Columns x 8 Rows with continuous cutting lines */
          .slips-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 34mm;
            border-top: 1px dashed #000000;
            border-left: 1px dashed #000000;
          }
          
          .slip {
            border-right: 1px dashed #000000;
            border-bottom: 1px dashed #000000;
            padding: 2mm 3mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #ffffff;
            height: 34mm;
            overflow: hidden;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .slip-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 6.5pt;
            font-weight: 800;
            border-bottom: 0.8px solid #000000;
            padding-bottom: 0.8mm;
            letter-spacing: 0.02em;
          }
          
          .org {
            text-transform: uppercase;
            font-weight: 800;
          }
          
          .draw-tag {
            font-size: 5.5pt;
            font-weight: 900;
            border: 0.8px solid #000000;
            padding: 0 1.5mm;
            border-radius: 2px;
          }
          
          .slip-body {
            display: flex;
            gap: 2.5mm;
            align-items: center;
            flex: 1;
            padding: 1mm 0;
          }
          
          .num-col {
            width: 44%;
            text-align: center;
            border-right: 0.8px dashed #444444;
            padding-right: 2mm;
          }
          
          .num-lbl {
            font-size: 5.5pt;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: #222222;
          }
          
          .num-val {
            font-family: 'Courier New', Courier, monospace;
            font-size: 13pt;
            font-weight: 900;
            letter-spacing: 0.06em;
            border: 1.5px solid #000000;
            padding: 1px 2px;
            margin: 1px 0;
            background: #ffffff;
          }
          
          .drum-cue {
            font-size: 5pt;
            font-weight: 800;
            letter-spacing: 0.03em;
          }
          
          .info-col {
            width: 56%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.8mm;
          }
          
          .info-row {
            display: flex;
            font-size: 7.5pt;
            line-height: 1.25;
          }
          
          .lbl {
            font-weight: 800;
            width: 14mm;
            flex-shrink: 0;
            font-size: 6.5pt;
            color: #222222;
          }
          
          .val {
            flex: 1;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .val.bold-name {
            font-size: 8pt;
            font-weight: 900;
          }
          
          .val.mono {
            font-family: 'Courier New', Courier, monospace;
            font-size: 7.5pt;
            font-weight: 700;
          }
          
          .slip-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 5.5pt;
            color: #333333;
            border-top: 0.6px dotted #888888;
            padding-top: 0.8mm;
          }
          
          .cut-hint {
            font-weight: 700;
          }
          
          .fold-hint {
            font-weight: 700;
            letter-spacing: 0.04em;
          }
          
          .date-hint {
            font-weight: 600;
          }
          
          @media screen {
            body {
              background: #f1f5f9;
              padding: 20px;
            }
            .a4-sheet {
              background: #ffffff;
              box-shadow: 0 4px 20px rgba(0,0,0,0.12);
              margin-bottom: 25px;
              padding: 6mm;
            }
          }
        </style>
      </head>
      <body onload="setTimeout(function(){ window.print(); }, 300)">
        ${pagesHtml}
      </body>
    </html>
  `);
  win.document.close();
}
