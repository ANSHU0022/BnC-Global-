export const services = [
  {
    id: 'financial-advisory',
    title: 'Financial Advisory',
    summary: 'Strategic finance guidance to drive profitability and compliance.',
    bullets: [
      'Virtual CFO Services',
      'Cost & Management Accounting',
      'Profit Optimization & Cost Efficiency',
      'Financial Planning, Reporting & MIS',
      'IFRS, GAAP & GAAS Compliance',
      'Due Diligence & Valuation'
    ],
    tags: ['high-selling', 'high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.youtube.com/embed/KjZd_UqgvJo'
  },
  {
    id: 'cybersecurity-data-privacy',
    title: 'Cybersecurity & Data Privacy',
    summary: 'Security, privacy, and compliance programs for modern businesses.',
    bullets: [
      'ISO/IEC 27001 Certification',
      'SOC Certification (Type 1 & Type 2)',
      'GDPR Compliance',
      'HIPAA Compliance',
      'Global Data Privacy Compliance',
      'Cybersecurity Implementation',
      'AI Audit'
    ],
    tags: ['high-selling', 'high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.youtube.com/embed/MKH0rvpBHis'
  },
  {
    id: 'risk-advisory',
    title: 'Risk Advisory',
    summary: 'Governance, controls, and risk assessment for resilient operations.',
    bullets: [
      'Corporate Governance & Compliance',
      'Internal Audit & Controls',
      'Policies, SOPs & Process Reengineering',
      'Business Intelligence & Continuous Improvement',
      'IT, Systems & Fraud Risk Audits',
      'Stock & Fixed Asset Verification',
      'SAR Reconciliation & Process Review',
      'Third-Party Risk Management'
    ],
    tags: ['high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.youtube.com/embed/T5CsH7RxaPQ'
  },
  {
    id: 'esg-advisory',
    title: 'ESG Advisory',
    summary: 'Sustainability strategy, reporting, and climate readiness.',
    bullets: [
      'ESG & Sustainability Reporting',
      'Supply Chain Audit & Data Gathering',
      'Carbon Emissions Estimation',
      'Climate Risk Assessment',
      'Compliance Trainings'
    ],
    tags: ['high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.youtube.com/embed/CmvW1HWofM4'
  },
  {
    id: 'erp-implementation-digital-transformation',
    title: 'ERP Implementation & Digital Transformation',
    summary: 'Modernize systems and processes for smarter operations.',
    bullets: [
      'ERP Module Review & Report Optimization',
      'Master Data Management',
      'Department-Wise Digital Transformation',
      'AI Integration for Process Efficiency & Insights'
    ],
    tags: ['high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'gcc-operation-hub',
    title: 'GCC & Operation Hub',
    summary: 'Build, operate, and transform shared services at scale.',
    bullets: [
      'Support Services',
      'Captive Shared Services Center Setup & Stabilization',
      'Build, Operate & Transform (BOT) Model Implementation'
    ],
    tags: ['high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7408019530272337920'
  },
  {
    id: 'training-workshop',
    title: 'Training & Workshop',
    summary: 'Practical training programs for teams and leaders.',
    bullets: [
      'Internal Audit',
      'ESG & Sustainability',
      'Cybersecurity & Data Privacy Awareness',
      'AI Implementation',
      'Leadership & Soft Skills Development'
    ],
    tags: ['high-selling'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.youtube.com/embed/CmvW1HWofM4'
  },
  {
    id: 'recruitment-manpower-services',
    title: 'Recruitment & Manpower Services',
    summary: 'End-to-end staffing for temporary and permanent needs.',
    bullets: [
      'Temporary Staffing',
      'Permanent Recruitment'
    ],
    tags: ['high-demand'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: 'https://www.instagram.com/reel/DNNUxq6K8Ei/embed'
  },
  {
    id: 'ksa-specific-services',
    title: 'KSA Specific Services',
    summary: 'Saudi-specific compliance and advisory solutions.',
    bullets: [
      'Statutory Audit Support',
      'VAT & WHT Compliance',
      'Zakat & Corporate Tax',
      'Bookkeeping & Accounting',
      'Local Content Advisory'
    ],
    tags: ['specialized'],
    country: ['saudi-arabia'],
    videoUrl: ''
  },
  {
    id: 'ifrs',
    title: 'IFRS',
    summary: 'IFRS guidance and implementation support.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'transfer-pricing',
    title: 'Transfer Pricing',
    summary: 'Transfer pricing documentation and compliance advisory.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'esop-advisory',
    title: 'ESOP Advisory',
    summary: 'ESOP structure, valuation, and governance guidance.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'transformation-through-ai',
    title: 'Transformation Through AI',
    summary: 'AI-enabled process redesign and decision support.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'valuation',
    title: 'Valuation',
    summary: 'Independent valuation support for business needs.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence',
    summary: 'Commercial and financial due diligence support.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  },
  {
    id: 'physical-verification-stock-fixed-asset',
    title: 'Physical Verification - Stock & Fixed Asset',
    summary: 'On-ground verification for inventory and fixed assets.',
    bullets: [],
    tags: ['specialized'],
    country: ['india', 'saudi-arabia', 'other'],
    videoUrl: ''
  }
];

export const getServicesByCountry = (country) =>
  services.filter((service) => service.country.includes(country));

export const getServiceById = (id) =>
  services.find((service) => service.id === id);
