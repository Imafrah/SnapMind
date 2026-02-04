
import React, { useEffect, useRef } from 'react';
import { AppState, ChatMessage } from '../types';

interface Props {
  status: AppState;
  history: ChatMessage[];
  onClearHistory: () => void;
}

/**
 * Utility to strip common markdown artifacts and formatting noise from AI responses
 */
const cleanText = (text: string) => {
  if (!text) return "";
  
  return text
    .replace(/\*\*/g, '')           // Remove bold markers
    .replace(/#{1,6}\s?/g, '')      // Remove header markers
    .replace(/`{1,3}/g, '')         // Remove backticks
    .replace(/^-{3,}/gm, '')        // Remove horizontal lines (markdown separators)
    .replace(/^\*{3,}/gm, '')        // Remove horizontal lines (asterisk version)
    .replace(/^[-*]\s/gm, '• ')      // Convert markdown bullets to plain circles
    .replace(/\n{3,}/g, '\n\n')     // Collapse excessive newlines (3+ into just 2)
    .replace(/^\s+|\s+$/g, '')      // Trim leading/trailing whitespace
    .trim();
};

export const ResponseArea: React.FC<Props> = ({ status, history, onClearHistory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history, status]);

  if (history.length === 0 && status !== AppState.THINKING) {
    return (
      <div className="w-full min-h-[100px] apple-glass bg-white/40 dark:bg-white/5 border-apple-borderLight dark:border-apple-border rounded-[18px] flex flex-col items-center justify-center p-8 transition-all hover:shadow-sm">
        <div className="text-4xl opacity-50 mb-3">🤖</div>
        <p className="text-[14px] text-apple-textTertiaryLight dark:text-apple-textTertiary text-center">Ask a question about the captured screenshot</p>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="w-full max-h-[300px] overflow-y-auto no-scrollbar apple-glass bg-white/40 dark:bg-white/5 border-apple-borderLight dark:border-apple-border rounded-[18px] p-5 space-y-4 shadow-sm transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-apple-textSecondaryLight dark:text-apple-textSecondary uppercase tracking-[1px]">
          Conversation
        </span>
        <div className="flex gap-2">
          <button 
            onClick={onClearHistory}
            className="opacity-40 hover:opacity-100 transition-opacity p-1 text-black dark:text-white"
            title="Clear Chat"
          >
            <span className="text-sm">🗑️</span>
          </button>
        </div>
      </div>

      {history.map((msg, i) => (
        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[92%] px-4 py-3 rounded-[20px] text-[14px] leading-[1.6] shadow-sm whitespace-pre-wrap ${
            msg.role === 'user' 
              ? 'bg-apple-blue text-white rounded-tr-none font-medium' 
              : 'bg-white dark:bg-white/10 text-apple-textPrimaryLight dark:text-apple-textPrimary border border-apple-borderLight dark:border-apple-border rounded-tl-none font-normal'
          }`}>
            {msg.role === 'ai' ? cleanText(msg.content) : msg.content}
          </div>
        </div>
      ))}

      {status === AppState.THINKING && (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="flex gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-typing [animation-delay:-0.32s]"></span>
            <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-typing [animation-delay:-0.16s]"></span>
            <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-typing"></span>
          </div>
          <p className="text-[11px] text-apple-textSecondaryLight dark:text-apple-textSecondary font-medium">Analyzing screenshot...</p>
        </div>
      )}
    </div>
  );
};
