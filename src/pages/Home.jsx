import React from 'react';
import Hero from '../Component/Hero';
import PartnershipOpportunities from '../Component/PartnershipOpportunities';
import FinancialEcosystem from '../Component/FinancialEcosystem';
import Events from '../Component/Events';
import WhyChooseUs from '../Component/WhyChooseUs';
import CTA from '../Component/CTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <PartnershipOpportunities />
      <FinancialEcosystem />
      <Events />
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default Home;