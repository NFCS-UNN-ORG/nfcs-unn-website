export interface ComponentMapping {
  figmaSectionName: string;
  reactComponentName: string;
  description: string;
  aceternityComponent: string;
  tailwindSpecs: string;
  nfcsContentMapping: string;
}

export const FIGMA_COMPONENT_BREAKDOWN: ComponentMapping[] = [
  {
    figmaSectionName: '01. Top Navbar / Header',
    reactComponentName: '<Header />',
    description: 'Sticky navigation header containing brand logo, page links, contact CTA, and portal action.',
    aceternityComponent: 'FloatingNav / NavbarMenu (or standard Tailwind + Framer Motion backdrop-blur header)',
    tailwindSpecs: 'bg-white/95 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50',
    nfcsContentMapping: 'NFCS UNN logo with St. Peter\'s Chaplaincy badge, navigation tabs, Mass Times CTA, and Portal Login button.',
  },
  {
    figmaSectionName: '02. Hero Banner Section',
    reactComponentName: '<HeroSection />',
    description: 'Central headline flanked by left/right rotated photo frames, diagonal banner strip, and dual action buttons.',
    aceternityComponent: 'Aurora Background / Spotlight / Text Generate Effect for headline',
    tailwindSpecs: 'relative bg-stone-100 py-20 px-6 overflow-hidden flex flex-col items-center text-center',
    nfcsContentMapping: 'Headline: "Living the Faith, Building a Catholic Community at UNN". Diagonal strip: "LIVING THE FAITH • WHO CARES? NFCS DOES!".',
  },
  {
    figmaSectionName: '03. Featured Campaigns (3-Card Horizontal Row)',
    reactComponentName: '<FeaturedPrograms />',
    description: 'Row of 3 cards with image top, category tag pill, title, progress bar / stat indicator, and arrow link button.',
    aceternityComponent: '3D Card Effect / Card Hover Effect',
    tailwindSpecs: 'grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 -mt-10 z-10',
    nfcsContentMapping: 'General Fellowships, First Year Forum, and Pious Societies.',
  },
  {
    figmaSectionName: '04. Impact & Stats Counter',
    reactComponentName: '<ImpactStatsSection />',
    description: 'Section with "Real Change Through Collective Action", description text, 2 media boxes, and 3 large stat counters.',
    aceternityComponent: 'CountUp / Text Reveal Card / Meteors',
    tailwindSpecs: 'bg-white py-16 px-6 max-w-7xl mx-auto border-b border-stone-100',
    nfcsContentMapping: '5,000+ Catholic Students, 50+ Year UNN Chapter Legacy (Est. 1956), 15+ Pious Societies & Forums.',
  },
  {
    figmaSectionName: '05. Vision & Mission Section',
    reactComponentName: '<VisionMissionSection />',
    description: 'Split grid layout: left column with Vision & Mission statement paragraphs and buttons; right column with large image.',
    aceternityComponent: 'Layout Grid / Background Beams',
    tailwindSpecs: 'bg-stone-50 py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center',
    nfcsContentMapping: 'NFCS Vision: Creating a vibrant Catholic faith community. Mission: To empower students spiritually, academically, and socially.',
  },
  {
    figmaSectionName: '06. Student Story Spotlight',
    reactComponentName: '<StorySpotlight />',
    description: 'Section headline with horizontal featured testimonial/story card showing image, quote, and action button.',
    aceternityComponent: 'Animated Testimonials / Infinite Moving Cards',
    tailwindSpecs: 'bg-white py-16 px-6 max-w-6xl mx-auto text-center',
    nfcsContentMapping: 'Student testimony on how First Year Forum and St. Peter\'s Chaplaincy transformed their UNN journey.',
  },
  {
    figmaSectionName: '07. Key Areas / Pillars Grid',
    reactComponentName: '<PillarsGrid />',
    description: 'Category grid with 4 equal cards containing icons, titles, summaries, and "See All ->" links.',
    aceternityComponent: 'Bento Grid / Card Hover Effect',
    tailwindSpecs: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-12',
    nfcsContentMapping: '1. Spiritual Growth, 2. Academic Excellence, 3. Student Welfare, 4. Community Outreach.',
  },
  {
    figmaSectionName: '08. Campaigns Grid (6 Cards)',
    reactComponentName: '<CampaignsGrid />',
    description: '2x3 card grid displaying specific active programs with category pill, title, image, and "Donate/Join" button.',
    aceternityComponent: 'Hover Border Gradient / Direction Aware Hover',
    tailwindSpecs: 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto py-12',
    nfcsContentMapping: 'First Year Forum, Final Year Forum, Mid-Week Fellowships, Pious Societies, Faculty Chapters, and Caritas Outreach.',
  },
  {
    figmaSectionName: '09. About Us / Chaplaincy Spotlight',
    reactComponentName: '<ChaplaincySpotlight />',
    description: 'Asymmetric layout showcasing chaplaincy details, executive leadership, and pastoral guidance at St. Peter\'s UNN.',
    aceternityComponent: 'Sticky Scroll Reveal / Wobble Card',
    tailwindSpecs: 'bg-stone-50 py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
    nfcsContentMapping: 'St. Peter\'s Catholic Chaplaincy, Rev. Fr. Chaplain, Assistant Chaplain, and Exco Leadership.',
  },
  {
    figmaSectionName: '10. Testimonials Carousel',
    reactComponentName: '<TestimonialsSection />',
    description: 'Horizontal quote cards with avatar, quote mark icon, text, and student name.',
    aceternityComponent: 'Infinite Moving Cards / Moving Border',
    tailwindSpecs: 'bg-white py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto',
    nfcsContentMapping: 'Feedback from current students, freshers, and alumni.',
  },
  {
    figmaSectionName: '11. Call to Action Banner',
    reactComponentName: '<NewsletterBanner />',
    description: 'Prominent rounded CTA card with heading, text, and "Contact Us / Subscribe" button.',
    aceternityComponent: 'Background Gradient / Wavy Background',
    tailwindSpecs: 'bg-emerald-900 text-white rounded-3xl p-10 max-w-7xl mx-auto my-12 flex flex-col md:flex-row items-center justify-between gap-6',
    nfcsContentMapping: '"Get In Touch With Us To Make A Difference" / "Connect With NFCS UNN Today".',
  },
  {
    figmaSectionName: '12. Footer Section',
    reactComponentName: '<Footer />',
    description: 'Dark background footer with headline "Join Us And Stand Firm In Faith!", newsletter email input box, address, and 4 link columns.',
    aceternityComponent: 'Footer with Background Beams / Sparkles',
    tailwindSpecs: 'bg-stone-900 text-stone-300 pt-16 pb-8 px-6 border-t border-stone-800',
    nfcsContentMapping: 'NFCS Motto "Living the Faith", Slogan "Who Cares? NFCS Does!", St. Peter\'s Chaplaincy address, portal links, and social channels.',
  },
];
