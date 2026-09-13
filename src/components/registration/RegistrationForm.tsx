import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { AnimatedPrice } from './AnimatedPrice';
import { normalizeNigerianPhone } from '../../lib/utils';

interface RegistrationFormProps {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  department: string;
  setDepartment: (v: string) => void;
  totalAmount: number;
  totalEntries: number;
  loading: boolean;
  onSubmit: (formData: {
    name: string;
    phone: string;
    email: string;
    gender: string;
    department: string;
  }) => void;
  onFocusChange?: (isFocused: boolean) => void;
  referredBy?: string;
  setReferredBy?: (v: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = memo(({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  gender,
  setGender,
  department,
  setDepartment,
  totalAmount,
  totalEntries,
  loading,
  onSubmit,
  onFocusChange,
  referredBy,
  setReferredBy,
}) => {
  // Local state isolates typing from parent page re-renders (zero keystroke lag)
  const [localName, setLocalName] = useState(name);
  const [localPhone, setLocalPhone] = useState(phone);
  const [localEmail, setLocalEmail] = useState(email);
  const [localGender, setLocalGender] = useState(gender);
  const [localDepartment, setLocalDepartment] = useState(department);
  const [error, setError] = useState('');

  // Sync with parent props if reset or updated externally
  useEffect(() => { setLocalName(name); }, [name]);
  useEffect(() => { setLocalPhone(phone); }, [phone]);
  useEffect(() => { setLocalEmail(email); }, [email]);
  useEffect(() => { setLocalGender(gender); }, [gender]);
  useEffect(() => { setLocalDepartment(department); }, [department]);

  // Validate required fields: Name, Phone, Email (for Resend ticket dispatch), and Gender
  const isNameValid = localName.trim().length >= 2;
  const isPhoneValid = localPhone.trim().length >= 10;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail.trim());
  const isGenderValid = localGender.trim().length > 0;
  const isValid = isNameValid && isPhoneValid && isEmailValid && isGenderValid && !loading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameValid) {
      setError('Please provide your full name');
      return;
    }
    if (!isEmailValid) {
      setError('Please provide a valid email address so we can email your tickets');
      return;
    }
    if (!isPhoneValid) {
      setError('Please provide a valid phone number (+234... or 080...)');
      return;
    }
    if (!isGenderValid) {
      setError('Please select your gender');
      return;
    }
    setError('');

    const canonicalPhone = normalizeNigerianPhone(localPhone.trim()) || localPhone.trim();

    const formData = {
      name: localName.trim(),
      phone: canonicalPhone,
      email: localEmail.trim(),
      gender: localGender.trim(),
      department: localDepartment.trim(),
    };

    // Update parent state asynchronously
    setName(formData.name);
    setPhone(formData.phone);
    setEmail(formData.email);
    setGender(formData.gender);
    setDepartment(formData.department);

    // Call onSubmit directly with the current form data object
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 select-none">
      {/* Inner Card of the Form with Negative Curve / Inverted Scooped Corners */}
      <div className="negative-curve-wrapper">
        <div className="negative-curve-card p-5 sm:p-6 bg-[#0A1E0D]/60 backdrop-blur-md space-y-5">
          {/* Full Name (Required *) */}
          <div>
            <label
              htmlFor="full-name"
              className="block text-xs font-semibold text-white/60 mb-1"
            >
              Full Name <span className="text-[#FBE202] font-black">*</span>
            </label>
            <input
              id="full-name"
              type="text"
              required
              aria-required="true"
              autoComplete="name"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => {
                onFocusChange?.(false);
                setName(localName);
              }}
              placeholder="e.g. Victor Okafor"
              className="w-full underline-input text-base text-white placeholder:text-white/25 py-2.5"
            />
          </div>

          {/* Email Address (Required for Resend ticket dispatch) */}
          <div>
            <label
              htmlFor="email-address"
              className="block text-xs font-semibold text-white/60 mb-1"
            >
              Email Address <span className="text-[#FBE202] font-black">*</span>
            </label>
            <input
              id="email-address"
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => {
                onFocusChange?.(false);
                setEmail(localEmail);
              }}
              placeholder="you@example.com"
              className="w-full underline-input text-base text-white placeholder:text-white/25 py-2.5"
            />
            <p className="text-[11px] text-[#FBE202]/90 mt-1">
              Your official tickets & draw stubs will be emailed here
            </p>
          </div>

          {/* Phone Number (Required *) */}
          <div>
            <label
              htmlFor="phone-number"
              className="block text-xs font-semibold text-white/60 mb-1"
            >
              Phone Number <span className="text-[#FBE202] font-black">*</span>
            </label>
            <input
              id="phone-number"
              type="tel"
              required
              aria-required="true"
              autoComplete="tel"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => {
                onFocusChange?.(false);
                setPhone(localPhone);
              }}
              placeholder="+234800000000"
              className="w-full underline-input text-base text-white placeholder:text-white/25 py-2.5 font-mono"
            />
          </div>

          {/* Gender (Required *) */}
          <div>
            <label
              htmlFor="gender-select"
              className="block text-xs font-semibold text-white/60 mb-1"
            >
              Gender <span className="text-[#FBE202] font-black">*</span>
            </label>
            <div className="relative">
              <select
                id="gender-select"
                required
                aria-required="true"
                autoComplete="sex"
                value={localGender}
                onChange={(e) => {
                  setLocalGender(e.target.value);
                  setGender(e.target.value);
                }}
                onFocus={() => onFocusChange?.(true)}
                onBlur={() => onFocusChange?.(false)}
                className="w-full underline-input appearance-none text-base text-white bg-transparent py-2.5 pr-8 cursor-pointer [&>option]:bg-[#0A1E0D] [&>option]:text-white"
              >
                <option value="" disabled>
                  Select an item
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 size-4 text-white/50" />
            </div>
          </div>

          {/* Department / Faculty (Optional) */}
          <div>
            <label
              htmlFor="dept-input"
              className="block text-xs font-semibold text-white/60 mb-1"
            >
              Department / Level <span className="text-white/30 font-normal">(optional)</span>
            </label>
            <input
              id="dept-input"
              type="text"
              autoComplete="organization"
              value={localDepartment}
              onChange={(e) => setLocalDepartment(e.target.value)}
              onFocus={() => onFocusChange?.(true)}
              onBlur={() => {
                onFocusChange?.(false);
                setDepartment(localDepartment);
              }}
              placeholder="e.g. Pharmacy / 400L"
              className="w-full underline-input text-base text-white placeholder:text-white/25 py-2.5"
            />
          </div>

          {/* Referral Code / Link Credit (Optional) */}
          <div className="pt-1">
            {referredBy ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FBE202]/10 border border-[#FBE202]/30 text-xs text-[#FBE202]">
                <div className="flex items-center gap-1.5 truncate">
                  <span>✨</span>
                  <span>Referred by: <strong className="text-white font-mono">{referredBy}</strong></span>
                </div>
                {setReferredBy && (
                  <button
                    type="button"
                    onClick={() => {
                      setReferredBy('');
                      try { localStorage.removeItem('nfcs_raffle_ref'); } catch {}
                    }}
                    className="text-white/50 hover:text-white text-[10px] underline ml-2 cursor-pointer shrink-0"
                  >
                    Change
                  </button>
                )}
              </div>
            ) : (
              <div>
                <label
                  htmlFor="referral-input"
                  className="block text-xs font-semibold text-white/60 mb-1"
                >
                  Referral Phone / Code <span className="text-white/30 font-normal">(optional)</span>
                </label>
                <input
                  id="referral-input"
                  type="text"
                  value={referredBy || ''}
                  onChange={(e) => {
                    const val = e.target.value.trim();
                    if (setReferredBy) setReferredBy(val);
                    try {
                      if (val) localStorage.setItem('nfcs_raffle_ref', val);
                      else localStorage.removeItem('nfcs_raffle_ref');
                    } catch {}
                  }}
                  onFocus={() => onFocusChange?.(true)}
                  onBlur={() => onFocusChange?.(false)}
                  placeholder="e.g. 08012345678"
                  className="w-full underline-input text-sm text-white placeholder:text-white/25 py-2 font-mono"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Footer & CTA Button */}
      <div className="pt-4 space-y-3">
        <motion.button
          type="submit"
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.01 } : undefined}
          whileTap={isValid ? { scale: 0.98 } : undefined}
          className={`w-full py-4 px-6 rounded-xl font-black text-base transition-all flex items-center justify-center gap-2.5 shadow-xl ${
            isValid
              ? 'bg-[#166C16] hover:bg-[#175319] text-[#FFFFFF] cursor-pointer shadow-[0_10px_25px_rgba(22,108,22,0.4)] border-[0.5px] border-[#FBE202]/25'
              : 'bg-white/20 text-white/40 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting to Paystack…</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                Pay <AnimatedPrice amount={totalAmount} />
              </span>
              <span className="text-xs font-normal opacity-75">
                ({totalEntries} {totalEntries === 1 ? 'entry' : 'entries'})
              </span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured 256-bit SSL • Instant verified tickets</span>
        </div>
      </div>
    </form>
  );
});

export default RegistrationForm;
