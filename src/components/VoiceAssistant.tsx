import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  ArrowLeft,
  Menu,
  Send,
  HelpCircle,
  Briefcase,
  ShieldCheck,
  Languages,
  Info,
  ChevronRight,
} from 'lucide-react';
import { useLanguage, type Language } from '../i18n/LanguageContext';

// Safe interface for Web Speech API
interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

type MenuState = 'main' | 'info' | 'help' | 'faq' | 'language';

export const VoiceAssistant: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>('main');
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  // Initialize Speech Support safely without state-in-effect
  const [isSpeechSupported] = useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
    );
  });

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const lastSpokenRef = useRef<string>('');

  // Cancel any ongoing speech synthesis
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Native Browser Text-to-Speech
  const speakText = useCallback(
    (textToSpeak: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        const langCode = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
        utterance.lang = langCode;
        utterance.rate = 0.95;

        // Try to match appropriate voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(
          (v) =>
            v.lang.toLowerCase().replace('_', '-').startsWith(langCode.toLowerCase()) ||
            v.lang.toLowerCase().startsWith(language)
        );
        if (preferred) {
          utterance.voice = preferred;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        lastSpokenRef.current = textToSpeak;
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
      }
    },
    [language]
  );

  // Process text or voice input
  const handleProcessCommand = useCallback(
    (rawText: string) => {
      const text = rawText.toLowerCase().trim();

      // Check for numbers or spoken numerals
      if (
        text === '1' ||
        text.includes('one') ||
        text.includes('एक') ||
        text.includes('info') ||
        text.includes('जानकारी') ||
        text.includes('माहिती')
      ) {
        setMenuState('info');
        return;
      }
      if (
        text === '2' ||
        text.includes('two') ||
        text.includes('दो') ||
        text.includes('दोन') ||
        text.includes('job') ||
        text.includes('work') ||
        text.includes('काम')
      ) {
        speakText(
          language === 'hi'
            ? 'काम खोजें पृष्ठ पर ले जा रहे हैं...'
            : language === 'mr'
            ? 'काम शोधा पानावर नेत आहोत...'
            : 'Navigating to Find Work page...'
        );
        setTimeout(() => {
          setIsOpen(false);
          navigate('/work');
        }, 900);
        return;
      }
      if (
        text === '3' ||
        text.includes('three') ||
        text.includes('तीन') ||
        text.includes('help') ||
        text.includes('guide') ||
        text.includes('वेबसाइट') ||
        text.includes('संकेतस्थळ')
      ) {
        setMenuState('help');
        return;
      }
      if (
        text === '4' ||
        text.includes('four') ||
        text.includes('चार') ||
        text.includes('faq') ||
        text.includes('सवाल') ||
        text.includes('प्रश्न')
      ) {
        setMenuState('faq');
        return;
      }
      if (
        text === '5' ||
        text.includes('five') ||
        text.includes('पाँच') ||
        text.includes('पाच') ||
        text.includes('support') ||
        text.includes('सुरक्षा') ||
        text.includes('मदत') ||
        text.includes('अधिकार')
      ) {
        speakText(
          language === 'hi'
            ? 'सहायता और सुरक्षा पृष्ठ पर ले जा रहे हैं...'
            : language === 'mr'
            ? 'मदत आणि हक्क पानावर नेत आहोत...'
            : 'Navigating to Rights and Support page...'
        );
        setTimeout(() => {
          setIsOpen(false);
          navigate('/support');
        }, 900);
        return;
      }
      if (
        text === '6' ||
        text.includes('six') ||
        text.includes('छह') ||
        text.includes('सहा') ||
        text.includes('language') ||
        text.includes('भाषा')
      ) {
        setMenuState('language');
        return;
      }
      if (text === '7' || text.includes('seven') || text.includes('सात') || text.includes('main') || text.includes('मुख्य')) {
        setMenuState('main');
        return;
      }

      // Direct language switching via voice
      if (text.includes('hindi') || text.includes('हिंदी') || text.includes('हिन्दी')) {
        setLanguage('hi');
        setMenuState('main');
        return;
      }
      if (text.includes('marathi') || text.includes('मराठी')) {
        setLanguage('mr');
        setMenuState('main');
        return;
      }
      if (text.includes('english') || text.includes('अंग्रेजी') || text.includes('इंग्रजी')) {
        setLanguage('en');
        setMenuState('main');
        return;
      }

      // Action controls
      if (text.includes('repeat') || text.includes('दोबारा') || text.includes('पुन्हा')) {
        lastSpokenRef.current = '';
        setMenuState('main');
        return;
      }
      if (text.includes('back') || text.includes('पीछे') || text.includes('मागे')) {
        setMenuState('main');
        return;
      }
      if (text.includes('stop') || text.includes('बंद') || text.includes('थांबवा')) {
        stopSpeaking();
        return;
      }

      // Fallback if not recognized
      const notUnderstood =
        language === 'hi'
          ? 'माफ़ कीजिए, मैं समझ नहीं पाया। कृपया 1 से 7 में से कोई विकल्प चुनें।'
          : language === 'mr'
          ? 'माफ करा, मला समजले नाही. कृपया 1 ते 7 मधील एक पर्याय निवडा.'
          : 'Sorry, I did not understand that. Please select an option between 1 and 7.';
      speakText(notUnderstood);
    },
    [language, navigate, setLanguage, speakText, stopSpeaking]
  );

  const commandHandlerRef = useRef(handleProcessCommand);
  useEffect(() => {
    commandHandlerRef.current = handleProcessCommand;
  }, [handleProcessCommand]);

  // Initialize Speech Recognition once on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) return;

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript?.trim();
        if (transcript) {
          setInputText(transcript);
          commandHandlerRef.current(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        setRecognitionError(event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {
      // ignore
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Cancel speech on language change or panel close without cascading render
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [language, isOpen]);

  // Trigger speech when panel opens or menu changes
  useEffect(() => {
    if (!isOpen) return;

    let spokenContent = '';
    if (menuState === 'main') {
      spokenContent = `${t('voice.welcome')} ${t('voice.ivr.prompt')} 1. ${t('voice.ivr.1')}. 2. ${t('voice.ivr.2')}. 3. ${t('voice.ivr.3')}. 4. ${t('voice.ivr.4')}. 5. ${t('voice.ivr.5')}. 6. ${t('voice.ivr.6')}. 7. ${t('voice.ivr.7')}`;
    } else if (menuState === 'info') {
      spokenContent = `${t('voice.info.title')}. ${t('voice.info.desc')}`;
    } else if (menuState === 'help') {
      spokenContent = `${t('voice.guide.title')}. ${t('voice.guide.desc')}`;
    } else if (menuState === 'faq') {
      spokenContent = `${t('voice.faq.title')}. ${t('voice.faq.1.q')}: ${t('voice.faq.1.a')}. ${t('voice.faq.2.q')}: ${t('voice.faq.2.a')}`;
    } else if (menuState === 'language') {
      spokenContent =
        language === 'hi'
          ? 'कृपया अपनी भाषा चुनें: हिन्दी, मराठी, या अंग्रेज़ी।'
          : language === 'mr'
          ? 'कृपया आपली भाषा निवडा: मराठी, हिन्दी, किंवा इंग्रजी.'
          : 'Please choose your language: English, Hindi, or Marathi.';
    }

    if (spokenContent && spokenContent !== lastSpokenRef.current) {
      speakText(spokenContent);
    }
  }, [isOpen, menuState, language, speakText, t]);

  // Toggle speech recognition
  const toggleListening = () => {
    setRecognitionError(null);
    if (!recognitionRef.current) {
      setRecognitionError(t('voice.mic.unsupported'));
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        const langCode = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
        recognitionRef.current.lang = langCode;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
        setRecognitionError(err instanceof Error ? err.message : 'Microphone error');
      }
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const msg = inputText;
    setInputText('');
    handleProcessCommand(msg);
  };

  const handleRepeat = () => {
    lastSpokenRef.current = '';
    if (menuState === 'main') {
      speakText(
        `${t('voice.welcome')} ${t('voice.ivr.prompt')} 1. ${t('voice.ivr.1')}. 2. ${t('voice.ivr.2')}. 3. ${t('voice.ivr.3')}. 4. ${t('voice.ivr.4')}. 5. ${t('voice.ivr.5')}. 6. ${t('voice.ivr.6')}. 7. ${t('voice.ivr.7')}`
      );
    } else if (menuState === 'info') {
      speakText(`${t('voice.info.title')}. ${t('voice.info.desc')}`);
    } else if (menuState === 'help') {
      speakText(`${t('voice.guide.title')}. ${t('voice.guide.desc')}`);
    } else if (menuState === 'faq') {
      speakText(`${t('voice.faq.title')}. ${t('voice.faq.1.q')}: ${t('voice.faq.1.a')}`);
    } else if (menuState === 'language') {
      speakText(
        language === 'hi'
          ? 'कृपया अपनी भाषा चुनें'
          : language === 'mr'
          ? 'कृपया आपली भाषा निवडा'
          : 'Please select your language'
      );
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <aside aria-label="Voice Help Trigger" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            if (!next) stopSpeaking();
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold shadow-xl transition-all duration-200 border text-sm ${
            isOpen
              ? 'bg-[#111827] text-white border-slate-700'
              : 'bg-[#0F766E] hover:bg-[#0D655E] text-white border-teal-500 hover:scale-105 active:scale-95'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={t('voice.btn')}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14B8A6] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#14B8A6]" />
          </span>
          <Mic className="w-4 h-4 text-white shrink-0" />
          <span className="tracking-wide">{t('voice.btn')}</span>
        </button>
      </aside>

      {/* Voice Assistant Panel Modal */}
      {isOpen && (
        <section
          role="dialog"
          aria-labelledby="voice-assistant-title"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[80vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        >
          {/* Header */}
          <div className="bg-[#111827] text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0F766E] flex items-center justify-center text-[#14B8A6]">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h2 id="voice-assistant-title" className="font-serif font-bold text-sm tracking-tight">
                  {t('voice.title')}
                </h2>
                <p className="text-[11px] text-slate-400">{t('voice.subtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Stop / Resume speech */}
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  title={t('voice.action.stop')}
                  className="p-1.5 rounded-lg bg-teal-900/60 text-[#14B8A6] hover:bg-teal-900 transition-colors"
                  aria-label={t('voice.action.stop')}
                >
                  <VolumeX className="w-4 h-4 animate-pulse" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRepeat}
                  title={t('voice.action.repeat')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                  aria-label={t('voice.action.repeat')}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}

              {/* Close panel */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label={t('common.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Language Switcher Bar inside Assistant */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Language:</span>
            </span>
            <div className="inline-flex rounded-lg bg-white p-0.5 border border-slate-300">
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  language === 'hi' ? 'bg-[#0F766E] text-white' : 'text-slate-600 hover:text-[#0F766E]'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  language === 'mr' ? 'bg-[#0F766E] text-white' : 'text-slate-600 hover:text-[#0F766E]'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                  language === 'en' ? 'bg-[#0F766E] text-white' : 'text-slate-600 hover:text-[#0F766E]'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Dynamic Content Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1 text-xs sm:text-sm">
            {/* Listening Banner */}
            {isListening && (
              <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-[#0F766E] flex items-center gap-2 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="font-semibold text-xs">{t('voice.action.listen')}</span>
              </div>
            )}

            {/* Error or unsupported browser alert */}
            {recognitionError && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>{recognitionError}</span>
              </div>
            )}

            {!isSpeechSupported && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{t('voice.mic.unsupported')}</span>
              </div>
            )}

            {/* Welcome & Prompt */}
            <div className="bg-[#F8FAFC] border border-slate-200 p-3 rounded-2xl">
              <p className="font-bold text-slate-900">{t('voice.welcome')}</p>
              <p className="text-xs text-slate-500 mt-1">{t('voice.ivr.prompt')}</p>
            </div>

            {/* MAIN MENU (Options 1 to 7) */}
            {menuState === 'main' && (
              <div className="space-y-1.5" role="menu">
                <button
                  type="button"
                  onClick={() => setMenuState('info')}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0F766E] font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.1')}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/work');
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0F766E] font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.2')}
                    </span>
                  </div>
                  <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>

                <button
                  type="button"
                  onClick={() => setMenuState('help')}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0F766E] font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.3')}
                    </span>
                  </div>
                  <HelpCircle className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>

                <button
                  type="button"
                  onClick={() => setMenuState('faq')}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0F766E] font-bold text-xs flex items-center justify-center">
                      4
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.4')}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/support');
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0F766E] font-bold text-xs flex items-center justify-center">
                      5
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.5')}
                    </span>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>

                <button
                  type="button"
                  onClick={() => setMenuState('language')}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-teal-100 text-[#0F766E] font-bold text-xs flex items-center justify-center">
                      6
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.6')}
                    </span>
                  </div>
                  <Languages className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>

                <button
                  type="button"
                  onClick={handleRepeat}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-[#0F766E] hover:bg-teal-50/50 flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                      7
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-[#0F766E]">
                      {t('voice.ivr.7')}
                    </span>
                  </div>
                  <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-[#0F766E]" />
                </button>
              </div>
            )}

            {/* SUB-VIEW 1: Info */}
            {menuState === 'info' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{t('voice.info.title')}</h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{t('voice.info.desc')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/work');
                  }}
                  className="w-full py-2.5 px-3 bg-[#0F766E] text-white rounded-xl font-semibold text-xs hover:bg-[#115E59] transition-colors"
                >
                  {t('voice.ivr.2')}
                </button>
              </div>
            )}

            {/* SUB-VIEW 3: Guide / Help */}
            {menuState === 'help' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{t('voice.guide.title')}</h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{t('voice.guide.desc')}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/profile');
                    }}
                    className="p-2 rounded-xl border border-slate-300 font-semibold text-center hover:bg-slate-50"
                  >
                    {t('nav.profile')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/hire');
                    }}
                    className="p-2 rounded-xl border border-slate-300 font-semibold text-center hover:bg-slate-50"
                  >
                    {t('nav.hire')}
                  </button>
                </div>
              </div>
            )}

            {/* SUB-VIEW 4: FAQ */}
            {menuState === 'faq' && (
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-xs text-slate-900">{t('voice.faq.1.q')}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{t('voice.faq.1.a')}</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-xs text-slate-900">{t('voice.faq.2.q')}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{t('voice.faq.2.a')}</p>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <h4 className="font-bold text-xs text-slate-900">{t('voice.faq.3.q')}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{t('voice.faq.3.a')}</p>
                </div>
              </div>
            )}

            {/* SUB-VIEW 6: Language */}
            {menuState === 'language' && (
              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-medium">Select preferred language:</p>
                {(['hi', 'mr', 'en'] as Language[]).map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => {
                      setLanguage(lng);
                      setMenuState('main');
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left font-semibold flex items-center justify-between transition-colors ${
                      language === lng
                        ? 'border-[#0F766E] bg-teal-50 text-[#0F766E]'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{lng === 'hi' ? 'हिन्दी (Hindi)' : lng === 'mr' ? 'मराठी (Marathi)' : 'English'}</span>
                    {language === lng && <span className="text-xs font-bold">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assistant Action Bar (Back / Repeat / Main Menu) */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            {menuState !== 'main' ? (
              <button
                type="button"
                onClick={() => setMenuState('main')}
                className="inline-flex items-center gap-1 font-semibold text-[#0F766E] hover:text-[#115E59]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('voice.action.back')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRepeat}
                className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('voice.action.repeat')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setMenuState('main')}
              className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>{t('voice.action.mainMenu')}</span>
            </button>
          </div>

          {/* Footer Input Bar with Mic and Send Button */}
          <form
            onSubmit={handleManualSubmit}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] hover:bg-[#CCFBF1]'
              }`}
              title={isListening ? 'Stop listening' : t('voice.action.speak')}
              aria-label={t('voice.action.speak')}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('voice.input.placeholder')}
              className="flex-1 text-xs py-2 px-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0F766E]"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-[#0F766E] hover:bg-[#115E59] disabled:opacity-40 text-white transition-colors"
              aria-label={t('voice.action.send')}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
};
