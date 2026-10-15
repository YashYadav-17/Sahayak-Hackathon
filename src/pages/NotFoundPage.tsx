import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[#0F766E] text-white flex items-center justify-center mx-auto mb-6 shadow-md">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-[#111827] mb-3">{t('notFound.title')}</h1>
      <p className="text-base sm:text-lg text-[#334155] mb-8">
        {t('notFound.desc')}
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('notFound.btn')}</span>
      </Link>
    </div>
  );
};
