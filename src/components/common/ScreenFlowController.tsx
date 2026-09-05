import React, { useState } from 'react';
import { ScreenId, Language, DeviceMode } from '../../types';
import { SCREENS_LIST, ASSETS } from '../../data/mockData';

interface ScreenFlowControllerProps {
  currentScreen: ScreenId;
  language: Language;
  deviceMode: DeviceMode;
  onSelectScreen: (screen: ScreenId) => void;
  onToggleLanguage: () => void;
  onSelectDeviceMode: (mode: DeviceMode) => void;
}

export const ScreenFlowController: React.FC<ScreenFlowControllerProps> = ({
  currentScreen,
  language,
  deviceMode,
  onSelectScreen,
  onToggleLanguage,
  onSelectDeviceMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentIndex = SCREENS_LIST.findIndex((s) => s.id === currentScreen);
  const currentItem = SCREENS_LIST[currentIndex] || SCREENS_LIST[0];
  const prevScreen = currentIndex > 0 ? SCREENS_LIST[currentIndex - 1] : null;
  const nextScreen =
    currentIndex < SCREENS_LIST.length - 1 ? SCREENS_LIST[currentIndex + 1] : null;

  return (
    <header className="w-full bg-[#080c16]/95 backdrop-blur-md border-b border-white/10 text-white z-40 sticky top-0 px-3 sm:px-6 py-2 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Brand & Current Screen Tag */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00f0ff]/20 to-[#0566d9]/20 border border-[#00f0ff]/40 flex items-center justify-center p-1 shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <img
              src={ASSETS.EMBLEM_IMAGE}
              alt="Apex Shield"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col text-start min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold tracking-wider text-white uppercase font-mono">
                AI CAREER PRO
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-cyan-500/15 text-[#00f0ff] text-[10px] font-mono font-bold">
                11 SCREENS
              </span>
            </div>
            <span className="text-[11px] text-[#94a3b8] truncate font-medium">
              {language === 'ar' ? currentItem.titleAr : currentItem.titleEn} ({currentItem.number}/11)
            </span>
          </div>
        </div>

        {/* Center: Interactive Screen Switcher Bar */}
        <div className="flex items-center gap-1.5 bg-[#131927] p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            type="button"
            disabled={!prevScreen}
            onClick={() => prevScreen && onSelectScreen(prevScreen.id)}
            title={prevScreen ? `Previous: ${prevScreen.number}` : 'At first screen'}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              prevScreen
                ? 'text-white hover:bg-white/10 hover:text-[#00f0ff] cursor-pointer'
                : 'text-gray-600 opacity-40 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {language === 'ar' ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>

          {/* Quick Drawer / Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1a2336] hover:bg-[#222d44] border border-cyan-500/30 text-xs font-semibold text-[#00f0ff] transition-all cursor-pointer shadow-sm"
          >
            <span className="font-mono font-bold text-white bg-cyan-500/20 px-1.5 py-0.5 rounded text-[10px]">
              {currentItem.number}
            </span>
            <span className="hidden md:inline-block truncate max-w-[150px]">
              {language === 'ar' ? currentItem.titleAr : currentItem.titleEn}
            </span>
            <span className="material-symbols-outlined text-[16px]">
              {isOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          <button
            type="button"
            disabled={!nextScreen}
            onClick={() => nextScreen && onSelectScreen(nextScreen.id)}
            title={nextScreen ? `Next: ${nextScreen.number}` : 'At last screen'}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              nextScreen
                ? 'text-white hover:bg-white/10 hover:text-[#00f0ff] cursor-pointer'
                : 'text-gray-600 opacity-40 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {language === 'ar' ? 'chevron_left' : 'chevron_right'}
            </span>
          </button>
        </div>

        {/* Trailing Controls: Viewport Mode & Language */}
        <div className="flex items-center gap-2">
          {/* Quick Hub Shortcut */}
          <button
            type="button"
            onClick={() => onSelectScreen('11_completion_hub')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">terminal</span>
            <span>Flutter Code</span>
          </button>

          {/* 4-Device Viewport Segmented Bar */}
          <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-xl bg-[#131927] border border-white/10 text-xs shadow-inner">
            <button
              type="button"
              onClick={() => onSelectDeviceMode('mobile')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-cyan-500/20 text-[#00f0ff] font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
              title="Android / Mobile View (390-414px)"
            >
              <span className="material-symbols-outlined text-[15px]">smartphone</span>
              <span className="text-[11px] hidden md:inline">Android/iOS</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDeviceMode('tablet')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                deviceMode === 'tablet'
                  ? 'bg-cyan-500/20 text-[#00f0ff] font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
              title="iPad Pro / Tablet View (768-820px)"
            >
              <span className="material-symbols-outlined text-[15px]">tablet_mac</span>
              <span className="text-[11px] hidden md:inline">iPad</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDeviceMode('desktop')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-cyan-500/20 text-[#00f0ff] font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
              title="Executive Web Desktop Portal (1150px)"
            >
              <span className="material-symbols-outlined text-[15px]">laptop_mac</span>
              <span className="text-[11px] hidden md:inline">Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDeviceMode('fluid')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                deviceMode === 'fluid'
                  ? 'bg-cyan-500/20 text-[#00f0ff] font-bold border border-cyan-500/40 shadow-sm'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
              title="Fluid Full Screen Responsive"
            >
              <span className="material-symbols-outlined text-[15px]">fullscreen</span>
              <span className="text-[11px] hidden md:inline">Fluid</span>
            </button>
          </div>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/40 text-xs font-bold text-[#00f0ff] transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]">translate</span>
            <span>{language === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
          </button>
        </div>
      </div>

      {/* Screen Selector Dropdown Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0e18]/95 backdrop-blur-2xl border-b border-cyan-500/30 shadow-2xl py-4 px-3 sm:px-6 animate-in slide-in-from-top-2 duration-150 z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider font-mono">
                {language === 'ar' ? 'اختر الشاشة للانتقال الفوري (١١ شاشة متكاملة)' : 'Select Screen for Instant Preview (All 11 Master Screens)'}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-[#94a3b8] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span>{language === 'ar' ? 'إغلاق' : 'Close'}</span>
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {SCREENS_LIST.map((screen) => {
                const isActive = screen.id === currentScreen;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    onClick={() => {
                      onSelectScreen(screen.id);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-xl flex flex-col text-start transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#172238] border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.25)] ring-1 ring-[#00f0ff]/50'
                        : 'bg-[#121826] border-white/10 hover:bg-[#1a2336] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span
                        className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-[#00f0ff] text-[#00363a]' : 'bg-white/10 text-[#94a3b8]'
                        }`}
                      >
                        {screen.number}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping"></span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold truncate ${
                        isActive ? 'text-[#00f0ff]' : 'text-white'
                      }`}
                    >
                      {language === 'ar' ? screen.titleAr : screen.titleEn}
                    </span>
                    <span className="text-[10px] text-[#94a3b8] truncate mt-0.5">
                      {language === 'ar' ? screen.subtitleAr : screen.subtitleEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
