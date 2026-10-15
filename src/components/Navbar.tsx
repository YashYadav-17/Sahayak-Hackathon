import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Briefcase, UserCheck, ShieldAlert, Sparkles, Users } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/work', label: 'Find Work', icon: Briefcase },
    { to: '/hire', label: 'Hire Workers', icon: Users },
    { to: '/profile', label: 'My Profile', icon: UserCheck },
    { to: '/support', label: 'Rights & Support', icon: ShieldAlert },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Editorial Typography */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[#0F766E] rounded-lg p-1 -ml-1 transition-transform"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform border border-[#14B8A6]/40">
              <span className="font-serif text-xl leading-none">स</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl tracking-tight text-[#111827] leading-none">
                  SAHAYAK
                </span>
                <span className="font-medium text-base text-[#0F766E] font-serif leading-none">
                  (सहायक)
                </span>
              </div>
              <span className="text-[10px] text-slate-500 tracking-wider font-medium mt-0.5">
                Dignified Work, Fair Pay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0F766E] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0F766E] hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action / Mobile Trigger */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/work"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-colors duration-150 shadow-xs"
            >
              <span>Find Work</span>
            </Link>

            <Link
              to="/hire"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors duration-150 shadow-xs"
            >
              <span>Post a Job</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-lg border border-[#E2E8F0] bg-white text-[#111827] hover:bg-slate-100 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#0F766E]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#111827]" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-[#111827]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200"
        >
          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0F766E] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 opacity-90" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
              Artemis 2026 • Fair Labor Platform
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
