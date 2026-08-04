import React, { useState } from 'react';
import { PageTab } from '../../types';
import { Search, Download, FileText, Calendar, CheckCircle, ArrowRight, Quote, ChevronLeft, ChevronRight, Filter, Eye } from 'lucide-react';

interface ReportsPageViewProps {
  onNavigate: (tab: PageTab) => void;
}

interface ReportItem {
  id: string;
  title: string;
  date: string;
  category: string;
  fileSize: string;
  description: string;
  downloadsCount: number;
}

export const ReportsPageView: React.FC<ReportsPageViewProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [downloadModalReport, setDownloadModalReport] = useState<ReportItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const reportsList: ReportItem[] = [
    {
      id: 'rep-1',
      title: 'Annual Financial Overview',
      date: 'Saturday, Dec 15, 2024',
      category: 'Financial',
      fileSize: '4.2 MB PDF',
      description: 'Detailed analysis of financial status, chaplaincy transparency, student project allocations, and audited books for 2024.',
      downloadsCount: 1420,
    },
    {
      id: 'rep-2',
      title: 'Community Outreach Results',
      date: 'Tuesday, Feb 20, 2024',
      category: 'Outreach',
      fileSize: '3.8 MB PDF',
      description: 'Overview of impact of our programs in local Nsukka communities, rural medical missions, and hospital visitations.',
      downloadsCount: 980,
    },
    {
      id: 'rep-3',
      title: 'Health Campaigns Impact',
      date: 'Thursday, Mar 10, 2024',
      category: 'Health',
      fileSize: '5.1 MB PDF',
      description: 'Insights into the success of student health-related campaigns, blood donation drives, and mental health seminars.',
      downloadsCount: 1150,
    },
    {
      id: 'rep-4',
      title: 'Environmental Projects Review',
      date: 'Friday, Apr 5, 2024',
      category: 'Sustainability',
      fileSize: '2.9 MB PDF',
      description: 'Review of ongoing and completed campus environmental sustainability projects, solar installations, and campus cleanups.',
      downloadsCount: 840,
    },
    {
      id: 'rep-5',
      title: 'Fundraising Campaign Results',
      date: 'Sunday, May 12, 2024',
      category: 'Financial',
      fileSize: '3.5 MB PDF',
      description: 'Comprehensive report on fundraising efforts, alumni pledges, hostel renovation drives, and endowment achievements.',
      downloadsCount: 1670,
    },
    {
      id: 'rep-6',
      title: 'Volunteer & Youth Report',
      date: 'Monday, Jun 1, 2024',
      category: 'Volunteers',
      fileSize: '4.0 MB PDF',
      description: 'Evaluating involvement and contributions of over 500 NFCS student volunteers across 15 pious societies and faculties.',
      downloadsCount: 790,
    },
    {
      id: 'rep-7',
      title: 'Empowerment Success',
      date: 'Wednesday, Jul 15, 2024',
      category: 'Empowerment',
      fileSize: '6.3 MB PDF',
      description: 'Impact report on how vocational skill acquisition programs empowered youth in underserved areas around Nsukka.',
      downloadsCount: 1310,
    },
    {
      id: 'rep-8',
      title: 'Women & Family Life Campaigns',
      date: 'Saturday, Aug 10, 2024',
      category: 'Outreach',
      fileSize: '3.2 MB PDF',
      description: 'Look into efforts advocating for young women, Catholic female student mentorship, family values, and skill workshops.',
      downloadsCount: 920,
    },
    {
      id: 'rep-9',
      title: 'Emergency Response & Relief',
      date: 'Thursday, Sep 5, 2024',
      category: 'Relief',
      fileSize: '4.8 MB PDF',
      description: 'Overview of disaster relief efforts, emergency welfare assistance to needy students, and food bank distribution outcomes.',
      downloadsCount: 1080,
    },
  ];

  const categories = ['All', 'Financial', 'Outreach', 'Health', 'Sustainability', 'Volunteers', 'Empowerment'];

  const testimonials = [
    {
      quote: "The financial transparency of NFCS UNN is exemplary. Every report provides clear breakdowns of how donations directly empower student welfare and chapel maintenance.",
      author: "Chief Engr. Emmanuel Okafor",
      role: "Class of 1994 • Patron, NFCS Alumni Association",
    },
    {
      quote: "Reading the Community Outreach Report inspired our alumni chapter to fund 10 full tuition scholarships for indigent students this session.",
      author: "Dr. Mrs. Chinyere Ezeugwu",
      role: "Lecturer & Alumni Coordinator",
    },
    {
      quote: "Our health campaign report proved that simple blood pressure checks and health education saved lives in rural Nsukka villages.",
      author: "Dr. Paschal Nnamani",
      role: "Medical Outreach Lead • NFCS Executives",
    },
  ];

  const filteredReports = reportsList.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || report.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadClick = (report: ReportItem) => {
    setDownloadModalReport(report);
    setDownloadSuccess(false);
  };

  const handleConfirmDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadModalReport(null);
      setDownloadSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* Hero Header Section matching Image 1 */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span>RESOURCES & PUBLICATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Access Our Latest Reports <br className="hidden sm:inline" />
            <span className="text-emerald-400">And Publications</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed">
            Transparent reporting on our spiritual, financial, and community welfare initiatives at St. Peter's Catholic Chaplaincy, UNN.
          </p>

          {/* Search Box matching Image 1 */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl border border-stone-200">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Find Annual Reports, Publications, And More..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2.5 text-stone-800 placeholder-stone-400 bg-transparent text-sm sm:text-base focus:outline-none"
              />
              <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reports Grid Section matching Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              REPORTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 mt-2">
              Explore Our Latest Reports And Publications
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 9 Report Cards Grid (Image 1 Layout) */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-md">
                      {report.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{report.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors mb-2">
                    {report.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed mb-6">
                    {report.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {report.fileSize}
                  </span>

                  <button
                    onClick={() => handleDownloadClick(report)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-white bg-emerald-50 hover:bg-emerald-700 border border-emerald-200 hover:border-emerald-700 px-4 py-2 rounded-xl transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
            <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800">No reports found</h3>
            <p className="text-sm text-stone-500 mt-1">Try searching with a different keyword or selecting another category.</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Diagonal Ribbon Banner matching Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-sky-900 via-indigo-900 to-emerald-950 p-8 sm:p-12 text-white overflow-hidden shadow-xl">
          {/* Slanted Ribbon Label */}
          <div className="absolute top-6 right-[-35px] rotate-45 bg-emerald-500 text-emerald-950 font-extrabold text-[10px] sm:text-xs py-1 px-10 shadow-md tracking-wider uppercase">
            EMPOWERING LIVES, BUILDING FUTURE
          </div>

          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-extrabold tracking-wider uppercase text-sky-300 bg-sky-900/60 px-3 py-1 rounded-full border border-sky-700/50">
              GET INVOLVED TODAY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Become A Volunteer And Create Lasting Change
            </h2>
            <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed">
              Join hundreds of Catholic students and alumni making a tangible difference through pious societies, academic tutoring, and community missions.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('get-involved')}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Join Us Today
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('donations')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-all"
              >
                Support A Cause
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Supporters Testimonials Carousel matching Image 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
                TESTIMONIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
                Hear From Our Supporters: Together, We Make A Difference
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="p-3 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="p-3 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200/80">
            <Quote className="w-10 h-10 text-emerald-200 mb-4" />
            <p className="text-base sm:text-lg text-stone-800 font-medium italic leading-relaxed mb-6">
              "{testimonials[currentTestimonialIndex].quote}"
            </p>
            <div>
              <h4 className="font-extrabold text-stone-900 text-base">
                {testimonials[currentTestimonialIndex].author}
              </h4>
              <p className="text-xs text-stone-500 font-medium">
                {testimonials[currentTestimonialIndex].role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {downloadModalReport && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            {!downloadSuccess ? (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  Download Document
                </h3>
                <p className="text-sm text-stone-600">
                  You are downloading <strong className="text-stone-900">{downloadModalReport.title}</strong> ({downloadModalReport.fileSize}).
                </p>
                <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-500 space-y-1 border border-stone-200">
                  <p>• Verified Official Chaplaincy Document</p>
                  <p>• Total Downloads: {downloadModalReport.downloadsCount + 1}</p>
                  <p>• Format: PDF Document</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setDownloadModalReport(null)}
                    className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDownload}
                    className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Confirm & Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-xl font-extrabold text-stone-900">Download Started!</h3>
                <p className="text-xs text-stone-500">
                  {downloadModalReport.title} is now downloading to your device.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
