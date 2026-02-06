import React, { useState, useEffect } from 'react';
import { FaUser, FaServicestack, FaHeadset, FaGlobe, FaUsers, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import AIProfileModal from '../Component/AIProfileModal';
import ReferralModal from '../Component/ReferralModal';
import ServiceDetailsModal from '../Component/ServiceDetailsModal';

const PartnerDashboard = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchServiceData = async (email) => {
    try {
      const params = new URLSearchParams({
        action: 'getServiceData',
        email: email
      });
      
      const url = `https://script.google.com/macros/s/AKfycbzVBOWgY3Qmgau1THM3lWq0u_7hH6RPVgBc6eXaWUYyBApkBZZm6u4LxY6HsUpUOtIzzw/exec?${params}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        console.error('Failed to fetch service data:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
      return null;
    }
  };

  const handleViewServices = async () => {
    if (partnerData?.email) {
      setIsLoadingServices(true);
      const services = await fetchServiceData(partnerData.email);
      setServiceData(services);
      setIsServiceModalOpen(true);
      setIsLoadingServices(false);
    }
  };

  const fetchPartnerData = async (email) => {
    try {
      const params = new URLSearchParams({
        action: 'getPartnerData',
        email: email
      });
      
      const url = `https://script.google.com/macros/s/AKfycbzVBOWgY3Qmgau1THM3lWq0u_7hH6RPVgBc6eXaWUYyBApkBZZm6u4LxY6HsUpUOtIzzw/exec?${params}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        console.error('Failed to fetch partner data:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
      return null;
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('partnerUser');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userData);
      setPartnerData(user);
      
      const refreshData = async () => {
        const freshData = await fetchPartnerData(user.email);
        if (freshData) {
          setPartnerData(freshData);
          localStorage.setItem('partnerUser', JSON.stringify(freshData));
        }
      };
      
      refreshData().then(() => setLoading(false));
      
      // Auto-refresh every 5 seconds
      const interval = setInterval(refreshData, 5000);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const open = params.get('open');
    if (open === 'ai-profile') {
      setIsAIModalOpen(true);
    }
    if (open === 'referral') {
      setIsReferralModalOpen(true);
    }
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem('partnerUser');
    navigate('/login');
  };

  const aiProfileStatus = partnerData?.aiProfileCompleted
    ? 'View Partner Services'
    : 'Complete your AI Profile';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5AA0] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] rounded-xl shadow-lg p-8 mb-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-poppins text-4xl font-bold mb-3">
                  Welcome back, {partnerData?.firstName}! 👋
                </h2>
                <p className="font-geist text-blue-100 text-xl mb-4">Ready to grow your Services with BnC Global?</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className=" bg-opacity-20 border border-white px-3 py-1 rounded-full">
                    <span className="text-white">ID: </span>
                    <span className="font-mono text-white">{partnerData?.email || 'N/A'}</span>
                  </div>
                  <div className=" bg-opacity-20 border border-white px-3 py-1 rounded-full">
                    <span className="text-white">Status: </span>
                    <span className="font-medium text-white">
                      {aiProfileStatus}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white  bg-opacity-20 p-6 rounded-full">
                <FaUser className="h-13 w-13 text-black" />
              </div>
            </div>
          </div>

         

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* AI Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl">
                  <FaUser className="h-8 w-8 text-[#2C5AA0]" />
                </div>
              </div>
              <h3 className="font-poppins text-xl font-bold text-gray-900 mb-3">AI Profile</h3>
              <p className="font-geist text-gray-600 mb-6 leading-relaxed">
                Complete your partner profile with our AI-powered questionnaire system.
              </p>
              <button 
                onClick={() => setIsAIModalOpen(true)}
                disabled={partnerData?.aiProfileCompleted}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 mt-auto ${
                  partnerData?.aiProfileCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white transform hover:scale-105 hover:shadow-lg'
                }`}
              >
                {partnerData?.aiProfileCompleted ? 'Completed ✓' : 'Start AI Profile'}
              </button>
            </div>

            {/* Services Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl">
                  <FaServicestack className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <h3 className="font-poppins text-xl font-bold text-gray-900 mb-3">Services</h3>
              <p className="font-geist text-gray-600 mb-6 leading-relaxed">
                View and manage the services you provide to clients.
              </p>
              <button 
                onClick={handleViewServices}
                disabled={isLoadingServices}
                className="w-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-auto"
              >
                {isLoadingServices ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>View Services</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* BnC Services Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <FaServicestack className="h-6 w-6 text-yellow-700" />
                </div>
              </div>
              <h3 className="font-poppins text-xl font-bold text-gray-900 mb-3">BnC Services</h3>
              <p className="font-geist text-gray-600 mb-6 leading-relaxed">
                Explore our full suite of services with dedicated videos for each offering.
              </p>
              <button
                onClick={() => navigate('/bnc-services')}
                className="w-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 mt-auto"
              >
                <span>View BnC Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* International Networking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaGlobe className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">International Networking</h3>
              <p className="font-geist text-gray-600 mb-4">
                Join our global network and collaborate with international clients. Expand your business reach worldwide.
              </p>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors mt-auto">
                Join Network
              </button>
            </div>

            {/* Manpower Requirements Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaUsers className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">Manpower Requirements</h3>
              <p className="font-geist text-gray-600 mb-4">
                Find skilled professionals or offer your expertise to meet project requirements.
              </p>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors mt-auto">
                View Opportunities
              </button>
            </div>

            {/* Earn from Referral Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <FaDollarSign className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-gray-900 mb-2">Earn from Referral</h3>
              <p className="font-geist text-gray-600 mb-4">
                Refer new partners and clients to earn attractive commissions and rewards.
              </p>
              <button 
                onClick={() => setIsReferralModalOpen(true)}
                className="w-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 mt-auto"
              >
                <span>Start Referring</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-poppins text-2xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900">Account Created</h4>
                  <p className="font-geist text-gray-600 text-sm">
                    Your partner account has been successfully created and activated
                  </p>
                </div>
              </div>
              
              {partnerData?.aiProfileCompleted && (
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaCheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900">AI Profile Completed</h4>
                    <p className="font-geist text-gray-600 text-sm">
                      You have successfully completed your AI partner profile
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      <AIProfileModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)}
        partnerData={partnerData}
      />
      
      <ReferralModal 
        isOpen={isReferralModalOpen} 
        onClose={() => setIsReferralModalOpen(false)}
        partnerData={partnerData}
      />
      
      <ServiceDetailsModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)}
        serviceData={serviceData}
      />
    </>
  );
};

export default PartnerDashboard;
