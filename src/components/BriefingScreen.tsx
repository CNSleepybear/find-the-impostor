import { FileText, AlertTriangle, ChevronRight } from 'lucide-react';
import type { BriefingEntry } from '../game/types';
import { soundManager } from '../game/sound';

interface Props {
  briefing: BriefingEntry;
  day: number;
  onContinue: () => void;
}

export default function BriefingScreen({ briefing, day, onContinue }: Props) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0c0e0c] relative p-4">
      <div className="max-w-xl w-full border-[3px] border-[#5a8f5a]/40 bg-[#0c0e0c]/95 p-8 relative shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        {/* 装饰角 */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#5a8f5a]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#5a8f5a]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#5a8f5a]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#5a8f5a]" />

        {/* 顶部印章 */}
        <div className="flex items-center gap-3 mb-6 border-b border-[#5a8f5a]/30 pb-4">
          <FileText className="text-[#5a8f5a]" size={28} />
          <div>
            <h2 className="text-[#d4c9a8] font-bold text-lg tracking-wider font-mono">{briefing.title}</h2>
            <p className="text-[#5a8f5a]/50 text-xs font-mono">第 {day} / 10 天</p>
          </div>
        </div>

        {/* 警告框 */}
        {briefing.warning && (
          <div className="mb-6 p-3 border border-[#8b3a3a]/60 bg-[#8b3a3a]/10 flex items-start gap-3">
            <AlertTriangle className="text-[#8b3a3a] shrink-0 mt-0.5" size={18} />
            <p className="text-[#c9a8a8] font-mono text-sm font-bold">{briefing.warning}</p>
          </div>
        )}

        {/* 简报内容 */}
        <div className="space-y-4 mb-8">
          {briefing.content.map((line, i) => (
            <p key={i} className="text-[#b8c4a8] font-mono text-sm leading-relaxed">
              <span className="text-[#5a8f5a] mr-2">[{String(i + 1).padStart(2, '0')}]</span>
              {line}
            </p>
          ))}
        </div>

        {/* 今日配置 */}
        <div className="border border-[#5a8f5a]/20 p-3 mb-6 bg-[#5a8f5a]/5">
          <p className="text-[#5a8f5a]/60 text-xs font-mono mb-2">今日配置:</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#0c0e0c] p-2 border border-[#5a8f5a]/20">
              <p className="text-[#8b3a3a] text-lg font-bold font-mono">{Math.round((([0.2,0.3,0.4,0.45,0.5,0.5,0.55,0.6,0.65,0.7][day-1]||0.5)*100))}%</p>
              <p className="text-[#5a8f5a]/50 text-[10px] font-mono">伪人概率</p>
            </div>
            <div className="bg-[#0c0e0c] p-2 border border-[#5a8f5a]/20">
              <p className="text-[#d4c9a8] text-lg font-bold font-mono">{[1,1,2,2,2,3,3,3,3,4][day-1]||2}</p>
              <p className="text-[#5a8f5a]/50 text-[10px] font-mono">最大异常数</p>
            </div>
            <div className="bg-[#0c0e0c] p-2 border border-[#5a8f5a]/20">
              <p className="text-[#b8a642] text-lg font-bold font-mono">{[3,4,4,4,5,5,5,5,5,6][day-1]||4}</p>
              <p className="text-[#5a8f5a]/50 text-[10px] font-mono">访客数量</p>
            </div>
          </div>
        </div>

        {/* 继续按钮 */}
        <button
          onClick={() => {
            soundManager.playBeep('click');
            onContinue();
          }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2a3a2a] hover:bg-[#3a4a3a] border border-[#5a8f5a]/40 text-[#d4c9a8] font-mono font-bold transition-all hover:shadow-[0_0_15px_rgba(90,143,90,0.2)]"
        >
          开始值班
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
