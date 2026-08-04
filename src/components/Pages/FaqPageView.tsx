import React, { useState } from 'react';
import { PageTab } from '../../types';
import { ChevronDown, HelpCircle, Mail, Phone, MessageSquare, ArrowRight, Heart, ShieldCheck, CreditCard } from 'lucide-react';

interface FaqPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FaqPageView: React.FC<FaqPageViewProps> = ({ onNavigate }) => {
  const [openGeneralId, setOpenGeneralId] = useState<string | null>('gen-1');
  const [openDonateId, setOpenDonateId] = useState<string | null>('don-1');

  const generalFaqs: FaqItem[] = [
    {
      id: 'gen-1',
      question: 'What is the mission of your organization?',
      answer: 'The Nigeria Catholic Student Federation (NFCS), St. Peter’s Catholic Chaplaincy UNN, exists to nurture spiritual growth, academic excellence, moral integrity, and social outreach among Catholic students and host communities.',
    },
    {
      id: 'gen-2',
      question: 'How can I contribute to your cause?',
      answer: 'You can contribute by volunteering in pious societies, donating financially to chaplaincy infrastructure and student scholarships, attending Holy Mass, or mentoring current undergraduates.',
    },
    {
      id: 'gen-3',
      question: 'Where do your donations go?',
      answer: '100% of public donations are audited and allocated directly to student scholarships, chapel maintenance, rural medical outreach, indigent student feeding, and community development projects.',
    },
    {
      id: 'gen-4',
      question: 'How can I stay updated on your activities?',
      answer: 'Subscribe to our weekly newsletter, follow our official social media handles, check our website blog, or join the NFCS UNN WhatsApp and Telegram broadcast channels.',
    },
    {
      id: 'gen-5',
      question: 'Can I volunteer for your programs?',
      answer: 'Yes! Both current UNN students and alumni are warmly invited to volunteer across our 15 pious societies, medical outreaches, choir, lectio divina, and event organizing teams.',
    },
    {
      id: 'gen-6',
      question: 'What kind of events do you organize?',
      answer: 'We organize daily and Sunday Holy Mass, annual NFCS Cultural Day, Lenten retreats, academic tutorial bootcamps, medical missions, sports tournaments, and alumni homecomings.',
    },
    {
      id: 'gen-7',
      question: 'How do you select the projects you support?',
      answer: 'Projects are evaluated by the Chaplaincy Board and NFCS Executive Council based on community urgency, student welfare impact, feasibility, and alignment with Catholic social teaching.',
    },
  ];

  const donateFaqs: FaqItem[] = [
    {
      id: 'don-1',
      question: 'How can I make a donation?',
      answer: 'You can donate directly through our online secure donation portal via debit card, bank transfer, USSD, or international card payments. You can also make direct bank deposits to our official chaplaincy accounts.',
    },
    {
      id: 'don-2',
      question: 'Is there a minimum donation amount?',
      answer: 'No! Every gift matters—whether ₦500 or ₦5,000,000. Every contribution brings hope and support to indigent students and chaplaincy development.',
    },
    {
      id: 'don-3',
      question: 'Can I donate anonymously?',
      answer: 'Yes. On our donation checkout modal, simply check the "Donate Anonymously" option. Your personal details will remain completely confidential.',
    },
    {
      id: 'don-4',
      question: 'What payment methods do you accept for donations?',
      answer: 'We accept Mastercard, Visa, Verve, Paystack, Flutterwave, direct Bank Transfers, and international wire transfers.',
    },
    {
      id: 'don-5',
      question: 'Can I donate in-kind instead of money?',
      answer: 'Yes! We warmly accept food items, books, bags of cement for chapel expansion, medical supplies, laptops, and clothing items at the Chaplaincy Office, UNN Nsukka.',
    },
    {
      id: 'don-6',
      question: 'How will my donation be used?',
      answer: 'Donations go towards your specified cause (e.g. Student Tuition Endowment, Chapel Building Fund, Medical Outreach). Detailed receipts and quarterly financial reports are published transparently.',
    },
    {
      id: 'don-7',
      question: 'Can I set up a recurring donation?',
      answer: 'Yes, you can enable monthly or annual automated recurring donations on our portal to support long-term scholarships.',
    },
  ];

  const toggleGeneral = (id: string) => {
    setOpenGeneralId(openGeneralId === id ? null : id);
  };

  const toggleDonate = (id: string) => {
    setOpenDonateId(openDonateId === id ? null : id);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Header Section matching Image 3 */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-8 right-[-35px] rotate-45 bg-emerald-400 text-emerald-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase z-10">
          EMPOWERING LIVES, BUILDING FUTURE
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Answers To Your <span className="text-emerald-400">Most Common Questions</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed">
            Everything you need to know about our chaplaincy mission, student activities, volunteer opportunities, and transparent donation processes.
          </p>
        </div>
      </section>

      {/* Section 1: General FAQs matching Image 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            GENERAL
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Frequently Asked Questions About Our Organization And Mission
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Image Card matching Image 3 */}
          <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md p-6 space-y-6">
            <div className="relative h-72 rounded-2xl overflow-hidden bg-emerald-900">
              <img
                src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800"
                alt="Chaplaincy Community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">ST. PETER'S CHAPLAINCY</span>
                  <h3 className="text-lg font-extrabold">Faith, Excellence & Service</h3>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 block font-bold text-sm">Need Personalized Guidance?</strong>
                  Our chaplaincy welfare secretaries are ready to answer any questions regarding student registration or sacraments.
                </div>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                Contact Chaplaincy Team
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column Accordion List matching Image 3 */}
          <div className="lg:col-span-7 space-y-4">
            {generalFaqs.map((faq) => {
              const isOpen = openGeneralId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <button
                    onClick={() => toggleGeneral(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-stone-900 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diagonal Blue Ribbon Callout Banner matching Image 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-sky-900 via-indigo-900 to-emerald-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          <div className="absolute top-6 right-[-35px] rotate-45 bg-sky-400 text-sky-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase">
            PASSION DRIVES EVERY ACTION
          </div>

          <div className="max-w-2xl space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Have Questions? We're Here To Help!
            </h2>
            <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
              Reach out to our official secretariat directly at <strong className="text-sky-300">info@kindness.com</strong> or visit our chaplaincy office during working hours.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-sky-400 hover:bg-sky-300 text-sky-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Send Us A Message
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:info@kindness.com"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                info@kindness.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Donate FAQs matching Image 3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            DONATE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Frequently Asked Questions About Donations And How Your Support Makes An Impact
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column Image Card matching Image 3 */}
          <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md p-6 space-y-6">
            <div className="relative h-72 rounded-2xl overflow-hidden bg-emerald-900">
              <img
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&q=80&w=800"
                alt="Donation & Impact"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">DONATION TRANSPARENCY</span>
                  <h3 className="text-lg font-extrabold">Every Donation Blessed & Accounted</h3>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <CreditCard className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 block font-bold text-sm">Secure & Tax-Deductible</strong>
                  All online financial transactions are encrypted with 256-bit SSL security.
                </div>
              </div>

              <button
                onClick={() => onNavigate('donations')}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                Make A Donation Now
              </button>
            </div>
          </div>

          {/* Right Column Accordion List matching Image 3 */}
          <div className="lg:col-span-7 space-y-4">
            {donateFaqs.map((faq) => {
              const isOpen = openDonateId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'bg-white border-emerald-500 shadow-md' : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <button
                    onClick={() => toggleDonate(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-stone-900 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
