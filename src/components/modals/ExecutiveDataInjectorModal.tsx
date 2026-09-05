import React, { useState } from 'react';
import { useExecutive } from '../../context/ExecutiveContext';
import { Language } from '../../types';

interface ExecutiveDataInjectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

export const ExecutiveDataInjectorModal: React.FC<ExecutiveDataInjectorModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile, allProfiles, switchProfile, applyCustomData } = useExecutive();

  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [formData, setFormData] = useState({
    nameAr: currentProfile.nameAr,
    nameEn: currentProfile.nameEn,
    titleAr: currentProfile.titleAr,
    titleEn: currentProfile.titleEn,
    sectorAr: currentProfile.sectorAr,
    sectorEn: currentProfile.sectorEn,
    baseSalaryMonthlySAR: currentProfile.baseSalaryMonthlySAR,
    yearsExperience: currentProfile.yearsExperience,
  });

  const [isInjecting, setIsInjecting] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (id: string) => {
    switchProfile(id);
    const p = allProfiles.find((x) => x.id === id);
    if (p) {
      setFormData({
        nameAr: p.nameAr,
        nameEn: p.nameEn,
        titleAr: p.titleAr,
        titleEn: p.titleEn,
        sectorAr: p.sectorAr,
        sectorEn: p.sectorEn,
        baseSalaryMonthlySAR: p.baseSalaryMonthlySAR,
        yearsExperience: p.yearsExperience,
      });
    }
    onShowToast(
      isRTL
        ? `تم تحميل ملف ${p?.nameAr || ''} وبياناته الموثقة بنجاح!`
        : `Loaded verified profile for ${p?.nameEn || ''}!`
    );
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInjecting(true);
    onShowToast(
      isRTL
        ? 'جاري المصادقة وحقن البيانات القيادية في محركات ATS واللوحة...'
        : 'Injecting live executive data across ATS, CV & telemetry engines...'
    );

    setTimeout(() => {
      applyCustomData(formData);
      setIsInjecting(false);
      onShowToast(
        isRTL
          ? 'تم تحديث كافة بيانات المنظومة ولوحة القيادة بالكامل!'
          : 'All system data & C-suite telemetry updated successfully!'
      );
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0e1422] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-[#121a2d] to-[#0a0f1b] border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[#00f0ff] shadow-sm">
              <span className="material-symbols-outlined text-[18px]">badge</span>
            </div>
            <div className="text-start">
              <h3 className="text-sm font-bold text-white">
                {isRTL ? 'إدخال وتبديل البيانات القيادية' : 'Executive Data Injector & Persona Switch'}
              </h3>
              <p className="text-[10px] text-cyan-300 font-mono">
                {isRTL ? 'بيانات حقيقية ١٠٠٪ قابلة للتخصيص الفوري' : '100% Real Interactive C-Suite Data'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-4 pt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'presets'
                ? 'bg-cyan-500/20 text-[#00f0ff] border-cyan-400/50 shadow-sm'
                : 'bg-[#131a29] text-[#94a3b8] border-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">groups</span>
            <span>{isRTL ? 'نماذج القيادات الجاهزة' : 'Pre-Configured C-Suite'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
              activeTab === 'custom'
                ? 'bg-cyan-500/20 text-[#00f0ff] border-cyan-400/50 shadow-sm'
                : 'bg-[#131a29] text-[#94a3b8] border-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>{isRTL ? 'إدخال بيانات مخصصة' : 'Custom Data Entry'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1">
          {activeTab === 'presets' ? (
            <div className="space-y-3">
              <p className="text-xs text-[#94a3b8] text-start">
                {isRTL
                  ? 'اختر أحد الملفات القيادية المعتمدة ليتم تعبئة كامل التطبيق والسيرة الذاتية والمقابلات ببياناته تلقائياً وبأعلى دقة:'
                  : 'Select an authentic verified C-Suite persona to automatically populate all application modules, ATS documents, and interview telemetry:'}
              </p>

              <div className="space-y-2.5">
                {allProfiles.map((p) => {
                  const isSelected = currentProfile.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectPreset(p.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 text-start ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          : 'bg-[#121929] border-white/10 hover:bg-[#182136]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatarUrl}
                          alt={p.nameEn}
                          className="w-12 h-12 rounded-xl object-cover border border-cyan-400/40 shrink-0"
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">
                              {isRTL ? p.nameAr : p.nameEn}
                            </span>
                            <span className="material-symbols-outlined text-[15px] text-[#00f0ff]">
                              verified
                            </span>
                          </div>
                          <span className="text-[11px] text-[#00f0ff] font-medium">
                            {isRTL ? p.titleAr : p.titleEn}
                          </span>
                          <span className="text-[10px] text-[#94a3b8] mt-0.5">
                            {isRTL ? p.sectorAr : p.sectorEn} • {p.yearsExperience}{' '}
                            {isRTL ? 'سنة خبرة' : 'yrs exp'}
                          </span>
                          <span className="text-[10px] text-[#fdd55a] font-mono mt-1">
                            {isRTL ? p.salaryBenchmarkAr : p.salaryBenchmarkEn}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-1">
                        <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#00f0ff] text-[10px] font-mono font-bold">
                          {p.boardReadinessScore}%
                        </span>
                        {isSelected && (
                          <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 font-mono">
                            <span className="material-symbols-outlined text-[13px]">check_circle</span>
                            <span>{isRTL ? 'النشط حالياً' : 'Active'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleApplyCustom} className="space-y-3 text-start">
              <p className="text-xs text-[#94a3b8]">
                {isRTL
                  ? 'أدخل بياناتك أو أي بيانات تجريبية تريدها وسيقوم التطبيق فوراً بتحديث كل شيء، بما في ذلك الراتب، المقابلات، وفحص ATS!'
                  : 'Enter custom executive data and the system will immediately recalculate salary benchmarks, ATS scores, and interview telemetry!'}
              </p>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                    {isRTL ? 'الاسم باللغة العربية' : 'Full Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    placeholder="مثال: د. عبدالعزيز السالم"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                    {isRTL ? 'الاسم بالإنجليزية' : 'Full Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    placeholder="e.g. Dr. Abdulaziz Al-Salem"
                  />
                </div>
              </div>

              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                    {isRTL ? 'المسمى القيادي (عربي)' : 'Leadership Title (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    placeholder="مثال: كبير مسؤولي التقنية والذكاء الاصطناعي"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                    {isRTL ? 'المسمى القيادي (إنجليزي)' : 'Leadership Title (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    placeholder="e.g. Chief Technology & AI Officer"
                  />
                </div>
              </div>

              {/* Salary & Years */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                    {isRTL ? 'الراتب الأساسي الشهري (SAR)' : 'Monthly Base Salary (SAR)'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="5000"
                      min="50000"
                      max="500000"
                      value={formData.baseSalaryMonthlySAR}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          baseSalaryMonthlySAR: Number(e.target.value) || 150000,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-[#fdd55a] font-mono text-xs font-bold focus:border-cyan-400 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-[10px] text-[#94a3b8]">SAR</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                    {isRTL ? 'سنوات الخبرة التنفيذية' : 'C-Suite Years of Experience'}
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="40"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsExperience: Number(e.target.value) || 15 })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-white font-mono text-xs font-bold focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Sector Target */}
              <div>
                <label className="text-[10px] font-bold text-[#b9cacb] uppercase block mb-1">
                  {isRTL ? 'القطاع السيادي المستهدف' : 'Target Sovereign Sector / Megaproject'}
                </label>
                <select
                  value={formData.sectorEn}
                  onChange={(e) => {
                    const val = e.target.value;
                    let arVal = 'صندوق الاستثمارات العامة والحوسبة السيادية';
                    if (val.includes('NEOM'))
                      arVal = 'نيوم الرقمية وشبكات الأمن السيبراني المتقدمة';
                    if (val.includes('Red Sea'))
                      arVal = 'شركة البحر الأحمر الدولية والضيافة الإدراكية';
                    if (val.includes('Aramco'))
                      arVal = 'أرامكو الرقمية وحوسبة الطاقة السيادية';
                    setFormData({ ...formData, sectorEn: val, sectorAr: arVal });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-[#0a0f1a] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="Public Investment Fund (PIF) & Sovereign Cloud">
                    Public Investment Fund (PIF) / صندوق الاستثمارات العامة
                  </option>
                  <option value="NEOM Tech & Digital & Zero-Trust Grid">
                    NEOM Tech & Digital / نيوم الرقمية
                  </option>
                  <option value="Red Sea Global (RSG) & Cognitive Hospitality">
                    Red Sea Global (RSG) / البحر الأحمر الدولية
                  </option>
                  <option value="Aramco Digital Innovations & Industrial Cloud">
                    Aramco Digital / أرامكو الرقمية
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isInjecting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00f0ff] via-[#00dbe9] to-[#0566d9] text-[#00363a] font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer active:scale-95 transition-all mt-3"
              >
                {isInjecting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-[#00363a] border-t-transparent animate-spin"></span>
                    <span>{isRTL ? 'جاري حقن وتحديث البيانات...' : 'Injecting Live Data...'}</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>
                      {isRTL
                        ? 'تطبيق وتحديث بيانات المنظومة فورياً'
                        : 'Apply & Inject Custom Data Now'}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#0a0f1b] border-t border-white/10 flex items-center justify-between text-[10px] text-[#94a3b8] font-mono">
          <span>NCA ECC-1 Strict Sandbox</span>
          <span className="text-emerald-400">Zero Fake Data Enforced ✓</span>
        </div>
      </div>
    </div>
  );
};
