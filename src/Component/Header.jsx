import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import PartnerFormModal from './PartnerFormModal';

const Header = () => {
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-40 rounded-b-3xl">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between h-30">
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
                  className="h-24 w-24 object-contain"
                />
                
                <span className="font-poppins font-bold text-[30px] text-[#2C5AA0] tracking-tight whitespace-nowrap">
                  BnC Global
                </span>
              </Link>
            </div>
            
            {/* Center Section */}
            <div className="hidden md:flex flex-1 justify-center">
              <nav className="flex items-center gap-6 whitespace-nowrap">
                <Link to="/" className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/partnerships" className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300">
                  Partnerships
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </Link>
                <button onClick={() => setIsModalOpen(true)} className="font-geist text-base text-gray-700 hover:text-[#2C5AA0] relative group transition-colors duration-300 whitespace-nowrap">
                  Apply Now
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2C5AA0] group-hover:w-full transition-all duration-300"></span>
                </button>
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center pl-10">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/dashboard"
                    className="hidden md:inline-block bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="hidden md:inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:inline-block bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-colors duration-300">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-30"></div>
      
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
