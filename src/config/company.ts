export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Mini-Grid' | 'Security Lighting' | 'Electrical Services';
  location: string;
  capacity: string;
  description: string;
  image: string;
  statusTag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'sizing' | 'services' | 'commercial' | 'general';
}

export const COMPANY_CONFIG = {
  name: 'Tivera Energies Limited',
  logoUrl: 'https://imgur.com/xPCRLrN.png',
  logoDirectUrl: 'https://i.imgur.com/xPCRLrN.png',
  logoLocalFallback: '/images/tivera-logo.png',
  heroImageUrl: 'https://imgur.com/gSUDqzr.png',
  heroImageDirectUrl: 'https://i.imgur.com/gSUDqzr.png',
  heroImageLocalFallback: '/images/hero-power.png',
  tagline: 'Reliable Solar and General Power Solutions for Your Home and Business',
  subheadline:
    'At Tivera Energies Limited, we help homes, businesses, and communities access dependable power through professional solar consultation, energy audits, system design, and renewable energy solutions tailored to their needs and budgets.',
  industry: 'Solar energy, renewable energy, electrical engineering, and power solutions',
  office: {
    address: 'Suite 31C, Anon Plaza, Gudu, FCT Abuja, Nigeria',
    suite: 'Suite 31C',
    plaza: 'Anon Plaza',
    district: 'Gudu',
    city: 'FCT Abuja',
    country: 'Nigeria',
    googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Anon+Plaza+Gudu+Abuja+Nigeria',
    embedMapQuery: 'Anon+Plaza+Gudu+Abuja',
    workingHours: 'Mon – Sat: 8:00 AM – 6:00 PM (Emergency consultations by appointment)',
  },
  phones: [
    {
      label: 'Support & Engineering Desk',
      number: '07033064125',
      telLink: 'tel:07033064125',
      international: '+2347033064125',
    },
  ],
  email: 'tiveratechnologies@gmail.com',
  mailtoLink: 'mailto:tiveratechnologies@gmail.com',
  
  whatsapp: {
    enabled: true,
    displayNumber: '07033064125',
    cleanNumber: '2347033064125',
    defaultMessage: 'Hello Tivera Energies Limited, I would like to make an enquiry regarding your solar and electrical services.',
  },

  socials: {
    facebook: '#',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    note: 'Social media profile links can be customized by the owner in company.ts.',
  },

  mission:
    'To become a trusted African energy and infrastructure development company, delivering innovative projects that power economic growth and create enduring value for investors and communities.',
  vision:
    'To contribute to a more energy-secure future through the responsible application of renewable energy and electrical engineering.',

  brandColors: {
    primaryBlue: '#0868A8',
    secondaryOrange: '#F58220',
    charcoal: '#202833',
    lightGrey: '#F4F7FA',
  },

  corePillars: [
    {
      title: 'Tailored to Actual Energy Requirements',
      description: 'We do not sell one-size-fits-all packages. Every system recommendation starts with your real appliances and daily consumption.',
      icon: 'Sliders',
    },
    {
      title: 'Professional Energy Assessment & Design',
      description: 'Systematic load calculation, peak demand profiling, battery autonomy sizing, and inverter capacity matching to prevent premature degradation.',
      icon: 'Ruler',
    },
    {
      title: 'Cost-Conscious Engineering',
      description: 'Pragmatic recommendations that balance upfront capital outlay against long-term reliability and fuel-saving returns.',
      icon: 'TrendingDown',
    },
    {
      title: 'Residential & Commercial Capabilities',
      description: 'From modest residential inverter backups and rooftop arrays to high-demand commercial facility solutions.',
      icon: 'Building2',
    },
    {
      title: 'Renewable & Electrical Rigor',
      description: 'Safe wiring standards, surge protection, DC/AC circuit isolation, and adherence to safe electrical installation best practices.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Clear Communication & Dedicated Service',
      description: 'Transparent proposals, realistic runtime estimates, responsive support, and clear operational guidance for end users.',
      icon: 'Headphones',
    },
  ],

  services: [
    {
      id: 'solar-consultation',
      title: 'Solar Energy Consultation',
      category: 'Consulting & Advisory',
      shortDescription:
        'Help customers understand their energy requirements, available solar options, system limitations, and suitable investment choices.',
      fullDescription:
        'Navigate the complexities of solar adoption with expert, unbiased guidance. We evaluate your current power costs, grid availability patterns, roof viability, and budget constraints to advise on whether off-grid, hybrid, or grid-tie configurations make financial and practical sense.',
      deliverables: [
        'Objective technology comparison (Monocrystalline vs Polycrystalline, Lithium vs Gel)',
        'Payback & generator fuel displacement analysis',
        'System scope definition and phased deployment planning',
        'Independent review of third-party proposals',
      ],
      icon: 'Compass',
    },
    {
      id: 'energy-audit',
      title: 'Energy Audit',
      category: 'Diagnostic & Analysis',
      shortDescription:
        'Assess electricity consumption, identify major loads, examine energy usage patterns, and recommend appropriate energy-saving measures.',
      fullDescription:
        'A comprehensive diagnostic evaluation of your electrical architecture. We identify energy vampires, unbalance phase loads, inefficient appliances, and phantom power drains before sizing any solar generation capacity.',
      deliverables: [
        'Detailed electrical load schedule (watts, run-hours, surge peaks)',
        'Identification of high-draw non-essential loads',
        'Energy efficiency optimization recommendations',
        'Actionable audit report with baseline consumption figures',
      ],
      icon: 'Activity',
    },
    {
      id: 'solar-system-design',
      title: 'Solar System Design',
      category: 'Engineering & CAD',
      shortDescription:
        'Develop solar system designs based on load assessments, daily consumption, peak demand, battery autonomy, and project budget.',
      fullDescription:
        'Rigorous technical engineering that guarantees reliability. We calculate string voltage ranges, MPPT solar charge controller matching, battery bank depth-of-discharge autonomy, and cable conductor cross-sections to eliminate voltage drop.',
      deliverables: [
        'Complete Single Line Diagram (SLD) and electrical layout',
        'Battery bank autonomy calculations (hours/days reserve)',
        'PV array sizing & roof layout orientation',
        'Protective breaker, disconnect, and surge arrestor specifications',
      ],
      icon: 'Cpu',
    },
    {
      id: 'residential-solar',
      title: 'Residential Solar Systems',
      category: 'Installation & Deployment',
      shortDescription:
        'Design solar solutions for homes, duplexes, and apartments with options for lighting, refrigeration, cooling, and water pumping.',
      fullDescription:
        'Reliable 24/7 power independence for households. Protect your family from blackouts and skyrocketing fuel pump prices with seamless, silent power for lights, smart TVs, refrigerators, freezers, and air conditioners.',
      deliverables: [
        'Custom residential inverter & battery rack integrations',
        'Automatic transfer switching (ATS) with zero-flicker continuity',
        'Rooftop mounting with weather-sealed leak-proof penetrations',
        'User training on load management during low-insolation days',
      ],
      icon: 'Home',
    },
    {
      id: 'commercial-solar',
      title: 'Commercial & Office Solar Systems',
      category: 'Commercial Power',
      shortDescription:
        'Develop robust power solutions for offices, clinics, retail premises, and commercial facilities based on daytime operational demands.',
      fullDescription:
        'Safeguard business productivity and eliminate noisy diesel generators during business hours. Commercial daytime loads align naturally with peak solar radiance hours, providing substantial operational expenditure reductions.',
      deliverables: [
        'Three-phase commercial inverter configurations',
        'Critical load segmentation (servers, POS, workstations, ventilation)',
        'Hybrid generator-solar synchronization support',
        'Minimal interruption during workplace installations',
      ],
      icon: 'Building',
    },
    {
      id: 'solar-mini-grids',
      title: 'Solar Mini-Grids',
      category: 'Distributed Power',
      shortDescription:
        'Provide engineering consultation and system design for community-scale, agricultural, and distributed solar power applications.',
      fullDescription:
        'Decentralized renewable microgrid engineering for off-grid estates, rural settlements, farm clusters, and remote institutional complexes requiring centralized power generation and metered distribution.',
      deliverables: [
        'Community load profiling and diversity factor modeling',
        'Centralized PV generation field and battery storage architecture',
        'Low-voltage reticulation and distribution pole layout planning',
        'Operations and safety protocol handbooks',
      ],
      icon: 'Grid',
    },
    {
      id: 'security-lighting',
      title: 'Solar Security Lighting',
      category: 'Perimeter & Municipal',
      shortDescription:
        'Provide solar-powered security lighting solutions for compounds, perimeters, access gates, parking lots, and streets.',
      fullDescription:
        'Stand-alone dusk-to-dawn illumination that stays active regardless of national grid failures or neighborhood blackouts. Integrated solar LED fixtures eliminate trenching and expensive underground wiring.',
      deliverables: [
        'High-lumen all-in-one & split solar street lighting fixtures',
        'Radar motion sensors and intelligent dimming schedules',
        'Corrosion-resistant pole mounting and battery enclosures',
        'Perimeter coverage lux mapping for optimal camera visibility',
      ],
      icon: 'Sun',
    },
    {
      id: 'electrical-services',
      title: 'Electrical Engineering Services',
      category: 'Electrical & Maintenance',
      shortDescription:
        'Provide electrical assessment, distribution board upgrades, surge protection, grounding, and troubleshooting within confirmed technical scope.',
      fullDescription:
        'A dependable solar system requires sound electrical foundation. We carry out distribution board refitting, earthing / grounding resistance testing, phase balancing, and remedial wiring to ensure code compliance and fire safety.',
      deliverables: [
        'Electrical distribution board (DB) organization and breaker labeling',
        'Earth pit installation and earth leakage circuit breaker (ELCB) testing',
        'Voltage stabilizer integration for sensitive electronics',
        'Preventive maintenance and inverter diagnostic testing',
      ],
      icon: 'Zap',
    },
    {
      id: 'equipment-supply',
      title: 'Supply of Generators, Solar & Storage Systems',
      category: 'Procurement & Supply',
      shortDescription:
        'Supply of generators, solar materials and storage systems and general electrical materials with guaranteed authenticity and performance.',
      fullDescription:
        'Direct procurement and supply of certified power equipment, including industrial and domestic generators, tier-1 solar photovoltaic panels, lithium and gel energy storage systems, hybrid inverters, distribution boards, cables, and general electrical materials.',
      deliverables: [
        'Soundproof diesel and petrol generators (domestic to industrial scale)',
        'Tier-1 Monocrystalline solar panels and MPPT charge controllers',
        'Long-lifespan Lithium-ion (LiFePO4) & deep-cycle battery storage systems',
        'Certified cables, trunking, surge arrestors, and general electrical materials',
      ],
      icon: 'Boxes',
    },
  ] as ServiceItem[],

  projects: [
    {
      id: 'proj-1',
      title: 'Residential Hybrid Solar Power System',
      category: 'Residential',
      location: 'Gudu District, Abuja',
      capacity: '7.5kVA Inverter / 15kWh Lithium Storage',
      description: 'Illustrative residential hybrid solution powering continuous refrigeration, lighting, ceiling fans, home entertainment, and office workstations with automated generator backup cut-off.',
      image: '/src/assets/images/hero_solar_abuja_1792352278476.jpg',
      statusTag: 'System Design Reference',
    },
    {
      id: 'proj-2',
      title: 'Commercial Office Rooftop Array',
      category: 'Commercial',
      location: 'Central Business District, Abuja',
      capacity: '20kW PV Array / 3-Phase Commercial Hybrid',
      description: 'Illustrative commercial facility design targeting daytime workplace loads including 20+ desktop computers, networking gear, printing hub, and daytime air conditioning.',
      image: '/src/assets/images/commercial_solar_system_1792352277884.jpg',
      statusTag: 'Commercial Proposal Reference',
    },
    {
      id: 'proj-3',
      title: 'Distributed Solar Mini-Grid Engineering',
      category: 'Mini-Grid',
      location: 'Federal Capital Territory Suburbs',
      capacity: '50kWp Community Mini-Grid Design',
      description: 'Engineering and system design reference for decentralized distribution, supporting residential lighting, healthcare refrigeration, and water pumping.',
      image: '/src/assets/images/solar_minigrid_community_1792352278669.jpg',
      statusTag: 'Consultation & Design Model',
    },
    {
      id: 'proj-4',
      title: 'Perimeter Solar Security & Compound Lighting',
      category: 'Security Lighting',
      location: 'Anon Plaza Vicinity, Abuja',
      capacity: '12x Standalone Dusk-to-Dawn LED Fixtures',
      description: 'Independent solar street lighting array along commercial perimeter and vehicular access driveways ensuring perimeter safety through blackouts.',
      image: '/src/assets/images/solar_security_lighting_1792352279853.jpg',
      statusTag: 'Perimeter Lighting Model',
    },
    {
      id: 'proj-5',
      title: 'Inverter & Battery Storage Inspection',
      category: 'Electrical Services',
      location: 'FCT Abuja',
      capacity: 'Diagnostic & Electrical Safety Overhaul',
      description: 'Clean electrical cabling reorganization, earth grounding inspection, DC disconnect switch installation, and lithium battery calibration.',
      image: '/src/assets/images/solar_engineer_inspection_1792352278955.jpg',
      statusTag: 'Engineering Service Model',
    },
  ] as ProjectItem[],

  processSteps: [
    {
      step: '01',
      title: 'Initial Enquiry',
      summary: 'You share your energy challenges, location, and the appliances you need powered.',
      details: 'Reach out via our enquiry form, telephone, or office visit. We gather initial details on your property type, current electricity supply, and main pain points.',
    },
    {
      step: '02',
      title: 'Energy Assessment',
      summary: 'We evaluate electrical loads, consumption schedules, and site conditions.',
      details: 'Our team examines your appliance power ratings, peak hours of use, roof orientation, shading conditions, and existing distribution board safety.',
    },
    {
      step: '03',
      title: 'System Design & Proposal',
      summary: 'A transparent engineering plan with component specifications and cost estimates.',
      details: 'We prepare an engineering design matching inverter capacity, solar panel wattage, and battery autonomy to your budget and actual requirements.',
    },
    {
      step: '04',
      title: 'Implementation',
      summary: 'Carry out approved installation or technical engineering work with strict safety protocols.',
      details: 'Quality mounting, proper cable sizing, neat trunking, DC breakers, AC surge arrestors, and clean connections adhering to professional standards.',
    },
    {
      step: '05',
      title: 'Testing & Support',
      summary: 'Commissioning, load testing, customer orientation, and ongoing technical guidance.',
      details: 'We test performance across different operating conditions, walk you through best practices for battery longevity, and provide agreed technical support.',
    },
  ],

  faqs: [
    {
      question: 'How do I know the right solar system size for my home?',
      answer:
        'The correct solar system size is determined by your daily kilowatt-hour (kWh) electricity consumption and your peak concurrent load (the maximum wattage of appliances running simultaneously), rather than simply the number of rooms in your house. For example, refrigerators, pumping machines, and air conditioners require significant surge current and battery capacity, whereas LED lighting, fans, and televisions consume modest power. During our energy assessment, we compile an exact appliance load schedule to calculate the ideal inverter capacity (kVA), battery storage (kWh), and solar panel wattage.',
      category: 'sizing',
    },
    {
      question: 'Can solar power run my office or commercial facility?',
      answer:
        'Yes. In fact, offices and businesses are ideal candidates for solar power because the highest energy consumption typically occurs during daylight hours (8:00 AM to 5:00 PM), when solar panels are generating peak electricity. This allows commercial facilities to offset expensive diesel or petrol generator costs directly from the sun, while utilizing a moderately sized battery bank for transitional stability and critical evening loads.',
      category: 'commercial',
    },
    {
      question: 'What information is needed for a solar energy audit?',
      answer:
        'To conduct an accurate energy audit, we need a list of electrical appliances in use, their power ratings (usually indicated on the appliance label in Watts or Amperes), the average hours each appliance runs daily, your recent electricity bills or prepaid token history, and details about your current generator capacity and weekly fuel spending. For rooftop design, photos or layout of your roof are also valuable.',
      category: 'services',
    },
    {
      question: 'Can I install solar power in a rented apartment or leased office?',
      answer:
        'Yes. In rented apartments or leased commercial spaces, we often recommend modular, non-invasive solar installations. The inverter and battery bank can be connected via a neat bypass switch to your dedicated sub-distribution board without major civil alterations. If roof access for solar panels is constrained by the landlord, an inverter-and-battery backup system can charge from the grid when available, and the equipment can easily be relocated when you move.',
      category: 'sizing',
    },
    {
      question: 'Do you design solar mini-grids for communities or off-grid sites?',
      answer:
        'Yes. Tivera Energies Limited provides engineering consultation and technical system design for solar mini-grids, rural electrification initiatives, agricultural processing clusters, and institutional campuses. Our scope includes load demand profiling, centralized solar photovoltaic array sizing, storage architecture, and low-voltage distribution planning.',
      category: 'services',
    },
    {
      question: 'Can I request a solar system quotation before installation?',
      answer:
        'Yes. We encourage prospective customers to request a detailed technical quotation before any financial commitment. By completing our enquiry form with your appliance details and project location, our engineering team can prepare a preliminary system sizing recommendation and transparent cost proposal.',
      category: 'general',
    },
    {
      question: 'Do you provide services outside Abuja?',
      answer:
        'Our primary head office is located in Gudu, Abuja, where we handle consultations, audits, and engineering services across the Federal Capital Territory. For projects located in other states, we invite clients to contact our team directly to discuss project scale, technical requirements, and mobilization logistics.',
      category: 'general',
    },
    {
      question: 'How can I contact Tivera Energies Limited?',
      answer:
        'You can visit our office at Suite 31C, Anon Plaza, Gudu, FCT Abuja. You can also reach our engineering and support desks directly via telephone, emailing tiveratechnologies@gmail.com, or submitting an online enquiry through this website. Our team responds promptly during regular business hours.',
      category: 'general',
    },
  ] as FaqItem[],

  serviceDropdownOptions: [
    { value: 'solar-consultation', label: 'Solar Energy Consultation' },
    { value: 'energy-audit', label: 'Energy Audit' },
    { value: 'solar-system-design', label: 'Solar System Design' },
    { value: 'residential-solar', label: 'Residential Solar System' },
    { value: 'commercial-solar', label: 'Commercial or Office Solar System' },
    { value: 'solar-mini-grid', label: 'Solar Mini-Grid' },
    { value: 'security-lighting', label: 'Solar Security Lighting' },
    { value: 'electrical-services', label: 'Electrical Services' },
    { value: 'maintenance-troubleshooting', label: 'Maintenance & Troubleshooting' },
    { value: 'other', label: 'Other' },
  ],

  projectTypeOptions: [
    { value: 'residential', label: 'Residential (House / Apartment)' },
    { value: 'commercial', label: 'Commercial / Office Facility' },
    { value: 'industrial', label: 'Industrial / Workshop' },
    { value: 'community', label: 'Community / Mini-Grid Project' },
    { value: 'other', label: 'Other' },
  ],

  budgetOptions: [
    { value: 'under-1m', label: 'Under ₦1,000,000' },
    { value: '1m-3m', label: '₦1,000,000 – ₦3,000,000' },
    { value: '3m-7m', label: '₦3,000,000 – ₦7,000,000' },
    { value: '7m-15m', label: '₦7,000,000 – ₦15,000,000' },
    { value: 'above-15m', label: 'Above ₦15,000,000' },
    { value: 'undecided', label: 'Undecided / Need Assessment' },
  ],
};
