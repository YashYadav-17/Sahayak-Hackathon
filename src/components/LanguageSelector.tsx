import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  isCompact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  isCompact = false,
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection / भाषा निवड"
      className={`inline-flex items-center rounded-xl border border-[#CBD5E1] bg-white p-0.5 shadow-2xs ${className}`}
    >
      <span className="sr-only">Select interface language</span>
      {!isCompact && (
        <span className="pl-2 pr-1 text-slate-400" aria-hidden="true">
          <Languages className="w-3.5 h-3.5" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        aria-pressed={language === 'hi'}
        className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
          language === 'hi'
            ? 'bg-[#0F766E] text-white shadow-2xs'
            : 'text-slate-600 hover:text-[#0F766E] hover:bg-slate-50'
        }`}
      >
        हिन्दी
      </button>
      <button
        type="button"
        onClick={() => setLanguage('mr')}
        aria-pressed={language === 'mr'}
        className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
          language === 'mr'
            ? 'bg-[#0F766E] text-white shadow-2xs'
            : 'text-slate-600 hover:text-[#0F766E] hover:bg-slate-50'
        }`}
      >
        मराठी
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
          language === 'en'
            ? 'bg-[#0F766E] text-white shadow-2xs'
            : 'text-slate-600 hover:text-[#0F766E] hover:bg-slate-50'
        }`}
      >
        English
      </button>
    </div>
  );
};
