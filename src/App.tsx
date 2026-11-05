import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { GlobalSnowfall } from './components/effects/GlobalSnowfall.tsx';

export default function App() {
  return (
    <BrowserRouter>
      {/* Subtle atmospheric snowfall particle animation across the entire application */}
      <GlobalSnowfall />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
