import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, Scale, AlertOctagon, PhoneCall, FileText } from 'lucide-react';

export const SupportPage: React.FC = () => {
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
      <div className="max-w-3xl mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-[#EAE3D2] text-[#15372E] text-xs font-semibold mb-3">
          Rights & Aid
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#15372E] tracking-tight">
          Worker Rights, Safety & Support
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#4A5649] leading-relaxed">
          Statutory wage benchmarks, legal protections, and free dispute mediation for informal labor.
        </p>
      </div>

      {/* 4 Support Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-8 rounded-3xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#15372E] text-[#C8EEA0] flex items-center justify-center mb-6">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#15372E] mb-3">
              Official Minimum Wage Standards (2026)
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              Inspect officially gazetted minimum wage rates for skilled, semi-skilled, and daily wage labor in your district.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#15372E] text-[#F16B3A] flex items-center justify-center mb-6">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#15372E] mb-3">
              Wage Dispute & Non-Payment Assistance
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              If an employer delays or withholds your payment, our volunteer legal counselors intervene free of charge.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#15372E] text-[#C8EEA0] flex items-center justify-center mb-6">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#15372E] mb-3">
              On-Site Health & Safety Protocol
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              Mandatory personal protective gear standards and emergency workplace injury compensation guidelines.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#FBF7F0] border border-[#DCD5C8] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#15372E] text-[#F16B3A] flex items-center justify-center mb-6">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#15372E] mb-3">
              24/7 Community Support Line
            </h2>
            <p className="text-sm text-[#4A5649] leading-relaxed">
              Direct toll-free connection to local labor welfare boards and grassroots worker unions.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#15372E] text-[#F5F0E6] flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#1C483D]">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-[#1C483D] text-[#C8EEA0]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F0E6]">
              Call Sahayak Helpline
            </h2>
            <p className="text-sm text-[#C8EEA0] mt-1 font-mono font-semibold">
              1800-22-SAHAYAK (Toll Free)
            </p>
          </div>
        </div>

        <a
          href="tel:1800220000"
          className="shrink-0 px-8 py-4 rounded-2xl bg-[#F16B3A] text-white font-semibold text-base shadow-md hover:bg-[#DE5724] transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-white"
        >
          <PhoneCall className="w-5 h-5 text-[#C8EEA0]" />
          <span>Call Support Helpline</span>
        </a>
      </div>
    </div>
  );
};
