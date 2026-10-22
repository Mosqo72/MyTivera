import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0868A8]">
            {type === 'privacy' ? <Shield className="w-5 h-5 text-[#F58220]" /> : <FileText className="w-5 h-5 text-[#F58220]" />}
            <h3 className="text-base font-bold text-slate-900">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Tivera Energies Limited</strong> ("we," "our," or "the Company"), located at Suite 31C, Anon Plaza, Gudu, FCT Abuja, Nigeria, respects your privacy and is committed to protecting your personal information.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">1. Information We Collect</h4>
              <p>
                When you submit an enquiry through our website, we collect your full name, telephone number, email address, project location, preferred contact channel, requested solar/electrical service, and project descriptions.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">2. Purpose of Collection</h4>
              <p>
                We use the information you submit strictly to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Evaluate your electrical requirements and prepare custom solar proposals.</li>
                <li>Contact you via your chosen communication method (phone, email, or WhatsApp).</li>
                <li>Conduct energy audits and schedule physical site visits across Abuja and nearby regions.</li>
              </ul>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">3. Data Protection & Non-Disclosure</h4>
              <p>
                We do not sell, rent, or trade your personal data to any external marketing agencies. Customer enquiries are stored in protected server databases accessible solely by Tivera Energies Limited engineering and administrative personnel.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">4. Contacting Us About Your Data</h4>
              <p>
                If you have questions regarding your data or wish to have your details updated or removed from our enquiry registry, please email{' '}
                <a href={COMPANY_CONFIG.mailtoLink} className="text-[#0868A8] underline font-medium">
                  {COMPANY_CONFIG.email}
                </a>{' '}
                or visit our office at Anon Plaza, Gudu, Abuja.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to the official website of <strong>Tivera Energies Limited</strong>. By browsing this website or submitting an enquiry, you agree to these Terms of Use.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">1. Scope of Information</h4>
              <p>
                The information provided on this website—including appliance wattage guides, illustrative project capacities, and solar load calculators—is intended for general estimation and technical guidance. Formal commercial quotes and system guarantees are subject to formal on-site audit verification.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">2. Service Availability</h4>
              <p>
                Tivera Energies Limited operates primarily out of Abuja, FCT, Nigeria. Availability of installation services outside Abuja is evaluated on a project-by-project basis depending on project scale and mobilization logistics.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">3. Intellectual Property</h4>
              <p>
                The company name, logos, system configurations, and original content published on this website are the property of Tivera Energies Limited.
              </p>

              <h4 className="font-bold text-slate-900 pt-2 text-sm">4. Governing Law</h4>
              <p>
                These terms are governed by the laws of the Federal Republic of Nigeria. For any legal inquiries, contact our management office at Suite 31C, Anon Plaza, Gudu, FCT Abuja.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0868A8] hover:bg-[#07588f] rounded-lg transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
