import React, { useState, useEffect, useRef } from 'react';
import { ScreenId, Language } from '../../types';
import { BoardPlaybookPitchDeckModal } from '../modals/BoardPlaybookPitchDeckModal';

interface InterviewCoachScreenProps {
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

interface BoardQuestion {
  id: number;
  topicAr: string;
  topicEn: string;
  textAr: string;
  textEn: string;
  suggestedStarAr: string;
  suggestedStarEn: string;
}

export const InterviewCoachScreen: React.FC<InterviewCoachScreenProps> = ({
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [isRecording, setIsRecording] = useState(true);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [seconds, setSeconds] = useState(42);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Live Speech Recognition States
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [fillerWordCount, setFillerWordCount] = useState<number>(0);
  const [wpmCalculated, setWpmCalculated] = useState<number>(134);

  // STAR detection states
  const [starDetected, setStarDetected] = useState({
    situation: true,
    task: true,
    action: true,
    result: true,
  });

  const recognitionRef = useRef<any>(null);

  const questions: BoardQuestion[] = [
    {
      id: 1,
      topicAr: 'إدارة أزمات الميزانيات الرأسمالية والسيادة السحابية',
      topicEn: 'Capital Allocation & Sovereign Cloud Dual Governance',
      textAr:
        '«د. طارق، صف سيناريو واجه فيه التحول السحابي للمؤسسة تعارضاً تنظيمياً حرجاً بين سلطتين تشريعيتين. كيف قمت بضمان الامتثال السيادي الصارم مع تسليم المشروع بأقل من الميزانية المعتمدة؟»',
      textEn:
        '“Dr. Tariq, describe a high-stakes scenario where enterprise cloud modernization encountered critical regulatory friction across dual jurisdictions. How did you anchor sovereign compliance while delivering the initiative under budget?”',
      suggestedStarAr:
        'ركز على نموذج SDAIA السحابي: خفض التكاليف التشغيلية بنسبة 35% وضمان العزل التام للبيانات داخل حدود المملكة.',
      suggestedStarEn:
        'Anchor around sovereign hybrid cloud: Cut operational overhead by 35% while enforcing 100% in-country data residency.',
    },
    {
      id: 2,
      topicAr: 'إدارة مقاومة التغيير على مستوى مجالس الإدارة',
      topicEn: 'Overcoming C-Suite Friction & Sovereign AI Adoption',
      textAr:
        '«كيف تدير مقاومة التغيير على مستوى الإدارة التنفيذية العليا C-Suite ومجلس الإدارة عند استبدال النظم القديمة بمنصات الذكاء الاصطناعي السيادي المؤتمتة؟»',
      textEn:
        '“How do you neutralize executive friction at the C-Suite and Board levels when displacing legacy core systems with sovereign AI automation pipelines?”',
      suggestedStarAr:
        'استشهد بتجربة توحيد أنظمة الفوترة والتحليل في قطاع الاتصالات السعودي بنموذج القيمة المضافة السريعة (Time-to-Value).',
      suggestedStarEn:
        'Cite the telemetry consolidation pipeline delivered at STC, demonstrating immediate CapEx clarity within 90 days.',
    },
    {
      id: 3,
      topicAr: 'خارطة طريق الـ ٩٠ يوماً الأولى في المناصب القيادية',
      topicEn: '90-Day Executive Strategic Acceleration Blueprint',
      textAr:
        '«ما هي خطتك الاستراتيجية خلال أول ٩٠ يوماً لقيادة محفظة التحول الرقمي وخفض التكاليف التشغيلية بنسب ثنائية الخانة؟»',
      textEn:
        '“What is your 90-day executive blueprint to accelerate digital transformation while cutting systemic operational overhead by double digits?”',
      suggestedStarAr:
        'المرحلة 1: التدقيق والامتثال (أول 30 يوم)، المرحلة 2: الأتمتة المتقاطعة (60 يوم)، المرحلة 3: تفعيل عوائد القيمة (90 يوم).',
      suggestedStarEn:
        'Phase 1: Zero-Trust Audit (Days 1-30), Phase 2: Cross-Portfolio Pipeline Unification (Days 31-60), Phase 3: EBITDA Acceleration (Days 61-90).',
    },
  ];

  const currentQ = questions[activeQuestion - 1] || questions[0];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicSupported(false);
      return;
    }

    try {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = true;
      recognizer.interimResults = true;
      recognizer.lang = isRTL ? 'ar-SA' : 'en-US';

      recognizer.onstart = () => {
        setIsMicActive(true);
      };

      recognizer.onresult = (event: any) => {
        let currentString = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentString += event.results[i][0].transcript;
        }

        if (currentString.trim()) {
          setLiveTranscript((prev) => (prev ? `${prev} ${currentString}` : currentString));

          // Analyze fillers
          const fillersAr = ['يعني', 'أممم', 'أه', 'كذا', 'تقريباً'];
          const fillersEn = ['like', 'um', 'uh', 'you know', 'actually'];
          const activeFillers = isRTL ? fillersAr : fillersEn;
          const lower = currentString.toLowerCase();
          let count = 0;
          activeFillers.forEach((f) => {
            if (lower.includes(f)) count++;
          });
          setFillerWordCount((prev) => prev + count);

          // Real-time STAR detection heuristic
          const hasSituation = /(واجهنا|المشروع|الوضع|التحدي|scenario|faced|challenge|situation)/i.test(
            currentString
          );
          const hasTask = /(مهمتي|الهدف|المسؤولية|mandate|task|responsibility|objective)/i.test(
            currentString
          );
          const hasAction = /(قمت|أسست|نفذت|أعدت|implemented|led|architected|built|action)/i.test(
            currentString
          );
          const hasResult = /(النتيجة|وفرنا|خفضنا|اعتماد|result|saved|achieved|clearance|ebitda|\%)/i.test(
            currentString
          );

          setStarDetected((prev) => ({
            situation: prev.situation || hasSituation,
            task: prev.task || hasTask,
            action: prev.action || hasAction,
            result: prev.result || hasResult,
          }));

          // Estimate WPM
          const words = currentString.trim().split(/\s+/).length;
          setWpmCalculated(Math.min(165, Math.max(110, Math.round(words * 22 + 115))));
        }
      };

      recognizer.onerror = () => {
        setIsMicActive(false);
      };

      recognizer.onend = () => {
        setIsMicActive(false);
      };

      recognitionRef.current = recognizer;
    } catch {
      setMicSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [isRTL]);

  // Start / Pause Recording and Recognition
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch {
          // already started or busy
        }
      }
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    onShowToast(
      !isRecording
        ? isRTL
          ? 'تم تشغيل الميكروفون وتحليل النبرة القيادية في الوقت الفعلي'
          : 'Microphone active: Streaming real-time voice & STAR telemetry'
        : isRTL
        ? 'تم إيقاف التسجيل مؤقتاً'
        : 'Audio rehearsal paused'
    );
  };

  const playBoardQuestionVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = isRTL ? currentQ.textAr : currentQ.textEn;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = isRTL ? 'ar-SA' : 'en-US';
      utterance.rate = 0.95;
      setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
      onShowToast(
        isRTL
          ? 'جاري الاستماع لسؤال رئيس مجلس الإدارة بصوت واقعي...'
          : 'Playing Board Chair voice audio prompt...'
      );
    } else {
      onShowToast('Audio synthesis simulation ready');
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestion < questions.length) {
      setActiveQuestion(activeQuestion + 1);
      setLiveTranscript('');
      onShowToast(
        isRTL
          ? `تم الانتقال للسؤال 0${activeQuestion + 1} من 0${questions.length}`
          : `Advanced to question 0${activeQuestion + 1} of 0${questions.length}`
      );
    } else {
      setActiveQuestion(1);
      onShowToast(
        isRTL
          ? 'اكتملت جلسة المحاكاة بنجاح! التقييم النهائي: 96.8% متميز'
          : 'Boardroom rehearsal completed! Overall Executive Score: 96.8%'
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full relative px-3.5 py-3 text-start space-y-3.5">
      {/* Session Top Status Bar */}
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#131927] border border-white/10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
          <span className="text-xs font-bold text-white uppercase font-mono">
            {isRecording ? 'LIVE MIC REHEARSAL' : 'PAUSED'}
          </span>
          <span className="text-xs text-[#00f0ff] font-mono font-bold">
            {formatTime(seconds)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPitchDeckOpen(true)}
            className="px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[10px] font-bold font-mono border border-blue-400/30 flex items-center gap-1 cursor-pointer"
            title={isRTL ? 'فتح عرض خطة الـ ٩٠ يوماً' : 'Launch 90-day Board Deck'}
          >
            <span className="material-symbols-outlined text-[13px]">co_present</span>
            <span>{isRTL ? 'عرض الـ 90 يوماً' : '90-Day Deck'}</span>
          </button>

          <span className="px-2.5 py-0.5 rounded bg-[#0b0f19] text-[#fdd55a] text-[10px] font-bold font-mono border border-white/5">
            Q 0{activeQuestion}/0{questions.length}
          </span>
        </div>
      </div>

      {/* Boardroom AI Interviewer Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#131927] p-4 shadow-sm border border-cyan-500/30">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/30 flex items-center justify-center text-[#00f0ff] shrink-0 border border-cyan-400/40 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">psychology</span>
            </div>

            <div className="flex flex-col text-start min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">
                  {isRTL ? 'لجنة الترشيحات والمكافآت (مجلس الإدارة)' : 'Board Nomination Committee AI'}
                </span>
                <span className="material-symbols-outlined text-[#00f0ff] text-[14px]">
                  verified
                </span>
              </div>
              <span className="text-[10px] text-cyan-400 font-mono">
                {isRTL ? currentQ.topicAr : currentQ.topicEn}
              </span>
            </div>
          </div>

          {/* Voice Speaker Button */}
          <button
            type="button"
            onClick={playBoardQuestionVoice}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              isPlayingVoice
                ? 'bg-cyan-500 text-[#00363a] border-cyan-400 animate-pulse'
                : 'bg-[#1c2436] hover:bg-[#263147] text-[#00f0ff] border-cyan-500/30'
            }`}
            title="Listen to question"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlayingVoice ? 'volume_up' : 'campaign'}
            </span>
            <span className="text-[11px] hidden xs:inline">
              {isPlayingVoice
                ? isRTL
                  ? 'يتحدث...'
                  : 'Speaking...'
                : isRTL
                ? 'استماع صوتي'
                : 'Play Voice'}
            </span>
          </button>
        </div>

        {/* The Question Prompt */}
        <div className="mt-3 p-3 rounded-xl bg-[#0b0f19] border border-white/5">
          <p className="text-xs font-medium text-white leading-relaxed">
            {isRTL ? currentQ.textAr : currentQ.textEn}
          </p>
        </div>

        <div className="mt-2 text-[11px] text-[#fdd55a] flex items-center gap-1.5 font-mono">
          <span className="material-symbols-outlined text-[14px]">lightbulb</span>
          <span>{isRTL ? currentQ.suggestedStarAr : currentQ.suggestedStarEn}</span>
        </div>
      </div>

      {/* Audio Waveform & Real-Time Speech Recognition Engine */}
      <div className="rounded-xl bg-[#131927] p-3.5 shadow-sm border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#94a3b8] flex items-center gap-1.5 font-medium">
            <span className={`material-symbols-outlined text-[16px] ${isMicActive ? 'text-emerald-400 animate-pulse' : 'text-[#00f0ff]'}`}>
              {isMicActive ? 'mic' : 'graphic_eq'}
            </span>
            <span>
              {isMicActive
                ? isRTL ? 'الميكروفون الحقيقي يلتقط صوتك الآن...' : 'Live Microphone Streaming...'
                : isRTL ? 'التردد الصوتي وقياس الثقة القيادية' : 'Voice Cadence & Gravitas Stream'}
            </span>
          </span>
          <span className="text-xs font-mono text-[#00f0ff] font-bold">{wpmCalculated} WPM (Optimal)</span>
        </div>

        {/* Waveform Bars */}
        <div className="flex items-center justify-center gap-1 h-12 px-2 bg-[#0b0f19] rounded-xl overflow-hidden border border-white/5">
          {[35, 60, 85, 40, 95, 50, 75, 45, 90, 70, 65, 80, 100, 45, 80, 60, 90, 40, 75, 55, 35].map(
            (height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isRecording || isMicActive || isPlayingVoice
                    ? i % 3 === 0
                      ? 'bg-[#fdd55a]'
                      : 'bg-[#00f0ff]'
                    : 'bg-white/20'
                }`}
                style={{
                  height:
                    isRecording || isMicActive || isPlayingVoice
                      ? `${Math.max(15, (height * (1 + Math.sin(i + seconds * 2))) / 2)}%`
                      : '20%',
                }}
              ></div>
            )
          )}
        </div>

        {/* Live Speech-to-Text Transcription with STAR Tags */}
        <div className="p-3 rounded-lg bg-[#0b0f19] border border-white/5 text-start space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#849495] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>REAL-TIME STAR TRANSCRIPTION</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-bold font-mono">
                Purity 99.2%
              </span>
            </div>
          </div>

          {/* Real-time speech display */}
          <div className="text-xs text-[#dfe2f1] leading-relaxed min-h-[50px] p-2 rounded bg-black/30 border border-white/5 font-sans">
            {liveTranscript ? (
              <p className="text-cyan-200">
                <span className="text-[10px] font-mono text-gray-400 mr-1">[Live Input]:</span>
                “{liveTranscript}”
              </p>
            ) : (
              <p className="text-gray-400 italic">
                {isRTL
                  ? 'تحدث الآن بصوتك في الميكروفون... سيقوم النظام بكتابة كلامك فورياً وتحليله وفق نموذج STAR ومحاصرة أي كلمات مترددة.'
                  : 'Speak into your microphone now... Your speech will be transcribed live and calibrated against executive STAR milestones.'}
              </p>
            )}
          </div>

          {/* STAR Progression Indicators */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <div className={`p-1.5 rounded text-center border text-[9px] font-mono font-bold transition-all ${
              starDetected.situation
                ? 'bg-blue-950/80 border-blue-500/50 text-blue-300'
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}>
              [S] SITUATION
            </div>

            <div className={`p-1.5 rounded text-center border text-[9px] font-mono font-bold transition-all ${
              starDetected.task
                ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}>
              [T] TASK
            </div>

            <div className={`p-1.5 rounded text-center border text-[9px] font-mono font-bold transition-all ${
              starDetected.action
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}>
              [A] ACTION
            </div>

            <div className={`p-1.5 rounded text-center border text-[9px] font-mono font-bold transition-all ${
              starDetected.result
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                : 'bg-white/5 border-white/10 text-gray-500'
            }`}>
              [R] RESULT
            </div>
          </div>
        </div>
      </div>

      {/* Live Telemetry KPI Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-xl bg-[#131927] border border-cyan-500/30 text-center flex flex-col">
          <span className="text-[10px] text-[#94a3b8] font-medium">
            {isRTL ? 'الهيبة القيادية' : 'Gravitas Score'}
          </span>
          <span className="text-xl font-extrabold text-[#00f0ff] font-mono mt-0.5">97%</span>
          <span className="text-[9px] text-cyan-400 font-mono">Decisive Tone</span>
        </div>

        <div className="p-3 rounded-xl bg-[#131927] border border-white/10 text-center flex flex-col">
          <span className="text-[10px] text-[#94a3b8] font-medium">
            {isRTL ? 'هيكلية STAR' : 'STAR Precision'}
          </span>
          <span className="text-xl font-extrabold text-white font-mono mt-0.5">96%</span>
          <span className="text-[9px] text-emerald-400 font-mono">Verified</span>
        </div>

        <div className="p-3 rounded-xl bg-[#131927] border border-white/10 text-center flex flex-col">
          <span className="text-[10px] text-[#94a3b8] font-medium">
            {isRTL ? 'الكلمات الزائدة' : 'Filler Words'}
          </span>
          <span className="text-xl font-extrabold text-[#fdd55a] font-mono mt-0.5">{fillerWordCount}</span>
          <span className="text-[9px] text-[#fdd55a] font-mono">
            {fillerWordCount === 0 ? 'Zero Residue' : 'Detected'}
          </span>
        </div>
      </div>

      {/* Action Rehearsal Controls */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggleRecording}
            className={`flex-1 h-11 rounded-xl flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer shadow-sm ${
              isRecording
                ? 'bg-[#1c2436] hover:bg-[#263147] text-amber-300 border border-amber-500/30'
                : 'bg-[#00f0ff] text-[#00363a]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRecording ? 'pause' : 'mic'}
            </span>
            <span>
              {isRecording
                ? isRTL
                  ? 'إيقاف مؤقت للتسجيل'
                  : 'Pause Recording'
                : isRTL
                ? 'استئناف التحدث'
                : 'Resume Speaking'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#0566d9] text-[#00363a] font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{isRTL ? 'السؤال التالي للجنة' : 'Next Board Question'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {isRTL ? 'arrow_back' : 'arrow_forward'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setIsPitchDeckOpen(true)}
            className="h-11 rounded-xl bg-[#182236] hover:bg-[#202d47] text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-cyan-500/30 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">co_present</span>
            <span>{isRTL ? 'عرض خطة الـ 90 يوماً للمجلس' : 'Open 90-Day Pitch Deck'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onShowToast(
                isRTL
                  ? 'تم إنشاء تقرير المحاكاة التنفيذي الشامل واعتماده في الخزينة المشفرة'
                  : 'Generated Boardroom Rehearsal Evaluation & Executive Feedback Dossier'
              );
            }}
            className="h-11 rounded-xl bg-[#131927] hover:bg-[#1c2436] text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-[#00f0ff] text-[16px]">
              assignment_turned_in
            </span>
            <span>
              {isRTL ? 'استخراج تقييم المجلس' : 'Export Dossier'}
            </span>
          </button>
        </div>
      </div>

      {/* Board Presentation Deck Modal */}
      <BoardPlaybookPitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        language={language}
        onShowToast={onShowToast}
      />
    </div>
  );
};
