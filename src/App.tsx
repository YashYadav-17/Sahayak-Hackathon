import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { HirePage } from './pages/HirePage';
import { ProfilePage } from './pages/ProfilePage';
import { SupportPage } from './pages/SupportPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MotionLabPage } from './pages/MotionLabPage';

import { LanguageProvider } from './i18n/LanguageContext';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Isolated Development-Only Motion Lab Route */}
          <Route path="/motion-lab" element={<MotionLabPage />} />

          {/* Existing Application Shell & Routes */}
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="hire" element={<HirePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
