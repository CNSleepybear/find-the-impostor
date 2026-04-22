import { Search, Phone, ZoomIn, MessageCircle } from 'lucide-react';
import type { ToolState } from '../game/types';
import { soundManager } from '../game/sound';

interface Props {
  tools: ToolState;
  onTool: (tool: 'uv' | 'phone' | 'zoom' | 'dialogue') => void;
  disabled: boolean;
}

export default function ToolPanel({ tools, onTool, disabled }: Props) {
  const buttons: { key: 'uv' | 'phone' | 'zoom' | 'dialogue'; icon: React.ReactNode; label: string; desc: string; count: number }[] = [
    { key: 'uv', icon: <Search size={18} />, label: '紫外线', desc: '检查证件防伪', count: tools.uv },
    { key: 'phone', icon: <Phone size={18} />, label: '电话', desc: '拨打房号确认', count: tools.phone },
    { key: 'zoom', icon: <ZoomIn size={18} />, label: '放大镜', desc: '观察面部细节', count: tools.zoom },
    { key: 'dialogue', icon: <MessageCircle size={18} />, label: '询问', desc: '对话审讯', count: 99 },
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] text-[#8a8278] font-mono tracking-widest mb-1 uppercase">Tools & Actions</p>
      {buttons.map((btn) => {
        const isDisabled = disabled || (btn.count <= 0 && btn.key !== 'dialogue');
        return (
          <button
            key={btn.key}
            disabled={isDisabled}
            onClick={() => {
              soundManager.playBeep('click');
              onTool(btn.key);
            }}
            className={`
              group relative flex items-center gap-3 px-4 py-3 
              bg-[#2a2520] border-2 border-[#3a352e] rounded-sm
              transition-all duration-200
              ${isDisabled
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-[#3a352e] hover:border-[#5a8f5a]/40 hover:shadow-[0_0_10px_rgba(90,143,90,0.1)] active:scale-[0.98]'
              }
            `}
          >
            <div className={`${isDisabled ? 'text-[#5a5448]' : 'text-[#8a9a7a] group-hover:text-[#5a8f5a]'} transition-colors`}>
              {btn.icon}
            </div>
            <div className="text-left flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold font-mono ${isDisabled ? 'text-[#5a5448]' : 'text-[#d4c9a8]'}`}>
                  {btn.label}
                </span>
                {btn.key !== 'dialogue' && (
                  <span className={`text-[9px] font-mono px-1 rounded ${btn.count > 0 ? 'bg-[#5a8f5a]/20 text-[#5a8f5a]' : 'bg-[#8b3a3a]/20 text-[#8b3a3a]'}`}>
                    {btn.count}x
                  </span>
                )}
              </div>
              <p className="text-[9px] text-[#5a5448] font-mono">{btn.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
