import React, { useState } from 'react';
import { FaTimes, FaUser, FaBriefcase } from 'react-icons/fa';

const ReferralModal = ({ isOpen, onClose, partnerData }) => {
  const [referralType, setReferralType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    jobRole: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const referralData = {
      referrerEmail: partnerData?.email,
      referralType,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      ...(referralType === 'client' && { service: formData.service }),
      ...(referralType === 'candidate' && { jobRole: formData.jobRole })
    };
    
    console.log('Referral submitted:', referralData);
    alert('Referral submitted successfully!');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setReferralType('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      jobRole: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full border-2 border-gray-300">
        <div className="p-6 border-b bg-[#2C5AA0] text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Earn from Referral</h2>
              <p className="text-blue-100 text-sm">Refer clients or candidates to earn rewards</p>
            </div>
            <button onClick={handleClose} className="text-blue-100 hover:text-white">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!referralType ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Referral Type</h3>
              
              <button
                onClick={() => setReferralType('client')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#2C5AA0] hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaUser className="h-5 w-5 text-[#2C5AA0]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Referral Client</h4>
                    <p className="text-sm text-gray-600">Refer a client who needs our services</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setReferralType('candidate')}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-[#2C5AA0] hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaBriefcase className="h-5 w-5 text-[#2C5AA0]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Referral Candidate</h4>
                    <p className="text-sm text-gray-600">Refer a candidate for job opportunities</p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {referralType === 'client' ? 'Refer Client' : 'Refer Candidate'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setReferralType('')}
                    className="text-sm text-[#2C5AA0] hover:underline"
                  >
                    ← Back
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-[#2C5AA0]"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-[#2C5AA0]"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-[#2C5AA0]"
                    placeholder="Enter email address"
                  />
                </div>

                {referralType === 'client' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What service they need?</label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-[#2C5AA0]"
                    >
                      <option value="">Select service</option>
                      <option value="cyber-security">Cyber Security</option>
                      <option value="data-privacy">Data Privacy</option>
                      <option value="internal-audit">Internal Audit</option>
                      <option value="finance-advisory">Finance Advisory</option>
                      <option value="compliance">Compliance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {referralType === 'candidate' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">For which role/job?</label>
                    <input
                      type="text"
                      required
                      value={formData.jobRole}
                      onChange={(e) => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-[#2C5AA0]"
                      placeholder="Enter job role or position"
                    />
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#2C5AA0] hover:text-[#2C5AA0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#2C5AA0] text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Referral
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralModal;