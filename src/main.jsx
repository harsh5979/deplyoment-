import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>

    <App />
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000, // better than autoclose, smoother UX
    style: {
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      color: '#f8fafc',
      borderRadius: '12px',
      padding: '14px 18px',
      fontSize: '0.95rem',
      boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    success: {
      style: {
        background: 'linear-gradient(135deg, #065f46, #10b981)',
        color: '#ecfdf5',
      },
      iconTheme: {
        primary: '#34d399',
        secondary: '#064e3b',
      },
    },
    error: {
      style: {
        background: 'linear-gradient(135deg, #7f1d1d, #ef4444)',
        color: '#fee2e2',
      },
      iconTheme: {
        primary: '#f87171',
        secondary: '#7f1d1d',
      },
    },
    loading: {
      style: {
        background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
        color: '#dbeafe',
      },
      iconTheme: {
        primary: '#60a5fa',
        secondary: '#1e3a8a',
      },
    },
  }}
/>

    </QueryClientProvider>);