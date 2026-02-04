
import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { ScreenshotCard } from './components/ScreenshotCard';
import { ActionButtons } from './components/ActionButtons';
import { ResponseArea } from './components/ResponseArea';
import { InputArea } from './components/InputArea';
import { AppState, AppStateData, ChatMessage } from './types';
import { askGeminiAboutImage } from './services/geminiService';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setData] = useState<AppStateData>({
    status: AppState.EMPTY,
    screenshot: null,
    history: [],
    error: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update body background class for the surrounding page feel
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setData(prev => ({
                ...prev,
                status: AppState.READY,
                screenshot: reader.result as string,
                history: [],
                error: null
              }));
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleReset = () => {
    setData({
      status: AppState.EMPTY,
      screenshot: null,
      history: [],
      error: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCapture = async () => {
    setData(prev => ({ ...prev, status: AppState.LOADING_CAPTURE, error: null }));

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: false
      });

      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        setTimeout(() => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas.toDataURL('image/png');

          setData(prev => ({
            ...prev,
            status: AppState.READY,
            screenshot: imageData,
            history: []
          }));

          stream.getTracks().forEach(track => track.stop());
        }, 300);
      }
    } catch (err: any) {
      console.warn("Capture failed:", err);
      let errorMsg = "Permission denied.";

      if (err.name === 'NotAllowedError' || err.message?.includes('disallowed by permissions policy')) {
        errorMsg = "Browser policy blocks automatic capture. Please use 'Upload' or Paste (Cmd+V).";
      }

      setData(prev => ({
        ...prev,
        status: AppState.EMPTY,
        error: errorMsg
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          status: AppState.READY,
          screenshot: reader.result as string,
          history: [],
          error: null
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAsk = async (question: string) => {
    if (!data.screenshot) return;

    const userMsg: ChatMessage = { role: 'user', content: question };
    setData(prev => ({
      ...prev,
      status: AppState.THINKING,
      history: [...prev.history, userMsg]
    }));

    try {
      const answer = await askGeminiAboutImage(data.screenshot, question);
      const aiMsg: ChatMessage = { role: 'ai', content: answer };

      setData(prev => ({
        ...prev,
        status: AppState.READY,
        history: [...prev.history, aiMsg]
      }));
    } catch (err: any) {
      setData(prev => ({
        ...prev,
        status: AppState.ERROR,
        error: "AI failed to process image. " + err.message
      }));
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="w-[400px] h-[600px] flex flex-col overflow-hidden bg-apple-bgLight dark:bg-apple-bg rounded-[24px] shadow-2xl animate-slide-in relative border border-apple-borderLight dark:border-apple-border transition-colors duration-300">
        <Header
          onReset={handleReset}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />

        <main className="flex-1 overflow-y-auto no-scrollbar pb-[84px] p-4 space-y-4">
          <ScreenshotCard
            status={data.status}
            image={data.screenshot}
          />

          <ActionButtons
            status={data.status}
            onCapture={handleCapture}
            onUploadClick={() => fileInputRef.current?.click()}
          />

          <ResponseArea
            status={data.status}
            history={data.history}
            onClearHistory={() => setData(prev => ({ ...prev, history: [] }))}
          />

          {data.error && (
            <div className="text-apple-red text-center text-[12px] px-4 py-3 bg-apple-red/10 rounded-[14px] border border-apple-red/20 leading-tight">
              {data.error}
            </div>
          )}
        </main>

        <InputArea
          status={data.status}
          onSend={handleAsk}
        />

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
};

export default App;
