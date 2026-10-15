import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  X,
  AlertCircle,
  IndianRupee,
  User,
  Check,
  CheckCircle2,
  Shield,
  Eye,
  Pencil,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  HardHat,
} from 'lucide-react';
import type { UserWorkerProfile, WorkerTrade, WorkerAvailabilityStatus } from '../types/worker';
import { useLanguage } from '../i18n/LanguageContext';

const STORAGE_KEY = 'sahayak_worker_profile';

const TRADE_SKILL_PRESETS_EN: Record<Exclude<WorkerTrade, 'all'>, string[]> = {
  electrician: [
    'Concealed House Wiring',
    'MCB Distribution Board',
    'Inverter & Battery Wiring',
    'Appliance Point Installation',
    'Short Circuit Repair',
    '3-Phase Power Setup',
    'LED & False Ceiling Lighting',
    'Earthing & Copper Rod Setup',
  ],
  plumber: [
    'CPVC & UPVC Water Piping',
    'Concealed Bathroom Diverter',
    'Overhead Tank Installation',
    'Drainage Slope & Blockage Clear',
    'Sanitaryware & Basin Fitting',
    'Water Pump Connection',
    'Pipeline Leak Detection',
    'Geyser & Water Heater Setup',
  ],
  carpenter: [
    'Modular Kitchen Cabinets',
    'Wardrobe & Drawer Fitting',
    'Door Frame & Lock Installation',
    'Laminate & Edge Banding',
    'Hydraulic Hinge Adjustment',
    'Wooden Bed & Table Assembly',
    'Plywood Partition Walls',
    'Teak Wood Polish & Sanding',
  ],
  mason: [
    'Brick & Block Laying',
    'Vitrified & Ceramic Tile Setting',
    'Wall Plaster & Smooth Finish',
    'Concrete Footing & Column',
    'Stone Wall Foundation',
    'Bathroom Waterproofing',
    'Granite Kitchen Slab Fixing',
    'Door Frame Grouting',
  ],
  painter: [
    'Wall Putty & Primer Coat',
    'Interior Plastic Emulsion',
    'Exterior Weatherproof Paint',
    'Wood PU & Melamine Polish',
    'Enamel Metal & Grill Painting',
    'Geometric Wall Stenciling',
    'Texture Plaster Application',
    'Water Seepage Treatment',
  ],
  general: [
    'Construction Material Loading',
    'Concrete & Mortar Mixing',
    'Site Debris & Waste Clearance',
    'Trench & Foundation Digging',
    'Scaffolding Erection Support',
    'Demolition & Chipping Support',
    'Brick Stacking & Curing',
    'Warehouse Inventory Lifting',
  ],
};

const TRADE_SKILL_PRESETS_HI: Record<Exclude<WorkerTrade, 'all'>, string[]> = {
  electrician: [
    'घर की कंसील्ड वायरिंग',
    'MCB डिस्ट्रीब्यूशन बॉक्स',
    'इन्वर्टर और बैटरी कनेक्शन',
    'भारी उपकरणों का सॉकेट लगाना',
    'शॉर्ट सर्किट फॉल्ट रिपेयर',
    '3-फेज पावर कनेक्शन',
    'LED और फॉल्स सीलिंग लाइट',
    'कॉपर रॉड अर्थिंग फिटिंग',
  ],
  plumber: [
    'CPVC और UPVC वाटर पाइपिंग',
    'कंसील्ड बाथरूम डायवर्टर',
    'छत की पानी की टंकी फिटिंग',
    'नाली की रुकावट साफ़ करना',
    'बेसिन और सेनेटरीवेयर फिटिंग',
    'पानी की मोटर/पंप कनेक्शन',
    'पाइपलाइन लीकेज की पहचान',
    'गीज़र और हीटर कनेक्शन',
  ],
  carpenter: [
    'मॉड्यूलर किचन कैबिनेट',
    'वॉर्डरोब और दराज़ फिटिंग',
    'दरवाजे की चौखट और लॉक लगाना',
    'लेमिनेट और एज बैंडिंग',
    'हाइड्रोलिक हिंज फिटिंग',
    'लकड़ी का बेड व डाइनिंग टेबल',
    'प्लाईवुड पार्टीशन दीवारें',
    'सागवान लकड़ी की पॉलिश',
  ],
  mason: [
    'ईंट और ब्लॉक की चिनाई',
    'विट्रिफाइड व सेरेमिक टाइल',
    'दीवार का चिकना प्लास्टर',
    'कंक्रीट पिलर और फुटिंग',
    'पत्थर की मजबूत नींव',
    'बाथरूम वाटरप्रूफिंग',
    'ग्रेनाइट किचन प्लेटफॉर्म',
    'दरवाजे की चौखट ग्राउटिंग',
  ],
  painter: [
    'वॉल पुट्टी और प्राइमर कोट',
    'आंतरिक प्लास्टिक इमल्शन',
    'बाहरी वेदरप्रूफ पेंट',
    'लकड़ी की पीयू/मेलामाइन पॉलिश',
    'लोहे की ग्रिल पर इनैमल पेंट',
    'ज्यामितीय वॉल स्टेंसिल',
    'टेक्सचर प्लास्टर फिनिश',
    'दीवार की सीलन का उपचार',
  ],
  general: [
    'निर्माण सामग्री लोडिंग-अनलोडिंग',
    'कंक्रीट और मसाले की मिक्सिंग',
    'साइट का मलबा व कचरा सफ़ाई',
    'नींव और गड्ढे की खुदाई',
    'मचान (पाड़) बाँधने में मदद',
    'चिनाई टीम की सहायता',
    'ईंटों की ढुलाई और तराई',
    'गोदाम में वजन उठाना व रखना',
  ],
};

const DEFAULT_PROFILE: UserWorkerProfile = {
  name: 'Sunil Shinde',
  trade: 'electrician',
  tradeLabel: 'Electrician',
  experienceYears: 8,
  locality: 'Dharavi',
  city: 'Mumbai',
  payAmount: 850,
  payUnit: 'per_day',
  availability: 'today',
  skills: [
    'Concealed House Wiring',
    'MCB Distribution Board',
    'Inverter & Battery Wiring',
    'Appliance Point Installation',
  ],
  bio: 'Experienced residential wireman with 8 years of hands-on work across Mumbai. Skilled in new home concealed piping, modular MCB box setup, inverter backup systems, and fast emergency fault repairs.',
  phone: '9876543210',
};

export const ProfilePage: React.FC = () => {
  const { t, language } = useLanguage();

  const [profile, setProfile] = useState<UserWorkerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.name === 'string') {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  });

  const [customSkillInput, setCustomSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const TRADE_OPTIONS: { id: Exclude<WorkerTrade, 'all'>; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'electrician', label: language === 'hi' ? 'इलेक्ट्रीशियन' : 'Electrician', icon: Zap },
    { id: 'plumber', label: language === 'hi' ? 'प्लंबर' : 'Plumber', icon: Wrench },
    { id: 'carpenter', label: language === 'hi' ? 'बढ़ई' : 'Carpenter', icon: Hammer },
    { id: 'painter', label: language === 'hi' ? 'पेंटर' : 'Painter', icon: Paintbrush },
    { id: 'mason', label: language === 'hi' ? 'राजमिस्त्री' : 'Mason', icon: HardHat },
    { id: 'general', label: language === 'hi' ? 'सामान्य सहायक' : 'General Labour', icon: Briefcase },
  ];

  const handleTradeChange = (trade: Exclude<WorkerTrade, 'all'>) => {
    const tradeConfig = TRADE_OPTIONS.find((tOpt) => tOpt.id === trade);
    setProfile((prev) => ({
      ...prev,
      trade,
      tradeLabel: tradeConfig ? tradeConfig.label : 'Artisan',
    }));
    setIsSaved(false);
  };

  const handleToggleSkill = (skill: string) => {
    setProfile((prev) => {
      const exists = prev.skills.includes(skill);
      const nextSkills = exists
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: nextSkills };
    });
    setIsSaved(false);
    if (errors.skills) {
      setErrors((prev) => ({ ...prev, skills: '' }));
    }
  };

  const handleAddCustomSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;

    if (profile.skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setCustomSkillInput('');
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, trimmed],
    }));
    setCustomSkillInput('');
    setIsSaved(false);
    if (errors.skills) {
      setErrors((prev) => ({ ...prev, skills: '' }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
    setIsSaved(false);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!profile.name.trim()) {
      errs.name = language === 'hi' ? 'कृपया अपना पूरा नाम लिखें।' : 'Please enter your full name.';
    }
    if (!profile.locality.trim()) {
      errs.locality = language === 'hi' ? 'कृपया अपना इलाक़ा या मोहल्ला लिखें।' : 'Please enter your area or locality.';
    }
    if (!profile.city.trim()) {
      errs.city = language === 'hi' ? 'कृपया अपना शहर लिखें।' : 'Please enter your city.';
    }
    if (!profile.payAmount || profile.payAmount <= 0 || isNaN(profile.payAmount)) {
      errs.payAmount = language === 'hi' ? 'कृपया सही मजदूरी भरें (0 से अधिक)।' : 'Please enter a sensible expected pay amount (greater than ₹0).';
    }
    if (profile.experienceYears < 0 || isNaN(profile.experienceYears)) {
      errs.experienceYears = language === 'hi' ? 'अनुभव 0 या अधिक वर्ष होना चाहिए।' : 'Years of experience must be 0 or more.';
    }
    if (profile.skills.length === 0) {
      errs.skills = language === 'hi' ? 'कम से कम 1 मुख्य हुनर ज़रूर चुनें।' : 'Please select at least 1 key skill.';
    }
    if (!profile.bio.trim() || profile.bio.trim().length < 15) {
      errs.bio = language === 'hi' ? 'कृपया अपने काम के बारे में कम से कम 15 अक्षर का परिचय लिखें।' : 'Please add a brief description (at least 15 characters) about your work.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) {
      setSaveSuccessMessage(null);
      return;
    }

    const updatedProfile: UserWorkerProfile = {
      ...profile,
      lastSavedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      setIsSaved(true);
      setSaveSuccessMessage(
        language === 'hi'
          ? `जानकारी सफलतापूर्वक आपके ब्राउज़र में सेव हो गई (${updatedProfile.lastSavedAt})`
          : `Profile saved successfully to your browser storage at ${updatedProfile.lastSavedAt}.`
      );
      setTimeout(() => {
        setSaveSuccessMessage(null);
      }, 5000);
    } catch {
      setErrors((prev) => ({
        ...prev,
        submit: 'Could not save profile to browser storage.',
      }));
    }
  };

  const handleResetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProfile(DEFAULT_PROFILE);
      setIsSaved(true);
      setErrors({});
      setShowResetConfirm(false);
      setSaveSuccessMessage(language === 'hi' ? 'प्रोफ़ाइल शुरुआती मानों पर रीसेट हो गई।' : 'Profile reset to demonstration starter values.');
      setTimeout(() => {
        setSaveSuccessMessage(null);
      }, 4000);
    } catch {
      // ignore
    }
  };

  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 0 || !parts[0]) return 'SA';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const activePresets = language === 'hi'
    ? TRADE_SKILL_PRESETS_HI[profile.trade] || []
    : TRADE_SKILL_PRESETS_EN[profile.trade] || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Top Banner Navigation */}
      <div className="border-b border-[#E2E8F0] bg-white sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/hire"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#334155] hover:text-[#0F766E] transition-colors p-1 rounded-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('common.backDirectory')}</span>
            </Link>
            <span className="text-[#E2E8F0]">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DBEAFE] text-[#0F766E]">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              {t('nav.profile')}
            </span>
          </div>

          {/* Quick status & Save Action */}
          <div className="flex items-center gap-3">
            {isSaved ? (
              <span className="inline-flex items-center gap-1 text-xs text-[#0F766E] font-medium bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span>{t('profile.status.saved')}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-[#854D0E] font-medium bg-[#FEF9C3] border border-[#FEF08A] px-2.5 py-1 rounded-full">
                <Pencil className="w-3.5 h-3.5" />
                <span>{t('profile.status.unsaved')}</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => handleSave()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[#0F766E]"
            >
              <Save className="w-4 h-4" />
              <span>{t('profile.btn.save')}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Hero */}
        <div className="max-w-3xl mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
            {t('profile.hero.title')}
          </h1>
          <p className="mt-2 text-base text-[#334155] leading-relaxed">
            {t('profile.hero.subtitle')}
          </p>
        </div>

        {/* Global Save Feedback Alert */}
        <AnimatePresence>
          {saveSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-8 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
                <span>{saveSuccessMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setSaveSuccessMessage(null)}
                className="text-[#166534] hover:text-[#14532D] p-1 rounded-md"
                aria-label="Dismiss message"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile View Toggle */}
        <div className="lg:hidden mb-6 flex rounded-xl border border-[#E2E8F0] p-1 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'edit'
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'text-[#334155] hover:text-[#111827]'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>{t('profile.tab.edit')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'preview'
                ? 'bg-[#0F766E] text-white shadow-xs'
                : 'text-[#334155] hover:text-[#111827]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('profile.tab.preview')}</span>
          </button>
        </div>

        {/* 2-Column Responsive Layout: Form on Left, Live Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Editable Form */}
          <section
            className={`lg:col-span-7 space-y-6 ${
              activeTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            <form onSubmit={handleSave} className="space-y-6">
              {/* Card 1: Personal & Trade Identity */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
                  <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#0F766E]" />
                    <span>{t('profile.step1.title')}</span>
                  </h2>
                  <span className="text-xs text-[#64748B] font-medium">{t('profile.step1.step')}</span>
                </div>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="worker-name" className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      {t('profile.name.label')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="worker-name"
                      type="text"
                      value={profile.name}
                      onChange={(e) => {
                        setProfile((prev) => ({ ...prev, name: e.target.value }));
                        setIsSaved(false);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder={t('profile.name.placeholder')}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-[#CBD5E1] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Main Trade Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                      {t('profile.trade.label')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TRADE_OPTIONS.map((trade) => {
                        const IconComponent = trade.icon;
                        const isSelected = profile.trade === trade.id;
                        return (
                          <button
                            key={trade.id}
                            type="button"
                            onClick={() => handleTradeChange(trade.id)}
                            className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                              isSelected
                                ? 'border-[#0F766E] bg-[#F0FDFA] text-[#0F766E] shadow-xs ring-1 ring-[#0F766E]'
                                : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:border-[#CBD5E1] hover:bg-white'
                            }`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-[#0F766E] text-white' : 'bg-[#E2E8F0] text-[#334155]'
                              }`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold">{trade.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label htmlFor="worker-exp" className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      {t('profile.exp.label')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        id="worker-exp"
                        type="number"
                        min="0"
                        max="50"
                        value={profile.experienceYears}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          setProfile((prev) => ({
                            ...prev,
                            experienceYears: isNaN(val) ? 0 : val,
                          }));
                          setIsSaved(false);
                          if (errors.experienceYears) {
                            setErrors((prev) => ({ ...prev, experienceYears: '' }));
                          }
                        }}
                        className={`w-32 px-3.5 py-2.5 rounded-xl border text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none transition-colors ${
                          errors.experienceYears
                            ? 'border-rose-400'
                            : 'border-[#CBD5E1] focus:border-[#0F766E]'
                        }`}
                      />
                      <span className="text-xs text-[#64748B]">{t('profile.exp.unit')}</span>
                    </div>
                    {errors.experienceYears && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.experienceYears}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Location & Work Availability */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
                  <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0F766E]" />
                    <span>{t('profile.step2.title')}</span>
                  </h2>
                  <span className="text-xs text-[#64748B] font-medium">{t('profile.step2.step')}</span>
                </div>

                <div className="space-y-5">
                  {/* City and Locality in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="worker-locality" className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                        {t('profile.locality.label')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="worker-locality"
                        type="text"
                        value={profile.locality}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, locality: e.target.value }));
                          setIsSaved(false);
                          if (errors.locality) setErrors((prev) => ({ ...prev, locality: '' }));
                        }}
                        placeholder={t('profile.locality.placeholder')}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none transition-colors ${
                          errors.locality ? 'border-rose-400' : 'border-[#CBD5E1] focus:border-[#0F766E]'
                        }`}
                      />
                      {errors.locality && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.locality}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="worker-city" className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                        {t('profile.city.label')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="worker-city"
                        type="text"
                        value={profile.city}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, city: e.target.value }));
                          setIsSaved(false);
                          if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                        }}
                        placeholder={t('profile.city.placeholder')}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none transition-colors ${
                          errors.city ? 'border-rose-400' : 'border-[#CBD5E1] focus:border-[#0F766E]'
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.city}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">
                      {t('profile.avail.label')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'today' as WorkerAvailabilityStatus,
                          label: t('profile.avail.todayTitle'),
                          desc: t('profile.avail.todayDesc'),
                          activeColor: 'border-[#0F766E] bg-[#F0FDFA] text-[#0F766E] ring-1 ring-[#0F766E]',
                          badgeColor: 'bg-[#14B8A6]',
                        },
                        {
                          id: 'this_week' as WorkerAvailabilityStatus,
                          label: t('profile.avail.weekTitle'),
                          desc: t('profile.avail.weekDesc'),
                          activeColor: 'border-[#0F766E] bg-[#F0FDFA] text-[#0F766E] ring-1 ring-[#0F766E]',
                          badgeColor: 'bg-[#0F766E]',
                        },
                        {
                          id: 'not_available' as WorkerAvailabilityStatus,
                          label: t('profile.avail.notTitle'),
                          desc: t('profile.avail.notDesc'),
                          activeColor: 'border-[#64748B] bg-[#F1F5F9] text-[#334155] ring-1 ring-[#64748B]',
                          badgeColor: 'bg-[#94A3B8]',
                        },
                      ].map((item) => {
                        const isSelected = profile.availability === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setProfile((prev) => ({ ...prev, availability: item.id }));
                              setIsSaved(false);
                            }}
                            className={`p-3.5 rounded-xl border text-left transition-all ${
                              isSelected
                                ? item.activeColor
                                : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#334155] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`w-2 h-2 rounded-full ${item.badgeColor}`} />
                              <span className="text-xs font-bold">{item.label}</span>
                            </div>
                            <p className="text-[11px] text-[#64748B] leading-snug">{item.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expected Pay Rate */}
                  <div>
                    <label htmlFor="worker-pay" className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      {t('profile.pay.label')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                          <IndianRupee className="w-4 h-4" />
                        </div>
                        <input
                          id="worker-pay"
                          type="number"
                          min="100"
                          step="50"
                          value={profile.payAmount}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setProfile((prev) => ({
                              ...prev,
                              payAmount: isNaN(val) ? 0 : val,
                            }));
                            setIsSaved(false);
                            if (errors.payAmount) setErrors((prev) => ({ ...prev, payAmount: '' }));
                          }}
                          placeholder="e.g. 850"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none transition-colors ${
                            errors.payAmount ? 'border-rose-400' : 'border-[#CBD5E1] focus:border-[#0F766E]'
                          }`}
                        />
                      </div>

                      {/* Pay Unit Toggle */}
                      <div className="flex rounded-xl border border-[#CBD5E1] p-1 bg-[#F8FAFC]">
                        <button
                          type="button"
                          onClick={() => {
                            setProfile((prev) => ({ ...prev, payUnit: 'per_day' }));
                            setIsSaved(false);
                          }}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            profile.payUnit === 'per_day'
                              ? 'bg-[#0F766E] text-white shadow-xs'
                              : 'text-[#334155] hover:text-[#111827]'
                          }`}
                        >
                          {t('profile.payUnit.day')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setProfile((prev) => ({ ...prev, payUnit: 'per_job' }));
                            setIsSaved(false);
                          }}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            profile.payUnit === 'per_job'
                              ? 'bg-[#0F766E] text-white shadow-xs'
                              : 'text-[#334155] hover:text-[#111827]'
                          }`}
                        >
                          {t('profile.payUnit.job')}
                        </button>
                      </div>
                    </div>
                    {errors.payAmount && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.payAmount}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 3: Skills & Specializations */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
                  <div>
                    <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0F766E]" />
                      <span>{t('profile.step3.title')}</span>
                    </h2>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      {t('profile.step3.desc')}
                    </p>
                  </div>
                  <span className="text-xs text-[#64748B] font-medium">{t('profile.step3.step')}</span>
                </div>

                <div className="space-y-5">
                  {/* Selected Skills Chips */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                        {t('profile.skills.selected')} ({profile.skills.length})
                      </span>
                    </div>

                    {profile.skills.length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-center text-xs text-[#64748B]">
                        {t('profile.skills.empty')}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                        {profile.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F766E] text-white text-xs font-medium shadow-2xs"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-teal-200 hover:text-white rounded-full p-0.5"
                              aria-label={`Remove skill ${skill}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {errors.skills && (
                      <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.skills}</span>
                      </p>
                    )}
                  </div>

                  {/* Trade Preset Suggestions */}
                  <div>
                    <span className="block text-xs font-semibold text-[#334155] mb-2">
                      {t('profile.skills.suggested')} {profile.tradeLabel}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activePresets.map((preset) => {
                        const isAdded = profile.skills.includes(preset);
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleToggleSkill(preset)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              isAdded
                                ? 'bg-[#CCFBF1] text-[#0F766E] border-[#14B8A6] font-semibold'
                                : 'bg-white text-[#334155] border-[#E2E8F0] hover:border-[#0F766E] hover:text-[#0F766E]'
                            }`}
                          >
                            <span className="flex items-center gap-1">
                              {isAdded ? <Check className="w-3 h-3 text-[#0F766E]" /> : <Plus className="w-3 h-3 text-[#64748B]" />}
                              <span>{preset}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Custom Skill Input */}
                  <div className="pt-2">
                    <label htmlFor="custom-skill" className="block text-xs font-semibold text-[#334155] mb-1.5">
                      {t('profile.skills.customLabel')}
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="custom-skill"
                        type="text"
                        value={customSkillInput}
                        onChange={(e) => setCustomSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomSkill();
                          }
                        }}
                        placeholder={t('profile.skills.customPlaceholder')}
                        className="flex-1 px-3.5 py-2 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#0F766E]"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddCustomSkill()}
                        disabled={!customSkillInput.trim()}
                        className="px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                      >
                        {t('profile.skills.addBtn')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Work Introduction / Bio */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-5">
                  <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#0F766E]" />
                    <span>{t('profile.step4.title')}</span>
                  </h2>
                  <span className="text-xs text-[#64748B] font-medium">{t('profile.step4.step')}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="worker-bio" className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">
                      {t('profile.bio.label')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="worker-bio"
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => {
                        setProfile((prev) => ({ ...prev, bio: e.target.value }));
                        setIsSaved(false);
                        if (errors.bio) setErrors((prev) => ({ ...prev, bio: '' }));
                      }}
                      placeholder={t('profile.bio.placeholder')}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#111827] bg-[#F8FAFC] focus:bg-white focus:outline-none transition-colors ${
                        errors.bio ? 'border-rose-400' : 'border-[#CBD5E1] focus:border-[#0F766E]'
                      }`}
                    />
                    <div className="flex items-center justify-between mt-1 text-xs text-[#64748B]">
                      <span>{language === 'hi' ? 'सीधा और साफ़ लिखें ताकि काम देने वाले आसानी से समझ सकें।' : 'Keep it direct and easy for contractors to understand.'}</span>
                      <span>{profile.bio.length} {language === 'hi' ? 'अक्षर' : 'chars'}</span>
                    </div>
                    {errors.bio && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.bio}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Form Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm font-semibold text-[#334155] hover:bg-white hover:text-[#111827] transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-[#64748B]" />
                  <span>{t('profile.btn.reset')}</span>
                </button>

                <div className="w-full sm:w-auto flex items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] active:scale-[0.98] transition-all shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>{t('profile.btn.save')}</span>
                  </button>
                </div>
              </div>

              {/* Reset Confirmation Dialog */}
              <AnimatePresence>
                {showResetConfirm && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold">{t('profile.resetConfirm.title')}</p>
                        <p className="text-xs text-[#B45309] mt-0.5">
                          {language === 'hi' ? 'यह आपके सभी बदलाव हटाकर मूल नमूना प्रोफ़ाइल पर वापस ले जाएगा।' : 'This will reset your local profile details back to the original starter sample profile.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-7">
                      <button
                        type="button"
                        onClick={handleResetToDefaults}
                        className="px-3 py-1.5 rounded-lg bg-[#D97706] text-white text-xs font-semibold hover:bg-[#B45309] transition-colors"
                      >
                        {t('profile.resetConfirm.yes')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetConfirm(false)}
                        className="px-3 py-1.5 rounded-lg border border-[#FDE68A] bg-white text-xs font-semibold text-[#78350F] hover:bg-[#FFFBEB] transition-colors"
                      >
                        {t('common.cancel')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </section>

          {/* Right Column: Live Profile Preview Card (Sticky on Desktop) */}
          <aside
            className={`lg:col-span-5 ${
              activeTab === 'edit' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t('profile.preview.title')}</span>
                </span>
                <span className="text-[11px] text-[#64748B] font-medium">{language === 'hi' ? 'तुरंत अपडेट होता है' : 'Updates in Real-Time'}</span>
              </div>

              {/* The Worker Card Component */}
              <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-7 shadow-sm transition-all">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 pb-5 border-b border-[#F1F5F9]">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DBEAFE] text-[#0F766E] text-xs font-bold">
                    <Shield className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>{t('profile.preview.badge')}</span>
                  </span>

                  {/* Availability Badge */}
                  {profile.availability === 'today' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                      <span>{t('common.today')}</span>
                    </span>
                  )}
                  {profile.availability === 'this_week' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                      <span>{t('common.thisWeek')}</span>
                    </span>
                  )}
                  {profile.availability === 'not_available' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#94A3B8]" />
                      <span>{t('common.notAvailable')}</span>
                    </span>
                  )}
                </div>

                {/* Worker Avatar & Identity */}
                <div className="flex items-start gap-4 pt-5 pb-5 border-b border-[#F1F5F9]">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-xs">
                    {getInitials(profile.name || 'Artisan')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#111827] truncate">
                      {profile.name || (language === 'hi' ? 'आपका पूरा नाम' : 'Your Full Name')}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F766E] mt-0.5">
                      {profile.tradeLabel || 'Skilled Artisan'} • {profile.experienceYears || 0} {t('common.years')} {t('common.experience')}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                      <span className="truncate">
                        {profile.locality || t('common.location')}, {profile.city || ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rate Card Metric */}
                <div className="grid grid-cols-2 gap-3 py-4 border-b border-[#F1F5F9] text-center">
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                      {t('profile.preview.expectedRate')}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#0F766E] font-serif mt-0.5 block">
                      ₹{profile.payAmount.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-[#334155]">
                        / {profile.payUnit === 'per_day' ? t('common.day') : t('common.job')}
                      </span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
                      {t('common.experience')}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#111827] font-serif mt-0.5 block">
                      {profile.experienceYears}+ {t('common.years')}
                    </span>
                  </div>
                </div>

                {/* Selected Skills in Live Preview */}
                <div className="py-4 border-b border-[#F1F5F9]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#334155] block mb-2">
                    {t('profile.preview.skillsTitle')} ({profile.skills.length})
                  </span>
                  {profile.skills.length === 0 ? (
                    <p className="text-xs text-[#94A3B8] italic">{t('profile.skills.empty')}</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {profile.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#111827] text-xs font-medium border border-[#E2E8F0]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bio / Work Description */}
                <div className="pt-4 pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#334155] block mb-1.5">
                    {t('profile.preview.bioTitle')}
                  </span>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed line-clamp-4">
                    {profile.bio || (language === 'hi' ? 'आपका संक्षिप्त परिचय यहाँ दिखेगा।' : 'Your short professional introduction will appear here.')}
                  </p>
                </div>

                {/* Footer Demonstration Label */}
                <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
                  <span className="flex items-center gap-1 text-[#0F766E] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t('profile.preview.demoLabel')}</span>
                  </span>
                </div>
              </div>

              {/* Truthful Platform Transparency Notice */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs text-[#64748B]">
                <div className="flex items-center gap-1.5 font-bold text-[#111827]">
                  <Clock className="w-4 h-4 text-[#0F766E]" />
                  <span>{t('profile.disclaimer.title')}</span>
                </div>
                <p className="leading-relaxed">
                  {t('profile.disclaimer.desc')}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
