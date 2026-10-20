import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Data storage for enquiries
const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data folder and files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(ENQUIRIES_FILE)) {
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// In-memory rate limiting map: IP -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return validTimestamps.length > MAX_REQUESTS_PER_WINDOW;
}

export interface EnquiryRecord {
  id: string;
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  service: string;
  serviceLabel: string;
  location: string;
  projectType: string;
  budget?: string;
  message: string;
  calculatedLoad?: string;
  submittedAt: string;
  ip: string;
  deliveryStatus: 'delivered' | 'ready_pending_key' | 'failed';
  deliveryNote: string;
}

function loadEnquiries(): EnquiryRecord[] {
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    return JSON.parse(raw) as EnquiryRecord[];
  } catch (err) {
    console.error('Error reading enquiries:', err);
    return [];
  }
}

function saveEnquiries(data: EnquiryRecord[]): void {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing enquiries:', err);
  }
}

// Service mapping helper
const SERVICE_LABELS: Record<string, string> = {
  'solar-consultation': 'Solar Energy Consultation',
  'energy-audit': 'Energy Audit',
  'solar-system-design': 'Solar System Design',
  'residential-solar': 'Residential Solar System',
  'commercial-solar': 'Commercial or Office Solar System',
  'solar-mini-grid': 'Solar Mini-Grid',
  'security-lighting': 'Solar Security Lighting',
  'electrical-services': 'Electrical Services',
  'maintenance-troubleshooting': 'Maintenance & Troubleshooting',
  'other': 'Other Power / Renewable Enquiry',
};

// Dispatch email via Resend or SendGrid if credentials available
async function dispatchEmailNotification(enquiry: EnquiryRecord): Promise<{ delivered: boolean; note: string }> {
  const recipient = 'tiveratechnologies@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;
  const sendgridApiKey = process.env.SENDGRID_API_KEY;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0868A8; color: #ffffff; padding: 24px 28px;">
        <h1 style="margin: 0 0 6px 0; font-size: 22px; letter-spacing: -0.5px;">Tivera Technologies</h1>
        <p style="margin: 0; font-size: 14px; opacity: 0.9;">New Customer Enquiry Received · Ref: <strong>${enquiry.referenceId}</strong></p>
      </div>
      <div style="padding: 28px; background-color: #ffffff; color: #202833;">
        <h2 style="font-size: 18px; margin-top: 0; margin-bottom: 20px; color: #0868A8; border-bottom: 2px solid #F58220; padding-bottom: 8px; display: inline-block;">
          Customer & Project Details
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; width: 170px; color: #64748b;">Full Name:</td>
              <td style="padding: 10px 0; color: #0f172a;">${enquiry.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Phone Number:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${enquiry.phone}" style="color: #0868A8; text-decoration: none; font-weight: 600;">${enquiry.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${enquiry.email}" style="color: #0868A8; text-decoration: none;">${enquiry.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Preferred Contact:</td>
              <td style="padding: 10px 0; text-transform: capitalize; color: #0f172a;"><strong>${enquiry.preferredContact}</strong></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Requested Service:</td>
              <td style="padding: 10px 0; color: #0868A8; font-weight: bold;">${enquiry.serviceLabel}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Project Location:</td>
              <td style="padding: 10px 0; color: #0f172a;">${enquiry.location}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Project Type:</td>
              <td style="padding: 10px 0; text-transform: capitalize; color: #0f172a;">${enquiry.projectType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Estimated Budget:</td>
              <td style="padding: 10px 0; color: #0f172a;">${enquiry.budget || 'Not specified'}</td>
            </tr>
            ${enquiry.calculatedLoad ? `
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Solar Estimator Load:</td>
              <td style="padding: 10px 0; color: #0f172a;">${enquiry.calculatedLoad}</td>
            </tr>` : ''}
          </tbody>
        </table>

        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 15px; margin-bottom: 8px; color: #0868A8;">Customer Message / Scope:</h3>
          <div style="background-color: #f8fafc; border-left: 4px solid #0868A8; padding: 14px 18px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
${enquiry.message}
          </div>
        </div>

        <div style="font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          <p style="margin: 0;">Submitted on: ${new Date(enquiry.submittedAt).toUTCString()}</p>
          <p style="margin: 4px 0 0 0;">Tivera Technologies · Suite 31C, Anon Plaza, Gudu, FCT Abuja · 07033064125</p>
        </div>
      </div>
    </div>
  `;

  // Try Resend API if configured
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_SENDER || 'Tivera Enquiries <enquiries@tiveratechnologies.com>',
          to: [recipient],
          reply_to: enquiry.email,
          subject: `[Tivera Lead] ${enquiry.serviceLabel} - ${enquiry.fullName} (${enquiry.location})`,
          html: emailHtml,
        }),
      });

      if (response.ok) {
        return { delivered: true, note: 'Delivered via Resend to tiveratechnologies@gmail.com' };
      } else {
        const errorText = await response.text();
        console.error('Resend API error:', errorText);
        return { delivered: false, note: `Resend error: ${errorText}` };
      }
    } catch (err: any) {
      console.error('Failed to send via Resend:', err);
      return { delivered: false, note: `Resend exception: ${err?.message || err}` };
    }
  }

  // Try SendGrid API if configured
  if (sendgridApiKey) {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: recipient }],
              subject: `[Tivera Lead] ${enquiry.serviceLabel} - ${enquiry.fullName}`,
            },
          ],
          from: { email: process.env.EMAIL_SENDER || 'info@tiveratechnologies.com', name: 'Tivera Portal' },
          reply_to: { email: enquiry.email, name: enquiry.fullName },
          content: [{ type: 'text/html', value: emailHtml }],
        }),
      });

      if (response.ok || response.status === 202) {
        return { delivered: true, note: 'Delivered via SendGrid to tiveratechnologies@gmail.com' };
      } else {
        const errorText = await response.text();
        console.error('SendGrid API error:', errorText);
        return { delivered: false, note: `SendGrid error: ${errorText}` };
      }
    } catch (err: any) {
      console.error('Failed to send via SendGrid:', err);
      return { delivered: false, note: `SendGrid exception: ${err?.message || err}` };
    }
  }

  // When no 3P email API key is configured in env, record and log clearly for dev/preview
  console.log('---------------------------------------------------------');
  console.log(`[TIVERA TECHNOLOGIES ENQUIRY RECORDED]`);
  console.log(`Reference ID: ${enquiry.referenceId}`);
  console.log(`Recipient: ${recipient}`);
  console.log(`Customer: ${enquiry.fullName} (${enquiry.phone}, ${enquiry.email})`);
  console.log(`Service: ${enquiry.serviceLabel}`);
  console.log(`Location: ${enquiry.location}`);
  console.log(`Contact via: ${enquiry.preferredContact}`);
  console.log(`Note: Submissions are securely stored in data/enquiries.json.`);
  console.log(`To enable direct email dispatch to ${recipient}, add RESEND_API_KEY in .env.`);
  console.log('---------------------------------------------------------');

  return {
    delivered: false,
    note: 'Stored securely in database. To route live email to tiveratechnologies@gmail.com, configure RESEND_API_KEY or SENDGRID_API_KEY in environment variables.',
  };
}

// ==========================================
// API ROUTES
// ==========================================

// Public status endpoint
app.get('/api/config', (_req: Request, res: Response) => {
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSendGrid = Boolean(process.env.SENDGRID_API_KEY);

  res.json({
    status: 'online',
    company: 'Tivera Technologies',
    recipientEmail: 'tiveratechnologies@gmail.com',
    headOffice: 'Suite 31C, Anon Plaza, Gudu, FCT Abuja, Nigeria',
    phones: ['07033064125'],
    emailServiceConfigured: hasResend || hasSendGrid,
    provider: hasResend ? 'Resend' : hasSendGrid ? 'SendGrid' : 'Stored in database (configured pending API key)',
  });
});

// Enquiry submission endpoint
app.post('/api/enquiry', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp)) {
    res.status(429).json({
      success: false,
      error: 'Too many submissions from this connection. Please wait a few minutes before submitting another enquiry or call us directly at 07033064125.',
    });
    return;
  }

  const {
    fullName,
    phone,
    email,
    preferredContact,
    service,
    location,
    projectType,
    budget,
    message,
    consent,
    calculatedLoad,
    hp_field, // honeypot anti-spam
  } = req.body;

  // Bot detection via honeypot
  if (hp_field) {
    console.warn(`Spam bot caught via honeypot field from IP ${clientIp}`);
    res.status(200).json({ success: true, referenceId: 'TIV-SPAM-FILTERED', message: 'Enquiry received.' });
    return;
  }

  // Validation
  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  // Nigerian & international phone validation
  const cleanPhone = (phone || '').replace(/[\s\-\(\)]/g, '');
  if (!cleanPhone || cleanPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanPhone)) {
    errors.phone = 'Please provide a valid phone number (e.g., 07033064125 or +2347033064125).';
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!service || typeof service !== 'string') {
    errors.service = 'Please select the required service.';
  }

  if (!location || typeof location !== 'string' || location.trim().length < 2) {
    errors.location = 'Please specify the project location (e.g. Gudu, Abuja).';
  }

  if (!projectType) {
    errors.projectType = 'Please select your project type.';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 8) {
    errors.message = 'Please provide a brief description of your power requirements (at least 8 characters).';
  }

  if (!consent) {
    errors.consent = 'You must confirm consent for Tivera Technologies to contact you regarding this enquiry.';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      message: 'Please resolve the highlighted validation errors.',
      errors,
    });
    return;
  }

  // Generate unique Reference Code
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceId = `TIV-2026-${randomSuffix}`;

  const serviceLabel = SERVICE_LABELS[service] || service;

  const newRecord: EnquiryRecord = {
    id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    referenceId,
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim().toLowerCase(),
    preferredContact: ['phone', 'email', 'whatsapp'].includes(preferredContact) ? preferredContact : 'phone',
    service,
    serviceLabel,
    location: location.trim(),
    projectType,
    budget: budget ? String(budget).trim() : undefined,
    message: message.trim(),
    calculatedLoad: calculatedLoad ? String(calculatedLoad).trim() : undefined,
    submittedAt: new Date().toISOString(),
    ip: clientIp,
    deliveryStatus: 'ready_pending_key',
    deliveryNote: '',
  };

  // Attempt transactional email dispatch
  const deliveryResult = await dispatchEmailNotification(newRecord);
  newRecord.deliveryStatus = deliveryResult.delivered ? 'delivered' : 'ready_pending_key';
  newRecord.deliveryNote = deliveryResult.note;

  // Persist record to storage
  const existingRecords = loadEnquiries();
  existingRecords.unshift(newRecord);
  saveEnquiries(existingRecords);

  res.status(201).json({
    success: true,
    referenceId,
    timestamp: newRecord.submittedAt,
    deliveryStatus: newRecord.deliveryStatus,
    deliveryNote: newRecord.deliveryNote,
    message: `Thank you! Your enquiry has been received and logged under reference ${referenceId}. Our team at Tivera Technologies will contact you promptly.`,
  });
});

// Admin / Owner enquiry inspection endpoint (for management preview)
app.get('/api/enquiries', (req: Request, res: Response) => {
  const pin = req.query.pin || req.headers['x-admin-pin'];
  // Quick safeguard: allow access if PIN matches or in local development
  if (pin !== 'tivera2026' && !process.env.ALLOW_ANON_ADMIN) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized. Use owner PIN "tivera2026" or pass header x-admin-pin.',
    });
    return;
  }

  const records = loadEnquiries();
  res.json({
    success: true,
    count: records.length,
    enquiries: records,
  });
});

// CSV Export for owner
app.get('/api/enquiries/export.csv', (req: Request, res: Response) => {
  const pin = req.query.pin || req.headers['x-admin-pin'];
  if (pin !== 'tivera2026') {
    res.status(401).send('Unauthorized');
    return;
  }

  const records = loadEnquiries();
  const headers = ['Reference ID', 'Date', 'Full Name', 'Phone', 'Email', 'Preferred Contact', 'Service', 'Location', 'Project Type', 'Budget', 'Status', 'Message'];
  
  const rows = records.map(r => [
    r.referenceId,
    `"${r.submittedAt}"`,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.phone}"`,
    `"${r.email}"`,
    r.preferredContact,
    `"${r.serviceLabel}"`,
    `"${r.location.replace(/"/g, '""')}"`,
    r.projectType,
    `"${r.budget || ''}"`,
    r.deliveryStatus,
    `"${r.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="tivera_enquiries.csv"');
  res.send(csvContent);
});

// Vite middleware / static serving
async function setupVite() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tivera Technologies server running on http://0.0.0.0:${PORT}`);
  });
});
