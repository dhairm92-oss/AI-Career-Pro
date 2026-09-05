import React from 'react';
import { DeviceMode } from '../../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  deviceMode: DeviceMode | 'phone' | 'full';
  backgroundUrl: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  deviceMode,
  backgroundUrl,
}) => {
  // Normalize legacy props
  const mode = deviceMode === 'phone' ? 'mobile' : deviceMode === 'full' ? 'desktop' : deviceMode;

  // 1. FLUID NATIVE RESPONSIVE MODE (For direct browser viewing on actual devices)
  if (mode === 'fluid') {
    return (
      <div className="w-full min-h-[calc(100vh-60px)] flex flex-col relative bg-[#070a12]">
        <div
          className="w-full flex-1 flex flex-col relative"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.94), rgba(11, 15, 25, 0.98)), url('${backgroundUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // 2. DESKTOP EXECUTIVE WEB PORTAL (Window frame, 1150px max width)
  if (mode === 'desktop') {
    return (
      <div className="w-full max-w-5xl min-h-[calc(100vh-80px)] my-3 rounded-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.08)] overflow-hidden flex flex-col relative bg-[#0b0f19] backdrop-blur-xl">
        {/* Desktop Web Browser Titlebar */}
        <div className="w-full h-9 bg-[#121724] border-b border-white/10 px-4 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          <div className="flex items-center gap-2 px-3 py-0.5 rounded-lg bg-[#070a12] border border-white/10 text-[11px] text-[#94a3b8] font-mono">
            <span className="material-symbols-outlined text-[12px] text-emerald-400">lock</span>
            <span className="text-white font-semibold">https://</span>
            <span className="text-cyan-300">executive.sovereign.sa</span>
            <span className="text-gray-500">/c-suite/cockpit</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/20">
              DESKTOP WEB
            </span>
          </div>
        </div>

        <div
          className="w-full flex-1 flex flex-col relative overflow-y-auto"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.93), rgba(11, 15, 25, 0.97)), url('${backgroundUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // 3. TABLET / IPAD PRO MODE (768px - 820px chassis with tablet bezel)
  if (mode === 'tablet') {
    return (
      <div className="my-3 sm:my-5 flex items-center justify-center w-full px-2">
        {/* iPad Pro Chassis Frame */}
        <div className="relative w-full max-w-[768px] h-[860px] max-h-[calc(100vh-80px)] rounded-[32px] p-[10px] bg-gradient-to-b from-[#2a3140] via-[#1a1f2c] to-[#0c0f16] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.12)] border border-white/20 flex flex-col overflow-hidden">
          <div
            className="relative w-full h-full rounded-[24px] flex flex-col overflow-hidden bg-[#0b0f19] border border-black/80"
            style={{
              backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.92), rgba(11, 15, 25, 0.96)), url('${backgroundUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* iPad Status Bar */}
            <div className="w-full z-40 pt-2 px-6 pb-1.5 flex items-center justify-between text-xs font-semibold text-[#dfe2f1]/90 bg-[#0b0f19]/80 backdrop-blur-md select-none shrink-0 border-b border-white/5">
              <span className="font-mono text-[11px] font-bold tracking-tight">09:41 AM - iPad Pro</span>
              <div className="w-3 h-3 rounded-full bg-black/80 border border-white/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]/80"></span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-300 font-mono text-[9px] font-bold">
                  IPAD / TABLET
                </span>
                <span className="material-symbols-outlined text-[13px]">wifi</span>
                <span className="material-symbols-outlined text-[14px]">battery_full</span>
              </div>
            </div>

            {/* Scrollable Children Screen */}
            <div className="flex-1 flex flex-col w-full overflow-y-auto overflow-x-hidden relative">
              {children}
            </div>

            {/* Tablet Home Bar */}
            <div className="w-full py-1.5 flex justify-center bg-[#0b0f19]/80 backdrop-blur-md shrink-0 border-t border-white/5 pointer-events-none">
              <div className="w-44 h-1 rounded-full bg-white/30"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. MOBILE / ANDROID & IPHONE CHASSIS
  return (
    <div className="my-3 sm:my-5 flex items-center justify-center">
      {/* Outer Titanium Phone Bezel */}
      <div className="relative w-[390px] sm:w-[414px] h-[830px] max-h-[calc(100vh-80px)] rounded-[46px] p-[8px] bg-gradient-to-b from-[#2e3544] via-[#1b202c] to-[#0d1017] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,240,255,0.12)] border border-white/15 flex flex-col overflow-hidden">
        {/* Screen Inner Shell */}
        <div
          className="relative w-full h-full rounded-[38px] flex flex-col overflow-hidden bg-[#0b0f19] border border-black/80"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.91), rgba(11, 15, 25, 0.95)), url('${backgroundUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* iOS / Android Dynamic Capsule & Status Bar */}
          <div className="w-full z-40 pt-2 px-6 pb-1.5 flex items-center justify-between text-xs font-semibold text-[#dfe2f1]/90 bg-[#0b0f19]/80 backdrop-blur-md select-none shrink-0 border-b border-white/5">
            <span className="font-mono text-[11px] font-bold tracking-tight">09:41</span>
            {/* Dynamic Island Capsule */}
            <div className="w-24 h-4.5 rounded-full bg-black flex items-center justify-end px-2 gap-1.5 shadow-inner border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-[#1c2230]"></span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>

          {/* Children Screen Content - Smooth Inner Scroll */}
          <div className="flex-1 flex flex-col w-full overflow-y-auto overflow-x-hidden relative">
            {children}
          </div>

          {/* Bottom Home Swipe Bar */}
          <div className="w-full py-1.5 flex justify-center bg-[#0b0f19]/80 backdrop-blur-md shrink-0 border-t border-white/5 pointer-events-none">
            <div className="w-32 h-1 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
