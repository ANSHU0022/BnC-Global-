import React, { useEffect, useState } from 'react';
import {
  FaTimes,
  FaUserTie,
  FaUserCheck,
  FaUsers,
  FaShieldAlt,
  FaUserShield,
  FaClipboardCheck,
  FaFileAlt,
  FaLeaf,
  FaChartLine,
  FaBalanceScale,
  FaUsersCog,
  FaCalculator,
  FaProjectDiagram,
  FaChalkboardTeacher,
  FaEllipsisH,
  FaLandmark,
  FaHospital,
  FaBuilding,
  FaGraduationCap,
  FaShoppingCart,
  FaUniversity,
  FaHandsHelping,
  FaUmbrellaBeach,
  FaIndustry,
  FaBolt,
  FaCogs,
  FaMicrochip,
  FaPhotoVideo,
  FaTruckMoving,
  FaBriefcase,
  FaLayerGroup,
} from 'react-icons/fa';
import './AIProfileModal.css';

const AIProfileModal = ({ isOpen, onClose, partnerData, onSubmitted }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedIndustries, setExpandedIndustries] = useState({});
  const [formData, setFormData] = useState({
    partnerType: '',
    services: [],
    industries: [],
    mainIndustries: [],
    experienceIndustries: [],
    experienceDetails: {},
    bio: ''
  });
  const emptyForm = {
    partnerType: '',
    services: [],
    industries: [],
    mainIndustries: [],
    experienceIndustries: [],
    experienceDetails: {},
    bio: ''
  };

  const resetForm = () => {
    setCurrentStep(1);
    setExpandedIndustries({});
    setFormData(emptyForm);
  };

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      resetForm();
    }
  }, [isOpen]);

  const partnerTypeIcons = {
    'service-provider': FaUserTie,
    'service-consumer': FaUserCheck,
    both: FaUsers
  };

  const serviceIcons = {
    'cyber-security': FaShieldAlt,
    'data-privacy': FaUserShield,
    'internal-audit': FaClipboardCheck,
    'sop': FaFileAlt,
    'esg': FaLeaf,
    'ifrs': FaBalanceScale,
    'finance-advisory': FaChartLine,
    'finance-tax-compliance': FaCalculator,
    'manpower-requirement': FaUsersCog,
    'valuation': FaProjectDiagram,
    'virtual-cfo': FaBriefcase,
    'training-provider': FaChalkboardTeacher,
    'other': FaEllipsisH
  };

  const industryIcons = {
    'public-services': FaLandmark,
    healthcare: FaHospital,
    'real-estate': FaBuilding,
    education: FaGraduationCap,
    retail: FaShoppingCart,
    finance: FaUniversity,
    social: FaHandsHelping,
    leisure: FaUmbrellaBeach,
    materials: FaIndustry,
    energy: FaBolt,
    industrial: FaCogs,
    technology: FaMicrochip,
    media: FaPhotoVideo,
    transport: FaTruckMoving,
    'business-services': FaBriefcase
  };

  const SubIndustryIcon = FaLayerGroup;

  const experienceIcons = {
    'public-services': FaLandmark,
    healthcare: FaHospital,
    finance: FaUniversity,
    technology: FaMicrochip,
    education: FaGraduationCap,
    retail: FaShoppingCart,
    other: FaEllipsisH
  };

  const steps = [
    { id: 1, label: 'Partner Type', helper: 'Choose how you want to engage' },
    { id: 2, label: 'Services', helper: 'Select the services you want' },
    { id: 3, label: 'Industries', helper: 'Pick your focus industries' },
    { id: 4, label: 'Experience', helper: 'Share your background' },
    { id: 5, label: 'Bio', helper: 'Tell us about yourself' }
  ];

  const selectOption = (step, value) => {
    if (step === 1) {
      setFormData(prev => ({ ...prev, partnerType: value }));
    }
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const toggleMainIndustry = (industry) => {
    setFormData(prev => {
      const isSelected = prev.mainIndustries.includes(industry);
      return {
        ...prev,
        mainIndustries: isSelected
          ? prev.mainIndustries.filter(i => i !== industry)
          : [...prev.mainIndustries, industry]
      };
    });
    setExpandedIndustries(prev => ({
      ...prev,
      [industry]: !prev[industry]
    }));
  };

  const toggleSubIndustry = (industry) => {
    setFormData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  const selectExperienceIndustry = (industry) => {
    setFormData(prev => ({
      ...prev,
      experienceIndustries: prev.experienceIndustries.includes(industry)
        ? prev.experienceIndustries.filter(i => i !== industry)
        : [...prev.experienceIndustries, industry],
      experienceDetails: prev.experienceIndustries.includes(industry)
        ? Object.fromEntries(Object.entries(prev.experienceDetails).filter(([key]) => key !== industry))
        : {
            ...prev.experienceDetails,
            [industry]: prev.experienceDetails[industry] || { years: '', organisationName: '' }
          }
    }));
  };

  const updateExperienceDetail = (industry, field, value) => {
    setFormData(prev => ({
      ...prev,
      experienceDetails: {
        ...prev.experienceDetails,
        [industry]: {
          ...prev.experienceDetails[industry],
          [field]: value
        }
      }
    }));
  };

  const nextQuestion = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitInterview = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    try {
      const params = new URLSearchParams({
        action: 'submitAIProfile',
        email: partnerData?.email,
        partnerType: formData.partnerType,
        services: formData.services.join(', '),
        industries: formData.industries.join(', '),
        experienceIndustries: formData.experienceIndustries.join(', '),
        experienceDetails: JSON.stringify(formData.experienceDetails),
        bio: formData.bio
      });
      
      const url = `https://script.google.com/macros/s/AKfycbxzBlON2yrLD6uqHaSybZutsndvgpsZFoA2HMOBY4bfynBKQdz6LHp13dXDD4CUlnY6Hw/exec?${params}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('AI Profile submitted successfully');
        setIsSubmitted(true);
        onSubmitted?.();
        setTimeout(() => {
          resetForm();
          onClose();
        }, 1800);
      } else {
        console.error('AI Profile submission failed:', result.message);
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting AI Profile:', error);
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return formData.partnerType !== '';
      case 2: return formData.services.length > 0;
      case 3: return formData.industries.length > 0;
      case 4:
        if (formData.experienceIndustries.length === 0) return false;
        return formData.experienceIndustries.every(industry => {
          const details = formData.experienceDetails[industry];
          return details && details.years !== '' && details.organisationName.trim() !== '';
        });
      case 5: return formData.bio.trim() !== '';
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="ai-profile-modal ai-modal-shell max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="ai-modal-header">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Partner Profile</h2>
            <p className="text-slate-600">Complete your profile in five quick steps</p>
          </div>
          <button onClick={onClose} className="ai-close-btn" aria-label="Close">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="ai-modal-body">
          <aside className="ai-modal-rail">
            <div className="ai-rail-card">
              <div className="ai-rail-title">Progress</div>
              <div className="ai-rail-steps">
                {steps.map(step => (
                  <div
                    key={step.id}
                    className={`ai-rail-step ${currentStep === step.id ? 'is-active' : ''} ${currentStep > step.id ? 'is-complete' : ''}`}
                  >
                    <div className="ai-rail-badge">{step.id}</div>
                    <div>
                      <div className="ai-rail-label">{step.label}</div>
                      <div className="ai-rail-helper">{step.helper}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ai-rail-note">
                Your responses help us match you with the right opportunities.
              </div>
            </div>
          </aside>

          <section className="ai-modal-content">
            <div className="ai-content-card">
              <div className="ai-content-progress">
                <div className="ai-progress-track">
                  <div
                    className="ai-progress-fill"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
                <div className="ai-progress-text">Step {currentStep} of {steps.length}</div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="animate-bounce mb-6">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank you for filling the details</h3>
                  <p className="text-gray-600 text-lg">Your AI Partner Profile has been submitted.</p>
                </div>
              ) : (
                <div className="ai-step-content">
          {currentStep === 1 && (
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-blue-900">BnC Global</h3>
                <p className="text-blue-800 text-sm">
                  BnC Global is a leading professional services firm specializing in business consulting, compliance, and advisory services.
                </p>
                <div className="mt-2 text-sm">
                  <strong>Your Profile ID:</strong> {partnerData?.email} | 
                  <strong> Name:</strong> {partnerData?.firstName} {partnerData?.lastName}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Which type of partner you want to become?</h3>
              <div className="space-y-3">
                {['service-provider', 'service-consumer', 'both'].map(type => {
                  const Icon = partnerTypeIcons[type] || FaUsers;
                  return (
                    <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="partner-type"
                        value={type}
                        checked={formData.partnerType === type}
                        onChange={() => selectOption(1, type)}
                        className="mr-3"
                      />
                      <span className="mr-2 text-black">
                        <Icon size={18} />
                      </span>
                      <span className="capitalize font-semibold">{type.replace('-', ' ')}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">What type of services you are interested in?</h3>
              <p className="text-sm text-gray-600 mb-4">(You can select multiple options)</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'cyber-security', 'data-privacy', 'internal-audit', 'sop', 'esg', 'ifrs',
                  'finance-advisory', 'finance-tax-compliance', 'manpower-requirement', 
                  'valuation', 'virtual-cfo', 'training-provider', 'other'
                ].map(service => {
                  const Icon = serviceIcons[service] || FaBriefcase;
                  return (
                    <label key={service} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="mr-3"
                      />
                      <span className="mr-2 text-black">
                        <Icon size={18} />
                      </span>
                      <span className="capitalize font-semibold">{service.replace(/-/g, ' ')}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Which industries do you work with for this service/solution?</h3>
              <p className="text-sm text-gray-600 mb-4">(You can select multiple options)</p>
              <div className="space-y-4">
                {[
                  { id: 'public-services', name: 'Public Services', subs: ['Ministries', 'Semi-government', 'Justice', 'Science', 'Special Economic Zones', 'Free Zone Authorities', 'Financial Centers'] },
                  { id: 'healthcare', name: 'Healthcare', subs: ['Healthcare Providers & Services', 'Healthcare Equipment & Supplies', 'Biotechnology & Life Sciences', 'Pharmaceuticals'] },
                  { id: 'real-estate', name: 'Real Estate & Construction', subs: ['Real Estate Investment', 'Infrastructure Development', 'Asset Management', 'Real Estate Services', 'Real Estate Consulting', 'Project Management', 'Construction & Engineering'] },
                  { id: 'education', name: 'Education', subs: ['Public & Private Schools', 'Universities', 'Skilling and Vocational Institutes', 'Education Technology', 'Libraries'] },
                  { id: 'retail', name: 'Retail', subs: ['Consumer Electronics & Appliances', 'Textiles & Apparel', 'Accessories & Luxury Goods', 'Food & Beverage', 'Household & Personal Products', 'Stores', 'Trading & Distribution', 'Automotive'] },
                  { id: 'finance', name: 'Finance', subs: ['Banking', 'Consumer Financial Services', 'Microfinance', 'Insurance', 'Private Equity', 'Capital Markets', 'Sovereign Wealth Funds', 'Investment & Wealth Management'] },
                  { id: 'social', name: 'Social', subs: ['NGO', 'Intergovernmental Organizations', 'Social Enterprises', 'Credit Unions', 'Co-operatives', 'Community Enterprises', 'Fair Trade Organizations'] },
                  { id: 'leisure', name: 'Leisure', subs: ['Hotels', 'Resorts & Cruise Lines', 'Restaurants & Catering Services', 'Tourism', 'Leisure & Recreation', 'Event Management', 'Sporting'] },
                  { id: 'materials', name: 'Materials', subs: ['Paper & Forest Products', 'Precious Metals', 'Industrial Metals', 'Chemicals', 'Plastics', 'Specialty Mining & Metals', 'Mining Support Services & Equipment', 'Construction Materials', 'Primary Resources'] },
                  { id: 'energy', name: 'Energy', subs: ['Exploration & Production (Upstream)', 'Refining & Marketing (Downstream)', 'Storage & Transportation (Midstream)', 'Equipment & Services', 'Coal', 'Natural Gas', 'Nuclear Energy', 'Utilities', 'Renewable Energy'] },
                  { id: 'industrial', name: 'Industrial', subs: ['Aerospace', 'Defense', 'Electrical Components & Equipment', 'Industrial Conglomerates', 'Construction Machinery & Heavy Trucks', 'Shipbuilding', 'Agricultural & Farm Machinery', 'Industrial Machinery'] },
                  { id: 'technology', name: 'Technology', subs: ['Telecom Services', 'Communication Equipment', 'Semiconductors', 'Software', 'Internet & Ecommerce', 'IT Consulting & Services', 'Hardware & Equipment'] },
                  { id: 'media', name: 'Media', subs: ['Advertising', 'Broadcasting', 'Digital', 'Cable & Satellite', 'Entertainment', 'Publishing'] },
                  { id: 'transport', name: 'Transport', subs: ['Logistics', 'Airlines', 'Marine', 'Road & Rail', 'Leasing & Rental', 'Infrastructure'] },
                  { id: 'business-services', name: 'Business Services', subs: ['Employment Services', 'Business Support', 'Consulting', 'Research', 'Assurance'] }
                ].map(industry => (
                  <div key={industry.id}>
                    {(() => {
                      const Icon = industryIcons[industry.id] || FaIndustry;
                      return (
                        <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={formData.mainIndustries.includes(industry.id)}
                            onChange={() => toggleMainIndustry(industry.id)}
                            className="mr-3"
                          />
                          <span className="mr-2 text-black">
                            <Icon size={18} />
                          </span>
                          <span className="font-semibold">{industry.name}</span>
                        </label>
                      );
                    })()}
                    <div
                      id={`sub-${industry.id}`}
                      className={`ml-6 mt-2 space-y-2 ${expandedIndustries[industry.id] ? 'block' : 'hidden'}`}
                    >
                      {industry.subs.map(sub => (
                        <label key={sub} className="flex items-center p-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.industries.includes(sub)}
                            onChange={() => toggleSubIndustry(sub)}
                            className="mr-2"
                          />
                          <span className="mr-2 text-black">
                            <SubIndustryIcon size={14} />
                          </span>
                          <span className="font-semibold">{sub}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">In which industry do you have experience?</h3>
              <p className="text-sm text-gray-600 mb-4">(You can select multiple options)</p>
              <div className="space-y-3 mb-6">
                {['public-services', 'healthcare', 'finance', 'technology', 'education', 'retail', 'other'].map(industry => {
                  const Icon = experienceIcons[industry] || FaBriefcase;
                  const details = formData.experienceDetails[industry];
                  return (
                    <div key={industry} className="border rounded-lg p-3">
                      <label className="flex items-center cursor-pointer hover:bg-gray-50 rounded-md">
                        <input
                          type="checkbox"
                          checked={formData.experienceIndustries.includes(industry)}
                          onChange={() => selectExperienceIndustry(industry)}
                          className="mr-3"
                        />
                        <span className="mr-2 text-black">
                          <Icon size={18} />
                        </span>
                        <span className="capitalize font-semibold">{industry.replace('-', ' ')}</span>
                      </label>
                      {formData.experienceIndustries.includes(industry) && (
                        <div className="mt-4 flex flex-col md:flex-row gap-4">
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Experience</label>
                            <select
                              value={details?.years || ''}
                              onChange={(e) => updateExperienceDetail(industry, 'years', e.target.value)}
                              className="w-full p-3 border rounded-lg"
                            >
                              <option value="">Select years of experience</option>
                              {Array.from({ length: 20 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1} year{i > 0 ? 's' : ''}</option>
                              ))}
                              <option value="20+">20+ years</option>
                            </select>
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Organisation Name</label>
                            <input
                              type="text"
                              value={details?.organisationName || ''}
                              onChange={(e) => updateExperienceDetail(industry, 'organisationName', e.target.value)}
                              placeholder="Enter organisation name"
                              className="w-full p-3 border rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Add your bio / Write about Yourself</h3>
              <textarea
                value={formData.bio}
                onChange={(e) => {
                  const words = e.target.value.split(/\s+/).filter(word => word.length > 0);
                  if (words.length <= 100) {
                    setFormData(prev => ({ ...prev, bio: e.target.value }));
                  }
                }}
                placeholder="Tell us about yourself, your experience, skills, and what makes you a great partner..."
                className="w-full p-4 border rounded-lg h-32 resize-none"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.bio.split(/\s+/).filter(word => word.length > 0).length}/100 words
              </div>
            </div>
          )}

                </div>
              )}
            </div>
          </section>
        </div>

        {!isSubmitted && (
        <div className="ai-modal-footer">
          <div className="ai-footer-hint">Keep going, you are almost done.</div>
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                onClick={previousQuestion}
                className="ai-btn-secondary"
              >
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                onClick={nextQuestion}
                disabled={!canProceed()}
                className="ai-btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitInterview}
                disabled={!canProceed() || isSubmitting}
                className="ai-btn-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AIProfileModal;

