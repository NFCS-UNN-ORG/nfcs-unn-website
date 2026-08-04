import React, { useState } from 'react';
import { CHAPLAINCY_PROJECTS, UPCOMING_EVENTS, SITE_INFO } from '../../data/nfcsData';
import { ProjectItem } from '../../types';
import {
  Sparkles,
  Heart,
  GraduationCap,
  ShieldCheck,
  Building2,
  BookOpen,
  Users,
  Calendar,
  ArrowUpRight,
  Play,
  X,
  CheckCircle2,
  DollarSign,
  Gift,
  Search,
  Award,
  Zap,
  Check,
  Church,
  Cross,
  Clock,
  MapPin,
  Send,
  HelpCircle,
  Video,
} from 'lucide-react';
import { NfcsLogo } from '../NfcsLogo';
import { NewsletterBanner } from '../NewsletterBanner';

export const InitiativesPageView: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState('');
  const [donorPhone, setDonorPhone] = useState('');

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Infrastructure', 'Student Welfare', 'Academic Support', 'Liturgy & Music', 'Community Charity'];

  const filteredProjects = activeCategoryFilter === 'All'
    ? CHAPLAINCY_PROJECTS
    : CHAPLAINCY_PROJECTS.filter(p => p.category === activeCategoryFilter);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setSelectedProject(null);
      setDonorName('');
      setDonorAmount('');
      setDonorPhone('');
    }, 2800);
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ================= 1. TOP HEADER BANNER ================= */}
        <div className="relative bg-gradient-to-b from-stone-100 to-white rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-xs overflow-hidden">
          {/* Top Slanted Banner Ribbon */}
          <div className="absolute -top-3 -right-12 sm:right-10 bg-emerald-700 text-white font-black text-[10px] sm:text-xs uppercase tracking-widest px-12 py-2.5 rotate-6 shadow-md z-10 border-b-2 border-emerald-900 pointer-events-none">
            EMPOWERING LIVES • BUILDING FUTURE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-0">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>NFCS UNN Projects & Student Initiatives</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
                Join Our Projects & Student Welfare Initiatives For A Brighter Future
              </h1>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Join our student-led initiatives to drive meaningful spiritual growth, support indigent undergraduates with tuition grants, upgrade St. Peter's Chaplaincy facilities, and build a brighter future for Catholic Lions & Lionesses at UNN.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#projects-grid"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
                >
                  <Heart className="w-4 h-4 fill-emerald-300 stroke-none" />
                  <span>Support A Project</span>
                </a>
                <button
                  onClick={() => setVolunteerModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-stone-300 transition-all"
                >
                  <Users className="w-4 h-4 text-emerald-800" />
                  <span>Volunteer In A Ministry</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xl text-center space-y-3 max-w-sm w-full">
                <div className="flex justify-center">
                  <NfcsLogo size={100} />
                </div>
                <h3 className="font-extrabold text-stone-900 text-sm">St. Peter's Chaplaincy Projects</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Transparency & accountability in service of God and fellow Catholic undergraduates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. IMPACT STATS GRID (8 CARDS) ================= */}
        <div className="space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Our Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Real Impact Through Collective Faith & Action
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              We have created meaningful spiritual & welfare impact across UNN faculties, supporting students through academic and charitable initiatives.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">5,000+</h3>
              <p className="text-xs font-bold text-emerald-800">Lives Impacted</p>
              <p className="text-[11px] text-stone-500">Catholic Lions & Lionesses at UNN</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">₦12M+</h3>
              <p className="text-xs font-bold text-emerald-800">Welfare & Tuition Grants</p>
              <p className="text-[11px] text-stone-500">Disbursed to indigent students</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">1,500+</h3>
              <p className="text-xs font-bold text-emerald-800">Free Past Questions</p>
              <p className="text-[11px] text-stone-500">Academic tutorial material packs</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">50+</h3>
              <p className="text-xs font-bold text-emerald-800">Annual Sacramental Masses</p>
              <p className="text-[11px] text-stone-500">Sunday & weekday liturgies</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">15+</h3>
              <p className="text-xs font-bold text-emerald-800">Faculty Sub-Chapters</p>
              <p className="text-[11px] text-stone-500">Active across UNN faculties</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">2,500+</h3>
              <p className="text-xs font-bold text-emerald-800">Hymnbooks & Bibles</p>
              <p className="text-[11px] text-stone-500">Distributed to undergraduates</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">100+</h3>
              <p className="text-xs font-bold text-emerald-800">Indigent Students Assisted</p>
              <p className="text-[11px] text-stone-500">Hostel accommodation relief</p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-1 hover:border-emerald-300 transition-colors">
              <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">300+</h3>
              <p className="text-xs font-bold text-emerald-800">Active Student Officers</p>
              <p className="text-[11px] text-stone-500">Pious society & exco leaders</p>
            </div>
          </div>
        </div>

        {/* ================= 3. CORE FOCUS AREAS (8 PILLAR BOXES) ================= */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Core Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Our Key Areas Of Ministry & Service
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Academic Tutorials</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Free tutorial packs, past questions, and departmental peer mentoring for 100L-500L.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Student Welfare & Aid</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Emergency tuition assistance, food packs, and accommodation relief for needy students.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Chaplaincy Power & Solar</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                15kVA solar inverter installation for study halls & daily Mass power.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Fresher Orientation</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Welcoming, lodging guidance, and spiritual orientation for 1,000+ new Catholic freshers.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <Church className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Liturgical Choir & Music</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Upgrading sound console, mics, and instruments for STPEC Liturgical Choir.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Community Medical Outreach</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Free health checkups, eye tests, and malaria treatment in Nsukka rural communities.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <Cross className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Pious & Marian Wings</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Empowering Legion of Mary, Charismatic Renewal, and St. Vincent de Paul.
              </p>
            </div>

            <div className="bg-stone-100/90 hover:bg-white p-5 rounded-2xl border border-stone-200/90 transition-all space-y-2 text-center group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto font-bold group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">Alumni Network</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Connecting graduating final year students with Catholic alumni for NYSC & career growth.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. ACTIVE PROJECTS GRID WITH PROGRESS BARS ================= */}
        <div id="projects-grid" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Our Chaplaincy Projects
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Support Active NFCS UNN Welfare Campaigns
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategoryFilter === cat
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 6 Projects Cards Grid (Matches KindnessKit campaign cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-emerald-900 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-stone-200">
                      • {project.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-extrabold text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Progress Bar & Numbers */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-stone-500">Goal Progress</span>
                        <span className="text-emerald-800">{project.progressPercent}%</span>
                      </div>

                      {/* Progress Bar Track */}
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                        <div
                          className="h-full bg-emerald-700 rounded-full transition-all duration-1000"
                          style={{ width: `${project.progressPercent}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div>
                          <span className="text-[10px] text-stone-400 block font-medium">Raised:</span>
                          <span className="font-black text-stone-900">₦{(project.raisedAmount / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-stone-400 block font-medium">Target:</span>
                          <span className="font-extrabold text-stone-600">₦{(project.goalAmount / 1000000).toFixed(2)}M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Support This Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 5. UPCOMING CHARITY & CHAPLAINCY EVENTS ROW ================= */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                Our Events
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                Join Our Upcoming Chaplaincy & NFCS Events
              </h2>
            </div>
            <a
              href="#spiritual"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200"
            >
              <span>See All Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4 Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {UPCOMING_EVENTS.map((evt) => (
              <div
                key={evt.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                <div className="space-y-2 max-w-md">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900">{evt.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{evt.description}</p>
                  <p className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{evt.venue}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    alert(`RSVP confirmed for "${evt.title}". See you at ${evt.venue}!`);
                  }}
                  className="shrink-0 bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 font-bold text-xs px-4 py-2 rounded-xl border border-stone-300 transition-all cursor-pointer"
                >
                  RSVP / Attend
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 6. INTERACTIVE VIDEO & DOCUMENTARY SPOTLIGHT ================= */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white border border-stone-800 shadow-2xl p-8 sm:p-14 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full inline-block">
              Our Activity & Life
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              See How We're Making An Impact On UNN Campus
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm">
              Watch our short documentary showcasing daily Student Mass at St. Peter's, academic tutorial wings, choir devotions, and rural community medical outreaches.
            </p>
          </div>

          {/* Interactive Play Button Preview Box */}
          <div className="relative max-w-3xl mx-auto aspect-16/9 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group cursor-pointer"
               onClick={() => setIsVideoModalOpen(true)}>
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200"
              alt="NFCS UNN Impact Video Thumbnail"
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-500"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
              </div>
              <span className="bg-stone-950/80 text-white text-xs font-bold px-4 py-1.5 rounded-full border border-stone-700 backdrop-blur-xs">
                Click to play NFCS UNN Documentary (3:45)
              </span>
            </div>
          </div>
        </div>

        {/* ================= 7. 4-PHOTO GALLERY GRID ================= */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
              Campus Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Snapshots Of Faith, Fellowship & Service
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200 border border-stone-200 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&q=80&w=800"
                alt="Chaplaincy Mass Worship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-bold">Sunday Student Mass @ St. Peter's Chaplaincy</p>
              </div>
            </div>

            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200 border border-stone-200 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                alt="Academic Tutorial Sessions"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-bold">Free Academic Tutorial Wing Session</p>
              </div>
            </div>

            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200 border border-stone-200 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
                alt="STPEC Liturgical Choir"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-bold">STPEC Choir Sunday Praise & Worship</p>
              </div>
            </div>

            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200 border border-stone-200 shadow-md group">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
                alt="Community Rural Outreach"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
                <p className="text-white text-xs font-bold">Nsukka Rural Community Medical Outreach</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 8. VOLUNTEER CTA BANNER STRIP ================= */}
        <div className="relative bg-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] uppercase tracking-wider font-bold bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full inline-block">
              Join Our Ministry
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Become An NFCS Volunteer And Create Lasting Impact!
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Join the liturgical readers, altar servers, choir singers, welfare committee, or academic tutorial team to serve God on UNN campus.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              onClick={() => setVolunteerModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Join A Ministry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slanted Accent Ribbon */}
          <div className="absolute -bottom-4 right-10 bg-emerald-800/80 text-emerald-200 text-[10px] font-black uppercase tracking-widest px-10 py-1.5 rotate-3 border-t border-emerald-700 pointer-events-none">
            PASSION DRIVES EVERY ACTION
          </div>
        </div>

        {/* Newsletter Banner */}
        <NewsletterBanner />

      </div>

      {/* ================= PROJECT SUPPORT MODAL ================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            {pledgeSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-stone-900">Thank You For Supporting!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Your pledge/support for <span className="font-bold text-stone-900">{selectedProject.title}</span> has been received. May God abundantly bless your generosity!
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Support Project
                  </span>
                  <h3 className="text-xl font-extrabold text-stone-900 leading-snug">{selectedProject.title}</h3>
                  <p className="text-xs text-stone-500">Target: ₦{(selectedProject.goalAmount / 1000000).toFixed(2)}M • Currently {selectedProject.progressPercent}% Funded</p>
                </div>

                {/* Account Details Box */}
                <div className="bg-emerald-900 text-emerald-50 p-4 rounded-2xl space-y-2 text-xs border border-emerald-800">
                  <div className="flex items-center justify-between font-bold text-emerald-200">
                    <span>Direct Bank Transfer Details:</span>
                    <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-md">Official NFCS UNN Account</span>
                  </div>
                  <div className="space-y-1 font-mono text-xs pt-1">
                    <p><span className="text-emerald-300">Bank Name:</span> Zenith Bank Plc</p>
                    <p><span className="text-emerald-300">Account Name:</span> NFCS UNN Chapter Projects</p>
                    <p><span className="text-emerald-300">Account Number:</span> 1012345678</p>
                  </div>
                </div>

                {/* Pledge Form */}
                <form onSubmit={handleSupportSubmit} className="space-y-4 pt-1">
                  <p className="text-xs font-bold text-stone-800">Or submit a support pledge notification:</p>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bro. Emmanuel Okafor"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Pledge Amount (₦)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 5000"
                        value={donorAmount}
                        onChange={(e) => setDonorAmount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="0803 000 0000"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Submit Support Pledge
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= VIDEO MODAL ================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-stone-900 text-white rounded-3xl max-w-3xl w-full p-6 space-y-4 relative shadow-2xl border border-stone-800">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white">NFCS UNN Documentary Feature</h3>
              <p className="text-xs text-stone-400">St. Peter's Catholic Chaplaincy, UNN Nsukka</p>
            </div>
            
            <div className="aspect-16/9 bg-stone-950 rounded-2xl border border-stone-800 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <Video className="w-12 h-12 text-emerald-400 animate-pulse" />
              <p className="text-sm font-bold text-stone-200 max-w-md">
                Playing: "Living The Faith: The Story of Catholic Students at University of Nigeria, Nsukka"
              </p>
              <span className="text-xs text-stone-500">
                [Simulated HD Video Playback — St. Peter's Chaplaincy Choir, Mass & Student Tutorials]
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= VOLUNTEER MINISTRY MODAL ================= */}
      {volunteerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 relative shadow-2xl border border-stone-200">
            <button
              onClick={() => setVolunteerModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-stone-900">Volunteer In A Ministry</h3>
              <p className="text-xs text-stone-500">
                Serve God with your talents in STPEC Choir, Readers, Altar Servers, Welfare, or Academic Tutorials.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for volunteering! An executive or chaplaincy coordinator will contact you shortly.');
                setVolunteerModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sister Mary Nnamani"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Department & Level</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Biochemistry, 200L"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Ministry / Wing</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700 outline-hidden">
                  <option>STPEC Liturgical Choir</option>
                  <option>Liturgical Readers / Lectors</option>
                  <option>Altar Servers Association</option>
                  <option>Academic Tutorial Tutors Wing</option>
                  <option>Student Welfare & Charity Wing</option>
                  <option>Ushering & Protocol Team</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Submit Volunteer Registration
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
