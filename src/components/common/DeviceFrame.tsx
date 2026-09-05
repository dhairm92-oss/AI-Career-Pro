import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  deviceMode: 'phone' | 'full';
  backgroundUrl: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  deviceMode,
  backgroundUrl,
}) => {
  if (deviceMode === 'full') {
    return (
      <div className="w-full max-w-2xl min-h-[calc(100vh-70px)] my-3 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative bg-[#0b0f19] backdrop-blur-xl">
        <div
          className="w-full flex-1 flex flex-col relative overflow-y-auto"
          style={{
            backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.92), rgba(11, 15, 25, 0.96)), url('${backgroundUrl}')`,
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
          {/* iOS Dynamic Island & Status Bar */}
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
