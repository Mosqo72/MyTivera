import React from 'react';
import { Sliders, Ruler, TrendingDown, Building2, ShieldCheck, Headphones } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface WhyChooseUsProps {
  onContactClick?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = () => {
  const getIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#0868A8]' };
    switch (iconName) {
      case 'Sliders':
        return <Sliders {...props} />;
      case 'Ruler':
        return <Ruler {...props} />;
      case 'TrendingDown':
        return <TrendingDown {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Headphones':
      default:
        return <Headphones {...props} />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-[#0868A8] uppercase tracking-wider mb-2">
            Why Choose Tivera Technologies
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202833] tracking-tight [text-wrap:balance]">
            Engineering Integrity & Customer-Centered Power Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our approach prioritizes realistic electrical calculations and practical reliability over generic marketing hype. Here is what defines our service commitments to residential and commercial clients.
          </p>
        </div>

        {/* 6 Core Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMPANY_CONFIG.corePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-5">
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                Commitment 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
