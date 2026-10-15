import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Banknote,
  Calendar,
  Clock,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowLeft,
  Briefcase,
  RotateCcw,
  Sparkles,
  Flag,
  Wrench,
  Users,
  Eye,
  Info,
} from 'lucide-react';
import { SAMPLE_JOBS } from '../data/sampleJobs';
import type { Job, TradeCategory, DurationFilter } from '../types/job';

const STORAGE_SAVED_KEY = 'sahayak_saved_jobs';
const STORAGE_INTERESTED_KEY = 'sahayak_interested_jobs';

export const WorkPage: React.FC = () => {
  // State: Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [tradeFilter, setTradeFilter] = useState<TradeCategory>('all');
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // State: Local Persistence (Saved Jobs & Interested Jobs)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SAVED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [interestedJobIds, setInterestedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_INTERESTED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // State: Selected Job for Detail Modal / Slide-over
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // State: Report Listing Dialog
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState('Inaccurate pay rate');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Sync saved jobs with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedJobIds));
    } catch {
      // Ignore localStorage failure in restricted sandbox
    }
  }, [savedJobIds]);

  // Sync interested jobs with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_INTERESTED_KEY, JSON.stringify(interestedJobIds));
    } catch {
      // Ignore localStorage failure
    }
  }, [interestedJobIds]);

  // Handle Modal Escape Key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedJob(null);
        setIsReporting(false);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedJob, handleKeyDown]);

  // Toggle Save Job
  const toggleSaveJob = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Interest
  const toggleInterest = (id: string) => {
    setInterestedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Submit Report
  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setIsReporting(false);
    }, 2200);
  };

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return SAMPLE_JOBS.filter((job) => {
      // 1. Text Search (trade, title, locality, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          job.title.toLowerCase().includes(query) ||
          job.tradeLabel.toLowerCase().includes(query) ||
          job.locality.toLowerCase().includes(query) ||
          job.city.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // 2. City Filter
      if (cityFilter !== 'all' && job.city.toLowerCase() !== cityFilter.toLowerCase()) {
        return false;
      }

      // 3. Trade Filter
      if (tradeFilter !== 'all' && job.trade !== tradeFilter) {
        return false;
      }

      // 4. Duration Filter
      if (durationFilter !== 'all' && job.durationType !== durationFilter) {
        return false;
      }

      // 5. Saved Only Filter
      if (showSavedOnly && !savedJobIds.includes(job.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, cityFilter, tradeFilter, durationFilter, showSavedOnly, savedJobIds]);

  // Featured Job
  const featuredJob = useMemo(() => {
    return SAMPLE_JOBS.find((j) => j.isFeatured) || SAMPLE_JOBS[0];
  }, []);

  const resetAllFilters = () => {
    setSearchQuery('');
    setCityFilter('all');
    setTradeFilter('all');
    setDurationFilter('all');
    setShowSavedOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <div className="bg-[#111827] text-white border-b border-slate-800 pt-8 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#14B8A6] font-semibold mb-6 transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 text-[#14B8A6] text-xs font-mono font-semibold mb-3 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT WORK MARKETPLACE • ZERO COMMISSION</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Find work. Know the pay.
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                Clear day rates, exact site locations, and direct employer agreements without middleman cuts.
              </p>
            </div>

            {/* Quick Saved Jobs Count Button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowSavedOnly((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                  showSavedOnly
                    ? 'bg-[#0F766E] text-white border-[#14B8A6]/40 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${showSavedOnly ? 'fill-current' : ''}`} />
                <span>Saved Jobs ({savedJobIds.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">

        {/* 2. SEARCH & LOCATION BAR */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-stretch gap-3">
          {/* Skill / Trade Search */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-[#0F766E] focus-within:bg-white transition-colors">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill or trade (e.g. Mason, Carpenter, Painting, Tile)..."
              className="w-full bg-transparent text-sm text-[#111827] placeholder-slate-400 focus:outline-none"
              aria-label="Search jobs by trade or skill"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City / Locality Selector */}
          <div className="md:w-64 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-[#0F766E] focus-within:bg-white transition-colors">
            <MapPin className="w-4 h-4 text-[#0F766E] shrink-0" />
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-transparent text-sm text-[#111827] focus:outline-none cursor-pointer"
              aria-label="Filter by locality city"
            >
              <option value="all">All Cities &amp; Localities</option>
              <option value="Pune">Pune (Kothrud, Hadapsar, Viman Nagar)</option>
              <option value="Mumbai">Mumbai (Andheri West)</option>
              <option value="Bengaluru">Bengaluru (Koramangala, Indiranagar)</option>
              <option value="Thane">Thane (Bhiwandi)</option>
            </select>
          </div>
        </div>

        {/* 3. TRADE CATEGORY & DURATION FILTERS */}
        <div className="space-y-3.5">
          {/* Trade Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Trade categories">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Trade:</span>
            {[
              { id: 'all', label: 'All Trades' },
              { id: 'masonry', label: 'Masonry' },
              { id: 'carpentry', label: 'Carpentry' },
              { id: 'painting', label: 'Painting' },
              { id: 'electrical', label: 'Electrical' },
              { id: 'plumbing', label: 'Plumbing' },
              { id: 'general', label: 'General Help' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tradeFilter === t.id}
                onClick={() => setTradeFilter(t.id as TradeCategory)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  tradeFilter === t.id
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white border border-[#E2E8F0] text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Duration Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Duration:</span>
            {[
              { id: 'all', label: 'All Durations' },
              { id: 'daily', label: 'Daily Shift' },
              { id: 'multi_day', label: 'Multi-Day (Fixed)' },
              { id: 'ongoing', label: 'Ongoing Work' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDurationFilter(d.id as DurationFilter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  durationFilter === d.id
                    ? 'bg-[#1E293B] text-white border border-slate-700 font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {d.label}
              </button>
            ))}

            {(searchQuery || cityFilter !== 'all' || tradeFilter !== 'all' || durationFilter !== 'all' || showSavedOnly) && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-[#0F766E] hover:text-[#115E59] hover:bg-[#0F766E]/10 ml-auto transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 4. FEATURED OPPORTUNITY SHOWCASE (Shown when no strict filters active) */}
        {!searchQuery && tradeFilter === 'all' && cityFilter === 'all' && !showSavedOnly && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0F766E]/20 border border-[#0F766E]/40 text-white shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                Featured Sample Showcase
              </span>
              <span className="text-xs font-mono text-slate-400">
                Sample ID: {featuredJob.id}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  {featuredJob.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 max-w-2xl">
                  {featuredJob.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#14B8A6]" />
                    {featuredJob.locality}, {featuredJob.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {featuredJob.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {featuredJob.hours}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                    Offered Day Rate
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#14B8A6]">
                    {featuredJob.payFormatted}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Direct UPI or cash at end of day
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(featuredJob)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-colors duration-150 shadow-sm"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSaveJob(featuredJob.id)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                    aria-label={savedJobIds.includes(featuredJob.id) ? 'Remove bookmark' : 'Bookmark job'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${savedJobIds.includes(featuredJob.id) ? 'text-[#14B8A6] fill-current' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. MATCHING COUNT & DEMONSTRATION NOTICE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#E2E8F0]">
          <div className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2">
            <span>
              Showing <strong className="text-[#0F766E]">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'sample opportunity' : 'sample opportunities'}
            </span>
            {showSavedOnly && (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#0F766E]/10 text-[#0F766E]">
                Saved View
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Illustrative Sample Listings • Direct Agreement</span>
          </div>
        </div>

        {/* 6. JOB CARDS GRID */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const isInterested = interestedJobIds.includes(job.id);

              return (
                <motion.article
                  key={job.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F766E]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div>
                    {/* Top Meta: Trade & Bookmark */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {job.tradeLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E2E8F0]/60 text-slate-600">
                          {job.duration}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleSaveJob(job.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F766E] hover:bg-slate-100 transition-colors"
                        aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'text-[#0F766E] fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Job Title */}
                    <h3 className="font-serif text-lg font-bold text-[#111827] mb-2 leading-snug group-hover:text-[#0F766E] transition-colors">
                      {job.title}
                    </h3>

                    {/* Locality & Hours */}
                    <div className="space-y-1.5 mb-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                        <span>{job.locality}, {job.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{job.hours}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {job.description}
                    </p>
                  </div>

                  {/* Card Bottom: Pay & Actions */}
                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Offered Rate
                      </div>
                      <div className="font-serif text-lg font-bold text-[#0F766E]">
                        {job.payFormatted}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isInterested ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#14B8A6]/20 text-[#0F766E] border border-[#14B8A6]/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#0F766E]" />
                          Interested
                        </span>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-[#0F766E] transition-colors duration-150 shadow-xs flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* 7. CLEAR EMPTY STATE */
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E2E8F0] text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#111827] mb-2">
              No sample jobs match your filters
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Try choosing another trade category, switching city, or clearing your text search to view all sample opportunities.
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs sm:text-sm font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* 8. WORKER TRUST ADVISORY CALLOUT */}
        <div className="p-6 rounded-2xl bg-slate-100/80 border border-[#E2E8F0] text-slate-600 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#111827] block mb-0.5">
                Worker Safety &amp; Fair Agreement Reminder
              </span>
              <span>
                Always confirm the offered wage rate, daily work hours, required tools, and daily payment schedule directly with the employer before starting any job.
              </span>
            </div>
          </div>
          <Link
            to="/support"
            className="text-xs font-semibold text-[#0F766E] hover:underline shrink-0"
          >
            Review Wage Guidelines →
          </Link>
        </div>

      </div>

      {/* =========================================================
          9. JOB DETAIL MODAL / SLIDE-OVER OVERLAY
          ========================================================= */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-[#111827]/75 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden z-10 max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-job-title"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-7 border-b border-[#E2E8F0] flex items-start justify-between gap-4 bg-slate-50/70">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20">
                      {selectedJob.tradeLabel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      ID: {selectedJob.id} • Sample Listing
                    </span>
                  </div>
                  <h2 id="modal-job-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] leading-snug">
                    {selectedJob.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
                  aria-label="Close details dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-700">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Offered Pay
                    </div>
                    <div className="text-xl font-bold font-serif text-[#0F766E]">
                      {selectedJob.payFormatted}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Duration
                    </div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {selectedJob.duration}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Site Locality
                    </div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                      {selectedJob.locality}, {selectedJob.city}
                    </div>
                  </div>
                </div>

                {/* Hours & Payment Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-500" />
                      Daily Hours
                    </div>
                    <div className="text-slate-600">{selectedJob.hours}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#0F766E]" />
                      Payment Schedule
                    </div>
                    <div className="text-slate-600">{selectedJob.paymentTiming}</div>
                  </div>
                </div>

                {/* Work Description */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    Work Description
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    Key Tasks &amp; Requirements
                  </h4>
                  <ul className="space-y-1.5 text-sm text-slate-600">
                    {selectedJob.responsibilities.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Info & Demonstration Employer Badge */}
                <div className="p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Tools / Materials:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-slate-600" />
                      {selectedJob.toolsProvided ? 'Provided on site' : 'Worker brings basic trade tools'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Contact / Poster:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-600" />
                      {selectedJob.employerName} ({selectedJob.employerType})
                    </span>
                  </div>
                </div>

                {/* Report Listing Toggle Box */}
                {isReporting ? (
                  <form onSubmit={handleReportSubmit} className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Report this Listing
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsReporting(false)}
                        className="text-xs text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                    </div>

                    <label className="block text-xs text-slate-700 font-medium">
                      Select reason:
                      <select
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                      >
                        <option>Inaccurate pay rate</option>
                        <option>Incorrect hours or locality</option>
                        <option>Suspicious or unresponsive listing</option>
                        <option>Safety concerns</option>
                        <option>Other</option>
                      </select>
                    </label>

                    <button
                      type="submit"
                      disabled={reportSubmitted}
                      className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      {reportSubmitted ? 'Report Submitted for Community Review' : 'Submit Report'}
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsReporting(true)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-700 transition-colors"
                    >
                      <Flag className="w-3 h-3" />
                      <span>Report listing issues</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer / Action Buttons */}
              <div className="p-6 border-t border-[#E2E8F0] bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 text-center sm:text-left">
                  Demo Action: Clicking records your interest locally.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => toggleSaveJob(selectedJob.id)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    {savedJobIds.includes(selectedJob.id) ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 text-[#0F766E]" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleInterest(selectedJob.id)}
                    className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      interestedJobIds.includes(selectedJob.id)
                        ? 'bg-[#14B8A6] text-slate-900 hover:bg-[#2dd4bf]'
                        : 'bg-[#0F766E] text-white hover:bg-[#115E59]'
                    }`}
                  >
                    {interestedJobIds.includes(selectedJob.id) ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Interest Recorded</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4" />
                        <span>I&apos;m Interested</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
