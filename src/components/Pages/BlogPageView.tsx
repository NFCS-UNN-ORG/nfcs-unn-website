import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/nfcsData';
import { BlogPost } from '../../types';
import { FileText, Calendar, Clock, User, ArrowUpRight, Search, X } from 'lucide-react';
import { NewsletterBanner } from '../NewsletterBanner';

export const BlogPageView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Spiritual Reflections', 'Chapter News', 'Alumni Spotlights', 'Event Recaps'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
            Blog & News Section
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            NFCS UNN Reflections & Chapter News
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Spiritual reflections, chaplaincy announcements, alumni spotlights, and event recaps from St. Peter's Catholic Chaplaincy, UNN.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-stone-900 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-200 mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-emerald-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-stone-500 font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-700" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-700" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug hover:text-emerald-800 transition-colors cursor-pointer" onClick={() => setActiveArticle(post)}>
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div>
                <button
                  onClick={() => setActiveArticle(post)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Read Full Reflection</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-stone-200 relative my-8 space-y-6 max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block">
                  {activeArticle.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 leading-tight">
                  {activeArticle.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-medium pt-1 border-b border-stone-100 pb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    {activeArticle.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    {activeArticle.date}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <div className="aspect-16/9 rounded-2xl overflow-hidden bg-stone-200">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-stone prose-emerald max-w-none text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {activeArticle.content}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {activeArticle.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Close Article
                </button>
              </div>

            </div>
          </div>
        )}

        <NewsletterBanner />

      </div>
    </div>
  );
};
