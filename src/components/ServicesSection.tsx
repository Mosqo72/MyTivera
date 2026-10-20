import React, { useState } from 'react';
import {
  Compass,
  Activity,
  Cpu,
  Home,
  Building,
  Grid,
  Sun,
  Zap,
  Boxes,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { COMPANY_CONFIG, ServiceItem } from '../config/company';

interface ServicesSectionProps {
  onSelectService?: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#0868A8]' };
    switch (iconName) {
      case 'Compass':
        return <Compass {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Home':
        return <Home {...props} />;
      case 'Building':
        return <Building {...props} />;
      case 'Grid':
        return <Grid {...props} />;
      case 'Sun':
        return <Sun {...props} />;
      case 'Boxes':
        return <Boxes {...props} />;
      case 'Zap':
      default:
        return <Zap {...props} />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F4F7FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-[#0868A8] uppercase tracking-wider mb-2">
            Engineering & Power Solutions
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202833] tracking-tight [text-wrap:balance]">
            Comprehensive Solar & Electrical Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every power challenge is unique. We provide end-to-end solar engineering, diagnostics, residential systems, commercial installations, and electrical services tailored to your appliances and operating hours.
          </p>
        </div>

        {/* 8-Card Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMPANY_CONFIG.services.map((service: ServiceItem, index: number) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm card-hover-effect flex flex-col justify-between p-6 sm:p-7 relative group"
              >
                <div>
                  {/* Category & Natural Numerical Index (No slashes or pills) */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    <span className="font-semibold text-[#0868A8]">{service.category}</span>
                    <span className="font-mono text-slate-400">0{index + 1}</span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0868A8] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Expandable Deliverables Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.fullDescription}
                      </p>
                      <div className="space-y-1.5 pt-2">
                        <p className="text-xs font-semibold text-slate-900">Key Deliverables:</p>
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <Check className="w-3.5 h-3.5 text-[#F58220] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Scope Toggle Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleExpand(service.id)}
                    className="text-xs font-semibold text-[#0868A8] hover:text-[#07588f] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide technical scope' : 'View technical scope & deliverables'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5 text-[#F58220]" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
