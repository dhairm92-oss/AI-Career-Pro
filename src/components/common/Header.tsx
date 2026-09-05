import React from 'react';
import { ASSETS } from '../../data/mockData';
import { ScreenId, Language } from '../../types';
import { useExecutive } from '../../context/ExecutiveContext';

interface HeaderProps {
  currentScreen: ScreenId;
  language: Language;
  onBack?: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenFirewall?: () => void;
  onOpenAiCopilot?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  language,
  onBack,
  onNavigate,
  onOpenFirewall,
  onOpenAiCopilot,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile, setIsDataInjectorOpen } = useExecutive();

  const titles: Record<ScreenId, { en: string; ar: string }> = {
    '01_splash': { en: 'AI Career Pro', ar: 'المنصة القيادية' },
    '02_auth': { en: 'Identity Authentication', ar: 'بوابة التحقق القيادية' },
    '03_onboarding': { en: 'Executive Onboarding', ar: 'معالج الإعداد والتهيئة' },
    '04_dashboard': { en: 'Executive Dashboard', ar: 'لوحة القيادة التنفيذية' },
    '05_docs_intel': { en: 'Document Intelligence', ar: 'ذكاء المستندات والتدقيق' },
    '06_cv_builder': { en: 'Smart CV Builder Studio', ar: 'استوديو السيرة الذاتية الذكي' },
    '07_job_analyzer': { en: 'Job Match Analyzer', ar: 'محلل مطابقة الوظائف' },
    '08_subscription': { en: 'Subscription & Passes', ar: 'الاشتراكات والتصاريح' },
    '09_interview_coach': { en: 'AI Interview Coach', ar: 'مدرب المقابلات الذكي' },
    '10_settings': { en: 'Settings & Security', ar: 'الإعدادات والأمان' },
    '11_completion_hub': { en: 'Completion & Flutter Hub', ar: 'مركز الاعتماد وحزمة فلاتر' },
  };

  const showBackButton = currentScreen !== '04_dashboard' && currentScreen !== '01_splash';

  return (
    <header className="sticky top-0 w-full z-30 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="h-14 px-3.5 flex items-center justify-between gap-2">
        {/* Leading Side: Back or Brand Emblem */}
        <div className="flex items-center gap-2 min-w-0">
          {showBackButton ? (
            <button
              onClick={onBack || (() => onNavigate('04_dashboard'))}
              aria-label="Back"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#b9cacb] hover:text-[#00f0ff] transition-all active:scale-95 cursor-pointer border border-white/10 shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isRTL ? 'arrow_forward' : 'arrow_back'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('01_splash')}
              className="cursor-pointer active:scale-95 transition-transform shrink-0"
              title="View Splash"
            >
              <img
                src={ASSETS.EMBLEM_IMAGE}
                alt="AI Career Pro Emblem"
                className="h-7 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
              />
            </button>
          )}

          <div className="flex flex-col min-w-0 text-start">
            <span className="text-[9px] tracking-wider text-[#00f0ff] uppercase font-bold font-mono truncate">
              {language === 'en' ? 'AI CAREER PRO' : 'المسار القيادي'}
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[180px]">
              {titles[currentScreen][language]}
            </h1>
          </div>
        </div>

        {/* Trailing Side: Security Badge & Profile Avatar */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Data Inject Button */}
          <button
            type="button"
            onClick={() => setIsDataInjectorOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/40 text-[10px] text-cyan-300 font-bold shadow-sm cursor-pointer active:scale-95 transition-all"
            title={isRTL ? 'إدخال وتبديل البيانات القيادية' : 'Switch / Input Executive Data'}
          >
            <span className="material-symbols-outlined text-[13px] text-[#fdd55a]">badge</span>
            <span className="hidden sm:inline">{isRTL ? 'البيانات' : 'Data'}</span>
          </button>

          {/* Quantum Firewall Badge Button */}
          <button
            type="button"
            onClick={onOpenFirewall}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-400/50 text-[10px] text-[#dbfcff] font-mono font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)] cursor-pointer active:scale-95 transition-all"
            title={isRTL ? 'فتح جدار الحماية السيادي الفولاذي' : 'Open Sovereign Quantum Firewall'}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
            <span className="material-symbols-outlined text-[13px] text-cyan-300">security</span>
            <span className="hidden xs:inline">NCA 100%</span>
          </button>

          {/* Manarah AI Button */}
          <button
            type="button"
            onClick={onOpenAiCopilot}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-400/40 text-[10px] text-cyan-300 font-bold shadow-sm cursor-pointer active:scale-95 transition-all"
            title={isRTL ? 'استشارة منارة AI' : 'Manarah AI Copilot'}
          >
            <span className="material-symbols-outlined text-[14px] text-[#00f0ff]">psychology</span>
            <span className="hidden sm:inline">{isRTL ? 'منارة AI' : 'Copilot'}</span>
          </button>

          <button
            onClick={() => setIsDataInjectorOpen(true)}
            className="w-7 h-7 rounded-full p-[1px] bg-gradient-to-tr from-[#00f0ff] to-[#0566d9] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#00f0ff]/50 transition-all active:scale-95 relative"
            title={isRTL ? 'تخصيص الملف القيادي والبيانات' : 'Edit Executive Profile Data'}
          >
            <img
              src={currentProfile.avatarUrl || ASSETS.PROFILE_IMAGE}
              alt="Executive Profile"
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0b0f19]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

