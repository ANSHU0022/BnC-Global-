import React from 'react';
import WhyChooseUs from '../Component/WhyChooseUs';
import FinancialEcosystem from '../Component/FinancialEcosystem';
import CTA from '../Component/CTA';

const WhyChooseUsPage = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Choose BnC Global?</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover what makes us the preferred choice for business partnerships
          </p>
        </div>
      </section>
      <WhyChooseUs />
      <FinancialEcosystem />
      <CTA />
    </div>
  );
};

export default WhyChooseUsPage;