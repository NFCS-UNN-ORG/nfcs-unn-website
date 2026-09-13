import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import {
  Ticket,
  Coins,
  Globe,
  Users,
  Plus,
  Printer,
  Download,
  RefreshCw,
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Shield,
  CreditCard,
  Banknote,
  Sparkles,
  Mail,
  Loader2,
} from 'lucide-react';

const ADMIN_SECRET_STORAGE_KEY = 'nfcs_admin_secret';
const SAVED_RECORDER_KEY = 'nfcs_admin_last_recorder';
const UNIT_PRICE = 200;

function calculateBonusTickets(qty) {
  const q = parseInt(qty, 10) || 0;
  return Math.max(0, Math.floor(q / 10));
}

export default function RaffleAdmin() {
  const [secret, setSecret] = useState(localStorage.getItem(ADMIN_SECRET_STORAGE_KEY) || '');
  const [unlocked, setUnlocked] = useState(false);
  const [isVerifyingSavedSecret, setIsVerifyingSavedSecret] = useState(
    !!localStorage.getItem(ADMIN_SECRET_STORAGE_KEY)
  );
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('all'); // 'all' | 'online' | 'walk-in'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState('');
  const [expandedTicketOrders, setExpandedTicketOrders] = useState(new Set());

  const toggleExpandTickets = (orderId) => {
    setExpandedTicketOrders((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) {
        next.delete(orderId);
      } else {
        next.add(orderId);
      }
      return next;
    });
  };

  // Walk-in Registration Modal State
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    buyer_name: '',
    buyer_phone: '',
    buyer_email: '',
    department: '',
    quantity: 1,
    payment_method: 'cash',
    recorded_by: localStorage.getItem(SAVED_RECORDER_KEY) || '',
  });
  const [manualResult, setManualResult] = useState(null);
  const [manualError, setManualError] = useState('');
  const [manualLoading, setManualLoading] = useState(false);

  // On mount: if a secret is saved in localStorage, test it against /api/admin-verify
  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_SECRET_STORAGE_KEY);
    if (saved) {
      unlock(saved).finally(() => {
        setIsVerifyingSavedSecret(false);
      });
    } else {
      setIsVerifyingSavedSecret(false);
    }
  }, []);

  useEffect(() => {
    if (unlocked) {
      refreshSummary();
      refreshOrders(secret);
    }
  }, [unlocked]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isWalkInModalOpen) {
        setIsWalkInModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWalkInModalOpen]);

  async function refreshSummary() {
    try {
      const { data, error } = await supabase.from('raffle_summary').select('*').single();
      if (!error && data) {
        setSummary(data);
      }
    } catch (err) {
      console.error('Error refreshing summary:', err);
    }
  }

  async function refreshOrders(currentSecret = secret) {
    const activeSecret = currentSecret || secret;
    if (!activeSecret) return;

    try {
      const res = await fetch('/api/admin-orders', {
        headers: { 'x-admin-secret': activeSecret },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data || []);
      } else {
        if (res.status === 401) {
          // Saved secret is invalid or expired
          logout();
          setUnlockError('Admin session expired or invalid passcode. Please re-enter.');
          return;
        }
        const errData = await res.json().catch(() => ({}));
        console.error('Failed to fetch admin orders:', errData.error || res.statusText);
      }
    } catch (err) {
      console.error('Failed to fetch admin orders:', err);
    }
  }

  async function handleManualRefresh() {
    setIsRefreshing(true);
    await Promise.all([refreshSummary(), refreshOrders(secret)]);
    setTimeout(() => setIsRefreshing(false), 450);
  }

  async function unlock(enteredSecret) {
    const keyToTest = (enteredSecret !== undefined ? enteredSecret : secret).trim();
    if (!keyToTest) {
      setUnlockError('Please enter the admin passcode');
      return;
    }

    setUnlocking(true);
    setUnlockError('');

    try {
      const res = await fetch('/api/admin-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: keyToTest }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setUnlockError(data.error || 'Incorrect admin passcode. Access denied.');
        setUnlocked(false);
        return;
      }

      // Passcode verified by server!
      localStorage.setItem(ADMIN_SECRET_STORAGE_KEY, keyToTest);
      setSecret(keyToTest);
      setUnlocked(true);
      refreshSummary();
      refreshOrders(keyToTest);
    } catch (err) {
      console.error('Unlock verification error:', err);
      setUnlockError('Network error — please check your internet connection and try again.');
    } finally {
      setUnlocking(false);
    }
  }

  function logout() {
    localStorage.removeItem(ADMIN_SECRET_STORAGE_KEY);
    setSecret('');
    setUnlocked(false);
    setUnlockError('');
    setOrders([]);
    setSummary(null);
  }

  async function submitManualEntry(e) {
    e.preventDefault();
    setManualError('');
    setManualResult(null);

    const buyerName = manualForm.buyer_name.trim();
    const buyerPhone = manualForm.buyer_phone.trim();
    const buyerEmail = manualForm.buyer_email ? manualForm.buyer_email.trim() : '';
    const recordedBy = manualForm.recorded_by.trim();
    const qty = parseInt(manualForm.quantity, 10) || 1;

    if (!buyerName || !buyerPhone || !buyerEmail || !recordedBy) {
      setManualError('Please provide Buyer Name, Phone Number, Email Address, and your name (Recorded by).');
      return;
    }

    if (!buyerEmail.includes('@') || !buyerEmail.includes('.')) {
      setManualError('Please provide a valid email address so tickets can be delivered.');
      return;
    }

    // Remember recorder name for next time
    localStorage.setItem(SAVED_RECORDER_KEY, recordedBy);

    setManualLoading(true);
    try {
      const res = await fetch('/api/manual-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({
          ...manualForm,
          buyer_name: buyerName,
          buyer_phone: buyerPhone,
          buyer_email: buyerEmail,
          recorded_by: recordedBy,
          quantity: qty,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setManualError(data.error || 'Could not issue tickets.');
        return;
      }
      setManualResult(data);
      // Reset form but keep recorder name
      setManualForm({
        buyer_name: '',
        buyer_phone: '',
        buyer_email: '',
        department: '',
        quantity: 1,
        payment_method: 'cash',
        recorded_by: recordedBy,
      });
      refreshSummary();
      refreshOrders(secret);
    } catch (err) {
      setManualError('Network error — please check your internet connection.');
    } finally {
      setManualLoading(false);
    }
  }

  function exportCSV() {
    const rows = [
      ['Ticket Number', 'Buyer Name', 'Phone', 'Email', 'Department', 'Channel', 'Payment Method', 'Recorded By', 'Amount', 'Date'],
    ];
    orders.forEach((o) => {
      (o.raffle_tickets || []).forEach((t) => {
        rows.push([
          t.ticket_number,
          o.buyer_name,
          o.buyer_phone,
          o.buyer_email || '',
          o.department || '',
          o.channel,
          o.payment_method || 'paystack',
          o.recorded_by || '',
          o.total_amount / (o.quantity || 1),
          o.created_at,
        ]);
      });
    });
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nfcs-raffle-tickets-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Print all sold tickets formatted for the physical raffle drum
  function printAllDrumSlips() {
    const allTickets = [];
    (orders || []).forEach((o) => {
      (o.raffle_tickets || []).forEach((t) => {
        allTickets.push({
          ticketNumber: t.ticket_number,
          buyerName: o.buyer_name,
          buyerPhone: o.buyer_phone,
          department: o.department,
          channel: o.channel,
        });
      });
    });

    if (allTickets.length === 0) {
      alert('No tickets available to print. Please register a sale or verify orders first.');
      return;
    }

    // Sort sequentially by ticket number e.g. FW-000001, FW-000002...
    allTickets.sort((a, b) =>
      a.ticketNumber.localeCompare(b.ticketNumber, undefined, { numeric: true })
    );

    renderDrumSlipsPrintWindow(
      allTickets,
      `All Raffle Drum Slips (${allTickets.length} Tickets)`
    );
  }

  // Print drum slips for a single order
  function printOrderDrumSlips(ticketNumbers, buyerName, buyerPhone, buyerDepartment, channel = 'online') {
    const tickets = (ticketNumbers || []).map((num) => ({
      ticketNumber: num,
      buyerName,
      buyerPhone,
      department: buyerDepartment,
      channel,
    }));

    renderDrumSlipsPrintWindow(
      tickets,
      `Raffle Drum Slips — ${buyerName || 'Order'}`
    );
  }

  const handleCopyTicket = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedTicket(num);
    setTimeout(() => setCopiedTicket(''), 1800);
  };

  // Filtered orders based on Search & Channel Filter
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Channel Filter
      if (channelFilter !== 'all' && o.channel !== channelFilter) {
        return false;
      }

      // Search Query
      if (!search.trim()) return true;
      const q = search.toLowerCase().trim();
      return (
        o.buyer_name?.toLowerCase().includes(q) ||
        o.buyer_phone?.includes(q) ||
        o.buyer_email?.toLowerCase().includes(q) ||
        o.department?.toLowerCase().includes(q) ||
        o.recorded_by?.toLowerCase().includes(q) ||
        (o.raffle_tickets || []).some((t) => t.ticket_number.toLowerCase().includes(q))
      );
    });
  }, [orders, search, channelFilter]);

  const totalTicketsInSystem = useMemo(() => {
    return orders.reduce((acc, o) => acc + (o.raffle_tickets?.length || 0), 0);
  }, [orders]);

  const onlineOrdersCount = useMemo(() => {
    return orders.filter((o) => o.channel === 'online').length;
  }, [orders]);

  const walkinOrdersCount = useMemo(() => {
    return orders.filter((o) => o.channel === 'walk-in').length;
  }, [orders]);

  // Passcode Lock Screen (or initial authentication check)
  if (!unlocked) {
    if (isVerifyingSavedSecret) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-[#F2F8F2] via-stone-50 to-white flex items-center justify-center p-4 font-sans">
          <div className="text-center space-y-3">
            <div className="size-10 border-3 border-[#166C16] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-stone-700">Verifying admin credentials…</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2F8F2] via-stone-50 to-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Ambient background orbs */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#166C16]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#FBE202]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#166C16] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl border border-[#FBE202]/40">
              <Shield className="w-8 h-8 text-[#FBE202]" />
            </div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">Admin Portal</h1>
            <p className="text-sm font-semibold text-stone-500 mt-1">Federation Week Raffle 2026</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 p-8 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Admin Secret Key
              </label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={secret}
                onChange={(e) => {
                  setSecret(e.target.value);
                  if (unlockError) setUnlockError('');
                }}
                onKeyDown={(e) => e.key === 'Enter' && !unlocking && unlock()}
                autoFocus
                disabled={unlocking}
                className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 text-sm font-bold focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal disabled:opacity-50"
              />
            </div>

            {unlockError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 font-bold"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{unlockError}</span>
              </motion.div>
            )}

            <button
              onClick={() => unlock()}
              disabled={unlocking || !secret.trim()}
              className="w-full py-3.5 bg-[#166C16] hover:bg-[#175319] disabled:opacity-50 disabled:cursor-not-allowed text-[#FFFFFF] font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 border border-[#FBE202]/30 flex items-center justify-center gap-2"
            >
              {unlocking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FBE202]" />
                  <span>Verifying Passcode…</span>
                </>
              ) : (
                <span>Unlock Dashboard</span>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-stone-400 mt-6 font-medium">
            NFCS · St. Peter's Chaplaincy · University of Nigeria Nsukka
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F8F2] via-stone-50 to-stone-100 font-sans text-stone-900">
      {/* 1. Header Bar */}
      <header className="bg-white/85 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#166C16] rounded-xl flex items-center justify-center text-[#FBE202] font-black text-lg shadow-sm border border-[#FBE202]/30">
              🎟️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                  Federation Week Raffle
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Admin Control Center · St. Peter's Chaplaincy UNN
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Live Refresh Button */}
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="p-2.5 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              title="Refresh live data from database"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#166C16]' : ''}`} />
            </button>

            {/* Primary Action: Open Walk-in Modal */}
            <button
              onClick={() => {
                setManualResult(null);
                setManualError('');
                setIsWalkInModalOpen(true);
              }}
              className="flex items-center gap-2 bg-[#166C16] hover:bg-[#175319] text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-[#FBE202]/40"
            >
              <Plus className="w-4 h-4 text-[#FBE202]" />
              <span>Register Walk-in</span>
            </button>

            {/* Print All Drum Slips */}
            <button
              onClick={printAllDrumSlips}
              className="flex items-center gap-2 bg-[#175319] hover:bg-[#0E3510] text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-white/20"
              title="Print all sold tickets formatted for the physical raffle drum"
            >
              <Printer className="w-4 h-4 text-[#FBE202]" />
              <span>Print Drum Slips ({totalTicketsInSystem})</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-stone-300 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-stone-500" />
              <span>Export CSV</span>
            </button>

            {/* Logout Lock */}
            <button
              onClick={logout}
              className="text-stone-400 hover:text-stone-600 text-xs font-bold px-2 py-1 transition-colors"
              title="Lock Admin Portal"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 2. Top Stats Overview */}
        {summary ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              label="Tickets Sold"
              value={summary.tickets_sold}
              subtext="Total valid entries in draw"
              icon={<Ticket className="w-5 h-5 text-white" />}
              gradient="bg-gradient-to-br from-[#166C16] to-[#175319]"
            />
            <StatCard
              label="Total Revenue"
              value={`₦${Number(summary.total_revenue).toLocaleString()}`}
              subtext="Combined funds raised"
              icon={<Coins className="w-5 h-5 text-[#175319]" />}
              gradient="bg-gradient-to-br from-[#FBE202] to-amber-500 !text-[#175319]"
            />
            <StatCard
              label="Online Orders"
              value={summary.online_orders}
              subtext="Paid via Paystack gateway"
              icon={<Globe className="w-5 h-5 text-white" />}
              gradient="bg-gradient-to-br from-sky-600 to-indigo-700"
            />
            <StatCard
              label="Walk-in Sales"
              value={summary.walkin_orders}
              subtext="Cash & Bank Transfers recorded"
              icon={<Users className="w-5 h-5 text-white" />}
              gradient="bg-gradient-to-br from-emerald-600 to-teal-700"
            />
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white shadow-sm border border-stone-200 flex items-center justify-center gap-3">
            <div className="size-5 border-2 border-[#166C16] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold text-stone-600">Loading live draw summary…</span>
          </div>
        )}

        {/* 3. Orders Management Table */}
        <section className="bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-5 sm:p-6 border-b border-stone-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-50/50">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-black text-stone-900">Orders & Ticket Directory</h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700">
                  {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                Complete audit trail of all transactions and issued raffle ticket numbers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Channel Filter Pills */}
              <div className="inline-flex rounded-xl bg-stone-200/70 p-1">
                <button
                  onClick={() => setChannelFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    channelFilter === 'all'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setChannelFilter('online')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    channelFilter === 'online'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Online ({onlineOrdersCount})
                </button>
                <button
                  onClick={() => setChannelFilter('walk-in')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    channelFilter === 'walk-in'
                      ? 'bg-white text-amber-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Walk-in ({walkinOrdersCount})
                </button>
              </div>

              {/* Real-time Search Field */}
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  placeholder="Search name, phone, dept, ticket…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal shadow-2xs"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto overflow-y-hidden admin-table-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/70 border-b border-stone-200 text-[11px] font-black uppercase tracking-wider text-stone-500">
                  <th className="px-5 py-3.5">Buyer</th>
                  <th className="px-5 py-3.5">Phone</th>
                  <th className="px-5 py-3.5">Dept / Level</th>
                  <th className="px-5 py-3.5">Channel</th>
                  <th className="px-5 py-3.5 text-center">Entries</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Ticket Numbers Issued</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs font-medium">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((o) => {
                    const ticketCount = o.raffle_tickets?.length || o.quantity || 0;
                    return (
                      <tr key={o.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-extrabold text-stone-900 text-sm">{o.buyer_name}</div>
                          {o.buyer_email && (
                            <div className="text-[11px] text-stone-400 font-mono">{o.buyer_email}</div>
                          )}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-stone-700 font-mono font-bold">
                          {o.buyer_phone}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-stone-600">
                          {o.department ? (
                            <span className="font-bold text-stone-800">{o.department}</span>
                          ) : (
                            <span className="text-stone-400">—</span>
                          )}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="flex flex-col items-start gap-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                o.channel === 'online'
                                   ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                   : 'bg-amber-50 text-amber-800 border-amber-200'
                              }`}
                            >
                              {o.channel === 'online' ? (
                                <Globe className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Users className="w-3 h-3 text-amber-600" />
                              )}
                              <span>{o.channel}</span>
                              {o.payment_method && o.channel === 'walk-in' && (
                                <span className="text-[9px] opacity-75">({o.payment_method})</span>
                              )}
                            </span>

                            {o.channel === 'walk-in' && o.recorded_by && (
                              <span className="text-[11px] text-stone-500 font-medium pl-0.5">
                                by <strong className="text-stone-800">{o.recorded_by}</strong>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-center">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-stone-100 font-black text-stone-900 text-xs">
                            {ticketCount}
                          </span>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap font-black text-stone-900 text-sm">
                          ₦{Number(o.total_amount).toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          {(() => {
                            const tickets = o.raffle_tickets || [];
                            if (tickets.length === 0) {
                              return <span className="text-stone-400 text-xs italic">None</span>;
                            }
                            const isExpanded = expandedTicketOrders.has(o.id);
                            const visibleTickets = isExpanded ? tickets : tickets.slice(0, 4);
                            const remaining = tickets.length - 4;

                            return (
                              <div className="flex flex-wrap items-center gap-1 max-w-md py-1">
                                {visibleTickets.map((t) => (
                                  <button
                                    key={t.ticket_number}
                                    onClick={() => handleCopyTicket(t.ticket_number)}
                                    title="Click to copy ticket number"
                                    className="inline-flex items-center gap-1 shrink-0 bg-stone-100 hover:bg-[#166C16]/10 text-stone-800 hover:text-[#166C16] border border-stone-200 text-[10px] font-black px-2 py-0.5 rounded-md font-mono tracking-wider transition-all cursor-pointer"
                                  >
                                    <span>{t.ticket_number}</span>
                                    {copiedTicket === t.ticket_number ? (
                                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-2.5 h-2.5 opacity-35" />
                                    )}
                                  </button>
                                ))}

                                {remaining > 0 && (
                                  <button
                                    onClick={() => toggleExpandTickets(o.id)}
                                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer shrink-0"
                                    title={isExpanded ? 'Collapse tickets' : `View all ${tickets.length} tickets`}
                                  >
                                    {isExpanded ? 'Show less' : `+${remaining} more`}
                                  </button>
                                )}
                              </div>
                            );
                          })()}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-right">
                          {o.raffle_tickets && o.raffle_tickets.length > 0 && (
                            <button
                              onClick={() =>
                                printOrderDrumSlips(
                                  o.raffle_tickets.map((t) => t.ticket_number),
                                  o.buyer_name,
                                  o.buyer_phone,
                                  o.department,
                                  o.channel
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#166C16]/10 text-stone-700 hover:text-[#166C16] font-bold text-xs border border-stone-200 hover:border-[#166C16]/30 transition-all active:scale-95 cursor-pointer shadow-2xs"
                              title="Print A4 physical drum slips for this order"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print Slips</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-stone-400">
                      <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-stone-700">No orders match your filter</p>
                      <p className="text-xs text-stone-400 mt-1">
                        Try adjusting your search keywords or resetting the channel filter.
                      </p>
                      {search && (
                        <button
                          onClick={() => setSearch('')}
                          className="mt-3 px-3 py-1 text-xs font-bold text-[#166C16] underline cursor-pointer"
                        >
                          Clear Search
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 4. MODAL: Register Walk-in Sale Dialog                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isWalkInModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWalkInModalOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden z-10 max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-[#166C16]/8 via-emerald-50/40 to-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-2xl bg-[#166C16] text-[#FBE202] flex items-center justify-center shadow-md font-black">
                    🎟️
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-stone-900">Register Walk-in Sale</h2>
                    <p className="text-xs text-stone-500 font-medium">
                      Issue physical tickets for cash or bank transfer supporters.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto max-h-[calc(88vh-80px)] space-y-5 admin-modal-scroll pr-3 sm:pr-4">
                {/* Result Card (When tickets have been successfully issued) */}
                {manualResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4"
                  >
                    <div className="size-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-black">
                      ✓
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-emerald-950">
                        Tickets Successfully Issued!
                      </h3>
                      <p className="text-xs text-emerald-800 font-medium mt-1">
                        Issued to <strong>{manualResult.buyer_name}</strong> ({manualResult.quantity} entries · ₦
                        {Number(manualResult.total_amount).toLocaleString()})
                      </p>
                      {manualResult.buyer_email && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                          <Mail className="size-3.5 text-emerald-700 shrink-0" />
                          <span>
                            {manualResult.email_sent ? (
                              <>Official tickets emailed to <strong className="font-mono">{manualResult.buyer_email}</strong></>
                            ) : (
                              <>Receipt queued for <strong className="font-mono">{manualResult.buyer_email}</strong></>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Issued Ticket Chips */}
                    <div className="p-3 bg-white rounded-xl border border-emerald-200 flex flex-wrap gap-1.5 justify-center">
                      {(manualResult.tickets || []).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-[#166C16]/10 text-[#166C16] font-mono text-xs font-black border border-[#166C16]/25"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Print & Next Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                      <button
                        onClick={() =>
                          printOrderDrumSlips(
                            manualResult.tickets,
                            manualResult.buyer_name,
                            manualForm.buyer_phone,
                            manualForm.department,
                            'walk-in'
                          )
                        }
                        className="w-full sm:w-auto px-5 py-2.5 bg-[#166C16] hover:bg-[#175319] text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-[#FBE202]/30"
                      >
                        <Printer className="w-4 h-4 text-[#FBE202]" />
                        <span>Print Drum Slips</span>
                      </button>

                      <button
                        onClick={() => {
                          setManualResult(null);
                          setManualError('');
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-xl border border-stone-300 transition-all cursor-pointer"
                      >
                        + Register Another Sale
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Registration Form */
                  <form onSubmit={submitManualEntry} className="space-y-4">
                    {/* Buyer Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Buyer Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Victor Okafor"
                        value={manualForm.buyer_name}
                        onChange={(e) => setManualForm({ ...manualForm, buyer_name: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-bold focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Buyer Phone Number & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 08012345678"
                          value={manualForm.buyer_phone}
                          onChange={(e) => setManualForm({ ...manualForm, buyer_phone: e.target.value })}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-bold focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal font-mono"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                            Auto-emails tickets
                          </span>
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="e.g. victor@example.com"
                          value={manualForm.buyer_email}
                          onChange={(e) => setManualForm({ ...manualForm, buyer_email: e.target.value })}
                          className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-bold focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Department / Level */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Department / Level (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science 300L"
                        value={manualForm.department}
                        onChange={(e) => setManualForm({ ...manualForm, department: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-bold focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Ticket Quantity Selector & Quick Chips */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                          Number of Tickets
                        </label>
                        <span className="text-xs font-black text-[#166C16]">
                          Total: ₦{(manualForm.quantity * UNIT_PRICE).toLocaleString()}
                        </span>
                      </div>

                      {/* Stepper + Quick Presets */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 p-1">
                          <button
                            type="button"
                            onClick={() =>
                              setManualForm({
                                ...manualForm,
                                quantity: Math.max(1, (parseInt(manualForm.quantity, 10) || 1) - 1),
                              })
                            }
                            className="size-9 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer text-lg"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            max="500"
                            value={manualForm.quantity}
                            onChange={(e) =>
                              setManualForm({
                                ...manualForm,
                                quantity: Math.max(1, parseInt(e.target.value, 10) || 1),
                              })
                            }
                            className="w-16 text-center font-black text-stone-900 text-sm bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setManualForm({
                                ...manualForm,
                                quantity: (parseInt(manualForm.quantity, 10) || 1) + 1,
                              })
                            }
                            className="size-9 rounded-lg bg-white border border-stone-200 text-stone-700 font-bold hover:bg-stone-100 flex items-center justify-center cursor-pointer text-lg"
                          >
                            +
                          </button>
                        </div>

                        {/* Quick Pills */}
                        <div className="flex items-center gap-1.5 flex-wrap flex-1">
                          {[1, 5, 10, 20].map((preset) => {
                            const isSelected = manualForm.quantity === preset;
                            const bonus = calculateBonusTickets(preset);
                            return (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setManualForm({ ...manualForm, quantity: preset })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#166C16] text-white shadow-xs'
                                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                }`}
                              >
                                {preset} {preset === 1 ? 'ticket' : 'tickets'}
                                {bonus > 0 && ` (+${bonus})`}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bonus Alert */}
                      {calculateBonusTickets(manualForm.quantity) > 0 && (
                        <div className="mt-2 p-2 rounded-lg bg-[#FBE202]/15 border border-[#FBE202]/40 text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                          <Sparkles className="size-3.5 text-amber-600 shrink-0" />
                          <span>
                            Includes <strong>+{calculateBonusTickets(manualForm.quantity)} free bonus tickets</strong>! (Total of{' '}
                            {manualForm.quantity + calculateBonusTickets(manualForm.quantity)} entries in draw).
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                            manualForm.payment_method === 'cash'
                              ? 'border-[#166C16] bg-[#166C16]/5 text-[#166C16]'
                              : 'border-stone-200 bg-stone-50 text-stone-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment_method"
                            value="cash"
                            checked={manualForm.payment_method === 'cash'}
                            onChange={(e) =>
                              setManualForm({ ...manualForm, payment_method: e.target.value })
                            }
                            className="hidden"
                          />
                          <Banknote className="size-4" />
                          <span className="text-xs font-black">Cash Payment</span>
                        </label>

                        <label
                          className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                            manualForm.payment_method === 'transfer'
                              ? 'border-[#166C16] bg-[#166C16]/5 text-[#166C16]'
                              : 'border-stone-200 bg-stone-50 text-stone-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment_method"
                            value="transfer"
                            checked={manualForm.payment_method === 'transfer'}
                            onChange={(e) =>
                              setManualForm({ ...manualForm, payment_method: e.target.value })
                            }
                            className="hidden"
                          />
                          <CreditCard className="size-4" />
                          <span className="text-xs font-black">Bank Transfer</span>
                        </label>
                      </div>
                    </div>

                    {/* Recorded By (Exco Member Name) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                        Recorded By (Your Exco Name) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bro. Emmanuel (Financial Sec)"
                        value={manualForm.recorded_by}
                        onChange={(e) =>
                          setManualForm({ ...manualForm, recorded_by: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm font-bold focus:outline-none focus:border-[#166C16] focus:ring-2 focus:ring-[#166C16]/20 transition-all placeholder:text-stone-400 placeholder:font-normal"
                      />
                    </div>

                    {/* Error Feedback */}
                    {manualError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{manualError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={manualLoading}
                        className="w-full py-3.5 bg-[#166C16] hover:bg-[#175319] text-white rounded-xl font-black text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer disabled:opacity-50 border border-[#FBE202]/30 flex items-center justify-center gap-2"
                      >
                        {manualLoading ? (
                          <>
                            <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Assigning & Generating Stubs…</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#FBE202]" />
                            <span>
                              Issue {manualForm.quantity} Ticket
                              {manualForm.quantity > 1 ? 's' : ''} (₦
                              {(manualForm.quantity * UNIT_PRICE).toLocaleString()})
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, subtext, icon, gradient }) {
  return (
    <div
      className={`${gradient} rounded-3xl p-5 sm:p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 border border-white/15 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-white/80">{label}</span>
        <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-black tracking-tight">{value}</div>
        {subtext && <div className="text-[11px] text-white/70 font-medium mt-1">{subtext}</div>}
      </div>
    </div>
  );
}

// Ultra-efficient, ink-saving, black & white A4 physical raffle drum slip renderer
// Formatted at exactly 16 slips per A4 page (2 columns × 8 rows) with continuous straight cut guides
function renderDrumSlipsPrintWindow(tickets, title = 'Raffle Drum Slips') {
  const win = window.open('', '_blank');
  if (!win) {
    alert('Please allow popups for this site to open the printable tickets.');
    return;
  }

  const SLIPS_PER_PAGE = 16;
  const pages = [];
  for (let i = 0; i < tickets.length; i += SLIPS_PER_PAGE) {
    pages.push(tickets.slice(i, i + SLIPS_PER_PAGE));
  }

  const pagesHtml = pages
    .map((pageTickets, pageIdx) => {
      const slipsHtml = pageTickets
        .map(
          (t) => `
        <div class="slip">
          <div class="slip-header">
            <span class="org">NFCS UNN · ST. PETER'S CHAPLAINCY</span>
            <span class="draw-tag">GRAND DRAW</span>
          </div>
          
          <div class="slip-body">
            <div class="num-col">
              <div class="num-lbl">TICKET NUMBER</div>
              <div class="num-val">${t.ticketNumber}</div>
              <div class="drum-cue">★ DROP IN RAFFLE DRUM ★</div>
            </div>
            
            <div class="info-col">
              <div class="info-row"><span class="lbl">NAME:</span> <span class="val bold-name">${t.buyerName || 'Valued Supporter'}</span></div>
              <div class="info-row"><span class="lbl">PHONE:</span> <span class="val mono">${t.buyerPhone || '—'}</span></div>
              <div class="info-row"><span class="lbl">DEPT:</span> <span class="val">${t.department || '—'}</span></div>
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
            <span>Page ${pageIdx + 1} of ${pages.length} (${tickets.length} total tickets)</span>
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
        <title>${title} — NFCS Federation Week 2026</title>
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
          
          /* A4 Sheet Container (198mm usable width, 285mm usable height) */
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
          
          /* Individual Drum Slip: 99mm wide x 34mm tall */
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
          
          /* Left: Ticket Number Box */
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
          
          /* Right: Attendee Details */
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
          
          /* Footer: Fold & Cut Guides */
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
