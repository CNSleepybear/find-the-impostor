import type { DailyListEntry } from '../game/types';
import { ClipboardList } from 'lucide-react';

interface Props {
  list: DailyListEntry[];
}

export default function DailyList({ list }: Props) {
  return (
    <div className="w-56 bg-[#d8d4c8] rounded-sm border-2 border-[#7a7568] shadow-xl p-4 flex flex-col relative overflow-hidden">
      {/* 纸张纹理 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 标题 */}
      <div className="text-center font-bold text-base border-b-4 border-double border-[#2a2520] pb-2 mb-3 text-[#2a2520] font-serif relative">
        <div className="flex items-center justify-center gap-2">
          <ClipboardList size={16} />
          <span>今日访客名单</span>
        </div>
        <p className="text-[8px] text-[#5a5448] font-mono mt-1 tracking-widest">EXPECTED VISITORS</p>
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto space-y-1.5 text-[#2a2520] font-mono text-xs">
        {list.map((entry, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-b border-[#a09888] pb-1 px-1 py-1 hover:bg-[#c8c2b4] transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-bold text-[11px]">{entry.name}</span>
              <span className="text-[9px] text-[#5a5448]">{entry.idNum}</span>
            </div>
            <span className="text-[10px] bg-[#b8b0a0] px-1.5 py-0.5 rounded-sm font-bold">{entry.apt}</span>
          </div>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-2 pt-2 border-t border-[#a09888] text-[9px] text-[#8b3a3a] font-bold text-center">
        * 未登记人员禁止入内 *
      </div>
    </div>
  );
}
