import React, { useState, useEffect, useMemo } from 'react';
import { FaUser, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import AIProfileModal from '../Component/AIProfileModal';
import ReferralModal from '../Component/ReferralModal';
import TermsAgreementModal from '../Component/TermsAgreementModal';
import { getServicesByCountry } from '../data/services';

const PartnerDashboard = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('india');
  const navigate = useNavigate();
  const location = useLocation();

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
          text: 'View Global Services',
          buttonLabel: 'Global Services',
          onClick: () => navigate('/services/global')
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
  const query = searchTerm.trim().toLowerCase();
  const matchesSearch = (value) =>
    !query || (value && value.toLowerCase().includes(query));

  const showAIProfile = matchesSearch('ai profile complete your partner profile questionnaire ai');

  const embeddedCountryKey = selectedCountry === 'global' ? 'other' : selectedCountry;
  const embeddedServices = useMemo(() => {
    const services = getServicesByCountry(embeddedCountryKey);
    const term = searchTerm.trim().toLowerCase();
    if (!term) return services;
    return services.filter((service) => {
      if (service.title.toLowerCase().includes(term)) return true;
      if (service.id.toLowerCase().includes(term)) return true;
      return (service.bullets || []).some((item) => item.toLowerCase().includes(term));
    });
  }, [embeddedCountryKey, searchTerm]);

  const LazyVideo = ({ src, title }) => {
    const containerRef = React.useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
      if (!containerRef.current) return undefined;
      if (shouldLoad) return undefined;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
            }
          });
        },
        { rootMargin: '150px' }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }, [shouldLoad]);

    return (
      <div ref={containerRef} className="relative w-full h-full">
        {shouldLoad ? (
          <iframe
            className="w-full h-full"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 via-white to-slate-100">
            <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,rgba(226,232,240,0.35),rgba(255,255,255,0.8),rgba(226,232,240,0.35))] bg-[length:200%_100%]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-geist text-slate-500 shadow-sm">
                Preparing preview
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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
                  placeholder="Search for a service or keyword"
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

            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#efede8] px-5 py-4 text-sm text-slate-600 sm:flex-row sm:items-center">
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
              <div className="flex w-full flex-col gap-3 sm:ml-auto sm:w-auto sm:items-end">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-medium text-slate-700">Status:</span>
                  <span className="text-slate-600">{statusConfig.text}</span>
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

          <div className="-mt-7 flex justify-end">
            <div className="flex flex-wrap items-stretch gap-3">
              {showAIProfile && (
                <div className="w-32 rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-200/70">
                  <div className="flex items-center gap-2">
                    <FaUser className="h-3.5 w-3.5 text-[#2C5AA0]" />
                    <div className="flex-1">
                      <h3 className="font-poppins text-[10px] font-semibold text-slate-900">
                        AI Profile
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!partnerData?.aiProfileCompleted) {
                        setIsAIModalOpen(true);
                      }
                    }}
                    disabled={partnerData?.aiProfileCompleted}
                    className={`mt-2 w-full rounded-full px-2 py-1 text-[9px] font-semibold transition-colors ${
                      partnerData?.aiProfileCompleted
                        ? 'bg-emerald-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] text-white hover:from-[#1e3a8a] hover:to-[#2C5AA0]'
                    }`}
                  >
                    {partnerData?.aiProfileCompleted ? 'Done' : 'Start'}
                  </button>
                </div>
              )}
              <div className="w-32 rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-200/70">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 4h7l4 4v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <path d="M14 4v4h4" />
                    <path d="M8 12h8" />
                    <path d="M8 16h6" />
                  </svg>
                  <h3 className="font-poppins text-[10px] font-semibold text-slate-900">Agreement</h3>
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
                  className={`mt-2 w-full rounded-full px-2 py-1 text-[9px] font-semibold transition-colors ${
                    agreementSigned
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {agreementSigned ? 'Signed' : 'Sign'}
                </button>
              </div>
            </div>
          </div>

          {/* Country Services Embed */}
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { key: 'india', label: 'India' },
                { key: 'saudi-arabia', label: 'Saudi Arabia' },
                { key: 'global', label: 'Global' }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSelectedCountry(item.key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition ${
                    selectedCountry === item.key
                      ? 'bg-[#2C5AA0] text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {embeddedServices.map((service) => (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-b from-[#f1f5ff] to-[#e8eef9]">
                    <div className="aspect-video">
                      {service.videoUrl ? (
                        <LazyVideo src={service.videoUrl} title={`${service.title} video`} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-geist">
                          Video coming soon
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 pb-16">
                    <div className="flex items-center justify-between">
                      <h2 className="font-poppins text-xl font-semibold text-gray-900">
                        {service.title}
                      </h2>
                      {service.bullets?.length > 0 && (
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-geist font-semibold text-[#2C5AA0] bg-blue-50 px-2.5 py-1 rounded-full">
                          {service.bullets.length} Services
                        </span>
                      )}
                    </div>
                    {service.bullets?.length > 0 && (
                      <>
                        <div className="h-1 w-16 bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] rounded-full mt-3" />
                        <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                          {service.bullets.map((item) => (
                            <li key={item} className="font-geist">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {!service.videoUrl && (
                      <p className="font-geist text-gray-500 text-xs mt-4">
                        Services will be available soon.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/services/${selectedCountry}/${service.id}`)}
                    className="absolute bottom-4 right-6 inline-flex items-center gap-2 text-sm font-semibold font-geist text-white rounded-full px-5 py-2.5 bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] shadow-lg shadow-[#2C5AA0]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#2C5AA0]/30 hover:-translate-y-0.5 hover:from-[#1e3a8a] hover:to-[#163062] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C5AA0]/40"
                  >
                    View more
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white text-xs transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </button>
                </div>
              ))}
            </div>
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


