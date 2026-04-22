import { useEffect, useRef } from 'react';

export default function CRTOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 扫描线
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      // 随机噪点
      if (Math.random() > 0.7) {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 16) {
          const v = Math.random() > 0.999 ? 30 : 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 8;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Canvas噪点和扫描线 */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[100] opacity-50" />

      {/* CRT弯曲效果 */}
      <div
        className="absolute inset-0 pointer-events-none z-[99]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5)',
        }}
      />

      {/* 色散效果边缘 */}
      <div
        className="absolute inset-0 pointer-events-none z-[98] opacity-20"
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,0.03) 0%, transparent 5%, transparent 95%, rgba(0,0,255,0.03) 100%)',
        }}
      />
    </>
  );
}
