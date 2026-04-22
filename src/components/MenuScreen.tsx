import { ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { soundManager } from '../game/sound';

interface Props {
  onStart: () => void;
}

export default function MenuScreen({ onStart }: Props) {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundManager.setMuted(next);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0c0e0c]">
      {/* 背景网格 */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(90,143,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(90,143,90,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* 浮动粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-800/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="text-center z-10 p-10 border-[3px] border-[#5a8f5a]/60 bg-[#0c0e0c]/90 shadow-[0_0_40px_rgba(90,143,90,0.15)] max-w-lg w-full mx-4 relative">
        {/* 角落装饰 */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#5a8f5a] -translate-x-[1px] -translate-y-[1px]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#5a8f5a] translate-x-[1px] -translate-y-[1px]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#5a8f5a] -translate-x-[1px] translate-y-[1px]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#5a8f5a] translate-x-[1px] translate-y-[1px]" />

        <ShieldAlert className="w-20 h-20 mx-auto mb-6 text-[#5a8f5a] animate-pulse" />

        <h1 className="text-5xl font-bold mb-2 tracking-[0.3em] text-[#d4c9a8] font-mono">
          门卫协议
        </h1>
        <p className="text-lg mb-8 tracking-[0.5em] text-[#5a8f5a]/70 font-mono">
          GATEKEEPER PROTOCOL v2.0
        </p>

        <div className="text-left text-[#8a9a7a] mb-8 space-y-3 text-sm font-mono border border-[#5a8f5a]/20 p-4 bg-[#0c0e0c]/50">
          <p className="flex items-center gap-2">
            <span className="text-[#5a8f5a]">&gt;</span>
            <span>目标：核查访客，阻止"伪人"潜入公寓。</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#5a8f5a]">&gt;</span>
            <span>工具：紫外线灯 / 电话簿 / 放大镜</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#5a8f5a]">&gt;</span>
            <span>警告：放行伪人将标记为"威胁"。累计3次直接死亡。</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#5a8f5a]">&gt;</span>
            <span>注意：错拒合法居民5次将被DDD解雇。</span>
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full px-8 py-4 bg-[#2a3a2a] hover:bg-[#3a4a3a] border-2 border-[#5a8f5a]/60 text-[#d4c9a8] font-bold text-lg rounded-sm tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(90,143,90,0.3)] active:scale-[0.98] font-mono"
        >
          开始执勤 [START]
        </button>

        {/* 底部按钮 */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={toggleMute}
            className="text-[#5a8f5a]/50 hover:text-[#5a8f5a] transition-colors"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <span className="text-[10px] text-[#5a8f5a]/30 font-mono tracking-wider">DDD APPROVED // 1955</span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
