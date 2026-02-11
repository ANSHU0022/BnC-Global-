import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import PartnerFormModal from './PartnerFormModal';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const partnerUser = localStorage.getItem('partnerUser');
    if (partnerUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(partnerUser));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('open') === 'partner') {
      setIsModalOpen(true);
    }
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem('partnerUser');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40 rounded-b-3xl">
        <div className="w-full pl-20 pr-4">
          <div className="flex items-center justify-between h-23">
            {/* Left Section */}
            <div className="flex items-center space-x-4 pr-0">
              {/* Sidebar Menu Button */}
              <button 
                className="flex flex-col space-y-1"
                onClick={() => setIsSidebarOpen(true)}
              >
                <div className="w-6 h-0.5 bg-gray-700"></div>
                <div className="w-6 h-0.5 bg-gray-700"></div>
                <div className="w-6 h-0.5 bg-gray-700"></div>
              </button>
              
              {/* Logo + Company Name */}
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="https://static.wixstatic.com/media/0446e3_50ff54e1251b45ef8a1066bca3a75b0e~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b%20nc%20global.png" 
                  alt="BnC Global" 
                  className="h-20 w-20 object-contain"
                />
                
                <span className="font-poppins font-bold text-[30px] text-[#2C5AA0] tracking-tight whitespace-nowrap">
                  BnC Global
                </span>
              </Link>
            </div>
            
            {/* Center Section */}
            <div className="hidden md:flex flex-1 justify-start pl-40">
              <nav className="flex items-center gap-6 whitespace-nowrap">
                <Link to="/" className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300">
                  {t('header.home')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/bnc-services" className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300">
                  {t('header.services')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to={isLoggedIn ? "/dashboard?open=ai-profile" : "/login"}
                  className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300"
                >
                  {t('header.aiProfiling')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <button onClick={() => setIsModalOpen(true)} className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300 whitespace-nowrap">
                  {t('header.applyNow')}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </button>
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center pl-2 mr-20">
              <div className="hidden md:flex items-center gap-2 mr-4">
                <button
                  type="button"
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                    i18n.language === 'en'
                      ? 'bg-[#2C5AA0]/10 text-[#1e3a8a] border-[#2C5AA0]/30'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t('language.english')}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
                    i18n.language === 'ar'
                      ? 'bg-[#2C5AA0]/10 text-[#1e3a8a] border-[#2C5AA0]/30'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t('language.arabic')}
                </button>
              </div>
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/dashboard"
                    className="hidden md:inline-block bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-colors duration-300"
                  >
                    {t('header.dashboard')}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="hidden md:inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-colors duration-300"
                  >
                    {t('header.logout')}
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:inline-block bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-colors duration-300">
                  {t('header.login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={handleLogout}
      />
      <PartnerFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
