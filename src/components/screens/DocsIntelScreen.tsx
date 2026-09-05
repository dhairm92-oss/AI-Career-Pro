import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';

interface DocsIntelScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const DocsIntelScreen: React.FC<DocsIntelScreenProps> = ({
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [isSimulatingOcr, setIsSimulatingOcr] = useState(false);
  const [step3Running, setStep3Running] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsSimulatingOcr(true);
      onShowToast(
        isRTL
          ? `جاري معالجة وتشفير: ${file.name}`
          : `Processing and encrypting ${file.name}...`
      );
      setTimeout(() => {
        setIsSimulatingOcr(false);
        setStep3Running(false);
        onShowToast(
          isRTL
            ? 'اكتمل التدقيق البصري بنسبة موثوقية 99.4%'
            : 'Strict OCR audit completed with 99.4% cryptographic confidence'
        );
      }, 1500);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Audit Quota Banner */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#131927] p-4 shadow-lg border border-white/10">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#00f0ff]/10 blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#0566d9]/15 blur-[70px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1c2436] flex items-center justify-center text-[#00f0ff] shadow-sm border border-cyan-500/20">
                <span className="material-symbols-outlined text-[19px]">fact_check</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">
                  {isRTL ? 'سجل المؤهلات الموثقة' : 'Verified Credentials Record'}
                </h2>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider font-mono">
                  {isRTL ? 'ضمان صفر هلوسة وتزييف' : 'Zero Hallucination Guarantee'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1c2436] px-2.5 py-1 rounded-full shadow-inner border border-[#00f0ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="text-[10px] text-[#00f0ff] font-bold uppercase tracking-wider font-mono">
                {isRTL ? 'نشط' : 'Active'}
              </span>
            </div>
          </div>

          {/* Quota Meter */}
          <div className="mt-2 p-2.5 rounded-xl bg-[#0b0f19]/70 backdrop-blur-md flex flex-col gap-1.5 border border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94a3b8] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-[#fdd55a]">
                  data_usage
                </span>
                <span>{isRTL ? 'حصة التدقيق الصارم' : 'Strict Audit Quota'}</span>
              </span>
              <span className="text-[#00f0ff] font-bold font-mono">1 / 5 Used</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-[#1c2436] overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] to-[#0566d9] rounded-full"
                style={{ width: '20%' }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[#94a3b8] text-[10px] pt-0.5">
              <span>
                {isRTL ? '٤ جلسات تدقيق معتمدة متبقية' : '4 certified audit sessions remaining'}
              </span>
              <span className="font-mono text-[#fdd55a]">
                {isRTL ? 'تتجدد خلال ١٤ يوماً' : 'Renews in 14 days'}
              </span>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#00f0ff] font-medium">
            <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
              shield
            </span>
            <span>
              {isRTL ? '١٠٠٪ تحقق مشفر بالكامل' : '100% Cryptographically Validated'}
            </span>
          </div>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="relative group rounded-xl bg-[#1c1f2a] p-4 shadow-xl border border-[#3b494b]/20 mb-4 transition-all">
        <div className="relative flex flex-col items-center justify-center p-5 rounded-lg bg-[#0a0e18]/80 text-center">
          <div className="relative mb-3 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f0ff]/20 to-[#0566d9]/20 flex items-center justify-center text-[#00f0ff] shadow-[0_0_24px_rgba(0,240,255,0.35)]">
              <span className="material-symbols-outlined text-[30px]">cloud_upload</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#262a35] flex items-center justify-center text-[#00dbe9]">
              <span className="material-symbols-outlined text-[11px]">lock</span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white mb-1">
            {isRTL ? 'رفع الوثائق التنفيذية (PDF, DOCX)' : 'Upload Executive Document (PDF, DOCX)'}
          </h3>
          <p className="text-xs text-[#b9cacb] max-w-xs mb-1">
            {isRTL ? 'اسحب وأفلت أو تصفح من جهازك بأمان' : 'Drag & drop or browse from secure storage'}
          </p>
          <p className="text-[10px] text-[#00dbe9]/80 mb-3 tracking-wide font-mono">
            {isRTL
              ? 'تدقيق OCR صارم ومطابقة تجزئة SHA-256'
              : 'Strict OCR & Cryptographic Hash Validation'}
          </p>

          <label className="w-full">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-full py-2.5 px-4 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[#00f0ff] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.98] border border-[#00f0ff]/20">
              <span className="material-symbols-outlined text-[18px]">file_open</span>
              <span className="text-xs font-bold">
                {isRTL ? 'اختيار ملف من الجهاز' : 'Choose File from Device'}
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Visual Live Processing Pipeline */}
      <div className="rounded-xl bg-[#171b26] p-4 shadow-xl border border-[#3b494b]/20 space-y-3 mb-4">
        {/* Active File Badge */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#262a35]/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#0566d9]/30 text-[#00f0ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            </div>
            <div className="flex flex-col min-w-0 text-start">
              <span className="text-xs font-bold text-white truncate font-mono">
                Executive_CV_2025.pdf
              </span>
              <span className="text-[10px] text-[#b9cacb]">
                1.8 MB • {isRTL ? 'تشفير عسكري نشط' : 'Active Military-Grade Encryption'}
              </span>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] font-mono uppercase tracking-wider font-bold">
            {isSimulatingOcr ? 'Scanning' : 'Processing'}
          </span>
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[#0a0e18]/60">
            <div className="w-6 h-6 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.3)]">
              <span className="material-symbols-outlined text-[15px]">check</span>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between text-xs">
              <span className="text-white">
                {isRTL
                  ? '١. الرفع الآمن وتوليد تجزئة SHA-256'
                  : '1. Secure Upload & SHA-256 Hash Hashing'}
              </span>
              <span className="text-[#00dbe9] font-bold font-mono text-[10px]">
                Complete ✓
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg bg-[#0a0e18]/60">
            <div className="w-6 h-6 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.3)]">
              <span className="material-symbols-outlined text-[15px]">check</span>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between text-xs">
              <span className="text-white">
                {isRTL
                  ? '٢. التحليل الدلالي والتدقيق البصري الدقيق'
                  : '2. Semantic Analysis & High-Precision OCR'}
              </span>
              <span className="text-[#00dbe9] font-bold font-mono text-[10px]">
                Complete ✓
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[#0566d9]/20 shadow-md border border-[#00f0ff]/30">
            <div className="w-6 h-6 rounded-full bg-[#00f0ff] text-[#00363a] flex items-center justify-center shrink-0 animate-pulse">
              <span className="material-symbols-outlined text-[14px]">sync</span>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between text-xs">
              <div className="flex flex-col text-start">
                <span className="text-[#00f0ff] font-bold">
                  {isRTL
                    ? '٣. المطابقة القيادية الصارمة ومكافحة الهلوسة'
                    : '3. Strict Executive Audit & Cross-Verification'}
                </span>
                <span className="text-[#b9cacb] text-[10px]">
                  {isRTL
                    ? 'فحص الحقائق ومطابقة السجلات'
                    : 'Fact-checking and anti-hallucination alignment'}
                </span>
              </div>
              <span className="text-[10px] text-[#00f0ff] font-mono font-bold animate-pulse">
                {step3Running ? 'Running...' : 'Verified ✓'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Parsed Credentials & Fact Verification */}
      <div className="rounded-xl bg-[#1c1f2a] p-4 shadow-xl border border-[#3b494b]/20 space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#00f0ff]">
              verified
            </span>
            <h3 className="text-sm font-bold text-white">
              {isRTL ? 'المؤهلات المستخرجة وفحص الحقائق' : 'Parsed Credentials & Fact Verification'}
            </h3>
          </div>
          <span className="text-[10px] bg-[#262a35] px-2 py-0.5 rounded text-[#b9cacb] font-mono">
            3 Records
          </span>
        </div>

        {/* Record 1 */}
        <div className="p-3 rounded-lg bg-[#171b26] flex flex-col gap-1.5 border border-[#3b494b]/15 text-start">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#b9cacb] uppercase tracking-wider">
                {isRTL ? 'الدرجة العلمية والتخصص' : 'Executive Education & Degree'}
              </span>
              <p className="text-xs font-bold text-white">Master Degree in Computer Science</p>
              <span className="text-[11px] text-[#b9cacb]">Stanford University • 2018 - 2020</span>
            </div>
            <div className="flex items-center gap-1 bg-[#313540] px-2 py-0.5 rounded text-[#00f0ff] shrink-0 border border-[#00f0ff]/20">
              <span className="material-symbols-outlined text-[13px]">verified_user</span>
              <span className="text-[10px] font-bold font-mono">Verified 99.8%</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 text-[#b9cacb]">
            <span className="text-[10px] font-mono text-[#00dbe9] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              <span>{isRTL ? 'مطابق آلياً بالسجل الوطني' : 'Validated via National Registry'}</span>
            </span>
            <span className="text-[10px] text-[#849495] font-mono">#REF-CS-892</span>
          </div>
        </div>

        {/* Record 2 */}
        <div className="p-3 rounded-lg bg-[#171b26] flex flex-col gap-1.5 border border-[#3b494b]/15 text-start">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#b9cacb] uppercase tracking-wider">
                {isRTL ? 'الشهادات الاحترافية' : 'Professional Certifications'}
              </span>
              <p className="text-xs font-bold text-white">PMP & TOGAF Certified</p>
              <span className="text-[11px] text-[#b9cacb]">
                Project Management Institute & The Open Group • Valid to 2027
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#313540] px-2 py-0.5 rounded text-[#00f0ff] shrink-0 border border-[#00f0ff]/20">
              <span className="material-symbols-outlined text-[13px]">verified_user</span>
              <span className="text-[10px] font-bold font-mono">Validated 98.6%</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 text-[#b9cacb]">
            <span className="text-[10px] font-mono text-[#00dbe9] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              <span>{isRTL ? 'الشارة المشفرة مؤكدة' : 'Cryptographic Badge Confirmed'}</span>
            </span>
            <span className="text-[10px] text-[#849495] font-mono">#REF-CERT-441</span>
          </div>
        </div>

        {/* Record 3 */}
        <div className="p-3 rounded-lg bg-[#171b26] flex flex-col gap-1.5 border border-[#3b494b]/15 text-start">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#ffe088] uppercase tracking-wider">
                {isRTL ? 'البرامج القيادية والزمالات' : 'Fellowship & Leadership Program'}
              </span>
              <p className="text-xs font-bold text-white">Executive Leadership Fellowship</p>
              <span className="text-[11px] text-[#b9cacb]">Misk Leadership Institute • 2023</span>
            </div>
            <div className="flex items-center gap-1 bg-[#313540] px-2 py-0.5 rounded text-[#ffe088] shrink-0 border border-[#ffe088]/20">
              <span className="material-symbols-outlined text-[13px]">warning</span>
              <span className="text-[10px] font-bold font-mono">94.7%</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-[#b9cacb]">
              {isRTL ? 'يتطلب تأكيد جهة الإصدار' : 'Issuer institution confirmation required'}
            </span>
            <button
              type="button"
              onClick={() =>
                onShowToast(
                  isRTL
                    ? 'تم إرسال طلب التأكيد للمؤسسة'
                    : 'Verification query dispatched to issuer registry'
                )
              }
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#262a35] text-[#ffe088] hover:bg-[#313540] transition-all cursor-pointer text-[10px] font-bold"
            >
              <span className="material-symbols-outlined text-[13px]">edit</span>
              <span>{isRTL ? 'مراجعة يدوية' : 'Manual Review'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decision Buttons */}
      <div className="flex flex-col gap-2.5 mb-5">
        <button
          onClick={() => {
            onShowToast(
              isRTL
                ? 'تم تصدير إثبات التدقيق الرقمي المشفر SHA-256'
                : 'Exported cryptographic audit proof package with SHA-256 seal'
            );
          }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#0566d9] text-[#00363a] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>
            {isRTL ? 'تصدير إثبات التدقيق الرقمي المشفر' : 'Export Cryptographic Audit Proof'}
          </span>
        </button>

        <button
          onClick={() => {
            setStep3Running(true);
            onShowToast(
              isRTL ? 'إعادة تحليل المستند ومطابقة المعايير...' : 'Re-evaluating document audit...'
            );
            setTimeout(() => setStep3Running(false), 1200);
          }}
          className="w-full h-11 rounded-xl bg-[#262a35] hover:bg-[#313540] text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-[0.99] transition-all border border-[#3b494b]/30 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">replay</span>
          <span>{isRTL ? 'إعادة تدقيق المستند' : 'Re-analyze Document'}</span>
        </button>
      </div>

      {/* Analyzed Documents Archive */}
      <div className="rounded-xl bg-[#171b26] p-4 shadow-xl border border-[#3b494b]/20 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#00f0ff]">
              inventory_2
            </span>
            <span>{isRTL ? 'أرشيف المستندات المحللة' : 'Analyzed Documents Archive'}</span>
          </h3>
          <span className="text-[10px] text-[#b9cacb] font-mono">2 Archived</span>
        </div>

        <div className="p-3 rounded-lg bg-[#1c1f2a]/70 flex items-center justify-between gap-2 border border-[#3b494b]/10 text-start">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#262a35] text-[#00f0ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">description</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate font-mono">
                CV_Saudi_Board_2024.pdf
              </span>
              <div className="flex items-center gap-2 text-[10px] text-[#b9cacb]">
                <span>Jan 12, 2025</span>
                <span>•</span>
                <span className="font-mono text-[#00dbe9]">SHA-256 ✓</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] text-[#00f0ff] font-bold uppercase tracking-wider font-mono">
            Verified
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#1c1f2a]/70 flex items-center justify-between gap-2 border border-[#3b494b]/10 text-start">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#262a35] text-[#adc6ff] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[17px]">description</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate font-mono">
                Advisory_Portfolio_EN.docx
              </span>
              <div className="flex items-center gap-2 text-[10px] text-[#b9cacb]">
                <span>Dec 28, 2024</span>
                <span>•</span>
                <span className="font-mono text-[#00dbe9]">SHA-256 ✓</span>
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#262a35] text-[10px] text-[#00f0ff] font-bold uppercase tracking-wider font-mono">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
};
