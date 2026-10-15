import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[#15372E] text-[#C8EEA0] flex items-center justify-center mx-auto mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="font-serif text-4xl font-bold text-[#15372E] mb-3">404</h1>
      <p className="text-lg text-[#4A5649] mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15372E] text-[#F5F0E6] text-sm font-semibold hover:bg-[#1C483D] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
