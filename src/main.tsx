import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global unhandled rejection and console filter to suppress container WebSocket reconnect errors
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason || '');
    if (
      reason.includes('failed to connect to websocket') ||
      reason.includes('WebSocket') ||
      reason.includes('vite:ws')
    ) {
      event.preventDefault();
      event.stopPropagation();
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
