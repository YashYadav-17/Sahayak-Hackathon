import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from './translations';

export type Language = 'hi' | 'en' | 'mr';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = 'sahayak_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'hi' || stored === 'mr') {
        return stored;
      }
    } catch {
      // ignore
    }
    // Default to Hindi on first visit or invalid stored value
    return 'hi';
  });

  const setLanguage = (newLang: Language) => {
    if (newLang !== 'hi' && newLang !== 'en' && newLang !== 'mr') return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  // Synchronize document attributes and title whenever language changes
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      if (language === 'hi') {
        document.title = 'SAHAYAK (सहायक) — सम्मानजनक काम, उचित मेहनताना';
      } else if (language === 'mr') {
        document.title = 'SAHAYAK (सहायक) — सन्मानपूर्वक काम, योग्य मोबदला';
      } else {
        document.title = 'SAHAYAK (सहायक) — Dignified Work, Fair Pay';
      }
    } catch {
      // ignore
    }
  }, [language]);

  const t = (key: string): string => {
    const langDict = TRANSLATIONS[language];
    if (langDict && key in langDict) {
      return langDict[key];
    }
    // Fallback to Hindi, then English dictionary
    const hiDict = TRANSLATIONS.hi;
    if (hiDict && key in hiDict) {
      return hiDict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && key in enDict) {
      return enDict[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
