import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';
import { ScreenId, Language } from '../../types';

interface SettingsScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onToggleLanguage: () => void;
  onShowToast: (msg: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  language,
  onNavigate,
  onToggleLanguage,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [airGappedEnclave, setAirGappedEnclave] = useState(true);
  const [exemptFromLlm, setExemptFromLlm] = useState(true);
  const [fido2Key, setFido2Key] = useState(true);
  const [ephemeralSessions, setEphemeralSessions] = useState(true);

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Profile Accreditation Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#131927] p-4 shadow-sm border border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-cyan-500/50">
            <img
              src={ASSETS.PROFILE_IMAGE}
              alt="Dr. Tariq Al-Mansoor"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0 text-start">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white truncate">
                {isRTL ? 'د. طارق المنصور' : 'Dr. Tariq Al-Mansoor'}
              </h2>
              <span className="material-symbols-outlined text-[#00f0ff] text-[17px]">
                verified
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] truncate">
              {isRTL ? 'رئيس قطاع الرقمنة' : 'Chief Digital Officer'}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-cyan-400 font-mono">
              <span className="material-symbols-outlined text-[12px]">security</span>
              <span>Nafath SSO #90D2...8F (Verified ✓)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Sovereign Privacy Controls */}
      <div className="rounded-xl bg-[#131927] p-4 shadow-sm border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
              shield_lock
            </span>
            <h3 className="text-xs font-bold text-white">
              {isRTL ? 'ضوابط الخصوصية والسيادة الرقمية' : 'Sovereign Privacy & Security Enclave'}
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold font-mono">NCA Strict</span>
        </div>

        <div className="space-y-2.5 pt-1">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#0b0f19] border border-white/5">
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white">
                {isRTL ? 'عزل البيئة السيادية المشفرة' : 'Strict Sovereign Enclave'}
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'حفظ البيانات محلياً داخل حدود المملكة'
                  : 'Air-gapped data retention within local borders'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setAirGappedEnclave(!airGappedEnclave);
                onShowToast(
                  !airGappedEnclave
                    ? 'Sovereign Enclave enabled'
                    : 'Warning: Sovereign boundary relaxed'
                );
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                airGappedEnclave ? 'bg-[#00f0ff]' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#00363a] absolute top-1 transition-transform ${
                  airGappedEnclave ? 'left-6' : 'left-1'
                }`}
              ></div>
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#0b0f19] border border-white/5">
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white">
                {isRTL ? 'استثناء البيانات من تدريب الذكاء' : 'Exempt from Public LLM Training'}
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'منع استخدام الملف التنفيذي في تدريب النماذج'
                  : 'Zero telemetry routed to external AI model pipelines'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setExemptFromLlm(!exemptFromLlm);
                onShowToast(
                  !exemptFromLlm ? 'LLM training exemption enforced' : 'Warning: Exemption toggled'
                );
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                exemptFromLlm ? 'bg-[#00f0ff]' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#00363a] absolute top-1 transition-transform ${
                  exemptFromLlm ? 'left-6' : 'left-1'
                }`}
              ></div>
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#0b0f19] border border-white/5">
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white">
                {isRTL ? 'مفتاح المصادقة المادي FIDO2' : 'Hardware Key Auth (FIDO2)'}
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'يتطلب لمس المفتاح المادي لكل عملية تصدير'
                  : 'Requires physical key presence for audit exports'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFido2Key(!fido2Key)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                fido2Key ? 'bg-[#00f0ff]' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#00363a] absolute top-1 transition-transform ${
                  fido2Key ? 'left-6' : 'left-1'
                }`}
              ></div>
            </button>
          </div>

          {/* Toggle 4 */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#0b0f19] border border-white/5">
            <div className="flex flex-col text-start">
              <span className="text-xs font-bold text-white">
                {isRTL ? 'تطهير الجلسات المؤقتة آلياً' : 'Ephemeral Session Auto-Purge'}
              </span>
              <span className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'مسح الذاكرة المؤقتة كل ٢٤ ساعة تلقائياً'
                  : 'Automatic RAM scrub after 24 hours of inactivity'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEphemeralSessions(!ephemeralSessions)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                ephemeralSessions ? 'bg-[#00f0ff]' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#00363a] absolute top-1 transition-transform ${
                  ephemeralSessions ? 'left-6' : 'left-1'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Language & Regional Setting */}
      <div className="rounded-xl bg-[#131927] p-4 shadow-sm border border-white/10 space-y-2.5">
        <h3 className="text-xs font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">translate</span>
          <span>{isRTL ? 'اللغة والتهيئة الإقليمية' : 'Language & Regional Format'}</span>
        </h3>

        <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0b0f19] border border-white/5">
          <span className="text-xs text-white">
            {isRTL ? 'لغة الواجهة (عربي / English)' : 'Interface Language'}
          </span>
          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-[#00f0ff] text-[#00363a] font-bold text-xs cursor-pointer shadow-sm"
          >
            {language === 'en' ? 'Switch to العربية' : 'Switch to English'}
          </button>
        </div>
      </div>

      {/* Data Sovereignty / Vault Actions */}
      <div className="rounded-xl bg-[#131927] p-4 shadow-sm border border-white/10 space-y-2.5">
        <h3 className="text-xs font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fdd55a] text-[18px]">
            folder_zip
          </span>
          <span>{isRTL ? 'إدارة الخزينة والبيانات' : 'Sovereign Vault Export & Purge'}</span>
        </h3>

        <button
          type="button"
          onClick={() => {
            onShowToast(
              isRTL
                ? 'جاري تنزيل الخزينة الكاملة المشفرة بصيغة ZIP مع إثباتات SHA-256'
                : 'Downloading encrypted sovereign archive with SHA-256 validation seals'
            );
          }}
          className="w-full py-2.5 px-3 rounded-lg bg-[#1c2436] hover:bg-[#263147] text-white text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">download</span>
          <span>
            {isRTL ? 'تحميل الخزينة السيادية بالكامل (ZIP)' : 'Download Sovereign Vault (ZIP)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            onShowToast(
              isRTL
                ? 'تم فحص الذاكرة المؤقتة: خالية من أي تسريب'
                : 'Cryptographic RAM wipe verified: Zero data residue'
            );
          }}
          className="w-full py-2.5 px-3 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-300 text-xs font-semibold flex items-center justify-center gap-2 border border-red-500/30 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">delete_forever</span>
          <span>
            {isRTL
              ? 'تطهير الذاكرة المشفرة فورياً (Zero-Knowledge Wipe)'
              : 'Instant Zero-Knowledge Enclave Wipe'}
          </span>
        </button>
      </div>

      {/* Bottom Legal Badges */}
      <div className="text-center text-[10px] text-[#849495] space-y-1 font-mono">
        <div>SHA-256 AUDIT: 8F4C2B90A17E04F2 • AIR-GAPPED</div>
        <div>Compliant with NCA Cyber Regulations & PDPL Standards</div>
      </div>
    </div>
  );
};
