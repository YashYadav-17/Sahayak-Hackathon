import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Sparkles, LifeBuoy, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

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
                <h4 className="font-semibold text-sm sm:text-base text-white">{t('footer.pledge1.title')}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{t('footer.pledge1.desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-800/80 text-[#8B5CF6] border border-slate-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white">{t('footer.pledge2.title')}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{t('footer.pledge2.desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-800/80 text-[#14B8A6] border border-slate-700 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white">{t('footer.pledge3.title')}</h4>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-1 text-xs text-[#14B8A6] hover:text-[#2dd4bf] font-medium mt-0.5 transition-colors"
                >
                  <span>{t('footer.pledge3.link')}</span>
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
                {t('footer.about')}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#14B8A6] bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>{t('footer.hackathon')}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
              {t('footer.navTitle')}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-150">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-slate-400 hover:text-white transition-colors duration-150">
                  {t('nav.work')}
                </Link>
              </li>
              <li>
                <Link to="/hire" className="text-slate-400 hover:text-white transition-colors duration-150">
                  {t('nav.hire')}
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-slate-400 hover:text-white transition-colors duration-150">
                  {t('nav.profile')}
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-slate-400 hover:text-white transition-colors duration-150">
                  {t('nav.support')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Fair Terms and Principles */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#14B8A6] mb-4">
              {t('footer.principlesTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('footer.principlesDesc')}
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('footer.principlesNote')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t('footer.copyright')}</p>
          <p className="font-mono text-[11px]">Artemis 2026 • Fair Labor Platform</p>
        </div>
      </div>
    </footer>
  );
};
