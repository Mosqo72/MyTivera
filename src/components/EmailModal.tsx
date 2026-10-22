import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
  defaultMessage?: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  defaultSubject,
  defaultMessage,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: defaultSubject || 'General Enquiry',
    message: defaultMessage || '',
    consent: true,
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        subject: defaultSubject || prev.subject || 'General Enquiry',
        message: defaultMessage || prev.message || '',
      }));
    }
  }, [isOpen, defaultSubject, defaultMessage]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{ referenceId: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 8) {
      setErrorMessage('Please enter your message (at least 8 characters).');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please confirm agreement to be contacted regarding this message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || 'Not provided',
          preferredContact: 'email',
          service: 'solar-consultation',
          location: 'Abuja / Direct Email',
          projectType: 'other',
          message: `[Subject: ${formData.subject}]\n\n${formData.message.trim()}`,
          consent: formData.consent,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || 'Failed to send email message.');
      }

      setSuccessResult({
        referenceId: data.referenceId,
        message: data.message,
      });
    } catch (err: any) {
      console.error('Email send error:', err);
      setErrorMessage(err.message || 'Unable to deliver message. Please check your connection or contact our support desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'General Enquiry',
      message: '',
      consent: true,
    });
    setSuccessResult(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4.5 bg-[#0868A8] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-900/60 flex items-center justify-center text-[#F58220]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">Send an Enquiry</h3>
              <p className="text-xs text-blue-100">Direct consultation with Tivera Energies Limited</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-blue-100 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {successResult ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Enquiry Submitted Successfully!</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your enquiry has been received under reference{' '}
                <strong className="text-[#0868A8] font-mono">{successResult.referenceId}</strong> and routed to the Tivera Energies Limited engineering team.
              </p>
              <p className="text-[11px] text-slate-500">
                An engineer will follow up directly at <strong>{formData.email}</strong> {formData.phone ? `or by phone at ${formData.phone}` : ''}.
              </p>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#0868A8] hover:bg-[#07588f] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 text-red-800 text-xs border border-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chinedu Okafor"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0868A8] text-slate-900"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0868A8] text-slate-900"
                />
              </div>

              {/* Two-Column: Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0803 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0868A8] text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0868A8] bg-white text-slate-900"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Solar Consultation Question">Solar Consultation Question</option>
                    <option value="Energy Audit Request">Energy Audit Request</option>
                    <option value="Residential Solar Question">Residential Solar Question</option>
                    <option value="Commercial Power Question">Commercial Power Question</option>
                    <option value="Mini-Grids & Security">Mini-Grids & Security Lighting</option>
                    <option value="Other Question">Other Question</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message or Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message or question for our engineering desk..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0868A8] text-slate-900 leading-relaxed"
                />
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    disabled={isSubmitting}
                    className="mt-0.5 rounded border-slate-300 text-[#0868A8] focus:ring-[#0868A8]"
                  />
                  <span className="text-xs text-slate-600">
                    I agree to allow Tivera Energies Limited to contact me regarding this message.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0868A8] hover:bg-[#07588f] active:bg-[#05436e] disabled:opacity-60 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <Send className="w-3.5 h-3.5 text-[#F58220]" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
