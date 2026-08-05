import React, { useState } from 'react';
import { PageTab } from '../../types';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';
import { ContactForm } from '../contact/ContactForm';

interface ContactPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const ContactPageView: React.FC<ContactPageViewProps> = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const branches = [
    {
      id: 'b-1',
      title: 'Nsukka Main Campus Chaplaincy',
      subtitle: 'St. Peter’s Catholic Chaplaincy',
      address: 'University of Nigeria, Nsukka Campus, Enugu State 410001, Nigeria',
      phone: '+234 803 123 4567',
      email: 'chaplaincy@unn.edu.ng',
      hours: 'Mon - Sun: 7:00 AM - 8:00 PM',
    },
    {
      id: 'b-2',
      title: 'Lagos Alumni Liaison Branch',
      subtitle: 'NFCS Alumni Secretariat',
      address: 'Victoria Island, Lagos State, Nigeria',
      phone: '+234 802 987 6543',
      email: 'lagos.alumni@nfcsunn.org',
      hours: 'Mon - Fri: 9:00 AM - 5:00 PM',
    },
    {
      id: 'b-3',
      title: 'Abuja Alumni Liaison Branch',
      subtitle: 'NFCS Federal Capital Liaison',
      address: 'Maitama District, Abuja FCT, Nigeria',
      phone: '+234 809 555 4321',
      email: 'abuja.alumni@nfcsunn.org',
      hours: 'Mon - Fri: 9:00 AM - 5:00 PM',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="bg-stone-50 dark:bg-[#080A26] min-h-screen py-8 sm:py-14 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Contact Us
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            Get In Touch With St. Peter's Chaplaincy & NFCS UNN
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-slate-300 leading-relaxed">
            We are here to serve you. Reach out for Mass intentions, spiritual guidance, alumni networking, or project sponsorship.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-[#0C0F38] border border-stone-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-md"
            >
              <h3 className="font-extrabold text-stone-900 dark:text-white text-base">{b.title}</h3>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{b.subtitle}</p>

              <div className="space-y-2 text-xs text-stone-600 dark:text-slate-300 pt-2 border-t border-stone-100 dark:border-slate-800">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{b.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>{b.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{b.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto">
          <ContactForm
            formData={formData}
            setFormData={setFormData}
            submitted={submitted}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <NewsletterBanner />
    </div>
  );
};
