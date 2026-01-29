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

  return (
    <>
      <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        {/* Blur overlay for right side */}
        <div className="absolute inset-0 bg- bg-opacity-10 backdrop-blur-[1px]" onClick={onClose}></div>
        <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl rounded-r-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-poppins text-2xl font-bold text-[#2C5AA0]">
                BnC Global
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="mb-8">
              <h3 className="font-poppins text-lg font-semibold text-[#2C5AA0] mb-4 border-b-2 border-[#2C5AA0] pb-2 text-center">
                NAVIGATION
              </h3>
              <nav className="space-y-2">
                <Link to="/" className="flex items-center space-x-3 text-white bg-[#2C5AA0] hover:bg-[#1e3f73] py-3 px-4 rounded-lg transition-colors" onClick={onClose}>
                  <FaHome size={20} />
                  <span className="font-geist">Home</span>
                </Link>
                <Link to="/partnerships" className="flex items-center space-x-3 text-gray-700 hover:text-[#2C5AA0] py-3 px-4 rounded-lg transition-colors" onClick={onClose}>
                  <FaHandshake size={20} />
                  <span className="font-geist">Partnerships</span>
                </Link>
                <Link to="/events" className="flex items-center space-x-3 text-gray-700 hover:text-[#2C5AA0] py-3 px-4 rounded-lg transition-colors" onClick={onClose}>
                  <FaCalendarAlt size={20} />
                  <span className="font-geist">Events</span>
                </Link>
                <Link to="/why-choose-us" className="flex items-center space-x-3 text-gray-700 hover:text-[#2C5AA0] py-3 px-4 rounded-lg transition-colors" onClick={onClose}>
                  <FaStar size={20} />
                  <span className="font-geist">Why Choose Us</span>
                </Link>
                {isLoggedIn ? (
                  <Link to="/dashboard" className="flex items-center space-x-3 text-white bg-green-600 hover:bg-green-700 py-3 px-4 rounded-lg transition-colors" onClick={onClose}>
                    <FaTachometerAlt size={20} />
                    <span className="font-geist">Dashboard</span>
                  </Link>
                ) : (
                  <button onClick={handleApplyNowClick} className="flex items-center space-x-3 text-gray-700 hover:text-[#2C5AA0] py-3 px-4 rounded-lg transition-colors w-full text-left">
                    <FaPaperPlane size={20} />
                    <span className="font-geist">Apply Now</span>
                  </button>
                )}
              </nav>
            </div>
            
            <div>
              <h3 className="font-poppins text-lg font-semibold text-[#2C5AA0] mb-4 border-b-2 border-[#2C5AA0] pb-2 text-center">
                ACCOUNT
              </h3>
              <div className="space-y-3">
                {isLoggedIn ? (
                  <>
                    <div className="bg-[#2C5AA0] text-white px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaUser size={20} />
                        <div>
                          <div className="font-geist font-semibold">{user?.firstName} {user?.lastName}</div>
                          <div className="text-sm opacity-90">{user?.email}</div>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        onClose();
                        onLogout();
                      }}
                      className="flex items-center justify-between w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FaUser size={20} />
                        <span className="font-geist">Logout Partner</span>
                      </div>
                      <span>→</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={onClose} className="flex items-center justify-between w-full bg-[#2C5AA0] text-white px-4 py-3 rounded-lg hover:bg-[#1e3f73] transition-colors">
                      <div className="flex items-center space-x-3">
                        <FaUser size={20} />
                        <span className="font-geist">Partner Login</span>
                      </div>
                      <span>→</span>
                    </Link>
                    <Link to="/login" onClick={onClose} className="flex items-center justify-between w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FaShieldAlt size={20} />
                        <span className="font-geist">Admin Login</span>
                      </div>
                      <span>→</span>
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