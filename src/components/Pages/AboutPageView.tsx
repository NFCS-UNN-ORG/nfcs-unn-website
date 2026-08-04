import React from 'react';
import { SITE_INFO, EXCO_MEMBERS } from '../../data/nfcsData';
import {
  Church,
  ShieldCheck,
  Compass,
  Target,
  Users,
  Mail,
  Phone,
  BookOpen,
  Heart,
  Sparkles,
  ArrowUpRight,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';
import { NfcsLogo } from '../NfcsLogo';

export const AboutPageView: React.FC = () => {
  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ================= 1. HERO HEADER BANNER ================= */}
        <div className="relative bg-gradient-to-b from-stone-100 to-white rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-xs overflow-hidden">
          {/* Top Slanted Banner Ribbon */}
          <div className="absolute -top-3 -right-12 sm:right-10 bg-emerald-700 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest px-12 py-2.5 rotate-6 shadow-md z-10 border-b-2 border-emerald-900 pointer-events-none">
            Living The Faith • UNN Chapter
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-0">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>About NFCS UNN</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
                Together For A Better Tomorrow In Christ
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl">
                The Nigeria Federation of Catholic Students (NFCS), University of Nigeria, Nsukka Chapter is a vibrant community dedicated to fostering spiritual growth, academic distinction, and moral leadership across the UNN campus.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-stone-700">
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  <span className="text-emerald-800">Motto:</span>
                  <span>"{SITE_INFO.motto}"</span>
                </div>
                <div className="flex items-center gap-1.5 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  <span className="text-emerald-800">Slogan:</span>
                  <span>"{SITE_INFO.slogan}"</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative p-6 bg-white rounded-3xl border border-stone-200 shadow-xl text-center space-y-3 max-w-sm w-full">
                <div className="flex justify-center">
                  <NfcsLogo size={110} />
                </div>
                <h3 className="font-extrabold text-stone-900 text-base">St. Peter's Catholic Chaplaincy</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Headquartered at UNN Nsukka campus, guiding Catholic lions & lionesses since 1960.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. WHO WE ARE ================= */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
              Committed To Transforming Lives And Building Sustainable, Resilient Catholic Leaders Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Asymmetric Visual Image Cards Block with Slanted Label */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden bg-stone-200 border border-stone-200 aspect-4/5 shadow-md group">
                  <img
                    src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800"
                    alt="NFCS Community Gathering"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-bold">UNN Catholic Fellowship</p>
                  </div>
                </div>

                <div className="relative rounded-3xl overflow-hidden bg-stone-200 border border-stone-200 aspect-4/5 shadow-md group mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=800"
                    alt="Mass & Devotion"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-bold">St. Peter's Mass Devotion</p>
                  </div>
                </div>
              </div>

              {/* Diagonal Ribbon Badge over Image Cards */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-blue-900 text-white text-[11px] font-black uppercase tracking-widest px-6 py-2 -rotate-12 shadow-lg rounded-md border border-blue-700">
                FAITH DRIVES EXCELLENCE
              </div>
            </div>

            {/* Description Text Side */}
            <div className="lg:col-span-6 space-y-6 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                We are a mission-driven Catholic student organization dedicated to nurturing spiritual maturity, academic excellence, and character formation. With a focus on sacramental devotions, peer support, and campus evangelization, we collaborate with students, chaplains, and alumni to create meaningful impact.
              </p>
              <p>
                Our work is rooted in compassion, academic discipline, and a relentless drive to uplift and inspire those in need, fostering brighter futures for all UNN undergraduates and postgraduates.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <h4 className="text-2xl font-black text-emerald-800">5,000+</h4>
                  <p className="text-xs text-stone-500 font-medium">Active Catholic Students</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
                  <h4 className="text-2xl font-black text-emerald-800">15+</h4>
                  <p className="text-xs text-stone-500 font-medium">Faculty Sub-Chapters</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. OUR VISION SECTION (Soft Blue Block) ================= */}
        <div className="bg-sky-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider bg-sky-800 text-sky-200 px-3.5 py-1 rounded-full inline-block">
                Our Vision
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Creating A Sustainable World Where Every Student Can Flourish With Faith, Opportunity, And Hope
              </h2>
              <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
                To build a saintly, intellectually vibrant Catholic student body at the University of Nigeria, Nsukka, who actively witness to the Gospel truth in their academic pursuits, professional careers, and societal callings.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-sky-950 border border-sky-700 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800"
                  alt="Student Fellowship Vision"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. OUR MISSION SECTION (Warm Rose/Stone Block) ================= */}
        <div className="bg-rose-950/90 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-rose-900 border border-rose-800 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800"
                  alt="Our Mission in Action"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Mission Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-rose-900 text-rose-200 px-3.5 py-1 rounded-full inline-block">
                  Our Mission
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  Empowering Communities To Overcome Challenges And Build A Brighter, More Equitable Future Together
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-rose-900/60 p-4 rounded-2xl border border-rose-800 space-y-2">
                  <span className="text-xs font-black text-rose-300">01</span>
                  <h4 className="font-bold text-white text-sm">Empower Communities</h4>
                  <p className="text-xs text-rose-100/80 leading-relaxed">
                    Building strong, resilient Catholic student sub-chapters through sustainable spiritual initiatives.
                  </p>
                </div>

                <div className="bg-rose-900/60 p-4 rounded-2xl border border-rose-800 space-y-2">
                  <span className="text-xs font-black text-rose-300">02</span>
                  <h4 className="font-bold text-white text-sm">Promote Education</h4>
                  <p className="text-xs text-rose-100/80 leading-relaxed">
                    Ensuring peer tutorial assistance, exam preparation, and academic mentorship for all members.
                  </p>
                </div>

                <div className="bg-rose-900/60 p-4 rounded-2xl border border-rose-800 space-y-2">
                  <span className="text-xs font-black text-rose-300">03</span>
                  <h4 className="font-bold text-white text-sm">Drive Lasting Impact</h4>
                  <p className="text-xs text-rose-100/80 leading-relaxed">
                    Creating lasting solutions to campus challenges through innovative welfare and charity projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 5. OUR HISTORY TIMELINE ================= */}
        <div className="space-y-10 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our History
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              A Legacy Of Empowerment And Transformative Faith
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Key milestones in the historical journey of NFCS UNN Chapter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                1956
              </span>
              <h3 className="font-extrabold text-stone-900 text-base">National Founding</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                NFCS was formally instituted as the national student wing of the Catholic Church in Nigeria under Pax Romana IMCS.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                1960
              </span>
              <h3 className="font-extrabold text-stone-900 text-base">UNN Chapter Inauguration</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Established alongside the opening of UNN Nsukka, pioneering Catholic fellowship on campus.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                1974
              </span>
              <h3 className="font-extrabold text-stone-900 text-base">St. Peter's Chaplaincy Built</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Construction of St. Peter's Catholic Chaplaincy, providing a permanent home for daily Mass & Eucharistic adoration.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                1998
              </span>
              <h3 className="font-extrabold text-stone-900 text-base">Faculty Chapter Expansions</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Expansion across Medical Sciences, Engineering, Arts, Law, and Social Sciences faculties with sub-executive councils.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                2018
              </span>
              <h3 className="font-extrabold text-stone-900 text-base">Digital & Student Aid</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Launch of student welfare funds, digital bulletin, and academic tutorial wings supporting thousands of undergraduates.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2 relative overflow-hidden">
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                Today
              </span>
              <h3 className="font-extrabold text-stone-900 text-base">Living The Faith</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Thousands of active members, vibrant choir, pious societies, and distinction alumni making impact across Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 6. OUR TEAM / EXECUTIVE COUNCIL ================= */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our Executive Leadership
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Committed Individuals Driving Impact And Change
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Student leaders serving NFCS UNN Chapter under St. Peter's Chaplaincy
            </p>
          </div>

          {/* 6 Executive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXCO_MEMBERS.map((exco) => (
              <div
                key={exco.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 hover:shadow-lg transition-all text-center flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Photo / Avatar Box */}
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                    <img
                      src={
                        exco.image ||
                        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600`
                      }
                      alt={exco.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-stone-200">
                      {exco.office}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-stone-900">{exco.name}</h3>
                    <p className="text-xs font-bold text-emerald-800 mt-0.5">{exco.office}</p>
                    <p className="text-xs text-stone-500 mt-1">{exco.department} • {exco.faculty}</p>
                  </div>
                </div>

                {/* Social & Contact Bar */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-center gap-3 text-stone-400">
                  {exco.phone && (
                    <a
                      href={`tel:${exco.phone}`}
                      className="p-2 rounded-full hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      title={exco.phone}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                  {exco.email && (
                    <a
                      href={`mailto:${exco.email}`}
                      className="p-2 rounded-full hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                      title={exco.email}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href="#"
                    className="p-2 rounded-full hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 7. JOIN OUR TEAM / BANNER STRIP ================= */}
        <div className="relative bg-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full inline-block">
              Join Our Family
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Be Part Of Our Team, Drive Positive Change!
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Connect with fellow Catholic undergraduates, join pious societies, choirs, and academic wings.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <a
              href="#portal"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <span>Join Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Slanted Accent Ribbon */}
          <div className="absolute -bottom-4 right-10 bg-emerald-800/80 text-emerald-200 text-[10px] font-black uppercase tracking-widest px-10 py-1.5 rotate-3 border-t border-emerald-700 pointer-events-none">
            EMPOWERING LIVES • BUILDING FUTURE
          </div>
        </div>

        {/* ================= 8. OUR VALUES SECTION ================= */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Our Values
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Core Values Driving Positive Change
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm max-w-md">
              We prioritize integrity, empowerment, collaboration, and spiritual devotion to create lasting impact and support the holistic growth of UNN students.
            </p>
          </div>

          {/* Two Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-16/9 rounded-3xl overflow-hidden bg-stone-200 border border-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
                alt="Values Fellowship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative aspect-16/9 rounded-3xl overflow-hidden bg-stone-200 border border-stone-200 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="Values Academic Distinction"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 4 Column Value Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-stone-900 text-base">Integrity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We uphold transparency, accountability, and Christian honesty in all our actions and leadership.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-stone-900 text-base">Academic Distinction</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We strive to excel in university examinations and research, honoring God with our intellect.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-stone-900 text-base">Brotherly Charity</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We work together with all stakeholders to amplify student welfare and achieve shared spiritual goals.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-stone-900 text-base">Sacramental Devotion</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We focus on frequent Eucharist, Rosary devotions, and confession to nurture deep personal sanctity.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 9. OUR PASTORAL COMMITMENT ================= */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Pastoral Commitment
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Empowering Students Through Sacramental Care & Guidance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-stone-600 text-sm leading-relaxed">
              <p>
                Our commitment is to empower students by promoting faith development, fostering collaboration, and driving spiritual renewal. We believe in addressing the root causes of moral ambiguity and working together with chaplains to create lasting impact.
              </p>
              <p>
                By prioritizing long-term spiritual and academic solutions, we aim to build resilient Catholic graduates who advance equality, truth, and moral leadership across Nigeria.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-stone-100 border border-stone-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800"
                  alt="Pastoral Care"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Banner */}
        <NewsletterBanner />

      </div>
    </div>
  );
};
