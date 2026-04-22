import { CheckSquare, PhoneCall } from 'lucide-react';
import { soundManager } from '../game/sound';

interface Props {
  disabled: boolean;
  onAllow: () => void;
  onReject: () => void;
}

export default function ActionButtons({ disabled, onAllow, onReject }: Props) {
  return (
    <div className="flex flex-col justify-center gap-4 pl-4 ml-auto border-l-2 border-[#3a352e]/50 min-w-[140px]">
      <p className="text-[10px] text-[#8a8278] font-mono tracking-widest uppercase text-center">Decision</p>

      {/* 放行按钮 */}
      <button
        disabled={disabled}
        onClick={() => {
          soundManager.playBeep('click');
          onAllow();
        }}
        className={`
          group relative px-5 py-4 bg-[#1a2a1a] border-2 border-[#2a3a2a] rounded-sm
          transition-all duration-200
          ${disabled
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:bg-[#2a3a2a] hover:border-[#5a8f5a]/50 hover:shadow-[0_0_15px_rgba(90,143,90,0.2)] active:scale-[0.97]'
          }
        `}
      >
        <div className="flex items-center gap-2 justify-center">
          <CheckSquare size={20} className={`${disabled ? 'text-[#3a4a3a]' : 'text-[#5a8f5a] group-hover:text-[#7abf7a]'} transition-colors`} />
          <div className="text-left">
            <p className={`text-sm font-bold font-mono ${disabled ? 'text-[#3a4a3a]' : 'text-[#5a8f5a]'}`}>开门放行</p>
            <p className="text-[9px] text-[#5a8f5a]/40 font-mono">ALLOW ENTRY</p>
          </div>
        </div>
      </button>

      {/* 拒入按钮 */}
      <button
        disabled={disabled}
        onClick={() => {
          soundManager.playBeep('click');
          onReject();
        }}
        className={`
          group relative px-5 py-4 bg-[#2a1a1a] border-2 border-[#3a2a2a] rounded-sm
          transition-all duration-200
          ${disabled
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:bg-[#3a2a2a] hover:border-[#8b3a3a]/50 hover:shadow-[0_0_15px_rgba(139,58,58,0.2)] active:scale-[0.97]'
          }
        `}
      >
        <div className="flex items-center gap-2 justify-center">
          <PhoneCall size={20} className={`${disabled ? 'text-[#4a3a3a]' : 'text-[#8b3a3a] group-hover:text-[#bf5a5a]'} transition-colors`} />
          <div className="text-left">
            <p className={`text-sm font-bold font-mono ${disabled ? 'text-[#4a3a3a]' : 'text-[#8b3a3a]'}`}>呼叫安保</p>
            <p className="text-[9px] text-[#8b3a3a]/40 font-mono">CALL D.D.D.</p>
          </div>
        </div>
      </button>
    </div>
  );
}
