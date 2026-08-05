import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Heart,
  Building2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';
import { GetInvolvedHero } from '../get-involved/GetInvolvedHero';
import { GetInvolvedModal } from '../get-involved/GetInvolvedModal';

interface GetInvolvedPageViewProps {
  onNavigate?: (tab: any) => void;
}

export const GetInvolvedPageView: React.FC<GetInvolvedPageViewProps> = () => {
  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Modal State for Joining Alumni Network / Volunteer
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>('Alumni Career & Internship Mentor');
  const [gradYear, setGradYear] = useState<string>('2018');
  const [department, setDepartment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const divisions = [
    {
      id: 'mentorship',
      title: 'Mentorship & Career',
      jobsAvailable: '12 Roles Available',
      icon: <GraduationCap className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      description:
        'Guide undergraduates with resume reviews, career coaching, graduate school guidance, and job placement opportunities.',
    },
    {
      id: 'technology',
      title: 'Academic & Technology',
      jobsAvailable: '4 Roles Available',
      icon: <Briefcase className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      description:
        'Support digital learning tools, past question printing, STEM workshops, and software infrastructure for UNN students.',
    },
    {
      id: 'welfare',
      title: 'Student Welfare & Relief',
      jobsAvailable: '28 Roles Available',
      icon: <Heart className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      description:
        'Sponsor indigent student tuition, emergency medical funds, accommodation relief, and campus feeding initiatives.',
    },
    {
      id: 'infrastructure',
      title: 'Endowment & Projects',
      jobsAvailable: '8 Roles Available',
      icon: <Building2 className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />,
      description:
        'Fund St. Peter’s Chaplaincy solar power, audio-visual gear, altar maintenance, and library reading annex expansions.',
    },
  ];

  const coreValues = [
    {
      title: 'Integrity & Stewardship',
      desc: 'We uphold absolute financial transparency, publishing audited reports supervised by St. Peter’s Chaplaincy Fathers.',
    },
    {
      title: 'Student Empowerment',
      desc: 'We strive to uplift Catholic undergraduates at UNN through tuition scholarships, mentorship, and spiritual formation.',
    },
    {
      title: 'Alumni Collaboration',
      desc: 'We work together with alumni chapters in Lagos, Abuja, Port Harcourt, Enugu, UK, US, and across the global diaspora.',
    },
    {
      title: 'Sustainable Impact',
      desc: 'We focus on long-term solutions like 24/7 solar power, annual indigent student endowments, and medical outreach.',
    },
  ];

  const faqs = [
    {
      q: 'How Can Alumni Register In The Global Network?',
      a: 'Click "Join Global NFCS Alumni Directory" above to complete your graduation year, department, and contact info. You will be added to regional alumni chapters.',
    },
    {
      q: 'Can I Mentor Specific Faculties Or Departments?',
      a: 'Yes! Our mentorship portal pairs alumni with undergraduates based on matching academic departments and career tracks.',
    },
    {
      q: 'Are Alumni Contributions Eligible For Digital Receipts?',
      a: 'Yes. Every donation or sponsorship pledged through our platform is issued an official Chaplaincy receipt.',
    },
  ];

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-8 sm:py-14 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Hero & Divisions */}
        <GetInvolvedHero divisions={divisions} onOpenApplyModal={() => setShowApplyModal(true)} />

        {/* Core Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Pillars That Guide NFCS Alumni Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl p-6 space-y-2 shadow-sm"
              >
                <h3 className="font-extrabold text-stone-900 dark:text-white text-base">{val.title}</h3>
                <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white">Alumni FAQ</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-[#4D2EAB] dark:text-indigo-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-stone-400" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-stone-600 dark:text-slate-300 leading-relaxed border-t border-stone-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Modal */}
        <GetInvolvedModal
          showApplyModal={showApplyModal}
          setShowApplyModal={setShowApplyModal}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          gradYear={gradYear}
          setGradYear={setGradYear}
          department={department}
          setDepartment={setDepartment}
          location={location}
          setLocation={setLocation}
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          submitted={submitted}
          setSubmitted={setSubmitted}
          handleApplySubmit={handleApplySubmit}
        />
      </div>

      <NewsletterBanner />
    </div>
  );
};
