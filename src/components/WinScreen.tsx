import { ShieldAlert, RotateCcw, Star } from 'lucide-react';
import type { GameStats, DayResult } from '../game/types';
import { soundManager } from '../game/sound';

interface Props {
  stats: GameStats;
  onRestart: () => void;
}

export default function WinScreen({ stats, onRestart }: Props) {
  const totalAlts = stats.dailyResults.reduce((a, r) => a + r.altsCaught, 0);
  const avgScore = Math.round(stats.score / 10);
  const sRanks = stats.dailyResults.filter(r => r.rank === 'S').length;

  return (
    <div className="h-screen w-full bg-[#0a1a1a] flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* 星光效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#5a8f5a]/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center max-w-2xl w-full">
        <ShieldAlert className="w-20 h-20 mx-auto mb-4 text-[#5a8f5a]" />

        <h1 className="text-5xl font-bold mb-2 text-[#d4c9a8] font-mono tracking-wider">执勤结束</h1>
        <p className="text-[#5a8f5a] text-lg mb-8 font-mono">你成功完成了10天的试用期。</p>

        {/* 最终评级 */}
        <div className="mb-8 p-6 border-2 border-[#5a8f5a]/30 bg-black/30">
          <p className="text-[#5a8f5a]/50 text-xs font-mono tracking-[0.3em] mb-4">FINAL EVALUATION</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-[#0c0e0c] border border-[#5a8f5a]/20">
              <p className="text-3xl font-bold text-[#d4c9a8] font-mono">{stats.score}</p>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono mt-1">总得分</p>
            </div>
            <div className="text-center p-3 bg-[#0c0e0c] border border-[#5a8f5a]/20">
              <p className="text-3xl font-bold text-[#5a8f5a] font-mono">{totalAlts}</p>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono mt-1">捕获伪人</p>
            </div>
            <div className="text-center p-3 bg-[#0c0e0c] border border-[#5a8f5a]/20">
              <p className="text-3xl font-bold text-[#b8a642] font-mono">{avgScore}</p>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono mt-1">日均得分</p>
            </div>
            <div className="text-center p-3 bg-[#0c0e0c] border border-[#5a8f5a]/20">
              <div className="flex items-center justify-center gap-1">
                <p className="text-3xl font-bold text-[#d4c9a8] font-mono">{sRanks}</p>
                <Star size={20} className="text-[#d4c9a8]" />
              </div>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono mt-1">S评级天数</p>
            </div>
          </div>

          {/* 每日回顾 */}
          <div className="border-t border-[#5a8f5a]/20 pt-4">
            <p className="text-[#5a8f5a]/40 text-[10px] font-mono mb-3 tracking-widest">DAILY BREAKDOWN</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {stats.dailyResults.map((r: DayResult) => (
                <div key={r.day} className="text-center">
                  <div className={`
                    w-10 h-10 flex items-center justify-center border font-bold font-mono text-sm
                    ${r.rank === 'S' ? 'border-[#d4c9a8] text-[#d4c9a8] bg-[#d4c9a8]/10' :
                      r.rank === 'A' ? 'border-[#5a8f5a] text-[#5a8f5a]' :
                      r.rank === 'B' ? 'border-[#b8a642] text-[#b8a642]' :
                      r.rank === 'C' ? 'border-[#8a9a7a] text-[#8a9a7a]' :
                      'border-[#8b3a3a] text-[#8b3a3a]'}
                  `}>
                    {r.rank}
                  </div>
                  <p className="text-[8px] text-[#5a8f5a]/30 font-mono mt-1">D{r.day}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playBeep('click');
            onRestart();
          }}
          className="px-8 py-3 bg-[#2a3a2a] hover:bg-[#3a4a3a] border-2 border-[#5a8f5a]/40 text-[#d4c9a8] font-mono font-bold tracking-wider transition-all hover:shadow-[0_0_20px_rgba(90,143,90,0.2)]"
        >
          <RotateCcw size={16} className="inline mr-2 -mt-0.5" />
          开始新一轮执勤
        </button>
      </div>
    </div>
  );
}
