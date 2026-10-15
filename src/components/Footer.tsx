import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#15372E] text-[#F5F0E6] border-t border-[#1C483D] mt-auto">
      {/* Upper Footer: Value Pledge */}
      <div className="border-b border-[#1C483D]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C483D] text-[#C8EEA0] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#F5F0E6]">Dignified Work, Fair Pay</h4>
                <p className="text-xs text-[#C8EEA0]/80 mt-0.5">Dignity for labor. Direct pay for sweat.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C483D] text-[#F16B3A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#F5F0E6]">Fair Wage Standards</h4>
                <p className="text-xs text-[#F5F0E6]/70 mt-0.5">Protected by official labor wage benchmarks</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C483D] text-[#C8EEA0] flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-base text-[#F5F0E6]">Call Sahayak Helpline</h4>
                <p className="text-xs text-[#C8EEA0] font-mono mt-0.5">1800-22-SAHAYAK (Toll Free)</p>
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
                <div className="w-10 h-10 rounded-xl bg-[#C8EEA0] text-[#15372E] flex items-center justify-center font-bold text-xl font-serif">
                  स
                </div>
                <div>
                  <span className="font-serif font-bold text-2xl tracking-tight text-[#F5F0E6]">
                    SAHAYAK
                  </span>{' '}
                  <span className="text-[#F16B3A] font-serif font-semibold text-lg">
                    (सहायक)
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#F5F0E6]/75 max-w-sm leading-relaxed">
                Sahayak is an open, dignified employment platform designed to end predatory intermediary commissions and uplift India’s informal workforce through transparent digital tools.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#C8EEA0] bg-[#1C483D]/60 py-2 px-3 rounded-lg border border-[#1C483D] w-fit">
              <Sparkles className="w-4 h-4 text-[#F16B3A]" />
              <span>Engineered for Artemis 2026 Hackathon • Open Standard for Labor Dignity</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C8EEA0] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#F5F0E6]/80 hover:text-[#C8EEA0] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-[#F5F0E6]/80 hover:text-[#C8EEA0] transition-colors">
                  Find Work
                </Link>
              </li>
              <li>
                <Link to="/hire" className="text-[#F5F0E6]/80 hover:text-[#C8EEA0] transition-colors">
                  Hire Workers
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-[#F5F0E6]/80 hover:text-[#C8EEA0] transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-[#F5F0E6]/80 hover:text-[#C8EEA0] transition-colors">
                  Rights & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C8EEA0] mb-4">
              Fair Labor Standards
            </h3>
            <p className="text-sm text-[#F5F0E6]/75 leading-relaxed">
              Transparent wage guidelines anchored to official statutory rates and actual skill proficiencies without middlemen cuts.
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#0E251F] border border-[#1C483D]">
              <p className="text-xs text-[#C8EEA0] font-medium leading-relaxed">
                Wage Dispute Assistance: If an employer delays or withholds your payment, our volunteer legal counselors intervene free of charge.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[#1C483D] flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F0E6]/60 gap-4">
          <p>© 2026 SAHAYAK (सहायक). Dedicated to the workers of India.</p>
          <p className="font-mono">Artemis 2026 • Fair Labor Platform</p>
        </div>
      </div>
    </footer>
  );
};
