import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Award, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      {/* Return link */}
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
          Digital Identity
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#15372E] tracking-tight">
          Worker Trust & Skill Card
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4A5649] leading-relaxed">
          Your portable digital credentials, customer endorsements, and verified earnings history.
        </p>
      </div>

      {/* Main Digital Identity Card */}
      <div className="max-w-3xl bg-[#FBF7F0] border border-[#DCD5C8] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Worker Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#DCD5C8]">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#15372E] text-[#C8EEA0] flex items-center justify-center font-serif text-3xl font-bold shrink-0 shadow-sm">
              सु
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#15372E]">
                  Sunil Shinde
                </h2>
                <ShieldCheck className="w-6 h-6 text-[#15372E]" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-[#F16B3A] mt-0.5">
                Senior Electrician & Wireman
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#4A5649] mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#15372E]" />
                <span>Dharavi, Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF8D9] text-[#15372E] text-xs font-semibold border border-[#C8EEA0]">
            <CheckCircle2 className="w-4 h-4 text-[#15372E]" />
            <span>Aadhaar & Skill Verified</span>
          </span>
        </div>

        {/* Quick Credentials Grid */}
        <div className="grid grid-cols-3 gap-4 py-6 border-b border-[#DCD5C8] text-center">
          <div className="p-3 rounded-2xl bg-[#EAE3D2]/50">
            <div className="text-lg sm:text-xl font-bold text-[#15372E] font-serif">12+ Years</div>
            <div className="text-xs text-[#4A5649] mt-0.5">Experience</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAE3D2]/50">
            <div className="text-lg sm:text-xl font-bold text-[#15372E] font-serif flex items-center justify-center gap-1">
              <Star className="w-4 h-4 text-[#F16B3A] fill-[#F16B3A]" />
              <span>4.9 / 5.0</span>
            </div>
            <div className="text-xs text-[#4A5649] mt-0.5">Client Rating</div>
          </div>
          <div className="p-3 rounded-2xl bg-[#EAE3D2]/50">
            <div className="text-lg sm:text-xl font-bold text-[#15372E] font-serif">84+</div>
            <div className="text-xs text-[#4A5649] mt-0.5">Jobs Completed</div>
          </div>
        </div>

        {/* Skills Proficiencies */}
        <div className="py-6 border-b border-[#DCD5C8]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#15372E] mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F16B3A]" />
            <span>Key Proficiencies</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DCD5C8] text-xs font-semibold text-[#202820]">
              Residential & Commercial Wiring
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DCD5C8] text-xs font-semibold text-[#202820]">
              MCB & Distribution Boards
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DCD5C8] text-xs font-semibold text-[#202820]">
              Inverter & Solar Storage Setup
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-[#F5F0E6] border border-[#DCD5C8] text-xs font-semibold text-[#202820]">
              Major Home Appliance Repair
            </span>
          </div>
        </div>

        {/* Recent Work History */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#15372E] mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#F16B3A]" />
            <span>Recent Completed Projects</span>
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#F5F0E6] border border-[#DCD5C8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm font-medium text-[#202820]">Dadar 3BHK Complete Rewiring (4 days)</span>
              <span className="text-xs font-semibold text-[#15372E] bg-[#EBF8D9] px-2.5 py-1 rounded-md self-start sm:self-auto">
                ₹4,800 • Paid in Full
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5F0E6] border border-[#DCD5C8] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm font-medium text-[#202820]">Bandra Retail Store Lighting Setup (6 days)</span>
              <span className="text-xs font-semibold text-[#15372E] bg-[#EBF8D9] px-2.5 py-1 rounded-md self-start sm:self-auto">
                ₹7,200 • Paid in Full
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
