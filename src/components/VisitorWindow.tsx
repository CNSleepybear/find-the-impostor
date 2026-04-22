import { useState, useEffect } from 'react';
import type { Visitor } from '../game/types';
import PortraitSVG from './PortraitSVG';

interface Props {
  visitor: Visitor | null;
  isCalling: boolean;
  day: number;
  current: number;
  total: number;
  strikes: number;
  altLetIn: number;
}

export default function VisitorWindow({ visitor, isCalling, day, current, total, strikes, altLetIn }: Props) {
  const [glitchActive, setGlitchActive] = useState(false);
  const [showVisitor, setShowVisitor] = useState(false);
  const [flicker, setFlicker] = useState(false);

  // 访客入场动画
  useEffect(() => {
    if (visitor) {
      setShowVisitor(false);
      const t = setTimeout(() => setShowVisitor(true), 100);
      return () => clearTimeout(t);
    }
  }, [visitor?.idCard.idNum]);

  // 伪人Glitch效果
  useEffect(() => {
    if (!visitor?.isAlternate) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [visitor?.isAlternate]);

  // 第9天电路不稳定闪烁
  useEffect(() => {
    if (day !== 9) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 100 + Math.random() * 200);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [day]);

  if (!visitor) return null;

  return (
    <div className={`flex-1 relative overflow-hidden flex flex-col ${flicker ? 'brightness-150' : ''} transition-all`}>
      {/* 背景墙 */}
      <div className="absolute inset-0 bg-[#111411]">
        {/* 砖墙纹理 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='30' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='60' height='30' fill='none' stroke='%235a8f5a' stroke-width='0.5'/%3E%3Crect width='30' height='15' fill='none' stroke='%235a8f5a' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        {/* 雨效果（第9天） */}
        {day >= 9 && (
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[1px] bg-blue-400/40"
                style={{
                  height: `${10 + Math.random() * 20}px`,
                  left: `${Math.random() * 100}%`,
                  animation: `rainfall ${0.5 + Math.random() * 0.5}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 状态栏 HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between z-20 pointer-events-none">
        <div className="flex gap-2">
          <div className="bg-black/70 border border-[#5a8f5a]/40 px-3 py-1.5 rounded-sm">
            <span className="text-[#5a8f5a] text-xs font-mono">时间 {current}/{total}</span>
          </div>
          <div className="bg-black/70 border border-[#5a8f5a]/40 px-3 py-1.5 rounded-sm">
            <span className="text-[#5a8f5a] text-xs font-mono">第{day}天</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-black/70 border border-[#8b3a3a]/40 px-3 py-1.5 rounded-sm">
            <span className="text-[#8b3a3a] text-xs font-mono">
              威胁: {'◆'.repeat(altLetIn).padEnd(3, '◇')}
            </span>
          </div>
          <div className="bg-black/70 border border-[#b8a642]/40 px-3 py-1.5 rounded-sm">
            <span className="text-[#b8a642] text-xs font-mono">
              投诉: {'●'.repeat(strikes).padEnd(5, '○')}
            </span>
          </div>
        </div>
      </div>

      {/* 伪人低频嗡鸣指示器 */}
      {visitor.isAlternate && !isCalling && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-[#8b3a3a]/20 border border-[#8b3a3a]/30 px-3 py-1 rounded-sm animate-pulse">
            <span className="text-[#8b3a3a]/70 text-[10px] font-mono tracking-[0.3em]">◢ D.D.D. 传感器运行中 ◣</span>
          </div>
        </div>
      )}

      {/* 访客显示区 */}
      <div className="flex-1 flex items-end justify-center pb-8 relative z-10">
        {showVisitor && !isCalling && (
          <div className={`relative flex flex-col items-center transition-all duration-500 ${showVisitor ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* 对话气泡 */}
            <div className={`
              absolute -top-24 bg-[#c9c1a8] text-[#1a1a1a] px-4 py-3 rounded-sm 
              shadow-[0_4px_20px_rgba(0,0,0,0.5)] min-w-[140px] max-w-[200px] text-center
              border-2 border-[#3a352e] z-30
              ${visitor.dialogueStyle === 'creepy' ? 'text-red-900 font-bold tracking-wider' : ''}
              ${visitor.dialogueStyle === 'pause' ? 'opacity-80' : ''}
            `}>
              <p className="text-sm font-bold font-mono leading-snug">{visitor.dialogue}</p>
              {/* 气泡尖角 */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#c9c1a8] border-b-2 border-r-2 border-[#3a352e] rotate-45" />
            </div>

            {/* 角色肖像 */}
            <div className={`w-56 h-56 relative drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${glitchActive ? 'scale-[1.02]' : ''} transition-transform`}>
              <PortraitSVG
                features={visitor.actualVisuals}
                glitchActive={glitchActive}
              />
              {/* Glitch覆盖层 */}
              {glitchActive && (
                <div className="absolute inset-0 bg-red-500/10 mix-blend-color-burn animate-pulse" />
              )}
            </div>

            {/* 肩膀/身体 */}
            <div className="w-40 h-20 bg-[#2a2a2a] rounded-t-[40px] -mt-4 border-2 border-[#111] relative z-0 shadow-lg">
              {/* 衣领 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#3a3a3a] rounded-b-lg" />
            </div>
          </div>
        )}

        {/* 呼叫DDD特效 */}
        {isCalling && (
          <div className="absolute inset-0 bg-[#8b3a3a]/30 z-30 flex flex-col items-center justify-center backdrop-blur-sm animate-pulse">
            <div className="bg-black/60 border-2 border-[#8b3a3a] px-8 py-6 rounded-sm text-center">
              <p className="text-[#8b3a3a] text-2xl font-bold font-mono tracking-[0.2em] mb-2 animate-pulse">
                呼叫安保部门 D.D.D.
              </p>
              <p className="text-[#c9a8a8] text-sm font-mono">正在派遣清除小队...</p>
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-[#8b3a3a] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes rainfall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
