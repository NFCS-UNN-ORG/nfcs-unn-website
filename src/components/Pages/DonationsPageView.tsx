import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  Users,
  GraduationCap,
  Building2,
  Lock,
  FileText,
  Copy,
  Check,
  X,
  Send,
  HelpCircle,
  Quote,
  Eye,
  Info
} from 'lucide-react';
import { NfcsLogo } from '../NfcsLogo';
import { NewsletterBanner } from '../NewsletterBanner';
import { CHAPLAINCY_PROJECTS } from '../../data/nfcsData';

export const DonationsPageView: React.FC = () => {
  // Donation Form States
  const [donationFrequency, setDonatedFrequency] = useState<'monthly' | 'onetime'>('onetime');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(10000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<string>("St. Peter's Chaplaincy Solar & Power Project");

  // Receipt Modal State
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);

  // Success Story Modal State
  const [activeStoryModal, setActiveStoryModal] = useState<{
    title: string;
    tag: string;
    person: string;
    quote: string;
    fullStory: string;
    image: string;
  } | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Modal
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [contactMessageSent, setContactMessageSent] = useState<boolean>(false);

  // Amount presets in Naira
  const presets = [5000, 10000, 25000, 50000];

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const getFinalAmount = () => {
    if (selectedPreset !== null) return selectedPreset;
    const parsed = parseInt(customAmount, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReceiptModal(true);
  };

  const handleCopyBank = () => {
    navigator.clipboard.writeText('1012345678');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const faqs = [
    {
      q: 'How Can I Donate?',
      a: 'You can contribute via direct electronic bank transfer to St. Peter’s Chaplaincy Zenith Bank account, via our online pledge form, or in person at the NFCS Secretariat / Chaplaincy Office on UNN campus.',
    },
    {
      q: 'Is My Donation Recognized & Transparently Accounted For?',
      a: 'Yes! Every contribution receives an official NFCS UNN digital receipt and chaplaincy acknowledgment. Financial stewardship reports are presented during annual NFCS general congress meetings.',
    },
    {
      q: 'Can I Set Up Recurring Monthly Dues or Tithes?',
      a: 'Absolutely. By selecting "Monthly Donation" in the form above, you can commit to a recurring monthly contribution for indigent student welfare, choir equipment, or chaplaincy maintenance.',
    },
    {
      q: 'How Is My Donation Used?',
      a: '100% of donations go directly to your chosen campaign — whether that is paying semester tuition for stranded indigent Catholic undergraduates, financing solar power for study halls, or funding rural health outreaches.',
    },
    {
      q: 'Can I Donate To Specific Campaigns Or Pious Societies?',
      a: 'Yes, you can choose any specific Chaplaincy Project or Pious Wing (e.g. St. Vincent de Paul, STPEC Choir, First Year Forum Tutorials) in the contribution form dropdown.',
    },
    {
      q: 'Will I Get A Receipt For My Donation?',
      a: 'Yes! Upon submitting your pledge or completing a bank transfer, an official digital receipt with an authorization reference is generated immediately.',
    },
    {
      q: 'How Do I Track The Impact Of My Donation?',
      a: 'We send quarterly email impact updates, photos of completed projects (such as solar inverter installation & textbook distributions), and testimonials from scholarship recipients.',
    },
  ];

  const stories = [
    {
      title: '“Education Opened Doors I Never Imagined”',
      tag: 'Education & Welfare',
      person: 'Bro. Chidiebere N., 400L Electronic Engineering',
      quote: 'Before receiving the NFCS Indigent Student Scholarship, I was facing withdrawal due to unpaid tuition. Today, I am on track to graduate with First Class Honors.',
      fullStory: 'Chidiebere lost his primary sponsor during his second year at UNN. Facing severe hardship and impending academic deferment, he applied for the NFCS Welfare Relief Fund. Thanks to generous donors, his tuition and hostel fees were completely covered. He now serves as a student tutorial volunteer giving back to freshers.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: '“Uninterrupted Daily Mass & Midnight Study Hall”',
      tag: 'Chaplaincy Solar Project',
      person: 'Sis. Blessing K., 500L Medicine & Surgery',
      quote: 'The 15kVA solar installation at St. Peter’s Chaplaincy allowed us to study under bright lights during campus blackouts and attend morning Eucharistic Adoration quietly.',
      fullStory: 'Campus power outages previously disrupted evening study halls and early morning liturgical services. Through donor contributions toward the Chaplaincy Solar & Power Project, the main chapel and study annex now enjoy 24/7 reliable solar electricity, benefiting over 2,000 students daily.',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: '“Free Academic Past Questions Saved My 100L Year”',
      tag: 'Academic Support',
      person: 'Bro. Emmanuel O., 200L Pharmacy',
      quote: 'Getting free tutorial booklets and past questions from NFCS First Year Forum gave me the confidence and materials I needed to excel in GST & Science courses.',
      fullStory: 'Many incoming 100L freshers struggle with textbook costs and navigating UNN examination patterns. The NFCS Academic Support Initiative printed and distributed over 1,500 past question compilations completely free of charge to Catholic undergraduates in 2025.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const testimonials = [
    {
      name: 'Rachel S.',
      role: 'Alumna & Monthly Sponsor',
      quote: 'I’ve supported many causes, but NFCS UNN stands out for its absolute transparency. Seeing my monthly contribution cover tuition for stranded undergraduates is deeply fulfilling.',
    },
    {
      name: 'Dr. Chidi O.',
      role: 'NFCS Patron & Senior Lecturer',
      quote: 'I’m proud to support such a dedicated student organization. Their work in education, spiritual formation, and healthcare outreach has transformed thousands of young lives across UNN.',
    },
    {
      name: 'Michael B.',
      role: 'STPEC Choir Alumnus',
      quote: 'Working with NFCS during my undergraduate days was an eye-opening experience. Their commitment to student welfare and worship gives me total confidence in my ongoing support.',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ================= 1. HERO + DONATION FORM WIDGET (MATCHING WIREFRAME) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Subheading */}
          <div className="lg:col-span-6 space-y-6 pt-2">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Donate & Support</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.12]">
              Your Donation Can Change Lives Today
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Support our mission to provide education scholarships, chaplaincy infrastructure, healthcare relief, and spiritual development for Catholic undergraduates at University of Nigeria, Nsukka. Every contribution brings hope and makes a real difference.
            </p>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-sm">100% Transparent Financial Stewardship</h4>
                  <p className="text-xs text-stone-500">Official Zenith Bank account supervised by St. Peter’s Chaplaincy Fathers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Donation Form Box (Matching wireframe layout) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
              
              {/* Frequency Toggle Tabs */}
              <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-2xl border border-stone-200">
                <button
                  type="button"
                  onClick={() => setDonatedFrequency('monthly')}
                  className={`py-2.5 px-4 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    donationFrequency === 'monthly'
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200/80'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Monthly Donation
                </button>
                <button
                  type="button"
                  onClick={() => setDonatedFrequency('onetime')}
                  className={`py-2.5 px-4 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    donationFrequency === 'onetime'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  One Time Donation
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleDonationSubmit} className="space-y-4">
                
                {/* Choose Your Contribution Amount */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold text-stone-900 uppercase tracking-wider">
                    Choose Your Contribution Amount
                  </label>

                  {/* Preset Buttons Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {presets.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handlePresetSelect(amt)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                          selectedPreset === amt
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                        }`}
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Desired Amount Input */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-black text-stone-400">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="Enter Your Desired Amount (e.g. 15000)"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-hidden bg-stone-50/50"
                    />
                  </div>

                  <p className="text-[11px] text-stone-500 italic">
                    By donating ₦{getFinalAmount().toLocaleString()} {donationFrequency === 'monthly' ? 'monthly' : 'today'}, you help empower our UNN Catholic community.
                  </p>
                </div>

                {/* Target Campaign Dropdown */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">Select Project / Cause</label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-800 focus:ring-2 focus:ring-emerald-700 outline-hidden bg-white"
                  >
                    {CHAPLAINCY_PROJECTS.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                    <option value="General Student Welfare & Indigent Fund">General Student Welfare & Indigent Fund</option>
                    <option value="St. Peter's Chaplaincy Altar & Liturgical Maintenance">St. Peter's Chaplaincy Altar & Liturgical Maintenance</option>
                  </select>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    placeholder="e.g. Bro. Anthony Okeke"
                    value={isAnonymous ? 'Anonymous Benefactor' : fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-hidden disabled:bg-stone-100 disabled:text-stone-400"
                  />
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="anonymousCheck"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded-md border-stone-300 focus:ring-emerald-700 cursor-pointer"
                  />
                  <label htmlFor="anonymousCheck" className="text-xs text-stone-600 font-medium cursor-pointer">
                    Hide Your Name (Anonymous Donation)
                  </label>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. anthony@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-hidden"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-emerald-700 outline-hidden"
                  />
                </div>

                {/* Donate Now Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <span>Donate Now!</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* ================= 2. WHY US / TRANSPARENCY SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-xs">
          
          {/* Left Text & 3 Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Why Us
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
                Your Donation Goes Further To Create Meaningful And Lasting Change In Our Chaplaincy
              </h2>
            </div>

            <div className="space-y-5 pt-2">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Transparent Allocation</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed pl-6">
                  We ensure every naira is used effectively, providing clear financial updates and audit reports on how your donations make a direct impact.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Community-Driven Solutions</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed pl-6">
                  We work closely with St. Peter’s Chaplaincy Fathers and student executive leaders to create sustainable programs tailored to UNN student needs.
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Proven Results</span>
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed pl-6">
                  With decades of student ministry excellence at UNN, we have positively impacted thousands of Catholic Lions & Lionesses across Nigeria and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Placeholder Showcase */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000"
                alt="Students Fellowship Impact"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">St. Peter's Chaplaincy UNN</p>
                  <p className="text-sm font-extrabold">Uplifting Catholic Students in Character & Faith</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 3. SUCCESS STORIES / STORIES OF LIVES TRANSFORMED ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Success Story
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Stories Of Lives Transformed Through Our Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {stories.map((story, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-emerald-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-stone-200">
                      • {story.tag}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-extrabold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800">{story.person}</p>
                    <p className="text-xs text-stone-600 leading-relaxed italic">
                      "{story.quote}"
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => setActiveStoryModal(story)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 text-xs font-extrabold py-2.5 px-3 rounded-xl border border-stone-300 transition-all cursor-pointer"
                  >
                    <span>View Report</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="#donation-form"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex-1 inline-flex items-center justify-center gap-1 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold py-2.5 px-3 rounded-xl border border-stone-300 transition-all cursor-pointer"
                  >
                    <span>Donate Program</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 4. STEP BY STEP HOW TO MAKE A DIFFERENCE ================= */}
        <div className="bg-stone-100/80 rounded-3xl p-8 sm:p-14 border border-stone-200/90 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Step By Step
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              How To Make A Difference Easily
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 01 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs text-center space-y-3 relative group hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-900 font-black text-xl flex items-center justify-center mx-auto group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Choose A Cause</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Select the campaign or student welfare fund you want to support (Tuition relief, solar power, or choir equipment).
              </p>
            </div>

            {/* Step 02 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs text-center space-y-3 relative group hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-900 font-black text-xl flex items-center justify-center mx-auto group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                02
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Make A Contribution</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Enter your details and contribution amount via direct bank transfer or our secure online pledge form.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs text-center space-y-3 relative group hover:border-emerald-300 transition-colors">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-900 font-black text-xl flex items-center justify-center mx-auto group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                03
              </div>
              <h3 className="text-base font-extrabold text-stone-900">Change Lives Today</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Receive instant receipt confirmation, chaplaincy blessings, and follow quarterly impact reports.
              </p>
            </div>

          </div>
        </div>

        {/* ================= 5. TESTIMONIALS / HEAR FROM OUR SUPPORTERS ================= */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Hear From Our Supporters: Together, We Make A Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-emerald-700 opacity-60" />
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-extrabold text-stone-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-emerald-800 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 6. FAQ ACCORDION ================= */}
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Answers To Common Donation Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-stone-900 text-sm sm:text-base cursor-pointer hover:bg-stone-50/80"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 7. GET IN TOUCH WITH US CARD (MATCHING WIREFRAME BOTTOM BANNER) ================= */}
        <div className="relative bg-stone-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full inline-block">
              Pre Heading Here
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Get In Touch With Us To Make A Difference
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              We’d love to hear from you! Whether you have questions about how your donation is used, want to volunteer, or wish to join our movement with us.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              onClick={() => setShowContactModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Newsletter Banner */}
        <NewsletterBanner />

      </div>

      {/* ================= RECEIPT & BANK DETAILS MODAL ================= */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowReceiptModal(false)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-stone-900">Contribution Receipt & Bank Transfer</h3>
              <p className="text-xs text-stone-500">
                Thank you, <span className="font-bold text-stone-900">{isAnonymous ? 'Anonymous Donor' : (fullName || 'Valued Supporter')}</span>!
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Selected Cause:</span>
                <span className="font-extrabold text-stone-900 text-right">{selectedCause}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Contribution Amount:</span>
                <span className="font-black text-emerald-800 text-sm">₦{getFinalAmount().toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Frequency:</span>
                <span className="font-bold uppercase text-stone-700">{donationFrequency}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-500">Receipt Ref:</span>
                <span className="font-mono text-stone-600">NFCS-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            {/* Official Bank Account Box */}
            <div className="bg-emerald-950 text-white p-5 rounded-2xl space-y-3 border border-emerald-900">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span>Official Bank Transfer Account:</span>
                <span className="bg-emerald-800 text-[10px] px-2 py-0.5 rounded-md">Verified</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <p className="flex justify-between"><span className="text-emerald-400">Bank:</span> <span>Zenith Bank Plc</span></p>
                <p className="flex justify-between"><span className="text-emerald-400">Account Name:</span> <span className="text-right">NFCS UNN Chapter Projects</span></p>
                <div className="flex items-center justify-between pt-1 border-t border-emerald-900">
                  <span className="text-emerald-400 font-sans">Account No:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm tracking-wider text-emerald-200">1012345678</span>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="p-1 bg-emerald-800 hover:bg-emerald-700 rounded text-xs font-sans inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 text-center italic">
              After transferring, please keep your payment confirmation. A confirmation copy has also been logged for instant chaplaincy receipt verification.
            </p>

            <button
              onClick={() => setShowReceiptModal(false)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Done / Close Receipt
            </button>
          </div>
        </div>
      )}

      {/* ================= STORY DETAILS MODAL ================= */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                {activeStoryModal.tag}
              </span>
              <h3 className="text-xl font-extrabold text-stone-900">{activeStoryModal.title}</h3>
              <p className="text-xs font-bold text-emerald-800">{activeStoryModal.person}</p>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-stone-100">
              <img src={activeStoryModal.image} alt={activeStoryModal.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {activeStoryModal.fullStory}
            </p>

            <button
              onClick={() => {
                setActiveStoryModal(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Donate To Support Students Like This
            </button>
          </div>
        </div>
      )}

      {/* ================= CONTACT MODAL ================= */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => {
                setShowContactModal(false);
                setContactMessageSent(false);
              }}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {contactMessageSent ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-900">Message Sent Successfully!</h3>
                <p className="text-xs text-stone-600">
                  Thank you for reaching out. An NFCS UNN chaplaincy representative will contact you shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-xl font-extrabold text-stone-900">Get In Touch With Us</h3>
                  <p className="text-xs text-stone-500">
                    Questions about donations, partnership, or student welfare inquiries.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactMessageSent(true);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ngozi Eze"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="ngozi@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Message / Inquiry</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="How can we assist you?"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
