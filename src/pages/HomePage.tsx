import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Search,
  Banknote,
  PhoneCall,
  CheckCircle2,
  Users,
  Sparkles,
  Quote,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import { SahayakScrollStory } from '../components/animation/SahayakScrollStory';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. CINEMATIC SCROLL STORY (HERO EXPERIENCE) */}
      <section aria-label="Sahayak Story Scroll Experience">
        <SahayakScrollStory showHud={false} />
      </section>

      {/* 2. CONTINUOUS DEEP INK FLOW: CORE PLATFORM INTEGRITY & WORKFLOW */}
      <div className="bg-[#111827] text-[#F8FAFC] border-t border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20 lg:space-y-28">

          {/* A. THREE-STEP WORKFLOW: HOW SAHAYAK WORKS */}
          <section aria-label="How Sahayak Works">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[#14B8A6] text-xs font-mono font-semibold mb-4 border border-slate-700"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIMPLE, DIRECT WORKFLOW</span>
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight"
              >
                Three Simple Steps to Fair Work
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-3.5 text-slate-400 text-base sm:text-lg leading-relaxed"
              >
                Direct connections with transparent pay and zero middleman commissions.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-3xl text-slate-600 group-hover:text-[#14B8A6] transition-colors duration-200">
                      01
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/30 flex items-center justify-center">
                      <Search className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Find a job
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Search open daily wage or contract work near you. Filter by your trade—masonry, carpentry, painting, plumbing, or electrical.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-3xl text-slate-600 group-hover:text-[#8B5CF6] transition-colors duration-200">
                      02
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 flex items-center justify-center">
                      <Banknote className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Check the pay and hours
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    See the offered day rate, work duration, and exact site location clearly before committing. Clear terms with zero hidden fees.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.19 }}
                className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif font-bold text-3xl text-slate-600 group-hover:text-[#14B8A6] transition-colors duration-200">
                      03
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/30 flex items-center justify-center">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">
                    Contact the person hiring
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Call or message the employer directly to confirm details. Get paid directly upon completing the shift or contract.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* B. CORE PRINCIPLES: WHY DIRECT WORK MATTERS */}
          <section aria-label="Core Principles">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-4 shadow-sm"
              >
                <div className="p-3 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/30 shrink-0 mt-0.5">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-white">
                    Zero Commission Deductions
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Workers keep 100% of their earnings. Employers pay the agreed wage directly to the worker.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-4 shadow-sm"
              >
                <div className="p-3 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-white">
                    Clear Daily Wage Standards
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Transparent wage benchmarks anchored to statutory trade rates and actual skill proficiencies.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.19 }}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-4 shadow-sm"
              >
                <div className="p-3 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/30 shrink-0 mt-0.5">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-lg text-white">
                    Direct Communication
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    Speak directly with the homeowner or contractor. No agency gatekeepers filtering your calls.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* C. ARTISAN CASE STUDY & DEMONSTRATION SHOWCASE */}
          <section aria-label="Artisan Showcase">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0F766E]/20 border border-[#0F766E]/40 relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F766E]/30 text-[#14B8A6] border border-[#0F766E]/40 text-xs font-semibold mb-6">
                  <Quote className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Illustrative Artisan Case Study</span>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-[#F8FAFC]">
                  “When workers and homeowners speak directly, there is mutual respect. Terms are agreed before work starts, and the entire wage goes straight to the craftsperson without agency deductions.”
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0F766E] text-white font-bold flex items-center justify-center font-serif text-lg shadow-sm border border-[#14B8A6]">
                    रा
                  </div>
                  <div>
                    <div className="font-bold text-base text-white flex items-center gap-2">
                      <span>Rameshwar Jadhav</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30">
                        Demonstration Profile
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Master Mason &amp; Lime Plasterer • Kothrud, Pune
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* D. WORKER SUPPORT & STATUTORY INFORMATION (Truthful & Grounded) */}
          <section aria-label="Support and Information">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="p-7 sm:p-9 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/30 flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Worker Rights &amp; Benchmark Guidance</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Explore statutory trade rates, dispute mediation principles, and safety recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors duration-150 shadow-xs"
                >
                  <span>Find Worker Support</span>
                  <ArrowRight className="w-4 h-4 text-[#14B8A6]" />
                </Link>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
