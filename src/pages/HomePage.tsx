import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  Languages,
  Banknote,
  Users,
  Award,
  LifeBuoy,
  CheckCircle2,
  Sparkles,
  Quote,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16 lg:space-y-24 py-8 lg:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE3D2] border border-[#DCD5C8] text-xs font-semibold text-[#15372E] mb-6 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F16B3A]" />
            <span>Artemis 2026 Initiative • India’s Fair Work Network</span>
          </motion.div>

          {/* Expressive Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#15372E] leading-[1.15]"
          >
            <span>Skilled Hands, </span>
            <span className="text-[#F16B3A] italic font-normal">Honorable Livelihoods, </span>
            <span className="block mt-1 sm:inline">Direct Work Without Middlemen.</span>
          </motion.h1>

          {/* Supporting Message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-[#4A5649] max-w-2xl mx-auto leading-relaxed"
          >
            Sahayak connects skilled informal workers—masons, carpenters, electricians, domestic staff, and daily wage earners—with verified local opportunities, guaranteed fair wages, and voice-first simplicity.
          </motion.p>

          {/* Two Prominent Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md mx-auto"
          >
            <Link
              to="/work"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#15372E] text-[#F5F0E6] text-base font-semibold shadow-md hover:bg-[#1C483D] active:scale-[0.99] transition-all duration-150 group focus-visible:outline-2 focus-visible:outline-[#15372E]"
            >
              <span>Find Work Near You</span>
              <ArrowRight className="w-5 h-5 text-[#C8EEA0] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/hire"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#F5F0E6] text-[#15372E] border-2 border-[#15372E] text-base font-semibold hover:bg-[#EAE3D2] active:scale-[0.99] transition-all duration-150 group focus-visible:outline-2 focus-visible:outline-[#15372E]"
            >
              <span>Hire a Skilled Worker</span>
              <Users className="w-5 h-5 text-[#F16B3A] group-hover:scale-110 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 pt-12 border-t border-[#DCD5C8] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex items-start gap-4 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#15372E] text-[#C8EEA0] shrink-0">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-[#15372E]">
                100%
              </div>
              <div className="font-semibold text-sm text-[#202820] mt-0.5">
                Direct Pay
              </div>
              <p className="text-xs text-[#4A5649] mt-1 leading-normal">
                Zero commission deductions or agent cuts
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex items-start gap-4 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#15372E] text-[#F16B3A] shrink-0">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-[#15372E]">
                Direct Connect
              </div>
              <div className="font-semibold text-sm text-[#202820] mt-0.5">
                Worker First
              </div>
              <p className="text-xs text-[#4A5649] mt-1 leading-normal">
                Direct phone and location access for genuine local hiring
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex items-start gap-4 shadow-2xs">
            <div className="p-3 rounded-xl bg-[#15372E] text-[#C8EEA0] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold font-serif text-[#15372E]">
                Legal
              </div>
              <div className="font-semibold text-sm text-[#202820] mt-0.5">
                Fair Standards
              </div>
              <p className="text-xs text-[#4A5649] mt-1 leading-normal">
                Protected by official labor wage benchmarks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PILLARS OF INTEGRITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#15372E]">
            Built Specifically for India’s Hardworking Backbone
          </h2>
          <p className="mt-3 text-[#4A5649] text-base">
            Thoughtful editorial craft, transparent terms, and deep dignity for every worker.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between hover:border-[#15372E] transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE3D2] text-[#15372E] flex items-center justify-center mb-4">
                <Banknote className="w-5 h-5 text-[#F16B3A]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#15372E] mb-2">
                Direct Connection, Zero Commission
              </h3>
              <p className="text-sm text-[#4A5649] leading-relaxed">
                Workers and job providers connect directly. No middlemen skimming off hard-earned daily wages.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between hover:border-[#15372E] transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE3D2] text-[#15372E] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#15372E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#15372E] mb-2">
                Guaranteed Fair Wage Benchmarks
              </h3>
              <p className="text-sm text-[#4A5649] leading-relaxed">
                Transparent wage guidelines anchored to official statutory rates and actual skill proficiencies.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between hover:border-[#15372E] transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE3D2] text-[#15372E] flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-[#F16B3A]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#15372E] mb-2">
                Portable Digital Trust Card
              </h3>
              <p className="text-sm text-[#4A5649] leading-relaxed">
                A permanent digital record of completed jobs, verified skills, and genuine customer recommendations.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between hover:border-[#15372E] transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE3D2] text-[#15372E] flex items-center justify-center mb-4">
                <LifeBuoy className="w-5 h-5 text-[#15372E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#15372E] mb-2">
                Worker Rights & 24/7 Helpline
              </h3>
              <p className="text-sm text-[#4A5649] leading-relaxed">
                Free legal guidance, dispute mediation, and workplace safety resources right when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKER SPOTLIGHT & TESTIMONIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#15372E] text-[#F5F0E6] relative overflow-hidden shadow-lg border border-[#1C483D]">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C483D] text-[#C8EEA0] text-xs font-semibold mb-6">
              <Quote className="w-3.5 h-3.5 text-[#F16B3A]" />
              <span>Voice from the Field</span>
            </div>

            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-[#F5F0E6]">
              “Sahayak connected me directly with honest homeowners in Pune. For the first time in 15 years, my entire daily wage arrived directly without an agent taking a 20% cut. It brings dignity back to our craft.”
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#C8EEA0] text-[#15372E] font-bold flex items-center justify-center font-serif text-xl">
                रा
              </div>
              <div>
                <div className="font-bold text-base text-[#F5F0E6] flex items-center gap-2">
                  <span>Rameshwar Jadhav</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#C8EEA0] text-[#15372E]">
                    Verified Artisan
                  </span>
                </div>
                <div className="text-xs text-[#F5F0E6]/75 mt-0.5">
                  Master Mason, Kothrud, Pune
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#EAE3D2] border border-[#DCD5C8] text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#15372E]">
            Ready to Experience Fair Work?
          </h2>
          <p className="mt-3 text-base text-[#4A5649] max-w-xl mx-auto">
            Whether you are seeking honest work or looking for dependable craftspeople, Sahayak is your trusted ally.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/work"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#15372E] text-[#F5F0E6] text-sm font-semibold hover:bg-[#1C483D] transition-colors"
            >
              Register to Find Work
            </Link>
            <Link
              to="/hire"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F5F0E6] border border-[#15372E] text-[#15372E] text-sm font-semibold hover:bg-[#DCD5C8] transition-colors"
            >
              Post a Job Requirement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
