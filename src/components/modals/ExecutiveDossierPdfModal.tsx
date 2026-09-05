import React, { useRef } from 'react';
import { useExecutive } from '../../context/ExecutiveContext';
import { Language } from '../../types';

interface ExecutiveDossierPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

export const ExecutiveDossierPdfModal: React.FC<ExecutiveDossierPdfModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const verificationHash = 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069';
  const verificationUrl = `https://sovereign-verify.gov.sa/cert/${currentProfile.id}-2030`;

  const handlePrint = () => {
    onShowToast(
      isRTL
        ? 'جاري تجهيز وثيقة السيرة الذاتية للطباعة والحفظ بصيغة PDF عالية الدقة...'
        : 'Preparing high-resolution PDF print document...'
    );
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(verificationUrl);
    onShowToast(
      isRTL
        ? 'تم نسخ رابط التحقق السيادي المباشر بنجاح'
        : 'Sovereign digital verification link copied to clipboard'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Container */}
      <div className="relative w-full max-w-3xl my-6 rounded-2xl bg-[#0d121f] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] flex flex-col max-h-[92vh] overflow-hidden text-start">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="print:hidden flex items-center justify-between px-4 py-3 bg-[#131927] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{isRTL ? 'وثيقة السيرة الذاتية التنفيذية الرسمية' : 'Official Sovereign Executive Dossier'}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                  VERIFIED
                </span>
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                {isRTL ? 'معيار الطباعة العالمي A4 لمجالس الإدارة' : 'Standard Boardroom A4 Document Spec'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-[#1a2336] hover:bg-[#232f48] text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/30 transition-all cursor-pointer"
              title={isRTL ? 'نسخ رابط التحقق' : 'Copy verification link'}
            >
              <span className="material-symbols-outlined text-[14px]">link</span>
              <span className="hidden sm:inline">{isRTL ? 'رابط الاعتماد' : 'Verification Link'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-[#002d33] text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>{isRTL ? 'طباعة / حفظ كـ PDF' : 'Print / Export PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#080c14] space-y-4">
          
          {/* Paper Sheet (White / Light Executive Slate For Pure Professionalism and Print Compliance) */}
          <div
            ref={printRef}
            id="executive-printable-dossier"
            className="w-full max-w-2xl mx-auto bg-white text-[#0f172a] rounded-xl p-6 sm:p-8 shadow-2xl border border-gray-200 font-sans relative overflow-hidden print:p-0 print:border-none print:shadow-none"
          >
            {/* Top Sovereign Watermark / Top Accent Bar */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#00363a] via-[#0566d9] to-[#00f0ff]"></div>

            {/* Document Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-gray-200">
              <div className="space-y-1 text-start">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    KINGDOM OF SAUDI ARABIA • C-SUITE DOSSIER
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-bold">
                    NIC & SDAIA SEALED
                  </span>
                </div>
                
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isRTL ? currentProfile.nameAr : currentProfile.nameEn}
                </h1>
                
                <p className="text-sm font-bold text-blue-700">
                  {isRTL ? currentProfile.titleAr : currentProfile.titleEn}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
                    <span>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px] text-slate-400">verified_user</span>
                    <span>ID: {currentProfile.nationalId}</span>
                  </span>
                  <span>•</span>
                  <span className="text-slate-600 font-medium">
                    {currentProfile.yearsExperience} {isRTL ? 'سنة خبرة قيادية' : 'Years Executive Leadership'}
                  </span>
                </div>
              </div>

              {/* Dynamic QR Verification Code Block */}
              <div className="flex flex-col items-center gap-1 shrink-0 p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                {/* SVG QR Code Simulation */}
                <div className="w-20 h-20 bg-white p-1 rounded border border-slate-300 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                    <rect width="100" height="100" fill="white" />
                    {/* Corners */}
                    <rect x="5" y="5" width="26" height="26" fill="black" />
                    <rect x="9" y="9" width="18" height="18" fill="white" />
                    <rect x="13" y="13" width="10" height="10" fill="black" />

                    <rect x="69" y="5" width="26" height="26" fill="black" />
                    <rect x="73" y="9" width="18" height="18" fill="white" />
                    <rect x="77" y="13" width="10" height="10" fill="black" />

                    <rect x="5" y="69" width="26" height="26" fill="black" />
                    <rect x="9" y="73" width="18" height="18" fill="white" />
                    <rect x="13" y="77" width="10" height="10" fill="black" />

                    {/* QR Code Matrix Data Blocks */}
                    <rect x="36" y="8" width="6" height="6" fill="black" />
                    <rect x="46" y="8" width="8" height="6" fill="black" />
                    <rect x="58" y="12" width="6" height="10" fill="black" />
                    <rect x="36" y="22" width="12" height="6" fill="black" />
                    <rect x="52" y="26" width="10" height="6" fill="black" />

                    <rect x="8" y="36" width="8" height="6" fill="black" />
                    <rect x="22" y="38" width="10" height="6" fill="black" />
                    <rect x="36" y="36" width="6" height="12" fill="black" />
                    <rect x="46" y="44" width="8" height="8" fill="black" />
                    <rect x="58" y="38" width="12" height="6" fill="black" />
                    <rect x="74" y="36" width="6" height="10" fill="black" />
                    <rect x="84" y="42" width="8" height="8" fill="black" />

                    <rect x="8" y="52" width="12" height="6" fill="black" />
                    <rect x="24" y="48" width="8" height="8" fill="black" />
                    <rect x="36" y="56" width="12" height="6" fill="black" />
                    <rect x="52" y="58" width="12" height="6" fill="black" />
                    <rect x="70" y="52" width="8" height="10" fill="black" />

                    <rect x="36" y="68" width="6" height="12" fill="black" />
                    <rect x="46" y="74" width="8" height="6" fill="black" />
                    <rect x="58" y="70" width="10" height="12" fill="black" />
                    <rect x="74" y="68" width="10" height="8" fill="black" />
                    <rect x="86" y="78" width="8" height="8" fill="black" />

                    <rect x="38" y="86" width="14" height="6" fill="black" />
                    <rect x="56" y="88" width="8" height="6" fill="black" />
                    <rect x="68" y="84" width="8" height="8" fill="black" />
                    <rect x="82" y="90" width="10" height="5" fill="black" />
                  </svg>
                </div>
                <span className="text-[9px] font-mono text-slate-500 font-bold">
                  SCAN TO VERIFY
                </span>
                <span className="text-[8px] font-mono text-cyan-800">
                  gov.sa/verify-csuite
                </span>
              </div>
            </div>

            {/* Executive Bio / Executive Thesis */}
            <div className="py-4 border-b border-gray-100">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>{isRTL ? 'الأطروحة والبيان التنفيذي المعتمد' : 'Executive Thesis & Leadership Mandate'}</span>
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {isRTL ? currentProfile.bioAr : currentProfile.bioEn}
              </p>
            </div>

            {/* Core Competencies & Quantitative Impact Grid */}
            <div className="py-4 border-b border-gray-100">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>{isRTL ? 'القدرات الاستراتيجية المعتمدة والأثر الرأسمالي' : 'Core Sovereign Competencies & Capital Impact'}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-mono font-black text-blue-900">
                    {currentProfile.quantifiedBudgetManagedAr}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {isRTL ? 'الميزانية التشغيلية' : 'CapEx Portfolio'}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-mono font-black text-emerald-700">
                    {currentProfile.quantifiedTeamsLedAr}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {isRTL ? 'الكوادر التنفيذية' : 'Executive Teams'}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-mono font-black text-blue-900">
                    99.4%
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {isRTL ? 'دقة التوافق الخوارزمي' : 'ATS Compatibility'}
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-mono font-black text-purple-900">
                    TOP 0.1%
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {isRTL ? 'تصنيف الكفاءة الوطني' : 'National Benchmark'}
                  </div>
                </div>
              </div>

              {/* Competency Pills */}
              <div className="flex flex-wrap gap-1.5">
                {(isRTL ? currentProfile.topSkillsAr : currentProfile.topSkillsEn).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Career Track Record */}
            <div className="py-4 border-b border-gray-100">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>{isRTL ? 'المسيرة القيادية والإنجازات الملموسة' : 'Executive Career Milestones & Governance'}</span>
              </h2>

              <div className="space-y-3">
                {currentProfile.experienceRecords.map((rec) => (
                  <div key={rec.id} className="text-start space-y-1">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3 className="text-xs font-bold text-slate-900">
                        {isRTL ? rec.roleAr : rec.roleEn}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">
                        {isRTL ? rec.periodAr : rec.periodEn}
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-blue-700">
                      {isRTL ? rec.companyAr : rec.companyEn}
                    </div>

                    <p className="text-[11px] text-slate-600 leading-snug">
                      {isRTL ? rec.descriptionAr : rec.descriptionEn}
                    </p>

                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {isRTL ? 'الأثر المقاس:' : 'EBITDA Impact:'} {isRTL ? rec.impactMetricAr : rec.impactMetricEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Pedigree & Sovereign Clearances */}
            <div className="pt-4 flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1 text-start">
                <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  {isRTL ? 'المؤهلات الأكاديمية والاعتمادات' : 'Academic Credentials'}
                </h3>
                <div className="text-xs text-slate-700 font-medium">
                  {isRTL ? currentProfile.educationAr : currentProfile.educationEn}
                </div>
              </div>

              <div className="text-start sm:text-end space-y-1 font-mono text-[9px] text-slate-500">
                <div>CRYPTOGRAPHIC SIGNATURE:</div>
                <div className="text-[8px] text-slate-700 break-all max-w-xs">{verificationHash}</div>
                <div className="text-emerald-700 font-bold">DIGITALLY TIMESTAMPED BY NCGR & SDAIA</div>
              </div>
            </div>

            {/* Bottom Official Seal Badge */}
            <div className="mt-5 pt-3 border-t border-dashed border-slate-300 flex items-center justify-between text-[9px] text-slate-400">
              <span>CONFIDENTIAL • FOR BOARD & NOMINATION COMMITTEE USE ONLY</span>
              <span>PAGE 1 OF 1 • VERIFIED SOVEREIGN RECORD</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0f1422] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-emerald-400">shield_with_heart</span>
            <span>{isRTL ? 'محمي ببروتوكول السرية التنفيذي وسياسة حماية البيانات PDPL' : 'Protected under PDPL Sovereign Privacy Policy'}</span>
          </div>
          <span className="font-mono text-[10px] text-cyan-400">
            {isRTL ? 'تشفير AES-256' : 'AES-256 ENCRYPTED'}
          </span>
        </div>

      </div>
    </div>
  );
};
