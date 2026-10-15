import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, CheckCircle, Shield, Sparkles } from 'lucide-react';

export const HirePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Back button */}
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
      <div className="max-w-3xl mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-[#EAE3D2] text-[#15372E] text-xs font-semibold mb-3">
          Hire Talent
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#15372E] tracking-tight">
          Hire Reliable Skilled Workers
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4A5649] leading-relaxed">
          Directly employ background-verified local artisans without agent commission fees.
        </p>
      </div>

      {/* 3 Step Hiring Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#15372E] text-[#C8EEA0] flex items-center justify-center mb-5">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#15372E] mb-2">
              1. Describe the Task
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              State the required skill, location, and dates in seconds using text or direct call.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#15372E] text-[#F16B3A] flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#15372E] mb-2">
              2. Review Verified Profiles
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              Browse local artisans with verifiable job histories, client reviews, and transparent daily rates.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#15372E] text-[#C8EEA0] flex items-center justify-center mb-5">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-xl font-bold text-[#15372E] mb-2">
              3. Pay Direct & Fairly
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              Pay the agreed amount directly upon satisfactory work completion with zero platform cuts.
            </p>
          </div>
        </div>
      </div>

      {/* Fair Hiring Pledge & CTA Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#15372E] text-[#F5F0E6] flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C8EEA0] mb-3">
            <Shield className="w-4 h-4 text-[#F16B3A]" />
            <span>The Sahayak Fair Hiring Pledge</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E6] mb-3">
            Every worker on our platform is treated with dignity and guaranteed fair pay.
          </h2>
          <p className="text-sm text-[#F5F0E6]/80 leading-relaxed">
            Sahayak is an open, dignified employment platform designed to end predatory intermediary commissions and uplift India’s informal workforce.
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 px-8 py-4 rounded-2xl bg-[#F16B3A] text-white font-semibold text-base shadow-md hover:bg-[#DE5724] transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-white"
        >
          <Sparkles className="w-5 h-5 text-[#C8EEA0]" />
          <span>Post a Requirement Now</span>
        </button>
      </div>
    </div>
  );
};
