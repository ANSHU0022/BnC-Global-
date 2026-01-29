import React from 'react';

const FinancialEcosystem = () => {
  return (
    <section className="bg-white mt-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            Complete Financial <span style={{color: '#2C5AA0'}}>Ecosystem</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 rounded-full" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
        </div>
        
        <div className="flex justify-center">
          <img 
            src="https://static.wixstatic.com/media/0446e3_ac1145593e02499683365880e7cc4659~mv2.png/v1/crop/x_51,y_153,w_1831,h_879/fill/w_1831,h_879,al_c,q_90,enc_avif,quality_auto/Artboard%2017.png"
            alt="Complete Financial Ecosystem"
            className="max-w-4xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default FinancialEcosystem;