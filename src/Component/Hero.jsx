import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PartnerFormModal from './PartnerFormModal';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/partner-form') {
      setIsModalOpen(true);
    }
  }, [location]);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden mb-0" style={{marginTop: '-120px', paddingTop: '140px'}}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pt-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        ></div>
        
        
        
        <div className="relative container mx-auto px-4 text-center z-10" style={{paddingBottom: '0px'}}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2  bg-opacity-30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-600">
            🤝 Join Our Growing Network
          </div>
          
          {/* Main Heading */}
          <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-1 leading-tight">
            Partner with <span style={{color: '#2C5AA0'}} className="wave-text">
              {'BnC Global'.split('').map((letter, index) => (
                <span 
                  key={index} 
                  className="wave-letter" 
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    display: letter === ' ' ? 'inline' : 'inline-block'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-geist text-lg md:text-xl mb-8 max-w-4xl mx-auto text-gray-300">
            Join India's leading accounting outsourcing network and unlock limitless revenue opportunities
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-10 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              🤝 Become a Partner →
            </button>
            <Link 
              to="/login"
              className="bg-white hover:bg-gray-100 text-gray-800 px-10 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              Partner Login
            </Link>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-4 mb-0">
            <div className="bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-opacity-60 hover:scale-105 hover:shadow-2xl hover:border-[#2C5AA0] transition-all duration-300 transform">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h4v2H0v-2h4z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">200+</div>
              <div className="text-sm text-gray-400">Partner Firms</div>
            </div>
            
            <div className="bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-opacity-60 hover:scale-105 hover:shadow-2xl hover:border-[#2C5AA0] transition-all duration-300 transform">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">25+</div>
              <div className="text-sm text-gray-400">Cities Covered</div>
            </div>
            
            <div className="bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-opacity-60 hover:scale-105 hover:shadow-2xl hover:border-[#2C5AA0] transition-all duration-300 transform">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">5,000+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            
            <div className="bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-opacity-60 hover:scale-105 hover:shadow-2xl hover:border-[#2C5AA0] transition-all duration-300 transform">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">95%</div>
              <div className="text-sm text-gray-400">Partner Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
      
      <PartnerFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;