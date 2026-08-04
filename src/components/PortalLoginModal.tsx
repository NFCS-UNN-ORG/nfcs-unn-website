import React, { useState } from 'react';
import { X, LogIn, ShieldCheck, GraduationCap, CheckCircle } from 'lucide-react';
import { SITE_INFO } from '../data/nfcsData';
import { NfcsLogo } from './NfcsLogo';

interface PortalLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortalLoginModal: React.FC<PortalLoginModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'student' | 'exco' | 'alumni'>('student');
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Authenticated successfully as ${role.toUpperCase()}! Redirecting to NFCS UNN Portal...`);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-1">
            <NfcsLogo size={56} />
          </div>
          <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">NFCS UNN Student Portal</h3>
          <p className="text-xs text-stone-500 font-medium">
            Sign in to access your student profile & dues history
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              role === 'student' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('exco')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              role === 'exco' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Exco
          </button>
          <button
            type="button"
            onClick={() => setRole('alumni')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              role === 'alumni' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Alumni
          </button>
        </div>

        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
            <p className="text-xs font-bold">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {role === 'alumni' ? 'Alumni Email / Grad Year' : 'UNN Reg Number / Portal ID'}
              </label>
              <input
                type="text"
                required
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder={role === 'alumni' ? 'e.g., john.doe@alumni.unn.edu.ng' : 'e.g., 2023/245890'}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-emerald-700 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <LogIn className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-stone-100">
          <p className="text-[11px] text-stone-500">
            Need help signing in? Contact NFCS UNN Secretariat at St. Peter's Chaplaincy.
          </p>
        </div>

      </div>
    </div>
  );
};
