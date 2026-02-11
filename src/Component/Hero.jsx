import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PartnerFormModal from './PartnerFormModal';

const Hero = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/partner-form') {
      setIsModalOpen(true);
    }
  }, [location]);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden mb-0" style={{marginTop: '-80px', paddingTop: '140px'}}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pt-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundPosition: 'center calc(50% + 40px)'
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 text-center z-10 -mt-50" style={{paddingBottom: '0px'}}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-opacity-30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-600">
            {t('hero.badge')}
          </div>
          
          {/* Main Heading */}
          <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-1 leading-tight">
            {t('hero.titlePrefix')} <span style={{color: '#2C5AA0'}} className="wave-text">
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
            {t('hero.subtitle')}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-10 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              {t('hero.becomePartner')}
            </button>
            <Link 
              to="/login"
              className="bg-white hover:bg-gray-100 text-gray-800 px-10 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              {t('hero.partnerLogin')}
            </Link>
          </div>
          
        </div>
      </section>
      
      <PartnerFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
