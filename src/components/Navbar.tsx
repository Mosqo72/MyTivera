import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, Sun, ChevronRight, Shield } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface NavbarProps {
  onContactClick: () => void;
  onOpenOwnerPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, onOpenOwnerPortal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(COMPANY_CONFIG.logoDirectUrl || COMPANY_CONFIG.logoUrl);
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    if (logoSrc !== COMPANY_CONFIG.logoLocalFallback) {
      setLogoSrc(COMPANY_CONFIG.logoLocalFallback);
    } else {
      setLogoError(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Tivera', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification / Utility strip */}
      <div className="bg-[#0868A8] text-white text-xs py-2 px-3 sm:px-4 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 text-blue-100 min-w-0">
            <span className="flex items-center gap-1.5 font-medium truncate text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-[#F58220] shrink-0" />
              <span className="truncate">Suite 31C, Anon Plaza, Gudu, FCT Abuja</span>
            </span>
            <span className="hidden md:inline text-blue-300">|</span>
            <span className="hidden md:inline text-blue-100 text-xs">Powering Progress. Delivering Sustainable Energy Solutions and Building Infrastructure.</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_CONFIG.phones[0].number}`}
              className="flex items-center gap-1.5 text-white hover:text-amber-300 font-medium text-[11px] sm:text-xs transition-colors"
              title="Call our support desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#F58220]" />
              <span className="hidden xs:inline sm:inline">Call Support Desk</span>
              <span className="xs:hidden sm:hidden">Support Desk</span>
            </a>
            <button
              onClick={onOpenOwnerPortal}
              title="Business Owner Portal"
              className="text-[11px] sm:text-xs text-blue-200 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-blue-900/40 hover:bg-blue-900/80 transition-colors cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#F58220]" />
              <span className="hidden sm:inline">Owner Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Brand wordmark with logo */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 tracking-tight text-[#0868A8] shrink-0 group min-w-0"
          >
            <img
              src={logoSrc}
              alt="Tivera Energies Limited Logo"
              referrerPolicy="no-referrer"
              onError={handleLogoError}
              className={logoError ? 'hidden' : 'h-8 sm:h-9 lg:h-10 w-auto max-w-[100px] sm:max-w-[130px] object-contain rounded shrink-0'}
            />
            {logoError && (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#0868A8] to-[#064e7e] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#F58220]" />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold tracking-tight text-[#0868A8] leading-tight text-sm sm:text-base md:text-lg lg:text-xl truncate">
                Tivera <span className="text-[#0868A8] font-bold">Energies Limited</span>
              </span>
              <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold text-[#F58220] tracking-wide leading-none truncate max-w-[210px] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-none">
                Powering Progress. Delivering Sustainable Energy Solutions and Building Infrastructure.
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links (desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#0868A8] transition-colors whitespace-nowrap shrink-0 py-1 hover:border-b-2 hover:border-[#F58220]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Action button & mobile/tablet toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#0868A8] hover:bg-[#07588f] active:bg-[#05436e] rounded-lg shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-[#F58220]" />
            </button>

            {/* Mobile / Tablet menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#0868A8] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0868A8] cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet dropdown drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-2 sm:space-y-3 max-w-md mx-auto">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-[#0868A8] hover:bg-blue-50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-[#0868A8] hover:bg-[#07588f] rounded-lg shadow transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
                <div className="mt-1">
                  <a
                    href={`tel:${COMPANY_CONFIG.phones[0].number}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold rounded-lg bg-blue-50 text-[#0868A8] border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Call Support &amp; Engineering Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
