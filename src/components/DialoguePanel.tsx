import { useState } from 'react';
import { MessageCircle, ChevronLeft } from 'lucide-react';
import type { Visitor } from '../game/types';
import { getAnswer, findRealResident } from '../game/generators';
import { QUESTIONS } from '../game/data';
import { soundManager } from '../game/sound';

interface Props {
  visitor: Visitor;
  onBack: () => void;
}

export default function DialoguePanel({ visitor, onBack }: Props) {
  const [history, setHistory] = useState<{ question: string; answer: string; isLie: boolean }[]>([]);
  const [typing, setTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showQuestions, setShowQuestions] = useState(true);

  const realResident = findRealResident(visitor.idCard.idNum);

  const askQuestion = (key: string, text: string) => {
    if (typing) return;
    soundManager.playBeep('click');
    setShowQuestions(false);
    setTyping(true);
    setCurrentText('');

    const result = getAnswer(visitor, key, realResident);

    // 如果是停顿型伪人，延迟回答
    const delay = visitor.dialogueStyle === 'pause' ? 1500 : 300;

    setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setCurrentText(result.text.slice(0, idx));
        soundManager.playBeep('click');
        if (idx >= result.text.length) {
          clearInterval(interval);
          setTyping(false);
          setHistory(prev => [...prev, { question: text, answer: result.text, isLie: result.isLie }]);
          setShowQuestions(true);
          setCurrentText('');
        }
      }, visitor.dialogueStyle === 'pause' ? 80 : 40);
    }, delay);
  };

  return (
    <div className="absolute inset-0 bg-[#0c0e0c]/95 backdrop-blur-md z-40 flex flex-col p-6">
      {/* 标题栏 */}
      <div className="flex items-center gap-3 mb-4 border-b border-[#5a8f5a]/20 pb-3">
        <MessageCircle className="text-[#5a8f5a]" size={22} />
        <div>
          <h3 className="text-[#d4c9a8] font-bold font-mono">对话审讯</h3>
          <p className="text-[10px] text-[#5a8f5a]/50 font-mono">DIALOGUE INTERROGATION</p>
        </div>
        <button
          onClick={onBack}
          className="ml-auto flex items-center gap-1 px-3 py-1.5 border border-[#5a8f5a]/30 text-[#5a8f5a] text-xs font-mono hover:bg-[#5a8f5a]/10 transition-colors"
        >
          <ChevronLeft size={14} />
          返回
        </button>
      </div>

      {/* 对话历史 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
        {history.length === 0 && (
          <div className="text-center text-[#5a8f5a]/30 font-mono text-sm py-8">
            选择一个问题开始审讯...
          </div>
        )}

        {history.map((h, i) => (
          <div key={i} className="space-y-1.5">
            {/* 玩家问题 */}
            <div className="flex justify-end">
              <div className="bg-[#5a8f5a]/15 border border-[#5a8f5a]/30 px-3 py-2 rounded-sm max-w-[80%]">
                <p className="text-[#8a9a7a] text-xs font-mono">{h.question}</p>
              </div>
            </div>
            {/* 访客回答 */}
            <div className="flex justify-start">
              <div className={`bg-[#2a2520] border px-3 py-2 rounded-sm max-w-[80%] ${h.isLie ? 'border-[#8b3a3a]/40' : 'border-[#5a8f5a]/20'}`}>
                <p className={`text-xs font-mono ${h.isLie ? 'text-[#c9a8a8]' : 'text-[#d4c9a8]'}`}>
                  {h.answer}
                  {h.isLie && <span className="text-[#8b3a3a] ml-2 text-[10px]">[存疑]</span>}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* 打字中 */}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-[#2a2520] border border-[#5a8f5a]/20 px-3 py-2 rounded-sm">
              <p className="text-[#d4c9a8] text-xs font-mono">{currentText}<span className="animate-pulse">_</span></p>
            </div>
          </div>
        )}
      </div>

      {/* 问题按钮 */}
      {showQuestions && (
        <div className="grid grid-cols-3 gap-2">
          {QUESTIONS.map((q) => (
            <button
              key={q.key}
              onClick={() => askQuestion(q.key, q.text)}
              disabled={typing}
              className="px-3 py-3 bg-[#2a2520] border border-[#3a352e] text-[#d4c9a8] text-xs font-mono hover:bg-[#3a352e] hover:border-[#5a8f5a]/30 transition-all disabled:opacity-30 text-center leading-tight"
            >
              {q.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
