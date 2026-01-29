import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './AIProfileModal.css';

const AIProfileModal = ({ isOpen, onClose, partnerData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    partnerType: '',
    services: [],
    industries: [],
    mainIndustries: [],
    experienceIndustries: [],
    experienceYears: '',
    workType: '',
    organisationName: '',
    bio: '',
    meetingDate: '',
    meetingTime: ''
  });

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('meeting-date')?.setAttribute('min', today);
    }
  }, [isOpen]);

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
    setFormData(prev => ({
      ...prev,
      mainIndustries: prev.mainIndustries.includes(industry)
        ? prev.mainIndustries.filter(i => i !== industry)
        : [...prev.mainIndustries, industry]
    }));
    
    const subElement = document.getElementById(`sub-${industry}`);
    if (subElement) {
      subElement.style.display = subElement.style.display === 'none' ? 'block' : 'none';
    }
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
        : [...prev.experienceIndustries, industry]
    }));
  };

  const selectWorkType = (type) => {
    setFormData(prev => ({ ...prev, workType: type }));
    const orgField = document.getElementById('organisation-field');
    if (orgField) {
      orgField.style.display = type === 'organisation' ? 'block' : 'none';
    }
  };

  const selectTime = (time) => {
    setFormData(prev => ({ ...prev, meetingTime: time }));
    document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
    event.target.classList.add('selected');
  };

  const nextQuestion = () => {
    if (currentStep < 6) {
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
        experienceYears: formData.experienceYears,
        workType: formData.workType,
        organisationName: formData.organisationName,
        bio: formData.bio,
        meetingDate: formData.meetingDate,
        meetingTime: formData.meetingTime
      });
      
      const url = `https://script.google.com/macros/s/AKfycby-worRSM90xQ6Ekb-axlZKY_c45-p4uXJkJfkFDtIDx6a33X-fjbZIZqOzk5kj2LPh8Q/exec?${params}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('AI Profile submitted successfully');
        setIsSubmitted(true);
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
      case 4: return formData.experienceIndustries.length > 0 && formData.experienceYears !== '' && formData.workType !== '';
      case 5: return formData.bio.trim() !== '';
      case 6: return formData.meetingDate !== '' && formData.meetingTime !== '';
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="ai-profile-modal bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b bg-[#2C5AA0] text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">AI Partner Profile</h2>
              <p className="text-blue-100">Help us understand your partnership preferences</p>
            </div>
            <button onClick={onClose} className="text-blue-100 hover:text-white">
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
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
              <p className="text-gray-600 text-lg">Our team will be connected shortly.</p>
              <button 
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-[#2C5AA0] text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
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
                {['service-provider', 'service-consumer', 'both'].map(type => (
                  <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="partner-type"
                      value={type}
                      checked={formData.partnerType === type}
                      onChange={() => selectOption(1, type)}
                      className="mr-3"
                    />
                    <span className="capitalize">{type.replace('-', ' ')}</span>
                  </label>
                ))}
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
                ].map(service => (
                  <label key={service} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="mr-3"
                    />
                    <span className="capitalize">{service.replace(/-/g, ' ')}</span>
                  </label>
                ))}
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
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.mainIndustries.includes(industry.id)}
                        onChange={() => toggleMainIndustry(industry.id)}
                        className="mr-3"
                      />
                      <span>{industry.name}</span>
                    </label>
                    <div id={`sub-${industry.id}`} className="ml-6 mt-2 space-y-2" style={{ display: 'none' }}>
                      {industry.subs.map(sub => (
                        <label key={sub} className="flex items-center p-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.industries.includes(sub)}
                            onChange={() => toggleSubIndustry(sub)}
                            className="mr-2"
                          />
                          <span>{sub}</span>
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
                {['public-services', 'healthcare', 'finance', 'technology', 'education', 'retail', 'other'].map(industry => (
                  <label key={industry} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.experienceIndustries.includes(industry)}
                      onChange={() => selectExperienceIndustry(industry)}
                      className="mr-3"
                    />
                    <span className="capitalize">{industry.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>

              <h4 className="text-lg font-semibold mb-3">How many years of experience?</h4>
              <select
                value={formData.experienceYears}
                onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                className="w-full p-3 border rounded-lg mb-6"
              >
                <option value="">Select years of experience</option>
                {Array.from({ length: 20 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} year{i > 0 ? 's' : ''}</option>
                ))}
                <option value="20+">20+ years</option>
              </select>

              <h4 className="text-lg font-semibold mb-3">You work for Organisation or Individual?</h4>
              <div className="space-y-3 mb-4">
                {['organisation', 'individual', 'both'].map(type => (
                  <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="work-type"
                      value={type}
                      checked={formData.workType === type}
                      onChange={() => selectWorkType(type)}
                      className="mr-3"
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>

              <div id="organisation-field" style={{ display: formData.workType === 'organisation' ? 'block' : 'none' }}>
                <label className="block text-sm font-medium mb-2">Organisation Name</label>
                <input
                  type="text"
                  value={formData.organisationName}
                  onChange={(e) => setFormData(prev => ({ ...prev, organisationName: e.target.value }))}
                  placeholder="Enter organisation name"
                  className="w-full p-3 border rounded-lg"
                />
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

          {currentStep === 6 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">When should our team connect with you?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">📅 Select Date</h4>
                  <input
                    type="date"
                    id="meeting-date"
                    value={formData.meetingDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, meetingDate: e.target.value }))}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-semibold mb-3">🕐 Select Time</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:30', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
                      <button
                        key={time}
                        onClick={() => selectTime(time)}
                        className={`time-slot p-2 text-sm border rounded cursor-pointer hover:bg-blue-50 ${
                          formData.meetingTime === time ? 'selected bg-blue-500 text-white' : ''
                        }`}
                      >
                        {time}:00 {parseInt(time) < 12 ? 'AM' : 'PM'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="p-6 border-t bg-[#2C5AA0] flex justify-between items-center">
            <span className="text-sm text-blue-100">Step {currentStep} of 6</span>
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  onClick={previousQuestion}
                  className="px-4 py-2 border border-blue-200 text-white rounded-lg hover:bg-blue-600"
                >
                  Previous
                </button>
              )}
              {currentStep < 6 ? (
                <button
                  onClick={nextQuestion}
                  disabled={!canProceed()}
                  className="px-4 py-2 bg-white text-[#2C5AA0] rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitInterview}
                  disabled={!canProceed() || isSubmitting}
                  className="px-4 py-2 bg-white text-[#2C5AA0] rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
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