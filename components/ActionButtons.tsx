import React from 'react';
import { AppState } from '../types';

interface Props {
  status: AppState;
  onCapture: () => void;
  onUploadClick: () => void;
}

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 8.5C4 7.12 5.12 6 6.5 6H8l1.5-2h5L16 6h1.5C18.88 6 20 7.12 20 8.5v8c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 19 4 17.88 4 16.5v-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 19h16M12 4v11M7.5 9.5 12 4l4.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
            <CameraIcon />
            <span>Capture</span>
          </>
        )}
      </button>

      <button
        onClick={onUploadClick}
        disabled={isLoading}
        className="w-11 h-11 flex items-center justify-center bg-black/5 dark:bg-white/10 border border-apple-borderLight dark:border-apple-border rounded-[14px] text-apple-textPrimaryLight dark:text-apple-textPrimary font-medium text-[14px] hover:bg-black/10 dark:hover:bg-white/15 active:scale-[0.98] transition-all disabled:opacity-20"
        title="Upload image"
      >
        <UploadIcon />
      </button>
    </div>
  );
};
