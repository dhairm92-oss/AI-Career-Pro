import React, { useState } from 'react';
import { FLUTTER_CODE_SNIPPETS } from '../../data/mockData';
import { ScreenId, Language } from '../../types';

interface CompletionHubScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const CompletionHubScreen: React.FC<CompletionHubScreenProps> = ({
  language,
  onNavigate,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [activeTab, setActiveTab] = useState<
    'pubspec' | 'theme' | 'glass' | 'domain' | 'bloc' | 'screen'
  >('bloc');

  const copySnippet = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    onShowToast(
      isRTL ? `تم نسخ كود ${label} إلى الحافظة` : `Copied ${label} to clipboard`
    );
  };

  const tabs = [
    { id: 'bloc', label: 'BLoC State Management', file: 'executive_bloc.dart' },
    { id: 'theme', label: 'Obsidian Theme', file: 'app_theme.dart' },
    { id: 'glass', label: 'Glassmorphism Widget', file: 'glass_container.dart' },
    { id: 'domain', label: 'Domain Entity', file: 'executive_profile.dart' },
    { id: 'screen', label: 'Dashboard Screen', file: 'dashboard_screen.dart' },
    { id: 'pubspec', label: 'pubspec.yaml', file: 'pubspec.yaml' },
  ];

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Sovereign Completion Seal */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161f30] via-[#131927] to-[#0b0f19] p-4 shadow-xl border border-cyan-500/30 text-start">
        <div className="absolute top-0 right-0 bg-[#00f0ff] text-[#00363a] text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl font-mono">
          ALL 11 SCREENS VERIFIED
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#00f0ff]/30 to-[#0566d9]/30 flex items-center justify-center text-[#00f0ff] shrink-0 border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <span className="material-symbols-outlined text-[24px]">terminal</span>
          </div>
          <div>
            <span className="text-[10px] text-[#fdd55a] font-bold font-mono tracking-wider uppercase">
              EXECUTIVE FLUTTER PRODUCTION ENGINE
            </span>
            <h2 className="text-sm font-extrabold text-white">
              {isRTL
                ? 'حزمة فلاتر المتكاملة بالمعمارية النظيفة'
                : 'Flutter Clean Architecture Production Hub'}
            </h2>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              {isRTL
                ? 'كود فلاتر كامل واحترافي 100% مع BLoC وحاويات Glassmorphism ونظام الألوان السيادي'
                : '100% production-ready Flutter code with BLoC, Glassmorphism & Sovereign Design System'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>Clean Architecture</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#00f0ff]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>BLoC State Machine</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-300">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>Glassmorphism Engine</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#fdd55a]">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>Bilingual RTL/LTR</span>
          </div>
        </div>
      </div>

      {/* Code Inspector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              activeTab === tab.id
                ? 'bg-[#00f0ff] text-[#00363a] font-bold border-[#00f0ff] shadow-sm'
                : 'bg-[#131927] text-[#94a3b8] border-white/10 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code Viewer Box */}
      <div className="relative rounded-2xl bg-[#0b0f19] border border-white/10 shadow-lg overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-[#131927] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-xs font-mono font-bold text-white ml-1">
              {tabs.find((t) => t.id === activeTab)?.file}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              copySnippet(
                FLUTTER_CODE_SNIPPETS[activeTab],
                tabs.find((t) => t.id === activeTab)?.file || ''
              )
            }
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c2436] hover:bg-[#263147] text-[#00f0ff] text-[11px] font-bold transition-all cursor-pointer border border-[#00f0ff]/20"
          >
            <span className="material-symbols-outlined text-[13px]">content_copy</span>
            <span>Copy Code</span>
          </button>
        </div>

        {/* Code Content */}
        <pre className="p-3 text-xs font-mono text-[#dbfcff] overflow-x-auto max-h-[340px] leading-relaxed whitespace-pre selection:bg-[#00f0ff]/30">
          {FLUTTER_CODE_SNIPPETS[activeTab]}
        </pre>
      </div>

      {/* Flutter Deployment Actions */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => {
            onShowToast(
              isRTL
                ? 'جاري تصدير الحزمة الهندسية الكاملة لتطبيق Flutter...'
                : 'Exporting complete Clean Architecture Flutter mobile project package...'
            );
          }}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#0566d9] to-[#00f0ff] text-[#00363a] font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
          <span>
            {isRTL
              ? 'تنزيل حزمة كود فلاتر النظيفة الكاملة (ZIP)'
              : 'Download Clean Architecture Flutter Codebase'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('04_dashboard')}
          className="w-full h-11 rounded-xl bg-[#131927] hover:bg-[#1c2436] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
            arrow_back
          </span>
          <span>{isRTL ? 'العودة إلى لوحة القيادة التنفيذية' : 'Return to Executive Dashboard'}</span>
        </button>
      </div>
    </div>
  );
};
