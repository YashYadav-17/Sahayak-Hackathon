import React from 'react';
import { Link } from 'react-router-dom';
import {
  Banknote,
  ShieldCheck,
  Languages,
  Award,
  LifeBuoy,
  CheckCircle2,
  Sparkles,
  Quote,
  PhoneCall,
  ArrowRight,
} from 'lucide-react';
import { SahayakScrollStory } from '../components/animation/SahayakScrollStory';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. CINEMATIC SCROLL STORY (PROMOTED PRIMARY HERO) */}
      <section aria-label="Sahayak Story Scroll Experience">
        <SahayakScrollStory showHud={false} />
      </section>

      {/* 2. CONTINUOUS DEEP INK FLOW: CORE PLATFORM INTEGRITY & PROOF */}
      <div className="bg-[#111827] text-[#F8FAFC] border-t border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20 lg:space-y-28">
          
          {/* A. CORE TRUST STATISTICS GRID */}
          <section aria-label="Platform Statistics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-5 shadow-lg hover:border-slate-700 transition-all">
                <div className="p-3.5 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/40 shrink-0">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-white">
                    100%
                  </div>
                  <div className="font-semibold text-base text-[#14B8A6] mt-0.5">
                    Direct Payout
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Zero commission deductions or agent cuts. Every rupee arrives in the worker's hands.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-5 shadow-lg hover:border-slate-700 transition-all">
                <div className="p-3.5 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40 shrink-0">
                  <Languages className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-white">
                    Direct Connect
                  </div>
                  <div className="font-semibold text-base text-[#8B5CF6] mt-0.5">
                    Local &amp; Verified
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Direct contact between local artisans and hiring individuals. No middleman broker fee.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-5 shadow-lg hover:border-slate-700 transition-all">
                <div className="p-3.5 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/40 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-white">
                    Legal Standards
                  </div>
                  <div className="font-semibold text-base text-[#14B8A6] mt-0.5">
                    Statutory Fair Pay
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                    Rates anchored to official labor wage benchmarks and authentic trade proficiencies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* B. PILLARS OF INTEGRITY */}
          <section aria-label="Pillars of Integrity">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-[#14B8A6] text-xs font-mono font-semibold mb-4 border border-slate-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OPEN STANDARDS FOR LABOR DIGNITY</span>
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Built Specifically for India’s Hardworking Backbone
              </h2>
              <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
                Thoughtful editorial craft, transparent terms, and deep dignity for every informal craftsperson.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-[#14B8A6]/40 transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] flex items-center justify-center mb-5 border border-[#0F766E]/30">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Direct Connection, Zero Commission
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Workers and job providers connect directly. No middlemen skimming off hard-earned daily wages.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-[#14B8A6]/40 transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] flex items-center justify-center mb-5 border border-[#0F766E]/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Guaranteed Fair Wage Benchmarks
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Transparent wage guidelines anchored to official statutory rates and actual trade skill.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#8B5CF6]/20 text-[#8B5CF6] flex items-center justify-center mb-5 border border-[#8B5CF6]/30">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Portable Digital Trust Card
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    A permanent digital record of completed jobs, verified skills, and genuine customer recommendations.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-[#14B8A6]/40 transition-colors">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] flex items-center justify-center mb-5 border border-[#0F766E]/30">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    Worker Rights &amp; 24/7 Helpline
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Free legal guidance, dispute mediation, and workplace safety resources right when you need them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* C. WORKER SPOTLIGHT & TESTIMONIAL */}
          <section aria-label="Worker Spotlight">
            <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#0F766E]/20 border border-[#0F766E]/40 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F766E]/30 text-[#14B8A6] border border-[#0F766E]/40 text-xs font-semibold mb-6">
                  <Quote className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Voice from the Field</span>
                </div>

                <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-[#F8FAFC]">
                  “Sahayak connected me directly with honest homeowners in Pune. For the first time in 15 years, my entire daily wage arrived directly without an agent taking a 20% cut. It brings dignity back to our craft.”
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white font-bold flex items-center justify-center font-serif text-xl shadow-md border border-[#14B8A6]">
                    रा
                  </div>
                  <div>
                    <div className="font-bold text-base text-white flex items-center gap-2">
                      <span>Rameshwar Jadhav</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/30">
                        Verified Artisan
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Master Mason, Kothrud, Pune
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* D. HELPLINE & ADVOCACY CONNECTION (Non-Duplicate Closing Flow) */}
          <section aria-label="Support and Helpline">
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F766E]/20 text-[#14B8A6] border border-[#0F766E]/40 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Need Assistance or Advice?</h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Toll-free worker helpline: <span className="text-[#14B8A6] font-mono font-semibold">1800-22-SAHAYAK</span> (Free &amp; Confidential)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors"
                >
                  <span>Know Your Rights</span>
                  <ArrowRight className="w-4 h-4 text-[#14B8A6]" />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
