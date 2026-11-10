import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global unhandled rejection listener to suppress benign Vite client WebSocket errors
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || '';
    const stack = event.reason?.stack || '';
    if (
      message.includes('WebSocket') ||
      message.includes('closed without opened') ||
      message.includes('failed to connect to websocket') ||
      message.includes('vite:ws') ||
      stack.includes('@vite/client')
    ) {
      event.preventDefault();
    }
  });

  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const msg = args.map(String).join(' ');
    if (
      msg.includes('failed to connect to websocket') ||
      msg.includes('WebSocket connection to') ||
      msg.includes('[vite] connecting...')
    ) {
      return; // Suppress iframe proxy WS reconnect noise
    }
    originalConsoleError(...args);
  };
}

createRoot(document.getElementById('root')!).render(<App />);
