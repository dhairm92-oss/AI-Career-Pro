import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { useExecutive } from '../../context/ExecutiveContext';

interface SovereignSecureLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

interface AccessLog {
  id: string;
  ip: string;
  locationAr: string;
  locationEn: string;
  device: string;
  timestamp: string;
  status: 'authorized' | 'active';
}

export const SovereignSecureLinkModal: React.FC<SovereignSecureLinkModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();

  const [secondsRemaining, setSecondsRemaining] = useState(172780); // ~47h 59m 40s
  const [isRevoked, setIsRevoked] = useState(false);
  const [recipientName, setRecipientName] = useState('معالي رئيس لجنة الترشيحات والمكافآت (NRC Chair)');
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatedToken = 'sv-sec-948f-pif-2030-kyber768';
  const secureUrl = `https://sovereign.sa/dossier/view?token=${generatedToken}&exp=48h`;

  const logs: AccessLog[] = [
    {
      id: 'log-1',
      ip: '10.144.82.19 (Sovereign GovNet)',
      locationAr: 'الرياض - حي السفارات (Diplomatic Quarter)',
      locationEn: 'Riyadh - Diplomatic Quarter',
      device: 'Apple iPad Pro (iPadOS 18.2 / Safari Secure)',
      timestamp: 'قبل 12 دقيقة',
      status: 'active',
    },
    {
      id: 'log-2',
      ip: '10.144.12.04 (PIF Towers)',
      locationAr: 'الرياض - مركز الملك عبد الله المالي (KAFD)',
      locationEn: 'Riyadh - King Abdullah Financial District (KAFD)',
      device: 'macOS Sonoma Enterprise Enclave',
      timestamp: 'قبل 34 دقيقة',
      status: 'authorized',
    },
  ];

  useEffect(() => {
    if (!isOpen || isRevoked) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isRevoked]);

  if (!isOpen) return null;

  const formatCountdown = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(secureUrl);
    setCopied(true);
    onShowToast(
      isRTL
        ? 'تم نسخ الرابط المشفر المؤقت للحافظة بنجاح'
        : 'Self-destructing dossier link copied to clipboard'
    );
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRevoke = () => {
    setIsRevoked(true);
    onShowToast(
      isRTL
        ? 'تم إبطال الرابط فوراً وحرق مفاتيح التشفير (Cryptographic Purge)'
        : 'Access link revoked immediately. Cryptographic keys purged'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-2xl bg-[#0c101a] border border-cyan-500/40 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-[#111726] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">lock_clock</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {isRTL ? 'الرابط السيادي المؤقت (48h Self-Destructing Link)' : 'Self-Destructing 48h Secure Link'}
                </h3>
                <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold ${
                  isRevoked ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {isRevoked ? 'REVOKED' : 'ENCRYPTED & ACTIVE'}
                </span>
              </div>
              <p className="text-[10px] text-[#94a3b8]">
                {isRTL
                  ? 'مشاركة مشفرة مؤقتة للملف التنفيذي مع مجالس الإدارة وصناديق الاستثمار'
                  : 'Time-Gated Watermarked C-Suite Access with Anti-Leak Telemetry'}
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Countdown & Expiry Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#121929] via-[#0d1424] to-[#121929] border border-cyan-500/40 flex items-center justify-between gap-4">
            <div className="text-start">
              <span className="text-[10px] text-gray-400 font-mono block uppercase">
                {isRTL ? 'الوقت المتبقي حتى التدمير الذاتي للرابط' : 'Time Left Until Cryptographic Self-Destruct'}
              </span>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#00f0ff] tracking-wider pt-0.5">
                {isRevoked ? '00:00:00 (REVOKED)' : formatCountdown(secondsRemaining)}
              </div>
              <span className="text-[10px] text-cyan-300 font-mono">
                {isRTL ? 'تنتهي صلاحية المفتاح تلقائياً بعد 48 ساعة' : 'Session token expires irreversibly'}
              </span>
            </div>

            <div className="shrink-0 flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={handleRevoke}
                disabled={isRevoked}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-xs font-bold cursor-pointer transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">cancel</span>
                <span>{isRTL ? 'حرق وإبطال فوري' : 'Instant Revoke'}</span>
              </button>
            </div>
          </div>

          {/* Secure Link Bar */}
          <div className="p-3 rounded-xl bg-[#090d16] border border-white/10 space-y-2">
            <label className="text-[11px] font-bold text-gray-300 block text-start">
              {isRTL ? 'الرابط المخصص للمعاينة المشفرة:' : 'Dedicated Encrypted Viewer URL:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={isRevoked ? 'REVOKED_ACCESS_KEY_PURGED' : secureUrl}
                className="flex-1 px-3 py-2 rounded-lg bg-[#141b2b] border border-white/10 text-xs text-cyan-300 font-mono truncate focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                disabled={isRevoked}
                className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#00363a] font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm active:scale-95 transition-all disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ الرابط' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* Recipient & Dynamic Watermark Control */}
          <div className="p-3.5 rounded-xl bg-[#131929] border border-white/10 space-y-3 text-start">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">branding_watermark</span>
                {isRTL ? 'العلامة المائية المانعة للتسريب (Anti-Leak Watermark)' : 'Anti-Leak Dynamic Watermark'}
              </span>
              <button
                type="button"
                onClick={() => setWatermarkEnabled(!watermarkEnabled)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${
                  watermarkEnabled ? 'bg-cyan-500 text-[#00363a]' : 'bg-white/10 text-gray-400'
                }`}
              >
                {watermarkEnabled ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-400 block">
                {isRTL ? 'اسم الجهة أو المسؤول المستلم (يُطبع كعلامة مائية خفية):' : 'Authorized Recipient / Organization:'}
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#0a0f1a] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {watermarkEnabled && (
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-gray-400 flex items-center justify-between">
                <span>
                  {isRTL
                    ? `ختم مائي: سري ومحمي - مخصص لـ [${recipientName}]`
                    : `Watermark Stamp: STRICTLY CONFIDENTIAL - FOR [${recipientName}] ONLY`}
                </span>
                <span className="text-emerald-400">SHA-256 Stamp OK</span>
              </div>
            )}
          </div>

          {/* Real-time Access Logs */}
          <div className="space-y-2 text-start">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {isRTL ? 'سجل الوصول والتصفح الحي للملف' : 'Live Dossier Access & Telemetry Logs'}
              </span>
              <span className="text-[10px] text-gray-400 font-mono">2 Active Sessions</span>
            </div>

            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-[#111726] border border-white/10 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-cyan-500/15 text-cyan-300 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[15px]">location_on</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {isRTL ? log.locationAr : log.locationEn}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        {log.device} • {log.ip}
                      </div>
                    </div>
                  </div>

                  <div className="text-end shrink-0">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[9px] font-bold block">
                      {isRTL ? 'جلسة نشطة' : 'ACTIVE NOW'}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#111726] border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-mono">
            Encrypted with Sovereign Kyber-768 Zero-Knowledge Proof
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer transition-all"
          >
            {isRTL ? 'إغلاق النافذة' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
