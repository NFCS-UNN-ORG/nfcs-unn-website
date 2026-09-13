export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const key of Object.keys(input)) {
        if ((input as any)[key]) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}

/**
 * Normalizes any Nigerian phone number format into canonical 11-digit format:
 * +2348031234567, 2348031234567, 8031234567, 08031234567 -> "08031234567"
 */
export function normalizeNigerianPhone(phone?: string | null): string {
  if (!phone || typeof phone !== 'string') return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('2340')) {
    digits = digits.slice(3); // e.g. +234080... -> 080...
  } else if (digits.startsWith('234') && digits.length >= 13) {
    digits = '0' + digits.slice(3);
  } else if (digits.length === 10) {
    digits = '0' + digits;
  }
  return digits;
}

/**
 * Formats a phone number for identical, clean display in tables:
 * "08031234567" -> "0803 123 4567"
 */
export function formatPhoneDisplay(phone?: string | null): string {
  const norm = normalizeNigerianPhone(phone);
  if (!norm || norm.length < 10) return phone || '—';
  if (norm.length === 11) {
    return `${norm.slice(0, 4)} ${norm.slice(4, 7)} ${norm.slice(7)}`;
  }
  return norm;
}

/**
 * Returns the invariant last 10 digits of any phone number
 */
export function getPhoneLast10(phone?: string | null): string {
  if (!phone || typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');
  return digits.slice(-10);
}
