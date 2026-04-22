import type { IDCard as IDCardType } from '../game/types';
import PortraitSVG from './PortraitSVG';
import { FileText, Fingerprint } from 'lucide-react';

interface Props {
  idCard: IDCardType | null;
  uvActive: boolean;
  fontIssue: boolean;
}

export default function IDCard({ idCard, uvActive, fontIssue }: Props) {
  if (!idCard) return null;

  return (
    <div className="flex-1 bg-[#c9c1a8] rounded-sm border-2 border-[#5a5448] shadow-xl p-4 flex flex-col relative overflow-hidden hover:shadow-2xl transition-shadow">
      {/* 纸张纹理 */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 证件标题 */}
      <div className="border-b-2 border-[#2a2520] pb-2 mb-3 flex justify-between items-center relative">
        <h2 className={`text-lg font-bold text-[#2a2520] tracking-widest ${fontIssue ? 'font-mono' : 'font-sans'}`}>
          居民通行证
        </h2>
        <FileText className="text-[#5a5448]" size={20} />
      </div>

      <div className="flex gap-3 flex-1">
        {/* 证件照区域 */}
        <div className="w-24 h-32 bg-[#b8b0a0] border-2 border-[#5a5448] p-1 flex-shrink-0 relative overflow-hidden shadow-inner">
          <PortraitSVG features={idCard.photoVisuals} isPhoto={true} />

          {/* UV检查层 */}
          {uvActive && (
            <div className="absolute inset-0 z-10">
              {/* UV紫光 */}
              <div className="absolute inset-0 bg-purple-900/30 mix-blend-multiply" />
              {idCard.hasUVMark ? (
                // 正常UV章
                <div className="absolute bottom-2 right-2">
                  <div className="w-8 h-8 rounded-full border-2 border-green-400/80 flex items-center justify-center bg-green-400/20">
                    <Fingerprint className="text-green-400" size={16} />
                  </div>
                  <p className="text-[6px] text-green-400 font-mono text-center mt-0.5">DDD-OK</p>
                </div>
              ) : (
                // 伪造 - 无UV章
                <div className="absolute bottom-2 right-2">
                  <div className="w-8 h-8 rounded-full border-2 border-red-500/80 flex items-center justify-center bg-red-500/20">
                    <span className="text-red-500 text-xs font-bold">!</span>
                  </div>
                  <p className="text-[6px] text-red-500 font-mono text-center mt-0.5">无印章</p>
                </div>
              )}
            </div>
          )}

          {/* 照片蓝底色调 */}
          {!uvActive && (
            <div className="absolute inset-0 bg-blue-800/5 pointer-events-none mix-blend-overlay" />
          )}
        </div>

        {/* 信息区域 */}
        <div className="flex-1 text-[#2a2520] space-y-2.5 pt-1">
          <div className="border-b border-[#8a8378] border-dotted pb-1">
            <span className="text-[#5a5448] font-bold text-[10px] tracking-wider">姓名 NAME</span>
            <p className={`font-bold text-sm mt-0.5 ${fontIssue ? 'font-mono tracking-widest text-red-800' : ''}`}>
              {idCard.name}
            </p>
          </div>

          <div className="border-b border-[#8a8378] border-dotted pb-1">
            <span className="text-[#5a5448] font-bold text-[10px] tracking-wider">门牌 APT</span>
            <p className="font-bold font-mono text-sm mt-0.5">{idCard.apt}</p>
          </div>

          <div className="border-b border-[#8a8378] border-dotted pb-1">
            <span className="text-[#5a5448] font-bold text-[10px] tracking-wider">编号 ID-NO</span>
            <p className="font-bold font-mono text-[10px] mt-0.5 tracking-wider">{idCard.idNum}</p>
          </div>

          <div className="text-[8px] text-[#8a8378] text-center pt-1 italic">
            翡翠公寓管理处制 / DDD验证编号
          </div>
        </div>
      </div>
    </div>
  );
}
