import React from 'react';
import { Target, Eye } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-[#0868A8] uppercase tracking-wider mb-2">
            About Tivera Energies Limited
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202833] tracking-tight [text-wrap:balance]">
            Practical, Engineered Solar and Electrical Solutions for Nigerian Realities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Tivera Energies Limited provides solar energy and electrical solutions designed around the energy needs, operating requirements, and budgets of our customers. From energy audits and system design to residential installations, commercial power systems, and solar mini-grids, we help customers make informed decisions about their energy needs.
          </p>
        </div>

        {/* 2-Column Grid: Core Mission & Vision + Engineering Standards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Mission Card */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0868A8]/10 text-[#0868A8] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-[#0868A8] uppercase tracking-wider mb-2">Our Mission</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Trusted African Energy &amp; Infrastructure Development
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                "{COMPANY_CONFIG.mission}"
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#0868A8]" />
              <span>Powering economic growth &amp; creating enduring value for investors and communities</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between card-hover-effect">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F58220]/10 text-[#F58220] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-[#F58220] uppercase tracking-wider mb-2">Our Vision</p>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Contributing to an Energy-Secure Future
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                "{COMPANY_CONFIG.vision}"
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#F58220]" />
              <span>Responsible application of renewable energy and electrical engineering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
