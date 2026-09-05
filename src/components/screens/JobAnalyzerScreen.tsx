import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';

interface JobAnalyzerScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const JobAnalyzerScreen: React.FC<JobAnalyzerScreenProps> = ({
  language,
  onNavigate,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [jobDescription, setJobDescription] = useState(
    'VP of Digital Transformation & Sovereign AI Strategy - Public Investment Fund (PIF) / Neom ecosystem. Requirements: 12+ years enterprise leadership, sovereign cloud architecture, P&L stewardship > SAR 100M, cross-border multi-entity steering.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    onShowToast(
      isRTL
        ? 'جاري مطابقة المتطلبات التنفيذية وتفكيك الكلمات الدلالية...'
        : 'Parsing requisition parameters & benchmarking keyword density...'
    );
    setTimeout(() => {
      setIsAnalyzing(false);
      onShowToast(
        isRTL
          ? 'اكتمل التحليل: توافق استثنائي بنسبة 94.8%'
          : 'Analysis complete: 94.8% executive role alignment'
      );
    }, 1100);
  };

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Top Requisition Input Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#131927] p-4 shadow-lg border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1c2436] flex items-center justify-center text-[#00f0ff] border border-cyan-500/30">
              <span className="material-symbols-outlined text-[18px]">manage_search</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isRTL ? 'محلل مطابقة الوظائف ATS' : 'Job Match & ATS Analyzer'}
              </h2>
              <span className="text-[10px] text-[#94a3b8] font-mono">
                {isRTL ? 'مقارنة معايير C-Suite' : 'Benchmarking against C-Suite Requisitions'}
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff] text-[10px] font-bold font-mono">
            ATS V4
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#94a3b8] block">
              {isRTL
                ? 'اختر وظيفة قيادية حقيقية أو الصق الوصف:'
                : 'Choose a real C-Suite requisition or paste:'}
            </label>
            <span className="text-[10px] text-cyan-400 font-mono">SAUDI VISION 2030</span>
          </div>

          {/* Quick Preset Requisitions */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              {
                titleAr: 'نيوم: نائب رئيس التحول الرقمي',
                titleEn: 'NEOM: VP of Digital Transformation',
                desc: 'VP of Digital Transformation & Cognitive City Infrastructure - NEOM. Lead the deployment of autonomous cloud grids, zero-trust edge compute, and sovereign AI pipelines across The Line. P&L accountability > SAR 250M.',
              },
              {
                titleAr: 'صندوق الاستثمارات: رئيس حوكمة السحابة السيادية',
                titleEn: 'PIF: Head of Sovereign Cloud Governance',
                desc: 'Executive Director of Sovereign Cloud & Data Privacy - Public Investment Fund (PIF). Architect sovereign cloud compliance across all portfolio companies, multi-entity federation, and NCA ECC-1:2018 certification.',
              },
              {
                titleAr: 'أرامكو الرقمية: كبير مسؤولي الأمن الرقمي CISO',
                titleEn: 'Aramco Digital: Chief Information Security Officer',
                desc: 'CISO & Sovereign Enclave Architect - Aramco Digital Innovations. Direct Post-Quantum encryption rollout, OT/IT convergence security, and zero-leakage enterprise AI firewalls across critical energy assets.',
              },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setJobDescription(p.desc);
                  onShowToast(
                    isRTL
                      ? `تم تحميل متطلبات منصب: ${p.titleAr}`
                      : `Loaded requisition for: ${p.titleEn}`
                  );
                }}
                className="px-2.5 py-1 rounded-lg bg-[#1c2436] hover:bg-[#263147] text-[11px] text-[#00f0ff] font-medium whitespace-nowrap border border-cyan-500/20 cursor-pointer transition-colors"
              >
                {isRTL ? p.titleAr : p.titleEn}
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0b0f19] text-white text-xs placeholder:text-slate-500 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/60 leading-relaxed font-mono"
            placeholder={
              isRTL
                ? 'أدخل الوصف الوظيفي للمنصب القيادي هنا...'
                : 'Paste target job description or paste LinkedIn/Workday requisition...'
            }
          ></textarea>

          <button
            type="button"
            disabled={isAnalyzing}
            onClick={handleRunAnalysis}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#0566d9] text-[#00363a] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-[#00363a] border-t-transparent animate-spin"></span>
                <span>{isRTL ? 'جاري الفحص الدلالي...' : 'Deconstructing Requisition...'}</span>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">troubleshoot</span>
                <span>
                  {isRTL ? 'تحليل ومطابقة المنصب فورياً' : 'Run Algorithmic Match Analysis'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Match Score & Telemetry Breakdown */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="rounded-xl bg-[#131927] p-3 flex flex-col items-center justify-center text-center shadow-md border border-cyan-500/30">
          <span className="text-[10px] text-[#94a3b8] font-medium mb-1">
            {isRTL ? 'المطابقة الكلية' : 'Overall Match'}
          </span>
          <span className="text-2xl font-extrabold text-[#00f0ff] font-mono leading-none">
            94.8%
          </span>
          <span className="text-[9px] text-[#00f0ff] mt-1 font-mono">C-Suite Ready</span>
        </div>

        <div className="rounded-xl bg-[#131927] p-3 flex flex-col items-center justify-center text-center shadow-md border border-white/10">
          <span className="text-[10px] text-[#94a3b8] font-medium mb-1">
            {isRTL ? 'كثافة الكلمات' : 'ATS Keywords'}
          </span>
          <span className="text-2xl font-extrabold text-white font-mono leading-none">
            88.2%
          </span>
          <span className="text-[9px] text-cyan-400 mt-1 font-mono">High Precision</span>
        </div>

        <div className="rounded-xl bg-[#131927] p-3 flex flex-col items-center justify-center text-center shadow-md border border-white/10">
          <span className="text-[10px] text-[#94a3b8] font-medium mb-1">
            {isRTL ? 'التوافق القيادي' : 'Leadership Fit'}
          </span>
          <span className="text-2xl font-extrabold text-[#fdd55a] font-mono leading-none">
            96.0%
          </span>
          <span className="text-[9px] text-[#fdd55a] mt-1 font-mono">Optimal</span>
        </div>
      </div>

      {/* Matched Keywords & Competencies */}
      <div className="rounded-xl bg-[#131927] p-4 shadow-lg border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">
              check_circle
            </span>
            <h3 className="text-xs font-bold text-white">
              {isRTL ? 'نقاط التوافق القوية (مكتشفة في سيرتك)' : 'Matching Core Strengths Found'}
            </h3>
          </div>
          <span className="text-[10px] text-[#00f0ff] font-mono font-bold">4 Verified</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            'Cloud Sovereign Governance',
            'Enterprise Architecture',
            'Change Leadership',
            'Cross-Entity Modernization',
          ].map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[13px]">check</span>
              <span>{kw}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Missing or High-Leverage Keywords */}
      <div className="rounded-xl bg-[#131927] p-4 shadow-lg border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fdd55a] text-[18px]">
              lightbulb
            </span>
            <h3 className="text-xs font-bold text-white">
              {isRTL ? 'كلمات موصى بإضافتها لرفع النتيجة' : 'High-Leverage Optimization Signals'}
            </h3>
          </div>
          <span className="text-[10px] text-[#fdd55a] font-mono font-bold">+5.2% Boost</span>
        </div>

        <div className="space-y-2">
          <div className="p-2.5 rounded-lg bg-[#0b0f19] flex items-center justify-between border border-white/5">
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white">Sovereign AI Ethics</span>
              <span className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'مطلوبة بشدة في مشاريع الصناديق السيادية'
                  : 'Critical requirement for sovereign wealth entities'}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                onShowToast(
                  isRTL
                    ? 'تم إدراج "Sovereign AI Ethics" في بنك الكلمات المعتمدة'
                    : 'Appended "Sovereign AI Ethics" to executive bank'
                )
              }
              className="px-2.5 py-1 rounded bg-[#1c2436] hover:bg-[#263147] text-[#00f0ff] text-[10px] font-bold flex items-center gap-1 cursor-pointer border border-[#00f0ff]/30"
            >
              <span className="material-symbols-outlined text-[12px]">add</span>
              <span>{isRTL ? 'إدراج' : 'Include'}</span>
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0b0f19] flex items-center justify-between border border-white/5">
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white">Cross-border P&L Stewardship</span>
              <span className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'إبراز إدارة الميزانيات الكبرى العابرة للحدود'
                  : 'Emphasize high-volume budget accountability'}
              </span>
            </div>
            <button
              type="button"
              onClick={() =>
                onShowToast(
                  isRTL
                    ? 'تم إدراج "Cross-border P&L" في بنك الكلمات'
                    : 'Appended "Cross-border P&L Stewardship" to bank'
                )
              }
              className="px-2.5 py-1 rounded bg-[#1c2436] hover:bg-[#263147] text-[#00f0ff] text-[10px] font-bold flex items-center gap-1 cursor-pointer border border-[#00f0ff]/30"
            >
              <span className="material-symbols-outlined text-[12px]">add</span>
              <span>{isRTL ? 'إدراج' : 'Include'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => {
            onShowToast(
              isRTL
                ? 'جاري نقل المعايير وتوليف السيرة الذاتية خصيصاً لهذا المنصب...'
                : 'Calibrating CV specifically for this target requisition...'
            );
            setTimeout(() => onNavigate('06_cv_builder'), 400);
          }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#0566d9] to-[#00f0ff] text-[#00363a] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
          <span>
            {isRTL
              ? 'توليف السيرة الذاتية خصيصاً لهذا المنصب'
              : 'Auto-Tune CV for This Specific Requisition'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onShowToast(
              isRTL
                ? 'جاري تجهيز محاكاة المقابلة المخصصة لهذا المنصب...'
                : 'Preparing boardroom interview simulation tailored to this role...'
            );
            setTimeout(() => onNavigate('09_interview_coach'), 400);
          }}
          className="w-full h-11 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-[#3b494b]/30 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#adc6ff] text-[18px]">mic</span>
          <span>
            {isRTL
              ? 'بدء محاكاة المقابلة المخصصة للمنصب'
              : 'Schedule Tailored Interview Simulation'}
          </span>
        </button>
      </div>
    </div>
  );
};
