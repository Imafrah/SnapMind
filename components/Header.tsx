
import React from 'react';

interface Props {
  onReset: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<Props> = ({ onReset, isDarkMode, onToggleTheme }) => {
  return (
    <header className="h-[56px] px-5 flex items-center justify-between border-b border-apple-borderLight dark:border-apple-border apple-glass bg-white/70 dark:bg-white/5 sticky top-0 z-30 shrink-0 transition-colors duration-300">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">🎨</span>
        <h1 className="text-[17px] font-semibold text-apple-textPrimaryLight dark:text-apple-textPrimary tracking-[-0.2px]">
          SnapMind
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all group"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </button>
        <button
          onClick={onReset}
          className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all group relative"
          title="Reset Conversation"
        >
          <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">🔄</span>
        </button>
        <div className="flex items-center gap-1.5 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-green shadow-[0_0_8px_rgba(52,199,89,0.4)] animate-pulse-slow"></span>
          <span className="text-[13px] text-apple-textSecondaryLight dark:text-apple-textSecondary">Live</span>
        </div>
      </div>
    </header>
  );
};
