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
import type { TradeCategory, DurationFilter } from '../types/job';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedJob } from '../i18n/translations';

const STORAGE_SAVED_KEY = 'sahayak_saved_jobs';
const STORAGE_INTERESTED_KEY = 'sahayak_interested_jobs';

export const WorkPage: React.FC = () => {
  const { t, language } = useLanguage();

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
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // State: Report Listing Dialog
  const [isReporting, setIsReporting] = useState(false);
  const [reportReason, setReportReason] = useState<string>('work.job.reportReason1');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Localized Jobs list
  const localizedJobs = useMemo(() => {
    return SAMPLE_JOBS.map((job) => getLocalizedJob(job, language));
  }, [language]);

  const selectedJob = useMemo(() => {
    if (!selectedJobId) return null;
    const raw = SAMPLE_JOBS.find((j) => j.id === selectedJobId);
    return raw ? getLocalizedJob(raw, language) : null;
  }, [selectedJobId, language]);

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
        setSelectedJobId(null);
        setIsReporting(false);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedJobId) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedJobId, handleKeyDown]);

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

  // Filter Logic over Localized Jobs
  const filteredJobs = useMemo(() => {
    return localizedJobs.filter((job) => {
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
  }, [localizedJobs, searchQuery, cityFilter, tradeFilter, durationFilter, showSavedOnly, savedJobIds]);

  // Featured Job
  const featuredJob = useMemo(() => {
    const raw = SAMPLE_JOBS.find((j) => j.isFeatured) || SAMPLE_JOBS[0];
    return getLocalizedJob(raw, language);
  }, [language]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setCityFilter('all');
    setTradeFilter('all');
    setDurationFilter('all');
    setShowSavedOnly(false);
  };

  const tradePills: { id: TradeCategory; label: string }[] = [
    { id: 'all', label: t('work.filters.allTrades') },
    { id: 'masonry', label: language === 'hi' ? 'राजमिस्त्री' : 'Masonry' },
    { id: 'carpentry', label: language === 'hi' ? 'बढ़ई' : 'Carpentry' },
    { id: 'painting', label: language === 'hi' ? 'पेंटर' : 'Painting' },
    { id: 'electrical', label: language === 'hi' ? 'इलेक्ट्रीशियन' : 'Electrical' },
    { id: 'plumbing', label: language === 'hi' ? 'प्लंबर' : 'Plumbing' },
    { id: 'general', label: language === 'hi' ? 'सामान्य सहायक' : 'General Help' },
  ];

  const durationPills: { id: DurationFilter; label: string }[] = [
    { id: 'all', label: t('work.filters.allDurations') },
    { id: 'daily', label: t('work.filters.daily') },
    { id: 'multi_day', label: t('work.filters.multiDay') },
  ];

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
            <span>{t('common.backHome')}</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 text-[#14B8A6] text-xs font-mono font-semibold mb-3 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('home.hero.scene3.pill')}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {t('work.hero.title')}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                {t('work.hero.subtitle')}
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
                <span>{t('work.job.savedJobsTitle')} ({savedJobIds.length})</span>
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
              placeholder={t('work.search.placeholder')}
              className="w-full bg-transparent text-sm text-[#111827] placeholder-slate-400 focus:outline-none"
              aria-label="Search jobs"
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
              aria-label="Filter by city"
            >
              <option value="all">{language === 'hi' ? 'सभी शहर और इलाक़े' : 'All Cities & Localities'}</option>
              <option value="Pune">Pune (कोथरूड, हड़पसर, विमान नगर)</option>
              <option value="Mumbai">Mumbai (अंधेरी वेस्ट)</option>
              <option value="Bengaluru">Bengaluru (कोरमंगला, इंदिरानगर)</option>
              <option value="Thane">Thane (भिवंडी)</option>
            </select>
          </div>
        </div>

        {/* 3. TRADE CATEGORY & DURATION FILTERS */}
        <div className="space-y-3.5">
          {/* Trade Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Trade categories">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">{t('work.filters.trade')}:</span>
            {tradePills.map((pill) => (
              <button
                key={pill.id}
                type="button"
                role="tab"
                aria-selected={tradeFilter === pill.id}
                onClick={() => setTradeFilter(pill.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  tradeFilter === pill.id
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-white border border-[#E2E8F0] text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Duration Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">{t('work.filters.duration')}:</span>
            {durationPills.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDurationFilter(d.id)}
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
                <span>{t('work.results.resetBtn')}</span>
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
                {t('work.job.featured')}
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
                    {t('common.rate')}
                  </div>
                  <div className="font-serif text-3xl font-bold text-[#14B8A6]">
                    ₹{featuredJob.payAmount.toLocaleString('en-IN')} / {t('common.day')}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {featuredJob.paymentTiming}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedJobId(featuredJob.id)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-colors duration-150 shadow-sm"
                  >
                    {t('work.job.viewDetails')}
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
              <strong className="text-[#0F766E]">{filteredJobs.length}</strong> {t('work.results.count')}
            </span>
            {showSavedOnly && (
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#0F766E]/10 text-[#0F766E]">
                {t('work.job.savedJobsTitle')}
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('common.demoNotice')}</span>
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
                  onClick={() => setSelectedJobId(job.id)}
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
                        {t('common.rate')}
                      </div>
                      <div className="font-serif text-lg font-bold text-[#0F766E]">
                        ₹{job.payAmount.toLocaleString('en-IN')} / {t('common.day')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isInterested ? (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#14B8A6]/20 text-[#0F766E] border border-[#14B8A6]/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#0F766E]" />
                          <span>{t('work.job.interestedDone')}</span>
                        </span>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJobId(job.id);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-[#0F766E] transition-colors duration-150 shadow-xs flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('work.job.viewDetails')}</span>
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
              {t('work.results.emptyTitle')}
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {t('work.results.emptyDesc')}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs sm:text-sm font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('work.results.resetBtn')}</span>
            </button>
          </div>
        )}

        {/* 8. WORKER TRUST ADVISORY CALLOUT */}
        <div className="p-6 rounded-2xl bg-slate-100/80 border border-[#E2E8F0] text-slate-600 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#111827] block mb-0.5">
                {t('work.safety.title')}
              </span>
              <span>
                {t('work.safety.desc')}
              </span>
            </div>
          </div>
          <Link
            to="/support"
            className="text-xs font-semibold text-[#0F766E] hover:underline shrink-0"
          >
            {t('work.safety.link')} →
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
              onClick={() => setSelectedJobId(null)}
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
                      ID: {selectedJob.id} • {t('common.demoNotice')}
                    </span>
                  </div>
                  <h2 id="modal-job-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] leading-snug">
                    {selectedJob.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJobId(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
                  aria-label="Close dialog"
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
                      {t('common.rate')}
                    </div>
                    <div className="text-xl font-bold font-serif text-[#0F766E]">
                      ₹{selectedJob.payAmount.toLocaleString('en-IN')} / {t('common.day')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      {t('work.filters.duration')}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {selectedJob.duration}
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      {t('common.location')}
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
                      {t('work.job.hours')}
                    </div>
                    <div className="text-slate-600">{selectedJob.hours}</div>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                    <div className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-[#0F766E]" />
                      {t('work.job.payment')}
                    </div>
                    <div className="text-slate-600">{selectedJob.paymentTiming}</div>
                  </div>
                </div>

                {/* Work Description */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    {language === 'hi' ? 'काम का विवरण' : 'Work Description'}
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    {t('work.job.responsibilities')}
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
                    <span className="text-slate-500">{language === 'hi' ? 'औज़ार / सामान:' : 'Tools / Materials:'}</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-slate-600" />
                      {selectedJob.toolsProvided ? t('work.job.toolsProvided') : t('work.job.toolsNotProvided')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">{t('work.job.employer')}:</span>
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
                        {t('work.job.report')}
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsReporting(false)}
                        className="text-xs text-slate-500 hover:text-slate-700"
                      >
                        {t('common.cancel')}
                      </button>
                    </div>

                    <label className="block text-xs text-slate-700 font-medium">
                      {t('work.job.reportReason')}:
                      <select
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#0F766E]"
                      >
                        <option value="work.job.reportReason1">{t('work.job.reportReason1')}</option>
                        <option value="work.job.reportReason2">{t('work.job.reportReason2')}</option>
                        <option value="work.job.reportReason3">{t('work.job.reportReason3')}</option>
                        <option value="work.job.reportReason4">{t('work.job.reportReason4')}</option>
                      </select>
                    </label>

                    <button
                      type="submit"
                      disabled={reportSubmitted}
                      className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                    >
                      {reportSubmitted ? t('work.job.reportSuccess') : t('work.job.reportSubmit')}
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
                      <span>{t('work.job.report')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer / Action Buttons */}
              <div className="p-6 border-t border-[#E2E8F0] bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 text-center sm:text-left">
                  {t('common.demoNotice')}
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
                        <span>{t('work.job.saved')}</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>{t('work.job.save')}</span>
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
                        <span>{t('work.job.interestedDone')}</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4" />
                        <span>{t('work.job.interested')}</span>
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

export default WorkPage;
