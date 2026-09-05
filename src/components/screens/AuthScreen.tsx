import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';
import { ScreenId, Language } from '../../types';

interface AuthScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  language,
  onNavigate,
}) => {
  const isRTL = language === 'ar';
  const [authMode, setAuthMode] = useState<'nafath' | 'corporate'>('nafath');
  const [idValue, setIdValue] = useState('1089423591');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [preserveSession, setPreserveSession] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onNavigate('03_onboarding');
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col w-full relative px-4 pt-3 pb-8 text-left">
      {/* Background Ambient Aura */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#00f0ff]/10 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute top-80 -left-20 w-64 h-64 bg-[#0566d9]/15 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Identity Header */}
      <div className="flex flex-col items-center text-center mt-2 mb-6 z-10">
        <div className="relative mb-3.5">
          <div className="w-16 h-16 rounded-xl bg-[#262a35]/70 shadow-lg shadow-black/60 flex items-center justify-center relative backdrop-blur-md overflow-hidden p-1.5 border border-[#3b494b]/30">
            <img
              src={ASSETS.EMBLEM_IMAGE}
              alt="AI Career Pro Shield"
              className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.45)]"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0e18] flex items-center justify-center shadow-md border border-[#00f0ff]/40">
            <span className="material-symbols-outlined text-[#00f0ff] text-[14px]">
              verified_user
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#262a35]/80 backdrop-blur-md mb-2 shadow-sm border border-[#3b494b]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse"></span>
          <span className="text-[10px] font-bold text-[#dbfcff] tracking-wide uppercase">
            {isRTL
              ? 'بوابة التحقق القيادية • تشفير SHA-256'
              : 'STANDALONE AUTH GATEWAY • SHA-256'}
          </span>
        </div>

        <h1 className="text-xl font-bold text-white tracking-tight">AI CAREER PRO</h1>
        <div className="inline-flex items-center gap-1 mt-0.5 mb-1 text-[#00dbe9] text-xs">
          <span className="material-symbols-outlined text-[14px]">cloud_done</span>
          <span>{isRTL ? 'توثيق سحابي سيادي معتمد' : 'Sovereign Cloud Verified'}</span>
        </div>

        <h2 className="text-base font-semibold text-white tracking-tight mt-1">
          {isRTL
            ? 'التحقق من الهوية الرقمية للقيادات'
            : 'Executive Identity Authentication'}
        </h2>
        <p className="text-xs text-[#b9cacb] max-w-[300px] mt-1">
          {isRTL
            ? 'دخول آمن عبر الهوية الرقمية الوطنية أو الدخول الموحد للشركات'
            : 'Secure access via national digital identity or biometric single sign-on'}
        </p>
      </div>

      {/* Auth Mode Toggle Bar */}
      <div className="w-full p-1 rounded-xl bg-[#0a0e18]/80 backdrop-blur-xl flex items-center mb-5 shadow-inner border border-[#3b494b]/30 z-10">
        <button
          onClick={() => setAuthMode('nafath')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
            authMode === 'nafath'
              ? 'bg-[#262a35] text-[#00f0ff] shadow-md border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-white'
          }`}
        >
          {isRTL ? 'الهوية الوطنية (نفاذ)' : 'National ID (Nafath SSO)'}
        </button>

        <button
          onClick={() => setAuthMode('corporate')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
            authMode === 'corporate'
              ? 'bg-[#262a35] text-[#00f0ff] shadow-md border border-[#00f0ff]/30'
              : 'text-[#b9cacb] hover:text-white'
          }`}
        >
          {isRTL ? 'هوية الشركات (SSO)' : 'Corporate Identity (SSO)'}
        </button>
      </div>

      {/* Main Glass Form */}
      <div className="relative w-full rounded-2xl bg-[#171b26]/75 backdrop-blur-2xl p-5 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.85)] border border-[#3b494b]/30 z-10">
        <div className="absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent"></div>

        <form onSubmit={handleAuthenticate} className="flex flex-col gap-4">
          {/* Field 1 */}
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-medium text-[#b9cacb]">
                {authMode === 'nafath'
                  ? isRTL
                    ? 'رقم الهوية الوطنية / الإقامة للقيادي'
                    : 'Executive National ID / Iqama Number'
                  : isRTL
                  ? 'البريد المؤسسي القيادي'
                  : 'Corporate Work Email (SSO)'}
              </label>
              <div className="flex items-center gap-1 text-[11px] text-[#00dbe9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-pulse"></span>
                <span>{isRTL ? 'الارتباط نشط' : 'Identity Link Active'}</span>
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-[#b9cacb]">
                <span className="material-symbols-outlined text-[20px]">
                  {authMode === 'nafath' ? 'badge' : 'alternate_email'}
                </span>
              </div>
              <input
                type={authMode === 'nafath' ? 'text' : 'email'}
                value={idValue}
                onChange={(e) => setIdValue(e.target.value)}
                placeholder={
                  authMode === 'nafath'
                    ? isRTL
                      ? 'أدخل رقم الهوية (١٠ أرقام)'
                      : 'Enter 10-digit ID'
                    : 'tareq@enterprise.sa'
                }
                required
                className="w-full h-[50px] pl-11 pr-10 rounded-xl bg-[#0a0e18]/90 text-white text-sm placeholder:text-[#849495] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/60 border border-[#3b494b]/30 transition-all"
              />
              <div className="absolute right-3.5 flex items-center text-[#00dbe9]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
            </div>
          </div>

          {/* Field 2: Enterprise Security Key */}
          <div className="flex flex-col gap-1.5 text-left">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-medium text-[#b9cacb]">
                {isRTL ? 'مفتاح الأمان المؤسسي' : 'Enterprise Security Key'}
              </label>
              <button
                type="button"
                className="text-[11px] text-[#adc6ff] hover:text-[#00f0ff] transition-colors cursor-pointer"
              >
                {isRTL ? 'نسيت المفتاح؟' : 'Forgot Key?'}
              </button>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-[#b9cacb]">
                <span className="material-symbols-outlined text-[20px]">vpn_key</span>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full h-[50px] pl-11 pr-11 rounded-xl bg-[#0a0e18]/90 text-white text-sm placeholder:text-[#849495] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/60 border border-[#3b494b]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 w-8 h-8 rounded-lg flex items-center justify-center text-[#b9cacb] hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Preserve session checkbox */}
          <div className="flex items-center justify-between px-1 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={preserveSession}
                onChange={(e) => setPreserveSession(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${
                  preserveSession
                    ? 'bg-[#00f0ff] border-[#00f0ff] text-[#00363a]'
                    : 'bg-[#0a0e18] border-[#3b494b]/40 text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] font-bold">check</span>
              </div>
              <span className="text-xs text-[#dfe2f1]">
                {isRTL
                  ? 'حفظ الجلسة في بيئة معزولة آمنة'
                  : 'Preserve session in sandboxed enclave'}
              </span>
            </label>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#262a35] text-[#849495] border border-[#3b494b]/30">
              24 hrs
            </span>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full h-[52px] mt-2 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#0566d9] text-[#00363a] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isAuthenticating ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-[#00363a] border-t-transparent animate-spin"></span>
                <span>
                  {isRTL ? 'جاري التحقق والربط...' : 'Authenticating Sovereign Keys...'}
                </span>
              </div>
            ) : (
              <>
                <span>
                  {authMode === 'nafath'
                    ? isRTL
                      ? 'التحقق والدخول إلى المنظومة'
                      : 'Authenticate & Enter Gateway'
                    : isRTL
                    ? 'المصادقة عبر الدخول الموحد'
                    : 'Authorize Enterprise SSO'}
                </span>
                <span className="material-symbols-outlined text-[20px]">
                  {isRTL ? 'arrow_back' : 'arrow_forward'}
                </span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#313540]"></div>
          <span className="text-[11px] text-[#b9cacb] whitespace-nowrap">
            {isRTL ? 'أو الدخول السيادي السريع' : 'Or Rapid Sovereign Authentication'}
          </span>
          <div className="flex-1 h-px bg-[#313540]"></div>
        </div>

        {/* 3 Quick Rails */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('03_onboarding')}
            className="h-12 rounded-xl bg-[#262a35]/60 hover:bg-[#262a35] text-white flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm border border-[#3b494b]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00f0ff]">
              corporate_fare
            </span>
            <span className="text-[10px] text-[#b9cacb]">Workspace</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('03_onboarding')}
            className="h-12 rounded-xl bg-[#262a35]/60 hover:bg-[#262a35] text-white flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm border border-[#3b494b]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#adc6ff]">
              share
            </span>
            <span className="text-[10px] text-[#b9cacb]">LinkedIn Pro</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('03_onboarding')}
            className="h-12 rounded-xl bg-[#262a35]/60 hover:bg-[#262a35] text-white flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm border border-[#3b494b]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#7df4ff]">
              terminal
            </span>
            <span className="text-[10px] text-[#b9cacb]">Enterprise</span>
          </button>
        </div>

        {/* Hardware Key FIDO2 */}
        <button
          type="button"
          onClick={() => onNavigate('03_onboarding')}
          className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#262a35]/40 hover:bg-[#262a35]/70 border border-[#3b494b]/30 text-white flex items-center justify-center gap-2 active:scale-95 transition-all text-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">key</span>
          <span className="text-xs text-[#b9cacb]">
            {isRTL
              ? 'المصادقة عبر مفتاح الأمان المادي المؤسسي FIDO2'
              : 'Authenticate with Enterprise Hardware Key / FIDO2'}
          </span>
        </button>
      </div>

      {/* Air-gapped biometric verification badge */}
      <div className="w-full mt-4 p-3.5 rounded-xl bg-[#0a0e18]/70 backdrop-blur-md shadow-sm border border-[#3b494b]/25 z-10">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1c1f2a] flex items-center justify-center shrink-0 mt-0.5 border border-[#3b494b]/30">
            <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">
              enhanced_encryption
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-left">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-[#00f0ff]">
                {isRTL ? 'التحقق الحيوي المعزول' : 'Air-gapped biometric verification'}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#849495]"></span>
              <span className="text-[10px] text-[#ffe088] font-medium font-mono">
                {isRTL ? 'إثبات انعدام المعرفة' : 'Zero-knowledge proof'}
              </span>
            </div>
            <p className="text-xs text-[#b9cacb] leading-relaxed">
              {isRTL
                ? 'مسارك المهني وبياناتك القيادية معزولة في بيئة سيادية مشفرة ومحمية تماماً من استخدامها في تدريب نماذج الذكاء الاصطناعي العامة.'
                : 'Your career trajectory and executive telemetry are isolated in an encrypted sovereign enclave, strictly exempt from public LLM training pipelines.'}
            </p>
          </div>
        </div>
      </div>

      {/* Legal & Accreditation */}
      <div className="w-full py-3 px-1 text-center z-10">
        <p className="text-[11px] leading-tight text-[#849495] flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-[#00dbe9]">verified</span>
          <span>
            {isRTL
              ? 'متوافق مع لوائح الأمن السيبراني (NCA) ومعايير حماية البيانات الشخصية (PDPL)'
              : 'Compliant with NCA Cyber Regulations & PDPL Sovereign Standards'}
          </span>
        </p>
      </div>
    </div>
  );
};
