import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../data/mockData';
import { ScreenId, Language } from '../../types';

interface SplashScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onToggleLanguage: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  language,
  onNavigate,
  onToggleLanguage,
}) => {
  const isRTL = language === 'ar';
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const statuses = {
    en: [
      'Initializing sovereign E2EE encrypted channel...',
      'Auditing enterprise cloud protocol AES-256...',
      'Verifying cryptographic handshake RSA-4096...',
      'Validating 100% containerized sandbox...',
      'Ready to transition to Executive Security Gateway',
    ],
    ar: [
      'تهيئة القناة المشفرة للبيانات السيادية...',
      'فحص البروتوكول السحابي الصارم AES-256...',
      'مطابقة التوقيع الرقمي RSA-4096...',
      'التحقق من العزل الأمني 100%...',
      'جاهز للانتقال إلى بوابة الوصول القيادي',
    ],
  };

  const runSequence = () => {
    setProgress(0);
    const list = statuses[language];
    setStatusText(list[0]);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusText(list[list.length - 1]);
      } else {
        setProgress(current);
        if (current > 80) setStatusText(list[3]);
        else if (current > 50) setStatusText(list[2]);
        else if (current > 20) setStatusText(list[1]);
      }
    }, 60);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const cleanup = runSequence();
    return cleanup;
  }, [language]);

  return (
    <div className="flex-1 flex flex-col justify-between w-full min-h-screen relative px-5 pt-3 pb-6 select-none">
      {/* Background Ambient Glows */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#00f0ff]/15 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute top-1/3 -left-20 w-64 h-64 bg-[#0566d9]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-16 -right-16 w-72 h-72 bg-[#fdd55a]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Global Telemetry Bar */}
      <div className="w-full flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171b26]/85 backdrop-blur-xl border border-[#00f0ff]/25 shadow-[0_0_15px_rgba(0,240,255,0.08)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[10px] font-bold text-[#dbfcff] tracking-wider uppercase font-mono">
            {isRTL ? 'المركز // الرياض-نواة-٠١' : 'NODE // RIYADH-CORE-01'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#171b26]/85 border border-white/10 text-[#00dbe9] text-[11px] font-medium backdrop-blur-md">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span className="font-mono text-[10px]">AES-256</span>
          </div>

          <button
            onClick={runSequence}
            className="w-8 h-8 rounded-full bg-[#171b26]/85 border border-white/10 flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-all active:scale-95 cursor-pointer backdrop-blur-md"
            title="Replay sequence"
          >
            <span className="material-symbols-outlined text-[16px]">replay</span>
          </button>

          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#171b26]/85 border border-[#00f0ff]/30 text-[11px] font-bold text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-colors backdrop-blur-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[13px]">language</span>
            <span>{language === 'en' ? 'AR' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Main Stage: 3D Apex Emblem & Typography */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto w-full py-4 z-10">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171b26]/80 border border-[#00f0ff]/25 backdrop-blur-xl shadow-[0_0_20px_rgba(0,240,255,0.12)] mb-5">
          <span className="material-symbols-outlined text-[#00f0ff] text-[15px]">
            verified_user
          </span>
          <span className="text-[11px] font-bold text-[#dbfcff] tracking-wide font-mono">
            {isRTL
              ? 'توثيق سحابي مشفر AES-256 • معيار عسكري'
              : 'AES-256 Cloud Verified • Military Standard'}
          </span>
        </div>

        {/* 3D Glass Plinth Frame */}
        <div className="relative flex items-center justify-center mb-6 emblem-float">
          <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#00f0ff]/30 via-[#0566d9]/20 to-[#fdd55a]/20 blur-3xl opacity-80 animate-pulse"></div>
          
          <div className="relative w-52 h-52 rounded-[32px] p-3.5 bg-gradient-to-b from-[#262a35]/90 to-[#0a0e18]/95 backdrop-blur-2xl border border-[#00f0ff]/35 shadow-[0_24px_60px_rgba(0,0,0,0.85)] flex items-center justify-center neon-border-pulse group">
            <div className="absolute inset-1.5 rounded-[26px] bg-gradient-to-b from-white/15 via-transparent to-[#00f0ff]/10 pointer-events-none"></div>

            <div className="relative w-full h-full rounded-[22px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#171b26] to-[#0a0e18] p-2 shadow-inner border border-white/5">
              <img
                src={ASSETS.EMBLEM_IMAGE}
                alt="AI Career Pro 3D Sovereign Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(0,240,255,0.5)] transition-transform duration-700 ease-out transform group-hover:scale-105"
              />
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent laser-line pointer-events-none shadow-[0_0_8px_#00f0ff]"></div>
            </div>

            <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>
            <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#fdd55a] shadow-[0_0_8px_#fdd55a]"></div>
          </div>
        </div>

        {/* Brand Headline */}
        <div className="text-center flex flex-col items-center max-w-sm px-2">
          <div className="inline-flex items-center gap-1.5 mb-2 px-3.5 py-1 rounded-full bg-[#262a35]/80 backdrop-blur-md border border-white/10 shadow-sm">
            <span className="material-symbols-outlined text-[#fdd55a] text-[14px]">
              verified
            </span>
            <span className="text-[10px] font-bold text-[#fff5e1] tracking-wider uppercase font-mono">
              {isRTL ? 'المسار القيادي • إصدار المؤسسات' : 'AI CAREER PRO • ENTERPRISE'}
            </span>
          </div>

          <h1 className="text-[32px] leading-[38px] font-extrabold text-[#dbfcff] tracking-tight">
            {isRTL ? 'المسار القيادي الذكي' : 'AI Career Pro'}
          </h1>
          <p className="text-[13px] text-[#b9cacb] mt-2 leading-relaxed max-w-[340px]">
            {isRTL
              ? 'المنصة الذكية المعتمدة لتطوير المسار القيادي والتنفيذي وفق خوارزميات الاستشراف المهني المتقدم.'
              : 'The certified AI platform for executive & leadership career advancement powered by predictive career intelligence.'}
          </p>
        </div>

        {/* Futuristic Loading Telemetry */}
        <div className="w-full max-w-xs mt-7 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] px-1">
            <div className="flex items-center gap-2 text-[#dbfcff] font-medium min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping shrink-0"></span>
              <span className="tracking-wide truncate">{statusText}</span>
            </div>
            <span className="font-bold text-[#00f0ff] font-mono text-[13px] shrink-0 ml-2">
              {progress}%
            </span>
          </div>

          <div className="relative w-full h-3 rounded-full bg-[#0a0e18] border border-white/15 p-[2px] overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] via-[#adc6ff] to-[#fdd55a] transition-all duration-150 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#171b26]/70 border border-white/5 text-[10px] text-[#b9cacb] font-mono">
              <span className="material-symbols-outlined text-emerald-400 text-[13px]">
                verified
              </span>
              <span>{isRTL ? 'صفر بيانات وهمية' : 'Zero Fake Data'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#171b26]/70 border border-white/5 text-[10px] text-[#b9cacb] font-mono">
              <span className="material-symbols-outlined text-[#00f0ff] text-[13px]">
                lock
              </span>
              <span>{isRTL ? 'تشفير شامل نشط' : 'E2EE Protocol Active'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <footer className="w-full pt-2 flex flex-col items-center gap-3 z-20">
        <div className="w-full py-2 px-3 rounded-xl bg-[#171b26]/70 border border-white/10 flex items-center justify-center gap-2 backdrop-blur-md shadow-sm">
          <span className="material-symbols-outlined text-[#fdd55a] text-[16px] shrink-0">
            shield_with_heart
          </span>
          <p className="text-[10px] text-[#b9cacb] font-medium text-center leading-normal">
            {isRTL
              ? 'عزل الحسابات مُطلَق • صفر احتفاظ بالبيانات • غير مستخدمة في تدريب النماذج العامة'
              : 'Strict sovereign account isolation • Zero data retention • Not used for public LLM training'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('02_auth')}
          className="group w-full max-w-xs h-13 inline-flex items-center justify-center gap-2 px-6 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#0566d9] text-[#00363a] font-bold text-sm shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>
            {isRTL
              ? 'الانتقال إلى بوابة الوصول القيادي الآمنة'
              : 'Proceed to Executive Secure Access'}
          </span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            {isRTL ? 'arrow_back' : 'arrow_forward'}
          </span>
        </button>

        <div className="flex items-center gap-2 text-[10px] text-[#849495] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>SESSION: AIR-GAPPED // SHA256-8F4C</span>
        </div>
      </footer>
    </div>
  );
};
