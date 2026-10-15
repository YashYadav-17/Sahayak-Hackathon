import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { VoiceAssistant } from './VoiceAssistant';

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827] selection:bg-[#14B8A6]/20 selection:text-[#0F766E]">
      <Navbar />
      <main className="flex-1 focus:outline-none" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {/* Global Multilingual Voice Help Assistant */}
      <VoiceAssistant />
    </div>
  );
};
