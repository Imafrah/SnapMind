
import React from 'react';
import { AppState } from '../types';

interface Props {
  status: AppState;
  image: string | null;
}

export const ScreenshotCard: React.FC<Props> = ({ status, image }) => {
  if (status === AppState.LOADING_CAPTURE) {
    return (
      <div className="w-full h-[220px] rounded-[18px] border border-apple-borderLight dark:border-apple-border shimmer-gradient animate-shimmer bg-black/5 dark:bg-white/5" />
    );
  }

  return (
    <div className="w-full apple-glass bg-white/40 dark:bg-white/5 border-apple-borderLight dark:border-apple-border rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 shadow-sm dark:shadow-md">
      {!image ? (
        <div className="py-12 px-6 text-center border-2 border-dashed border-apple-borderLight dark:border-apple-border rounded-[18px] bg-white/30 dark:bg-white/[0.03]">
          <div className="text-5xl opacity-40 mb-4">📸</div>
          <p className="text-[15px] font-medium text-apple-textSecondaryLight dark:text-apple-textSecondary mb-2">No screenshot yet</p>
          <p className="text-[11px] text-apple-textTertiaryLight dark:text-apple-textTertiary">Click capture, upload, or paste (Cmd+V)</p>
        </div>
      ) : (
        <div className="relative group">
          <img 
            src={image} 
            alt="Captured" 
            className="w-full h-auto max-h-[220px] object-cover block"
          />
          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[11px] text-white/90">
            Current Image
          </div>
        </div>
      )}
    </div>
  );
};
