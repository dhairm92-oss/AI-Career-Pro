import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';

interface OnboardingScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  language,
  onNavigate,
}) => {
  const isRTL = language === 'ar';

  const compTiers = [
    { text: '$110K - $140K', labelEn: 'Senior Lead Tier', labelAr: 'مستوى القيادي الأول' },
    { text: '$140K - $180K', labelEn: 'VP / Director Tier', labelAr: 'مستوى نائب الرئيس / المدير التنفيذي' },
    { text: '$180K - $250K+', labelEn: 'C-Suite / Senior Executive', labelAr: 'الإدارة التنفيذية العليا C-Suite' },
    { text: '$250K - $350K', labelEn: 'Executive Partner', labelAr: 'شريك تنفيذي دولي' },
    { text: '$350K+', labelEn: 'Board / Global Head', labelAr: 'مجالس الإدارة / المستوى السيادي' },
  ];

  const [currentTierIndex, setCurrentTierIndex] = useState(2);
  const [selectedCompetencies, setSelectedCompetencies] = useState<string[]>([
    'enterprise_arch',
    'cloud_gov',
    'change_mgmt',
    'ai_strategy',
  ]);

  const toggleCompetency = (id: string) => {
    setSelectedCompetencies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const competencies = [
    {
      id: 'enterprise_arch',
      icon: 'account_tree',
      nameEn: 'Enterprise Architecture',
      nameAr: 'بنية المنشأة الرقمية',
    },
    {
      id: 'cloud_gov',
      icon: 'cloud_done',
      nameEn: 'Cloud Sovereign Governance',
      nameAr: 'الحوكمة السحابية السيادية',
    },
    {
      id: 'change_mgmt',
      icon: 'groups_3',
      nameEn: 'Change Leadership',
      nameAr: 'قيادة التغيير والتحول',
    },
    {
      id: 'ai_strategy',
      icon: 'trending_up',
      nameEn: 'AI Strategy & P&L',
      nameAr: 'استراتيجية الذكاء والربحية P&L',
    },
  ];

  return (
    <div className="flex-1 flex flex-col w-full relative px-4 pt-3 pb-8 text-left">
      {/* Top Brand Header */}
      <div className="flex items-center justify-between pt-1 pb-2 px-1">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
          <span className="text-[#dbfcff] font-bold text-xs tracking-wider uppercase">
            AI CAREER PRO
          </span>
        </div>
        <span className="text-[#b9cacb] text-[10px] uppercase tracking-widest font-mono">
          {isRTL ? 'معالج التهيئة القيادية' : 'Executive Onboarding Wizard'}
        </span>
      </div>

      {/* Progress & Stepper */}
      <div className="relative w-full rounded-xl bg-[#171b26] p-4 shadow-xl overflow-hidden border border-[#3b494b]/30 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00f0ff]/20 text-[#7df4ff] text-xs font-bold">
              3/4
            </span>
            <span className="text-white font-bold text-sm">
              {isRTL ? 'تحديد المسار القيادي والنطاق' : 'Target Career Trajectory & Scope'}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 bg-[#313540]/60 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#00dbe9] animate-pulse"></span>
            <span className="text-[#7df4ff] text-[10px] font-bold font-mono">
              75% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#313540] h-2 rounded-full overflow-hidden p-0.5 relative">
          <div className="h-full bg-gradient-to-r from-[#00f0ff] via-[#0566d9] to-[#adc6ff] rounded-full w-3/4 transition-all duration-500 shadow-[0_0_12px_rgba(0,240,255,0.4)]"></div>
        </div>

        {/* Stepper Pipeline */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-1 text-center">
          <div className="flex flex-col items-center space-y-1 opacity-90">
            <div className="w-8 h-8 rounded-full bg-[#313540] flex items-center justify-center text-[#7df4ff]">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>
            <span className="text-white text-[10px] font-medium">{isRTL ? 'الهوية' : 'Identity'}</span>
          </div>

          <div className="flex flex-col items-center space-y-1 opacity-90">
            <div className="w-8 h-8 rounded-full bg-[#313540] flex items-center justify-center text-[#7df4ff]">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>
            <span className="text-white text-[10px] font-medium">{isRTL ? 'الخبرات' : 'Experience'}</span>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 flex items-center justify-center text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              <span className="text-xs font-bold font-mono">03</span>
            </div>
            <span className="text-[#00f0ff] text-[10px] font-bold">{isRTL ? 'المسار' : 'Trajectory'}</span>
          </div>

          <div className="flex flex-col items-center space-y-1 opacity-45">
            <div className="w-8 h-8 rounded-full bg-[#313540] flex items-center justify-center text-[#b9cacb]">
              <span className="text-xs font-bold font-mono">04</span>
            </div>
            <span className="text-[#b9cacb] text-[10px] font-medium">{isRTL ? 'اللغة' : 'Language'}</span>
          </div>
        </div>
      </div>

      {/* Main Form Blocks */}
      <div className="flex flex-col space-y-4">
        {/* Intro */}
        <div className="px-1">
          <h2 className="text-white font-bold text-lg leading-tight mb-1">
            {isRTL
              ? 'تحديد المسار والارتقاء التنفيذي'
              : 'Define Executive Trajectory & Scope'}
          </h2>
          <p className="text-xs text-[#b9cacb] leading-relaxed">
            {isRTL
              ? 'معايرة المؤشرات القيادية والمطابقة الخوارزمية مع متطلبات المناصب العليا ومجالس الإدارة.'
              : 'Calibrating leadership benchmarks and algorithmic matching against senior executive and C-suite requisitions.'}
          </p>
        </div>

        {/* Section 1: Target Executive Role */}
        <div className="rounded-xl bg-[#171b26] p-4 shadow-lg space-y-3 border border-[#3b494b]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#7df4ff] text-[20px]">
                military_tech
              </span>
              <span className="text-white font-bold text-sm">
                {isRTL ? 'المنصب القيادي المستهدف' : 'Target Executive Role'}
              </span>
            </div>
            <span className="text-[#ffe088] text-[10px] font-bold bg-[#313540] px-2 py-0.5 rounded font-mono">
              C-Suite / VP
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0a0e18] border border-[#00f0ff]/35 flex items-center justify-between shadow-[0_0_16px_rgba(0,240,255,0.1)]">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#00f0ff]/15 flex items-center justify-center text-[#00f0ff] shrink-0">
                <span className="material-symbols-outlined text-[20px]">badge</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[#dbfcff] font-bold text-sm truncate">
                  {isRTL
                    ? 'نائب رئيس التحول الرقمي / الرئيس التنفيذي للرقمنة'
                    : 'VP of Digital Transformation / CDO'}
                </span>
                <span className="text-[#b9cacb] text-xs truncate">
                  {isRTL
                    ? 'الاستراتيجية المؤسسية والذكاء الاصطناعي السيادي'
                    : 'Enterprise Strategy & Sovereign AI Modernization'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#00f0ff] shrink-0 text-[20px]">
              check_circle
            </span>
          </div>
        </div>

        {/* Section 2: Target Compensation & Tier */}
        <div className="rounded-xl bg-[#171b26] p-4 shadow-lg space-y-3 border border-[#3b494b]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#7df4ff] text-[20px]">
                payments
              </span>
              <span className="text-white font-bold text-sm">
                {isRTL ? 'نطاق التعويض المالي والمستوى' : 'Target Compensation & Tier'}
              </span>
            </div>
            <span className="text-[#00dbe9] text-[10px] font-bold bg-[#313540] px-2 py-0.5 rounded">
              {isRTL
                ? compTiers[currentTierIndex].labelAr
                : compTiers[currentTierIndex].labelEn}
            </span>
          </div>

          {/* Stepper Dial */}
          <div className="flex items-center justify-between bg-[#0a0e18] p-3 rounded-lg border border-[#3b494b]/20">
            <button
              type="button"
              onClick={() => {
                if (currentTierIndex > 0) setCurrentTierIndex(currentTierIndex - 1);
              }}
              disabled={currentTierIndex === 0}
              className="w-11 h-11 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] disabled:opacity-40 flex items-center justify-center text-[#7df4ff] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-white font-extrabold text-2xl tracking-tight font-mono">
                {compTiers[currentTierIndex].text}
              </span>
              <span className="text-[#00dbe9] text-[11px] mt-0.5">
                (
                {isRTL
                  ? compTiers[currentTierIndex].labelAr
                  : compTiers[currentTierIndex].labelEn}
                )
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentTierIndex < compTiers.length - 1)
                  setCurrentTierIndex(currentTierIndex + 1);
              }}
              disabled={currentTierIndex === compTiers.length - 1}
              className="w-11 h-11 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] disabled:opacity-40 flex items-center justify-center text-[#7df4ff] active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {compTiers.slice(0, 4).map((tier, idx) => (
              <button
                key={tier.text}
                type="button"
                onClick={() => setCurrentTierIndex(idx)}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all cursor-pointer border ${
                  currentTierIndex === idx
                    ? 'bg-[#0566d9]/30 text-[#adc6ff] border-[#0566d9] shadow-[0_0_12px_rgba(5,102,217,0.3)]'
                    : 'bg-[#1c1f2a] text-[#b9cacb] border-transparent hover:bg-[#262a35]'
                }`}
              >
                {tier.text}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Core Strategic Competencies */}
        <div className="rounded-xl bg-[#171b26] p-4 shadow-lg space-y-3 border border-[#3b494b]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#7df4ff] text-[20px]">
                hub
              </span>
              <span className="text-white font-bold text-sm">
                {isRTL ? 'الكفاءات الاستراتيجية المعتمدة' : 'Core Strategic Competencies'}
              </span>
            </div>
            <span className="text-[#b9cacb] text-xs font-mono">
              {selectedCompetencies.length} {isRTL ? 'محدد' : 'Selected'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {competencies.map((comp) => {
              const isSelected = selectedCompetencies.includes(comp.id);
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => toggleCompetency(comp.id)}
                  className={`flex items-center space-x-2.5 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#262a35]/90 border-[#00f0ff]/50 text-white shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'bg-[#171b26] border-[#3b494b]/30 text-[#b9cacb] hover:bg-[#262a35]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isSelected ? 'text-[#00f0ff]' : 'text-[#849495]'
                    }`}
                  >
                    {comp.icon}
                  </span>
                  <span className="text-xs font-bold leading-tight">
                    {isRTL ? comp.nameAr : comp.nameEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Verification Source */}
        <div className="rounded-xl bg-[#171b26] p-4 shadow-lg space-y-2 border border-[#3b494b]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#7df4ff] text-[20px]">
                link
              </span>
              <span className="text-white font-bold text-sm">
                {isRTL ? 'مصدر التحقق المعتمد' : 'Verification Source'}
              </span>
            </div>
            <span className="text-[#ffe088] text-[10px] font-bold bg-[#313540] px-2 py-0.5 rounded font-mono">
              Encrypted
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('05_docs_intel')}
            className="w-full flex items-center justify-between p-3.5 rounded-lg bg-[#1c1f2a] hover:bg-[#262a35] transition-all border border-[#3b494b]/30 cursor-pointer"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#0566d9]/20 flex items-center justify-center text-[#adc6ff] shrink-0">
                <span className="material-symbols-outlined text-[20px]">attachment</span>
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-white text-xs font-bold truncate">
                  {isRTL
                    ? 'ربط وثائق الخبرة المعتمدة (PDF / LinkedIn)'
                    : 'Link Verified Career Credentials (PDF / LinkedIn)'}
                </span>
                <span className="text-[#b9cacb] text-[11px] truncate">
                  {isRTL
                    ? 'ملف تنفيذي موثق وتوقيع مشفر'
                    : 'Verified executive portfolio or cryptographically signed PDF'}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
              {isRTL ? 'arrow_back' : 'arrow_forward'}
            </span>
          </button>
        </div>

        {/* Zero Fake Data Guarantee */}
        <div className="rounded-xl bg-[#313540]/40 p-3.5 flex items-start space-x-3 shadow-inner border border-[#3b494b]/30">
          <div className="w-8 h-8 rounded-full bg-[#fdd55a]/20 flex items-center justify-center text-[#ffe088] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col space-y-1 text-left">
            <div className="flex items-center space-x-2">
              <span className="text-[#ffe088] text-xs font-bold">
                {isRTL ? 'ضمان عدم تزييف البيانات' : 'Zero Fake Data Guarantee'}
              </span>
              <span className="text-[#b9cacb] text-[9px] bg-[#0a0e18] px-1.5 py-0.5 rounded font-mono">
                SOVEREIGN-VERIFIED
              </span>
            </div>
            <p className="text-[#b9cacb] text-xs leading-relaxed">
              {isRTL
                ? 'ملف تنفيذي حقيقي وموثق فقط. لا أدوار مصطنعة أو خبرات غير مؤكدة بدون مصادقة رقمية مباشرة.'
                : 'Zero Fake Data Guarantee • Sovereign verified profile only. No fabricated roles or simulated experience without direct cryptographic endorsement.'}
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Actions */}
      <div className="pt-5 pb-2 flex flex-col space-y-2 mt-auto">
        <button
          type="button"
          onClick={() => onNavigate('04_dashboard')}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#0566d9] text-[#00363a] flex items-center justify-center space-x-2 font-bold text-sm shadow-[0_0_24px_rgba(0,240,255,0.35)] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>
            {isRTL ? 'تأكيد المسار والمتابعة للرئيسية' : 'Confirm Trajectory & Proceed'}
          </span>
          <span className="material-symbols-outlined text-[18px]">
            {isRTL ? 'arrow_back' : 'arrow_forward'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('02_auth')}
          className="w-full h-11 rounded-lg bg-[#171b26] text-[#b9cacb] text-xs font-semibold hover:text-white flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isRTL ? 'arrow_forward' : 'arrow_back'}
          </span>
          <span>{isRTL ? 'الرجوع لبوابة التحقق' : 'Back to Gateway'}</span>
        </button>
      </div>
    </div>
  );
};
