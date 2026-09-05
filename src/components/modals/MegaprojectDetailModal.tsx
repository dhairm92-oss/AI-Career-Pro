import React from 'react';
import { MegaprojectRequisition } from '../../data/executiveProfiles';
import { Language, ScreenId } from '../../types';

interface MegaprojectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  requisition: MegaprojectRequisition;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const MegaprojectDetailModal: React.FC<MegaprojectDetailModalProps> = ({
  isOpen,
  onClose,
  requisition,
  language,
  onNavigate,
  onShowToast,
}) => {
  const isRTL = language === 'ar';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0e1422] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[90vh] text-start">
        {/* Header */}
        <div className="flex items-start justify-between p-4 bg-gradient-to-r from-[#131c30] to-[#0b101c] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[#00f0ff] shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[22px]">assured_workload</span>
            </div>
            <div>
              <span className="text-[10px] text-cyan-400 uppercase font-mono font-bold">
                {isRTL ? requisition.projectNameAr : requisition.projectNameEn}
              </span>
              <h3 className="text-sm font-bold text-white">
                {isRTL ? requisition.roleTitleAr : requisition.roleTitleEn}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white flex items-center justify-center cursor-pointer border border-white/5 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {/* Compensation Badge */}
          <div className="p-3 rounded-xl bg-[#080d17] border border-cyan-500/30 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#94a3b8] block">
                {isRTL ? 'معيار الحزمة التنفيذية الشاملة' : 'Total Executive Compensation Package'}
              </span>
              <span className="text-sm font-extrabold text-[#fdd55a] font-mono">
                {requisition.salaryRangeSAR}
              </span>
            </div>
            <span className="px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
              {requisition.matchScore}% {isRTL ? 'توافق' : 'Match'}
            </span>
          </div>

          {/* Committee Sponsor */}
          <div className="p-3 rounded-xl bg-[#121929] border border-white/10 space-y-1">
            <span className="text-[10px] text-cyan-300 font-bold uppercase font-mono">
              {isRTL ? 'لجنة مجلس الإدارة المشرفة' : 'Governing Board Committee'}
            </span>
            <p className="text-white font-semibold">
              {isRTL ? requisition.boardCommitteeAr : requisition.boardCommitteeEn}
            </p>
            <p className="text-[11px] text-[#94a3b8]">
              {isRTL ? requisition.locationAr : requisition.locationEn} • {requisition.openingsCount}{' '}
              {isRTL ? 'مناصب شاغرة' : 'openings'}
            </p>
          </div>

          {/* Key Competencies */}
          <div className="space-y-2">
            <span className="text-[11px] text-white font-bold block">
              {isRTL ? 'المتطلبات والكفاءات القيادية الصارمة:' : 'Strict Executive Mandates:'}
            </span>
            <div className="space-y-1.5">
              {(isRTL ? requisition.keyRequirementsAr : requisition.keyRequirementsEn).map(
                (req, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[#b9cacb]">
                    <span className="material-symbols-outlined text-[15px] text-[#00f0ff] shrink-0 mt-0.5">
                      verified
                    </span>
                    <span>{req}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Missing Keywords To Inject */}
          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
            <span className="text-[10px] text-cyan-300 font-bold font-mono uppercase block">
              {isRTL ? 'الكلمات المفتاحية الخوارزمية المستهدفة:' : 'Target ATS Algorithm Keywords:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {requisition.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/30 text-[#00f0ff] text-[10px] font-mono"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-[#0a0f1b] border-t border-white/10 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('07_job_analyzer');
              onShowToast(
                isRTL
                  ? `تم تحميل المنصب في محلل الوظائف بنجاح!`
                  : `Loaded requisition into Job Analyzer!`
              );
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0566d9] text-[#00363a] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">troubleshoot</span>
            <span>
              {isRTL
                ? 'فحص المطابقة وتوليد السيرة المخصصة'
                : 'Run Match & Generate Aligned CV'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('09_interview_coach');
              onShowToast(
                isRTL
                  ? `تم تجهيز محاكي المقابلات للمنصب!`
                  : `Interview Coach primed for this requisition!`
              );
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-[#172033] hover:bg-[#1f2b45] text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-white/10 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px] text-cyan-400">mic</span>
            <span>
              {isRTL
                ? 'محاكاة مقابلة لجنة الترشيحات لهذا المنصب'
                : 'Simulate Board Committee Interview for this Role'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
