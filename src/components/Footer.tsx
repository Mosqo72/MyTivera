import React from 'react';
import { Sun, Phone, Mail, MapPin, ExternalLink, Shield } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenOwnerPortal: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenOwnerPortal,
  onSelectService,
}) => {
  const currentYear = new Date().getFullYear();
  const [logoSrc, setLogoSrc] = React.useState(COMPANY_CONFIG.logoDirectUrl || COMPANY_CONFIG.logoUrl);
  const [logoError, setLogoError] = React.useState(false);

  const handleLogoError = () => {
    if (logoSrc !== COMPANY_CONFIG.logoLocalFallback) {
      setLogoSrc(COMPANY_CONFIG.logoLocalFallback);
    } else {
      setLogoError(true);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-xl font-bold text-white tracking-tight">
              <img
                src={logoSrc}
                alt="Tivera Technologies Logo"
                referrerPolicy="no-referrer"
                onError={handleLogoError}
                className={logoError ? 'hidden' : 'h-8 sm:h-9 w-auto max-w-[120px] object-contain rounded'}
              />
              {logoError && (
                <div className="w-8 h-8 rounded-lg bg-[#0868A8] flex items-center justify-center text-white">
                  <Sun className="w-5 h-5 text-[#F58220]" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight leading-tight text-[#0868A8]">
                  Tivera Technologies
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-300 tracking-wide leading-none">
                  Solar &amp; General Power Solutions
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Delivering dependable, practical, and affordable solar and general power solutions designed around your actual energy needs and budget.
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Industry:</span> Solar energy, renewable power, and general power solutions.
            </div>

            {/* Social Links (Configurable in company.ts) */}
            <div className="pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Connect With Us</p>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <a
                  href={COMPANY_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="Facebook (editable in config)"
                >
                  Facebook
                </a>
                <span>·</span>
                <a
                  href={COMPANY_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="LinkedIn (editable in config)"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href={COMPANY_CONFIG.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="X / Twitter (editable in config)"
                >
                  X (Twitter)
                </a>
                <span>·</span>
                <a
                  href={COMPANY_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title="Instagram (editable in config)"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Form</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Services Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Engineering Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('solar-consultation')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Solar Energy Consultation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('energy-audit')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Energy Audits & Diagnostics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('residential-solar')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Residential Solar Systems
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('commercial-solar')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Commercial & Office Solar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('solar-mini-grid')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Solar Mini-Grids
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('security-lighting')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Solar Security Lighting
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('electrical-services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Electrical Engineering Services
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Head Office & Support
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.office.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0868A8] shrink-0" />
                <a href={COMPANY_CONFIG.phones[0].telLink} className="hover:text-white">
                  {COMPANY_CONFIG.phones[0].number}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0868A8] shrink-0" />
                <a href={COMPANY_CONFIG.mailtoLink} className="hover:text-white">
                  {COMPANY_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY_CONFIG.office.googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#F58220] hover:underline font-semibold"
              >
                <span>Find Us on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} <span className="text-[#0868A8] font-semibold">Tivera Technologies</span>. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <span>·</span>
            <button
              onClick={onOpenOwnerPortal}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Shield className="w-3 h-3 text-[#F58220]" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
