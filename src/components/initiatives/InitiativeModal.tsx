import React from 'react';
import { ProjectItem } from '../../types';
import { X, CheckCircle2, Heart, Send } from 'lucide-react';

interface InitiativeModalProps {
  selectedProject: ProjectItem | null;
  setSelectedProject: (proj: ProjectItem | null) => void;
  volunteerModalOpen: boolean;
  setVolunteerModalOpen: (open: boolean) => void;
  pledgeSubmitted: boolean;
  donorName: string;
  setDonorName: (name: string) => void;
  donorAmount: string;
  setDonorAmount: (amt: string) => void;
  donorPhone: string;
  setDonorPhone: (phone: string) => void;
  handleSupportSubmit: (e: React.FormEvent) => void;
}

export const InitiativeModal: React.FC<InitiativeModalProps> = ({
  selectedProject,
  setSelectedProject,
  volunteerModalOpen,
  setVolunteerModalOpen,
  pledgeSubmitted,
  donorName,
  setDonorName,
  donorAmount,
  setDonorAmount,
  donorPhone,
  setDonorPhone,
  handleSupportSubmit,
}) => {
  return (
    <>
      {/* Pledge Support Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {pledgeSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white">Pledge Received!</h3>
                <p className="text-xs text-stone-600 dark:text-slate-300">
                  Thank you for supporting <strong>{selectedProject.title}</strong>. Our Chaplaincy Financial Committee will contact you shortly with transfer acknowledgment details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-stone-100 dark:border-slate-800 pb-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-stone-900 dark:text-white text-base">Support Initiative</h3>
                    <p className="text-xs text-stone-500 dark:text-slate-400 line-clamp-1">{selectedProject.title}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bro / Sis Full Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                    Pledge Amount (NGN ₦)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 10000"
                    value={donorAmount}
                    onChange={(e) => setDonorAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08012345678"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl text-stone-900 dark:text-white text-xs"
                  />
                </div>

                <div className="bg-stone-50 dark:bg-slate-900 p-3 rounded-xl border border-stone-200 dark:border-slate-800 text-[11px] text-stone-600 dark:text-slate-400">
                  Direct Transfer: <strong>Zenith Bank • 1012345678</strong> (St. Peter's Chaplaincy UNN)
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#4D2EAB] hover:bg-[#3B2285] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Financial Support Pledge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Volunteer Modal */}
      {volunteerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 max-w-md w-full rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setVolunteerModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-stone-900 dark:text-white">Volunteer With NFCS UNN</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Offer your time, academic talent, or choir passion to serve God & Catholic undergraduates.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for volunteering! An NFCS Exco representative will contact you via WhatsApp.');
                setVolunteerModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-stone-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bro. Chinedu"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-slate-300 mb-1">Faculty & Department</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engineering - Electrical"
                  className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 dark:text-slate-300 mb-1">Ministry Choice</label>
                <select className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-xl">
                  <option>Academic Tutorial Volunteer (GST & Major Courses)</option>
                  <option>STPEC Choir / Liturgical Music</option>
                  <option>Ushering & Protocol Committee</option>
                  <option>Media & Content Creation Team</option>
                  <option>St. Vincent de Paul Welfare Outreach</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer mt-2"
              >
                Register As Volunteer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
