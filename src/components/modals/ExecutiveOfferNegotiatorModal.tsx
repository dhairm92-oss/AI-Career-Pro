import React, { useState } from 'react';
import { useExecutive } from '../../context/ExecutiveContext';
import { Language } from '../../types';

interface ExecutiveOfferNegotiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

export const ExecutiveOfferNegotiatorModal: React.FC<ExecutiveOfferNegotiatorModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();

  // Offer A (Default PIF Portfolio)
  const [baseMonthlyA, setBaseMonthlyA] = useState<number>(180000);
  const [bonusPercentA, setBonusPercentA] = useState<number>(45);
  const [ltiGrantA, setLtiGrantA] = useState<number>(1200000);
  const [severanceMonthsA, setSeveranceMonthsA] = useState<number>(12);
  const [housingAnnualA, setHousingAnnualA] = useState<number>(360000);

  // Offer B (NEOM Giga-Project Authority)
  const [baseMonthlyB, setBaseMonthlyB] = useState<number>(210000);
  const [bonusPercentB, setBonusPercentB] = useState<number>(40);
  const [ltiGrantB, setLtiGrantB] = useState<number>(1800000);
  const [severanceMonthsB, setSeveranceMonthsB] = useState<number>(9);
  const [housingAnnualB, setHousingAnnualB] = useState<number>(420000);

  if (!isOpen) return null;

  // Computations
  const annualBaseA = baseMonthlyA * 12;
  const annualBonusA = Math.round(annualBaseA * (bonusPercentA / 100));
  const annualizedLtiA = Math.round(ltiGrantA / 3); // 3-year vest
  const totalAnnualA = annualBaseA + annualBonusA + annualizedLtiA + housingAnnualA;
  const goldenParachuteValueA = baseMonthlyA * severanceMonthsA;

  const annualBaseB = baseMonthlyB * 12;
  const annualBonusB = Math.round(annualBaseB * (bonusPercentB / 100));
  const annualizedLtiB = Math.round(ltiGrantB / 3);
  const totalAnnualB = annualBaseB + annualBonusB + annualizedLtiB + housingAnnualB;
  const goldenParachuteValueB = baseMonthlyB * severanceMonthsB;

  const diffSAR = totalAnnualB - totalAnnualA;

  const copyNegotiationScript = () => {
    const script = isRTL
      ? `مذكرة التفاوض للجنة الترشيحات والمكافآت (NRC):
بناءً على التقييم المقارن لمسؤوليات المنصب القيادي وحجم المحفظة الرأسمالية:
1. نقترح رفع حزمة الأسهم طويلة الأجل (LTI) إلى ${Math.max(ltiGrantA, ltiGrantB).toLocaleString()} ر.س مرتبطة بنموذج تسريع الاستحقاق (Double-Trigger Acceleration).
2. تثبيت بند المظلة الذهبية (Golden Parachute) بضمان رواتب ${Math.max(severanceMonthsA, severanceMonthsB)} شهراً في حال إعادة الهيكلة أو الاندماج.
3. اعتماد مكافأة توقيع (Sign-on Bonus) تعويضية تعادل الأسهم غير المستحقة لدى الجهة السابقة.`
      : `Executive Remuneration Committee (NRC) Negotiation Framework:
1. Calibrate LTI Equity Pool to SAR ${Math.max(ltiGrantA, ltiGrantB).toLocaleString()} with Double-Trigger Acceleration clause.
2. Protect executive severance with a ${Math.max(severanceMonthsA, severanceMonthsB)}-month guaranteed Golden Parachute upon structural consolidation.
3. Bridge forfeited previous equity with an upfront Sign-on Retention grant.`;

    navigator.clipboard?.writeText(script);
    onShowToast(
      isRTL
        ? 'تم نسخ مذكرة شروط التفاوض للجنة المكافآت بنجاح'
        : 'NRC remuneration negotiation clauses copied to clipboard'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl my-6 rounded-2xl bg-[#0f1423] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] flex flex-col max-h-[92vh] overflow-hidden text-start">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131a2d] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{isRTL ? 'مهندس ومفاوض العقود التنفيذية والمظلة الذهبية' : 'Executive Offer Negotiator & Golden Parachute'}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  NRC READY
                </span>
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                {isRTL ? 'مقارنة حزم كبار التنفيذيين (C-Suite)، حصص الأسهم LTI، وشروط الحماية' : 'Benchmark C-Suite Packages, LTI Equity & Severance Guarantees'}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            {/* OFFER A */}
            <div className="p-4 rounded-xl bg-[#121828] border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {isRTL ? 'العرض أ: صندوق الاستثمارات العامة (PIF)' : 'Offer A: Sovereign Wealth Holding'}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[10px] font-mono font-bold">
                  PORTFOLIO CO
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a0e18] border border-white/5 space-y-1 text-center">
                <div className="text-[10px] text-gray-400 uppercase font-mono">
                  {isRTL ? 'إجمالي الحزمة السنوية المحققة' : 'Total Realized Annual Package'}
                </div>
                <div className="text-lg font-black font-mono text-cyan-300">
                  {totalAnnualA.toLocaleString()} <span className="text-xs font-normal">SAR</span>
                </div>
              </div>

              {/* Sliders for Offer A */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'الراتب الأساسي الشهري:' : 'Base Monthly Salary:'}</span>
                    <span className="font-mono text-white font-bold">{baseMonthlyA.toLocaleString()} SAR</span>
                  </div>
                  <input
                    type="range"
                    min={120000}
                    max={250000}
                    step={5000}
                    value={baseMonthlyA}
                    onChange={(e) => setBaseMonthlyA(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'المكافأة السنوية المستهدفة:' : 'Annual Bonus Target:'}</span>
                    <span className="font-mono text-white font-bold">{bonusPercentA}% ({annualBonusA.toLocaleString()} SAR)</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={65}
                    step={5}
                    value={bonusPercentA}
                    onChange={(e) => setBonusPercentA(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'حصة الأسهم LTI (3 سنوات):' : 'LTI Equity Grant (3-Yr):'}</span>
                    <span className="font-mono text-white font-bold">{ltiGrantA.toLocaleString()} SAR</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={3000000}
                    step={100000}
                    value={ltiGrantA}
                    onChange={(e) => setLtiGrantA(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'ضمان المظلة الذهبية:' : 'Golden Parachute:'}</span>
                    <span className="font-mono text-emerald-400 font-bold">{severanceMonthsA} {isRTL ? 'أشهر' : 'Months'} ({goldenParachuteValueA.toLocaleString()} SAR)</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={18}
                    step={3}
                    value={severanceMonthsA}
                    onChange={(e) => setSeveranceMonthsA(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* OFFER B */}
            <div className="p-4 rounded-xl bg-[#121828] border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {isRTL ? 'العرض ب: هيئة مشروع نيوم (NEOM)' : 'Offer B: NEOM Giga-Project'}
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 text-[10px] font-mono font-bold">
                  GIGA-PROJECT
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a0e18] border border-white/5 space-y-1 text-center">
                <div className="text-[10px] text-gray-400 uppercase font-mono">
                  {isRTL ? 'إجمالي الحزمة السنوية المحققة' : 'Total Realized Annual Package'}
                </div>
                <div className="text-lg font-black font-mono text-blue-300">
                  {totalAnnualB.toLocaleString()} <span className="text-xs font-normal">SAR</span>
                </div>
              </div>

              {/* Sliders for Offer B */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'الراتب الأساسي الشهري:' : 'Base Monthly Salary:'}</span>
                    <span className="font-mono text-white font-bold">{baseMonthlyB.toLocaleString()} SAR</span>
                  </div>
                  <input
                    type="range"
                    min={120000}
                    max={250000}
                    step={5000}
                    value={baseMonthlyB}
                    onChange={(e) => setBaseMonthlyB(Number(e.target.value))}
                    className="w-full accent-blue-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'المكافأة السنوية المستهدفة:' : 'Annual Bonus Target:'}</span>
                    <span className="font-mono text-white font-bold">{bonusPercentB}% ({annualBonusB.toLocaleString()} SAR)</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={65}
                    step={5}
                    value={bonusPercentB}
                    onChange={(e) => setBonusPercentB(Number(e.target.value))}
                    className="w-full accent-blue-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'حصة الأسهم LTI (3 سنوات):' : 'LTI Equity Grant (3-Yr):'}</span>
                    <span className="font-mono text-white font-bold">{ltiGrantB.toLocaleString()} SAR</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={3000000}
                    step={100000}
                    value={ltiGrantB}
                    onChange={(e) => setLtiGrantB(Number(e.target.value))}
                    className="w-full accent-blue-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-gray-300 mb-1">
                    <span>{isRTL ? 'ضمان المظلة الذهبية:' : 'Golden Parachute:'}</span>
                    <span className="font-mono text-emerald-400 font-bold">{severanceMonthsB} {isRTL ? 'أشهر' : 'Months'} ({goldenParachuteValueB.toLocaleString()} SAR)</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={18}
                    step={3}
                    value={severanceMonthsB}
                    onChange={(e) => setSeveranceMonthsB(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Variance Analysis Box */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#121929] to-[#0f172a] border border-white/10 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <div className="text-[10px] font-mono text-gray-400 uppercase">
                {isRTL ? 'فارق القيمة السنوية الصافية' : 'Annual Net Variance Delta'}
              </div>
              <div className="text-sm font-bold text-white">
                {diffSAR >= 0
                  ? isRTL
                    ? `العرض (ب) يتفوق بفارق +${diffSAR.toLocaleString()} ر.س سنوياً`
                    : `Offer B exceeds by +SAR ${diffSAR.toLocaleString()} / year`
                  : isRTL
                  ? `العرض (أ) يتفوق بفارق +${Math.abs(diffSAR).toLocaleString()} ر.س سنوياً`
                  : `Offer A exceeds by +SAR ${Math.abs(diffSAR).toLocaleString()} / year`}
              </div>
            </div>

            <button
              onClick={copyNegotiationScript}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-[#002d33] text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>{isRTL ? 'توليد شروط التفاوض للجنة (NRC)' : 'Generate NRC Counter-Terms'}</span>
            </button>
          </div>

          {/* Strategic Negotiation Advisory Points */}
          <div className="p-3.5 rounded-xl bg-[#0a0e18] border border-cyan-500/20 space-y-2">
            <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              <span>{isRTL ? 'توجيهات الذكاء الاصطناعي للمفاوضة القيادية' : 'AI Executive Negotiation Strategy'}</span>
            </h4>
            <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
              <li>
                {isRTL
                  ? 'المطالبة بشرط (Double-Trigger Acceleration): تسريع صرف جميع الأسهم LTI المتبقية فوراً عند حدوث اندماج أو تغيير في هيكل مجلس الإدارة.'
                  : 'Stipulate a Double-Trigger clause for immediate 100% LTI vesting upon leadership restructuring.'}
              </li>
              <li>
                {isRTL
                  ? 'بند المظلة الذهبية: احرص ألا يقل عن 12 شهراً لحماية استقلالية قرارك التنفيذي الجريء أمام ضغوط الإدارات المختلفة.'
                  : 'Anchor severance guarantee at 12 months minimum to safeguard executive autonomy during bold transformations.'}
              </li>
              <li>
                {isRTL
                  ? 'بدلات العضوية: تفاوض على تخصيص مقعد في لجان فرعية تابعة (Audit / Tech Committee) بعائد منفصل.'
                  : 'Secure separate compensation for subsidiary Board & Governance Committee representation.'}
              </li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#0d121f] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>{isRTL ? 'حاسبة متوافقة مع أنظمة العمل ولجان المكافآت بالمملكة' : 'Saudi Labor Law & C-Suite Governance Compliant'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1c2436] hover:bg-[#26324b] text-white font-semibold cursor-pointer"
          >
            {isRTL ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
