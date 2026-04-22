import { useMemo } from 'react';
import type { VisualFeatures } from '../game/types';

interface Props {
  features: VisualFeatures;
  isPhoto?: boolean;
  glitchActive?: boolean;
}

export default function PortraitSVG({ features, isPhoto = false, glitchActive = false }: Props) {
  const { skin, head, hair, eyes, nose, mouth, accessory, feature } = features;

  // 头型路径
  const headPath = useMemo(() => {
    switch (head) {
      case 'round': return "M 15 50 C 15 5, 85 5, 85 50 C 85 95, 15 95, 15 50 Z";
      case 'oval': return "M 20 35 C 20 5, 80 5, 80 35 C 80 100, 20 100, 20 35 Z";
      case 'square': return "M 20 25 L 80 25 C 88 25, 88 80, 80 80 L 20 80 C 12 80, 12 25, 20 25 Z";
      case 'diamond': return "M 50 5 L 90 45 L 50 95 L 10 45 Z";
      case 'heart': return "M 50 15 C 30 -5, 5 15, 5 40 C 5 75, 50 100, 50 100 C 50 100, 95 75, 95 40 C 95 15, 70 -5, 50 15 Z";
      default: return "M 15 50 C 15 5, 85 5, 85 50 C 85 95, 15 95, 15 50 Z";
    }
  }, [head]);

  // 头发路径
  const hairPath = useMemo(() => {
    switch (hair) {
      case 'short': return "M 15 45 C 10 15, 40 0, 50 5 C 60 0, 90 15, 85 45 C 80 20, 20 20, 15 45 Z";
      case 'medium': return "M 12 50 C 5 10, 40 -5, 50 5 C 60 -5, 95 10, 88 50 L 90 65 C 85 50, 15 50, 10 65 Z";
      case 'curly': return "M 15 50 C 10 5, 30 5, 35 15 C 40 5, 60 5, 65 15 C 70 5, 90 5, 85 50 C 88 30, 12 30, 15 50 Z";
      case 'slick': return "M 20 40 C 20 15, 80 15, 80 40 L 78 30 C 60 20, 40 20, 22 30 Z";
      case 'bald': return null;
      case 'hat': return null; // hat as accessory
      default: return "M 15 45 C 10 15, 40 0, 50 5 C 60 0, 90 15, 85 45 C 80 20, 20 20, 15 45 Z";
    }
  }, [hair]);

  // 帽子路径 (当hair === 'hat')
  const hatPath = useMemo(() => {
    if (hair !== 'hat') return null;
    return (
      <g>
        <ellipse cx="50" cy="25" rx="38" ry="6" fill="#4a3728" stroke="#222" strokeWidth="2" />
        <path d="M 25 25 L 30 5 C 40 0, 60 0, 70 5 L 75 25 Z" fill="#5a4535" stroke="#222" strokeWidth="2" />
        <rect x="28" y="20" width="44" height="5" fill="#3a2a1a" />
      </g>
    );
  }, [hair]);

  // 眼睛渲染
  const eyesRender = useMemo(() => {
    const base = isPhoto ? { rx: 6, ry: 4 } : { rx: 7, ry: 4 };
    switch (eyes) {
      case 'normal':
        return (
          <g>
            <ellipse cx="32" cy="48" rx={base.rx} ry={base.ry} fill="white" stroke="#111" strokeWidth="1.5" />
            <circle cx="32" cy="48" r="2.5" fill="#1a1a2e" />
            <circle cx="33" cy="47" r="1" fill="white" />
            <ellipse cx="68" cy="48" rx={base.rx} ry={base.ry} fill="white" stroke="#111" strokeWidth="1.5" />
            <circle cx="68" cy="48" r="2.5" fill="#1a1a2e" />
            <circle cx="69" cy="47" r="1" fill="white" />
          </g>
        );
      case 'small':
        return (
          <g>
            <circle cx="32" cy="48" r="2" fill="#1a1a2e" />
            <circle cx="68" cy="48" r="2" fill="#1a1a2e" />
          </g>
        );
      case 'big':
        return (
          <g>
            <ellipse cx="32" cy="48" rx="8" ry="6" fill="white" stroke="#111" strokeWidth="1.5" />
            <circle cx="32" cy="48" r="3.5" fill="#1a1a2e" />
            <ellipse cx="68" cy="48" rx="8" ry="6" fill="white" stroke="#111" strokeWidth="1.5" />
            <circle cx="68" cy="48" r="3.5" fill="#1a1a2e" />
          </g>
        );
      case 'hetero':
        return (
          <g>
            <ellipse cx="32" cy="48" rx={base.rx} ry={base.ry} fill="white" stroke="#111" strokeWidth="1.5" />
            <circle cx="32" cy="48" r="2.5" fill="#2e5aac" />
            <ellipse cx="68" cy="48" rx={base.rx} ry={base.ry} fill="white" stroke="#111" strokeWidth="1.5" />
            <circle cx="68" cy="48" r="2.5" fill="#5a8f5a" />
          </g>
        );
      case 'void':
        return (
          <g>
            <circle cx="32" cy="48" r="7" fill="#0a0a0a" />
            <circle cx="32" cy="48" r="3" fill="#1a0000" />
            <circle cx="68" cy="48" r="7" fill="#0a0a0a" />
            <circle cx="68" cy="48" r="3" fill="#1a0000" />
          </g>
        );
      case 'slit':
        return (
          <g>
            <ellipse cx="32" cy="48" rx="8" ry="2" fill="#0a2a0a" />
            <ellipse cx="68" cy="48" rx="8" ry="2" fill="#0a2a0a" />
            <line x1="24" y1="48" x2="40" y2="48" stroke="#111" strokeWidth="0.5" />
            <line x1="60" y1="48" x2="76" y2="48" stroke="#111" strokeWidth="0.5" />
          </g>
        );
      case 'many':
        return (
          <g>
            <circle cx="25" cy="42" r="3" fill="#0a0a0a" />
            <circle cx="38" cy="38" r="3.5" fill="#0a0a0a" />
            <circle cx="50" cy="35" r="2.5" fill="#0a0a0a" />
            <circle cx="62" cy="38" r="3.5" fill="#0a0a0a" />
            <circle cx="75" cy="42" r="3" fill="#0a0a0a" />
            <circle cx="45" cy="50" r="2" fill="#0a0a0a" />
            <circle cx="55" cy="50" r="2" fill="#0a0a0a" />
          </g>
        );
      case 'none':
        return null;
      default: return null;
    }
  }, [eyes, isPhoto]);

  // 鼻子渲染
  const noseRender = useMemo(() => {
    switch (nose) {
      case 'normal': return <path d="M 50 48 L 47 58 L 53 58 Z" fill="rgba(0,0,0,0.08)" />;
      case 'small': return <circle cx="50" cy="55" r="2.5" fill="rgba(0,0,0,0.08)" />;
      case 'big': return <ellipse cx="50" cy="55" rx="6" ry="5" fill="rgba(0,0,0,0.06)" />;
      case 'long': return <path d="M 50 48 L 45 68 L 55 68 Z" fill="rgba(0,0,0,0.08)" />;
      case 'hook': return <path d="M 50 48 Q 55 55 52 65 L 48 62 Z" fill="rgba(0,0,0,0.1)" />;
      case 'none': return null;
      default: return <path d="M 50 48 L 47 58 L 53 58 Z" fill="rgba(0,0,0,0.08)" />;
    }
  }, [nose]);

  // 嘴巴渲染
  const mouthRender = useMemo(() => {
    switch (mouth) {
      case 'normal': return <path d="M 38 72 Q 50 78 62 72" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" />;
      case 'smile': return <path d="M 33 68 Q 50 85 67 68" stroke="#111" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      case 'flat': return <line x1="38" y1="74" x2="62" y2="74" stroke="#111" strokeWidth="2" strokeLinecap="round" />;
      case 'open': return <ellipse cx="50" cy="75" rx="8" ry="5" fill="#3a1a1a" stroke="#111" strokeWidth="1.5" />;
      case 'teeth':
        return (
          <g>
            <path d="M 35 70 Q 50 68 65 70" stroke="#111" strokeWidth="1" fill="none" />
            <g fill="#f0f0e0" stroke="#111" strokeWidth="0.5">
              <rect x="38" y="70" width="4" height="5" />
              <rect x="43" y="70" width="4" height="5" />
              <rect x="48" y="70" width="4" height="5" />
              <rect x="53" y="70" width="4" height="5" />
              <rect x="58" y="70" width="4" height="5" />
            </g>
          </g>
        );
      case 'jaw':
        return (
          <g>
            <path d="M 35 72 L 38 85 L 62 85 L 65 72 Z" fill="#2a0a0a" stroke="#111" strokeWidth="1.5" />
            <path d="M 40 75 L 43 80 L 46 75 L 49 80 L 52 75 L 55 80 L 58 75 L 60 78" stroke="#d44" strokeWidth="0.8" fill="none" />
          </g>
        );
      case 'none': return null;
      default: return <path d="M 38 72 Q 50 78 62 72" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" />;
    }
  }, [mouth]);

  // 配饰渲染
  const accessoryRender = useMemo(() => {
    switch (accessory) {
      case 'glasses_round':
        return (
          <g>
            <circle cx="32" cy="48" r="10" fill="none" stroke="#222" strokeWidth="1.5" />
            <circle cx="68" cy="48" r="10" fill="none" stroke="#222" strokeWidth="1.5" />
            <line x1="42" y1="48" x2="58" y2="48" stroke="#222" strokeWidth="1.5" />
          </g>
        );
      case 'glasses_square':
        return (
          <g>
            <rect x="20" y="38" width="24" height="20" rx="2" fill="none" stroke="#222" strokeWidth="1.5" />
            <rect x="56" y="38" width="24" height="20" rx="2" fill="none" stroke="#222" strokeWidth="1.5" />
            <line x1="44" y1="48" x2="56" y2="48" stroke="#222" strokeWidth="1.5" />
          </g>
        );
      case 'monocle':
        return (
          <g>
            <circle cx="68" cy="48" r="10" fill="none" stroke="#222" strokeWidth="1.5" />
            <line x1="78" y1="48" x2="88" y2="40" stroke="#222" strokeWidth="0.8" />
          </g>
        );
      case 'earrings':
        return (
          <g>
            <circle cx="12" cy="55" r="3" fill="#c9a84c" stroke="#222" strokeWidth="0.5" />
            <circle cx="88" cy="55" r="3" fill="#c9a84c" stroke="#222" strokeWidth="0.5" />
          </g>
        );
      case 'headband':
        return <path d="M 20 30 Q 50 20 80 30" stroke="#8b3a3a" strokeWidth="4" fill="none" />;
      case 'mask':
        return (
          <g>
            <ellipse cx="50" cy="55" rx="22" ry="14" fill="#e8e0d4" stroke="#222" strokeWidth="1.5" />
            <ellipse cx="38" cy="52" rx="4" ry="2" fill="#111" />
            <ellipse cx="62" cy="52" rx="4" ry="2" fill="#111" />
            <path d="M 45 62 Q 50 58 55 62" stroke="#111" strokeWidth="1" fill="none" />
          </g>
        );
      default: return null;
    }
  }, [accessory]);

  // 特征渲染
  const featureRender = useMemo(() => {
    switch (feature) {
      case 'mole_left': return <circle cx="25" cy="58" r="1.5" fill="#3a2218" />;
      case 'mole_right': return <circle cx="75" cy="58" r="1.5" fill="#3a2218" />;
      case 'scar_chin':
        return (
          <g>
            <path d="M 42 82 L 46 90" stroke="#8b6a5a" strokeWidth="1.5" fill="none" />
            <path d="M 44 80 L 48 88" stroke="#a08070" strokeWidth="0.8" fill="none" />
          </g>
        );
      case 'freckles':
        return (
          <g fill="#8b6a4a" opacity="0.5">
            <circle cx="35" cy="55" r="1" />
            <circle cx="40" cy="60" r="0.8" />
            <circle cx="30" cy="62" r="1" />
            <circle cx="65" cy="55" r="1" />
            <circle cx="70" cy="60" r="0.8" />
            <circle cx="60" cy="62" r="1" />
          </g>
        );
      case 'beard':
        return (
          <g>
            <path d="M 30 65 Q 50 95 70 65 L 68 75 Q 50 100 32 75 Z" fill="#4a3528" opacity="0.7" />
            <path d="M 38 62 L 62 62 L 60 68 L 40 68 Z" fill="#4a3528" opacity="0.5" />
          </g>
        );
      default: return null;
    }
  }, [feature]);

  // 照片滤镜
  const photoFilter = isPhoto ? (
    <rect x="0" y="0" width="100" height="100" fill="#4a6a8a" opacity="0.15" style={{ mixBlendMode: 'overlay' }} pointerEvents="none" />
  ) : null;

  // Glitch偏移
  const glitchOffset = glitchActive ? (Math.random() > 0.5 ? 2 : -2) : 0;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: isPhoto ? 'contrast(0.9) saturate(0.8)' : 'none' }}>
      <defs>
        <filter id={`shadow-${head}`}>
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 头型底色 */}
      <path d={headPath} fill={skin} stroke="#1a1a1a" strokeWidth="2" filter={`url(#shadow-${head})`} />

      {/* 头发 */}
      {hairPath && <path d={hairPath} fill="#2a2018" stroke="#111" strokeWidth="1" />}
      {hatPath}

      {/* 面部特征组（带glitch偏移） */}
      <g transform={`translate(${glitchOffset}, 0)`}>
        {eyesRender}
      </g>
      <g>
        {noseRender}
      </g>
      <g transform={`translate(${-glitchOffset}, 0)`}>
        {mouthRender}
      </g>
      <g>
        {featureRender}
      </g>
      <g>
        {accessoryRender}
      </g>

      {/* 照片叠加滤镜 */}
      {photoFilter}

      {/* 颈部 */}
      <rect x="38" y="88" width="24" height="14" fill={skin} opacity="0.6" />
    </svg>
  );
}
