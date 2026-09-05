import React, { useState } from 'react';
import { ASSETS, CV_TEMPLATES } from '../../data/mockData';
import { ScreenId, Language } from '../../types';
import { ExecutiveDossierPdfModal } from '../modals/ExecutiveDossierPdfModal';

interface CvBuilderScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CvBuilderScreen: React.FC<CvBuilderScreenProps> = ({
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [activeTemplate, setActiveTemplate] = useState('classic');
  const [isEnhancedVerbs, setIsEnhancedVerbs] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Plus Jakarta Sans');
  const [showAtsSimulator, setShowAtsSimulator] = useState(false);
  const [isDossierPdfOpen, setIsDossierPdfOpen] = useState(false);

  const fonts = ['Plus Jakarta Sans', 'Inter Display', 'Calibri Pro', 'Georgia Modern'];

  const toggleEnhanceVerbs = () => {
    setIsEnhancedVerbs((prev) => !prev);
    onShowToast(
      !isEnhancedVerbs
        ? isRTL
          ? 'تم تعزيز الملخص بأفعال القيادة والتأثير المالي'
          : 'Summary upgraded with high-impact executive power verbs'
        : isRTL
        ? 'تمت استعادة الصياغة المعيارية'
        : 'Restored standard calibrated phrasing'
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Breadcrumb & Verification Pill */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1c2436] shadow-sm border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#00f0ff] tracking-wide">
            {isRTL ? 'ملف مهني موثق' : 'Verified Career Profile'}
          </span>
          <span className="text-[10px] text-[#94a3b8]">
            • {isRTL ? 'صفر تزييف' : 'Zero Fake Data'}
          </span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#121826] text-[#94a3b8] text-[10px] font-mono border border-white/10">
          <span className="material-symbols-outlined text-[13px] text-[#fdd55a]">
            lock_clock
          </span>
          <span>{isRTL ? 'موثق برمجياً' : 'Programmatically Verified'}</span>
        </div>
      </div>

      {/* Verified Profile Source Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161f30] via-[#121826] to-[#0b0f19] p-4 shadow-lg border border-white/10 backdrop-blur-xl">
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md shrink-0 bg-[#1c2436] border border-[#00f0ff]/30">
              <img
                src={ASSETS.PROFILE_IMAGE}
                alt="Dr. Tariq Al-Mansoor"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#00f0ff]/40 h-1"></div>
            </div>

            <div className="flex flex-col min-w-0 text-start">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-white truncate">
                  {isRTL ? 'د. طارق المنصور' : 'Dr. Tariq Al-Mansoor'}
                </h2>
                <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">
                  verified
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] truncate">
                {isRTL
                  ? 'رئيس قطاع الرقمنة • كبير مهندسي النظم'
                  : 'Chief Digital Officer • Chief Systems Strategist'}
              </p>
            </div>
          </div>

          <span className="px-2 py-1 rounded-md bg-[#00f0ff]/15 text-[#00f0ff] text-[10px] font-bold shrink-0 font-mono">
            99.8% Match
          </span>
        </div>

        {/* Cryptographic Bar */}
        <div className="mt-3.5 pt-3 flex items-center justify-between gap-2 bg-[#0a0e18]/60 rounded-lg px-3 py-2 border border-[#3b494b]/20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#00f0ff] text-[16px] shrink-0">
              fingerprint
            </span>
            <span className="text-[10px] text-[#b9cacb] truncate font-mono">
              Source: Verified Career Record (90d2...e)
            </span>
          </div>
          <span className="text-[10px] text-[#7df4ff] bg-[#313540]/60 px-2 py-0.5 rounded-full shrink-0 font-mono">
            {isRTL ? 'أصيل وموثق' : 'Authentic & Verified'}
          </span>
        </div>
      </div>

      {/* Enhanced Executive Summary */}
      <section className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
              psychology
            </span>
            <h3 className="text-sm font-bold text-white">
              {isRTL ? 'الملخص التنفيذي المحسن' : 'Enhanced Executive Summary'}
            </h3>
          </div>
          <span className="text-[10px] text-[#ffe088] bg-[#fdd55a]/15 px-2.5 py-1 rounded-full font-bold font-mono">
            ATS Ready
          </span>
        </div>

        <div className="rounded-xl bg-[#1c1f2a]/80 p-4 shadow-lg border border-[#3b494b]/30 space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between text-[#b9cacb] text-xs">
            <span className="text-[#00f0ff] flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>
                {isRTL
                  ? 'الصياغة القيادية (المستوى الأول C-Suite)'
                  : 'Active Formulation (Tier-1 Executive)'}
              </span>
            </span>
            <span className="text-[#849495] text-[10px]">182 words • 1.2 min read</span>
          </div>

          <div className="bg-[#0a0e18]/80 rounded-lg p-3.5 border border-[#3b494b]/20 shadow-inner">
            {isEnhancedVerbs ? (
              <p className="text-xs text-white leading-relaxed">
                <span className="text-[#00f0ff] font-semibold bg-[#00f0ff]/15 px-1 py-0.5 rounded">
                  {isRTL ? 'قاد وطور' : 'Spearheaded and scaled'}
                </span>{' '}
                {isRTL
                  ? 'التحول الرقمي الاستراتيجي عبر ٨ هيئات سيادية كبرى، و'
                  : 'strategic transformation across 8 sovereign enterprises, and '}
                <span className="text-[#00f0ff] font-semibold bg-[#00f0ff]/15 px-1 py-0.5 rounded">
                  {isRTL ? 'رسخ' : 'anchored'}
                </span>{' '}
                {isRTL
                  ? 'أطر الحوكمة الرقمية مما خفض التكاليف التشغيلية بنسبة '
                  : 'digital governance protocols that plummeted operational overhead by '}
                <span className="text-[#ffe088] font-bold font-mono">34%</span>{' '}
                {isRTL
                  ? 'مع تحقيق نمو متسارع في القيمة السوقية تجاوز '
                  : 'while generating over '}
                <span className="text-[#00f0ff] font-bold font-mono">SAR 120M</span>{' '}
                {isRTL
                  ? '١٢٠ مليون ريال على مدى ٣ سنوات مالية متتالية.'
                  : 'in incremental portfolio valuation across 3 fiscal years.'}
              </p>
            ) : (
              <p className="text-xs text-white leading-relaxed">
                <span className="text-[#00f0ff] font-semibold bg-[#00f0ff]/10 px-1 py-0.5 rounded">
                  {isRTL ? 'قاد' : 'Led'}
                </span>{' '}
                {isRTL
                  ? 'التحول التقني والاستراتيجي عبر ٨ جهات رئيسية، و'
                  : 'enterprise and strategic technology transformation across 8 major entities, and '}
                <span className="text-[#00f0ff] font-semibold bg-[#00f0ff]/10 px-1 py-0.5 rounded">
                  {isRTL ? 'أنشأ' : 'established'}
                </span>{' '}
                {isRTL
                  ? 'معماريات الحوكمة الرقمية مما خفض التكاليف بنسبة '
                  : 'digital governance architectures reducing costs by '}
                <span className="text-[#ffe088] font-bold font-mono">34%</span>{' '}
                {isRTL
                  ? 'مع نمو متسارع في القيمة السوقية فاق ١٢٠ مليون ريال على مدى ٣ سنوات.'
                  : 'with accelerated growth in market value exceeding SAR 120 million over 3 consecutive fiscal years.'}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={toggleEnhanceVerbs}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer border ${
                isEnhancedVerbs
                  ? 'bg-[#00f0ff] text-[#00363a] border-[#00f0ff]'
                  : 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/30 hover:bg-[#00f0ff]/25'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
              <span>{isRTL ? 'الترقية بأفعال القوة القيادية' : 'Enhance with Power Verbs'}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onShowToast(
                  isRTL ? 'تم تفعيل صياغة مجالس الإدارة C-Suite' : 'Applied C-Suite board phrasing'
                )
              }
              className="flex-1 min-w-[140px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#262a35] hover:bg-[#313540] text-white text-xs font-semibold transition-all active:scale-95 cursor-pointer border border-[#3b494b]/30"
            >
              <span className="material-symbols-outlined text-[16px] text-[#adc6ff]">
                swap_calls
              </span>
              <span>{isRTL ? 'صياغة C-Suite' : 'C-Suite Phrasing'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Career Achievements */}
      <section className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">
              work_history
            </span>
            <h3 className="text-sm font-bold text-white">
              {isRTL ? 'الإنجازات المهنية المعتمدة' : 'Career Achievements'}
            </h3>
          </div>
          <span className="text-[10px] text-[#849495] font-mono">
            {isRTL ? 'مفحوصة ضد فلاتر ATS' : 'Screened against ATS filters'}
          </span>
        </div>

        <div className="space-y-2.5">
          {/* Bullet 1 */}
          <div className="rounded-xl bg-[#171b26]/90 p-3.5 shadow-md border border-[#3b494b]/30 space-y-2 text-start">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]"></span>
                <span className="text-xs font-bold text-white">
                  Saudi Data & AI Authority (SDAIA)
                </span>
              </div>
              <span className="text-[10px] text-[#849495] font-mono">2021 - Present</span>
            </div>

            <p className="text-xs text-[#b9cacb] leading-normal">
              <span className="text-[#00f0ff] font-semibold px-1 py-0.5 rounded bg-[#00f0ff]/10">
                Architected and governed
              </span>{' '}
              sovereign cloud infrastructure strategy across 14 government entities, lifting query
              efficiency by 48% and reducing systemic downtime to 0.01%.
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[11px] text-[#00f0ff]">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>{isRTL ? 'إنجاز قيادي معتمد' : 'Certified Executive Impact Action'}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onShowToast(
                    isRTL
                      ? 'تم ضبط نبرة الإنجاز لتلائم المناصب التنفيذية'
                      : 'Achievement tone refined for C-Suite resonance'
                  )
                }
                className="px-2.5 py-1 rounded bg-[#262a35] hover:bg-[#313540] text-[#00f0ff] text-[10px] font-semibold flex items-center gap-1 cursor-pointer border border-[#00f0ff]/20"
              >
                <span className="material-symbols-outlined text-[13px]">tune</span>
                <span>{isRTL ? 'ضبط النبرة' : 'Refine Tone'}</span>
              </button>
            </div>
          </div>

          {/* Bullet 2 */}
          <div className="rounded-xl bg-[#171b26]/90 p-3.5 shadow-md border border-[#3b494b]/30 space-y-2 text-start">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0566d9]"></span>
                <span className="text-xs font-bold text-white">
                  Global Telecom & Technology Group
                </span>
              </div>
              <span className="text-[10px] text-[#849495] font-mono">2017 - 2021</span>
            </div>

            <p className="text-xs text-[#b9cacb] leading-normal">
              <span className="text-[#00f0ff] font-semibold px-1 py-0.5 rounded bg-[#00f0ff]/10">
                Spearheaded
              </span>{' '}
              intelligent task automation pipelines and{' '}
              <span className="text-[#00f0ff] font-semibold px-1 py-0.5 rounded bg-[#00f0ff]/10">
                directed
              </span>{' '}
              a cross-functional cohort of 45 engineers delivering major platforms 3 months ahead of
              roadmap.
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[11px] text-[#00f0ff]">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>{isRTL ? 'معيار كمي موثق' : 'Quantifiable & Verifiable Metric'}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onShowToast(
                    isRTL
                      ? 'تم ضبط نبرة الإنجاز لتلائم المناصب التنفيذية'
                      : 'Achievement tone refined for C-Suite resonance'
                  )
                }
                className="px-2.5 py-1 rounded bg-[#262a35] hover:bg-[#313540] text-[#00f0ff] text-[10px] font-semibold flex items-center gap-1 cursor-pointer border border-[#00f0ff]/20"
              >
                <span className="material-symbols-outlined text-[13px]">tune</span>
                <span>{isRTL ? 'ضبط النبرة' : 'Refine Tone'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ATS Templates Library */}
      <section className="space-y-3.5 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-start">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f0ff] text-[20px]">
                dashboard_customize
              </span>
              <h3 className="text-sm font-bold text-white">
                {isRTL ? 'مكتبة قوالب ATS التنفيذية' : 'ATS-Optimized Templates Library'}
              </h3>
            </div>
            <span className="text-[11px] text-[#b9cacb]">
              Engineered against Taleo, Greenhouse & Workday
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00f0ff]/15 text-[#00f0ff] shrink-0 border border-[#00f0ff]/30">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span className="text-[10px] font-bold font-mono">99.4% Pass Rate</span>
          </div>
        </div>

        {/* Font Switcher Pills */}
        <div className="p-3 rounded-xl bg-[#171b26] border border-[#3b494b]/30 space-y-2 text-start">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">
              {isRTL ? 'معيار الخط المعتمد للـ ATS' : 'ATS Typography Standard'}
            </span>
            <span className="text-[10px] text-[#00f0ff] font-mono">{selectedFont}</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {fonts.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setSelectedFont(f);
                  onShowToast(
                    isRTL
                      ? `تم تعيين الخط المعياري: ${f}`
                      : `Active ATS Typography Standard set to: ${f}`
                  );
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  selectedFont === f
                    ? 'bg-[#00f0ff] text-[#00363a] font-bold border-[#00f0ff] shadow-sm'
                    : 'bg-[#262a35] text-[#b9cacb] border-transparent hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Templates 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {CV_TEMPLATES.map((tmpl) => {
            const isSelected = activeTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => {
                  setActiveTemplate(tmpl.id);
                  onShowToast(
                    isRTL
                      ? `تم اختيار قالب "${tmpl.nameAr}" المعتمد`
                      : `Selected "${tmpl.nameEn}" as active ATS template`
                  );
                }}
                className={`relative rounded-xl p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-[#1c1f2a] border-[#00f0ff] ring-2 ring-[#00f0ff]/50 shadow-[0_0_16px_rgba(0,240,255,0.25)]'
                    : 'bg-[#171b26] border-[#3b494b]/30 hover:bg-[#1c1f2a]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="w-5 h-5 rounded-full bg-[#00f0ff] text-[#00363a] flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  </div>
                )}

                {/* CV Canvas Mockup preview */}
                <div className="w-full h-32 rounded-lg bg-[#0a0e18] p-2 flex flex-col justify-between overflow-hidden shadow-inner relative text-start border border-white/5">
                  <div className="space-y-1.5">
                    <div
                      className={`h-2.5 w-2/3 rounded-xs ${
                        isSelected ? 'bg-[#00f0ff]/60' : 'bg-[#0566d9]/60'
                      }`}
                    ></div>
                    <div className="h-1.5 w-1/2 bg-white/20 rounded-xs"></div>
                    <div className="w-full h-[1px] bg-white/10 my-1"></div>
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-white/25 rounded-xs"></div>
                      <div className="h-1.5 w-4/5 bg-white/15 rounded-xs"></div>
                      <div className="h-1.5 w-full bg-white/20 rounded-xs"></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="h-1.5 w-1/3 bg-[#adc6ff]/50 rounded-xs mb-1"></div>
                    <div className="flex gap-1">
                      <div className="h-1 w-1/4 bg-white/20 rounded-xs"></div>
                      <div className="h-1 w-1/4 bg-white/15 rounded-xs"></div>
                      <div className="h-1 w-1/3 bg-white/20 rounded-xs"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 px-0.5 text-start">
                  <span
                    className={`text-xs font-bold block ${
                      isSelected ? 'text-[#00f0ff]' : 'text-white'
                    }`}
                  >
                    {isRTL ? tmpl.nameAr : tmpl.nameEn}
                  </span>
                  <p className="text-[10px] text-[#b9cacb] truncate mt-0.5">
                    {isRTL ? tmpl.descAr : tmpl.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Parser Compatibility Gauge */}
      <div className="rounded-xl bg-gradient-to-r from-[#0a0e18] to-[#171b26] p-3.5 flex items-center justify-between gap-3 shadow-md border border-[#3b494b]/30 mb-5">
        <div className="flex items-center gap-2.5 text-start">
          <div className="w-10 h-10 rounded-full bg-[#00f0ff]/15 flex items-center justify-center shrink-0 text-[#00f0ff]">
            <span className="material-symbols-outlined text-[22px]">memory</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">
              {isRTL ? 'محرك التوافق والفرز الآلي' : 'Parser Compatibility Engine'}
            </span>
            <span className="text-[11px] text-[#b9cacb]">
              {isRTL
                ? 'تجريد الجداول المعقدة لضمان القراءة الخوارزمية'
                : 'Complex tables and unparseable vectors stripped'}
            </span>
          </div>
        </div>
        <span className="text-[#00f0ff] font-extrabold text-lg font-mono">99.4%</span>
      </div>

      {/* Action Dock */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => setIsDossierPdfOpen(true)}
          className="w-full min-h-[52px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#0566d9] to-[#00f0ff] text-[#00363a] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
          <span>
            {isRTL
              ? 'تصدير الملف التنفيذي الموثق (PDF عالي الدقة وختم QR)'
              : 'Export Verified Executive Dossier (High-Res PDF & QR Seal)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setShowAtsSimulator(true)}
          className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer border border-[#3b494b]/30"
        >
          <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
            find_in_page
          </span>
          <span>{isRTL ? 'معاينة محاكي ATS المباشر' : 'Live ATS Simulator Preview'}</span>
        </button>
      </div>

      {/* Verified Executive Dossier PDF Modal */}
      <ExecutiveDossierPdfModal
        isOpen={isDossierPdfOpen}
        onClose={() => setIsDossierPdfOpen(false)}
        language={language}
        onShowToast={onShowToast}
      />

      {/* ATS Simulator Modal */}
      {showAtsSimulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0f131d] border border-[#00f0ff]/40 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3b494b]/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00f0ff]">verified</span>
                <h4 className="text-sm font-bold text-white">Live ATS Algorithm Test</h4>
              </div>
              <button
                onClick={() => setShowAtsSimulator(false)}
                className="w-7 h-7 rounded-full bg-[#1c1f2a] text-white flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#b9cacb]">
              <div className="p-3 rounded-lg bg-[#0a0e18] font-mono space-y-1 text-left">
                <div className="text-emerald-400">✓ Workday Parser: 100% Passed</div>
                <div className="text-emerald-400">✓ Taleo Enterprise: 99.8% Passed</div>
                <div className="text-emerald-400">✓ Greenhouse ATS: 98.9% Passed</div>
                <div className="text-[#00f0ff]">Keywords Density: 88.4% (Optimal)</div>
              </div>
              <p>
                All structural sections, dates, and quantitative achievements parse seamlessly
                without vector collision.
              </p>
            </div>

            <button
              onClick={() => setShowAtsSimulator(false)}
              className="mt-4 w-full py-2.5 rounded-lg bg-[#00f0ff] text-[#00363a] font-bold text-xs cursor-pointer shadow-md"
            >
              Close Simulator
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
