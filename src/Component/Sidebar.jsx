import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHandshake, FaCalendarAlt, FaStar, FaPaperPlane, FaUser, FaShieldAlt, FaTimes, FaTachometerAlt } from 'react-icons/fa';
import PartnerFormModal from './PartnerFormModal';

const Sidebar = ({ isOpen, onClose, isLoggedIn, user, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyNowClick = () => {
    onClose();
    setIsModalOpen(true);
  };

  const navigationItems = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/partnerships', icon: FaHandshake, label: 'Partnerships' },
    { to: '/events', icon: FaCalendarAlt, label: 'Events' },
    { to: '/why-choose-us', icon: FaStar, label: 'Why Choose Us' },
  ];

  return (
    <>
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div 
          className={`absolute inset-0  transition-all duration-300 ${isOpen ? 'bg-opacity-20 backdrop-blur-[2px]' : 'bg-opacity-0'}`} 
          onClick={onClose}
        ></div>
        
        <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-2xl rounded-r-3xl transform transition-all duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://static.wixstatic.com/media/0446e3_50ff54e1251b45ef8a1066bca3a75b0e~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b%20nc%20global.png" 
                  alt="BnC Global" 
                  className="h-15 w-15 object-contain"
                />
                <h2 className="font-poppins text-2xl font-bold text-[#2C5AA0]">
                  BnC Global
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            {/* Line separator */}
            <div className="border-t border-gray-200 mb-8"></div>
            
            {/* Navigation */}
            <div className="flex-1">
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.to}
                      to={item.to} 
                      className="group flex items-center space-x-4 py-4 px-4 rounded-lg border border-gray-200 transition-all duration-300 hover:text-white hover:border-blue-500 text-gray-700 bg-gray-100" 
                      style={{'&:hover': {backgroundColor: '#2C5AA0'}}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2C5AA0'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
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
                {isLoggedIn ? (
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-4 py-4 px-4 rounded-lg border border-blue-200 transition-all duration-300 hover:bg-blue-400 hover:text-white hover:border-blue-400 text-blue-700 bg-blue-100"
                    onClick={onClose}
                  >
                    <FaTachometerAlt size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">Dashboard</span>
                  </Link>
                ) : (
                  <button 
                    onClick={handleApplyNowClick} 
                    className="group flex items-center space-x-4 py-4 px-4 rounded-lg border border-gray-200 transition-all duration-300 hover:text-white hover:border-blue-500 text-gray-700 bg-gray-100 w-full text-left"
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2C5AA0'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  >
                    <FaPaperPlane size={20} className="transition-colors duration-300" />
                    <span className="font-geist font-medium transition-colors duration-300">Apply Now</span>
                  </button>
                )}
              </nav>
            </div>
            
            {/* Bottom border line */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-3 py-3 px-4 border border-[#2C5AA0] rounded-lg bg-[#2C5AA0]">
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
                      className="flex items-center space-x-3 py-3 px-4 rounded-lg border border-red-200 transition-all duration-300 hover:bg-red-500 hover:text-white hover:border-red-500 text-red-700 bg-red-100 w-full text-left"
                    >
                      <FaUser size={20} className="transition-colors duration-300" />
                      <span className="font-geist font-medium transition-colors duration-300">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={onClose} 
                      className="flex items-center space-x-3 py-3 px-4 rounded-lg border border-[#2C5AA0] bg-[#2C5AA0] text-white"
                    >
                      <FaUser size={20} className="transition-colors duration-300" />
                      <span className="font-geist font-medium transition-colors duration-300">Partner Login</span>
                    </Link>
                    
                    <Link 
                      to="/login?type=admin" 
                      onClick={onClose} 
                      className="flex items-center space-x-3 py-3 px-4 rounded-lg border border-gray-200 transition-all duration-300 hover:text-white hover:border-blue-500 text-gray-700 bg-gray-100"
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2C5AA0'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
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