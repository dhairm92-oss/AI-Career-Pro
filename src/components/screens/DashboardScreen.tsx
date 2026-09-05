import React, { useState } from 'react';
import { ScreenId, Language } from '../../types';
import { useExecutive } from '../../context/ExecutiveContext';
import { MegaprojectDetailModal } from '../modals/MegaprojectDetailModal';
import { MegaprojectRequisition } from '../../data/executiveProfiles';
import { ExecutiveDossierPdfModal } from '../modals/ExecutiveDossierPdfModal';
import { HeadhunterRadarModal } from '../modals/HeadhunterRadarModal';
import { ExecutiveOfferNegotiatorModal } from '../modals/ExecutiveOfferNegotiatorModal';
import { BoardPlaybookPitchDeckModal } from '../modals/BoardPlaybookPitchDeckModal';

interface DashboardScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  onOpenFirewall?: () => void;
  onOpenAiCopilot?: () => void;
}

interface SectorData {
  id: string;
  nameAr: string;
  nameEn: string;
  matchScore: number;
  salaryBenchmarkAr: string;
  salaryBenchmarkEn: string;
  openingsCount: number;
  primaryMandateAr: string;
  primaryMandateEn: string;
  badge: string;
  reqId: string;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  language,
  onNavigate,
  onShowToast,
  onOpenFirewall,
  onOpenAiCopilot,
}) => {
  const isRTL = language === 'ar';
  const {
    currentProfile,
    setIsDataInjectorOpen,
    allRequisitions,
    setSelectedRequisition,
  } = useExecutive();

  const [selectedReqForModal, setSelectedReqForModal] = useState<MegaprojectRequisition | null>(
    null
  );

  // 5 Executive Superpower Modals State
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isNegotiatorOpen, setIsNegotiatorOpen] = useState(false);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Compensation simulator state
  const [simulatedBaseMonthly, setSimulatedBaseMonthly] = useState<number>(
    currentProfile.baseSalaryMonthlySAR || 175000
  );

  const sectors: SectorData[] = [
    {
      id: 'pif',
      nameAr: 'صندوق الاستثمارات العامة (PIF Portfolio)',
      nameEn: 'Public Investment Fund (PIF)',
      matchScore: 97.4,
      salaryBenchmarkAr: '150,000 - 190,000 ر.س / شهرياً + حوافز LTI',
      salaryBenchmarkEn: 'SAR 150,000 - 190,000 / mo + LTI Sovereign Equity',
      openingsCount: 11,
      primaryMandateAr: 'قيادة الذكاء الاصطناعي السيادي وحوكمة الشركات التابعة',
      primaryMandateEn: 'Sovereign AI Governance & Portfolio Enterprise Architecture',
      badge: 'TOP MATCH',
      reqId: 'req-pif-cdo',
    },
    {
      id: 'neom',
      nameAr: 'نيوم الرقمية (NEOM Tech & Digital)',
      nameEn: 'NEOM Digital & Cognitive Cities',
      matchScore: 95.8,
      salaryBenchmarkAr: '160,000 - 210,000 ر.س / شهرياً + إقامة VIP',
      salaryBenchmarkEn: 'SAR 160,000 - 210,000 / mo + Executive Housing Allowance',
      openingsCount: 8,
      primaryMandateAr: 'منظومات المدن الإدراكية وشبكات البيانات الذاتية (The Line)',
      primaryMandateEn: 'Cognitive City Infrastructures & Edge Data Grid',
      badge: 'VISION 2030',
      reqId: 'req-neom-ciso',
    },
    {
      id: 'aramco',
      nameAr: 'أرامكو الرقمية (Aramco Digital)',
      nameEn: 'Aramco Digital Innovations',
      matchScore: 98.2,
      salaryBenchmarkAr: '170,000 - 220,000 ر.س / شهرياً + صندوق تقاعدي قيادي',
      salaryBenchmarkEn: 'SAR 170,000 - 220,000 / mo + Executive Pension Trust',
      openingsCount: 14,
      primaryMandateAr: 'حوسبة الطاقة السيادية والأمن السيبراني الصناعي OT/ICS',
      primaryMandateEn: 'Sovereign Industrial Cloud & Zero-Trust Energy Grid',
      badge: 'APEX TIER',
      reqId: 'req-aramco-ai',
    },
  ];

  const [selectedSector, setSelectedSector] = useState<SectorData>(sectors[0]);

  const handleOpenRequisitionModal = (reqId: string) => {
    const found = allRequisitions.find((r) => r.id === reqId) || allRequisitions[0];
    setSelectedRequisition(found);
    setSelectedReqForModal(found);
  };

  // Derived calculation for total annual compensation simulator
  const annualBaseSAR = simulatedBaseMonthly * 12;
  const annualHousingSAR = Math.round(simulatedBaseMonthly * 2);
  const annualLtiEquitySAR = Math.round(annualBaseSAR * 0.45);
  const totalAnnualPackageSAR = annualBaseSAR + annualHousingSAR + annualLtiEquitySAR;

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Live Telemetry & Executive Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#131927] p-4 shadow-sm border border-white/10">
        <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1 text-start">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_8px_#00f0ff]"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00f0ff] font-mono">
                {isRTL
                  ? 'القياس الحي وتوافق السوق التنفيذي'
                  : 'Real-time Telemetry & Market Alignment'}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-white">
                {isRTL ? currentProfile.nameAr : currentProfile.nameEn}
              </h2>
              <span className="material-symbols-outlined text-[17px] text-[#00f0ff]">verified</span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 text-[9px] font-mono font-bold">
                {currentProfile.yearsExperience} {isRTL ? 'سنة خبرة' : 'yrs exp'}
              </span>
            </div>
            <p className="text-xs text-[#00f0ff] font-medium">
              {isRTL ? currentProfile.titleAr : currentProfile.titleEn}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onOpenFirewall}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/50 shadow-[0_0_12px_rgba(0,240,255,0.25)] cursor-pointer hover:bg-cyan-900/80 transition-all active:scale-95"
              title="Sovereign Shield Status"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-[10px] text-[#dbfcff] font-bold font-mono">
                {isRTL ? 'درع سيادي نشط' : 'Sovereign Enclave'}
              </span>
            </button>
            <span className="text-[#849495] text-[9px] tracking-tight font-mono">
              NCA ECC-1:2018 Level 4
            </span>
          </div>
        </div>

        {/* Quick Inject Data Pill */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-[#b9cacb]">
            <span className="material-symbols-outlined text-[15px] text-[#fdd55a]">badge</span>
            <span>
              {isRTL ? 'البيانات النشطة حالياً في المنظومة' : 'Active System C-Suite Record'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDataInjectorOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 via-cyan-500/30 to-blue-600/30 border border-cyan-400/50 text-cyan-300 hover:text-white text-xs font-bold cursor-pointer active:scale-95 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <span className="material-symbols-outlined text-[15px]">tune</span>
            <span>{isRTL ? 'تبديل / إدخال بيانات' : 'Switch / Input Data'}</span>
          </button>
        </div>
      </div>

      {/* Intimidating Sovereign Fortress Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c1322] via-[#0f172a] to-[#0c1322] p-3.5 border border-cyan-500/40 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-[#00f0ff] shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
            <span className="material-symbols-outlined text-[20px]">verified_user</span>
          </div>
          <div className="text-start">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">
                {isRTL ? 'الجدار الناري السيادي الكمومي' : 'Quantum Sovereign Fortress'}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold">
                100% IMMUNE
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">
              {isRTL
                ? 'عزل تام عن نماذج الذكاء العامة • تشفير Kyber-768 المانع للحوسبة الكمومية'
                : 'Zero telemetry routed to public LLMs • Post-Quantum Kyber-768 Lattice'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenFirewall}
          className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#00363a] font-bold text-xs shrink-0 cursor-pointer shadow-sm active:scale-95 transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">shield</span>
          <span>{isRTL ? 'فحص الدرع' : 'Audit Shield'}</span>
        </button>
      </div>

      {/* 5 Executive Superpower Command Suite */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-[#101726] via-[#0d1422] to-[#101726] border border-cyan-500/30 shadow-md space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              {isRTL ? 'حزمة الأدوات التنفيذية السيادية (C-Suite Suite)' : 'Sovereign C-Suite Suite'}
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[9px] font-mono font-bold">
            5/5 ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {/* 1. Dossier PDF */}
          <button
            type="button"
            onClick={() => setIsDossierOpen(true)}
            className="p-2.5 rounded-xl bg-[#151c2e] hover:bg-[#1d273f] border border-white/10 hover:border-cyan-500/40 text-start flex flex-col justify-between gap-2 cursor-pointer transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">
                {isRTL ? 'الملف التنفيذي' : 'Executive Dossier'}
              </div>
              <div className="text-[9px] text-cyan-400 font-mono">
                {isRTL ? 'PDF عالي الدقة وختم QR' : 'High-Res PDF & QR'}
              </div>
            </div>
          </button>

          {/* 2. Live Voice Coach */}
          <button
            type="button"
            onClick={() => onNavigate('09_interview_coach')}
            className="p-2.5 rounded-xl bg-[#151c2e] hover:bg-[#1d273f] border border-white/10 hover:border-cyan-500/40 text-start flex flex-col justify-between gap-2 cursor-pointer transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <span className="material-symbols-outlined text-[16px]">mic</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">
                {isRTL ? 'النبرة القيادية' : 'Voice & Gravitas'}
              </div>
              <div className="text-[9px] text-blue-400 font-mono">
                {isRTL ? 'ميكروفون حي + STAR' : 'Live Mic + STAR'}
              </div>
            </div>
          </button>

          {/* 3. Headhunter Radar */}
          <button
            type="button"
            onClick={() => setIsRadarOpen(true)}
            className="p-2.5 rounded-xl bg-[#151c2e] hover:bg-[#1d273f] border border-white/10 hover:border-cyan-500/40 text-start flex flex-col justify-between gap-2 cursor-pointer transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center border border-red-500/30">
              <span className="material-symbols-outlined text-[16px]">radar</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">
                {isRTL ? 'رادار الاستقطاب' : 'Headhunter Radar'}
              </div>
              <div className="text-[9px] text-red-400 font-mono">
                {isRTL ? 'وظائف سرية غير معلنة' : 'Confidential Mandates'}
              </div>
            </div>
          </button>

          {/* 4. Offer Negotiator */}
          <button
            type="button"
            onClick={() => setIsNegotiatorOpen(true)}
            className="p-2.5 rounded-xl bg-[#151c2e] hover:bg-[#1d273f] border border-white/10 hover:border-cyan-500/40 text-start flex flex-col justify-between gap-2 cursor-pointer transition-all active:scale-95"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">
                {isRTL ? 'مفاوض العقود' : 'Offer Negotiator'}
              </div>
              <div className="text-[9px] text-emerald-400 font-mono">
                {isRTL ? 'LTI + مظلة ذهبية' : 'LTI & Parachute'}
              </div>
            </div>
          </button>

          {/* 5. 90-Day Board Deck */}
          <button
            type="button"
            onClick={() => setIsPitchDeckOpen(true)}
            className="p-2.5 rounded-xl bg-[#151c2e] hover:bg-[#1d273f] border border-white/10 hover:border-cyan-500/40 text-start flex flex-col justify-between gap-2 cursor-pointer transition-all active:scale-95 col-span-2 sm:col-span-1"
          >
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/30">
              <span className="material-symbols-outlined text-[16px]">co_present</span>
            </div>
            <div>
              <div className="text-[11px] font-bold text-white leading-tight">
                {isRTL ? 'خطة الـ 90 يوماً' : '90-Day Playbook'}
              </div>
              <div className="text-[9px] text-purple-400 font-mono">
                {isRTL ? 'عرض مجلس الإدارة' : 'Board Deck Pitch'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* KPI 1 */}
        <div className="rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2 shadow-sm border border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-[#0b0f19] flex items-center justify-center text-[#00f0ff]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 text-[10px] font-bold font-mono">
              +3.8%
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl font-extrabold text-[#00f0ff] leading-none font-mono">
              {currentProfile.boardReadinessScore}%
            </span>
            <span className="text-[11px] text-[#94a3b8] font-medium pt-1">
              {isRTL ? 'مؤشر الجاهزية القيادية' : 'Leadership Readiness'}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#0b0f19] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${currentProfile.boardReadinessScore}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-[#0b0f19] flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-[16px]">document_scanner</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 text-[10px] font-bold">
              {isRTL ? 'مثالي' : 'Optimal'}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-2xl font-extrabold text-white leading-none font-mono">
              {currentProfile.atsMatchScore}%
            </span>
            <span className="text-[11px] text-[#94a3b8] font-medium pt-1">
              {isRTL ? 'احتمالية اجتياز ATS' : 'ATS Match Probability'}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#0b0f19] overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${currentProfile.atsMatchScore}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-[#0b0f19] flex items-center justify-center text-emerald-400">
              <span className="material-symbols-outlined text-[16px]">security</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold">
              {isRTL ? 'موثقة' : 'Verified'}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-white leading-none font-mono">
                {currentProfile.verifiedCredentialsCount}
              </span>
              <span className="text-xs text-emerald-400 font-bold">
                {isRTL ? 'براءة واعتماد' : 'Credentials'}
              </span>
            </div>
            <span className="text-[11px] text-[#94a3b8] font-medium pt-1">
              {isRTL ? 'سجل الإنجازات المعتمد' : 'Verified Achievements'}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#0b0f19] overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2 shadow-sm border border-white/10">
          <div className="flex items-center justify-between">
            <div className="w-7 h-7 rounded-lg bg-[#0b0f19] flex items-center justify-center text-[#fdd55a]">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#fdd55a]/15 text-[#fdd55a] text-[10px] font-bold">
              {isRTL ? 'أعلى ١٪' : 'Top 1%'}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-[#fdd55a] leading-none font-mono">
                {selectedSector.openingsCount}
              </span>
              <span className="text-xs text-[#94a3b8] font-medium">
                {isRTL ? 'منصب متاح' : 'C-Roles'}
              </span>
            </div>
            <span className="text-[11px] text-[#94a3b8] font-medium pt-1">
              {isRTL ? 'فرص القيادة المتاحة' : 'Active Board Roles'}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#0b0f19] overflow-hidden">
            <div className="h-full bg-[#fdd55a] rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      {/* Vision 2030 Sovereign Megaprojects Radar */}
      <div className="rounded-2xl bg-[#131927] p-3.5 shadow-sm border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[18px]">
              assured_workload
            </span>
            <h3 className="text-xs font-bold text-white">
              {isRTL
                ? 'رادار مشاريع رؤية 2030 والقطاعات السيادية'
                : 'Vision 2030 Sovereign Megaprojects Radar'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#00f0ff] bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            LIVE MARKET
          </span>
        </div>

        {/* Sector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {sectors.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => {
                setSelectedSector(sec);
                onShowToast(
                  isRTL
                    ? `تم التبديل إلى قطاع ${sec.nameAr} بنجاح`
                    : `Switched radar to ${sec.nameEn}`
                );
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                selectedSector.id === sec.id
                  ? 'bg-[#00f0ff] text-[#00363a] font-bold border-[#00f0ff] shadow-sm'
                  : 'bg-[#0b0f19] text-[#94a3b8] border-white/5 hover:text-white'
              }`}
            >
              {isRTL ? sec.nameAr.split(' ')[0] : sec.nameEn.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Sector Details Box */}
        <div className="p-3 rounded-xl bg-[#0b0f19] border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white">
              {isRTL ? selectedSector.nameAr : selectedSector.nameEn}
            </h4>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#00f0ff] font-mono text-[9px] font-bold border border-cyan-500/40">
              {selectedSector.badge}
            </span>
          </div>

          <p className="text-[11px] text-[#94a3b8]">
            {isRTL ? selectedSector.primaryMandateAr : selectedSector.primaryMandateEn}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] font-mono">
            <span className="text-[#fdd55a]">
              {isRTL ? selectedSector.salaryBenchmarkAr : selectedSector.salaryBenchmarkEn}
            </span>
            <span className="text-emerald-400 font-bold">
              {selectedSector.matchScore}% MATCH
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenRequisitionModal(selectedSector.reqId)}
            className="flex-1 py-2 px-3 rounded-xl bg-[#1c2436] hover:bg-[#263147] text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">
              visibility
            </span>
            <span>{isRTL ? 'عرض ملف المنصب واللجنة' : 'View Committee Dossier'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenAiCopilot}
            className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5 border border-cyan-400/40 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span>{isRTL ? 'استشارة منارة' : 'Ask Copilot'}</span>
          </button>
        </div>
      </div>

      {/* Interactive C-Suite Compensation & LTI Simulator */}
      <div className="rounded-2xl bg-gradient-to-br from-[#121a2d] to-[#0a0f1b] p-3.5 shadow-md border border-cyan-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-[#fdd55a]">
              <span className="material-symbols-outlined text-[17px]">payments</span>
            </div>
            <div className="text-start">
              <h3 className="text-xs font-bold text-white">
                {isRTL ? 'محاكي التعويضات وحوافز LTI التنفيذية' : 'Executive Compensation & LTI Simulator'}
              </h3>
              <span className="text-[10px] text-cyan-300 font-mono">
                {isRTL ? 'مدرج ضمن كبرى مشاريع الرؤية' : 'Calibrated for Saudi Vision 2030'}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#fdd55a] bg-[#fdd55a]/10 px-2 py-0.5 rounded border border-[#fdd55a]/30 font-bold">
            TOP 1% C-SUITE
          </span>
        </div>

        {/* Salary Slider */}
        <div className="space-y-1.5 p-2.5 rounded-xl bg-[#080d17] border border-white/5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#94a3b8]">
              {isRTL ? 'الراتب الأساسي الشهري المستهدف:' : 'Target Monthly Base Salary:'}
            </span>
            <span className="text-sm font-extrabold text-[#00f0ff] font-mono">
              {simulatedBaseMonthly.toLocaleString()} SAR
            </span>
          </div>

          <input
            type="range"
            min="100000"
            max="350000"
            step="5000"
            value={simulatedBaseMonthly}
            onChange={(e) => setSimulatedBaseMonthly(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-gray-700 rounded-lg"
          />

          <div className="flex justify-between text-[10px] text-[#849495] font-mono">
            <span>100,000 SAR</span>
            <span>225,000 SAR</span>
            <span>350,000 SAR</span>
          </div>
        </div>

        {/* Projected Package Breakdown */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-[#141b2b] border border-white/5">
            <span className="text-[10px] text-[#94a3b8] block">
              {isRTL ? 'الأساسي السنوي' : 'Annual Base'}
            </span>
            <span className="font-bold text-white font-mono text-xs">
              {(annualBaseSAR / 1000).toLocaleString()}k
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#141b2b] border border-white/5">
            <span className="text-[10px] text-[#94a3b8] block">
              {isRTL ? 'بدل سكن VIP' : 'Housing VIP'}
            </span>
            <span className="font-bold text-cyan-300 font-mono text-xs">
              {(annualHousingSAR / 1000).toLocaleString()}k
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#141b2b] border border-[#fdd55a]/20">
            <span className="text-[10px] text-[#fdd55a] block">
              {isRTL ? 'حوافز LTI' : 'LTI Equity'}
            </span>
            <span className="font-bold text-[#fdd55a] font-mono text-xs">
              {(annualLtiEquitySAR / 1000).toLocaleString()}k
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 text-xs">
          <span className="text-[#dbfcff] font-medium">
            {isRTL ? 'إجمالي الحزمة التنفيذية السنوية التقديرية:' : 'Total Annual Executive Package:'}
          </span>
          <span className="font-mono font-extrabold text-[#00f0ff] text-sm">
            {totalAnnualPackageSAR.toLocaleString()} SAR
          </span>
        </div>
      </div>

      {/* Navigation & Action Shortcuts Grid */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">hub</span>
            <span>{isRTL ? 'محطات المنظومة التنفيذية' : 'Executive Ecosystem Hub'}</span>
          </h3>
          <span className="text-[10px] text-[#849495] uppercase tracking-wider font-mono">
            {isRTL ? 'الترخيص السيادي' : 'SOVEREIGN SUITE'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Shortcut 1: Smart CV Builder */}
          <div
            onClick={() => onNavigate('06_cv_builder')}
            className="group relative rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2.5 shadow-sm hover:bg-[#1a2336] transition-all cursor-pointer border border-white/10 hover:border-cyan-500/40"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#0b0f19] flex items-center justify-center text-[#00f0ff] shadow-inner border border-white/5">
                <span className="material-symbols-outlined text-[18px]">post_add</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-[#00f0ff] text-[10px] font-bold font-mono">
                98% ATS
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-start">
              <h4 className="text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {isRTL ? 'باني السيرة الذاتية الذكي' : 'Smart CV Builder Studio'}
              </h4>
              <p className="text-[10px] text-[#94a3b8] line-clamp-2 leading-snug">
                {isRTL
                  ? 'صياغة سير تنفيذية معتمدة للقيادات'
                  : 'Generate C-suite tailored executive resumes'}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 text-[#00f0ff] text-[11px] font-semibold">
              <span>{isRTL ? 'فتح الاستوديو' : 'Launch Studio'}</span>
              <span className="material-symbols-outlined text-[14px]">
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </div>
          </div>

          {/* Shortcut 2: ATS Job Analyzer */}
          <div
            onClick={() => onNavigate('07_job_analyzer')}
            className="group relative rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2.5 shadow-sm hover:bg-[#1a2336] transition-all cursor-pointer border border-white/10 hover:border-cyan-500/40"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#0b0f19] flex items-center justify-center text-[#00f0ff] shadow-inner border border-white/5">
                <span className="material-symbols-outlined text-[18px]">troubleshoot</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-[#00f0ff] text-[10px] font-bold font-mono">
                {isRTL ? 'نشط' : 'Active'}
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-start">
              <h4 className="text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {isRTL ? 'محلل مطابقة الوظائف' : 'Job Match Analyzer'}
              </h4>
              <p className="text-[10px] text-[#94a3b8] line-clamp-2 leading-snug">
                {isRTL
                  ? 'كشف الفجوات والمطابقة بنقرة واحدة'
                  : 'Benchmark role alignment and keyword density'}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 text-[#00f0ff] text-[11px] font-semibold">
              <span>{isRTL ? 'تحليل المنصب' : 'Analyze Role'}</span>
              <span className="material-symbols-outlined text-[14px]">
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </div>
          </div>

          {/* Shortcut 3: AI Interview Coach */}
          <div
            onClick={() => onNavigate('09_interview_coach')}
            className="group relative rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2.5 shadow-sm hover:bg-[#1a2336] transition-all cursor-pointer border border-white/10 hover:border-cyan-500/40"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#0b0f19] flex items-center justify-center text-blue-400 shadow-inner border border-white/5">
                <span className="material-symbols-outlined text-[18px]">mic</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold font-mono">
                STAR
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-start">
              <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                {isRTL ? 'مدرب المقابلات الذكي' : 'AI Interview Coach'}
              </h4>
              <p className="text-[10px] text-[#94a3b8] line-clamp-2 leading-snug">
                {isRTL
                  ? 'محاكاة أسئلة مجالس الإدارة بالصوت'
                  : 'Boardroom & executive voice rehearsal'}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 text-blue-300 text-[11px] font-semibold">
              <span>{isRTL ? 'بدء الجلسة' : 'Start Session'}</span>
              <span className="material-symbols-outlined text-[14px]">
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </div>
          </div>

          {/* Shortcut 4: Document Intelligence */}
          <div
            onClick={() => onNavigate('05_docs_intel')}
            className="group relative rounded-xl bg-[#131927] p-3 flex flex-col justify-between gap-2.5 shadow-sm hover:bg-[#1a2336] transition-all cursor-pointer border border-white/10 hover:border-cyan-500/40"
          >
            <div className="flex items-start justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#0b0f19] flex items-center justify-center text-[#00f0ff] shadow-inner border border-white/5">
                <span className="material-symbols-outlined text-[18px]">auto_awesome_motion</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-[#00f0ff] text-[10px] font-bold font-mono">
                OCR
              </span>
            </div>
            <div className="flex flex-col gap-0.5 text-start">
              <h4 className="text-xs font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                {isRTL ? 'ذكاء المستندات والتدقيق' : 'Document Intelligence'}
              </h4>
              <p className="text-[10px] text-[#94a3b8] line-clamp-2 leading-snug">
                {isRTL
                  ? 'التدقيق الدلالي واستخراج الاعتمادات'
                  : 'Semantic parsing & credential extraction'}
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 text-[#00f0ff] text-[11px] font-semibold">
              <span>{isRTL ? 'دخول الخزينة' : 'Access Vault'}</span>
              <span className="material-symbols-outlined text-[14px]">
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Verification Action Button */}
      <button
        onClick={() => onNavigate('05_docs_intel')}
        className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-600/30 to-cyan-500/20 hover:from-cyan-500/30 hover:to-blue-600/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)] border border-cyan-500/30 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px] text-[#00f0ff]">add_circle</span>
        <span className="text-xs font-bold text-[#00f0ff]">
          {isRTL ? '+ بدء التحقق من بيانات الملف الشخصي' : '+ Start Profile Data Verification'}
        </span>
      </button>

      {/* Quick Action Row */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onNavigate('05_docs_intel')}
          className="min-h-[44px] px-3 py-2 rounded-xl bg-[#131927] hover:bg-[#1a2336] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white text-xs font-semibold cursor-pointer border border-white/10"
        >
          <span className="material-symbols-outlined text-[16px] text-cyan-400">upload_file</span>
          <span>{isRTL ? 'رفع سريع (PDF)' : 'Quick Upload (PDF)'}</span>
        </button>

        <button
          onClick={() => {
            onShowToast(
              isRTL
                ? 'تم تصدير التقرير القيادي المشفر بتوقيع SHA-256'
                : 'Telemetry snapshot exported with cryptographic SHA-256 seal'
            );
          }}
          className="min-h-[44px] px-3 py-2 rounded-xl bg-[#131927] hover:bg-[#1a2336] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white text-xs font-semibold cursor-pointer border border-white/10"
        >
          <span className="material-symbols-outlined text-[16px] text-blue-300">share</span>
          <span>{isRTL ? 'تصدير القياس الحي' : 'Export Telemetry'}</span>
        </button>
      </div>

      {/* Requisition Detail Modal */}
      {selectedReqForModal && (
        <MegaprojectDetailModal
          isOpen={!!selectedReqForModal}
          onClose={() => setSelectedReqForModal(null)}
          requisition={selectedReqForModal}
          language={language}
          onNavigate={onNavigate}
          onShowToast={onShowToast}
        />
      )}

      {/* 1. Executive Dossier PDF Modal */}
      <ExecutiveDossierPdfModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        language={language}
        onShowToast={onShowToast}
      />

      {/* 3. Headhunter & Hidden Jobs Radar Modal */}
      <HeadhunterRadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
        language={language}
        onShowToast={onShowToast}
      />

      {/* 4. Executive Offer & Golden Parachute Negotiator Modal */}
      <ExecutiveOfferNegotiatorModal
        isOpen={isNegotiatorOpen}
        onClose={() => setIsNegotiatorOpen(false)}
        language={language}
        onShowToast={onShowToast}
      />

      {/* 5. 90-Days Board Pitch Deck Modal */}
      <BoardPlaybookPitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        language={language}
        onShowToast={onShowToast}
      />
    </div>
  );
};

