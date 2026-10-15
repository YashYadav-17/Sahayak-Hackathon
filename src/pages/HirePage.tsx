import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  X,
  ArrowLeft,
  Briefcase,
  RotateCcw,
  Sparkles,
  Users,
  Eye,
  Info,
  PhoneCall,
  PlusCircle,
  Award,
  AlertCircle,
  Trash2,
  Check,
} from 'lucide-react';
import { SAMPLE_WORKERS } from '../data/sampleWorkers';
import type { WorkerProfile, WorkerTrade, AvailabilityFilter, PostedJob } from '../types/worker';

const STORAGE_CONTACT_KEY = 'sahayak_contact_requests';
const STORAGE_POSTED_JOBS_KEY = 'sahayak_user_posted_jobs';

export const HirePage: React.FC = () => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [tradeFilter, setTradeFilter] = useState<WorkerTrade>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>('all');

  // Selected Worker Detail Modal
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  // Contact Requests State (persisted locally)
  const [requestedWorkerIds, setRequestedWorkerIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CONTACT_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // User-Posted Jobs State (persisted locally)
  const [userPostedJobs, setUserPostedJobs] = useState<PostedJob[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_POSTED_JOBS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Show "My Postings" view toggle
  const [showMyPostings, setShowMyPostings] = useState(false);

  // Job Posting Modal State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    trade: 'mason',
    locality: '',
    city: 'Pune',
    payAmount: '',
    payUnit: 'per_day' as 'per_day' | 'per_job',
    hours: '9:00 AM – 6:00 PM (1 hr break)',
    duration: '3 Days Fixed',
    paymentTiming: 'Direct cash or UPI at end of each day',
    description: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [postSuccessMessage, setPostSuccessMessage] = useState(false);

  // Sync contact requests
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(requestedWorkerIds));
    } catch {
      // Ignore in sandbox
    }
  }, [requestedWorkerIds]);

  // Sync user posted jobs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_POSTED_JOBS_KEY, JSON.stringify(userPostedJobs));
    } catch {
      // Ignore
    }
  }, [userPostedJobs]);

  // Escape key handler for modals
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedWorker(null);
        setIsPostModalOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (selectedWorker || isPostModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWorker, isPostModalOpen, handleKeyDown]);

  // Toggle Contact Request
  const toggleContactRequest = (workerId: string) => {
    setRequestedWorkerIds((prev) =>
      prev.includes(workerId) ? prev.filter((id) => id !== workerId) : [...prev, workerId]
    );
  };

  // Filter Workers Logic
  const filteredWorkers = useMemo(() => {
    return SAMPLE_WORKERS.filter((worker) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matches =
          worker.name.toLowerCase().includes(query) ||
          worker.tradeLabel.toLowerCase().includes(query) ||
          worker.locality.toLowerCase().includes(query) ||
          worker.city.toLowerCase().includes(query) ||
          worker.skills.some((s) => s.toLowerCase().includes(query));
        if (!matches) return false;
      }

      // City
      if (cityFilter !== 'all' && worker.city.toLowerCase() !== cityFilter.toLowerCase()) {
        return false;
      }

      // Trade
      if (tradeFilter !== 'all' && worker.trade !== tradeFilter) {
        return false;
      }

      // Availability
      if (availabilityFilter !== 'all' && worker.availabilityType !== availabilityFilter) {
        return false;
      }

      return true;
    });
  }, [searchQuery, cityFilter, tradeFilter, availabilityFilter]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setCityFilter('all');
    setTradeFilter('all');
    setAvailabilityFilter('all');
  };

  // Handle Form Change
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate and Submit Job Posting
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!postForm.title.trim()) errors.title = 'Please enter a brief job title';
    if (!postForm.locality.trim()) errors.locality = 'Please enter work site locality (e.g. Kothrud)';
    const payNum = Number(postForm.payAmount);
    if (!postForm.payAmount || isNaN(payNum) || payNum <= 0) {
      errors.payAmount = 'Please enter a valid pay amount greater than 0';
    } else if (payNum < 300) {
      errors.payAmount = 'Offered rate should meet fair wage standards (min. ₹300/day)';
    }
    if (!postForm.hours.trim()) errors.hours = 'Please specify daily working hours';
    if (!postForm.duration.trim()) errors.duration = 'Please specify duration (e.g. 4 Days, 1 Week)';
    if (!postForm.description.trim()) errors.description = 'Please describe the required work';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const tradeLabels: { [key: string]: string } = {
      mason: 'Masonry',
      carpenter: 'Carpentry',
      painter: 'Painting',
      electrician: 'Electrical',
      plumber: 'Plumbing',
      general: 'General Help',
    };

    const newJob: PostedJob = {
      id: `USR-JOB-${Date.now().toString().slice(-4)}`,
      trade: postForm.trade,
      tradeLabel: tradeLabels[postForm.trade] || 'General Trade',
      title: postForm.title.trim(),
      locality: postForm.locality.trim(),
      city: postForm.city,
      payAmount: Number(postForm.payAmount),
      payUnit: postForm.payUnit,
      payFormatted: `₹${postForm.payAmount} / ${postForm.payUnit === 'per_day' ? 'Day' : 'Job'}`,
      hours: postForm.hours.trim(),
      duration: postForm.duration.trim(),
      paymentTiming: postForm.paymentTiming.trim(),
      description: postForm.description.trim(),
      createdAt: 'Just now',
    };

    setUserPostedJobs((prev) => [newJob, ...prev]);
    setPostSuccessMessage(true);

    setTimeout(() => {
      setPostSuccessMessage(false);
      setIsPostModalOpen(false);
      setShowMyPostings(true);
      setPostForm({
        title: '',
        trade: 'mason',
        locality: '',
        city: 'Pune',
        payAmount: '',
        payUnit: 'per_day',
        hours: '9:00 AM – 6:00 PM (1 hr break)',
        duration: '3 Days Fixed',
        paymentTiming: 'Direct cash or UPI at end of each day',
        description: '',
      });
    }, 1800);
  };

  const deletePostedJob = (id: string) => {
    setUserPostedJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* 1. TOP HEADER & INTRO */}
      <div className="bg-[#111827] text-white border-b border-slate-800 pt-8 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#14B8A6] font-semibold mb-6 transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 text-[#14B8A6] text-xs font-mono font-semibold mb-3 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT HIRING MARKETPLACE • ZERO BROKERAGE</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Hire Skilled Craftspeople Directly
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                Browse verified local artisans, inspect trade skill examples, and agree on direct pay without intermediary agency cuts.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsPostModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job Requirement</span>
              </button>

              <button
                type="button"
                onClick={() => setShowMyPostings((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                  showMyPostings
                    ? 'bg-slate-800 text-white border-slate-600 shadow-xs'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>My Postings ({userPostedJobs.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">

        {/* 2. USER POSTED JOBS DRAWER / PANEL (If active or has jobs) */}
        {showMyPostings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#0F766E]" />
                <h3 className="font-serif font-bold text-xl text-[#111827]">
                  Your Posted Job Requirements ({userPostedJobs.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMyPostings(false)}
                className="text-xs text-slate-500 hover:text-slate-800 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {userPostedJobs.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                <p className="text-sm text-slate-500 mb-3">You haven&apos;t posted any job requirements yet.</p>
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post your first job requirement</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPostedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F766E]/10 text-[#0F766E]">
                          {job.tradeLabel}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {job.id}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#111827] mb-1">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-2">
                        {job.locality}, {job.city} • {job.duration}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                        {job.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div className="font-serif font-bold text-sm text-[#0F766E]">
                        {job.payFormatted}
                      </div>
                      <button
                        type="button"
                        onClick={() => deletePostedJob(job.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Delete listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* 3. SEARCH & LOCALITY BAR */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-stretch gap-3">
          {/* Skill / Trade Search */}
          <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-[#0F766E] focus-within:bg-white transition-colors">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trade or skill (e.g. Mason, Electrician, Carpenter, Tile, Wiring)..."
              className="w-full bg-transparent text-sm text-[#111827] placeholder-slate-400 focus:outline-none"
              aria-label="Search workers by trade or skill"
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

        {/* 4. TRADE AND AVAILABILITY FILTERS */}
        <div className="space-y-3.5">
          {/* Trade Filter Pills */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Worker trade categories">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Trade:</span>
            {[
              { id: 'all', label: 'All Trades' },
              { id: 'mason', label: 'Masonry' },
              { id: 'carpenter', label: 'Carpentry' },
              { id: 'painter', label: 'Painting' },
              { id: 'electrician', label: 'Electrical' },
              { id: 'plumber', label: 'Plumbing' },
              { id: 'general', label: 'General Labour' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tradeFilter === t.id}
                onClick={() => setTradeFilter(t.id as WorkerTrade)}
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

          {/* Availability Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">Availability:</span>
            {[
              { id: 'all', label: 'All Availability' },
              { id: 'today', label: 'Available Today' },
              { id: 'this_week', label: 'Available This Week' },
            ].map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAvailabilityFilter(a.id as AvailabilityFilter)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                  availabilityFilter === a.id
                    ? 'bg-[#1E293B] text-white border border-slate-700 font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {a.label}
              </button>
            ))}

            {(searchQuery || cityFilter !== 'all' || tradeFilter !== 'all' || availabilityFilter !== 'all') && (
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

        {/* 5. MATCHING COUNT & DEMONSTRATION DATA DISCLAIMER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#E2E8F0]">
          <div className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2">
            <span>
              Showing <strong className="text-[#0F766E]">{filteredWorkers.length}</strong> {filteredWorkers.length === 1 ? 'demonstration artisan' : 'demonstration artisans'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Illustrative Demonstration Profiles • Direct Contact Request</span>
          </div>
        </div>

        {/* 6. WORKER PROFILES GRID */}
        {filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => {
              const isContactRequested = requestedWorkerIds.includes(worker.id);

              return (
                <motion.article
                  key={worker.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0F766E]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedWorker(worker)}
                >
                  <div>
                    {/* Top Worker Info: Avatar, Trade & Availability */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#0F766E] text-white font-bold flex items-center justify-center font-serif text-lg shadow-xs border border-[#14B8A6]/40 shrink-0">
                          {worker.initials}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#111827] leading-snug group-hover:text-[#0F766E] transition-colors">
                            {worker.name}
                          </h3>
                          <div className="text-xs font-semibold text-[#0F766E]">
                            {worker.tradeLabel} • {worker.experienceYears}+ Yrs Exp
                          </div>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 flex items-center gap-1 ${
                        worker.availabilityType === 'today'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {worker.availabilityType === 'today' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {worker.availability}
                      </span>
                    </div>

                    {/* Locality & Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>{worker.locality}, {worker.city}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono font-medium text-slate-700">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>{worker.rating} Rating (Sample)</span>
                      </div>
                    </div>

                    {/* Bio Summary */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {worker.bio}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {worker.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Rate & Direct Contact Request Action */}
                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Expected Rate
                      </div>
                      <div className="font-serif text-lg font-bold text-[#0F766E]">
                        {worker.expectedRate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleContactRequest(worker.id);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                          isContactRequested
                            ? 'bg-[#14B8A6]/20 text-[#0F766E] border border-[#14B8A6]/40'
                            : 'bg-[#0F766E] text-white hover:bg-[#115E59] shadow-xs'
                        }`}
                      >
                        {isContactRequested ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Requested</span>
                          </>
                        ) : (
                          <>
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Request Contact</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWorker(worker);
                        }}
                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-[#0F766E] hover:bg-slate-100 transition-colors"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E2E8F0] text-center max-w-xl mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#111827] mb-2">
              No artisans match your filters
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Try switching your trade filter or broadening your search to view all available demonstration craftspeople.
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

        {/* 7. FAIR HIRING PLEDGE (Principled Advisory) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#111827] text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-[#14B8A6] text-xs font-semibold mb-3 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE SAHAYAK FAIR HIRING PRINCIPLES</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
              Direct Agreement. Fair Terms. Mutual Respect.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Employers on Sahayak agree to state working hours upfront, respect trade proficiencies, provide a safe work environment, and pay workers directly without third-party deductions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPostModalOpen(true)}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post a Job Requirement</span>
          </button>
        </div>

      </div>

      {/* =========================================================
          8. WORKER DETAIL MODAL / SLIDE-OVER OVERLAY
          ========================================================= */}
      <AnimatePresence>
        {selectedWorker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedWorker(null)}
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
              aria-labelledby="modal-worker-name"
            >
              {/* Header */}
              <div className="p-6 sm:p-7 border-b border-[#E2E8F0] flex items-start justify-between gap-4 bg-slate-50/70">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0F766E] text-white font-bold flex items-center justify-center font-serif text-2xl shadow-sm border border-[#14B8A6]/40 shrink-0">
                    {selectedWorker.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0F766E]/10 text-[#0F766E]">
                        {selectedWorker.tradeLabel}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {selectedWorker.id} • Demonstration Profile
                      </span>
                    </div>
                    <h2 id="modal-worker-name" className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] leading-snug">
                      {selectedWorker.name}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedWorker(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
                  aria-label="Close worker details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-700">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Expected Day Rate
                    </div>
                    <div className="text-xl font-bold font-serif text-[#0F766E]">
                      {selectedWorker.expectedRate}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Experience
                    </div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                      <Award className="w-3.5 h-3.5 text-[#0F766E]" />
                      {selectedWorker.experienceYears}+ Years
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                      Base Locality
                    </div>
                    <div className="text-sm font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                      {selectedWorker.locality}, {selectedWorker.city}
                    </div>
                  </div>
                </div>

                {/* Trade Bio */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    Artisan Background &amp; Specialization
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedWorker.bio}
                  </p>
                </div>

                {/* Core Trade Skills */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    Verified Trade Proficiencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorker.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Illustrative Work Examples */}
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900 mb-2">
                    Illustrative Sample Projects
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {selectedWorker.sampleWorkExamples.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer Box */}
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Demonstration Profile Notice:
                  </span>
                  This is a representative artisan profile created for hackathon demonstration. Clicking &quot;Request Contact&quot; records your intent in local storage. On the production platform, direct contact is initiated directly between homeowner and worker.
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-[#E2E8F0] bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-mono">
                  Direct Contact • 0% Brokerage
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => toggleContactRequest(selectedWorker.id)}
                    className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      requestedWorkerIds.includes(selectedWorker.id)
                        ? 'bg-[#14B8A6] text-slate-900 hover:bg-[#2dd4bf]'
                        : 'bg-[#0F766E] text-white hover:bg-[#115E59]'
                    }`}
                  >
                    {requestedWorkerIds.includes(selectedWorker.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Contact Request Recorded</span>
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        <span>Request Direct Contact</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================
          9. JOB POSTING MODAL & FORM
          ========================================================= */}
      <AnimatePresence>
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsPostModalOpen(false)}
              className="fixed inset-0 bg-[#111827]/75 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden z-10 max-h-[90vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-post-title"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/70">
                <div>
                  <span className="text-[11px] font-mono text-[#0F766E] font-bold uppercase tracking-wider block mb-1">
                    DIRECT EMPLOYER POSTING
                  </span>
                  <h2 id="modal-post-title" className="font-serif text-2xl font-bold text-[#111827]">
                    Post a Job Requirement
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
                  aria-label="Close posting dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handlePostSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                {postSuccessMessage ? (
                  <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h3 className="font-serif text-xl font-bold text-emerald-900">
                      Requirement Posted Successfully!
                    </h3>
                    <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                      Your job requirement has been stored in your session listings. In demonstration mode, no external notifications are dispatched.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Trade Category */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Trade Category *
                      </label>
                      <select
                        name="trade"
                        value={postForm.trade}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                      >
                        <option value="mason">Masonry (Brick, Stone, Plaster, Tile)</option>
                        <option value="carpenter">Carpentry (Woodwork, Furniture, Fittings)</option>
                        <option value="painter">Painting (Interior Putty, Exterior Wash)</option>
                        <option value="electrician">Electrical (Wiring, Sockets, Inverters)</option>
                        <option value="plumber">Plumbing (Pipelines, Drainage, Fixtures)</option>
                        <option value="general">General Labour (Loading, Site Assistance)</option>
                      </select>
                    </div>

                    {/* Job Title */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={postForm.title}
                        onChange={handleFormChange}
                        placeholder="e.g. Master Mason needed for 3-day bathroom wall remodeling"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                      />
                      {formErrors.title && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.title}
                        </p>
                      )}
                    </div>

                    {/* Locality & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Work Site Locality *
                        </label>
                        <input
                          type="text"
                          name="locality"
                          value={postForm.locality}
                          onChange={handleFormChange}
                          placeholder="e.g. Kothrud, Hadapsar"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                        />
                        {formErrors.locality && (
                          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.locality}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City
                        </label>
                        <select
                          name="city"
                          value={postForm.city}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                        >
                          <option value="Pune">Pune</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Thane">Thane</option>
                        </select>
                      </div>
                    </div>

                    {/* Pay Amount and Pay Unit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Offered Pay Amount (₹) *
                        </label>
                        <input
                          type="number"
                          name="payAmount"
                          value={postForm.payAmount}
                          onChange={handleFormChange}
                          placeholder="e.g. 950"
                          min="300"
                          step="50"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                        />
                        {formErrors.payAmount && (
                          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.payAmount}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Pay Unit
                        </label>
                        <select
                          name="payUnit"
                          value={postForm.payUnit}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                        >
                          <option value="per_day">Per Day (Daily Rate)</option>
                          <option value="per_job">Per Job (Fixed Contract)</option>
                        </select>
                      </div>
                    </div>

                    {/* Working Hours & Duration */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Daily Hours *
                        </label>
                        <input
                          type="text"
                          name="hours"
                          value={postForm.hours}
                          onChange={handleFormChange}
                          placeholder="e.g. 9:00 AM – 6:00 PM"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                        />
                        {formErrors.hours && (
                          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.hours}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Duration *
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={postForm.duration}
                          onChange={handleFormChange}
                          placeholder="e.g. 4 Days Fixed, Daily Shift"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                        />
                        {formErrors.duration && (
                          <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.duration}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Payment Timing */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Payment Timing &amp; Method
                      </label>
                      <input
                        type="text"
                        name="paymentTiming"
                        value={postForm.paymentTiming}
                        onChange={handleFormChange}
                        placeholder="e.g. Direct cash or UPI at end of each day"
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Description *
                      </label>
                      <textarea
                        name="description"
                        rows={3}
                        value={postForm.description}
                        onChange={handleFormChange}
                        placeholder="Describe the tasks required, materials provided on site, or tools worker should bring..."
                        className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0F766E]"
                      />
                      {formErrors.description && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.description}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm transition-colors shadow-sm cursor-pointer"
                      >
                        Publish Requirement (Demo)
                      </button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
