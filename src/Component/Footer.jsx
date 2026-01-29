import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="https://static.wixstatic.com/media/0446e3_fedc15f797314360941d294da192fd9e~mv2.png/v1/crop/x_0,y_112,w_500,h_276/fill/w_490,h_270,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/B.png" 
            alt="BnC Global Services" 
            className="mx-auto h-32"
          />
        </div>
        
        {/* Copyright */}
        <div className="text-gray-600">
          <p className="font-geist">Copyrights © 2026 Bnc Global Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;