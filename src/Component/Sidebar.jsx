import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPaperPlane, FaUser, FaShieldAlt, FaTimes, FaTachometerAlt, FaServicestack, FaRobot, FaDollarSign } from 'react-icons/fa';
import PartnerFormModal from './PartnerFormModal';

const Sidebar = ({ isOpen, onClose, isLoggedIn, user, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyNowClick = () => {
    onClose();
    window.location.href = '/?open=partner';
  };

  const navigationItems = [
    { to: '/', icon: FaHome, label: 'Home' }
  ];

  return (
    <>
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'bg-black/30 backdrop-blur-[2px]' : 'bg-transparent'}`} 
          onClick={onClose}
        ></div>
        
        <div className={`absolute left-0 top-0 h-full w-80 bg-gradient-to-b from-white via-[#f7f9ff] to-[#edf2fb] shadow-2xl rounded-r-3xl transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://static.wixstatic.com/media/0446e3_50ff54e1251b45ef8a1066bca3a75b0e~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b%20nc%20global.png" 
                  alt="BnC Global" 
                  className="h-20 w-20 object-contain"
                />
                <div className="flex flex-col">
                  <h2 className="font-poppins text-3xl font-light text-[#2C5AA0]">
                    BnC Global
                  </h2>
                  <div className="h-0.5 w-28 bg-black mt-2"></div>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full bg-white/80 border border-white/60 shadow-sm hover:shadow-md text-gray-500 hover:text-gray-700 transition-all duration-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Navigation */}
            <div className="flex-1">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.to}
                      to={item.to} 
                      className="group flex items-center space-x-4 py-3.5 px-4 rounded-xl border border-slate-200 bg-white/80 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                      onClick={onClose}
                    >
                      <Icon size={20} className="transition-colors duration-300" />
                      <span className="font-geist font-medium transition-colors duration-300">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
                
                {/* Dashboard or Apply Now */}
                <>
                  <Link 
                    to={isLoggedIn ? "/dashboard" : "/login"}
                    className="flex items-center space-x-4 py-3.5 px-4 rounded-xl border border-slate-200 bg-white/80 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                    onClick={onClose}
                  >
                    <FaTachometerAlt size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">Dashboard</span>
                  </Link>
                  <Link
                    to={isLoggedIn ? "/dashboard?open=ai-profile" : "/login"}
                    className="flex items-center space-x-4 py-3.5 px-4 rounded-xl border border-slate-200 bg-white/80 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                    onClick={onClose}
                  >
                    <FaRobot size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">AI Profiling</span>
                  </Link>
                  <Link
                    to="/bnc-services?from=sidebar"
                    className="flex items-center space-x-4 py-3.5 px-4 rounded-xl border border-slate-200 bg-white/80 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                    onClick={onClose}
                  >
                    <FaServicestack size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">BnC Services</span>
                  </Link>
                  <Link
                    to={isLoggedIn ? "/dashboard?open=referral" : "/login"}
                    className="flex items-center space-x-4 py-3.5 px-4 rounded-xl border border-slate-200 bg-white/80 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                    onClick={onClose}
                  >
                    <FaDollarSign size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">Earn from Referral</span>
                  </Link>
                </>
                {!isLoggedIn && (
                  <button 
                    onClick={handleApplyNowClick} 
                    className="group flex items-center space-x-4 py-3.5 px-4 rounded-xl border border-slate-200 transition-all duration-200 text-slate-700 bg-white/80 w-full text-left hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                  >
                    <FaPaperPlane size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">Apply Now</span>
                  </button>
                )}
              </nav>
            </div>
            
            {/* Bottom border line */}
            <div className="border-t border-white/60 pt-4">
              <div className="space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-3 py-3 px-4 border border-[#2C5AA0] rounded-xl bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] shadow-md">
                      <FaUser size={20} className="text-white" />
                      <div>
                        <div className="font-geist font-semibold text-white">{user?.firstName} {user?.lastName}</div>
                        <div className="font-geist text-sm text-blue-100 truncate">{user?.email}</div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        onClose();
                        onLogout();
                      }}
                      className="flex items-center space-x-3 py-3 px-4 rounded-xl border border-red-200 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-500 text-red-700 bg-red-100 w-full text-left"
                    >
                      <FaUser size={20} className="transition-colors duration-300" />
                      <span className="font-geist font-medium transition-colors duration-300">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/90 shadow-[0_10px_20px_rgba(44,90,160,0.25)] border border-black/30 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_rgba(44,90,160,0.35)]">
                        <img
                          src="/favicon/download.png"
                          alt="BnC Global"
                          className="h-10 w-10 object-contain drop-shadow-[0_6px_10px_rgba(44,90,160,0.35)]"
                        />
                      </div>
                    </div>
                    <Link 
                      to="/login" 
                      onClick={onClose} 
                      className="flex items-center space-x-3 py-3 px-4 rounded-xl border border-[#2C5AA0] bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a] text-white shadow-md"
                    >
                      <FaUser size={20} className="transition-colors duration-300" />
                      <span className="font-geist font-medium transition-colors duration-300">Partner Login</span>
                    </Link>
                    
                    <Link 
                      to="/login?type=admin" 
                      onClick={onClose} 
                      className="flex items-center space-x-3 py-3 px-4 rounded-xl border border-gray-200 transition-all duration-300 hover:text-white hover:border-blue-500 text-gray-700 bg-white/70 hover:bg-gradient-to-r hover:from-[#2C5AA0] hover:to-[#1e3a8a]"
                    >
                      <FaShieldAlt size={20} className="transition-colors duration-300" />
                      <span className="font-geist font-medium transition-colors duration-300">Admin Login</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PartnerFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Sidebar;
