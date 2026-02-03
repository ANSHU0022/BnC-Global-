import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

const serviceGroups = [
  {
    title: 'Financial Advisory',
    items: [
      'Virtual CFO Services',
      'Cost & Management Accounting',
      'Profit Optimization & Cost Efficiency',
      'Financial Planning, Reporting & MIS',
      'IFRS, GAAP & GAAS Compliance',
      'Due Diligence & Valuation'
    ]
  },
  {
    title: 'Cybersecurity & Data Privacy',
    items: [
      'ISO/IEC 27001 Certification',
      'SOC Certification (Type 1 & Type 2)',
      'GDPR Compliance',
      'HIPAA Compliance',
      'Global Data Privacy Compliance',
      'Cybersecurity Implementation',
      'AI Audit'
    ]
  },
  {
    title: 'Risk Advisory',
    items: [
      'Corporate Governance & Compliance',
      'Internal Audit & Controls',
      'Policies, SOPs & Process Reengineering',
      'Business Intelligence & Continuous Improvement',
      'IT, Systems & Fraud Risk Audits',
      'Stock & Fixed Asset Verification',
      'SAR Reconciliation & Process Review',
      'Third-Party Risk Management'
    ]
  },
  {
    title: 'ESG Advisory',
    items: [
      'ESG & Sustainability Reporting',
      'Supply Chain Audit & Data Gathering',
      'Carbon Emissions Estimation',
      'Climate Risk Assessment',
      'Compliance Trainings'
    ]
  },
  {
    title: 'ERP Implementation & Digital Transformation',
    items: [
      'ERP Module Review & Report Optimization',
      'Master Data Management',
      'Department-Wise Digital Transformation',
      'AI Integration for Process Efficiency & Insights'
    ]
  },
  {
    title: 'GCC & Operation Hub',
    items: [
      'Support Services',
      'Captive Shared Services Center Setup & Stabilization',
      'Build, Operate & Transform (BOT) Model Implementation'
    ]
  },
  {
    title: 'Training & Workshop',
    items: [
      'Internal Audit',
      'ESG & Sustainability',
      'Cybersecurity & Data Privacy Awareness',
      'AI Implementation',
      'Leadership & Soft Skills Development'
    ]
  },
  {
    title: 'Recruitment & Manpower Services',
    items: [
      'Temporary Staffing',
      'Permanent Recruitment'
    ]
  },
  {
    title: 'KSA Specific Services',
    items: [
      'Statutory Audit Support',
      'VAT & WHT Compliance',
      'Zakat & Corporate Tax',
      'Bookkeeping & Accounting',
      'Local Content Advisory'
    ]
  }
];

const videoMap = {
  'Training & Workshop': {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/CmvW1HWofM4'
  },
  'Cybersecurity & Data Privacy': {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/MKH0rvpBHis'
  },
  'Financial Advisory': {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/KjZd_UqgvJo'
  },
  'Risk Advisory': {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/T5CsH7RxaPQ'
  },
  'ESG Advisory': {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/CmvW1HWofM4'
  },
  'Recruitment & Manpower Services': {
    type: 'instagram',
    url: 'https://www.instagram.com/reel/DNNUxq6K8Ei/embed'
  },
  'GCC & Operation Hub': {
    type: 'linkedin',
    url: 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7408019530272337920'
  }
};

const BncServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromSidebar = new URLSearchParams(location.search).get('from') === 'sidebar';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#f5f7fb] via-[#f9fbff] to-[#eef2f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative overflow-hidden rounded-3xl shadow-xl mb-10 border border-white/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C5AA0] via-[#1f4f93] to-[#12346b]" />
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-16 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative p-8 md:p-10 text-white">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  {!fromSidebar && (
                    <p className="font-geist text-blue-100 text-sm uppercase tracking-[0.2em]">
                      Partner Dashboard
                    </p>
                  )}
                  <h1 className="font-poppins text-3xl md:text-4xl font-bold mt-2">
                    BnC Services
                  </h1>
                  <p className="font-geist text-blue-100 text-lg mt-3 max-w-2xl">
                    Explore every service with a dedicated video overview and a clear service scope.
                  </p>
                </div>
                {!fromSidebar && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-white/95 text-[#1e3a8a] font-semibold px-5 py-3 rounded-xl shadow hover:bg-white transition"
                  >
                    Back to Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceGroups.map((group) => (
              <div
                key={group.title}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gradient-to-b from-[#f1f5ff] to-[#e8eef9]">
                  <div className="aspect-video">
                    {videoMap[group.title] ? (
                      <iframe
                        className="w-full h-full"
                        src={videoMap[group.title].url}
                        title={`${group.title} video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        loading="lazy"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-geist">
                        Video coming soon
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-poppins text-xl font-semibold text-gray-900">
                      {group.title}
                    </h2>
                    <span className="text-xs font-geist font-semibold text-[#2C5AA0] bg-blue-50 px-2.5 py-1 rounded-full">
                      {group.items.length} Services
                    </span>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] rounded-full mt-3" />
                  <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                    {group.items.map((item) => (
                      <li key={item} className="font-geist">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {!videoMap[group.title] && (
                    <p className="font-geist text-gray-500 text-xs mt-4">
                      Video overview coming soon.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BncServices;
