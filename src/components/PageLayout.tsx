import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F0E6] text-[#202820] selection:bg-[#C8EEA0] selection:text-[#15372E]">
      <Navbar />
      <main className="flex-1 focus:outline-none" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
