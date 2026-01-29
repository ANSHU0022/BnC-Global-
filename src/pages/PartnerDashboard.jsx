import React, { useState, useEffect } from 'react';
import { FaUser, FaServicestack, FaHeadset, FaGlobe, FaUsers, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const fetchServiceData = async (email) => {
    try {
      const params = new URLSearchParams({
        action: 'getServiceData',
        email: email
      });
      
      const url = `https://script.google.com/macros/s/AKfycby-worRSM90xQ6Ekb-axlZKY_c45-p4uXJkJfkFDtIDx6a33X-fjbZIZqOzk5kj2LPh8Q/exec?${params}`;
      
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
      const services = await fetchServiceData(partnerData.email);
      setServiceData(services);
      setIsServiceModalOpen(true);
    }
  };
    try {
      const params = new URLSearchParams({
        action: 'getPartnerData',
        email: email
      });
      
      const url = `https://script.google.com/macros/s/AKfycby-worRSM90xQ6Ekb-axlZKY_c45-p4uXJkJfkFDtIDx6a33X-fjbZIZqOzk5kj2LPh8Q/exec?${params}`;
      
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

  const handleLogout = () => {
    localStorage.removeItem('partnerUser');
    navigate('/login');
  };

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
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {partnerData?.firstName}! 👋
                </h2>
                <p className="text-gray-600 text-lg">Ready to grow your Services with BnC Global?</p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">ID: </span>
                  <span className="text-sm font-mono text-gray-700">
                    {partnerData?.email || 'N/A'}
                  </span>
                  <span className="ml-4 text-sm text-gray-500">Status: </span>
                  <span className={`text-sm font-medium ${
                    partnerData?.status === 'Active' ? 'text-green-600' : 
                    partnerData?.status === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {partnerData?.status || 'Pending'}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-6 rounded-full mt-4">
                <FaUser className="h-12 w-12 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Partner Profile Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Partner Profile</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                partnerData?.status === 'Active' ? 'bg-green-100 text-green-800' :
                partnerData?.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {partnerData?.status || 'Pending'}
              </span>
            </div>
            
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700 w-1/3">Profile ID</td>
                    <td className="px-4 py-3 text-gray-900">{partnerData?.email || '-'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Partner Name</td>
                    <td className="px-4 py-3 text-gray-900">{partnerData?.firstName} {partnerData?.lastName || '-'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Email Address</td>
                    <td className="px-4 py-3 text-gray-900">{partnerData?.email || '-'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Phone Number</td>
                    <td className="px-4 py-3 text-gray-900">{partnerData?.phone || '-'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Country</td>
                    <td className="px-4 py-3 text-gray-900">{partnerData?.country || '-'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">City</td>
                    <td className="px-4 py-3 text-gray-900">{partnerData?.city || '-'}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Bio</td>
                    <td className="px-4 py-3 text-gray-900">
                      {partnerData?.bio ? partnerData.bio : 
                        partnerData?.aiProfileCompleted ? 'Bio not available' : 'Complete AI Profile to add bio'
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* AI Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaUser className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Profile</h3>
              <p className="text-gray-600 mb-4">
                Complete your partner profile with our AI-powered questionnaire system.
              </p>
              <button 
                onClick={() => setIsAIModalOpen(true)}
                disabled={partnerData?.aiProfileCompleted}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  partnerData?.aiProfileCompleted 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {partnerData?.aiProfileCompleted ? 'Completed ✓' : 'Start AI Profile'}
              </button>
            </div>

            {/* Services Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FaServicestack className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Services</h3>
              <p className="text-gray-600 mb-4">
                View and manage the services you provide to clients.
              </p>
              <button 
                onClick={handleViewServices}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                View Services
              </button>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <FaHeadset className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 mb-4">
                Get assistance from our dedicated partner support team.
              </p>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </div>

            {/* International Networking Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaGlobe className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">International Networking</h3>
              <p className="text-gray-600 mb-4">
                Join our global network and collaborate with international clients. Expand your business reach worldwide.
              </p>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                Join Network
              </button>
            </div>

            {/* Manpower Requirements Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaUsers className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Manpower Requirements</h3>
              <p className="text-gray-600 mb-4">
                Find skilled professionals or offer your expertise to meet project requirements.
              </p>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
                View Opportunities
              </button>
            </div>

            {/* Earn from Referral Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <FaDollarSign className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn from Referral</h3>
              <p className="text-gray-600 mb-4">
                Refer new partners and clients to earn attractive commissions and rewards.
              </p>
              <button 
                onClick={() => setIsReferralModalOpen(true)}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:border-[#2C5AA0] hover:text-[#2C5AA0] hover:shadow-md active:scale-95"
              >
                Start Referring
              </button>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaCheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Account Created</h4>
                  <p className="text-gray-600 text-sm">
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
                    <h4 className="font-semibold text-gray-900">AI Profile Completed</h4>
                    <p className="text-gray-600 text-sm">
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
      
      <ServiceDetailsModal 
        isOpen={isServiceModalOpen} 
        onClose={() => setIsServiceModalOpen(false)}
        serviceData={serviceData}
      />
    </>
  );
};

export default PartnerDashboard;