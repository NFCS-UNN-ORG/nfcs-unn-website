import { MassSchedule, ExcoMember, PiousSociety, FacultyAssociation, BlogPost, EventItem, Testimonial, ProjectItem } from '../types';

export const SITE_INFO = {
  name: 'NFCS UNN',
  fullName: 'Nigeria Federation of Catholic Students',
  chapter: 'University of Nigeria, Nsukka Chapter',
  chaplaincy: "St. Peter's Catholic Chaplaincy, UNN",
  motto: 'Living the Faith',
  slogan: 'Who Cares? NFCS Does!',
  foundedNational: 1956,
  chaplain: 'Rev. Fr. Dr. [Insert Chaplain Name]',
  assistantChaplain: 'Rev. Fr. [Insert Assistant Name]',
  address: "St. Peter's Catholic Chaplaincy, University of Nigeria, Nsukka, Enugu State, Nigeria",
  email: 'info@nfcsunn.org',
  phone: '+234 803 XXX XXXX',
  portalUrl: 'https://portal.nfcsunn.org',
};

export const MASS_SCHEDULES: MassSchedule[] = [
  {
    day: 'Sunday Masses',
    times: ['6:30 AM (1st Mass)', '8:30 AM (2nd Mass - Student Mass)', '10:30 AM (3rd Mass)', '5:00 PM (Evening Mass)'],
    type: 'Sunday Holy Mass',
    venue: "St. Peter's Chaplaincy Main Church",
  },
  {
    day: 'Weekdays (Mon - Sat)',
    times: ['6:00 AM (Morning Mass)', '12:15 PM (Midday Mass)', '5:30 PM (Evening Mass)'],
    type: 'Daily Mass',
    venue: "St. Peter's Chaplaincy Main Church / Blessed Sacrament Chapel",
  },
  {
    day: 'Sacrament of Reconciliation (Confession)',
    times: ['Saturdays: 5:00 PM - 6:30 PM', 'Thursdays after 5:30 PM Mass', 'On Request before any Mass'],
    type: 'Confession',
    venue: "St. Peter's Confessional Booths",
  },
  {
    day: 'Eucharistic Adoration & Benediction',
    times: ['Thursdays: 5:00 PM (Chaplaincy Hour)', 'Every 1st Friday: Over-night Adoration (10:00 PM)'],
    type: 'Adoration',
    venue: "St. Peter's Chaplaincy Main Church",
  },
];

export const EXCO_MEMBERS: ExcoMember[] = [
  {
    id: '1',
    name: 'Comr. [Insert President Name]',
    office: 'President',
    faculty: 'Faculty of Engineering',
    department: 'Electrical Engineering',
    phone: '+234 801 234 5678',
    email: 'president@nfcsunn.org',
  },
  {
    id: '2',
    name: 'Comr. [Insert Vice President Name]',
    office: 'Vice President',
    faculty: 'Faculty of Biological Sciences',
    department: 'Biochemistry',
    phone: '+234 802 345 6789',
    email: 'vp@nfcsunn.org',
  },
  {
    id: '3',
    name: 'Comr. [Insert Secretary Name]',
    office: 'General Secretary',
    faculty: 'Faculty of Arts',
    department: 'Mass Communication',
    phone: '+234 803 456 7890',
    email: 'secretary@nfcsunn.org',
  },
  {
    id: '4',
    name: 'Comr. [Insert PRO Name]',
    office: 'Public Relations Officer (P.R.O.)',
    faculty: 'Faculty of Social Sciences',
    department: 'Political Science',
    phone: '+234 804 567 8901',
    email: 'pro@nfcsunn.org',
  },
  {
    id: '5',
    name: 'Comr. [Insert Financial Sec Name]',
    office: 'Financial Secretary',
    faculty: 'Faculty of Business Administration',
    department: 'Accountancy',
  },
  {
    id: '6',
    name: 'Comr. [Insert Treasurer Name]',
    office: 'Treasurer',
    faculty: 'Faculty of Medical Sciences',
    department: 'Medicine & Surgery',
  },
];

export const PIOUS_SOCIETIES: PiousSociety[] = [
  {
    id: 'p1',
    name: 'Legion of Mary',
    acronym: 'LOM',
    description: 'A Marian apostolic society dedicated to prayer, door-to-door evangelization, and spiritual works of mercy.',
    meetingDay: 'Sundays',
    meetingTime: '4:00 PM',
    venue: 'Chaplaincy Hall A',
    category: 'Devotional',
  },
  {
    id: 'p2',
    name: 'Catholic Charismatic Renewal Nigeria',
    acronym: 'CCRN',
    description: 'Focused on spiritual awakening through praise, worship, charismatic gifts, Bible sharing, and intercession.',
    meetingDay: 'Tuesdays & Thursdays',
    meetingTime: '5:00 PM',
    venue: 'St. Peter\'s Main Church',
    category: 'Devotional',
  },
  {
    id: 'p3',
    name: 'Block Rosary Crusade',
    acronym: 'BRC',
    description: 'Spreading the Fatima message through daily recitation of the Holy Rosary and Marian devotions.',
    meetingDay: 'Daily',
    meetingTime: '6:30 PM',
    venue: 'Chaplaincy Grotto',
    category: 'Devotional',
  },
  {
    id: 'p4',
    name: 'St. Vincent de Paul Society',
    acronym: 'SVP',
    description: 'Providing charitable support, food, visits to prisoners, and assistance to indigent students and widows.',
    meetingDay: 'Saturdays',
    meetingTime: '4:00 PM',
    venue: 'Chaplaincy Conference Room',
    category: 'Charity & Service',
  },
  {
    id: 'p5',
    name: 'Choir & Music Ministry',
    acronym: 'STPEC',
    description: 'Leading the congregation in solemn and uplifting liturgical singing during Sunday and daily Masses.',
    meetingDay: 'Mondays & Fridays',
    meetingTime: '5:00 PM',
    venue: 'Choir Rehearsal Hall',
    category: 'Liturgical',
  },
  {
    id: 'p6',
    name: 'Altar Servers Association',
    acronym: 'ASA',
    description: 'Assisting priests at the altar during Holy Mass and liturgical celebrations with reverence and discipline.',
    meetingDay: 'Saturdays',
    meetingTime: '8:00 AM',
    venue: 'Sacristy',
    category: 'Liturgical',
  },
];

export const FACULTY_ASSOCIATIONS: FacultyAssociation[] = [
  {
    id: 'f1',
    acronym: 'CASSOS',
    fullName: 'Catholic Social Science Students Association',
    faculty: 'Faculty of the Social Sciences',
    description: 'Uniting Catholic students across Economics, Sociology, Political Science, Psychology, and Mass Communication.',
    patronSaint: 'St. Thomas More',
  },
  {
    id: 'f2',
    acronym: 'ACES',
    fullName: 'Association of Catholic Engineering Students',
    faculty: 'Faculty of Engineering',
    description: 'Fostering Christian moral integrity and academic excellence among student engineers at UNN.',
    patronSaint: 'St. Patrick',
  },
  {
    id: 'f3',
    acronym: 'FECAMDS',
    fullName: 'Federation of Catholic Medical and Dental Students',
    faculty: 'Faculty of Medical Sciences & Dentistry',
    description: 'Promoting Catholic medical ethics, health outreaches, and spiritual growth in healthcare professionals.',
    patronSaint: 'St. Luke',
  },
  {
    id: 'f4',
    acronym: 'CLA',
    fullName: 'Catholic Law Students Association',
    faculty: 'Faculty of Law',
    description: 'Championing justice, moral law, and advocacy rooted in Catholic social teachings.',
    patronSaint: 'St. Ivo of Kermartin',
  },
  {
    id: 'f5',
    acronym: 'CABS',
    fullName: 'Catholic Association of Biological Sciences Students',
    faculty: 'Faculty of Biological & Physical Sciences',
    description: 'Integrating scientific discovery with faith in God, the Creator of all living things.',
    patronSaint: 'St. Albert the Great',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Chidimma A.',
    role: 'Alumna',
    gradYear: '2024',
    department: 'Faculty of Law',
    quote: 'Joining NFCS UNN in my first year gave me a home away from home. Through First Year Forum and St. Peter\'s Chaplaincy, I built a solid spiritual foundation that sustained me through law school.',
  },
  {
    id: 't2',
    name: 'Emanuel O.',
    role: 'Final Year Student',
    department: 'Electrical Engineering (ACES)',
    quote: 'NFCS proved to me that academic rigour and deep prayer life can go hand in hand. The academic tutorials organised by our fellowship saved my grades in 200 Level.',
  },
  {
    id: 't3',
    name: 'Blessing K.',
    role: 'First Year Student',
    department: 'Mass Communication',
    quote: 'When I arrived Nsukka as a fresher, I felt lost. The NFCS First Year Forum welcomed me with open arms, guided me through course registration, and connected me with wonderful brethren.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Welcome to the New Academic Session: Living the Faith in Campus Life',
    slug: 'welcome-new-academic-session',
    category: 'Spiritual Reflections',
    author: 'NFCS UNN Executive Council & Chaplaincy Team',
    date: 'August 1, 2026',
    readTime: '4 min read',
    excerpt: 'As we open the doors to a brand new academic session at UNN, we extend a warm Catholic welcome to all freshers, returning students, and staff.',
    content: `
# Welcome to the New Academic Session at UNN!

Dear Brothers and Sisters in Christ,

On behalf of **Rev. Fr. Chaplain**, the Chaplaincy pastoral team, and the entire Executive Council of the **Nigeria Federation of Catholic Students (NFCS), University of Nigeria, Nsukka Chapter**, we heartily welcome you to a fresh academic session!

Whether you are stepping into the Lion Den for the very first time as a fresher, or returning to push closer to graduation, we remind you of our proud motto: **"Living the Faith"** and our resounding slogan: **"Who Cares? NFCS Does!"**

## Finding Your Spiritual Home at St. Peter's Chaplaincy

University life comes with incredible opportunities and real challenges—balancing lectures, continuous assessments, personal independence, and peer influences. At **St. Peter's Catholic Chaplaincy, UNN**, you are never alone.

Here is what awaits you this session:
1. **Daily & Sunday Holy Masses**: Nourish your soul before lectures every morning at 6:00 AM or join the vibrant Student Mass every Sunday at 8:30 AM.
2. **First Year Forum**: Special orientation, mentorship, and course guidance for all 100 Level and Direct Entry freshers.
3. **General Fellowships**: Mid-week prayer, worship, and Bible study sessions every Tuesday at 5:00 PM.
4. **Pious Societies**: Over 15 active devotional and service societies including Legion of Mary, Charismatic Renewal, Block Rosary, Choir, and St. Vincent de Paul.

## A Word for Our Freshers

To our new students: Congratulations on your admission into the prestigious University of Nigeria, Nsukka! Do not let the excitement or anxiety of campus life pull you away from your faith. Make St. Peter's Chaplaincy your daily anchor.

> *"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."* — Philippians 4:6

## Join Us This Sunday!

Come celebrate with us at the **Student Mass this Sunday at 8:30 AM**. Meet your fellow Catholic students, register at the NFCS Secretariat, and get plugged into your Faculty Catholic Association.

Who Cares? **NFCS Does!**
    `,
    image: 'https://images.unsplash.com/photo-1548625361-188828e18512?auto=format&fit=crop&q=80&w=1000',
    tags: ['Freshers', 'Academic Session', 'Spiritual Reflection', 'UNN'],
  },
  {
    id: 'b2',
    title: 'First Year Forum 2026: Guiding Freshers From Admission to Academic Mastery',
    slug: 'first-year-forum-orientation-2026',
    category: 'Chapter News',
    author: 'NFCS Academic & Welfare Committee',
    date: 'July 20, 2026',
    readTime: '3 min read',
    excerpt: 'Highlights and upcoming schedule for the annual First Year Forum orientation program hosted at St. Peter’s Chaplaincy Hall.',
    content: 'Detailed orientation guide for incoming 100L students at UNN Nsukka...',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000',
    tags: ['First Year Forum', 'Freshers', 'Orientation'],
  },
  {
    id: 'b3',
    title: 'Alumni Spotlight: How NFCS UNN Shaped My Career and Faith Journey',
    slug: 'alumni-spotlight-dr-okonkwo',
    category: 'Alumni Spotlights',
    author: 'NFCS Editorial Board',
    date: 'June 15, 2026',
    readTime: '5 min read',
    excerpt: 'Dr. Paschal Okonkwo (Class of 2012) shares insights on maintaining Catholic values in professional medical practice.',
    content: 'In-depth interview with NFCS Alumnus on faith, integrity, and career success...',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
    tags: ['Alumni', 'Career', 'Faith In Action'],
  },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Solemn Welcome Mass & Fresher Orientation',
    date: 'Sunday, August 16, 2026',
    time: '8:30 AM',
    venue: "St. Peter's Catholic Chaplaincy Main Church",
    category: 'Mass',
    description: 'Special thanksgiving Mass for new and returning students followed by a welcome reception at the Chaplaincy Grounds.',
  },
  {
    id: 'e2',
    title: 'First Year Forum (FYF) Grand Inauguration',
    date: 'Friday, August 21, 2026',
    time: '4:00 PM',
    venue: 'Chaplaincy Multi-Purpose Hall',
    category: 'Forum',
    description: 'Interactive orientation session covering hostel adaptation, course registration, spiritual grounding, and academic success tricks.',
  },
  {
    id: 'e3',
    title: 'General Fellowship & Worship Night',
    date: 'Tuesday, August 25, 2026',
    time: '5:00 PM',
    venue: "St. Peter's Main Church",
    category: 'Fellowship',
    description: 'Inspiring praise, worship, word reflection, and intercessory prayers for campus peace and academic success.',
  },
  {
    id: 'e4',
    title: 'Final Year Forum (FYF) Transition Seminar',
    date: 'Saturday, September 5, 2026',
    time: '10:00 AM',
    venue: 'Chaplaincy Conference Room',
    category: 'Forum',
    description: 'Career guidance, NYSC preparation, spiritual perseverance after university, and alumni network integration.',
  },
];

export const CHAPLAINCY_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: "St. Peter's Chaplaincy Solar & Power Project",
    category: 'Infrastructure',
    description: 'Installing a 15kVA solar hybrid system to ensure uninterrupted electricity for daily morning/evening Mass, Eucharistic Adoration, and student evening study halls.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    raisedAmount: 2730000,
    goalAmount: 3500000,
    progressPercent: 78,
    location: "St. Peter's Chaplaincy Grounds, UNN",
  },
  {
    id: 'p2',
    title: 'Indigent Catholic Student Scholarship & Food Relief Fund',
    category: 'Student Welfare',
    description: 'Providing semester tuition support, hostel accommodation assistance, and monthly food packs to 50+ financially challenged UNN Catholic undergraduates.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    raisedAmount: 3100000,
    goalAmount: 5000000,
    progressPercent: 62,
    location: 'NFCS Secretariat & Faculty Sub-Chapters',
  },
  {
    id: 'p3',
    title: 'Fresher Orientation Handbook & Free Academic Past Questions',
    category: 'Academic Support',
    description: 'Publishing 1,500 free Catholic student orientation guides, course past question compilations, and Mass hymnals for incoming 100L freshers.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    raisedAmount: 1020000,
    goalAmount: 1200000,
    progressPercent: 85,
    location: 'First Year Forum (FYF) & Faculty Wings',
  },
  {
    id: 'p4',
    title: 'STPEC Liturgical Choir Audio & Musical Instrument Upgrade',
    category: 'Liturgy & Music',
    description: 'Procuring new professional wireless microphones, audio mixing console, keyboard, and choral robes to elevate Sunday student Mass worship.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    raisedAmount: 1125000,
    goalAmount: 2500000,
    progressPercent: 45,
    location: "St. Peter's Chaplaincy Choir Loft",
  },
  {
    id: 'p5',
    title: 'Nsukka Community Rural Health & Eye Medical Outreach',
    category: 'Community Charity',
    description: 'Organizing free medical checkups, blood pressure screenings, malaria drugs, and eye testing for underprivileged villagers in Nsukka rural communities.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    raisedAmount: 1260000,
    goalAmount: 1800000,
    progressPercent: 70,
    location: 'Nsukka Rural Villages & Outstations',
  },
  {
    id: 'p6',
    title: 'St. Vincent de Paul Prison & Elderly Visitation Drive',
    category: 'Pious Outreach',
    description: 'Providing toiletries, food supplies, Bibles, and spiritual counseling to inmates at Nsukka Correctional Center and elderly destitute parishioners.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    raisedAmount: 720000,
    goalAmount: 800000,
    progressPercent: 90,
    location: 'Nsukka Correctional Facility & Outstations',
  },
];
