
import React from 'react';
import { AppState } from '../types';

interface Props {
  status: AppState;
  onCapture: () => void;
  onUploadClick: () => void;
}

export const ActionButtons: React.FC<Props> = ({ status, onCapture, onUploadClick }) => {
  const isLoading = status === AppState.LOADING_CAPTURE;

  return (
    <div className="flex gap-2 w-full">
      <button
        onClick={onCapture}
        disabled={isLoading}
        className="flex-1 h-11 flex items-center justify-center gap-2 bg-gradient-to-b from-apple-blue to-apple-blueHover border-none rounded-[14px] text-white font-semibold text-[14px] shadow-[0_2px_8px_rgba(0,122,255,0.3)] hover:shadow-[0_4px_12px_rgba(0,122,255,0.4)] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>
            <span className="text-base">📸</span>
            <span>Capture</span>
          </>
        )}
      </button>

      <button
        onClick={onUploadClick}
        disabled={isLoading}
        className="px-4 h-11 flex items-center justify-center gap-2 bg-black/5 dark:bg-white/10 border border-apple-borderLight dark:border-apple-border rounded-[14px] text-apple-textPrimaryLight dark:text-apple-textPrimary font-medium text-[14px] hover:bg-black/10 dark:hover:bg-white/15 active:scale-[0.98] transition-all disabled:opacity-20"
      >
        <span>📂</span>
      </button>
    </div>
  );
};
