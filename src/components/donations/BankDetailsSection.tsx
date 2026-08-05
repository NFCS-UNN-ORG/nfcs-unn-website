import React from 'react';
import { Copy, Check, Building2, ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';

interface BankDetailsSectionProps {
  copiedBank: boolean;
  handleCopyBank: () => void;
  showReceiptModal: boolean;
  setShowReceiptModal: (show: boolean) => void;
  fullName: string;
  isAnonymous: boolean;
  email: string;
  selectedCause: string;
  getFinalAmount: () => number;
  donationFrequency: 'monthly' | 'onetime';
}

export const BankDetailsSection: React.FC<BankDetailsSectionProps> = ({
  copiedBank,
  handleCopyBank,
  showReceiptModal,
  setShowReceiptModal,
  fullName,
  isAnonymous,
  email,
  selectedCause,
  getFinalAmount,
  donationFrequency,
}) => {
  return (
    <>
      {/* Direct Transfer Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-stone-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Direct Bank Transfer Details</h3>
            <p className="text-xs text-stone-400">Official St. Peter's Chaplaincy UNN Account</p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Bank Name</span>
              <span className="font-bold text-white text-sm">Zenith Bank Plc</span>
            </div>
            <span className="text-xs bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-800">
              Verified
            </span>
          </div>

          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Account Number</span>
              <span className="font-black text-emerald-400 text-lg tracking-wider">1012345678</span>
            </div>
            <button
              onClick={handleCopyBank}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBank ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Account Name</span>
            <span className="font-bold text-stone-200 text-xs sm:text-sm">
              St. Peter's Catholic Chaplaincy UNN Development Fund
            </span>
          </div>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-stone-300 leading-relaxed">
            Kindly use your <strong>Full Name</strong> or <strong>Phone Number</strong> as the transfer description so we can reconcile your donation and issue an official Chaplaincy receipt.
          </p>
        </div>
      </div>

      {/* Digital Receipt Modal Popup */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowReceiptModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">
                Donation Pledge Initiated!
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Official NFCS UNN Digital Acknowledgment Receipt
              </p>
            </div>

            <div className="bg-stone-50 dark:bg-slate-900 p-5 rounded-2xl space-y-3 text-xs border border-stone-200 dark:border-slate-800 font-medium text-stone-700 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Reference:</span>
                <span className="font-mono font-bold text-stone-900 dark:text-white">
                  NFCS-DON-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Donor Name:</span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {isAnonymous ? 'Anonymous Donor' : fullName || 'Valued Supporter'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Email:</span>
                <span className="font-bold text-stone-900 dark:text-white">{email || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Designated Cause:</span>
                <span className="font-bold text-stone-900 dark:text-white">{selectedCause}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 dark:border-slate-800 pt-2 text-sm">
                <span className="font-bold">Total Amount:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">
                  ₦{getFinalAmount().toLocaleString()}{' '}
                  <span className="text-xs font-normal">({donationFrequency})</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Print Official PDF Receipt</span>
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="w-full py-2.5 bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Close & Return To Website
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
