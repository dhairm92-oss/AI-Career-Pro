import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';

interface SubscriptionScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  language,
  onNavigate,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [billingCycle, setBillingCycle] = useState<'annual' | 'single'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    onShowToast(
      isRTL
        ? 'جاري تفعيل التصريح التنفيذي والربط بالقناة المشفرة...'
        : 'Authorizing executive pass through sovereign payment enclave...'
    );
    setTimeout(() => {
      setIsProcessing(false);
      onShowToast(
        isRTL
          ? 'تم تفعيل تصريح النخبة التنفيذي بنجاح!'
          : 'Executive Sovereign Pass successfully activated!'
      );
      onNavigate('04_dashboard');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Top Gold Badge */}
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#fdd55a]/30 via-[#1c2436] to-[#00f0ff]/20 flex items-center justify-center text-[#fdd55a] shadow-[0_0_24px_rgba(253,213,90,0.25)] border border-[#fdd55a]/40 mb-2.5">
          <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131927] border border-[#fdd55a]/30 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fdd55a] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#fdd55a] tracking-wider uppercase font-mono">
            SOVEREIGN EXECUTIVE ACCESS
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-white">
          {isRTL ? 'الترقية إلى تصريح النخبة التنفيذي' : 'Executive Sovereign Retainer'}
        </h2>
        <p className="text-xs text-[#94a3b8] max-w-xs mt-1">
          {isRTL
            ? 'وصول غير محدود لمحركات التدقيق الصارم ومحاكاة المقابلات القيادية'
            : 'Unrestricted access to strict audit engines, AI interview coach & ATS studio'}
        </p>
      </div>

      {/* Cycle Selector */}
      <div className="w-full p-1 rounded-xl bg-[#0b0f19] flex items-center border border-white/10">
        <button
          type="button"
          onClick={() => setBillingCycle('annual')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            billingCycle === 'annual'
              ? 'bg-[#1c2436] text-[#fdd55a] shadow-md border border-[#fdd55a]/40'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          {isRTL ? 'الاشتراك السنوي الشامل (الأفضل قيمة)' : 'Annual Retainer (Unlimited)'}
        </button>
        <button
          type="button"
          onClick={() => setBillingCycle('single')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            billingCycle === 'single'
              ? 'bg-[#1c2436] text-[#00f0ff] shadow-md border border-[#00f0ff]/40'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          {isRTL ? 'تصريح المنصب الفردي (٢٤ ساعة)' : 'Single Requisition Pass (24h)'}
        </button>
      </div>

      {/* Main Pricing Tier Card */}
      {billingCycle === 'annual' ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#161f30] to-[#121826] p-5 shadow-2xl border-2 border-[#fdd55a]/60 text-start">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-[#fdd55a] to-[#e9c349] text-[#00363a] text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl font-mono">
            MOST POPULAR • 40% OFF
          </div>

          <div className="flex flex-col gap-1 mb-4">
            <span className="text-xs font-bold text-[#fdd55a] uppercase tracking-wider font-mono">
              C-SUITE & BOARD RETENTION
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">SAR 4,800</span>
              <span className="text-xs text-[#94a3b8]">/ {isRTL ? 'سنة' : 'year'}</span>
            </div>
            <span className="text-[11px] text-cyan-400">
              {isRTL
                ? 'يعادل ٤٠٠ ريال شهرياً فقط • فوترة سنوية'
                : 'Equivalent to SAR 400/mo billed annually'}
            </span>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-white/10">
            {[
              {
                en: 'Unlimited Strict ATS CV Compilations & Optimizations',
                ar: 'صياغة وتوليد لا محدود للسير الذاتية المتوافقة مع ATS',
              },
              {
                en: 'Deep OCR Document Parsing & Zero-Hallucination Fact Verification',
                ar: 'تدقيق دلالي وفحص حقائق فوري بدون أي هلوسة',
              },
              {
                en: 'Boardroom AI Interview Coach with Voice Telemetry & STAR Analysis',
                ar: 'مدرب مقابلات ذكي يحاكي لجان الترشيح ومجالس الإدارة بالصوت',
              },
              {
                en: 'Sovereign Enclave Storage (Zero data used for LLM public training)',
                ar: 'بيئة تخزين سيادية معزولة تماماً وغير مستخدمة في تدريب النماذج',
              },
              {
                en: 'Bilingual ATS Output (Arabic RTL & English LTR)',
                ar: 'تصدير ثنائي اللغة متوافق تماماً بالعربية والإنجليزية',
              },
            ].map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-white">
                <span className="material-symbols-outlined text-[#fdd55a] text-[17px] shrink-0 mt-0.5">
                  verified
                </span>
                <span>{isRTL ? feat.ar : feat.en}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#161f30] to-[#121826] p-5 shadow-2xl border border-cyan-500/50 text-start">
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-xs font-bold text-[#00f0ff] uppercase tracking-wider font-mono">
              SINGLE REQUISITION ACCELERATOR
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">SAR 350</span>
              <span className="text-xs text-[#94a3b8]">/ {isRTL ? 'تصريح' : 'one-time'}</span>
            </div>
            <span className="text-[11px] text-[#94a3b8]">
              {isRTL
                ? 'صالح لمدة ٢٤ ساعة لمنصب قيادي محدد'
                : 'Valid for 24 hours for a specific leadership role'}
            </span>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-white/10">
            {[
              {
                en: '1 Target Requisition Full ATS Tailoring & Match Analysis',
                ar: 'توليف كامل ومطابقة دقيقة لمنصب قيادي واحد',
              },
              {
                en: '3 Realistic Boardroom Voice Interview Sessions for that Role',
                ar: '٣ جلسات محاكاة صوتية للمقابلة الخاصة بالمنصب',
              },
              {
                en: 'Exportable Audit Trail & ATS Proof Package',
                ar: 'تصدير ملف التدقيق وإثبات اجتياز فلاتر ATS',
              },
            ].map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-white">
                <span className="material-symbols-outlined text-[#00f0ff] text-[17px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>{isRTL ? feat.ar : feat.en}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Rails */}
      <div className="rounded-xl bg-[#131927] p-3.5 border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#94a3b8]">
          <span>{isRTL ? 'بوابات الدفع السيادية المعتمدة' : 'Certified Enterprise Payment Rails'}</span>
          <span className="text-[#00f0ff] font-mono text-[10px]">E2EE Encrypted</span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1 text-xs font-bold">
          <div className="flex-1 py-2 px-1 rounded-lg bg-[#0b0f19] flex items-center justify-center text-white border border-white/5">
            Apple Pay
          </div>
          <div className="flex-1 py-2 px-1 rounded-lg bg-[#0b0f19] flex items-center justify-center text-emerald-400 border border-white/5">
            mada
          </div>
          <div className="flex-1 py-2 px-1 rounded-lg bg-[#0b0f19] flex items-center justify-center text-white border border-white/5">
            Corporate Visa
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        disabled={isProcessing}
        onClick={handleSubscribe}
        className="w-full h-13 rounded-xl bg-gradient-to-r from-[#fdd55a] via-[#ffe088] to-[#fdd55a] text-[#00363a] font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(253,213,90,0.4)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer mb-3"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-[#00363a] border-t-transparent animate-spin"></span>
            <span>{isRTL ? 'جاري الاتصال بالقناة الآمنة...' : 'Securing Enterprise Enclave...'}</span>
          </div>
        ) : (
          <>
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span>
              {billingCycle === 'annual'
                ? isRTL
                  ? 'تأكيد تفعيل تصريح النخبة السنوي'
                  : 'Activate Annual Executive Retainer'
                : isRTL
                ? 'شراء تصريح المنصب (٣٥٠ ر.س)'
                : 'Purchase Single Requisition Pass'}
            </span>
          </>
        )}
      </button>

      {/* ZATCA & Compliance Note */}
      <div className="text-center text-[10px] text-[#849495] flex items-center justify-center gap-1.5 font-mono">
        <span className="material-symbols-outlined text-[13px] text-emerald-400">verified</span>
        <span>
          {isRTL
            ? 'متوافق مع هيئة الزكاة والضريبة والجمارك (ZATCA) • فاتورة ضريبية رسمية'
            : 'ZATCA E-Invoicing Certified • Full VAT Tax Invoice Issued'}
        </span>
      </div>
    </div>
  );
};
