import React, { useEffect, useRef } from 'react';
import { AppState, ChatMessage } from '../types';

interface Props {
  status: AppState;
  history: ChatMessage[];
  onClearHistory: () => void;
}

const cleanText = (text: string) => {
  if (!text) return "";

  return text
    .replace(/\*\*/g, '')
    .replace(/#{1,6}\s?/g, '')
    .replace(/`{1,3}/g, '')
    .replace(/^-{3,}/gm, '')
    .replace(/^\*{3,}/gm, '')
    .replace(/^[-*]\s/gm, '* ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

const formatAiText = (text: string) => {
  return cleanText(text)
    .split('\n')
    .map((line, index) => {
      const isHeading = /^(SUMMARY|DETAILS|NEXT STEPS|OBSERVATIONS|ANSWER)$/i.test(line.trim());

      if (isHeading) {
        return (
          <div key={index} className="text-[11px] font-bold uppercase text-apple-textSecondaryLight dark:text-apple-textSecondary mt-2 first:mt-0">
            {line.trim().toUpperCase()}
          </div>
        );
      }

      return <React.Fragment key={index}>{line}{index < cleanText(text).split('\n').length - 1 ? '\n' : ''}</React.Fragment>;
    });
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
        <div className="w-10 h-10 opacity-50 mb-3 rounded-full border border-current flex items-center justify-center text-[13px] font-semibold">AI</div>
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
        <button
          onClick={onClearHistory}
          className="opacity-40 hover:opacity-100 transition-opacity px-2 py-1 text-[11px] font-semibold text-black dark:text-white"
          title="Clear Chat"
        >
          Clear
        </button>
      </div>

      {history.map((msg, i) => (
        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[92%] px-4 py-3 rounded-[20px] text-[14px] leading-[1.6] shadow-sm whitespace-pre-wrap ${
            msg.role === 'user'
              ? 'bg-apple-blue text-white rounded-tr-none font-medium'
              : 'bg-white dark:bg-white/10 text-apple-textPrimaryLight dark:text-apple-textPrimary border border-apple-borderLight dark:border-apple-border rounded-tl-none font-normal'
          }`}>
            {msg.role === 'ai' ? formatAiText(msg.content) : msg.content}
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
