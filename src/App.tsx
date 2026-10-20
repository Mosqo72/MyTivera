/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EmailModal } from './components/EmailModal';
import { OwnerEnquiryDrawer } from './components/OwnerEnquiryDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LegalModals } from './components/LegalModals';

export default function App() {
  const [isOwnerDrawerOpen, setIsOwnerDrawerOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const [emailSubject, setEmailSubject] = useState<string>('General Enquiry');
  const [emailMessage, setEmailMessage] = useState<string>('');

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEnquiryForm = (subject = 'General Enquiry', message = '') => {
    setEmailSubject(subject);
    setEmailMessage(message);
    setIsEmailModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    handleOpenEnquiryForm(
      `Enquiry: ${serviceId.replace(/-/g, ' ')}`,
      `Hello Tivera Technologies team, I am interested in your ${serviceId.replace(/-/g, ' ')} service and would like to request consultation.`
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-[#202833] flex flex-col font-sans selection:bg-[#F58220]/20 selection:text-[#0868A8]">
      {/* Navigation Bar */}
      <Navbar
        onContactClick={scrollToContact}
        onOpenOwnerPortal={() => setIsOwnerDrawerOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onContactClick={() => handleOpenEnquiryForm('Solar & General Power Solutions Enquiry')}
          onExploreServices={() => {
            const servElem = document.getElementById('services');
            if (servElem) servElem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* About Section */}
        <AboutSection />

        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Why Choose Tivera Technologies */}
        <WhyChooseUs />

        {/* Dedicated Head Office & Direct Contact Section */}
        <ContactSection
          onOpenEmailModal={() => handleOpenEnquiryForm('General Enquiry')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenOwnerPortal={() => setIsOwnerDrawerOpen(true)}
        onSelectService={handleSelectService}
      />

      {/* Direct Email Modal Form */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        defaultSubject={emailSubject}
        defaultMessage={emailMessage}
      />

      {/* Owner Management Registry Drawer */}
      <OwnerEnquiryDrawer
        isOpen={isOwnerDrawerOpen}
        onClose={() => setIsOwnerDrawerOpen(false)}
      />

      {/* Floating WhatsApp Action */}
      <WhatsAppButton />

      {/* Privacy Policy & Terms Modals */}
      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
