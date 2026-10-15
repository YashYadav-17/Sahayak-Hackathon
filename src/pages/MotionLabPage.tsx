import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ShieldCheck, Banknote, Users } from 'lucide-react';
import { SahayakScrollStory } from '../components/animation/SahayakScrollStory';

export const MotionLabPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Motion Lab Developer Preview Banner */}
      <aside
        className="sticky top-0 z-50 bg-[#111827]/95 backdrop-blur-md text-[#F8FAFC] px-4 py-2.5 border-b border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md"
        aria-label="Motion Lab Developer Toolbar"
      >
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#14B8A6] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Live Site</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
            <span className="font-mono font-bold tracking-wider text-slate-200">
              MOTION LAB // SEQUENCE PREVIEW
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <span className="hidden sm:inline">LOCKED PALETTE:</span>
          <span className="w-3 h-3 rounded-full bg-[#111827] border border-slate-600" title="Deep Ink #111827" />
          <span className="w-3 h-3 rounded-full bg-[#F8FAFC] border border-slate-400" title="Soft Canvas #F8FAFC" />
          <span className="w-3 h-3 rounded-full bg-[#0F766E]" title="Primary Teal #0F766E" />
          <span className="w-3 h-3 rounded-full bg-[#14B8A6]" title="Bright Teal #14B8A6" />
          <span className="w-3 h-3 rounded-full bg-[#DBEAFE] border border-slate-400" title="Mist Blue #DBEAFE" />
          <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" title="Soft Violet #8B5CF6" />
          <span className="px-2 py-0.5 rounded bg-[#0F766E]/30 text-[#14B8A6] font-bold">
            STAGE QA
          </span>
        </div>
      </aside>

      {/* THE ISOLATED GSAP SCROLL STORY PROTOTYPE (with debug HUD enabled for QA) */}
      <section aria-label="Cinematic Scroll Sequence">
        <SahayakScrollStory showHud={true} />
      </section>

      {/* CONTINUOUS PLATFORM SECTION (Replaces all pin-test debug content) */}
      <section className="bg-[#111827] text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-[#14B8A6] text-xs font-mono font-semibold mb-6 border border-slate-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT PLATFORM ARCHITECTURE</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Fair Work Standards for Informal Craftspeople
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed mb-10">
            Sahayak connects verified informal workers directly with residential and commercial opportunities with zero intermediary commission deductions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left max-w-3xl mx-auto mb-12">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <Banknote className="w-5 h-5 text-[#14B8A6] mb-3" />
              <div className="font-bold text-sm text-white">100% Direct Payout</div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Direct payment from employer to worker bank account or UPI.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-[#8B5CF6] mb-3" />
              <div className="font-bold text-sm text-white">Aadhaar &amp; Skill Verification</div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Portable trust profiles preserving verified ratings and completed jobs.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <Users className="w-5 h-5 text-[#14B8A6] mb-3" />
              <div className="font-bold text-sm text-white">Direct Phone Contact</div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Direct phone calls without intermediate call centers or commission cuts.</p>
            </div>
          </div>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-sm font-semibold transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 text-[#14B8A6]" />
              <span>Back to Sahayak Live Home</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MotionLabPage;
