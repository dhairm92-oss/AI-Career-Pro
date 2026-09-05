import React, { useState } from 'react';
import { Language } from '../../types';

interface ExecutiveAiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (msg: string) => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  tag?: string;
}

export const ExecutiveAiCopilotModal: React.FC<ExecutiveAiCopilotModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const isRTL = language === 'ar';
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeakReplies, setAutoSpeakReplies] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: isRTL
        ? 'أهلاً بك د. طارق. أنا "منارة"، مستشارك التنفيذي السيادي المدعوم بنماذج الاستشراف المهني المتقدم لمشاريع رؤية 2030 وصناديق الثروة السيادية. كيف يمكنني مساندتك اليوم في تعزيز مكانتك القيادية؟'
        : 'Welcome Dr. Tariq. I am "Manarah", your sovereign executive AI copilot optimized for Vision 2030 leadership mandates and sovereign wealth portfolios. How may I advance your executive trajectory today?',
      timestamp: '10:00 AM',
      tag: 'C-SUITE ADVISORY',
    },
  ]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isRTL ? 'ar-SA' : 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleContinuousVoice = () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      stopSpeaking();
      onShowToast(isRTL ? 'تم إيقاف وضع المحادثة الصوتية المستمرة' : 'Continuous voice chat deactivated');
    } else {
      setIsVoiceActive(true);
      onShowToast(
        isRTL
          ? 'المحادثة الصوتية الحية نشطة.. تحدث وسأجيبك صوتياً'
          : 'Live Executive Voice Active.. Speak freely in AR or EN'
      );
      // Try Web Speech Recognition if available
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = isRTL ? 'ar-SA' : 'en-US';
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
              handleSend(transcript);
            }
          };
          recognition.onerror = () => {
            setIsVoiceActive(false);
          };
          recognition.start();
        } catch {
          // fallback
        }
      }
    }
  };

  if (!isOpen) return null;

  const quickPrompts = isRTL
    ? [
        '📊 تقييم سقف الراتب والمكافآت القيادية (C-Level Benchmark)',
        '🎯 صياغة إنجاز التحول الرقمي بقيمة 240 مليون ريال',
        '🏛️ إعداد محاور العرض أمام مجلس إدارة صندوق الاستثمارات العامة',
        '⚡ فحص التوافق القيادي مع مشاريع نيوم (NEOM Digital)',
      ]
    : [
        '📊 Benchmark my Executive Compensation (C-Suite GCC)',
        '🎯 Reframe SAR 240M Digital Transformation Achievement',
        '🏛️ Boardroom Pitch Strategies for Sovereign Funds',
        '⚡ NEOM Digital Leadership ATS Gap Diagnostic',
      ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      if (text.includes('الراتب') || text.includes('Compensation') || text.includes('Benchmark')) {
        aiResponseText = isRTL
          ? 'بناءً على موقعك كـ Chief Digital Transformation Officer وخبرتك مع أرامكو والاتصالات: النطاق التنفيذي المستحق يتراوح بين 135,000 و 175,000 ريال شهرياً، مع حزمة أسهم LTI ومكافأة أداء سنوية 30-40% لمشاريع صندوق الاستثمارات العامة.'
          : 'Based on your profile as Chief Digital Officer with Aramco/STC pedigree: The median GCC compensation bracket for this tier is SAR 135,000 - SAR 175,000 / month, paired with a 30-40% annual performance multiplier and LTI sovereign retention units.';
      } else if (text.includes('نيوم') || text.includes('NEOM')) {
        aiResponseText = isRTL
          ? 'تم مطابقة ملفك مع متطلبات قطاع NEOM Tech & Digital: نسبة التوافق الحالية 94.8%. أنصح بإبراز خبرتك في المدن الذكية الموزعة وعزل البيانات السيادية في القسم الأول من السيرة الذاتية.'
          : 'Matching your profile against NEOM Tech & Digital mandates: Compatibility is 94.8%. Recommended action: Front-load your hybrid cloud sovereign data residency expertise in your executive summary.';
      } else if (text.includes('مجلس') || text.includes('Boardroom') || text.includes('صندوق')) {
        aiResponseText = isRTL
          ? 'عند التحدث أمام مجلس الإدارة، تجنب المصطلحات التقنية البحتة وركز على 3 ركائز: عائد الاستثمار الرأسمالي (CapEx/OpEx Efficiency)، الحوكمة السيادية (Sovereign Compliance)، والتسريع الزمني (Time-to-Value) بمعدل لا يقل عن 35%.'
          : 'In front of the Board, avoid granular tech jargon. Anchor your narrative around 3 pillars: Capital Allocation Efficiency, Sovereign Risk Mitigation, and Accelerated Delivery Time-to-Value (minimum 35% target).';
      } else {
        aiResponseText = isRTL
          ? `تمت معالجة استفسارك القيادي بنجاح. وفق معايير الحوكمة القيادية العالمية، قمت بتحديث سجل الرؤية الاستراتيجية لديك ومطابقتها مع خوارزميات الاستقطاب التنفيذي المباشر.`
          : `Processed your executive query. In accordance with executive talent benchmarks, your leadership narrative has been aligned with top-tier sovereign recruiter telemetry.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          tag: 'EXECUTIVE INTELLIGENCE',
        },
      ]);
      setIsTyping(false);
      if (autoSpeakReplies || isVoiceActive) {
        speakText(aiResponseText);
      }
      onShowToast(isRTL ? 'استجابة منارة الذكية جاهزة' : 'Manarah AI Insight Generated');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#0f172a] via-[#0b101e] to-[#070a14] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col h-[620px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#131d2e] border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-[#00f0ff] shadow-sm">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0f172a]"></span>
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">
                  {isRTL ? 'المستشار التنفيذي "منارة AI"' : 'Manarah AI Executive Copilot'}
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-[#00f0ff] border border-cyan-500/40 font-bold">
                  AIR-GAPPED
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                {isRTL
                  ? 'ذكاء استشاري سيادي خاص بالقيادات التنفيذية ومجالس الإدارة'
                  : 'Sovereign C-Suite & Board Advisory Intelligence'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Continuous Voice Toggle */}
            <button
              type="button"
              onClick={toggleContinuousVoice}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isVoiceActive
                  ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-cyan-300 border-white/10'
              }`}
              title="Toggle Live Hands-Free Voice"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isVoiceActive ? 'graphic_eq' : 'mic'}
              </span>
              <span className="hidden sm:inline">
                {isVoiceActive ? (isRTL ? 'صوت نشط' : 'Voice Live') : (isRTL ? 'محادثة صوتية' : 'Voice')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Live Audio Telemetry Ribbon if speaking or listening */}
        {(isSpeaking || isVoiceActive) && (
          <div className="px-4 py-1.5 bg-[#0a101d] border-b border-cyan-500/30 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>
                {isSpeaking
                  ? (isRTL ? 'منارة تتحدث صوتياً...' : 'Manarah AI speaking...')
                  : (isRTL ? 'الميكروفون يستمع لصوتك...' : 'Listening for executive command...')}
              </span>
            </div>

            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="text-[11px] text-red-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">volume_off</span>
                <span>{isRTL ? 'إسكات الصوت' : 'Mute'}</span>
              </button>
            )}
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-start">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] text-gray-400 font-mono">
                {m.sender === 'ai' ? (
                  <>
                    <span className="text-cyan-400 font-bold">MANARAH AI</span>
                    {m.tag && (
                      <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 text-[9px]">
                        {m.tag}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-300">DR. TARIQ</span>
                )}
                <span>• {m.timestamp}</span>

                {m.sender === 'ai' && (
                  <button
                    type="button"
                    onClick={() => speakText(m.text)}
                    className="p-0.5 rounded hover:bg-white/10 text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    title="Play Voice Narration"
                  >
                    <span className="material-symbols-outlined text-[13px]">volume_up</span>
                  </button>
                )}
              </div>

              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-[#0566d9] text-[#00363a] font-semibold rounded-br-none shadow-md'
                    : 'bg-[#131d2e] text-gray-200 border border-white/10 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#131d2e] border border-white/10 w-fit text-xs text-cyan-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>
                {isRTL
                  ? 'منارة تحلل البيانات التنفيذية المشفرة...'
                  : 'Manarah AI analyzing sovereign telemetry...'}
              </span>
            </div>
          )}
        </div>

        {/* Quick Prompts Carousel */}
        <div className="p-2.5 bg-[#0a0f1d] border-t border-white/5 overflow-x-auto flex items-center gap-1.5">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-2.5 py-1.5 rounded-lg bg-[#141e30] hover:bg-[#1d2a42] text-[#00f0ff] text-[11px] font-medium whitespace-nowrap border border-cyan-500/20 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#111827] border-t border-white/10 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleContinuousVoice}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
              isVoiceActive
                ? 'bg-red-500 text-white border-red-400 shadow-md animate-pulse'
                : 'bg-[#0b0f19] text-cyan-400 hover:bg-white/5 border-white/10'
            }`}
            title="Speak into Microphone"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isVoiceActive ? 'graphic_eq' : 'mic'}
            </span>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              isRTL
                ? 'اسأل منارة بالصوت أو النص عن استراتيجيات الرواتب، المقابلات...'
                : 'Ask Manarah by voice or text about salary benchmarks, board pitches...'
            }
            className="flex-1 bg-[#0b0f19] border border-white/10 focus:border-cyan-400 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none transition-colors"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-[#0566d9] text-[#00363a] flex items-center justify-center font-bold hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-40 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isRTL ? 'arrow_back' : 'send'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
