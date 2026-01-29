import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ServiceDetailsModal = ({ isOpen, onClose, serviceData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {serviceData ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Partner Type</h3>
              <p className="text-gray-600">{serviceData.partnerType || 'Not specified'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {serviceData.services ? serviceData.services.split(',').map((service, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {service.trim()}
                  </span>
                )) : <span className="text-gray-500">No services specified</span>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Industries</h3>
              <div className="flex flex-wrap gap-2">
                {serviceData.industries ? serviceData.industries.split(',').map((industry, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {industry.trim()}
                  </span>
                )) : <span className="text-gray-500">No industries specified</span>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience Industries</h3>
              <div className="flex flex-wrap gap-2">
                {serviceData.experienceIndustries ? serviceData.experienceIndustries.split(',').map((exp, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {exp.trim()}
                  </span>
                )) : <span className="text-gray-500">No experience industries specified</span>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience Years</h3>
              <p className="text-gray-600">{serviceData.experienceYears || 'Not specified'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Work Type</h3>
              <p className="text-gray-600">{serviceData.workType || 'Not specified'}</p>
            </div>

            {serviceData.organisationName && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Organisation Name</h3>
                <p className="text-gray-600">{serviceData.organisationName}</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
              <p className="text-gray-600 leading-relaxed">{serviceData.bio || 'No bio provided'}</p>
            </div>

            {serviceData.meetingDate && serviceData.meetingTime && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Meeting Schedule</h3>
                <p className="text-gray-600">
                  {serviceData.meetingDate} at {serviceData.meetingTime}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No service details available. Please complete your AI Profile first.</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;