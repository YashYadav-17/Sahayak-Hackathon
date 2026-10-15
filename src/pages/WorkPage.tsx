import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Banknote, ShieldCheck, ArrowLeft, Mic } from 'lucide-react';

export const WorkPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'construction' | 'carpentry' | 'domestic'>('all');

  const jobs = [
    {
      id: 1,
      title: 'Master Mason Needed for Residential Site',
      location: 'Kothrud, Pune • 8 Days',
      pay: '₹950 / Day',
      type: 'Direct Wage',
      category: 'construction',
    },
    {
      id: 2,
      title: 'Wardrobe Fitting & Interior Woodwork',
      location: 'Andheri West, Mumbai • 4 Days',
      pay: '₹1,100 / Day',
      type: 'Immediate Start',
      category: 'carpentry',
    },
    {
      id: 3,
      title: 'Warehouse Cargo Handling & Loading',
      location: 'Hadapsar, Pune • Ongoing',
      pay: '₹800 / Day',
      type: 'Daily Attendance',
      category: 'domestic',
    },
  ];

  const filteredJobs =
    activeFilter === 'all' ? jobs : jobs.filter((j) => j.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Top Breadcrumb / Return */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#15372E] hover:text-[#F16B3A] transition-colors focus-visible:outline-2 focus-visible:outline-[#15372E] rounded-md px-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-[#EAE3D2] text-[#15372E] text-xs font-semibold mb-3">
          Work Marketplace
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#15372E] tracking-tight">
          Find Verified Local Work
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4A5649] leading-relaxed">
          Browse trustworthy job opportunities with benchmarked wages and direct employer contacts.
        </p>
      </div>

      {/* Search & Voice Bar */}
      <div className="mb-8 p-2 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] shadow-xs flex items-center gap-3">
        <Search className="w-5 h-5 text-[#4A5649] ml-3 shrink-0" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search skills (e.g. Mason, Electrician, Carpenter, Painter)..."
          aria-label="Search skills"
          className="flex-1 bg-transparent py-2.5 text-sm sm:text-base text-[#202820] placeholder-[#738072] focus:outline-none"
        />
        <button
          type="button"
          aria-label="Voice Search"
          className="p-2.5 rounded-xl bg-[#15372E] text-[#C8EEA0] hover:bg-[#1C483D] transition-colors mr-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#15372E]"
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Job categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#15372E] text-[#F5F0E6]'
              : 'bg-[#FBF7F0] border border-[#DCD5C8] text-[#202820] hover:bg-[#EAE3D2]'
          }`}
        >
          All Opportunities
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'construction'}
          onClick={() => setActiveFilter('construction')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeFilter === 'construction'
              ? 'bg-[#15372E] text-[#F5F0E6]'
              : 'bg-[#FBF7F0] border border-[#DCD5C8] text-[#202820] hover:bg-[#EAE3D2]'
          }`}
        >
          Masonry & Construction
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'carpentry'}
          onClick={() => setActiveFilter('carpentry')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeFilter === 'carpentry'
              ? 'bg-[#15372E] text-[#F5F0E6]'
              : 'bg-[#FBF7F0] border border-[#DCD5C8] text-[#202820] hover:bg-[#EAE3D2]'
          }`}
        >
          Carpentry & Electrical
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'domestic'}
          onClick={() => setActiveFilter('domestic')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeFilter === 'domestic'
              ? 'bg-[#15372E] text-[#F5F0E6]'
              : 'bg-[#FBF7F0] border border-[#DCD5C8] text-[#202820] hover:bg-[#EAE3D2]'
          }`}
        >
          Home & Maintenance
        </button>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <article
            key={job.id}
            className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] hover:border-[#15372E] shadow-2xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF8D9] text-[#15372E] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#15372E]" />
                  Verified Job
                </span>
                <span className="text-xs font-medium text-[#F16B3A]">{job.type}</span>
              </div>

              <h2 className="font-serif text-lg font-bold text-[#15372E] mb-2 leading-snug">
                {job.title}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-[#4A5649] mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#F16B3A]" />
                <span>{job.location}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCD5C8] flex items-center justify-between">
              <div className="flex items-center gap-1 text-base font-bold text-[#15372E]">
                <Banknote className="w-4 h-4 text-[#F16B3A]" />
                <span>{job.pay}</span>
              </div>

              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-[#15372E] text-[#F5F0E6] text-xs font-semibold hover:bg-[#1C483D] transition-colors"
              >
                View Details & Apply
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
