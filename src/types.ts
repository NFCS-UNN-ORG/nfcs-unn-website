export type PageTab =
  | 'home'
  | 'about'
  | 'initiatives'
  | 'donations'
  | 'spiritual'
  | 'student-life'
  | 'blog'
  | 'get-involved'
  | 'events'
  | 'gallery'
  | 'faq'
  | 'reports'
  | 'success-stories'
  | 'contact'
  | 'figma-guide';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  raisedAmount: number;
  goalAmount: number;
  progressPercent: number;
  location: string;
}

export interface MassSchedule {
  day: string;
  times: string[];
  type: string;
  venue: string;
}

export interface ExcoMember {
  id: string;
  name: string;
  office: string;
  faculty: string;
  department: string;
  phone?: string;
  email?: string;
  image?: string;
}

export interface PiousSociety {
  id: string;
  name: string;
  acronym: string;
  description: string;
  meetingDay: string;
  meetingTime: string;
  venue: string;
  category: 'Devotional' | 'Charity & Service' | 'Liturgical' | 'Youth & Forum';
}

export interface FacultyAssociation {
  id: string;
  acronym: string;
  fullName: string;
  faculty: string;
  description: string;
  patronSaint?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Spiritual Reflections' | 'Chapter News' | 'Alumni Spotlights' | 'Event Recaps';
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Mass' | 'Fellowship' | 'Forum' | 'Outreach' | 'Academic';
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  gradYear?: string;
  department: string;
  quote: string;
  avatar?: string;
}
