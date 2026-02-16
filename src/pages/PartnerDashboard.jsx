import React, { useState, useEffect } from 'react';
import { FaUser, FaServicestack, FaHeadset, FaGlobe, FaUsers, FaDollarSign, FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import AIProfileModal from '../Component/AIProfileModal';
import ReferralModal from '../Component/ReferralModal';
import ServiceDetailsModal from '../Component/ServiceDetailsModal';
import TermsAgreementModal from '../Component/TermsAgreementModal';

const PartnerDashboard = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchServiceData = async (email) => {
    try {
      const params = new URLSearchParams({
        action: 'getServiceData',
        email: email
      });
      
      const url = `https://script.google.com/macros/s/AKfycbxFTbVglGTWrOFI0VVjM4NwcQ80kUtuvLhwPPwNw-Vi3OMF3Cn7tzC3cz_iyCzSNY8T9g/exec?${params}`;
      
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
      
      const url = `https://script.google.com/macros/s/AKfycbxFTbVglGTWrOFI0VVjM4NwcQ80kUtuvLhwPPwNw-Vi3OMF3Cn7tzC3cz_iyCzSNY8T9g/exec?${params}`;
      
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
          setPartnerData((prev) => {
            const merged = {
              ...freshData,
              agreementSigned: prev?.agreementSigned || freshData.agreementSigned,
              agreementSignedName: prev?.agreementSignedName || freshData.agreementSignedName,
              agreementSignedAt: prev?.agreementSignedAt || freshData.agreementSignedAt
            };
            localStorage.setItem('partnerUser', JSON.stringify(merged));
            return merged;
          });
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
    if (open === 'ai-profile' && !partnerData?.aiProfileCompleted) {
      setIsAIModalOpen(true);
    }
    if (open === 'referral') {
      setIsReferralModalOpen(true);
    }
  }, [location.search, partnerData?.aiProfileCompleted]);

  const handleLogout = () => {
    localStorage.removeItem('partnerUser');
    navigate('/login');
  };

  const agreementSigned = Boolean(partnerData?.agreementSigned);
  const aiProfileCompleted = Boolean(partnerData?.aiProfileCompleted);

  const statusConfig = aiProfileCompleted
    ? agreementSigned
      ? {
          text: 'View BnC Services',
          buttonLabel: 'BnC Services',
          onClick: () => navigate('/bnc-services')
        }
      : {
          text: 'Sign the agreement',
          buttonLabel: 'Sign Agreement',
          onClick: () => {
            setIsAgreementOpen(true);
          }
        }
    : {
        text: 'Complete your AI profiling',
        buttonLabel: 'Complete Profile',
        onClick: () => setIsAIModalOpen(true)
      };
  const isSingleView = viewMode === 'single';
  const query = searchTerm.trim().toLowerCase();
  const matchesSearch = (value) =>
    !query || (value && value.toLowerCase().includes(query));

  const showAIProfile = matchesSearch('ai profile complete your partner profile questionnaire ai');
  const showServices = matchesSearch('services manage provide clients view services');
  const showBnCServices = matchesSearch('bnc services explore suite videos browse offerings');
  const showNetworking = matchesSearch('international networking global network collaborate clients');
  const showManpower = matchesSearch('manpower requirements skilled professionals opportunities');
  const showReferral = matchesSearch('earn referral commissions rewards start referring');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f3ee] flex items-center justify-center">
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
      <div className="min-h-screen bg-[#f7f3ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Top Structure */}
          <div className="rounded-3xl bg-[#f7f3ee] px-6 py-10 sm:px-10">
            <div className="text-center">
              <p className="font-geist text-sm uppercase tracking-[0.28em] text-slate-500">Partner Dashboard</p>
              <h2 className="font-poppins text-3xl sm:text-4xl font-semibold text-slate-900 mt-3">
                Welcome back, {partnerData?.firstName}
              </h2>
              <p className="font-geist text-slate-500 mt-3">
                Ready to grow your services with BnC Global? Collaborate, manage, and expand your reach.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex w-full max-w-2xl items-center rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-200">
                <input
                  type="text"
                  placeholder="Search for a service or client"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                  aria-label="Search"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#efede8] px-5 py-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v6" strokeLinecap="round" />
                    <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-slate-700">Account ID:</span>
                    <span className="font-mono text-slate-700">{partnerData?.email || 'N/A'}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Complete your profile to unlock full international networking features.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium text-slate-700">Status:</span>
                <span className="text-slate-600">{statusConfig.text}</span>
                <div className="ml-auto flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={statusConfig.onClick}
                    className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm ${
                      aiProfileCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {statusConfig.buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter + View */}
          <div className="mt-4 mb-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                Recent
              </button>
            </div>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                className={`flex h-9 w-10 items-center justify-center rounded-lg transition-colors ${
                  !isSingleView ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="3" width="5" height="5" rx="1" className="fill-current" />
                  <rect x="12" y="3" width="5" height="5" rx="1" className="fill-current" />
                  <rect x="3" y="12" width="5" height="5" rx="1" className="fill-current" />
                  <rect x="12" y="12" width="5" height="5" rx="1" className="fill-current" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('single')}
                aria-label="Single view"
                className={`flex h-9 w-10 items-center justify-center rounded-lg transition-colors ${
                  isSingleView ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="4" width="14" height="2.6" rx="1.3" className="fill-current" />
                  <rect x="3" y="9" width="14" height="2.6" rx="1.3" className="fill-current" />
                  <rect x="3" y="14" width="14" height="2.6" rx="1.3" className="fill-current" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div
            className={`grid gap-6 mb-6 ${
              isSingleView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {/* AI Profile Card */}
            {showAIProfile && (
            <div className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-[#2C5AA0]/15 via-sky-200/20 to-transparent blur-2xl" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-50 p-4 rounded-2xl ring-1 ring-blue-100">
                  <FaUser className="h-7 w-7 text-[#2C5AA0]" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  ACTIVE
                </span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-slate-900 mb-2">AI Profile</h3>
              <p className="font-geist text-sm text-slate-600 mb-7 leading-relaxed">
                Complete your partner profile with our AI-powered questionnaire system.
              </p>
              <button
                onClick={() => {
                  if (!partnerData?.aiProfileCompleted) {
                    setIsAIModalOpen(true);
                  }
                }}
                disabled={partnerData?.aiProfileCompleted}
                className={`${isSingleView ? 'w-56 self-end text-base px-6 py-3 rounded-full' : 'w-full py-3.5 px-5 rounded-full'} font-semibold transition-all duration-300 mt-auto ${
                  partnerData?.aiProfileCompleted
                    ? 'bg-emerald-500 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white transform hover:scale-[1.02] hover:shadow-lg'
                }`}
              >
                {partnerData?.aiProfileCompleted ? 'Completed' : 'Start Profile'}
              </button>
            </div>
            )}

            {/* Services Card */}
            {showServices && (
            <div className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br from-orange-200/20 via-amber-100/20 to-transparent blur-2xl" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="bg-orange-50 p-4 rounded-2xl ring-1 ring-orange-100">
                  <FaServicestack className="h-7 w-7 text-orange-600" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  ACTIVE
                </span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-slate-900 mb-2">Services</h3>
              <p className="font-geist text-sm text-slate-600 mb-7 leading-relaxed">
                View and manage the services you provide to clients.
              </p>
              <button
                onClick={handleViewServices}
                disabled={isLoadingServices}
                className={`${isSingleView ? 'w-56 self-end text-base px-6 py-3 rounded-full' : 'w-full py-3.5 px-5 rounded-full'} bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-auto`}
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
            )}
            

            {/* BnC Services Card */}
            {showBnCServices && (
            <div className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br from-amber-200/25 via-yellow-100/20 to-transparent blur-2xl" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="bg-amber-50 p-4 rounded-2xl ring-1 ring-amber-100">
                  <FaServicestack className="h-6 w-6 text-amber-600" />
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  ACTIVE
                </span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-slate-900 mb-2">BnC Services</h3>
              <p className="font-geist text-sm text-slate-600 mb-7 leading-relaxed">
                Explore our full suite of services with dedicated videos for each offering.
              </p>
              <button
                onClick={() => navigate('/bnc-services')}
                className={`${isSingleView ? 'w-56 self-end text-base px-6 py-3 rounded-full' : 'w-full py-3.5 px-5 rounded-full'} bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 mt-auto`}
              >
                <span>Browse</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            )}

            {/* Agreement Status Card */}
            <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm transition-shadow duration-300 flex flex-col h-full">
              <div className="grid grid-cols-[auto_1fr] gap-3 mb-3 items-start">
                <div className="bg-slate-50 p-2.5 rounded-xl">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 4h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <path d="M14 4v4h4" />
                    <path d="M8 12h8" />
                    <path d="M8 16h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-poppins text-sm font-semibold text-slate-900">Agreement</h3>
                  <p className="font-geist text-xs text-slate-500 leading-relaxed mt-1">
                    {agreementSigned ? 'Signed and on record.' : 'Please sign after completing your AI Profile.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!partnerData?.aiProfileCompleted) {
                    alert('Please complete your AI Profile before signing the agreement.');
                    return;
                  }
                  setIsAgreementOpen(true);
                }}
                className={`w-auto self-end text-xs px-3 py-2 rounded-full font-semibold transition-colors mt-auto ${
                  agreementSigned
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {agreementSigned ? 'Agreement Signed' : 'Sign Agreement'}
              </button>
            </div>

            {/* Earn from Referral Card */}
            {showReferral && (
            <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm transition-shadow duration-300 flex flex-col h-full">
              <div className="grid grid-cols-[auto_1fr] gap-3 mb-3 items-start">
                <div className="bg-rose-50 p-2.5 rounded-xl">
                  <FaDollarSign className="h-4 w-4 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-poppins text-sm font-semibold text-slate-900">Earn from Referral</h3>
                  <p className="font-geist text-xs text-slate-500 leading-relaxed mt-1">
                    Refer new partners and clients to earn attractive commissions and rewards.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReferralModalOpen(true)}
                className={`${isSingleView ? 'w-40 self-end text-sm px-4 py-2 rounded-full' : 'w-auto self-end text-xs px-3 py-2 rounded-full'} bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] hover:from-[#1e3a8a] hover:to-[#2C5AA0] text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 mt-auto`}
              >
                <span>Start Referring</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            )}
            

            {/* Manpower Requirements Card */}
            {showManpower && (
            <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm transition-shadow duration-300 flex flex-col h-full">
              <div className="grid grid-cols-[auto_1fr] gap-3 mb-3 items-start">
                <div className="bg-violet-50 p-2.5 rounded-xl">
                  <FaUsers className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-poppins text-sm font-semibold text-slate-900">Manpower Requirements</h3>
                  <p className="font-geist text-xs text-slate-500 leading-relaxed mt-1">
                    Find skilled professionals or offer your expertise to meet project requirements.
                  </p>
                </div>
              </div>
              <button className={`${isSingleView ? 'w-40 self-end text-sm px-4 py-2 rounded-full' : 'w-auto self-end text-xs px-3 py-2 rounded-full'} bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors mt-auto`}>
                View Opportunities
              </button>
            </div>
            )}

            {/* International Networking Card */}
            {showNetworking && (
            <div className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-sm transition-shadow duration-300 flex flex-col h-full">
              <div className="grid grid-cols-[auto_1fr] gap-3 mb-3 items-start">
                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <FaGlobe className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-poppins text-sm font-semibold text-slate-900">International Networking</h3>
                  <p className="font-geist text-xs text-slate-500 leading-relaxed mt-1">
                    Join our global network and collaborate with international clients.
                  </p>
                </div>
              </div>
              <button className={`${isSingleView ? 'w-40 self-end text-sm px-4 py-2 rounded-full' : 'w-auto self-end text-xs px-3 py-2 rounded-full'} bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors mt-auto`}>
                Join Network
              </button>
            </div>
            )}
            
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-10">
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

              {agreementSigned && (
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <FaCheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900">Agreement Signed</h4>
                    <p className="font-geist text-gray-600 text-sm">
                      Your partner agreement has been signed and recorded.
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
        onSubmitted={() => {
          setPartnerData(prev => {
            const updated = { ...(prev || {}), aiProfileCompleted: true };
            localStorage.setItem('partnerUser', JSON.stringify(updated));
            return updated;
          });
        }}
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
      
      <TermsAgreementModal
        isOpen={isAgreementOpen}
        onClose={() => setIsAgreementOpen(false)}
        partnerData={partnerData}
        onSubmitted={({ signedName, signedAt }) => {
          setPartnerData((prev) => {
            const updated = {
              ...(prev || {}),
              agreementSigned: true,
              agreementSignedName: signedName,
              agreementSignedAt: signedAt
            };
            localStorage.setItem('partnerUser', JSON.stringify(updated));
            return updated;
          });
        }}
      />
    </>
  );
};

export default PartnerDashboard;


