import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface ContactSectionProps {
  onOpenEmailModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenEmailModal }) => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F4F7FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-[#0868A8] uppercase tracking-wider mb-2">
            Head Office & Contact Details
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202833] tracking-tight [text-wrap:balance]">
            Get In Touch With Tivera Technologies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Visit our physical office in Gudu District, Abuja, or connect directly with our engineering and support desks via telephone, email, or WhatsApp.
          </p>
        </div>

        {/* 3-Column Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {/* Card 1: Office Location */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs card-hover-effect flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0868A8] flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6 text-[#F58220]" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office Location</p>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Anon Plaza, Gudu
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {COMPANY_CONFIG.office.address}
              </p>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100">
              <a
                href={COMPANY_CONFIG.office.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#0868A8] hover:text-[#07588f] font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Telephone Inquiries */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs card-hover-effect flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0868A8] flex items-center justify-center mb-5">
                <Phone className="w-6 h-6 text-[#0868A8]" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Direct Lines</p>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Phone Support
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <a
                    href={COMPANY_CONFIG.phones[0].telLink}
                    className="font-bold text-[#0868A8] hover:underline text-base"
                  >
                    {COMPANY_CONFIG.phones[0].number}
                  </a>
                  <span className="text-slate-500 block text-xs mt-0.5">Support & Engineering Desk</span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{COMPANY_CONFIG.office.workingHours}</span>
            </div>
          </div>

          {/* Card 3: Email & WhatsApp Channels */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs card-hover-effect flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0868A8] flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-[#0868A8]" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Online Channels</p>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Email & WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-3">
                Send a direct email message or start an instant chat on WhatsApp.
              </p>
              <p className="text-xs font-mono font-semibold text-[#0868A8] mb-4">
                {COMPANY_CONFIG.email}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenEmailModal}
                className="w-full py-2.5 px-3 rounded-lg bg-[#0868A8] hover:bg-[#07588f] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Send Us an Email</span>
              </button>

              {COMPANY_CONFIG.whatsapp.enabled && (
                <a
                  href={`https://wa.me/${COMPANY_CONFIG.whatsapp.cleanNumber}?text=${encodeURIComponent(
                    COMPANY_CONFIG.whatsapp.defaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Office Location Banner */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0868A8] uppercase tracking-wider">
              <Building className="w-4 h-4 text-[#F58220]" />
              <span>Head Office</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Suite 31C, Anon Plaza, Gudu, FCT Abuja, Nigeria
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Clients are welcome to visit our office for in-person energy consultations, appliance audit bookings, and technical discussions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
