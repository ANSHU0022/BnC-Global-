import React from 'react';
import Hero from '../Component/Hero';
import PartnershipOpportunities from '../Component/PartnershipOpportunities';
import WorldMapSection from '../Component/WorldMapSection';
import CTA from '../Component/CTA';
import TestimonialV2 from '../components/ui/testimonial-v2';

const Home = () => {
  return (
    <div>
      <Hero />
      <PartnershipOpportunities />
      <WorldMapSection />
      <TestimonialV2 />
      <CTA />
    </div>
  );
};

export default Home;
