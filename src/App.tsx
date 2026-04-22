import { useState, useCallback, useEffect, useRef } from 'react';
import type { GameScreen, GameStats, ToolState, Visitor, DayResult, DailyListEntry } from './game/types';
import { BRIEFINGS, DAY_CONFIGS } from './game/data';
import { generateDailyList, generateVisitor, checkUV, checkPhone } from './game/generators';
import { soundManager } from './game/sound';

import CRTOverlay from './components/CRTOverlay';
import MenuScreen from './components/MenuScreen';
import BriefingScreen from './components/BriefingScreen';
import VisitorWindow from './components/VisitorWindow';
import IDCard from './components/IDCard';
import DailyList from './components/DailyList';
import ToolPanel from './components/ToolPanel';
import DialoguePanel from './components/DialoguePanel';
import ActionButtons from './components/ActionButtons';
import ResultScreen from './components/ResultScreen';
import LoseScreen from './components/LoseScreen';
import WinScreen from './components/WinScreen';

import './App.css';

// ==========================================
// 主应用
// ==========================================
export default function App() {
  const [screen, setScreen] = useState<GameScreen>('MENU');
  const [stats, setStats] = useState<GameStats>({
    currentDay: 0,
    totalDays: 10,
    strikes: 0,
    altLetIn: 0,
    score: 0,
    dailyResults: [],
  });
  const [dailyList, setDailyList] = useState<DailyListEntry[]>([]);
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [tools, setTools] = useState<ToolState>({ uv: 0, phone: 0, zoom: 0 });
  const [isCalling, setIsCalling] = useState(false);
  const [uvActive, setUvActive] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [currentResult, setCurrentResult] = useState<DayResult | null>(null);
  const [toolResult, setToolResult] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const visitorCountRef = useRef(0);
  const dayStatsRef = useRef({ visitorsProcessed: 0, altsCaught: 0, altsLetIn: 0, wrongRejections: 0 });

  // 启动环境音效
  useEffect(() => {
    soundManager.startAmbient('rain');
    return () => soundManager.stopAmbient();
  }, []);

  // ==========================================
  // 游戏初始化
  // ==========================================
  const initGame = useCallback(() => {
    setStats({
      currentDay: 1,
      totalDays: 10,
      strikes: 0,
      altLetIn: 0,
      score: 0,
      dailyResults: [],
    });
    setScreen('BRIEFING');
    soundManager.playSfx('door_open');
  }, []);

  // ==========================================
  // 开始新的一天
  // ==========================================
  const startDay = useCallback(() => {
    const day = stats.currentDay || 1;
    const list = generateDailyList(day);
    const config = DAY_CONFIGS[day - 1] || DAY_CONFIGS[9];
    setDailyList(list);
    setTools({ ...config.toolsAvailable });
    setUvActive(false);
    setZoomActive(false);
    setToolResult(null);
    setIsCalling(false);
    visitorCountRef.current = 0;
    dayStatsRef.current = { visitorsProcessed: 0, altsCaught: 0, altsLetIn: 0, wrongRejections: 0 };

    const v = generateVisitor(day, list);
    setVisitor(v);
    setScreen('PLAYING');
    soundManager.playSfx('door_open');
  }, [stats.currentDay]);

  // ==========================================
  // 简报继续
  // ==========================================
  const handleBriefingContinue = useCallback(() => {
    startDay();
  }, [startDay]);

  // ==========================================
  // 生成下一个访客
  // ==========================================
  const nextVisitor = useCallback(() => {
    if (!stats.currentDay) return;
    const v = generateVisitor(stats.currentDay, dailyList);
    setVisitor(v);
    setUvActive(false);
    setZoomActive(false);
    setToolResult(null);
    setIsCalling(false);
    setScreen('PLAYING');
    soundManager.playSfx('door_open');
  }, [stats.currentDay, dailyList]);

  // ==========================================
  // 工具使用
  // ==========================================
  const handleTool = useCallback((tool: 'uv' | 'phone' | 'zoom' | 'dialogue') => {
    if (!visitor || cooldown) return;

    if (tool === 'dialogue') {
      setScreen('DIALOGUE');
      return;
    }

    if (tool === 'uv' && tools.uv > 0) {
      setUvActive(true);
      const result = checkUV(visitor);
      setToolResult(`${result.result}\n${result.detail}`);
      setTools(prev => ({ ...prev, uv: prev.uv - 1 }));
      soundManager.playBeep('click');
      return;
    }

    if (tool === 'phone' && tools.phone > 0) {
      setScreen('TOOL_PHONE');
      soundManager.playSfx('phone');
      setTools(prev => ({ ...prev, phone: prev.phone - 1 }));
      return;
    }

    if (tool === 'zoom' && tools.zoom > 0) {
      setZoomActive(true);
      setTools(prev => ({ ...prev, zoom: prev.zoom - 1 }));
      soundManager.playBeep('click');
      return;
    }
  }, [visitor, tools, cooldown]);

  // ==========================================
  // 电话验证
  // ==========================================
  const handlePhoneCheck = useCallback(() => {
    if (!visitor) return;
    const result = checkPhone(visitor);
    setToolResult(`${result.result}\n${result.detail}`);
    setScreen('PLAYING');
  }, [visitor]);

  // ==========================================
  // 处理放行决定
  // ==========================================
  const handleAllow = useCallback(() => {
    if (!visitor || cooldown) return;
    setCooldown(true);

    setScreen('PROCESSING_ALLOW');
    soundManager.playSfx('door_open');

    setTimeout(() => {
      dayStatsRef.current.visitorsProcessed += 1;

      if (visitor.isAlternate) {
        // 放入了伪人！
        dayStatsRef.current.altsLetIn += 1;
        const newAltLetIn = (stats.altLetIn || 0) + 1;

        setStats(prev => ({ ...prev, altLetIn: newAltLetIn }));

        if (newAltLetIn >= 3) {
          // 死亡结局
          setTimeout(() => {
            soundManager.playSfx('alarm');
            setScreen('LOSE_DEATH');
          }, 800);
        } else {
          // 继续，但有警告
          visitorCountRef.current += 1;
          const config = DAY_CONFIGS[(stats.currentDay || 1) - 1];
          if (visitorCountRef.current >= (config?.visitorCount || 4)) {
            finishDay();
          } else {
            nextVisitor();
          }
        }
      } else {
        // 正常放行
        visitorCountRef.current += 1;
        const config = DAY_CONFIGS[(stats.currentDay || 1) - 1];
        if (visitorCountRef.current >= (config?.visitorCount || 4)) {
          finishDay();
        } else {
          nextVisitor();
        }
      }
      setCooldown(false);
    }, 600);
  }, [visitor, cooldown, stats, nextVisitor]);

  // ==========================================
  // 处理拒入决定
  // ==========================================
  const handleReject = useCallback(() => {
    if (!visitor || cooldown) return;
    setCooldown(true);

    setIsCalling(true);
    setScreen('PROCESSING_REJECT');
    soundManager.playSfx('alarm');

    setTimeout(() => {
      dayStatsRef.current.visitorsProcessed += 1;
      setIsCalling(false);

      if (!visitor.isAlternate) {
        // 错拒了正常人
        dayStatsRef.current.wrongRejections += 1;
        const newStrikes = (stats.strikes || 0) + 1;

        soundManager.playBeep('error');
        setStats(prev => ({ ...prev, strikes: newStrikes }));

        if (newStrikes >= 5) {
          setTimeout(() => setScreen('LOSE_FIRED'), 500);
          setCooldown(false);
          return;
        }

        visitorCountRef.current += 1;
        const config = DAY_CONFIGS[(stats.currentDay || 1) - 1];
        if (visitorCountRef.current >= (config?.visitorCount || 4)) {
          finishDay();
        } else {
          nextVisitor();
        }
      } else {
        // 成功拒入伪人
        dayStatsRef.current.altsCaught += 1;
        soundManager.playBeep('success');
        soundManager.playSfx('door_close');

        visitorCountRef.current += 1;
        const config = DAY_CONFIGS[(stats.currentDay || 1) - 1];
        if (visitorCountRef.current >= (config?.visitorCount || 4)) {
          finishDay();
        } else {
          nextVisitor();
        }
      }
      setCooldown(false);
    }, 1800);
  }, [visitor, cooldown, stats, nextVisitor]);

  // ==========================================
  // 完成当天
  // ==========================================
  const finishDay = useCallback(() => {
    const day = stats.currentDay || 1;
    const ds = dayStatsRef.current;

    // 计算评分
    let score = ds.visitorsProcessed * 10;
    score += ds.altsCaught * 50;
    score -= ds.altsLetIn * 100;
    score -= ds.wrongRejections * 30;
    score += tools.uv * 5 + tools.phone * 5 + tools.zoom * 5;
    score = Math.max(0, score);

    let rank = 'F';
    if (score >= 90) rank = 'S';
    else if (score >= 75) rank = 'A';
    else if (score >= 60) rank = 'B';
    else if (score >= 40) rank = 'C';
    else if (score >= 20) rank = 'D';

    const result: DayResult = {
      day,
      visitorsProcessed: ds.visitorsProcessed,
      altsCaught: ds.altsCaught,
      altsLetIn: ds.altsLetIn,
      wrongRejections: ds.wrongRejections,
      score,
      rank,
    };

    setCurrentResult(result);
    setStats(prev => ({
      ...prev,
      score: prev.score + score,
      dailyResults: [...prev.dailyResults, result],
    }));

    if (day >= 10) {
      setScreen('WIN');
    } else {
      setScreen('RESULT_DAY');
    }
  }, [stats.currentDay, tools]);

  // ==========================================
  // 结果画面继续
  // ==========================================
  const handleResultContinue = useCallback(() => {
    setStats(prev => ({ ...prev, currentDay: prev.currentDay + 1 }));
    setScreen('BRIEFING');
  }, []);

  // ==========================================
  // 渲染主游戏界面
  // ==========================================
  const renderGame = () => (
    <div className="h-screen w-full flex flex-col bg-[#1a1c1a] relative overflow-hidden">
      {/* 顶部访客窗口 */}
      <VisitorWindow
        visitor={visitor}
        isCalling={isCalling}
        day={stats.currentDay || 1}
        current={visitorCountRef.current + 1}
        total={(DAY_CONFIGS[(stats.currentDay || 1) - 1]?.visitorCount || 4)}
        strikes={stats.strikes || 0}
        altLetIn={stats.altLetIn || 0}
      />

      {/* 底部桌面操作区 */}
      <div className="h-[42vh] bg-[#2a2520] relative p-4 flex gap-4 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] border-t-4 border-[#1a1510]">
        {/* 木纹纹理 */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,119,80,0.1) 2px, rgba(139,119,80,0.1) 4px)' }}
        />

        {/* 身份证 */}
        <div className={`flex-1 transition-all ${zoomActive ? 'scale-110 z-20' : ''}`}>
          <IDCard
            idCard={visitor?.idCard || null}
            uvActive={uvActive}
            fontIssue={visitor?.anomalies.includes('WRONG_FONT') || false}
          />
        </div>

        {/* 今日名单 */}
        <DailyList list={dailyList} />

        {/* 工具面板 */}
        <ToolPanel
          tools={tools}
          onTool={handleTool}
          disabled={screen !== 'PLAYING' || isCalling}
        />

        {/* 操作按钮 */}
        <ActionButtons
          disabled={screen !== 'PLAYING' || isCalling}
          onAllow={handleAllow}
          onReject={handleReject}
        />

        {/* 工具结果显示 */}
        {toolResult && (
          <div className="absolute bottom-4 left-4 right-4 bg-[#0c0e0c]/95 border border-[#5a8f5a]/30 p-3 z-30 flex items-start gap-3">
            <div className="text-[#5a8f5a] text-xs font-mono flex-1 whitespace-pre-line">{toolResult}</div>
            <button
              onClick={() => setToolResult(null)}
              className="text-[#5a8f5a]/50 hover:text-[#5a8f5a] text-xs font-mono shrink-0"
            >
              [关闭]
            </button>
          </div>
        )}
      </div>

      {/* 叠加层：对话 */}
      {screen === 'DIALOGUE' && visitor && (
        <DialoguePanel
          visitor={visitor}
          onBack={() => setScreen('PLAYING')}
        />
      )}

      {/* 叠加层：电话验证 */}
      {screen === 'TOOL_PHONE' && (
        <div className="absolute inset-0 bg-[#0c0e0c]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#5a8f5a]/40 flex items-center justify-center mb-4 mx-auto animate-pulse">
              <div className="w-12 h-12 rounded-full bg-[#5a8f5a]/20 animate-ping" />
            </div>
            <p className="text-[#5a8f5a] text-lg font-mono font-bold mb-2">正在拨号...</p>
            <p className="text-[#8a9a7a] text-sm font-mono">{visitor?.idCard.apt}</p>
            <button
              onClick={handlePhoneCheck}
              className="mt-6 px-6 py-2 border border-[#5a8f5a]/40 text-[#5a8f5a] font-mono text-sm hover:bg-[#5a8f5a]/10 transition-colors"
            >
              听取回应
            </button>
          </div>
        </div>
      )}

      {/* 叠加层：放大镜模式提示 */}
      {zoomActive && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0c0e0c]/80 border border-[#5a8f5a]/30 px-4 py-2 z-30">
          <p className="text-[#5a8f5a] text-xs font-mono">🔍 放大镜模式 - 观察面部细节</p>
        </div>
      )}

      {/* 叠加层：每日结算 */}
      {screen === 'RESULT_DAY' && currentResult && (
        <ResultScreen
          result={currentResult}
          onContinue={handleResultContinue}
          isLastDay={false}
        />
      )}
    </div>
  );

  // ==========================================
  // 主渲染
  // ==========================================
  return (
    <div className="relative">
      {/* 全局CRT特效 */}
      {screen !== 'MENU' && <CRTOverlay />}

      {/* 菜单 */}
      {screen === 'MENU' && (
        <MenuScreen onStart={initGame} />
      )}

      {/* 简报 */}
      {screen === 'BRIEFING' && (
        <BriefingScreen
          briefing={BRIEFINGS[(stats.currentDay || 1) - 1] || BRIEFINGS[9]}
          day={stats.currentDay || 1}
          onContinue={handleBriefingContinue}
        />
      )}

      {/* 游戏主界面 */}
      {(screen === 'PLAYING' ||
        screen === 'DIALOGUE' ||
        screen === 'TOOL_UV' ||
        screen === 'TOOL_PHONE' ||
        screen === 'TOOL_ZOOM' ||
        screen === 'PROCESSING_ALLOW' ||
        screen === 'PROCESSING_REJECT' ||
        screen === 'RESULT_DAY') && renderGame()}

      {/* 失败 - 死亡 */}
      {screen === 'LOSE_DEATH' && (
        <LoseScreen type="death" stats={stats} onRestart={initGame} />
      )}

      {/* 失败 - 解雇 */}
      {screen === 'LOSE_FIRED' && (
        <LoseScreen type="fired" stats={stats} onRestart={initGame} />
      )}

      {/* 胜利 */}
      {screen === 'WIN' && (
        <WinScreen stats={stats} onRestart={initGame} />
      )}
    </div>
  );
}
