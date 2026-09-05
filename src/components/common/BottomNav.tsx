import React from 'react';
import { ScreenId, Language } from '../../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  language,
  onNavigate,
}) => {
  // Screens where bottom bar shouldn't show (splash, auth, onboarding)
  if (['01_splash', '02_auth', '03_onboarding'].includes(currentScreen)) {
    return null;
  }

  const isRTL = language === 'ar';

  const navItems = [
    {
      id: '04_dashboard' as ScreenId,
      icon: 'grid_view',
      labelEn: 'Dashboard',
      labelAr: 'الرئيسية',
    },
    {
      id: '09_interview_coach' as ScreenId,
      icon: 'mic',
      labelEn: 'Interview',
      labelAr: 'المقابلات',
    },
    {
      id: '06_cv_builder' as ScreenId,
      icon: 'post_add',
      labelEn: 'CV Builder',
      labelAr: 'السيرة الذاتية',
    },
    {
      id: '07_job_analyzer' as ScreenId,
      icon: 'troubleshoot',
      labelEn: 'Job Match',
      labelAr: 'مطابقة الوظائف',
    },
    {
      id: '08_subscription' as ScreenId,
      icon: 'workspace_premium',
      labelEn: 'Upgrade',
      labelAr: 'الترقية',
      isGold: true,
    },
  ];

  return (
    <nav className="sticky bottom-0 w-full z-30 bg-[#0b0f19]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-5 items-center h-15 px-1">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 transition-all cursor-pointer relative ${
                isActive
                  ? 'text-[#00f0ff] font-bold'
                  : item.isGold
                  ? 'text-[#fdd55a]/80 hover:text-[#fdd55a]'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              {isActive && (
                <div className="absolute -top-1 w-6 h-0.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>
              )}
              <span
                className="material-symbols-outlined text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {item.icon}
              </span>
              <span className="text-[10px] tracking-tight leading-none text-center truncate max-w-[62px]">
                {isRTL ? item.labelAr : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
