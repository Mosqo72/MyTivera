import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!COMPANY_CONFIG.whatsapp.enabled) return null;

  const cleanNumber = '2347033064125';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    COMPANY_CONFIG.whatsapp.defaultMessage || 'Hello Tivera Energies Limited, I would like to make an enquiry regarding your solar and general power solutions.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-3 p-3 bg-white text-slate-800 rounded-xl shadow-lg border border-slate-200 text-xs max-w-xs animate-in fade-in duration-200 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="font-bold text-[#0868A8] mb-0.5">WhatsApp Tivera Energies Limited</p>
          <p className="text-slate-600">
            Chat directly with our engineering desk on WhatsApp for instant solar &amp; general power consultation.
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with Tivera Energies Limited on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none opacity-75" />
        <MessageCircle className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
};
