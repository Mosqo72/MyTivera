import React, { useState, useEffect } from 'react';
import { X, Shield, Download, RefreshCw, Key, CheckCircle2, AlertTriangle, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface OwnerEnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EnquiryItem {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  preferredContact: string;
  serviceLabel: string;
  location: string;
  projectType: string;
  budget?: string;
  message: string;
  calculatedLoad?: string;
  submittedAt: string;
  deliveryStatus: string;
  deliveryNote: string;
}

export const OwnerEnquiryDrawer: React.FC<OwnerEnquiryDrawerProps> = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState('tivera2026');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverConfig, setServerConfig] = useState<{
    emailServiceConfigured: boolean;
    provider: string;
    recipientEmail: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkServerConfig();
      if (isAuthenticated) {
        fetchEnquiries();
      }
    }
  }, [isOpen, isAuthenticated]);

  const checkServerConfig = async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        setServerConfig(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === 'tivera2026') {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid PIN code. Use default: tivera2026');
    }
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/enquiries?pin=${encodeURIComponent(pin)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setEnquiries(data.enquiries || []);
      } else {
        setError(data.message || 'Failed to fetch enquiries.');
      }
    } catch (err: any) {
      setError('Unable to connect to server endpoint.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0868A8] text-white flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#F58220]" />
            <div>
              <h3 className="font-bold text-base leading-tight">Tivera Energies Limited Owner Portal</h3>
              <p className="text-xs text-blue-200">Enquiry Management & Notification Setup</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-blue-800 text-blue-100 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0868A8] flex items-center justify-center mx-auto">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Owner Access Required</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the management PIN to view customer submissions and email configuration status.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 pt-2">
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN (default: tivera2026)"
                  className="w-full px-4 py-2.5 text-center text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0868A8]"
                />
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#0868A8] hover:bg-[#07588f] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Unlock Owner Registry
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Configuration Status Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Notification Gateway
                  </span>
                  {serverConfig?.emailServiceConfigured ? (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{serverConfig.provider} Connected</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Database Logging Active</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  All customer submissions are persistently written to <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">data/enquiries.json</code> on the server. To route real-time notifications directly to <strong className="text-slate-900">tiveratechnologies@gmail.com</strong>, provide a <code className="text-[#0868A8] font-mono">RESEND_API_KEY</code> or <code className="text-[#0868A8] font-mono">SENDGRID_API_KEY</code> in <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">.env</code>.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <a
                    href="/api/enquiries/export.csv?pin=tivera2026"
                    download="tivera_enquiries.csv"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0868A8]" />
                    <span>Download Leads (.CSV)</span>
                  </a>
                  <button
                    onClick={fetchEnquiries}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Submissions List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">
                    Received Inquiries ({enquiries.length})
                  </h4>
                  <span className="text-xs text-slate-500 font-mono">Registry: Live</span>
                </div>

                {loading ? (
                  <div className="py-12 text-center text-xs text-slate-500">
                    <div className="w-5 h-5 border-2 border-[#0868A8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span>Loading enquiries...</span>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6">
                    No customer enquiries recorded yet. Use the contact form on the website to submit a test inquiry!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#0868A8] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {enq.referenceId}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(enq.submittedAt).toLocaleDateString()} {new Date(enq.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-slate-900">{enq.fullName}</p>
                          <p className="text-[#0868A8] font-semibold">{enq.serviceLabel}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                          <div className="flex items-center gap-1.5 truncate">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <a href={`tel:${enq.phone}`} className="hover:underline font-medium">{enq.phone}</a>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <a href={`mailto:${enq.email}`} className="hover:underline">{enq.email}</a>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{enq.location}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Prefers:</span> <strong className="capitalize">{enq.preferredContact}</strong>
                          </div>
                        </div>

                        {enq.budget && (
                          <div className="text-slate-600">
                            <span className="text-slate-400">Budget:</span> <span className="font-medium">{enq.budget}</span>
                          </div>
                        )}

                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-wrap font-sans">
                          {enq.message}
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Status: {enq.deliveryStatus === 'delivered' ? '✓ Email Sent' : '✓ Logged to DB'}</span>
                          <span>Type: {enq.projectType}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Tivera Energies Limited · Anon Plaza, Gudu, Abuja</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 rounded text-slate-800 font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
