import React, { useState } from 'react';
import { PageTab } from '../../types';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowRight, Compass, Building2, ShieldCheck } from 'lucide-react';

interface ContactPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

export const ContactPageView: React.FC<ContactPageViewProps> = ({ onNavigate }) => {
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
      mapUrl: 'https://maps.google.com/?q=University+of+Nigeria+Nsukka',
    },
    {
      id: 'b-2',
      title: 'Lagos Alumni Liaison Branch',
      subtitle: 'NFCS Alumni Secretariat',
      address: 'Victoria Island, Lagos State, Nigeria',
      phone: '+234 802 987 6543',
      email: 'lagos.alumni@nfcsunn.org',
      hours: 'Mon - Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://maps.google.com/?q=Victoria+Island+Lagos',
    },
    {
      id: 'b-3',
      title: 'Abuja Alumni Liaison Branch',
      subtitle: 'NFCS Federal Capital Liaison',
      address: 'Maitama District, Abuja FCT, Nigeria',
      phone: '+234 809 555 4321',
      email: 'abuja.alumni@nfcsunn.org',
      hours: 'Mon - Fri: 9:00 AM - 5:00 PM',
      mapUrl: 'https://maps.google.com/?q=Maitama+Abuja',
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
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Banner matching Image 5 */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-8 right-[-35px] rotate-45 bg-emerald-400 text-emerald-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase z-10">
          EMPOWERING LIVES, BUILDING FUTURE
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span>CONTACT US</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Get In Touch <span className="text-emerald-400">With Us Today</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed">
            We are here to serve you. Whether you have questions about Mass schedules, alumni membership, scholarships, or donations, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Section 1: Branches Cards matching Image 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            GET IN TOUCH
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
            Find Our Branches Near You
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {branch.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">{branch.subtitle}</p>
                </div>

                <div className="space-y-2.5 pt-2 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{branch.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 mt-6">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Find us on map ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Contact Form & Image Card matching Image 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Column matching Image 5 */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-md">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              CONTACT US
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 mb-6">
              We'd Love To Hear From You
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 rounded-2xl p-8 text-center space-y-3 border border-emerald-200">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-xl font-extrabold text-emerald-950">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you for contacting St. Peter’s Chaplaincy UNN. Our secretariat team will respond to your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bro. Emmanuel Okafor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. emmanuel@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +234 803 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Alumni Membership">Alumni Membership</option>
                    <option value="Student Welfare & Scholarship">Student Welfare & Scholarship</option>
                    <option value="Donations & Sponsorships">Donations & Sponsorships</option>
                    <option value="Sacramental Counseling">Sacramental Counseling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your detailed message or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message Now
                </button>
              </form>
            )}
          </div>

          {/* Right Image Column matching Image 5 */}
          <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md p-6 space-y-6">
            <div className="relative h-80 rounded-2xl overflow-hidden bg-emerald-900">
              <img
                src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800"
                alt="Chaplaincy Center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">VISIT OUR CHAPEL</span>
                  <h3 className="text-xl font-extrabold">St. Peter's Catholic Chaplaincy, UNN</h3>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <strong className="text-stone-900 block font-bold">Sacramental Services</strong>
                  Confessions, Infant Baptism, and Counseling are available daily after Holy Mass.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Preview matching Image 5 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-extrabold text-stone-900">Interactive Location Map</h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">UNN Main Campus, Nsukka</span>
          </div>

          <div className="relative h-80 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
            <iframe
              title="St Peters Chaplaincy UNN Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.439812681123!2d7.40243!3d6.86687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044e782d8c36ad5%3A0xb35a90bf03bf47ef!2sUniversity%20of%20Nigeria%2C%20Nsukka!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
