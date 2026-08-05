import React from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

interface GetInvolvedModalProps {
  showApplyModal: boolean;
  setShowApplyModal: (show: boolean) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  gradYear: string;
  setGradYear: (year: string) => void;
  department: string;
  setDepartment: (dept: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  handleApplySubmit: (e: React.FormEvent) => void;
}

export const GetInvolvedModal: React.FC<GetInvolvedModalProps> = ({
  showApplyModal,
  setShowApplyModal,
  selectedRole,
  setSelectedRole,
  gradYear,
  setGradYear,
  department,
  setDepartment,
  location,
  setLocation,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  submitted,
  setSubmitted,
  handleApplySubmit,
}) => {
  if (!showApplyModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setShowApplyModal(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-white">Registration Submitted!</h3>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              Welcome to the NFCS UNN Global Alumni & Volunteer Network. Our chapter secretary will reach out with WhatsApp group invite & directory access.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setShowApplyModal(false);
              }}
              className="mt-4 px-6 py-2.5 bg-[#4D2EAB] text-white font-bold text-xs rounded-xl"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplySubmit} className="space-y-4">
            <div className="border-b border-stone-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-stone-900 dark:text-white text-lg">NFCS Alumni Registration</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Connect with thousands of UNN Catholic alumni home and abroad.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Bro. / Sis. Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                  Graduation Year
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2018"
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Biochemistry"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alumni@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="08012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Current City / Country</label>
              <input
                type="text"
                placeholder="e.g. Lagos, Nigeria / London, UK"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">Primary Area Of Interest</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs font-bold"
              >
                <option value="Alumni Career & Internship Mentor">Alumni Career & Internship Mentor</option>
                <option value="Indigent Student Scholarship Sponsor">Indigent Student Scholarship Sponsor</option>
                <option value="Chaplaincy Infrastructure Patron">Chaplaincy Infrastructure Patron</option>
                <option value="Diaspora Alumni Chapter Member">Diaspora Alumni Chapter Member</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Submit Registration</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
