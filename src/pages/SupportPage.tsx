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

const DOC_CHECKLIST_STORAGE_KEY = 'sahayak_document_checklist';

interface SafetyCheckItem {
  id: string;
  label: string;
  detail: string;
}

const JOB_SAFETY_CHECKS: SafetyCheckItem[] = [
  {
    id: 'scope',
    label: 'Agreed work and responsibilities',
    detail: 'Are the exact daily tasks, work scope, and site conditions clear before you travel to the location?',
  },
  {
    id: 'pay_rate',
    label: 'Agreed pay rate & calculation unit',
    detail: 'Is the wage clearly fixed (per day, per job, or per hour) without ambiguous verbal promises?',
  },
  {
    id: 'timing_location',
    label: 'Working hours, site address & duration',
    detail: 'Do you know exact daily shift hours (start/end), complete worksite address, and expected number of days?',
  },
  {
    id: 'payment_schedule',
    label: 'Payment timing & delivery method',
    detail: 'Has the contractor agreed on when wages will be released (daily cash, weekly, or upon agreed milestones)?',
  },
  {
    id: 'contact_person',
    label: 'Identified hiring supervisor & direct number',
    detail: 'Do you have the direct name and working mobile number of the person authorized to approve payments on site?',
  },
  {
    id: 'safety_gear',
    label: 'Safety equipment & material responsibility',
    detail: 'Is it confirmed who provides protective equipment (helmet, boots, gloves) and required raw materials?',
  },
];

interface ScamWarning {
  id: string;
  title: string;
  shortDesc: string;
  explanation: string;
  recommendedAction: string;
}

const SCAM_WARNINGS: ScamWarning[] = [
  {
    id: 'upfront_fee',
    title: 'Upfront Registration or "Gate Entry" Fees',
    shortDesc: 'You are asked to pay money or a deposit before getting the job or entering the site.',
    explanation:
      'Legitimate contractors, building supervisors, and homeowners never charge job seekers a registration fee, gate token, or uniform deposit to begin work.',
    recommendedAction:
      'Never pay money to secure daily or contract work. Politely decline and walk away from any intermediary demanding advance payments.',
  },
  {
    id: 'terms_switch',
    title: 'Wage or Working Hours Reduced Upon Arrival',
    shortDesc: 'The promised daily wage is lowered or the shift extended after you reach the worksite.',
    explanation:
      'Some bad actors take advantage of a worker who has already traveled far by offering less than the agreed rate or adding extra rooms/floors without extra pay.',
    recommendedAction:
      'Do not start work under altered conditions. Remind the contractor of the prior agreement or renegotiate clearly before unpacking your tools.',
  },
  {
    id: 'doc_withholding',
    title: 'Holding Original Identity or Bank Documents',
    shortDesc: 'The employer or agent asks to keep your original Aadhaar, Voter Card, or Passbook.',
    explanation:
      'No employer or contractor has the legal authority to confiscate your original identity cards or bank books. They may only inspect a physical copy or view it for verification.',
    recommendedAction:
      'Keep original identification cards in your own possession at all times. Share only self-attested photocopies or digital views when required for security gate passes.',
  },
  {
    id: 'vague_employer',
    title: 'Hidden Employer Identity or Roadside-Only Pickups',
    shortDesc: 'The person hiring refuses to provide a worksite address, company name, or contact details.',
    explanation:
      'Anonymous job postings or offers where the contractor only agrees to pick you up from a highway crossing carry a high risk of non-payment or hazardous conditions.',
    recommendedAction:
      'Always obtain the exact building address, contractor name, and verified phone number before leaving home. Inform a family member of where you are working.',
  },
];

interface DocumentItem {
  id: string;
  title: string;
  purpose: string;
  guidance: string;
}

const DOCUMENT_RECORDS: DocumentItem[] = [
  {
    id: 'id_doc',
    title: 'Government Identity Record (Photocopy / Digital)',
    purpose: 'Aadhaar, Voter ID, or Driving License copy.',
    guidance: 'Useful for building society gate passes and site security register. Never hand over original physical cards.',
  },
  {
    id: 'bank_details',
    title: 'Bank Passbook / UPI QR Code',
    purpose: 'Account number, IFSC code, or active UPI ID.',
    guidance: 'Useful for direct electronic wage credit. Keep account details written clearly in a pocket notebook.',
  },
  {
    id: 'trade_cert',
    title: 'Trade Training or Apprenticeship Records (If Any)',
    purpose: 'ITI diploma, PMKVY skill card, or company work experience letter.',
    guidance: 'Helpful when negotiating skilled rates with formal engineering firms or commercial contractors.',
  },
  {
    id: 'work_diary',
    title: 'Personal Daily Work Diary & Wage Receipts',
    purpose: 'Pocket notebook recording dates, hours worked, supervisor name, and payments received.',
    guidance: 'Crucial personal evidence if payment delays or disputes arise later. Note down daily progress.',
  },
  {
    id: 'eshram_record',
    title: 'e-Shram Universal Account Number (UAN) Card',
    purpose: 'National unorganised worker registration card.',
    guidance: 'Enables linkages to government social welfare and accident assistance programmes.',
  },
];

interface OfficialResource {
  name: string;
  organization: string;
  url: string;
  description: string;
  badge: string;
}

const OFFICIAL_RESOURCES: OfficialResource[] = [
  {
    name: 'e-Shram Portal',
    organization: 'Ministry of Labour & Employment, Govt. of India',
    url: 'https://www.eshram.gov.in/',
    description:
      'Official national database for informal and unorganised workers. Register for a 12-digit Universal Account Number (UAN) to access social security benefits.',
    badge: 'National Worker Registry',
  },
  {
    name: 'National Career Service (NCS)',
    organization: 'Ministry of Labour & Employment, Govt. of India',
    url: 'https://www.ncs.gov.in/',
    description:
      'Nationwide portal providing free employment services, job matching, skill development listings, and career centre guidance without fees.',
    badge: 'Employment Portal',
  },
  {
    name: 'Samadhan Grievance Portal',
    organization: 'Ministry of Labour & Employment, Govt. of India',
    url: 'https://samadhan.labour.gov.in/',
    description:
      'Online dispute management and conciliation tracking portal for industrial, wage, and labor-related claims.',
    badge: 'Labour Conciliation',
  },
];

export const SupportPage: React.FC = () => {
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
              <span>Back to Home</span>
            </Link>
            <span className="text-[#E2E8F0]">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DBEAFE] text-[#0F766E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
              Worker Safety & Rights Guide
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
            <span>Print Safety Guide</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Hero */}
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#E2E8F0] text-[#334155] text-xs font-bold uppercase tracking-wider mb-3">
            Practical Worker Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight">
            Worker Rights, Safety & Verification
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#334155] leading-relaxed">
            Clear guidelines for daily-wage and contract workers. Check jobs before accepting, recognize suspicious offers, keep proper records, and access verified government welfare portals.
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
                    Check a Job Before Accepting It
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Go through these six critical points before agreeing to start work or traveling to a site.
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
                    {checkedSafety.length} of {JOB_SAFETY_CHECKS.length} Points Verified
                  </span>
                </span>

                {checkedSafety.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetSafety}
                    className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#111827] p-1 rounded-md transition-colors"
                    aria-label="Reset checklist"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JOB_SAFETY_CHECKS.map((item, idx) => {
                const isChecked = checkedSafety.includes(item.id);
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
                          <span className="text-[11px] font-semibold text-[#0F766E]">Confirmed</span>
                        )}
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold mt-0.5 ${
                          isChecked ? 'text-[#0F766E]' : 'text-[#111827]'
                        }`}
                      >
                        {item.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                        {item.detail}
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
                  <strong>All points reviewed!</strong> You have verified key details regarding pay, hours, contact, and safety with the employer.
                </span>
              </div>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2 text-xs text-[#64748B]">
                <Info className="w-4 h-4 text-[#0F766E] shrink-0" />
                <span>
                  Tip: If an employer hesitates to confirm the rate or working hours in advance, consider it a signal to proceed with caution.
                </span>
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
                  Watch Out for Suspicious Job Offers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Common warning signs reported by informal and migrant workers, and what action to take.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Accordion List (Left 8 cols) */}
              <div className="lg:col-span-8 space-y-3">
                {SCAM_WARNINGS.map((warning) => {
                  const isOpen = openWarning === warning.id;
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
                              {warning.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
                              {warning.shortDesc}
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
                                  Why This Happens:
                                </span>
                                <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
                                  {warning.explanation}
                                </p>
                              </div>

                              <div className="p-3.5 rounded-xl bg-white border border-[#FDE68A] text-[#92400E]">
                                <span className="text-xs font-bold uppercase tracking-wider block text-[#B45309] mb-1">
                                  What You Should Do:
                                </span>
                                <p className="text-xs sm:text-sm text-[#78350F] font-medium leading-relaxed">
                                  {warning.recommendedAction}
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
                  <h3 className="text-sm font-bold text-[#111827]">Quick Safety Action Guide</h3>
                </div>

                <div className="space-y-3.5 text-xs text-[#334155]">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[#111827] block">Pause & Do Not Rush</strong>
                      <span>If something feels suspicious, step back before agreeing or spending money.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[#111827] block">Ask Direct Questions</strong>
                      <span>Insist on knowing who will pay you, when, and the exact work address.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[#111827] block">Keep Clear Records</strong>
                      <span>Save SMS messages, take photos of the site board, and note supervisor numbers.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[#111827] block">Seek Appropriate Help</strong>
                      <span>Contact your local trade union or use official government labour grievance portals.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] text-[11px] text-[#64748B] leading-snug">
                  <em>Disclaimer: This guidance provides practical precautions and does not guarantee that every prospective employer is trustworthy.</em>
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
                    Keep Useful Documents & Records Ready
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Keep these records accessible on your phone or in a safe pocket file. Your checklist is saved automatically in your browser.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E2E8F0] self-start sm:self-auto">
                <FileCheck2 className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>{checkedDocs.length} of {DOCUMENT_RECORDS.length} Ready</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DOCUMENT_RECORDS.map((doc) => {
                const isSelected = checkedDocs.includes(doc.id);
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
                          {isSelected ? 'Marked Ready' : 'Click to Mark'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#111827] mb-1">{doc.title}</h3>
                      <p className="text-xs text-[#0F766E] font-medium mb-2">{doc.purpose}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed">
                      {doc.guidance}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Privacy notice regarding documents */}
            <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] flex items-center gap-2">
              <Info className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span>
                <strong>Document Privacy Notice:</strong> This checklist stores your readiness ticks in your local browser only. Sahayak does not request, upload, or collect your personal documents in this prototype.
              </span>
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
                  Official Government Portals & Resources
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                Verified official portals maintained by the Government of India for worker registration, career assistance, and conciliation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OFFICIAL_RESOURCES.map((res) => (
                <div
                  key={res.name}
                  className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 flex flex-col justify-between hover:border-[#0F766E] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-[#0F766E] bg-[#DBEAFE] px-2.5 py-0.5 rounded-full">
                        {res.badge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#111827] mb-1">
                      {res.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#64748B] mb-3">
                      {res.organization}
                    </p>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#E2E8F0]">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0F766E] hover:text-[#115E59] group"
                    >
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency & Official Assistance Note */}
            <div className="mt-8 p-6 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">Emergency Assistance in India</h3>
                  <p className="text-xs text-[#334155] mt-0.5 leading-relaxed">
                    For direct workplace violence, physical danger, or medical emergencies, dial the Unified Emergency Helpline <strong>112</strong>.
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white border border-[#99F6E4] text-[#0F766E] shrink-0">
                National Helpline: 112
              </div>
            </div>

            {/* Clear Truthful Disclaimer */}
            <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
              <p>
                <em>
                  Sahayak (सहायक) is an informational digital prototype and is not a government agency, legal aid clinic, or law firm. All listed external links lead to official Government of India websites.
                </em>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
