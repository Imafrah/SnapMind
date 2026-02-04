
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Extension "Invisible Capture" Hijack
// This overrides the built-in getDisplayMedia to use Chrome's extension capture API
// instead of showing the browser selection dialog.
if (typeof chrome !== 'undefined' && chrome.tabs) {
  // @ts-ignore
  navigator.mediaDevices.getDisplayMedia = async () => {
    return new Promise((resolve) => {
      chrome.tabs.captureVisibleTab(null as any, { format: 'png' }, async (dataUrl) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            // @ts-ignore
            const stream = canvas.captureStream(30);
            resolve(stream);
          }
        };
        img.src = dataUrl;
      });
    });
  };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
