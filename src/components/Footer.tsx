import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Sparkles, LifeBuoy, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0F17] text-[#F8FAFC] border-t border-slate-800 mt-auto">
      {/* Upper Footer: Value Pledge */}
      <div className="border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-800/80 text-[#14B8A6] border border-slate-700 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white">Direct Work &amp; Pay</h4>
                <p className="text-xs text-slate-400 mt-0.5">Workers keep 100% of their agreed daily earnings.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-800/80 text-[#8B5CF6] border border-slate-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white">Clear Upfront Terms</h4>
                <p className="text-xs text-slate-400 mt-0.5">Clear pay rates, hours, and site location before work starts.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-800/80 text-[#14B8A6] border border-slate-700 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white">Worker Resources</h4>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-1 text-xs text-[#14B8A6] hover:text-[#2dd4bf] font-medium mt-0.5 transition-colors"
                >
                  <span>Find worker support</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold text-lg font-serif border border-[#14B8A6]/40 shadow-xs">
                  स
                </div>
                <div>
                  <span className="font-serif font-bold text-xl tracking-tight text-white">
                    SAHAYAK
                  </span>{' '}
                  <span className="text-[#14B8A6] font-serif font-semibold text-base">
                    (सहायक)
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Sahayak is an open digital platform helping informal craftspeople and households connect directly for fair, transparent work with zero intermediary commission cuts.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#14B8A6] bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Engineered for Artemis 2026 Hackathon • Open Platform for Labor Dignity</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/hire" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Hire Workers
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-400 hover:text-white transition-colors duration-150">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-slate-400 hover:text-white transition-colors duration-150">
                  Rights &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Fair Terms and Principles */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
              Fair Work Principles
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Transparent wage guidelines anchored to official statutory rates and actual trade proficiencies, enabling direct agreement between parties.
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed">
                Informational guidance: Explore statutory wage benchmarks, dispute resolution resources, and safety recommendations in our support portal.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SAHAYAK (सहायक). Dedicated to informal workers across India.</p>
          <p className="font-mono text-[11px]">Artemis 2026 • Fair Labor Platform</p>
        </div>
      </div>
    </footer>
  );
};
