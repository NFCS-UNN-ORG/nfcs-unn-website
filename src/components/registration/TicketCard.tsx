import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedPrice } from './AnimatedPrice';

export interface TicketCardProps {
  name: string;
  subtitle: string;
  unitPrice: number;
  quantity: number;
  bonusTickets: number;
  totalEntries: number;
  totalAmount: number;
  isSelected: boolean;
  onSelect?: () => void;
  onQuantityChange?: (qty: number) => void;
  mode?: 'selectable' | 'confirmed';
}

const PRESET_TIERS = [
  { count: 1, label: '1 Ticket', desc: '₦200' },
  { count: 10, label: '10 Tickets', desc: '+1 FREE (11 entries)', tag: '🎁 +1 Free' },
  { count: 20, label: '20 Tickets', desc: '+2 FREE (22 entries)', tag: '🎁 +2 Free' },
  { count: 50, label: '50 Tickets', desc: '+5 FREE (55 entries)', tag: '⭐ +5 Free' },
  { count: 100, label: '100 Tickets', desc: '+10 FREE (110 entries)', tag: '🏆 +10 Free' },
  { count: 200, label: '200 Tickets', desc: '+20 FREE (220 entries)', tag: '👑 +20 Free' },
];

export const TicketCard: React.FC<TicketCardProps> = React.memo(({
  name = 'Standard Raffle Ticket',
  subtitle = '1st, 2nd, 3rd + Consolation (4th–10th) Grand Draw',
  unitPrice = 200,
  quantity = 1,
  bonusTickets = 0,
  totalEntries = 1,
  totalAmount = 200,
  isSelected,
  onSelect,
  onQuantityChange,
  mode = 'selectable',
}) => {
  const isConfirmed = mode === 'confirmed';

  // Local input value state to allow fluid user editing & typing
  const [localQty, setLocalQty] = useState<string>(String(quantity));

  useEffect(() => {
    setLocalQty(String(quantity));
  }, [quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ''); // only allow digits
    setLocalQty(val);
    if (val !== '') {
      const num = parseInt(val, 10);
      if (num > 0) {
        onQuantityChange?.(Math.min(10000, num));
      }
    }
  };

  const handleBlur = () => {
    const num = parseInt(localQty, 10);
    if (!num || num < 1) {
      setLocalQty('1');
      onQuantityChange?.(1);
    } else {
      const clamped = Math.min(10000, num);
      setLocalQty(String(clamped));
      onQuantityChange?.(clamped);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const current = parseInt(localQty, 10) || quantity || 1;
      const next = Math.min(10000, current + 1);
      setLocalQty(String(next));
      onQuantityChange?.(next);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const current = parseInt(localQty, 10) || quantity || 1;
      const next = Math.max(1, current - 1);
      setLocalQty(String(next));
      onQuantityChange?.(next);
    }
  };

  // Track quantity changes to determine rolling direction (+1 up, -1 down)
  const prevQtyRef = useRef(quantity);
  const direction = quantity >= prevQtyRef.current ? 1 : -1;

  useEffect(() => {
    prevQtyRef.current = quantity;
  }, [quantity]);

  return (
    <div className="negative-curve-wrapper w-full select-none">
      <motion.div
        layout
        role={isConfirmed ? undefined : 'radio'}
        aria-checked={isSelected}
        tabIndex={isConfirmed ? undefined : 0}
        whileHover={!isConfirmed ? { y: -2 } : undefined}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onKeyDown={(e) => {
          if (!isConfirmed && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            onSelect?.();
          }
        }}
        onClick={isConfirmed ? undefined : onSelect}
        className={`negative-curve-card relative w-full backdrop-blur-xl transition-all duration-300 ${isSelected
            ? 'bg-[#175319]/40 shadow-[0_8px_30px_rgba(251,226,2,0.18)] border-[0.5px] border-[#FBE202]/25'
            : 'bg-[#0A1E0D]/60 hover:bg-[#175319]/30 hover:shadow-xl cursor-pointer border-[0.5px] border-white/10'
          }`}
      >
        {/* Top Main Row */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Circular Radio / Drawn Checkmark Indicator */}
            <div
              className={`size-6 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-200 ${isSelected
                  ? 'border-[#FBE202] bg-[#166C16] text-[#FFFFFF] shadow-sm'
                  : 'border-white/20 bg-white/5'
                }`}
            >
              {isSelected && (
                <motion.svg
                  viewBox="0 0 24 24"
                  className="size-3.5 text-[#FBE202]"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                >
                  <motion.path
                    d="M 4 12 L 9.5 17.5 L 20 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                </motion.svg>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white truncate">{name}</h3>
                {bonusTickets > 0 && (
                  <motion.span
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    className="relative inline-flex items-center"
                  >
                  </motion.span>
                )}
              </div>
              <p className="text-xs text-white/60 truncate mt-0.5">{subtitle}</p>
            </div>
          </div>

          {/* Price display with rolling digits & flash highlight */}
          <div className="text-right shrink-0">
            <div className="text-base sm:text-lg font-black text-white font-mono">
              <AnimatedPrice amount={isConfirmed ? totalAmount : unitPrice} />
            </div>
            <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
              {isConfirmed ? `${totalEntries} entries` : 'per ticket'}
            </p>
          </div>
        </div>

        {/* Perforated Cutout Divider */}
        <div className="ticket-perforation" />

        {/* Interactive Controls when in Selectable Mode */}
        {!isConfirmed && (
          <div className="p-4 sm:p-5 pt-3 space-y-4">
            {/* Quantity Controls and Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Ticket Quantity
                </span>
                <div className="flex items-center gap-2">
                  {/* Stepper Minus Button with scale-down-then-up press feedback */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.86 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const current = parseInt(localQty, 10) || quantity || 1;
                      const next = Math.max(1, current - 1);
                      setLocalQty(String(next));
                      onQuantityChange?.(next);
                    }}
                    className="size-8 rounded-lg bg-white/10 hover:bg-white/20 border-[0.5px] border-white/12 text-white font-bold flex items-center justify-center transition-colors cursor-pointer active:bg-white/25"
                    aria-label="Decrease quantity"
                  >
                    −
                  </motion.button>

                  {/* Editable Quantity Input */}
                  <div className="relative flex items-center justify-center">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={localQty}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onKeyDown={handleInputKeyDown}
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => {
                        e.stopPropagation();
                        e.target.select();
                      }}
                      className="w-16 sm:w-20 h-8 bg-white/10 hover:bg-white/15 focus:bg-white/20 border-[0.5px] border-white/15 focus:border-[#FBE202] rounded-lg text-center text-white font-mono font-bold text-sm outline-none transition-all focus:ring-1 focus:ring-[#FBE202]/40 cursor-text"
                      aria-label="Ticket quantity"
                      title="Click or type to edit quantity"
                    />
                  </div>

                  {/* Stepper Plus Button with scale-down-then-up press feedback */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.86 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const current = parseInt(localQty, 10) || quantity || 1;
                      const next = Math.min(10000, current + 1);
                      setLocalQty(String(next));
                      onQuantityChange?.(next);
                    }}
                    className="size-8 rounded-lg bg-white/10 hover:bg-white/20 border-[0.5px] border-white/12 text-white font-bold flex items-center justify-center transition-colors cursor-pointer active:bg-white/25"
                    aria-label="Increase quantity"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Presets Grid: Tactile hover states, scale bounce & drawn checkmark on selection */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {PRESET_TIERS.map((tier) => {
                  const isTileSelected = quantity === tier.count;

                  return (
                    <motion.button
                      key={tier.count}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuantityChange?.(tier.count);
                      }}
                      className={`relative p-2.5 rounded-xl text-left transition-all border-[0.5px] text-xs cursor-pointer ${isTileSelected
                          ? 'bg-[#166C16] border-[#FBE202]/80 text-white shadow-[0_4px_18px_rgba(251,226,2,0.25)] ring-1 ring-[#FBE202]/50'
                          : 'bg-white/[0.04] border-white/10 text-white/80 hover:bg-white/[0.08] hover:border-white/15 hover:shadow-md'
                        }`}
                    >
                      <div className="flex items-center justify-between font-extrabold">
                        <span className="truncate">{tier.label}</span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Upsell Badge with load bounce & soft pulsing glow */}
                          {tier.tag && (
                            <motion.span
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 18,
                              }}
                              className="relative inline-flex items-center"
                            >
                              <motion.span
                                className="absolute -inset-0.5 rounded bg-[#FBE202]/30 pointer-events-none"
                                animate={{
                                  opacity: [0.7, 0, 0.7],
                                  scale: [1, 1.25, 1],
                                }}
                                transition={{
                                  duration: 2.2,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                }}
                              />
                              <span className="relative text-[9px] bg-[#FBE202] text-[#175319] font-black px-1.5 py-0.2 rounded shadow-xs">
                                {tier.tag}
                              </span>
                            </motion.span>
                          )}

                          {/* Animated Checkmark that draws in via stroke animation when tile is selected */}
                          {isTileSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 20,
                              }}
                              className="size-4 rounded-full bg-[#FBE202] text-[#175319] flex items-center justify-center shrink-0 shadow-sm"
                            >
                              <svg viewBox="0 0 24 24" className="size-2.5">
                                <motion.path
                                  d="M 4 12 L 9.5 17.5 L 20 6.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.2, ease: 'easeOut' }}
                                />
                              </svg>
                            </motion.span>
                          )}
                        </div>
                      </div>

                      <div className="text-[10px] text-white/60 mt-1">{tier.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bonus celebration callout */}
            {bonusTickets > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-500/20 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200 shadow-sm"
              >
                <span className="font-extrabold flex items-center gap-1.5">
                  <span className="animate-bounce">🎁</span> +{bonusTickets} Free Bonus Tickets Awarded!
                </span>
                <span className="font-mono font-bold bg-emerald-500/40 px-2 py-0.5 rounded-md text-[11px] text-white shadow-xs">
                  {totalEntries} in drum
                </span>
              </motion.div>
            )}
          </div>
        )}

        {/* Confirmed recap footer */}
        {isConfirmed && (
          <div className="p-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-xs text-white/70 px-5">
            <span>
              {quantity} paid {bonusTickets > 0 ? `+ ${bonusTickets} free bonus` : ''}
            </span>
            <span className="font-extrabold text-white">{totalEntries} Total Entries In Drum</span>
          </div>
        )}
      </motion.div>
    </div>
  );
});

export default TicketCard;
