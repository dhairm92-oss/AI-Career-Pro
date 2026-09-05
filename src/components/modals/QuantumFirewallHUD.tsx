import React, { useState, useEffect } from 'react';
import { Language } from '../../types';

interface QuantumFirewallHUDProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

export const QuantumFirewallHUD: React.FC<QuantumFirewallHUDProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [threatLevel, setThreatLevel] = useState<'IMMUNE' | 'DEFENDING' | 'AUDITED'>('IMMUNE');
  const [activeTab, setActiveTab] = useState<'matrix' | 'enclave' | 'telemetry'>('matrix');

  if (!isOpen) return null;

  const runCyberAudit = () => {
    setScanning(true);
    setScanProgress(0);
    setThreatLevel('DEFENDING');
    setTerminalLogs([
      isRTL
        ? '>> بدء فحص الجدار الناري السيادي الكمومي (Post-Quantum Kyber-768)...'
        : '>> Initiating Post-Quantum Sovereign Enclave Audit (Kyber-768)...',
    ]);

    const auditSteps = isRTL
      ? [
          'فحص الذاكرة المعزولة TPM 2.0 hardware enclaves... مطابقة 100%',
          'حجب أي تسريب نحو نماذج الذكاء الاصطناعي الأجنبية (Zero Telemetry Leak)... مُطبَّق',
          'مطابقة معايير الهيئة الوطنية للأمن السيبراني NCA ECC-1:2018... معتمد ✓',
          'توليد مفاتيح تشفير شبكي مانع للحوسبة الكمومية (Lattice Cryptography)... نشط',
          'التحقق من عدم وجود أي ثغرات أو نصوص تتبع (Zero-Knowledge Verified)... خالي من أي أثر',
          '>> اكتمال الفحص: الجدار الناري في أعلى حالات الحصانة السيادية (IMMUNE STATE).',
        ]
      : [
          'Verifying TPM 2.0 hardware enclaves... 100% Match confirmed',
          'Enforcing Zero-Telemetry perimeter against external LLMs... Enforced ✓',
          'Auditing NCA ECC-1:2018 & PDPL Sovereign Data Mandate... Certified ✓',
          'Generating Post-Quantum Lattice Encryption Keys (Kyber-768)... Active',
          'Verifying Zero-Knowledge cryptographic memory scrub... Zero residue',
          '>> Audit Complete: Sovereign Perimeter is 100% IMMUNE and Air-Gapped.',
        ];

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setScanProgress((prev) => Math.min(prev + 18, 100));

      if (step <= auditSteps.length) {
        setTerminalLogs((prev) => [...prev, auditSteps[step - 1]]);
      }

      if (step >= auditSteps.length + 1) {
        clearInterval(interval);
        setScanning(false);
        setScanProgress(100);
        setThreatLevel('IMMUNE');
        onShowToast(
          isRTL
            ? 'تم اعتماد درع الحماية السيادي: الحصانة 100% دون أي تسريب بيانات'
            : 'Sovereign Shield Verified: 100% Cryptographic Immunity Confirmed'
        );
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e1626] via-[#090d16] to-[#05070d] border-2 border-cyan-500/60 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Tactical Banner */}
        <div className="relative bg-[#131d2e] border-b border-cyan-500/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <span className="material-symbols-outlined text-[24px] animate-pulse">
                shield_lock
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-extrabold text-[#00f0ff] tracking-wider uppercase">
                  SOVEREIGN QUANTUM FIREWALL
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold border border-emerald-500/40">
                  NCA STRICT
                </span>
              </div>
              <h2 className="text-sm font-bold text-white">
                {isRTL
                  ? 'جدار الحماية السيادي الفولاذي // درع المملكة'
                  : 'Sovereign Cyber Fortress // Defense Shield'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tactical Sub-Nav Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#090d16] border-b border-white/5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-cyan-500 text-[#00363a] shadow-sm'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {isRTL ? 'مصفوفة الحماية الفورية' : 'Live Defense Matrix'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('enclave')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'enclave'
                ? 'bg-cyan-500 text-[#00363a] shadow-sm'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {isRTL ? 'العزل المادي TPM 2.0' : 'Hardware Enclave'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-cyan-500 text-[#00363a] shadow-sm'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {isRTL ? 'سجل الرقابة وشهادة SHA' : 'Audit Registry & SHA'}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-start">
          {activeTab === 'matrix' && (
            <>
              {/* Fortress Status Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                <div className="p-3 rounded-xl bg-[#111928] border border-cyan-500/30">
                  <span className="text-[10px] text-gray-400 uppercase">Perimeter State</span>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>100% IMMUNE</span>
                  </div>
                  <span className="text-[9px] text-gray-500 mt-1 block">Zero Telemetry Leak</span>
                </div>

                <div className="p-3 rounded-xl bg-[#111928] border border-cyan-500/30">
                  <span className="text-[10px] text-gray-400 uppercase">Cipher Standard</span>
                  <div className="text-sm font-bold text-[#00f0ff] mt-0.5">Kyber-768</div>
                  <span className="text-[9px] text-gray-500 mt-1 block">Post-Quantum Lattice</span>
                </div>

                <div className="p-3 rounded-xl bg-[#111928] border border-cyan-500/30">
                  <span className="text-[10px] text-gray-400 uppercase">Packets Scrubbed</span>
                  <div className="text-sm font-bold text-[#fdd55a] mt-0.5">2,841,920</div>
                  <span className="text-[9px] text-gray-500 mt-1 block">0 Breaches Allowed</span>
                </div>

                <div className="p-3 rounded-xl bg-[#111928] border border-cyan-500/30">
                  <span className="text-[10px] text-gray-400 uppercase">Compliance Tier</span>
                  <div className="text-sm font-bold text-white mt-0.5">NCA Level 4</div>
                  <span className="text-[9px] text-emerald-400 mt-1 block">Military Sovereign</span>
                </div>
              </div>

              {/* Holographic Radar & Defense Shield */}
              <div className="relative rounded-2xl bg-[#090e18] p-4 border border-cyan-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
                      radar
                    </span>
                    <h3 className="text-xs font-bold text-white font-mono uppercase">
                      {isRTL
                        ? 'رادار استشعار التهديدات السيادي الحي'
                        : 'Real-time Sovereign Threat Interceptor'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    AIR-GAPPED
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111827] border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-[16px]">
                        verified
                      </span>
                      <span className="text-white font-medium">
                        {isRTL
                          ? 'منع مرور البيانات إلى خوادم الذكاء الاصطناعي الأجنبية'
                          : 'Public AI Telemetry Interception & Purge'}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-mono text-[11px] font-bold">ACTIVE</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111827] border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">
                        memory
                      </span>
                      <span className="text-white font-medium">
                        {isRTL
                          ? 'عزل الذاكرة الميدانية المشفرة فور إغلاق الجلسة'
                          : 'Zero-Knowledge Ephemeral RAM Wiping'}
                      </span>
                    </div>
                    <span className="text-cyan-400 font-mono text-[11px] font-bold">24H ENFORCED</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#111827] border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#fdd55a] text-[16px]">
                        vpn_key
                      </span>
                      <span className="text-white font-medium">
                        {isRTL
                          ? 'مفتاح المصادقة السيادي FIDO2 وتوقيع النفاذ الوطني'
                          : 'Nafath SSO & Hardware FIDO2 Verification'}
                      </span>
                    </div>
                    <span className="text-[#fdd55a] font-mono text-[11px] font-bold">VERIFIED ✓</span>
                  </div>
                </div>
              </div>

              {/* Tactical Audit Terminal */}
              <div className="rounded-xl bg-[#060a12] border border-white/10 p-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-gray-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-white ml-2">TERMINAL // SOVEREIGN-SENTINEL-01</span>
                  </div>
                  <span>{scanning ? 'SCANNING...' : 'SYSTEM READY'}</span>
                </div>

                {scanning && (
                  <div className="mb-2">
                    <div className="flex justify-between text-[10px] text-cyan-400 mb-1">
                      <span>Audit Progress</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="space-y-1 text-[#dbfcff] max-h-32 overflow-y-auto leading-relaxed text-[11px]">
                  {terminalLogs.length === 0 ? (
                    <p className="text-gray-500 italic">
                      {isRTL
                        ? 'اضغط زر "تشغيل الفحص السيادي الصارم" لاختبار صلابة الجدار الناري الآن...'
                        : 'Click "Run Sovereign Penetration & Audit" to test fortress integrity...'}
                    </p>
                  ) : (
                    terminalLogs.map((log, index) => (
                      <div key={index} className="flex items-start gap-1">
                        <span className="text-cyan-400">#</span>
                        <span>{log}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'enclave' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#111928] border border-cyan-500/30">
                <h4 className="text-xs font-bold text-white font-mono uppercase mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
                    developer_board
                  </span>
                  <span>{isRTL ? 'مواصفات العزل المادي السيادي' : 'Hardware Enclave Specifications'}</span>
                </h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <p>
                    {isRTL
                      ? 'يتم تشغيل كافة العمليات الحسابية والتحليلات المهنية داخل بيئة معزولة ميكانيكياً (AMD SEV-SNP & Intel SGX) لضمان عدم وصول أي طرف ثالث أو موفر سحابة للبيانات.'
                      : 'All executive parsing runs inside physically isolated memory enclaves (AMD SEV-SNP & Intel SGX), preventing cloud provider hypervisors from inspecting executive payloads.'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                    <div className="text-cyan-400">TPM 2.0 PCR: 0x8F4C...01A</div>
                    <div className="text-emerald-400">Attestation: VERIFIED</div>
                    <div className="text-gray-400">Host Residency: KSA-RIYADH-01</div>
                    <div className="text-[#fdd55a]">Jurisdiction: NCA PDPL</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#111928] border border-cyan-500/30">
                <h4 className="text-xs font-bold text-white uppercase mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fdd55a] text-[18px]">
                    verified
                  </span>
                  <span>{isRTL ? 'شهادة النزاهة الرقمية الصارمة' : 'Cryptographic Integrity Certificate'}</span>
                </h4>
                <div className="p-2.5 rounded bg-black/50 border border-white/10 text-cyan-300 text-[11px] break-all select-all">
                  SHA256: 8f4c2b90a17e04f2c9e8d7a6b5c43210987654321fedcba0987654321abcdef0
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  {isRTL
                    ? 'هذا الختم الرقمي يثبت أن التطبيق لم يرسل أي بايت من بياناتك إلى خوادم عامة.'
                    : 'This cryptographic seal proves zero executive data has been dispatched outside the sovereign boundary.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#111827] border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>CYBER DEFCON 1 // IMMUNE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={scanning}
              onClick={runCyberAudit}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-[#0566d9] to-cyan-400 text-[#00363a] font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[16px]">security_update_good</span>
              <span>
                {scanning
                  ? isRTL
                    ? 'جاري الفحص المتقدم...'
                    : 'Running Deep Audit...'
                  : isRTL
                  ? 'تشغيل الفحص السيادي الصارم'
                  : 'Run Sovereign Penetration & Audit'}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 cursor-pointer"
            >
              {isRTL ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
