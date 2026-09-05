import React, { useState } from 'react';
import { useExecutive } from '../../context/ExecutiveContext';
import { Language } from '../../types';

interface HeadhunterRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

interface SearchFirm {
  id: string;
  name: string;
  locationAr: string;
  locationEn: string;
  managingPartnerAr: string;
  managingPartnerEn: string;
  specialtyAr: string;
  specialtyEn: string;
  activeMandatesCount: number;
  reputationBadge: string;
  avatar: string;
}

interface ConfidentialMandate {
  id: string;
  titleAr: string;
  titleEn: string;
  firmName: string;
  entityTypeAr: string;
  entityTypeEn: string;
  salaryBenchmarkAr: string;
  salaryBenchmarkEn: string;
  confidentialityCode: string;
  matchScore: number;
  overviewAr: string;
  overviewEn: string;
}

export const HeadhunterRadarModal: React.FC<HeadhunterRadarModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();
  const [activeTab, setActiveTab] = useState<'firms' | 'mandates' | 'outreach'>('mandates');
  const [selectedMandateId, setSelectedMandateId] = useState<string>('c-mandate-1');

  if (!isOpen) return null;

  const firms: SearchFirm[] = [
    {
      id: 'korn-ferry',
      name: 'Korn Ferry Riyadh',
      locationAr: 'مركز الملك عبدالله المالي (KAFD) • البرج 1.10',
      locationEn: 'King Abdullah Financial District (KAFD) • Tower 1.10',
      managingPartnerAr: 'أ. فيصل السديري (Managing Partner)',
      managingPartnerEn: 'Faisal Al-Sudairy (Senior Partner)',
      specialtyAr: 'تعيينات الرؤساء التنفيذيين ومجالس إدارة المشاريع الكبرى',
      specialtyEn: 'Giga-Project CEOs & Sovereign Board Appointments',
      activeMandatesCount: 8,
      reputationBadge: 'TIER-1 GLOBAL',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'heidrick-struggles',
      name: 'Heidrick & Struggles',
      locationAr: 'برج المملكة • الطابق 42، الرياض',
      locationEn: 'Kingdom Tower • Floor 42, Riyadh',
      managingPartnerAr: 'ماركوس ستيرلينغ & د. نورة الشهري',
      managingPartnerEn: 'Marcus Sterling & Dr. Noura Al-Shehri',
      specialtyAr: 'القيادات المالية وصناديق الاستثمار السيادية (PIF Portfolio)',
      specialtyEn: 'Sovereign Wealth Funds & Financial C-Suite Leadership',
      activeMandatesCount: 6,
      reputationBadge: 'GLOBAL RETAINER',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'spencer-stuart',
      name: 'Spencer Stuart Middle East',
      locationAr: 'أبراج العليا • طريق الملك فهد',
      locationEn: 'Olaya Towers • King Fahd Road, Riyadh',
      managingPartnerAr: 'د. كريم عبدالهادي',
      managingPartnerEn: 'Dr. Karim Abdelhadi (Executive Director)',
      specialtyAr: 'قيادات التحول الرقمي والذكاء الاصطناعي السيادي',
      specialtyEn: 'Chief Digital Officers & Sovereign AI Architects',
      activeMandatesCount: 5,
      reputationBadge: 'ELITE SEARCH',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'egon-zehnder',
      name: 'Egon Zehnder',
      locationAr: 'المدينة الرقمية • مجمع واحة النخيل، الرياض',
      locationEn: 'Digital City • Riyadh Tech Oasis',
      managingPartnerAr: 'أ. طارق الشعلان',
      managingPartnerEn: 'Tariq Al-Shaalan (Partner)',
      specialtyAr: 'حوكمة مجالس الإدارة ولجان الترشيحات والمكافآت (NRC)',
      specialtyEn: 'Board Advisory & NRC Succession Architecture',
      activeMandatesCount: 4,
      reputationBadge: 'TRUSTED ADVISOR',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const mandates: ConfidentialMandate[] = [
    {
      id: 'c-mandate-1',
      titleAr: 'سري للغاية: رئيس قطاع البنية التحتية والمدن الإدراكية',
      titleEn: 'Confidential: Chief Cognitive Infrastructure Officer',
      firmName: 'Korn Ferry Riyadh',
      entityTypeAr: 'مشروع وطني عملاق (Giga-Project Tier 1)',
      entityTypeEn: 'Sovereign Giga-Project Authority',
      salaryBenchmarkAr: '210,000 - 260,000 ر.س شهرياً + أسهم LTI + فيلا رئاسية',
      salaryBenchmarkEn: 'SAR 210,000 - 260,000 / mo + LTI Pool + Executive Housing',
      confidentialityCode: 'SOV-MANDATE-774-KSA',
      matchScore: 99.4,
      overviewAr: 'قيادة البنية الرقمية الشاملة لمدينة مليونية مستقلة، وإدارة ميزانية رأسمالية تتجاوز 4 مليار ريال سعودي مع حوكمة أمن سيبراني صارمة.',
      overviewEn: 'Lead end-to-end cognitive systems for a 1M+ inhabitant smart city, stewarding a CapEx budget exceeding SAR 4.0B under zero-trust sovereignty.',
    },
    {
      id: 'c-mandate-2',
      titleAr: 'سري للغاية: الرئيس التنفيذي للاستثمار والتقنيات العميقة',
      titleEn: 'Confidential: Chief Investment Officer (DeepTech Fund)',
      firmName: 'Heidrick & Struggles',
      entityTypeAr: 'محفظة استثمارية لصندوق الثروة السيادية',
      entityTypeEn: 'Sovereign Wealth Venture Platform',
      salaryBenchmarkAr: '190,000 - 240,000 ر.س شهرياً + نسبة أرباح Carry 2.5%',
      salaryBenchmarkEn: 'SAR 190,000 - 240,000 / mo + 2.5% Carry Participation',
      confidentialityCode: 'SOV-MANDATE-912-PIF',
      matchScore: 97.8,
      overviewAr: 'إدارة محفظة أصول استثمارية عالية التقنية بقيمة 15 مليار ريال مع نشر استثمارات الجيل القادم للذكاء الاصطناعي ورقائق أشباه الموصلات.',
      overviewEn: 'Deploy SAR 15B capital across sovereign tech stacks, semiconductor ventures, and generative AI infrastructure across EMEA.',
    },
    {
      id: 'c-mandate-3',
      titleAr: 'سري للغاية: نائب رئيس أول للأمن السيبراني والسيادة السحابية',
      titleEn: 'Confidential: SVP Sovereign Cybersecurity & OT Defense',
      firmName: 'Spencer Stuart',
      entityTypeAr: 'شركة وطنية كبرى للطاقة المتجددة والهيدروجين',
      entityTypeEn: 'National Clean Energy & Green Hydrogen Major',
      salaryBenchmarkAr: '185,000 - 230,000 ر.س شهرياً + مكافأة سنوية 50%',
      salaryBenchmarkEn: 'SAR 185,000 - 230,000 / mo + 50% Annual Target Bonus',
      confidentialityCode: 'SOV-MANDATE-503-NEOM',
      matchScore: 98.6,
      overviewAr: 'تأمين أضخم مزارع الطاقة المتجددة في العالم ضد الهجمات السيبرانية المعقدة وتأسيس مركز دفاع سيادي مرتبط بالجهات التنظيمية الوطنية.',
      overviewEn: 'Fortify global gigawatt clean energy grids against state-actor cyber offensives with NCA-mandated sovereign command centers.',
    },
  ];

  const currentMandate = mandates.find((m) => m.id === selectedMandateId) || mandates[0];

  const outreachDraft = isRTL
    ? `عناية الشريك الإداري المسؤول (${currentMandate.firmName})،
بخصوص التفويض القيادي السري: [${currentMandate.confidentialityCode} - ${currentMandate.titleAr}].

يسرني التواصل معكم بصفتي ${currentProfile.titleAr}، وبخبرة قيادية تفوق ${currentProfile.yearsExperience} عاماً في إدارة ميزانيات تفوق (${currentProfile.quantifiedBudgetManagedAr}).
ملفي المهني موثق سيادياً برقم نفاذ معتمد وبصمة رقمية مشفرة SHA-256، مع جاهزية تامة للتوقيع على اتفاقية عدم الإفصاح السرية (NDA) وبحث تفاصيل التكليف القيادي.

الاسم: ${currentProfile.nameAr}
رابط الاعتماد الرقمي: https://sovereign-verify.gov.sa/cert/${currentProfile.id}-2030`
    : `Attention Senior Managing Partner (${currentMandate.firmName}),
Subject: Confidential Leadership Mandate [${currentMandate.confidentialityCode} - ${currentMandate.titleEn}].

I am reaching out regarding your discreet executive search. As ${currentProfile.titleEn} with ${currentProfile.yearsExperience}+ years of leadership stewarding portfolios of (${currentProfile.quantifiedBudgetManagedEn}), I offer verifiable alignment with your client's sovereign objectives.
My profile is programmatically verified under Saudi National Digital Trust (NCA & SDAIA sealed). I welcome an executive NDA briefing at your earliest convenience.

Executive: ${currentProfile.nameEn}
Digital Verification Link: https://sovereign-verify.gov.sa/cert/${currentProfile.id}-2030`;

  const handleCopyOutreach = () => {
    navigator.clipboard?.writeText(outreachDraft);
    onShowToast(
      isRTL
        ? 'تم نسخ مسودة الخطاب التنفيذي السري للشريك الإداري بنجاح'
        : 'Confidential executive briefing note copied to clipboard'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-6 rounded-2xl bg-[#0f1423] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] flex flex-col max-h-[92vh] overflow-hidden text-start">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131a2d] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
              <span className="material-symbols-outlined text-[18px]">radar</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{isRTL ? 'رادار صائدي الكفاءات والوظائف غير المعلنة' : 'Executive Headhunters & Hidden Jobs Radar'}</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                  OFF-MARKET
                </span>
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                {isRTL ? 'بيوت الاستقطاب التنفيذي العالمية في الرياض ومشاريع الرؤية' : 'Tier-1 Executive Search Firms & Discreet C-Suite Mandates'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 bg-[#0d121f] px-4 pt-2 shrink-0 gap-2">
          <button
            onClick={() => setActiveTab('mandates')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'mandates'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">lock</span>
            <span>{isRTL ? 'الوظائف غير المعلنة (3)' : 'Confidential Mandates (3)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('firms')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'firms'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">domain</span>
            <span>{isRTL ? 'بيوت الاستقطاب المعتمدة' : 'Search Firms (KSA)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'outreach'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">send</span>
            <span>{isRTL ? 'مولد التواصل السري' : 'Confidential Outreach'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* TAB 1: CONFIDENTIAL OFF-MARKET MANDATES */}
          {activeTab === 'mandates' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-cyan-400 text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <p className="text-xs text-cyan-200 leading-relaxed">
                  {isRTL
                    ? 'هذه المناصب لا تُنشر في لينكد إن أو بوابات التوظيف العامة. تتم فقط عبر تفويضات حصرية موجهة من مجالس الإدارة وصندوق الاستثمارات العامة للشركاء الإداريين.'
                    : 'These appointments are not publicly advertised. They are retained directly by Board Nomination Committees and Sovereign Funds for confidential placement.'}
                </p>
              </div>

              <div className="space-y-2.5">
                {mandates.map((mandate) => (
                  <div
                    key={mandate.id}
                    onClick={() => setSelectedMandateId(mandate.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedMandateId === mandate.id
                        ? 'bg-[#182338] border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-[#121828] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-mono text-[9px] font-bold">
                            {mandate.confidentialityCode}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            via {mandate.firmName}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">
                          {isRTL ? mandate.titleAr : mandate.titleEn}
                        </h4>
                        <p className="text-xs text-cyan-400 font-medium">
                          {isRTL ? mandate.entityTypeAr : mandate.entityTypeEn}
                        </p>
                      </div>

                      <div className="text-end shrink-0">
                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                          {mandate.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                      {isRTL ? mandate.overviewAr : mandate.overviewEn}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between gap-2 flex-wrap text-xs">
                      <span className="font-mono text-[#fdd55a] font-bold">
                        {isRTL ? mandate.salaryBenchmarkAr : mandate.salaryBenchmarkEn}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMandateId(mandate.id);
                          setActiveTab('outreach');
                        }}
                        className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1 border border-cyan-500/30"
                      >
                        <span>{isRTL ? 'إعداد خطاب الشريك' : 'Draft Outreach'}</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SEARCH FIRMS IN RIYADH */}
          {activeTab === 'firms' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {firms.map((firm) => (
                <div
                  key={firm.id}
                  className="p-3.5 rounded-xl bg-[#121828] border border-white/10 hover:border-cyan-500/40 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={firm.avatar}
                        alt={firm.name}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{firm.name}</h4>
                        <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 text-[9px] font-mono font-bold">
                          {firm.reputationBadge}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      {firm.activeMandatesCount} {isRTL ? 'تفويض نشط' : 'Active Searches'}
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-gray-500">location_on</span>
                    <span>{isRTL ? firm.locationAr : firm.locationEn}</span>
                  </div>

                  <div className="text-xs text-gray-300">
                    <div className="text-gray-400 text-[10px]">{isRTL ? 'الشريك الإداري:' : 'Managing Partner:'}</div>
                    <div className="font-semibold text-white">{isRTL ? firm.managingPartnerAr : firm.managingPartnerEn}</div>
                  </div>

                  <div className="text-[11px] text-cyan-200 bg-white/5 p-2 rounded-lg leading-snug">
                    {isRTL ? firm.specialtyAr : firm.specialtyEn}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: CONFIDENTIAL OUTREACH DRAFT */}
          {activeTab === 'outreach' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#151c2e] border border-cyan-500/30 flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    {isRTL ? 'التفويض المستهدف حالياً' : 'Target Mandate'}
                  </span>
                  <div className="text-xs font-bold text-white">
                    {isRTL ? currentMandate.titleAr : currentMandate.titleEn}
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    {currentMandate.confidentialityCode} • {currentMandate.firmName}
                  </div>
                </div>

                <button
                  onClick={handleCopyOutreach}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-[#002b33] text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  <span>{isRTL ? 'نسخ الخطاب بالكامل' : 'Copy Briefing Note'}</span>
                </button>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={10}
                  value={outreachDraft}
                  className="w-full rounded-xl bg-[#0a0e18] border border-white/10 p-3.5 text-xs text-gray-200 font-mono leading-relaxed focus:outline-none focus:border-cyan-400/60"
                />
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>
                  {isRTL
                    ? 'يتضمن الخطاب رابط التوثيق السيادي المشفر، مما يعفي من طلب شهادات إضافية ويسرع توقيع اتفاقية السرية NDA.'
                    : 'The brief embeds cryptographic verification, bypassing redundant credentials verification.'}
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#0d121f] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>{isRTL ? 'حماية تامة للخصوصية • عدم الكشف عن بيانات الاتصال الشخصية دون إذن' : 'Strict Executive Discretion Guaranteed'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1c2436] hover:bg-[#26324b] text-white font-semibold cursor-pointer"
          >
            {isRTL ? 'إغلاق الرادار' : 'Close Radar'}
          </button>
        </div>

      </div>
    </div>
  );
};
