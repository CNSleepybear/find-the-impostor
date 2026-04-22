import { CheckCircle, XCircle, ShieldAlert, ChevronRight } from 'lucide-react';
import type { DayResult } from '../game/types';
import { soundManager } from '../game/sound';

interface Props {
  result: DayResult;
  onContinue: () => void;
  isLastDay: boolean;
}

export default function ResultScreen({ result, onContinue, isLastDay }: Props) {
  const rankColors: Record<string, string> = {
    S: 'text-[#d4c9a8]',
    A: 'text-[#5a8f5a]',
    B: 'text-[#b8a642]',
    C: 'text-[#8a9a7a]',
    D: 'text-[#8b7a3a]',
    F: 'text-[#8b3a3a]',
  };

  return (
    <div className="absolute inset-0 bg-[#0c0e0c]/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full border-2 border-[#5a8f5a]/30 bg-[#0c0e0c] p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        {/* 标题 */}
        <div className="text-center mb-6">
          <p className="text-[#5a8f5a]/50 text-xs font-mono tracking-[0.3em] mb-2">DAY {result.day} REPORT</p>
          <h2 className="text-2xl font-bold text-[#d4c9a8] font-mono">每日执勤报告</h2>
        </div>

        {/* 评级 */}
        <div className="text-center mb-6">
          <p className={`text-6xl font-bold font-mono ${rankColors[result.rank] || 'text-[#8a9a7a]'}`}>
            {result.rank}
          </p>
          <p className="text-[#5a8f5a]/40 text-xs font-mono mt-1">RATING</p>
        </div>

        {/* 统计数据 */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-2">
            <span className="text-[#8a9a7a] text-sm font-mono flex items-center gap-2">
              <CheckCircle size={14} className="text-[#5a8f5a]" />
              处理访客
            </span>
            <span className="text-[#d4c9a8] font-bold font-mono">{result.visitorsProcessed}</span>
          </div>

          <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-2">
            <span className="text-[#8a9a7a] text-sm font-mono flex items-center gap-2">
              <ShieldAlert size={14} className="text-[#5a8f5a]" />
              捕获伪人
            </span>
            <span className="text-[#5a8f5a] font-bold font-mono">+{result.altsCaught}</span>
          </div>

          {result.altsLetIn > 0 && (
            <div className="flex justify-between items-center border-b border-[#8b3a3a]/30 pb-2">
              <span className="text-[#8b3a3a] text-sm font-mono flex items-center gap-2">
                <XCircle size={14} className="text-[#8b3a3a]" />
                放入伪人
              </span>
              <span className="text-[#8b3a3a] font-bold font-mono">-{result.altsLetIn}</span>
            </div>
          )}

          {result.wrongRejections > 0 && (
            <div className="flex justify-between items-center border-b border-[#b8a642]/30 pb-2">
              <span className="text-[#b8a642] text-sm font-mono flex items-center gap-2">
                <XCircle size={14} className="text-[#b8a642]" />
                错拒居民
              </span>
              <span className="text-[#b8a642] font-bold font-mono">-{result.wrongRejections}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <span className="text-[#d4c9a8] text-sm font-bold font-mono">总得分</span>
            <span className="text-[#d4c9a8] text-xl font-bold font-mono">{result.score}</span>
          </div>
        </div>

        {/* 继续按钮 */}
        <button
          onClick={() => {
            soundManager.playBeep('click');
            onContinue();
          }}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2a3a2a] hover:bg-[#3a4a3a] border border-[#5a8f5a]/40 text-[#d4c9a8] font-mono font-bold transition-all"
        >
          {isLastDay ? '查看最终结果' : '继续下一天'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
