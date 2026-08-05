import React, { useState } from 'react';
import { NewsletterBanner } from '../NewsletterBanner';
import { DonationHero } from '../donations/DonationHero';
import { DonationForm } from '../donations/DonationForm';
import { BankDetailsSection } from '../donations/BankDetailsSection';
import { DonationFAQ } from '../donations/DonationFAQ';

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
      a: "You can contribute via direct electronic bank transfer to St. Peter’s Chaplaincy Zenith Bank account, via our online pledge form, or in person at the NFCS Secretariat / Chaplaincy Office on UNN campus.",
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
      quote:
        'Before receiving the NFCS Indigent Student Scholarship, I was facing withdrawal due to unpaid tuition. Today, I am on track to graduate with First Class Honors.',
      fullStory:
        'Chidiebere lost his primary sponsor during his second year at UNN. Facing severe hardship and impending academic deferment, he applied for the NFCS Welfare Relief Fund. Thanks to generous donors, his tuition and hostel fees were completely covered. He now serves as a student tutorial volunteer giving back to freshers.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: '“Uninterrupted Daily Mass & Midnight Study Hall”',
      tag: 'Chaplaincy Solar Project',
      person: 'Sis. Blessing K., 500L Medicine & Surgery',
      quote:
        'The 15kVA solar installation at St. Peter’s Chaplaincy allowed us to study under bright lights during campus blackouts and attend morning Eucharistic Adoration quietly.',
      fullStory:
        'Campus power outages previously disrupted evening study halls and early morning liturgical services. Through donor contributions toward the Chaplaincy Solar & Power Project, the main chapel and study annex now enjoy 24/7 reliable solar electricity, benefiting over 2,000 students daily.',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: '“Free Academic Past Questions Saved My 100L Year”',
      tag: 'Academic Support',
      person: 'Bro. Emmanuel O., 200L Pharmacy',
      quote:
        'Getting free tutorial booklets and past questions from NFCS First Year Forum gave me the confidence and materials I needed to excel in GST & Science courses.',
      fullStory:
        'Many incoming 100L freshers struggle with textbook costs and navigating UNN examination patterns. The NFCS Academic Support Initiative printed and distributed over 1,500 past question compilations completely free of charge to Catholic undergraduates in 2025.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="py-12 bg-stone-50 dark:bg-[#080A26] min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <DonationHero />

        {/* Form & Bank Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <DonationForm
              donationFrequency={donationFrequency}
              setDonatedFrequency={setDonatedFrequency}
              selectedPreset={selectedPreset}
              handlePresetSelect={handlePresetSelect}
              customAmount={customAmount}
              handleCustomAmountChange={handleCustomAmountChange}
              selectedCause={selectedCause}
              setSelectedCause={setSelectedCause}
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
              getFinalAmount={getFinalAmount}
              handleDonationSubmit={handleDonationSubmit}
              presets={presets}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <BankDetailsSection
              copiedBank={copiedBank}
              handleCopyBank={handleCopyBank}
              showReceiptModal={showReceiptModal}
              setShowReceiptModal={setShowReceiptModal}
              fullName={fullName}
              isAnonymous={isAnonymous}
              email={email}
              selectedCause={selectedCause}
              getFinalAmount={getFinalAmount}
              donationFrequency={donationFrequency}
            />
          </div>
        </div>

        {/* Stories & FAQ Section */}
        <DonationFAQ
          faqs={faqs}
          openFaqIndex={openFaqIndex}
          setOpenFaqIndex={setOpenFaqIndex}
          stories={stories}
          activeStoryModal={activeStoryModal}
          setActiveStoryModal={setActiveStoryModal}
        />
      </div>

      <NewsletterBanner />
    </div>
  );
};
