import React from 'react';
import { AppState } from '../types';

interface Props {
  status: AppState;
  image: string | null;
}

const CameraIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 8.5C4 7.12 5.12 6 6.5 6H8l1.5-2h5L16 6h1.5C18.88 6 20 7.12 20 8.5v8c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 19 4 17.88 4 16.5v-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

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
          <div className="mx-auto w-12 h-12 opacity-40 mb-4 rounded-[14px] border border-current flex items-center justify-center">
            <CameraIcon />
          </div>
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
