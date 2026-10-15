import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Send,
  Languages,
  Info,
  PhoneCall,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Menu,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

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

interface KeypadButtonConfig {
  key: string;
  subTextKey: string;
  icon?: string;
  actionType: 'info' | 'work' | 'help' | 'faq' | 'support' | 'language' | 'profile' | 'hire' | 'stop' | 'back' | 'repeat' | 'main';
}

const KEYPAD_BUTTONS: KeypadButtonConfig[] = [
  { key: '1', subTextKey: 'keypad.1.label', actionType: 'info' },
  { key: '2', subTextKey: 'keypad.2.label', actionType: 'work' },
  { key: '3', subTextKey: 'keypad.3.label', actionType: 'help' },
  { key: '4', subTextKey: 'keypad.4.label', actionType: 'faq' },
  { key: '5', subTextKey: 'keypad.5.label', actionType: 'support' },
  { key: '6', subTextKey: 'keypad.6.label', actionType: 'language' },
  { key: '7', subTextKey: 'keypad.7.label', actionType: 'profile' },
  { key: '8', subTextKey: 'keypad.8.label', actionType: 'hire' },
  { key: '9', subTextKey: 'keypad.9.label', actionType: 'stop' },
  { key: '*', subTextKey: 'keypad.star.label', actionType: 'back' },
  { key: '0', subTextKey: 'keypad.0.label', actionType: 'repeat' },
  { key: '#', subTextKey: 'keypad.hash.label', actionType: 'main' },
];

export const VoiceAssistant: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [menuState, setMenuState] = useState<MenuState>('main');
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [lastActionMessage, setLastActionMessage] = useState<string>('');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  // Check speech recognition capability once on client without setState in effect
  const [isSpeechSupported] = useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
    );
  });

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const lastSpokenRef = useRef<string>('');
  const [isNavigating, setIsNavigating] = useState(false);

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

        // Try to match preferred voice
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

  // Navigate safely without audio overlap
  const handleNavigate = useCallback(
    (path: string, confirmationMsg: string) => {
      setIsNavigating(true);
      setLastActionMessage(confirmationMsg);
      speakText(confirmationMsg);

      setTimeout(() => {
        setIsOpen(false);
        setIsNavigating(false);
        navigate(path);
      }, 800);
    },
    [navigate, speakText]
  );

  // Core Keypad Handler
  const handleKeypadPress = useCallback(
    (keyVal: string) => {
      // Tactile visual flash
      setActiveKey(keyVal);
      setTimeout(() => setActiveKey(null), 300);

      switch (keyVal) {
        case '1':
          setMenuState('info');
          setLastActionMessage(t('voice.info.title'));
          break;

        case '2':
          handleNavigate(
            '/work',
            language === 'hi'
              ? 'काम खोजें पृष्ठ पर ले जा रहे हैं...'
              : language === 'mr'
              ? 'काम शोधा पानावर नेत आहोत...'
              : 'Navigating to Find Work page...'
          );
          break;

        case '3':
          setMenuState('help');
          setLastActionMessage(t('voice.guide.title'));
          break;

        case '4':
          setMenuState('faq');
          setLastActionMessage(t('voice.faq.title'));
          break;

        case '5':
          handleNavigate(
            '/support',
            language === 'hi'
              ? 'अधिकार और सुरक्षा पृष्ठ पर ले जा रहे हैं...'
              : language === 'mr'
              ? 'हक्क आणि सुरक्षा पानावर नेत आहोत...'
              : 'Navigating to Rights and Support page...'
          );
          break;

        case '6':
          setMenuState('language');
          setLastActionMessage(
            language === 'hi'
              ? 'भाषा चयन: हिन्दी, मराठी, या अंग्रेज़ी'
              : language === 'mr'
              ? 'भाषा निवड: मराठी, हिन्दी, किंवा इंग्रजी'
              : 'Select Language: English, Hindi, or Marathi'
          );
          break;

        case '7':
          handleNavigate(
            '/profile',
            language === 'hi'
              ? 'मेरी जानकारी पृष्ठ पर ले जा रहे हैं...'
              : language === 'mr'
              ? 'माझी माहिती पानावर नेत आहोत...'
              : 'Navigating to Worker Profile page...'
          );
          break;

        case '8':
          handleNavigate(
            '/hire',
            language === 'hi'
              ? 'कामगार खोजें पृष्ठ पर ले जा रहे हैं...'
              : language === 'mr'
              ? 'कामगार शोधा पानावर नेत आहोत...'
              : 'Navigating to Hire Workers page...'
          );
          break;

        case '9':
          stopSpeaking();
          setLastActionMessage(
            language === 'hi' ? 'आवाज़ बंद की गई।' : language === 'mr' ? 'आवाज थांबवला.' : 'Audio stopped.'
          );
          break;

        case '*':
          // Back to main
          setMenuState('main');
          setLastActionMessage(
            language === 'hi' ? 'मुख्य मेनू पर वापस आए।' : language === 'mr' ? 'मुख्य मेनूवर परत आले.' : 'Returned to Main Menu.'
          );
          break;

        case '0':
          // Repeat current menu
          lastSpokenRef.current = '';
          setLastActionMessage(
            language === 'hi' ? 'दोबारा सुन रहे हैं...' : language === 'mr' ? 'पुन्हा ऐकत आहोत...' : 'Repeating menu...'
          );
          break;

        case '#':
          // Return to root main menu
          setMenuState('main');
          lastSpokenRef.current = '';
          setLastActionMessage(
            language === 'hi' ? 'मुख्य मेनू' : language === 'mr' ? 'मुख्य मेनू' : 'Main Menu'
          );
          break;

        default:
          break;
      }
    },
    [handleNavigate, language, stopSpeaking, t]
  );

  // Map voice words to keypad actions
  const handleProcessSpokenText = useCallback(
    (rawTranscript: string) => {
      const text = rawTranscript.toLowerCase().trim();

      if (text === '1' || text.includes('one') || text.includes('एक') || text.includes('info') || text.includes('जानकारी') || text.includes('माहिती')) {
        handleKeypadPress('1');
      } else if (text === '2' || text.includes('two') || text.includes('दो') || text.includes('दोन') || text.includes('job') || text.includes('work') || text.includes('काम')) {
        handleKeypadPress('2');
      } else if (text === '3' || text.includes('three') || text.includes('तीन') || text.includes('help') || text.includes('guide') || text.includes('सहायता')) {
        handleKeypadPress('3');
      } else if (text === '4' || text.includes('four') || text.includes('चार') || text.includes('faq') || text.includes('सवाल') || text.includes('प्रश्न')) {
        handleKeypadPress('4');
      } else if (text === '5' || text.includes('five') || text.includes('पाँच') || text.includes('पाच') || text.includes('support') || text.includes('सुरक्षा') || text.includes('हक्क')) {
        handleKeypadPress('5');
      } else if (text === '6' || text.includes('six') || text.includes('छह') || text.includes('सहा') || text.includes('language') || text.includes('भाषा')) {
        handleKeypadPress('6');
      } else if (text === '7' || text.includes('seven') || text.includes('सात') || text.includes('profile') || text.includes('कार्ड') || text.includes('बायो')) {
        handleKeypadPress('7');
      } else if (text === '8' || text.includes('eight') || text.includes('आठ') || text.includes('hire') || text.includes('कामगार') || text.includes('कारीगर')) {
        handleKeypadPress('8');
      } else if (text === '9' || text.includes('nine') || text.includes('नौ') || text.includes('नऊ') || text.includes('stop') || text.includes('शांत') || text.includes('बंद')) {
        handleKeypadPress('9');
      } else if (text.includes('back') || text.includes('पीछे') || text.includes('मागे')) {
        handleKeypadPress('*');
      } else if (text.includes('repeat') || text.includes('दोबारा') || text.includes('पुन्हा')) {
        handleKeypadPress('0');
      } else if (text.includes('main') || text.includes('मुख्य') || text.includes('होम')) {
        handleKeypadPress('#');
      } else {
        // Fallback guidance
        const fallbackText =
          language === 'hi'
            ? 'माफ़ कीजिए, कृपया 1 से 9, *, 0, या # दबाएँ।'
            : language === 'mr'
            ? 'माफ करा, कृपया 1 ते 9, *, 0, किंवा # दाबा.'
            : 'Please press or speak any key from 1 to 9, star, zero, or hash.';
        speakText(fallbackText);
      }
    },
    [handleKeypadPress, language, speakText]
  );

  const commandHandlerRef = useRef(handleProcessSpokenText);
  useEffect(() => {
    commandHandlerRef.current = handleProcessSpokenText;
  }, [handleProcessSpokenText]);

  // Physical Keyboard Listener (0-9, *, #)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept if user is typing in the input box
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      const key = e.key;
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '#'].includes(key)) {
        e.preventDefault();
        handleKeypadPress(key);
      } else if (key === 'Escape') {
        setIsOpen(false);
        stopSpeaking();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeypadPress, stopSpeaking]);

  // Initialize Speech Recognition once
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

  // Cancel speech on language change or panel close
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [language, isOpen]);

  // Trigger speech on panel open or menu state change
  useEffect(() => {
    if (!isOpen) return;

    let spokenContent = '';
    if (menuState === 'main') {
      spokenContent =
        language === 'hi'
          ? 'सहायक आईवीआर में आपका स्वागत है। 1 जानकारी, 2 काम खोजें, 3 वेबसाइट मदद, 4 सवाल-जवाब, 5 अधिकार, 6 भाषा, 7 मेरी जानकारी, 8 कामगार खोजें, 9 आवाज़ बंद, स्टार पीछे, शून्य दोबारा सुनें, हैश मुख्य मेनू।'
          : language === 'mr'
          ? 'सहायक आयव्हीआरमध्ये आपले स्वागत आहे. 1 माहिती, 2 काम शोधा, 3 संकेतस्थळ मदत, 4 प्रश्न-उत्तरे, 5 हक्क, 6 भाषा, 7 माझी माहिती, 8 कामगार शोधा, 9 आवाज बंद, स्टार मागे, शून्य पुन्हा ऐका, हॅश मुख्य मेनू.'
          : 'Welcome to Sahayak IVR. 1 Find Info, 2 Find Work, 3 Site Help, 4 FAQs, 5 Rights & Safety, 6 Language, 7 My Profile, 8 Hire Workers, 9 Stop Audio, Star Go Back, Zero Repeat, Hash Main Menu.';
    } else if (menuState === 'info') {
      spokenContent = `${t('voice.info.title')}. ${t('voice.info.desc')}`;
    } else if (menuState === 'help') {
      spokenContent = `${t('voice.guide.title')}. ${t('voice.guide.desc')}`;
    } else if (menuState === 'faq') {
      spokenContent = `${t('voice.faq.title')}. 1: ${t('voice.faq.1.q')}. ${t('voice.faq.1.a')}. 2: ${t('voice.faq.2.q')}. ${t('voice.faq.2.a')}`;
    } else if (menuState === 'language') {
      spokenContent =
        language === 'hi'
          ? 'भाषा चयन करें: 1 हिन्दी, 2 मराठी, 3 अंग्रेज़ी।'
          : language === 'mr'
          ? 'भाषा निवडा: 1 हिन्दी, 2 मराठी, 3 इंग्रजी.'
          : 'Select language: 1 Hindi, 2 Marathi, 3 English.';
    }

    if (spokenContent && spokenContent !== lastSpokenRef.current) {
      speakText(spokenContent);
    }
  }, [isOpen, menuState, language, speakText, t]);

  // Toggle Speech Recognition
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
    handleProcessSpokenText(msg);
  };

  return (
    <>
      {/* Floating Launcher Trigger */}
      <aside aria-label="Voice Help Trigger" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            if (!next) stopSpeaking();
          }}
          className={`group flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full font-semibold shadow-2xl transition-all duration-200 border text-xs sm:text-sm ${
            isOpen
              ? 'bg-[#111827] text-white border-slate-700 shadow-teal-950/40'
              : 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] hover:from-[#0D655E] hover:to-[#0F766E] text-white border-teal-400/30 hover:scale-105 active:scale-95 shadow-teal-900/40'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={t('voice.btn')}
        >
          {/* Pulsing Signal Wave */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          <PhoneCall className="w-4 h-4 text-white shrink-0 group-hover:rotate-12 transition-transform duration-200" />
          <span className="font-semibold tracking-wide drop-shadow-xs">{t('voice.btn')}</span>
        </button>
      </aside>

      {/* Premium Telephone IVR Keypad Panel */}
      {isOpen && (
        <section
          role="dialog"
          aria-labelledby="keypad-assistant-title"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[85vh] flex flex-col bg-[#111827] rounded-[28px] shadow-2xl border border-slate-700/80 overflow-hidden text-slate-100 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
        >
          {/* 1. TOP HEADER & TELEPHONE STATUS */}
          <div className="bg-slate-900/90 px-4 py-3 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#14B8A6] flex items-center justify-center text-white shadow-sm shadow-teal-900">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 id="keypad-assistant-title" className="font-serif font-bold text-sm tracking-tight text-white">
                    {t('voice.title')}
                  </h2>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-950/80 text-teal-400 border border-teal-800/60">
                    IVR
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{t('voice.subtitle')}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Indicator & Quick Toggle */}
              <div className="inline-flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    language === 'hi' ? 'bg-[#0F766E] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="हिन्दी"
                >
                  HI
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mr')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    language === 'mr' ? 'bg-[#0F766E] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="मराठी"
                >
                  MR
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    language === 'en' ? 'bg-[#0F766E] text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="English"
                >
                  EN
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label={t('common.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. DIGITAL OLED DISPLAY CONSOLE (Activity & Sound Waveform) */}
          <div className="p-3.5 bg-gradient-to-b from-[#0B1120] to-[#0F172A] border-b border-slate-800 text-slate-200">
            {/* Status Bar with Soundwave Animation */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isListening
                      ? 'bg-red-500 animate-ping'
                      : isSpeaking
                      ? 'bg-[#14B8A6] animate-pulse'
                      : 'bg-emerald-400'
                  }`}
                />
                <span className="font-mono text-slate-400 text-[10px]">
                  {isListening
                    ? t('keypad.status.listening')
                    : isSpeaking
                    ? t('keypad.status.speaking')
                    : isNavigating
                    ? t('keypad.status.navigating')
                    : t('keypad.status.ready')}
                </span>
              </div>

              {/* Sound Waveform Bars */}
              <div className="flex items-center gap-0.5 h-3" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6, 7].map((bar) => {
                  const isDancing = isSpeaking || isListening;
                  const height = isDancing
                    ? bar % 2 === 0
                      ? 'h-3'
                      : bar % 3 === 0
                      ? 'h-2'
                      : 'h-1.5'
                    : 'h-1';
                  return (
                    <span
                      key={bar}
                      className={`w-0.5 rounded-full transition-all duration-150 ${height} ${
                        isListening
                          ? 'bg-red-400'
                          : isSpeaking
                          ? 'bg-[#14B8A6]'
                          : 'bg-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Readout Display Screen */}
            <div className="min-h-[64px] flex flex-col justify-center">
              {menuState === 'main' && (
                <div>
                  <p className="text-xs font-semibold text-teal-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>{t('voice.welcome')}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {t('keypad.instruction')}
                  </p>
                  {lastActionMessage && (
                    <p className="text-[10px] text-amber-300 font-mono mt-1">
                      ► {lastActionMessage}
                    </p>
                  )}
                </div>
              )}

              {/* Sub-view: 1. Info */}
              {menuState === 'info' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300">{t('voice.info.title')}</span>
                    <button
                      type="button"
                      onClick={() => handleKeypadPress('*')}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>{t('keypad.star.label')} (*)</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-3">
                    {t('voice.info.desc')}
                  </p>
                </div>
              )}

              {/* Sub-view: 3. Help */}
              {menuState === 'help' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300">{t('voice.guide.title')}</span>
                    <button
                      type="button"
                      onClick={() => handleKeypadPress('*')}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>{t('keypad.star.label')} (*)</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug line-clamp-3">
                    {t('voice.guide.desc')}
                  </p>
                </div>
              )}

              {/* Sub-view: 4. FAQ */}
              {menuState === 'faq' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300">{t('voice.faq.title')}</span>
                    <button
                      type="button"
                      onClick={() => handleKeypadPress('*')}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>{t('keypad.star.label')} (*)</span>
                    </button>
                  </div>
                  <p className="text-[11px] font-bold text-white line-clamp-1">{t('voice.faq.1.q')}</p>
                  <p className="text-[10px] text-slate-300 leading-snug line-clamp-2">{t('voice.faq.1.a')}</p>
                </div>
              )}

              {/* Sub-view: 6. Language */}
              {menuState === 'language' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5" />
                      <span>Choose Language</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleKeypadPress('*')}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                    >
                      <ArrowLeft className="w-3 h-3" />
                      <span>{t('keypad.star.label')} (*)</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('hi');
                        setMenuState('main');
                      }}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        language === 'hi' ? 'bg-[#0F766E] border-teal-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      1. हिन्दी
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('mr');
                        setMenuState('main');
                      }}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        language === 'mr' ? 'bg-[#0F766E] border-teal-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      2. मराठी
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('en');
                        setMenuState('main');
                      }}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        language === 'en' ? 'bg-[#0F766E] border-teal-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      3. English
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. TACTILE 3 × 4 TELEPHONE KEYPAD GRID */}
          <div className="p-3 sm:p-4 bg-slate-900/60">
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5" role="group" aria-label="Telephone Keypad">
              {KEYPAD_BUTTONS.map((btn) => {
                const isFlash = activeKey === btn.key;
                const label = t(btn.subTextKey);

                return (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => handleKeypadPress(btn.key)}
                    className={`group relative flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 rounded-2xl border transition-all duration-150 select-none ${
                      isFlash
                        ? 'bg-teal-900 border-[#14B8A6] shadow-md shadow-teal-500/30 scale-95 ring-2 ring-[#14B8A6]'
                        : 'bg-gradient-to-b from-slate-800/90 to-slate-900/95 border-slate-700/60 hover:border-teal-500/50 hover:from-slate-700/90 hover:to-slate-800/95 shadow-md shadow-black/40 active:scale-95'
                    }`}
                    aria-label={`Key ${btn.key}: ${label}`}
                  >
                    {/* Primary Large Key Digit */}
                    <span className="font-mono font-bold text-lg sm:text-xl text-slate-100 group-hover:text-teal-300 tracking-wider">
                      {btn.key}
                    </span>

                    {/* Secondary Sub-Label */}
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 group-hover:text-slate-200 mt-0.5 leading-tight tracking-tight text-center truncate max-w-[90%]">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. KEYPAD QUICK CONTROLS BAR (Audio / Repeat / Main Menu) */}
          <div className="px-3.5 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="inline-flex items-center gap-1 hover:text-teal-300 transition-colors"
                title={t('keypad.0.label')}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">{t('keypad.0.label')} (0)</span>
              </button>

              <button
                type="button"
                onClick={() => handleKeypadPress('#')}
                className="inline-flex items-center gap-1 hover:text-teal-300 transition-colors"
                title={t('keypad.hash.label')}
              >
                <Menu className="w-3.5 h-3.5" />
                <span className="text-[11px]">{t('keypad.hash.label')} (#)</span>
              </button>
            </div>

            {/* Audio Toggle / Stop Button */}
            <button
              type="button"
              onClick={() => handleKeypadPress('9')}
              className={`p-1.5 rounded-lg transition-colors ${
                isSpeaking
                  ? 'bg-amber-900/40 text-amber-300 hover:bg-amber-900'
                  : 'hover:text-white'
              }`}
              title={isSpeaking ? t('voice.action.stop') : 'Audio Status'}
              aria-label={t('voice.action.stop')}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* 5. BOTTOM COMMAND & SPEECH-TO-TEXT INPUT BAR */}
          <form
            onSubmit={handleManualSubmit}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            {/* Microphone Activation Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all shadow-sm ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-red-500/40 scale-105'
                  : 'bg-gradient-to-r from-[#0F766E] to-[#14B8A6] hover:from-[#0D655E] hover:to-[#0F766E] text-white shadow-teal-950/40 hover:scale-105 active:scale-95'
              }`}
              title={isListening ? 'Stop listening' : t('voice.action.speak')}
              aria-label={t('voice.action.speak')}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input for Typing digits or queries */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('voice.input.placeholder')}
              className="flex-1 text-xs py-2 px-3 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-teal-400 hover:text-teal-300 border border-slate-700 transition-colors"
              aria-label={t('voice.action.send')}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Error Message notice if mic error occurs */}
          {recognitionError && (
            <div className="px-3 py-1.5 bg-amber-950/90 border-t border-amber-800 text-amber-300 text-[11px] flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{recognitionError}</span>
            </div>
          )}

          {!isSpeechSupported && (
            <div className="px-3 py-1 bg-slate-950 border-t border-slate-800 text-slate-500 text-[10px] flex items-center gap-1">
              <Info className="w-3 h-3 shrink-0" />
              <span>{t('voice.mic.unsupported')}</span>
            </div>
          )}
        </section>
      )}
    </>
  );
};
