import React, { useState } from 'react';
import { ArrowRight, Sun, Zap, Boxes, ClipboardList, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface HeroProps {
  onContactClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onExploreServices }) => {
  const [heroImgSrc, setHeroImgSrc] = useState(
    COMPANY_CONFIG.heroImageDirectUrl || COMPANY_CONFIG.heroImageUrl || 'https://i.imgur.com/gSUDqzr.png'
  );

  const handleHeroImgError = () => {
    if (heroImgSrc !== COMPANY_CONFIG.heroImageLocalFallback) {
      setHeroImgSrc(COMPANY_CONFIG.heroImageLocalFallback);
    } else {
      setHeroImgSrc('/src/assets/images/hero_solar_abuja_1792352278476.jpg');
    }
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F4F7FA] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Split: Content & Real High-Fidelity Solar Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTA (7 cols) */}
          <div className="lg:col-span-7 space-y-6 animate-fade-in-up">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#202833] leading-[1.15] tracking-tight [text-wrap:balance]">
              Reliable Solar and General Power Solutions for Your{' '}
              <span className="text-[#0868A8] relative inline-block">
                Home
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[#F58220]/40 -z-10 rounded"></span>
              </span>{' '}
              and{' '}
              <span className="text-[#0868A8]">Business</span>
            </h1>

            {/* Supporting Copy from Prompt */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {COMPANY_CONFIG.subheadline}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onContactClick}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-[#0868A8] hover:bg-[#07588f] active:bg-[#05436e] rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Send an Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#F58220] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Key Service Highlights List (Unboxed, clean) */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0868A8] shrink-0" />
                <span>Tailored to actual appliance loads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0868A8] shrink-0" />
                <span>Certified electrical safety & earthing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0868A8] shrink-0" />
                <span>Cost-conscious engineering & audits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0868A8] shrink-0" />
                <span>Direct consultation & transparent quotes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl group">
              {/* High-Fidelity Solar Installation Image */}
              <img
                src={heroImgSrc}
                alt="Modern solar and general power system installation"
                referrerPolicy="no-referrer"
                onError={handleHeroImgError}
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover group-hover:scale-102 transition-transform duration-500"
              />

              {/* Scrim Overlay for crisp legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Solar engineering badge card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#0868A8] flex items-center justify-center">
                      <Sun className="w-4 h-4 text-[#F58220]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">Tivera Solar Engineering</p>
                      <p className="text-[11px] text-slate-300">Clean, Quiet & Dependable Energy</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    Abuja, Nigeria
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  Eliminate blackouts and cut fuel expenditure with properly engineered solar power installations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Capability Strip below hero split */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-slate-200/90 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0868A8]">
              <Sun className="w-5 h-5 text-[#F58220] shrink-0" />
              <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-slate-900">Solar Services</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Rooftop systems, mini-grids & solar backup</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0868A8]">
              <Zap className="w-5 h-5 text-[#F58220] shrink-0" />
              <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-slate-900">Electrical Services</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Wiring, panel boards & surge protection</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0868A8]">
              <Boxes className="w-5 h-5 text-[#F58220] shrink-0" />
              <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-slate-900">Supply of Energy Systems</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Generators, storage batteries & solar gear</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0868A8]">
              <ClipboardList className="w-5 h-5 text-[#F58220] shrink-0" />
              <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-slate-900">Consultation Services</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">Audits, system sizing & transparent quotes</p>
          </div>
        </div>
      </div>
    </section>
  );
};
