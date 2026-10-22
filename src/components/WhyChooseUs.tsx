import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Handshake,
  Globe2,
} from 'lucide-react';

interface WhyChooseUsProps {
  onContactClick?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onContactClick }) => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="text-xs font-semibold text-[#0868A8] uppercase tracking-wider mb-2">
            Why Choose Tivera Energies
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202833] tracking-tight [text-wrap:balance]">
            Built with a Long-Term Perspective, Technical Capability &amp; Enduring Value
          </h2>
        </div>

        {/* Coined Strategic Write-up Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p className="font-semibold text-slate-900 text-lg sm:text-xl">
                Tivera Energies is being built with a long-term perspective. We believe successful energy and infrastructure businesses must combine strong commercial fundamentals with technical capability, sound governance, and an understanding of local market realities.
              </p>
              <p>
                Our objective is not simply to participate in the energy market, but to develop a portfolio of projects capable of creating lasting value for our investors, partners, customers, and the communities in which we operate.
              </p>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#0868A8]/5 via-blue-50/60 to-orange-50/40 rounded-2xl border border-blue-100 p-6 sm:p-7">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#0868A8] mb-3">
                <Handshake className="w-4 h-4 text-[#F58220]" />
                <span>Strategic Partnerships</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                We are particularly interested in partnerships with investors, financial institutions, infrastructure funds, technology providers, engineering firms, development institutions, and strategic corporate partners who share our vision for sustainable infrastructure and energy development in Nigeria.
              </p>
              {onContactClick && (
                <div className="mt-5 pt-5 border-t border-blue-200/60">
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0868A8] hover:text-[#064e7e] transition-colors cursor-pointer"
                  >
                    <span>Connect Regarding Strategic Partnerships</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Core Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs card-hover-effect flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-5 text-[#0868A8]">
                <TrendingUp className="w-6 h-6 text-[#0868A8]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                Commercial Fundamentals &amp; Sound Governance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Disciplined capital allocation, realistic financial modeling, transparent corporate governance, and institutional accountability at every stage of project development.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-mono text-[#0868A8] font-semibold">
              Pillar 01 · Governance &amp; Viability
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs card-hover-effect flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center mb-5 text-[#0868A8]">
                <ShieldCheck className="w-6 h-6 text-[#0868A8]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                Technical Capability &amp; Engineering Rigor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Precision electrical engineering, high-tier component standards, and robust system sizing that ensure dependable uptime and lifetime asset performance.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-mono text-[#0868A8] font-semibold">
              Pillar 02 · Engineering Excellence
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs card-hover-effect flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-50/80 border border-orange-100 flex items-center justify-center mb-5 text-[#F58220]">
                <Globe2 className="w-6 h-6 text-[#F58220]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                Local Market Realities &amp; Community Value
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Deep on-the-ground understanding of Nigerian infrastructure conditions, tailoring projects to deliver measurable economic growth and community impact.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-mono text-[#F58220] font-semibold">
              Pillar 03 · Enduring Impact
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
