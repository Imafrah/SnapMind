import React, { useState } from 'react';
import { AppState } from '../types';

interface Props {
  status: AppState;
  onSend: (text: string) => void;
}

export const InputArea: React.FC<Props> = ({ status, onSend }) => {
  const [value, setValue] = useState('');
  const isThinking = status === AppState.THINKING;
  const isCaptureLoading = status === AppState.LOADING_CAPTURE;
  const isEmpty = status === AppState.EMPTY;
  
  const isInputDisabled = isEmpty || isThinking || isCaptureLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isInputDisabled) {
      onSend(value.trim());
      setValue('');
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-apple-bgLight/90 dark:bg-apple-bg/95 backdrop-blur-xl border-t border-apple-borderLight dark:border-apple-border z-50 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <input 
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isInputDisabled}
            placeholder={isEmpty ? "Capture screenshot first..." : "Ask a question..."}
            className="w-full h-11 px-4 bg-white/50 dark:bg-white/[0.05] border border-apple-borderLight dark:border-apple-border rounded-full text-[15px] text-apple-textPrimaryLight dark:text-apple-textPrimary placeholder:text-apple-textTertiaryLight dark:placeholder:text-apple-textTertiary focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/10 dark:focus:ring-apple-blue/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          />
        </div>
        
        <div className="w-11 h-11 flex items-center justify-center shrink-0">
          {isThinking ? (
            <div className="flex gap-1.5 items-center justify-center animate-fade-in">
              <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-typing [animation-delay:-0.32s]"></span>
              <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-typing [animation-delay:-0.16s]"></span>
              <span className="w-1.5 h-1.5 bg-apple-blue rounded-full animate-typing"></span>
            </div>
          ) : (
            <button 
              type="submit"
              disabled={isInputDisabled || !value.trim()}
              className="w-11 h-11 flex items-center justify-center bg-apple-blue text-white rounded-full hover:bg-apple-blueHover hover:scale-105 active:scale-95 disabled:bg-black/10 dark:disabled:bg-white/10 disabled:text-apple-textTertiary transition-all shadow-sm relative overflow-hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 10L18 2L10 18L8 11L2 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};