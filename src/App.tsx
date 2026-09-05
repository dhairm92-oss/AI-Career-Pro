import React, { useState, useEffect } from 'react';
import { ScreenId, Language, DeviceMode } from './types';
import { ASSETS } from './data/mockData';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DeviceFrame } from './components/common/DeviceFrame';
import { ScreenFlowController } from './components/common/ScreenFlowController';
import { ExecutiveProvider, useExecutive } from './context/ExecutiveContext';
import { ExecutiveDataInjectorModal } from './components/modals/ExecutiveDataInjectorModal';

import { SplashScreen } from './components/screens/SplashScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { DocsIntelScreen } from './components/screens/DocsIntelScreen';
import { CvBuilderScreen } from './components/screens/CvBuilderScreen';
import { JobAnalyzerScreen } from './components/screens/JobAnalyzerScreen';
import { SubscriptionScreen } from './components/screens/SubscriptionScreen';
import { InterviewCoachScreen } from './components/screens/InterviewCoachScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { CompletionHubScreen } from './components/screens/CompletionHubScreen';
import { QuantumFirewallHUD } from './components/modals/QuantumFirewallHUD';
import { ExecutiveAiCopilotModal } from './components/modals/ExecutiveAiCopilotModal';
import { BoardNrcStressTestModal } from './components/modals/BoardNrcStressTestModal';
import { LtiVestingTrackerModal } from './components/modals/LtiVestingTrackerModal';
import { SovereignSecureLinkModal } from './components/modals/SovereignSecureLinkModal';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('01_splash');
  const [language, setLanguage] = useState<Language>('ar');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFirewallOpen, setIsFirewallOpen] = useState(false);

  const {
    isDataInjectorOpen,
    setIsDataInjectorOpen,
    isCopilotOpen,
    setIsCopilotOpen,
    isNrcStressTestOpen,
    setIsNrcStressTestOpen,
    isLtiTrackerOpen,
    setIsLtiTrackerOpen,
    isSecureLinkOpen,
    setIsSecureLinkOpen,
  } = useExecutive();

  // Update document direction and lang when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
    showToast(
      language === 'en'
        ? 'تم تحويل الواجهة إلى اللغة العربية (RTL)'
        : 'Interface switched to English (LTR)'
    );
  };

  const handleSelectDeviceMode = (mode: DeviceMode) => {
    setDeviceMode(mode);
    const notifications: Record<DeviceMode, { ar: string; en: string }> = {
      mobile: {
        ar: 'تم ضبط العرض لهواتف أندرويد وآيفون الذكية (390-414px)',
        en: 'Configured for Android & iPhone Mobile Devices',
      },
      tablet: {
        ar: 'تم ضبط العرض لأجهزة الآيباد والتابلت اللوحي (iPad Pro 768-820px)',
        en: 'Configured for iPad Pro & Android Tablets',
      },
      desktop: {
        ar: 'تم ضبط العرض لبوابة سطح المكتب التنفيذية (Web Desktop Portal)',
        en: 'Configured for Executive Web Desktop Portal',
      },
      fluid: {
        ar: 'تم تفعيل وضع التجاوب التلقائي المباشر (Fluid Responsive Fullscreen)',
        en: 'Activated Native Fluid Responsive Fullscreen',
      },
    };
    showToast(notifications[mode][language]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case '01_splash':
        return (
          <SplashScreen
            language={language}
            onNavigate={setCurrentScreen}
            onToggleLanguage={handleToggleLanguage}
          />
        );
      case '02_auth':
        return <AuthScreen language={language} onNavigate={setCurrentScreen} />;
      case '03_onboarding':
        return <OnboardingScreen language={language} onNavigate={setCurrentScreen} />;
      case '04_dashboard':
        return (
          <DashboardScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onOpenFirewall={() => setIsFirewallOpen(true)}
            onOpenAiCopilot={() => setIsCopilotOpen(true)}
          />
        );
      case '05_docs_intel':
        return (
          <DocsIntelScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case '06_cv_builder':
        return (
          <CvBuilderScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case '07_job_analyzer':
        return (
          <JobAnalyzerScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case '08_subscription':
        return (
          <SubscriptionScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case '09_interview_coach':
        return (
          <InterviewCoachScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      case '10_settings':
        return (
          <SettingsScreen
            language={language}
            onNavigate={setCurrentScreen}
            onToggleLanguage={handleToggleLanguage}
            onShowToast={showToast}
          />
        );
      case '11_completion_hub':
        return (
          <CompletionHubScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        );
      default:
        return (
          <DashboardScreen
            language={language}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onOpenFirewall={() => setIsFirewallOpen(true)}
            onOpenAiCopilot={() => setIsCopilotOpen(true)}
          />
        );
    }
  };

  const showHeader = !['01_splash'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col items-center justify-start overflow-x-hidden font-sans select-none">
      {/* Global Quick Screen & Language HUD */}
      <ScreenFlowController
        currentScreen={currentScreen}
        language={language}
        deviceMode={deviceMode}
        onSelectScreen={setCurrentScreen}
        onToggleLanguage={handleToggleLanguage}
        onSelectDeviceMode={handleSelectDeviceMode}
      />

      {/* Main Container in Phone Chassis or Full View */}
      <DeviceFrame deviceMode={deviceMode} backgroundUrl={ASSETS.BACKGROUND_IMAGE}>
        {showHeader && (
          <Header
            currentScreen={currentScreen}
            language={language}
            onNavigate={setCurrentScreen}
            onOpenFirewall={() => setIsFirewallOpen(true)}
            onOpenAiCopilot={() => setIsCopilotOpen(true)}
            onBack={
              currentScreen === '04_dashboard'
                ? undefined
                : () => setCurrentScreen('04_dashboard')
            }
          />
        )}

        <main className="flex-1 flex flex-col w-full relative">
          {renderScreen()}
        </main>

        <BottomNav
          currentScreen={currentScreen}
          language={language}
          onNavigate={setCurrentScreen}
        />
      </DeviceFrame>

      {/* Sovereign Quantum Firewall HUD Modal */}
      <QuantumFirewallHUD
        isOpen={isFirewallOpen}
        onClose={() => setIsFirewallOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      {/* Manarah AI Executive Copilot Modal */}
      <ExecutiveAiCopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      {/* Executive Data Injector Modal */}
      <ExecutiveDataInjectorModal
        isOpen={isDataInjectorOpen}
        onClose={() => setIsDataInjectorOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      {/* Board NRC Stress-Test Simulator Modal */}
      <BoardNrcStressTestModal
        isOpen={isNrcStressTestOpen}
        onClose={() => setIsNrcStressTestOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      {/* LTI & Equity Vesting Schedule Tracker Modal */}
      <LtiVestingTrackerModal
        isOpen={isLtiTrackerOpen}
        onClose={() => setIsLtiTrackerOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      {/* Sovereign 48h Self-Destructing Secure Link Modal */}
      <SovereignSecureLinkModal
        isOpen={isSecureLinkOpen}
        onClose={() => setIsSecureLinkOpen(false)}
        language={language}
        onShowToast={showToast}
      />

      {/* Toast Notification Capsule */}
      {toastMessage && (
        <div className="fixed bottom-20 z-50 px-4 py-2.5 rounded-full bg-[#171b26]/95 border border-[#00f0ff]/50 text-white text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(0,240,255,0.3)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2 max-w-sm text-center">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping shrink-0"></span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <ExecutiveProvider>
      <AppContent />
    </ExecutiveProvider>
  );
}

export default App;

