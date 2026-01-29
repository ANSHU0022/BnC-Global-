import React, { useState } from 'react';
import PartnerFormModal from './PartnerFormModal';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden mb-0" style={{marginTop: '-120px', paddingTop: '170px'}}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pt-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        ></div>
        
        
        
        <div className="relative container mx-auto px-4 text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2  bg-opacity-30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-8 border border-gray-600">
            🤝 Join Our Growing Network
          </div>
          
          {/* Main Heading */}
          <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Partner with <span style={{color: '#2C5AA0'}}>BnC Global</span>
          </h1>
          
          {/* Subtitle */}
          <p className="font-geist text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-300">
            Join India's leading accounting outsourcing network and unlock limitless revenue opportunities
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 text-base flex items-center justify-center gap-2"
            >
              Become a Partner →
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-full font-medium transition-all duration-300 text-base flex items-center justify-center gap-2">
              🔐 Partner Login
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-8">
            <div className=" bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 text-center hover:bg-opacity-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">200+</div>
              <div className="text-sm text-gray-400">Partner Firms</div>
            </div>
            
            <div className=" bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 text-center hover:bg-opacity-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">25+</div>
              <div className="text-sm text-gray-400">Cities Covered</div>
            </div>
            
            <div className="bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 text-center hover:bg-opacity-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="text-3xl font-bold mb-1 text-white">5,000+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            
            <div className=" bg-opacity-40 backdrop-blur-sm border border-gray-600 rounded-2xl p-6 text-center hover:bg-opacity-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#2C5AA0'}}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
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