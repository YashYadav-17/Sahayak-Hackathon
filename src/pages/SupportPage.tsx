import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  ExternalLink,
  Printer,
  RotateCcw,
  ChevronDown,
  Check,
  CheckCircle2,
  Info,
  PhoneCall,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const DOC_CHECKLIST_STORAGE_KEY = 'sahayak_document_checklist';

type LocalizedField = { en: string; hi: string; mr?: string };

const getLocalizedText = (field: LocalizedField, lang: string): string => {
  if (lang === 'mr' && field.mr) return field.mr;
  if (lang === 'hi' || lang === 'mr') return field.hi;
  return field.en;
};

interface SafetyCheckItem {
  id: string;
  label: LocalizedField;
  detail: LocalizedField;
}

const JOB_SAFETY_CHECKS: SafetyCheckItem[] = [
  {
    id: 'scope',
    label: {
      en: 'Agreed work and responsibilities',
      hi: 'तय काम और ज़िम्मेदारियाँ',
    },
    detail: {
      en: 'Are the exact daily tasks, work scope, and site conditions clear before you travel to the location?',
      hi: 'क्या काम की जगह जाने से पहले रोज़ का काम, दायरा और साइट की स्थिति साफ़ है?',
    },
  },
  {
    id: 'pay_rate',
    label: {
      en: 'Agreed pay rate & calculation unit',
      hi: 'तय मजदूरी और भुगतान की इकाई',
    },
    detail: {
      en: 'Is the wage clearly fixed (per day, per job, or per hour) without ambiguous verbal promises?',
      hi: 'क्या मजदूरी (प्रति दिन, प्रति काम या प्रति घंटा) साफ़ तय है, बिना किसी मौखिक भ्रम के?',
    },
  },
  {
    id: 'timing_location',
    label: {
      en: 'Working hours, site address & duration',
      hi: 'काम का समय, पूरा पता और अवधि',
    },
    detail: {
      en: 'Do you know exact daily shift hours (start/end), complete worksite address, and expected number of days?',
      hi: 'क्या आपको काम शुरू और ख़त्म होने का समय, साइट का पूरा पता और दिनों की संख्या पता है?',
    },
  },
  {
    id: 'payment_schedule',
    label: {
      en: 'Payment timing & delivery method',
      hi: 'भुगतान का समय और माध्यम',
    },
    detail: {
      en: 'Has the contractor agreed on when wages will be released (daily cash, weekly, or upon agreed milestones)?',
      hi: 'क्या तय है कि मजदूरी कब मिलेगी (रोज़ाना शाम को नकद, हफ़्ते के अंत में या काम पूरा होने पर)?',
    },
  },
  {
    id: 'contact_person',
    label: {
      en: 'Identified hiring supervisor & direct number',
      hi: 'काम देने वाले का नाम और सीधा फ़ोन नंबर',
    },
    detail: {
      en: 'Do you have the direct name and working mobile number of the person authorized to approve payments on site?',
      hi: 'क्या आपके पास साइट पर पैसे मंज़ूर करने वाले ज़िम्मेदार व्यक्ति का नाम और सीधा मोबाइल नंबर है?',
    },
  },
  {
    id: 'safety_gear',
    label: {
      en: 'Safety equipment & material responsibility',
      hi: 'सुरक्षा उपकरण और सामग्री की ज़िम्मेदारी',
    },
    detail: {
      en: 'Is it confirmed who provides protective equipment (helmet, boots, gloves) and required raw materials?',
      hi: 'क्या यह साफ़ है कि हेलमेट, जूते, दस्ताने और ज़रूरी कच्चा माल कौन देगा?',
    },
  },
];

interface ScamWarning {
  id: string;
  title: LocalizedField;
  shortDesc: LocalizedField;
  explanation: LocalizedField;
  recommendedAction: LocalizedField;
}

const SCAM_WARNINGS: ScamWarning[] = [
  {
    id: 'upfront_fee',
    title: {
      en: 'Upfront Registration or "Gate Entry" Fees',
      hi: 'शुरुआती रजिस्ट्रेशन या "गेट एंट्री" फ़ीस मांगना',
    },
    shortDesc: {
      en: 'You are asked to pay money or a deposit before getting the job or entering the site.',
      hi: 'काम देने या साइट में घुसने से पहले आपसे पैसे या डिपॉज़िट मांगा जाता है।',
    },
    explanation: {
      en: 'Legitimate contractors, building supervisors, and homeowners never charge job seekers a registration fee, gate token, or uniform deposit to begin work.',
      hi: 'भरोसेमंद ठेकेदार, सुपरवाइज़र या मकान मालिक काम शुरू करने के लिए कभी भी रजिस्ट्रेशन फ़ीस या वर्दी डिपॉज़िट नहीं मांगते।',
    },
    recommendedAction: {
      en: 'Never pay money to secure daily or contract work. Politely decline and walk away from any intermediary demanding advance payments.',
      hi: 'दिहाड़ी या ठेके के काम के लिए कभी पैसे न दें। पेशगी पैसे मांगने वाले किसी भी बिचौलिए को तुरंत साफ़ मना कर दें।',
    },
  },
  {
    id: 'terms_switch',
    title: {
      en: 'Wage or Working Hours Reduced Upon Arrival',
      hi: 'साइट पर पहुँचने पर मजदूरी घटाना या समय बढ़ाना',
    },
    shortDesc: {
      en: 'The promised daily wage is lowered or the shift extended after you reach the worksite.',
      hi: 'साइट पर पहुँचने पर तय दिहाड़ी कम कर दी जाती है या काम के घंटे बढ़ा दिए जाते हैं।',
    },
    explanation: {
      en: 'Some bad actors take advantage of a worker who has already traveled far by offering less than the agreed rate or adding extra rooms/floors without extra pay.',
      hi: 'कुछ असामाजिक तत्व दूर से आए कामगारों की मजबूरी का फ़ायदा उठाकर तय दर से कम देने लगते हैं या बिना अतिरिक्त पैसे ज़्यादा काम सौंपते हैं।',
    },
    recommendedAction: {
      en: 'Do not start work under altered conditions. Remind the contractor of the prior agreement or renegotiate clearly before unpacking your tools.',
      hi: 'बदली हुई शर्तों पर काम शुरू न करें। ठेकेदार को पहले से तय बात याद दिलाएँ या औज़ार खोलने से पहले साफ़ बात करें।',
    },
  },
  {
    id: 'doc_withholding',
    title: {
      en: 'Holding Original Identity or Bank Documents',
      hi: 'मूल पहचान पत्र या बैंक पासबुक रख लेना',
    },
    shortDesc: {
      en: 'The employer or agent asks to keep your original Aadhaar, Voter Card, or Passbook.',
      hi: 'मालिक या ठेकेदार आपका असली आधार कार्ड, वोटर कार्ड या बैंक पासबुक अपने पास रखने को कहता है।',
    },
    explanation: {
      en: 'No employer or contractor has the legal authority to confiscate your original identity cards or bank books. They may only inspect a physical copy or view it for verification.',
      hi: 'किसी भी ठेकेदार या मालिक को आपके असली दस्तावेज़ ज़ब्त करने का कानूनी अधिकार नहीं है। वे केवल फ़ोटोकॉपी या सत्यापन के लिए देख सकते हैं।',
    },
    recommendedAction: {
      en: 'Keep original identification cards in your own possession at all times. Share only self-attested photocopies or digital views when required for security gate passes.',
      hi: 'अपने असली पहचान पत्र हमेशा अपने पास रखें। गेट पास या सुरक्षा रजिस्टर के लिए केवल स्व-प्रमाणित फ़ोटोकॉपी या डिजिटल कॉपी ही दें।',
    },
  },
  {
    id: 'vague_employer',
    title: {
      en: 'Hidden Employer Identity or Roadside-Only Pickups',
      hi: 'मालिक की अधूरी पहचान या केवल चौराहे से पिकअप',
    },
    shortDesc: {
      en: 'The person hiring refuses to provide a worksite address, company name, or contact details.',
      hi: 'काम देने वाला साइट का पूरा पता, कंपनी का नाम या अपना स्थायी नंबर देने से मना करता है।',
    },
    explanation: {
      en: 'Anonymous job postings or offers where the contractor only agrees to pick you up from a highway crossing carry a high risk of non-payment or hazardous conditions.',
      hi: 'अज्ञात काम के प्रस्ताव जहाँ ठेकेदार केवल हाईवे या चौराहे से गाड़ी में बिठाने को कहता है, वहाँ पैसे न मिलने या ख़तरनाक परिस्थितियों का बड़ा जोखिम होता है।',
    },
    recommendedAction: {
      en: 'Always obtain the exact building address, contractor name, and verified phone number before leaving home. Inform a family member of where you are working.',
      hi: 'घर से निकलने से पहले हमेशा साइट का पूरा पता, ठेकेदार का नाम और सत्यापित फ़ोन नंबर लें। अपने परिवार को बताकर निकलें कि आप कहाँ काम कर रहे हैं।',
    },
  },
];

interface DocumentItem {
  id: string;
  title: LocalizedField;
  purpose: LocalizedField;
  guidance: LocalizedField;
}

const DOCUMENT_RECORDS: DocumentItem[] = [
  {
    id: 'id_doc',
    title: {
      en: 'Government Identity Record (Photocopy / Digital)',
      hi: 'सरकारी पहचान पत्र (फ़ोटोकॉपी / डिजिटल)',
    },
    purpose: {
      en: 'Aadhaar, Voter ID, or Driving License copy.',
      hi: 'आधार, वोटर आईडी या ड्राइविंग लाइसेंस की कॉपी।',
    },
    guidance: {
      en: 'Useful for building society gate passes and site security register. Never hand over original physical cards.',
      hi: 'सोसायटी गेट पास और साइट सुरक्षा रजिस्टर के लिए उपयोगी। कभी भी असली कार्ड किसी को न सौंपें।',
    },
  },
  {
    id: 'bank_details',
    title: {
      en: 'Bank Passbook / UPI QR Code',
      hi: 'बैंक पासबुक / UPI क्यूआर कोड',
    },
    purpose: {
      en: 'Account number, IFSC code, or active UPI ID.',
      hi: 'खाता संख्या, IFSC कोड या चालू UPI आईडी।',
    },
    guidance: {
      en: 'Useful for direct electronic wage credit. Keep account details written clearly in a pocket notebook.',
      hi: 'सीधे बैंक खाते में मजदूरी पाने के लिए। अपनी पॉकेट डायरी में खाते की जानकारी साफ़ लिखकर रखें।',
    },
  },
  {
    id: 'trade_cert',
    title: {
      en: 'Trade Training or Apprenticeship Records (If Any)',
      hi: 'हुनर प्रशिक्षण या अप्रेंटिसशिप प्रमाण पत्र (यदि हो)',
    },
    purpose: {
      en: 'ITI diploma, PMKVY skill card, or company work experience letter.',
      hi: 'आईटीआई डिप्लोमा, पीएमकेवीवाई (PMKVY) स्किल कार्ड या पुराना अनुभव पत्र।',
    },
    guidance: {
      en: 'Helpful when negotiating skilled rates with formal engineering firms or commercial contractors.',
      hi: 'बड़ी इंजीनियरिंग फर्मों या कमर्शियल ठेकेदारों से कुशल कारीगर की उच्च मजदूरी तय करते समय मददगार।',
    },
  },
  {
    id: 'work_diary',
    title: {
      en: 'Personal Daily Work Diary & Wage Receipts',
      hi: 'व्यक्तिगत दैनिक कार्य डायरी और मजदूरी पर्ची',
    },
    purpose: {
      en: 'Pocket notebook recording dates, hours worked, supervisor name, and payments received.',
      hi: 'पॉकेट डायरी जिसमें तारीख़, काम के घंटे, सुपरवाइज़र का नाम और प्राप्त भुगतान दर्ज हो।',
    },
    guidance: {
      en: 'Crucial personal evidence if payment delays or disputes arise later. Note down daily progress.',
      hi: 'भुगतान में देरी या विवाद के समय यह आपका सबसे मजबूत व्यक्तिगत प्रमाण होता है। रोज़ का हिसाब लिखें।',
    },
  },
  {
    id: 'eshram_record',
    title: {
      en: 'e-Shram Universal Account Number (UAN) Card',
      hi: 'ई-श्रम यूनिवर्सल अकाउंट नंबर (UAN) कार्ड',
    },
    purpose: {
      en: 'National unorganised worker registration card.',
      hi: 'राष्ट्रीय असंगठित कामगार पंजीकरण कार्ड।',
    },
    guidance: {
      en: 'Enables linkages to government social welfare and accident assistance programmes.',
      hi: 'सरकारी सामाजिक सुरक्षा योजनाओं और दुर्घटना सहायता से जुड़ने में सहायक।',
    },
  },
];

interface OfficialResource {
  name: LocalizedField;
  organization: LocalizedField;
  url: string;
  description: LocalizedField;
  badge: LocalizedField;
}

const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    name: {
      en: 'e-Shram Portal',
      hi: 'ई-श्रम पोर्टल',
    },
    organization: {
      en: 'Ministry of Labour & Employment, Govt. of India',
      hi: 'श्रम एवं रोज़गार मंत्रालय, भारत सरकार',
    },
    url: 'https://www.eshram.gov.in/',
    description: {
      en: 'Official national database for informal and unorganised workers. Register for a 12-digit Universal Account Number (UAN) to access social security benefits.',
      hi: 'असंगठित कामगारों का आधिकारिक राष्ट्रीय डेटाबेस। सामाजिक सुरक्षा योजनाओं का लाभ लेने के लिए 12-अंकों का UAN नंबर पाएँ।',
    },
    badge: {
      en: 'National Worker Registry',
      hi: 'राष्ट्रीय कामगार डेटाबेस',
    },
  },
  {
    name: {
      en: 'National Career Service (NCS)',
      hi: 'राष्ट्रीय करियर सेवा (NCS)',
    },
    organization: {
      en: 'Ministry of Labour & Employment, Govt. of India',
      hi: 'श्रम एवं रोज़गार मंत्रालय, भारत सरकार',
    },
    url: 'https://www.ncs.gov.in/',
    description: {
      en: 'Nationwide portal providing free employment services, job matching, skill development listings, and career centre guidance without fees.',
      hi: 'मुफ़्त रोज़गार सेवाएँ, नौकरी मिलान, कौशल विकास और करियर मार्गदर्शन प्रदान करने वाला राष्ट्रव्यापी सरकारी पोर्टल।',
    },
    badge: {
      en: 'Employment Portal',
      hi: 'रोज़गार पोर्टल',
    },
  },
  {
    name: {
      en: 'Samadhan Grievance Portal',
      hi: 'समाधान शिकायत पोर्टल',
    },
    organization: {
      en: 'Ministry of Labour & Employment, Govt. of India',
      hi: 'श्रम एवं रोज़गार मंत्रालय, भारत सरकार',
    },
    url: 'https://samadhan.labour.gov.in/',
    description: {
      en: 'Online dispute management and conciliation tracking portal for industrial, wage, and labor-related claims.',
      hi: 'औद्योगिक, मजदूरी और श्रम संबंधी दावों के ऑनलाइन समाधान और समझौते के लिए आधिकारिक पोर्टल।',
    },
    badge: {
      en: 'Labour Conciliation',
      hi: 'श्रम समझौता मंच',
    },
  },
];

export const SupportPage: React.FC = () => {
  const { language, t } = useLanguage();

  // Area A: Safety Checklist state
  const [checkedSafety, setCheckedSafety] = useState<string[]>([]);

  // Area B: Accordion open item
  const [openWarning, setOpenWarning] = useState<string | null>('upfront_fee');

  // Area C: Persistent Document Checklist state
  const [checkedDocs, setCheckedDocs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(DOC_CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return ['id_doc', 'bank_details', 'work_diary'];
  });

  // Persist checkedDocs on change
  const handleToggleDoc = (docId: string) => {
    setCheckedDocs((prev) => {
      const next = prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId];
      try {
        localStorage.setItem(DOC_CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleToggleSafety = (itemId: string) => {
    setCheckedSafety((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleResetSafety = () => {
    setCheckedSafety([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827]">
      {/* Top Banner Navigation */}
      <div className="border-b border-[#E2E8F0] bg-white sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#334155] hover:text-[#0F766E] transition-colors p-1 rounded-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('common.backHome')}</span>
            </Link>
            <span className="text-[#E2E8F0]">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DBEAFE] text-[#0F766E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
              {t('support.hero.badge')}
            </span>
          </div>

          {/* Print / Save Action */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-[#334155] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#111827] active:scale-[0.98] transition-all shadow-2xs"
            title="Print or save this safety guide as PDF"
          >
            <Printer className="w-4 h-4 text-[#0F766E]" />
            <span>{t('support.printBtn')}</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Hero */}
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E2E8F0] text-[#334155] text-xs font-bold uppercase tracking-wider mb-3">
            {t('support.hero.badge')}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight">
            {t('support.hero.title')}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
            {t('support.hero.subtitle')}
          </p>
        </div>

        {/* 4 Core Pillars Architecture */}
        <div className="space-y-12">
          {/* SECTION A: Check a job before accepting it */}
          <section
            id="job-checklist"
            aria-labelledby="section-safety-heading"
            className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] flex items-center justify-center font-bold text-sm">
                    A
                  </div>
                  <h2 id="section-safety-heading" className="font-serif text-2xl font-bold text-[#111827]">
                    {t('support.secA.title')}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  {t('support.secA.desc')}
                </p>
              </div>

              {/* Completion Progress & Reset */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                    checkedSafety.length === JOB_SAFETY_CHECKS.length
                      ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                      : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>
                    {language === 'hi'
                      ? `${JOB_SAFETY_CHECKS.length} में से ${checkedSafety.length} बातें जाँची गईं`
                      : `${checkedSafety.length} of ${JOB_SAFETY_CHECKS.length} Points Verified`}
                  </span>
                </span>

                {checkedSafety.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetSafety}
                    className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#111827] p-1 rounded-md transition-colors"
                    aria-label={t('common.reset')}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('common.reset')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JOB_SAFETY_CHECKS.map((item, idx) => {
                const isChecked = checkedSafety.includes(item.id);
                const label = getLocalizedText(item.label, language);
                const detail = getLocalizedText(item.detail, language);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleSafety(item.id)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left flex items-start gap-3.5 transition-all focus-visible:outline-2 focus-visible:outline-[#0F766E] ${
                      isChecked
                        ? 'border-[#0F766E] bg-[#F0FDFA]/70 shadow-xs ring-1 ring-[#0F766E]'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1] hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                        isChecked
                          ? 'bg-[#0F766E] border-[#0F766E] text-white'
                          : 'border-[#CBD5E1] bg-white text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                          0{idx + 1}
                        </span>
                        {isChecked && (
                          <span className="text-[11px] font-semibold text-[#0F766E]">{t('support.secA.confirmed')}</span>
                        )}
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold mt-0.5 ${
                          isChecked ? 'text-[#0F766E]' : 'text-[#111827]'
                        }`}
                      >
                        {label}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback footer banner */}
            {checkedSafety.length === JOB_SAFETY_CHECKS.length ? (
              <div className="mt-6 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-3 text-xs sm:text-sm text-[#166534]">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
                <span>
                  <strong>{language === 'hi' ? 'सभी बातें जाँची गईं!' : 'All points reviewed!'}</strong>{' '}
                  {t('support.secA.allVerified')}
                </span>
              </div>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2 text-xs text-[#64748B]">
                <Info className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>{t('support.secA.tip')}</span>
              </div>
            )}
          </section>

          {/* SECTION B: Watch out for suspicious job offers */}
          <section
            id="scam-warnings"
            aria-labelledby="section-scams-heading"
            className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-xs"
          >
            <div className="pb-6 border-b border-[#E2E8F0] mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center font-bold text-sm">
                  B
                </div>
                <h2 id="section-scams-heading" className="font-serif text-2xl font-bold text-[#111827]">
                  {t('support.secB.title')}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {t('support.secB.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Accordion List (Left 8 cols) */}
              <div className="lg:col-span-8 space-y-3">
                {SCAM_WARNINGS.map((warning) => {
                  const isOpen = openWarning === warning.id;
                  const title = getLocalizedText(warning.title, language);
                  const shortDesc = getLocalizedText(warning.shortDesc, language);
                  const explanation = getLocalizedText(warning.explanation, language);
                  const recommendedAction = getLocalizedText(warning.recommendedAction, language);

                  return (
                    <div
                      key={warning.id}
                      className={`rounded-2xl border transition-all ${
                        isOpen
                          ? 'border-[#F59E0B] bg-[#FFFBEB]/40 shadow-xs'
                          : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenWarning(isOpen ? null : warning.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus-visible:outline-2 focus-visible:outline-[#0F766E] rounded-2xl"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              isOpen ? 'text-[#D97706]' : 'text-[#64748B]'
                            }`}
                          />
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                              {title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
                              {shortDesc}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 mt-0.5 ${
                            isOpen ? 'rotate-180 text-[#D97706]' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3 border-t border-[#FDE68A]/60">
                              <div>
                                <span className="text-xs font-bold text-[#92400E] uppercase tracking-wider block mb-1">
                                  {t('support.secB.why')}
                                </span>
                                <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
                                  {explanation}
                                </p>
                              </div>

                              <div className="p-3.5 rounded-xl bg-white border border-[#FDE68A] text-[#92400E]">
                                <span className="text-xs font-bold uppercase tracking-wider block text-[#B45309] mb-1">
                                  {t('support.secB.action')}
                                </span>
                                <p className="text-xs sm:text-sm text-[#78350F] font-medium leading-relaxed">
                                  {recommendedAction}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* 4-Step Quick Action Guide Box (Right 4 cols) */}
              <div className="lg:col-span-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
                  <ShieldCheck className="w-5 h-5 text-[#0F766E]" />
                  <h3 className="text-sm font-bold text-[#111827]">{t('support.guide.title')}</h3>
                </div>

                <div className="space-y-3.5 text-xs text-[#334155]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[#111827] block">{t('support.guide.step1.title')}</strong>
                      <span>{t('support.guide.step1.desc')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[#111827] block">{t('support.guide.step2.title')}</strong>
                      <span>{t('support.guide.step2.desc')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[#111827] block">{t('support.guide.step3.title')}</strong>
                      <span>{t('support.guide.step3.desc')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[#111827] block">{t('support.guide.step4.title')}</strong>
                      <span>{t('support.guide.step4.desc')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] text-[#64748B] leading-snug">
                  <em>
                    {language === 'hi'
                      ? 'सलाह: यह मार्गदर्शन व्यावहारिक सावधानियाँ प्रदान करता है और यह गारंटी नहीं देता कि हर नियोक्ता पूरी तरह भरोसेमंद है।'
                      : 'Disclaimer: This guidance provides practical precautions and does not guarantee that every prospective employer is trustworthy.'}
                  </em>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION C: Keep useful documents ready */}
          <section
            id="document-records"
            aria-labelledby="section-docs-heading"
            className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center font-bold text-sm">
                    C
                  </div>
                  <h2 id="section-docs-heading" className="font-serif text-2xl font-bold text-[#111827]">
                    {t('support.secC.title')}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  {t('support.secC.desc')}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] self-start sm:self-auto">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>
                  {language === 'hi'
                    ? `${DOCUMENT_RECORDS.length} में से ${checkedDocs.length} तैयार`
                    : `${checkedDocs.length} of ${DOCUMENT_RECORDS.length} Ready`}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENT_RECORDS.map((doc) => {
                const isSelected = checkedDocs.includes(doc.id);
                const title = getLocalizedText(doc.title, language);
                const purpose = getLocalizedText(doc.purpose, language);
                const guidance = getLocalizedText(doc.guidance, language);

                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleToggleDoc(doc.id)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all focus-visible:outline-2 focus-visible:outline-[#0F766E] ${
                      isSelected
                        ? 'border-[#0F766E] bg-[#F0FDFA]/70 shadow-xs ring-1 ring-[#0F766E]'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                            isSelected
                              ? 'bg-[#0F766E] border-[#0F766E] text-white'
                              : 'bg-white border-[#CBD5E1] text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <span className="text-[11px] font-semibold text-[#64748B]">
                          {isSelected
                            ? (language === 'hi' ? 'तैयार है' : 'Marked Ready')
                            : (language === 'hi' ? 'क्लिक करके चुनें' : 'Click to Mark')}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#111827] mb-1">{title}</h3>
                      <p className="text-xs text-[#0F766E] font-medium mb-2">{purpose}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed">
                      {guidance}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Privacy notice regarding documents */}
            <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span>{t('support.secC.privacy')}</span>
            </div>
          </section>

          {/* SECTION D: Official help and resources */}
          <section
            id="official-resources"
            aria-labelledby="section-resources-heading"
            className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 lg:p-10 shadow-xs"
          >
            <div className="pb-6 border-b border-[#E2E8F0] mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] flex items-center justify-center font-bold text-sm">
                  D
                </div>
                <h2 id="section-resources-heading" className="font-serif text-2xl font-bold text-[#111827]">
                  {t('support.secD.title')}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                {t('support.secD.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFICIAL_RESOURCES.map((res) => {
                const name = getLocalizedText(res.name, language);
                const org = getLocalizedText(res.organization, language);
                const desc = getLocalizedText(res.description, language);
                const badge = getLocalizedText(res.badge, language);

                return (
                  <div
                    key={res.url}
                    className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 flex flex-col justify-between hover:border-[#0F766E] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold text-[#0F766E] bg-[#DBEAFE] px-2.5 py-0.5 rounded-full">
                          {badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#111827] mb-1">
                        {name}
                      </h3>
                      <p className="text-xs font-semibold text-[#64748B] mb-3">
                        {org}
                      </p>
                      <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[#E2E8F0]">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F766E] hover:text-[#115E59] group"
                      >
                        <span>{t('support.secD.visit')}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Emergency & Official Assistance Note */}
            <div className="mt-8 p-6 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">{t('support.emergency.title')}</h3>
                  <p className="text-xs text-[#334155] mt-0.5 leading-relaxed">
                    {t('support.emergency.desc')}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white border border-[#99F6E4] text-[#0F766E] shrink-0">
                {t('support.emergency.number')}
              </div>
            </div>

            {/* Clear Truthful Disclaimer */}
            <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
              <p>
                <em>
                  {t('support.disclaimer')}
                </em>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
