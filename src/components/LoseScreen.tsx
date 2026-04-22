import { Skull, Frown, RotateCcw } from 'lucide-react';
import type { GameStats } from '../game/types';
import { soundManager } from '../game/sound';

interface Props {
  type: 'death' | 'fired';
  stats: GameStats;
  onRestart: () => void;
}

export default function LoseScreen({ type, stats, onRestart }: Props) {
  const isDeath = type === 'death';

  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center relative overflow-hidden ${isDeath ? 'bg-[#1a0a0a]' : 'bg-[#1a1a0a]'}`}>
      {/* 背景效果 */}
      {isDeath && (
        <div className="absolute inset-0 bg-red-950/20 animate-pulse" style={{ animationDuration: '3s' }} />
      )}

      <div className="z-10 text-center p-8 max-w-lg">
        {isDeath ? (
          <Skull className="w-24 h-24 mx-auto mb-6 text-[#8b3a3a]" />
        ) : (
          <Frown className="w-24 h-24 mx-auto mb-6 text-[#b8a642]" />
        )}

        <h1 className={`text-5xl font-bold mb-4 font-mono ${isDeath ? 'text-[#8b3a3a]' : 'text-[#b8a642]'}`}>
          {isDeath ? '协议被打破' : '你被解雇了'}
        </h1>

        <p className={`text-lg mb-2 font-mono ${isDeath ? 'text-[#c9a8a8]' : 'text-[#c9c4a8]'}`}>
          {isDeath
            ? '你放进了一个伪人。它在你转身时露出了真面目。'
            : '你遭到了太多居民投诉。DDD认为你无法胜任这份工作。'
          }
        </p>

        {/* 统计数据 */}
        <div className="mt-8 p-4 border border-[#3a2a2a] bg-black/30">
          <p className="text-[#5a8f5a]/40 text-xs font-mono mb-3 tracking-widest">FINAL STATS</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#d4c9a8] font-mono">{stats.currentDay}</p>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono">存活天数</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#5a8f5a] font-mono">{stats.dailyResults.reduce((a, r) => a + r.altsCaught, 0)}</p>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono">捕获伪人</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#d4c9a8] font-mono">{stats.score}</p>
              <p className="text-[10px] text-[#5a8f5a]/40 font-mono">总得分</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playBeep('click');
            onRestart();
          }}
          className={`
            mt-8 px-8 py-3 border-2 font-mono font-bold tracking-wider transition-all
            ${isDeath
              ? 'border-[#8b3a3a]/40 text-[#8b3a3a] hover:bg-[#8b3a3a]/10 hover:border-[#8b3a3a]'
              : 'border-[#b8a642]/40 text-[#b8a642] hover:bg-[#b8a642]/10 hover:border-[#b8a642]'
            }
          `}
        >
          <RotateCcw size={16} className="inline mr-2 -mt-0.5" />
          {isDeath ? '重新开始' : '寻找新的工作'}
        </button>
      </div>
    </div>
  );
}
