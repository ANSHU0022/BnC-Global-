import React from 'react';
import PartnershipOpportunities from '../Component/PartnershipOpportunities';
import FinancialEcosystem from '../Component/FinancialEcosystem';
import WhyChooseUs from '../Component/WhyChooseUs';
import CTA from '../Component/CTA';

const Partnerships = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Partnership Opportunities</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover various ways to partner with BnC Global and grow your business
          </p>
        </div>
      </section>
      <PartnershipOpportunities />
      <FinancialEcosystem />
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default Partnerships;