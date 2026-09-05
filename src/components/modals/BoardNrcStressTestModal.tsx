import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { useExecutive } from '../../context/ExecutiveContext';

interface BoardNrcStressTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

interface StressScenario {
  id: string;
  committeeMemberAr: string;
  committeeMemberEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string;
  questionAr: string;
  questionEn: string;
  trapAr: string;
  trapEn: string;
  idealPivotAr: string;
  idealPivotEn: string;
  keyMetrics: string[];
}

export const BoardNrcStressTestModal: React.FC<BoardNrcStressTestModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const { currentProfile } = useExecutive();

  const scenarios: StressScenario[] = [
    {
      id: 'sc-1',
      committeeMemberAr: 'معالي م. خالد التويجري',
      committeeMemberEn: 'H.E. Eng. Khalid Al-Tuwaijri',
      roleAr: 'رئيس لجنة المراجعة والمخاطر بالمجلس',
      roleEn: 'Chair of Board Audit & Risk Committee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      questionAr:
        'طلبتم ميزانية تقنية أولية قدرها 350 مليون ريال، بينما العائد على رأس المال التشغيلي لا يظهر أي نقطة تعادل قبل 3 سنوات. كيف تبرر للجنة المكافآت عدم ربط 60% من راتبك بنتائج السنة الأولى فقط؟',
      questionEn:
        'You requested an initial tech allocation of SAR 350M, yet operational RoE shows no breakeven prior to Year 3. How do you justify to the NRC why 60% of your compensation should not be strictly tied to Year 1 cash flow?',
      trapAr: 'الفخ: اتخاذ موقف دفاعي أو التشكيك في أرقام اللجنة المالية.',
      trapEn: 'The Trap: Becoming defensive or challenging the Audit Committee’s mathematical conservatism.',
      idealPivotAr:
        'التحول الذكي: الترحيب بالربط بالأداء مع إعادة صياغة الـ 350 مليون كأصل سيادي مدر للدخل يقلل تكلفة الاستشارات الخارجية بنسبة 42%، واقتراح تجزئة الصرف على مراحل (Milestone-Gated Tranches).',
      idealPivotEn:
        'Strategic Pivot: Welcome performance indexing enthusiastically; reframe the SAR 350M as a sovereign balance-sheet asset eliminating 42% external advisory leakage, and offer milestone-gated capital tranches.',
      keyMetrics: ['CapEx Phasing', 'Advisory Leakage -42%', 'Milestone Tranches'],
    },
    {
      id: 'sc-2',
      committeeMemberAr: 'د. ليلى الفايز',
      committeeMemberEn: 'Dr. Laila Al-Fayez',
      roleAr: 'ممثلة صندوق الاستثمارات العامة (PIF Nominee)',
      roleEn: 'PIF Nominated Director',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      questionAr:
        'سيرتك الذاتية تبرز نجاحات في بيئات عمل مؤسسية تقليدية، ومشاريعنا هنا تتطلب وتيرة تنفيذ يومية وتغييرات تشريعية جذرية كل أسبوع. ما الذي يضمن لنا أنك لن تتعثر في أول 90 يوماً من الاصطدام بالبيروقراطية الميدانية؟',
      questionEn:
        'Your background reflects traditional blue-chip corporate pace. Our giga-mandate requires weekly legislative adaptations and brutal execution sprints. What guarantees you won’t stall out during the first 90 days of operational friction?',
      trapAr: 'الفخ: سرد الشهادات أو الخبرات السابقة دون ذكر أمثلة مرونة ميدانية.',
      trapEn: 'The Trap: Reciting tenure credentials without demonstrating rapid situational agility and crisis tolerance.',
      idealPivotAr:
        'التحول الذكي: استعراض تجربة إدارة أزمة حقيقية في أرامكو قادت لتوفير 110 مليون ريال تحت ضغط زمني 45 يوماً، مع تأكيد امتلاك خطة الـ 90 يوماً الجاهزة للتدشين من اليوم الأول.',
      idealPivotEn:
        'Strategic Pivot: Cite high-tempo crisis management delivering SAR 110M under 45-day operational stress; present pre-structured Day-1 governance pods.',
      keyMetrics: ['45-Day Crisis Sprint', 'Agile Pods', 'Zero-Delay Governance'],
    },
    {
      id: 'sc-3',
      committeeMemberAr: 'الشيخ فهد بن سلطان العتيبي',
      committeeMemberEn: 'Sheikh Fahad Al-Otaibi',
      roleAr: 'عضو مستقل ورئيس لجنة الترشيحات والمكافآت (NRC)',
      roleEn: 'Independent Director & NRC Committee Chair',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      questionAr:
        'إذا نشب خلاف حاد بين رؤيتك الاستراتيجية وبين توجيهات الشركاء الدوليين في التحالف، هل ستضحي بالجدول الزمني لحماية السيادة الرقمية أم ستمرر التنازلات لإرضاء المستثمرين؟',
      questionEn:
        'If an irreconcilable conflict emerges between your digital strategy and international consortium demands, will you sacrifice timeline to defend sovereign data sovereignty or make concessions to preserve investor relations?',
      trapAr: 'الفخ: الإجابة بأحد النقيضين وتجاهل الحوكمة المزدوجة.',
      trapEn: 'The Trap: Giving a binary answer that ignores the sovereign mandate vs stakeholder fiduciary duality.',
      idealPivotAr:
        'التحول الذكي: إعلان السيادة الوطنية خطاً أحمر دستورياً، مع تقديم هندسة معمارية موزعة تتيح للمستثمرين الوصول لبياناتهم دون المساس بالسيادة الوطنية للبيانات.',
      idealPivotEn:
        'Strategic Pivot: Declare national sovereignty non-negotiable by mandate; present federated enclave architecture granting investors secure access without territorial data compromise.',
      keyMetrics: ['Zero-Trust Enclaves', 'Sovereign Priority', 'Consortium Diplomacy'],
    },
  ];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [heartRate, setHeartRate] = useState(74);
  const [composureScore, setComposureScore] = useState(92);
  const [showAIRebuttal, setShowAIRebuttal] = useState(false);
  const [userSpeechDraft, setUserSpeechDraft] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const scenario = scenarios[activeScenarioIdx];

  // Timer countdown simulation
  useEffect(() => {
    if (!isOpen || !isTimerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
      // Fluctuate heart rate and composure
      setHeartRate((prev) => Math.min(115, Math.max(68, prev + (Math.random() > 0.5 ? 2 : -1))));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning]);

  const handleNextScenario = () => {
    const nextIdx = (activeScenarioIdx + 1) % scenarios.length;
    setActiveScenarioIdx(nextIdx);
    setTimeLeft(45);
    setIsTimerRunning(true);
    setShowAIRebuttal(false);
    setUserSpeechDraft('');
    setHeartRate(72);
    setComposureScore(94);
  };

  const toggleMic = () => {
    if (isRecording) {
      setIsRecording(false);
      onShowToast(isRTL ? 'تم إنهاء التسجيل وتحليل النبرة' : 'Voice recorded and gravitas evaluated');
    } else {
      setIsRecording(true);
      onShowToast(isRTL ? 'الميكروفون نشط.. تحدث بهدوء وثبات' : 'Microphone active.. speak with composure');
      // Simulate speech capture draft if Web Speech API isn't active
      if (!userSpeechDraft) {
        setTimeout(() => {
          setUserSpeechDraft(
            isRTL
              ? 'أشكر سعادة رئيس اللجنة على هذا السؤال الجوهري. في الواقع، الميزانية المقترحة ليست تكلفة استهلاكية بل أصل استراتيجي يُمكّن المنظومة من خفض تسريب النفقات الخارجية...'
              : 'I appreciate the Chair’s critical precision on capital allocation. In fact, this expenditure is structured as an income-generating sovereign asset that reduces external advisory leakage...'
          );
          setComposureScore(96);
          setHeartRate(71);
        }, 1500);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-2xl bg-[#0c101a] border border-red-500/30 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(239,68,68,0.15)] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 bg-[#111726] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {isRTL ? 'محاكي اختبار الضغط لمجلس الإدارة (NRC Stress-Test)' : 'Board NRC Stress-Test Simulator'}
                </h3>
                <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 font-mono text-[9px] font-bold animate-pulse">
                  HIGH PRESSURE
                </span>
              </div>
              <p className="text-[10px] text-[#94a3b8]">
                {isRTL ? 'محاكاة الأسئلة العدائية ولجان الترشيحات والمكافآت' : 'Hostile Inquiries & Board Nomination Interrogation'}
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

        {/* Live Telemetry Banner */}
        <div className="px-4 py-2 bg-[#080c14] border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            {/* Heart Rate */}
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-red-400 animate-pulse">favorite</span>
              <span className="text-white font-bold">{heartRate}</span>
              <span className="text-[10px] text-gray-400">BPM</span>
            </div>

            {/* Composure */}
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-cyan-400">psychology</span>
              <span className="text-white font-bold">{composureScore}%</span>
              <span className="text-[10px] text-gray-400">{isRTL ? 'رباطة الجأش' : 'Composure'}</span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold ${
            timeLeft <= 10 ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-ping' : 'bg-white/5 text-yellow-400'
          }`}>
            <span className="material-symbols-outlined text-[14px]">timer</span>
            <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Questioner Card */}
          <div className="p-3.5 rounded-xl bg-[#141b2b] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={scenario.avatar}
                  alt="Board Member"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="text-xs font-bold text-white">
                    {isRTL ? scenario.committeeMemberAr : scenario.committeeMemberEn}
                  </div>
                  <div className="text-[10px] text-cyan-300">
                    {isRTL ? scenario.roleAr : scenario.roleEn}
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-400 font-mono">
                Case {activeScenarioIdx + 1}/{scenarios.length}
              </span>
            </div>

            {/* Inquisitive Quote */}
            <div className="p-3 rounded-lg bg-[#0a0e18] border-l-2 border-red-500 text-xs sm:text-sm text-gray-200 leading-relaxed italic">
              "{isRTL ? scenario.questionAr : scenario.questionEn}"
            </div>

            {/* The Trap Alert */}
            <div className="p-2 rounded-lg bg-red-950/30 border border-red-500/30 text-[11px] text-red-300 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-red-400 shrink-0">warning</span>
              <span>{isRTL ? scenario.trapAr : scenario.trapEn}</span>
            </div>
          </div>

          {/* User Answer / Live Microphone Interface */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                {isRTL ? 'إجابتك القيادية المحكمة' : 'Your Executive Response'}
              </span>
              <button
                onClick={toggleMic}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                    : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isRecording ? 'graphic_eq' : 'mic'}
                </span>
                <span>{isRecording ? (isRTL ? 'جاري الاستماع...' : 'Listening...') : (isRTL ? 'تحدث بالميكروفون' : 'Use Mic')}</span>
              </button>
            </div>

            <textarea
              value={userSpeechDraft}
              onChange={(e) => setUserSpeechDraft(e.target.value)}
              placeholder={
                isRTL
                  ? 'اكتب أو انطق إجابتك هنا بدقة متناهية ودون تبرير انفعالي...'
                  : 'Speak or type your structured executive response without defensive tone...'
              }
              rows={3}
              className="w-full p-3 rounded-xl bg-[#090d16] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 leading-relaxed resize-none"
            />
          </div>

          {/* AI Strategic Rebuttal Blueprint (Expandable) */}
          <div className="rounded-xl bg-[#111728] border border-cyan-500/30 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-cyan-400">lightbulb</span>
                <span className="text-xs font-bold text-white">
                  {isRTL ? 'هندسة الرد المثالي من "منارة AI"' : 'Manarah AI Strategic Rebuttal'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAIRebuttal(!showAIRebuttal)}
                className="text-xs text-cyan-300 hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>{showAIRebuttal ? (isRTL ? 'إخفاء' : 'Hide') : (isRTL ? 'كشف الاستراتيجية' : 'Reveal Blueprint')}</span>
                <span className="material-symbols-outlined text-[14px]">
                  {showAIRebuttal ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {showAIRebuttal && (
              <div className="pt-2 border-t border-white/10 space-y-2.5 text-xs animate-in fade-in duration-150">
                <p className="text-[#c7d2fe] leading-relaxed">
                  {isRTL ? scenario.idealPivotAr : scenario.idealPivotEn}
                </p>

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[10px] text-gray-400 font-mono">
                    {isRTL ? 'المحاور الإلزامية:' : 'Anchoring Keywords:'}
                  </span>
                  {scenario.keyMetrics.map((k, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 bg-[#111726] border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setIsTimerRunning(!isTimerRunning);
              onShowToast(isTimerRunning ? 'تم إيقاف المؤقت مؤقتاً' : 'استئناف اختبار الضغط');
            }}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-white/10"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isTimerRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{isTimerRunning ? (isRTL ? 'إيقاف مؤقت' : 'Pause') : (isRTL ? 'استئناف' : 'Resume')}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextScenario}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <span>{isRTL ? 'السؤال الهجومي التالي' : 'Next Board Stress-Test'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isRTL ? 'arrow_back' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
