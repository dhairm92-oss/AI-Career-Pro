import React, { useState } from 'react';
import { Language } from '../../types';
import { useExecutive } from '../../context/ExecutiveContext';

interface LtiVestingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

export const LtiVestingTrackerModal: React.FC<LtiVestingTrackerModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();

  // Initial Grant parameters
  const [grantUnits, setGrantUnits] = useState(25000);
  const [grantPriceSAR, setGrantPriceSAR] = useState(100);
  const [valuationMultiple, setValuationMultiple] = useState<1 | 2 | 3.5 | 5>(2);
  const [accelerationEnabled, setAccelerationEnabled] = useState(true);

  if (!isOpen) return null;

  const totalGrantValueSAR = grantUnits * grantPriceSAR;
  const projectedUnitValueSAR = grantPriceSAR * valuationMultiple;
  const totalProjectedValueSAR = grantUnits * projectedUnitValueSAR;

  const vestingYears = [
    {
      year: 1,
      labelAr: 'السنة الأولى (سنة الحظر - Cliff)',
      labelEn: 'Year 1 (12-Month Cliff)',
      vestedPercent: 25,
      date: '2027 Q1',
      units: Math.round(grantUnits * 0.25),
      valueSAR: Math.round(grantUnits * 0.25 * projectedUnitValueSAR),
      status: 'upcoming',
    },
    {
      year: 2,
      labelAr: 'السنة الثانية (الاستحقاق ربع السنوي)',
      labelEn: 'Year 2 (Quarterly Tranches)',
      vestedPercent: 50,
      date: '2028 Q1',
      units: Math.round(grantUnits * 0.25),
      valueSAR: Math.round(grantUnits * 0.25 * projectedUnitValueSAR),
      status: 'locked',
    },
    {
      year: 3,
      labelAr: 'السنة الثالثة (مرحلة التوسع والتسييل)',
      labelEn: 'Year 3 (Pre-IPO Liquidity Window)',
      vestedPercent: 75,
      date: '2029 Q1',
      units: Math.round(grantUnits * 0.25),
      valueSAR: Math.round(grantUnits * 0.25 * projectedUnitValueSAR),
      status: 'locked',
    },
    {
      year: 4,
      labelAr: 'السنة الرابعة (الاستحقاق السيادي الكامل)',
      labelEn: 'Year 4 (Full 100% Vesting & Carry)',
      vestedPercent: 100,
      date: '2030 Q1',
      units: Math.round(grantUnits * 0.25),
      valueSAR: Math.round(grantUnits * 0.25 * projectedUnitValueSAR),
      status: 'locked',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-2xl bg-[#0c101a] border border-cyan-500/40 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 py-3 bg-[#111726] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {isRTL ? 'حاسبة ومجدول أسهم الحوافز طويلة الأجل (LTI Tracker)' : 'LTI & Equity Vesting Schedule Tracker'}
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[9px] font-bold">
                  SOVEREIGN POOL
                </span>
              </div>
              <p className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'نمذجة استحقاق الأسهم، نوافذ السيولة، وحماية التغيير الإداري'
                  : 'Multi-Year Equity Vesting, Liquidity Milestones & Double-Trigger Parachute'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Executive Overview Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-[#131929] border border-white/10 text-start">
              <span className="text-[10px] text-gray-400 font-mono block">
                {isRTL ? 'إجمالي الحصة الممنوحة' : 'Granted Units'}
              </span>
              <span className="text-base sm:text-lg font-mono font-extrabold text-white">
                {grantUnits.toLocaleString()}
              </span>
              <span className="text-[9px] text-cyan-300 block">
                {isRTL ? 'وحدة مقيدة (RSUs)' : 'Restricted Stock Units'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#131929] border border-white/10 text-start">
              <span className="text-[10px] text-gray-400 font-mono block">
                {isRTL ? 'القيمة الابتدائية للمنحة' : 'Grant Baseline'}
              </span>
              <span className="text-base sm:text-lg font-mono font-extrabold text-cyan-400">
                {(totalGrantValueSAR / 1000000).toFixed(2)}M
              </span>
              <span className="text-[9px] text-gray-400 block">SAR @ Base</span>
            </div>

            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950/60 to-[#131929] border border-cyan-400/40 text-start">
              <span className="text-[10px] text-emerald-400 font-mono block font-bold">
                {isRTL ? 'القيمة المتوقعة عند التخارج' : 'Projected Value'}
              </span>
              <span className="text-base sm:text-lg font-mono font-extrabold text-emerald-400">
                {(totalProjectedValueSAR / 1000000).toFixed(2)}M
              </span>
              <span className="text-[9px] text-emerald-300/80 block">SAR @ {valuationMultiple}x</span>
            </div>
          </div>

          {/* Multiplier Selector & Interactive Controls */}
          <div className="p-3 rounded-xl bg-[#141b2c] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                {isRTL ? 'مضاعف تقييم الصندوق / الشركة عند الإدراج:' : 'Valuation Multiple Multiplier:'}
              </span>
              <span className="font-mono text-cyan-300 font-bold">{valuationMultiple}x Bull Target</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '1.0x Base', val: 1 },
                { label: '2.0x Growth', val: 2 },
                { label: '3.5x Sovereign', val: 3.5 },
                { label: '5.0x Apex', val: 5 },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setValuationMultiple(item.val as any)}
                  className={`py-2 px-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    valuationMultiple === item.val
                      ? 'bg-cyan-500 text-[#00363a] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Grant Units Slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px] text-gray-300">
                <span>{isRTL ? 'تعديل عدد الوحدات الممنوحة:' : 'Adjust Granted Units:'}</span>
                <span className="font-mono font-bold text-cyan-300">{grantUnits.toLocaleString()} units</span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={grantUnits}
                onChange={(e) => setGrantUnits(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-black/40 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* 4-Year Visual Vesting Progression */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {isRTL ? 'مخطط الاستحقاق الزمني على مدار 4 سنوات' : '4-Year Vesting Milestone Timeline'}
            </h4>

            <div className="space-y-2">
              {vestingYears.map((v) => (
                <div
                  key={v.year}
                  className="p-3 rounded-xl bg-[#111728] border border-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-between gap-3 text-start"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs shrink-0">
                      Y{v.year}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {isRTL ? v.labelAr : v.labelEn}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        {v.date} • {v.units.toLocaleString()} Units ({v.vestedPercent}% Cumulative)
                      </div>
                    </div>
                  </div>

                  <div className="text-end shrink-0">
                    <div className="text-xs font-mono font-extrabold text-emerald-400">
                      {(v.valueSAR / 1000).toLocaleString()}K SAR
                    </div>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-gray-400 font-mono">
                      {v.year === 1 ? (isRTL ? 'حظر سنة كاملة' : '1yr Cliff') : (isRTL ? 'استحقاق ربع سنوي' : 'Quarterly')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Double Trigger Acceleration Clause Box */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#171424] to-[#121827] border border-purple-500/30 space-y-2 text-start">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-purple-400">shield_lock</span>
                <span className="text-xs font-bold text-white">
                  {isRTL ? 'شرط التسريع المزدوج (Double-Trigger Acceleration)' : 'Double-Trigger Acceleration Protection'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAccelerationEnabled(!accelerationEnabled);
                  onShowToast(
                    accelerationEnabled
                      ? (isRTL ? 'تم إلغاء تفعيل شرط التسريع' : 'Acceleration clause disabled')
                      : (isRTL ? 'تم تأكيد تفعيل بند المظلة الذهبية' : 'Golden parachute clause ratified')
                  );
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono cursor-pointer transition-all ${
                  accelerationEnabled
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {accelerationEnabled ? 'ENFORCED' : 'OFF'}
              </button>
            </div>

            <p className="text-[11px] text-[#c4b5fd] leading-relaxed">
              {isRTL
                ? 'في حال حدوث إعادة هيكلة سيادية، اندماج حكومي، أو تغيير جذري في مجلس الإدارة يؤدي لإنهاء الخدمات، يتم تسييل وتسريع 100% من الأسهم غير المستحقة فوراً دون انتظار استكمال السنوات الأربع.'
                : 'In the event of sovereign M&A, giga-project restructuring, or termination without cause, 100% of unvested equity accelerates to full liquidity immediately.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#111726] border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-mono">
            Compliant with PIF Portfolio LTI Standard Guidelines 2026
          </span>
          <button
            type="button"
            onClick={() => {
              onShowToast(
                isRTL
                  ? 'تم تصدير تقرير استحقاق الأسهم ومحفظة LTI بصيغة جدول بيانات'
                  : 'LTI vesting telemetry table exported to secure ledger'
              );
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#00363a] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            <span>{isRTL ? 'اعتماد وحفظ جدول الاستحقاق' : 'Export Vesting Schedule'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
