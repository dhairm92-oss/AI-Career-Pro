import React, { useState } from 'react';
import { useExecutive } from '../../context/ExecutiveContext';
import { Language } from '../../types';

interface BoardPlaybookPitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

export const BoardPlaybookPitchDeckModal: React.FC<BoardPlaybookPitchDeckModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      id: 1,
      phase: isRTL ? 'المقدمة التنفيذية' : 'EXECUTIVE THESIS',
      titleAr: 'الرؤية الاستراتيجية وتوافق أهداف مجلس الإدارة',
      titleEn: 'Strategic Vision & Board Mandate Alignment',
      subtitleAr: 'قيادة التحول السيادي، تعظيم كفاءة الإنفاق الرأسمالي، وبناء منظومة متوائمة مع رؤية 2030',
      subtitleEn: 'Steering sovereign digital infrastructure, CapEx stewardship, and Vision 2030 realization',
      pillars: [
        {
          headingAr: 'الهدف الاستراتيجي الأسمى',
          headingEn: 'Core Strategic Mandate',
          textAr: `تسخير الخبرة القيادية الممتدة ${currentProfile.yearsExperience} عاماً لإعادة هندسة العمليات ورفع مؤشرات EBITDA بنسبة تتجاوز 25%.`,
          textEn: `Leveraging ${currentProfile.yearsExperience}+ years of enterprise leadership to re-architect operations and accelerate EBITDA yields by 25%+.`,
          icon: 'flag',
        },
        {
          headingAr: 'حوكمة المحفظة الرأسمالية',
          headingEn: 'CapEx Portfolio Governance',
          textAr: `إدارة رشيدة ومحوكمة للميزانية التقديرية البالغة (${currentProfile.quantifiedBudgetManagedAr}) وفق معايير الحوكمة الوطنية.`,
          textEn: `Disciplined governance of the ${currentProfile.quantifiedBudgetManagedEn} portfolio aligned with national sovereign benchmarks.`,
          icon: 'account_balance',
        },
        {
          headingAr: 'الامتثال السيادي والسيبراني',
          headingEn: 'Sovereign Cyber Resilience',
          textAr: 'تحقيق الامتثال التام مع متطلبات الهيئة الوطنية للأمن السيبراني (NCA) وسدايا بنسبة 100%.',
          textEn: 'Enforcing 100% adherence to National Cybersecurity Authority (NCA) and SDAIA regulatory mandates.',
          icon: 'security',
        },
      ],
    },
    {
      id: 2,
      phase: isRTL ? 'المرحلة الأولى • الأيام 1 إلى 30' : 'PHASE 1 • DAYS 1 TO 30',
      titleAr: 'التدقيق الشامل وفحص الجاهزية والحوكمة (Zero-Trust Discovery)',
      titleEn: 'Zero-Trust Discovery & Governance Baseline',
      subtitleAr: 'تشخيص البنية الحالية، تدقيق عقود الموردين، وتحديد أوجه الهدر المالي وفرص التسريع',
      subtitleEn: 'Comprehensive landscape diagnostic, vendor contract audit, and baseline discovery',
      pillars: [
        {
          headingAr: 'التدقيق المالي والتشغيلي الشامل',
          headingEn: 'Operational & Financial Deep-Dive',
          textAr: 'فحص مصفوفة الصلاحيات المالية والمشتريات، وتدقيق كافة عقود تقنية المعلومات الاستشارية لكشف أوجه الازدواجية.',
          textEn: 'Audit Delegation of Authority (DoA) matrices, advisory retainer contracts, and vendor redundancies.',
          icon: 'analytics',
        },
        {
          headingAr: 'جلسات الاستماع للقيادات التنفيذية',
          headingEn: 'Key Stakeholder & C-Suite Listening',
          textAr: 'عقد اجتماعات تشخيصية فردية مع أعضاء مجلس الإدارة ورؤساء القطاعات لتحديد التحديات الهيكلية غير المعلنة.',
          textEn: 'Conduct 1-on-1 discovery briefings with Board Members and Sector VPs to map unvoiced structural friction.',
          icon: 'groups',
        },
        {
          headingAr: 'تقييم الجدار الأمني للبيانات',
          headingEn: 'Data Sovereignty & PDPL Audit',
          textAr: 'مراجعة فورية لتصنيف البيانات وموقع استضافتها السحابية لضمان عدم خروج أي بيانات حساسة خارج المملكة.',
          textEn: 'Rigorous audit of cloud workloads ensuring 100% data residency within Saudi Arabia sovereign boundaries.',
          icon: 'verified_user',
        },
      ],
    },
    {
      id: 3,
      phase: isRTL ? 'المرحلة الثانية • الأيام 31 إلى 60' : 'PHASE 2 • DAYS 31 TO 60',
      titleAr: 'المكاسب التشغيلية السريعة والتحول الرقمي (Quick Wins & Momentum)',
      titleEn: 'High-Impact Quick Wins & Operational Alignment',
      subtitleAr: 'تنفيذ مبادرات سريعة تثبت الجدارة وتخفض التكاليف المباشرة دون إرباك مسار الأعمال',
      subtitleEn: 'Deploying immediate value levers, eliminating SaaS license waste, and establishing operational cadence',
      pillars: [
        {
          headingAr: 'خفض التكاليف التشغيلية (OpEx)',
          headingEn: 'OpEx Streamlining Quick Win',
          textAr: 'إلغاء الاشتراكات والبرمجيات المتكررة وترشيد العقود الاستشارية لتحقيق وفر فوري يعادل 15-20% من ميزانية التقنية.',
          textEn: 'Consolidate redundant software licenses and vendor retainers to realize 15-20% immediate OpEx savings.',
          icon: 'savings',
        },
        {
          headingAr: 'أتمتة سلاسل اتخاذ القرار بالذكاء الاصطناعي',
          headingEn: 'AI Workflow Modernization',
          textAr: 'إطلاق خطوط معالجة مؤتمتة تربط التقارير المالية والتشغيلية بنماذج ذكاء اصطناعي سيادية لتقليص زمن إعداد تقارير المجلس إلى ساعات.',
          textEn: 'Deploy sovereign automated pipelines reducing Board telemetry pack preparation from 10 days to 4 hours.',
          icon: 'smart_toy',
        },
        {
          headingAr: 'إعادة مواءمة الكفاءات القيادية',
          headingEn: 'Talent Calibration & OKRs',
          textAr: 'وضع مؤشرات أداء رئيسية (OKRs) حاسمة ومربوطة بحوافز الإنجاز لكل مدير تنفيذي ونائب رئيس.',
          textEn: 'Re-anchor executive OKRs and performance-linked incentives across critical tier-2 business leaders.',
          icon: 'tune',
        },
      ],
    },
    {
      id: 4,
      phase: isRTL ? 'المرحلة الثالثة • الأيام 61 إلى 90' : 'PHASE 3 • DAYS 61 TO 90',
      titleAr: 'التوسع الممنهج وتقديم التقرير الختامي للمجلس (Scale & Board Delivery)',
      titleEn: 'Systemic Scale, EBITDA Acceleration & Board KPI Delivery',
      subtitleAr: 'ترسيخ التحول الشامل، تقديم لوحة القيادة الحية للمجلس، وإطلاق استراتيجية الـ 3 سنوات القادمة',
      subtitleEn: 'Institutionalizing systemic excellence, launching executive telemetry, and delivering Board commitments',
      pillars: [
        {
          headingAr: 'إطلاق لوحة تحكم المجلس الحية (Executive HUD)',
          headingEn: 'Live Board Telemetry Cockpit',
          textAr: 'توفير تطبيق مخصص لأعضاء مجلس الإدارة لمتابعة الأداء المالي، تقدم المشاريع، ومعدلات الأمان السيبراني لحظياً.',
          textEn: 'Empower the Board with an unalterable, real-time KPI cockpit tracking financial velocity and project milestones.',
          icon: 'speed',
        },
        {
          headingAr: 'إقرار استراتيجية الـ 3 سنوات (2026-2029)',
          headingEn: 'Multi-Year Growth Playbook',
          textAr: 'تقديم الخطة الخمسية المحدثة للجنة الاستراتيجية متضمنة خطة التوسع الإقليمي والعوائد الرأسمالية المتوقعة.',
          textEn: 'Present the validated 3-year strategic growth blueprint with projected IRR and sovereign capital multiplier.',
          icon: 'trending_up',
        },
        {
          headingAr: 'تقرير الأثر الأول للجنة الترشيحات (NRC)',
          headingEn: 'First 90-Day Accountability Review',
          textAr: 'استعراض الإنجازات المالية المحققة وإثبات تحقيق الوفر المقدر وتثبيت حوافز الاستبقاء والأسهم LTI.',
          textEn: 'Formal presentation to NRC proving deliverables, verified OpEx reduction, and anchoring long-term LTI milestones.',
          icon: 'military_tech',
        },
      ],
    },
  ];

  const slide = slides[currentSlide];

  const handlePrintDeck = () => {
    onShowToast(
      isRTL
        ? 'جاري تجهيز شرائح خطة الـ ٩٠ يوماً للطباعة والعرض التنفيذي...'
        : 'Preparing executive 90-day presentation slides for printing...'
    );
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl my-6 rounded-2xl bg-[#0c101c] border border-cyan-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(0,240,255,0.25)] flex flex-col max-h-[92vh] overflow-hidden text-start">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="print:hidden flex items-center justify-between px-4 py-3 bg-[#131929] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
              <span className="material-symbols-outlined text-[18px]">co_present</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{isRTL ? 'عرض خطة الـ ٩٠ يوماً الأولى لمجلس الإدارة' : 'First 90-Days Executive Boardroom Pitch Deck'}</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                  SLIDE {currentSlide + 1} OF {slides.length}
                </span>
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                {isRTL ? 'تصميم مخصص للتقديم أمام لجان الترشيحات والمكافآت (NRC) ومجالس الإدارة' : 'Tailored for Board Nomination & Remuneration Committees'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintDeck}
              className="px-3 py-1.5 rounded-lg bg-[#192236] hover:bg-[#222f49] text-cyan-300 text-xs font-semibold flex items-center gap-1.5 border border-cyan-500/30 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span className="hidden sm:inline">{isRTL ? 'طباعة العرض' : 'Print Deck'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Slide Stage (16:9 Presentation Canvas Aspect) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070a12] flex flex-col justify-center items-center">
          <div className="w-full max-w-3xl rounded-2xl bg-gradient-to-br from-[#101728] via-[#0d1222] to-[#080c18] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-start">
            
            {/* Slide Ambient Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Slide Header */}
            <div className="relative z-10 flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold tracking-wider">
                  {slide.phase}
                </span>
                <h2 className="text-base sm:text-xl font-black text-white tracking-tight mt-1">
                  {isRTL ? slide.titleAr : slide.titleEn}
                </h2>
                <p className="text-xs text-cyan-200/80">
                  {isRTL ? slide.subtitleAr : slide.subtitleEn}
                </p>
              </div>

              <div className="text-end shrink-0">
                <div className="text-[10px] text-gray-400 font-mono">
                  {isRTL ? currentProfile.nameAr : currentProfile.nameEn}
                </div>
                <div className="text-[9px] text-cyan-400 font-mono">
                  {isRTL ? currentProfile.titleAr : currentProfile.titleEn}
                </div>
              </div>
            </div>

            {/* 3 Strategic Pillars Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 my-5">
              {slide.pillars.map((p, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#131b2e]/90 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                      <span className="material-symbols-outlined text-[18px]">{p.icon}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {isRTL ? p.headingAr : p.headingEn}
                    </h4>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed pt-1 border-t border-white/5">
                    {isRTL ? p.textAr : p.textEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Slide Footer */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span>KINGDOM OF SAUDI ARABIA • EXECUTIVE TRANSFORMATION</span>
              <span>SLIDE {currentSlide + 1} OF {slides.length}</span>
            </div>

          </div>
        </div>

        {/* Slide Navigation Dock */}
        <div className="print:hidden px-4 py-3 bg-[#111728] border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          
          {/* Thumbnails */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'bg-cyan-400 text-[#002d33] shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

          {/* Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-lg bg-[#192236] hover:bg-[#222f49] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">
                {isRTL ? 'arrow_forward' : 'arrow_back'}
              </span>
              <span>{isRTL ? 'الشريحة السابقة' : 'Previous'}</span>
            </button>

            <button
              disabled={currentSlide === slides.length - 1}
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 text-[#002d33] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <span>{isRTL ? 'الشريحة التالية' : 'Next'}</span>
              <span className="material-symbols-outlined text-[15px]">
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
