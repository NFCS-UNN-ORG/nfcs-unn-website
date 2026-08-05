import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }>
  >;
  submitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  setFormData,
  submitted,
  handleSubmit,
}) => {
  return (
    <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      <div className="border-b border-stone-100 dark:border-slate-800 pb-4">
        <h3 className="text-xl font-black text-stone-900 dark:text-white">Send Us A Message</h3>
        <p className="text-xs text-stone-500 dark:text-slate-400">
          Our chaplaincy secretarial team typically responds within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 p-6 rounded-2xl text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h4 className="font-extrabold text-stone-900 dark:text-white text-base">Message Sent Successfully!</h4>
          <p className="text-xs text-stone-600 dark:text-slate-300">
            Thank you for reaching out to NFCS UNN. God bless you.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sis. Mary Chidi"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. mary@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="08012345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs font-bold"
              >
                <option>General Inquiry</option>
                <option>Mass Intentions & Counseling</option>
                <option>Alumni Membership & Directory</option>
                <option>Donations & Project Sponsorship</option>
                <option>Pious Society & Choir Joining</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Your Message</label>
            <textarea
              required
              rows={4}
              placeholder="How can NFCS UNN serve you?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
};
