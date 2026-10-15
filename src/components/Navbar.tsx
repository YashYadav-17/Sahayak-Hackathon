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
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Editorial Typography */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-[#0F766E] rounded-lg p-1 -ml-1 transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-[#0F766E] text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform border border-[#14B8A6]/40">
              <span className="font-serif text-2xl leading-none">स</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-2xl tracking-tight text-[#111827] leading-none">
                  SAHAYAK
                </span>
                <span className="font-medium text-lg text-[#0F766E] font-serif leading-none">
                  (सहायक)
                </span>
              </div>
              <span className="text-xs text-[#334155] tracking-wider font-medium mt-1">
                Dignified Work, Fair Pay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#0F766E] text-white shadow-xs'
                        : 'text-[#334155] hover:text-[#0F766E] hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 opacity-80" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action / Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Link
              to="/work"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F766E] text-white text-xs font-semibold hover:bg-[#115E59] transition-colors shadow-xs"
            >
              <span>Get Started</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#111827] hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#0F766E]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#111827]" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-[#111827]" aria-hidden="true" />
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0F766E] text-white'
                      : 'text-[#334155] hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 opacity-90" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#14B8A6]" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#334155]">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              Artemis 2026 • Fair Labor Platform
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
