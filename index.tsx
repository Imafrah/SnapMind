
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
    return new Promise((resolve, reject) => {
      chrome.tabs.captureVisibleTab({ format: 'png' }, (dataUrl) => {
        const lastError = chrome.runtime?.lastError;
        if (lastError) {
          reject(new Error(lastError.message));
          return;
        }

        if (!dataUrl) {
          reject(new Error("No screenshot data was returned."));
          return;
        }

        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx || !canvas.captureStream) {
            reject(new Error("Unable to convert screenshot to a stream."));
            return;
          }

          ctx.drawImage(img, 0, 0);
          const stream = canvas.captureStream(30);
          resolve(stream);
        };
        img.onerror = () => reject(new Error("Unable to load screenshot data."));
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
