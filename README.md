# Tivera Technologies - Official Website & Solar Solutions Portal

A modern, responsive, and functional solar energy and electrical services website for **Tivera Technologies** based in Abuja, Nigeria.

---

## 1. Company Profile & Brand Identity

- **Company Name:** Tivera Technologies
- **Head Office:** Suite 31C, Anon Plaza, Gudu, FCT Abuja, Nigeria
- **Support Telephones:** `07033064125`
- **Official Email:** `tiveratechnologies@gmail.com`
- **Brand Colors:**
  - **Primary Solar Blue:** `#0868A8`
  - **Solar Accent Orange:** `#F58220`
  - **Dark Charcoal:** `#202833`
  - **Light Background Grey:** `#F4F7FA`

All business details, telephone numbers, addresses, mission/vision statements, social media handles, and service scopes are centralized in:
📁 `src/config/company.ts`

---

## 2. Key Architecture & Features

1. **Sticky Header & Top Bar Contract:**
   - Single clean brand wordmark with solar insignia.
   - Clean navigation links: About, Services, Sizing Tool, Why Tivera, Projects, FAQs, Contact.
   - Prominent **"Contact Us"** primary action button linking directly to the enquiry form.
   - Mobile-responsive drawer navigation with direct call desk links.

2. **Hero Section:**
   - Headline: *"Reliable Solar and Electrical Solutions for Your Home and Business"*.
   - Architectural-grade 16:9 rooftop solar installation visual.
   - Immediate conversion pathways and 4-column capability strip.

3. **Core Engineering Services (8 Specializations):**
   - Solar Energy Consultation
   - Energy Audit & Consumption Diagnostics
   - Solar System Design
   - Residential Solar Systems
   - Commercial & Office Solar Systems
   - Solar Mini-Grids
   - Solar Security Lighting
   - Electrical Engineering Services

4. **Why Choose Tivera Technologies:**
   - 6 core engineering commitments (real appliance sizing, rigorous safety and earthing, transparent cost models, customer focus).

6. **Project Portfolio & Models:**
   - High-fidelity visual cards for Residential, Commercial, Mini-Grid, Perimeter Security Lighting, and Electrical Services.
   - Clearly labeled illustrative engineering models with system capacities and locations, ready for the business owner to update with actual completed site photographs.

6. **Interactive FAQs:**
   - Expandable accordion answering the 8 key questions regarding apartment viability, sizing, commercial daytime loads, audits, and Abuja service coverage.

9. **Functional Customer Enquiry Form ("Let's Discuss Your Power Needs"):**
   - Real backend submission endpoint: `POST /api/enquiry`.
   - Comprehensive validation: Full Name, Phone (Nigerian/international format), Email, Preferred Contact (Phone, Email, WhatsApp), Service Required, Location, Project Type, Optional Budget, Description, and Consent Checkbox.
   - Honeypot anti-spam protection (`hp_field`) and IP rate limiting.
   - Unique reference ID generation (e.g. `TIV-2026-4821`).
   - Persistent storage in `data/enquiries.json`.
   - Distinguishes clearly between local test storage and live SMTP email delivery.

10. **Owner Portal Drawer:**
    - Accessible via "Owner Portal" in the footer or header (PIN: `tivera2026`).
    - View all customer leads in real time.
    - Export leads directly to CSV (`/api/enquiries/export.csv`).
    - Live email service health status.

11. **Configurable Floating WhatsApp Button:**
    - Pre-configured for Nigerian support desk (`2347033064125`) with an introductory message.

12. **Legal & Compliance:**
    - Built-in Privacy Policy and Terms of Use modals adhering to Nigerian consumer privacy best practices.

---

## 3. Email Gateway Setup Instructions

The enquiry form stores all submissions locally in `data/enquiries.json` by default. To route notification emails directly to `tiveratechnologies@gmail.com`:

### Option A: Using Resend (Recommended)
1. Sign up at [resend.com](https://resend.com).
2. Generate an API Key.
3. In your environment variables or `.env` file, add:
   ```env
   RESEND_API_KEY="re_123456789"
   EMAIL_SENDER="Tivera Enquiries <enquiries@yourdomain.com>"
   ```
4. Submissions will immediately be emailed to `tiveratechnologies@gmail.com` with customer reply-to enabled.

### Option B: Using SendGrid
1. Create a SendGrid account and obtain an API key with mail send permissions.
2. In your `.env` file, add:
   ```env
   SENDGRID_API_KEY="SG.your_api_key_here"
   EMAIL_SENDER="info@yourdomain.com"
   ```

---

## 4. Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server (Express + Vite)
npm run dev

# 3. Build for production
npm run build

# 4. Run production server
npm start
```

---

## 5. Deployment Instructions

- **Port:** The server runs on port 3000 by default (or the `PORT` specified by your cloud environment).
- **Environment Variables:**
  - `PORT=3000`
  - `NODE_ENV=production`
  - `RESEND_API_KEY` (optional for live email)
- **Domain Mapping:**
  - You can connect a custom domain like `tiveratechnologies.com` or `tiveratechnologies.ng` by mapping an A record or CNAME to your hosting provider.
