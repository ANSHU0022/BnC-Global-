import React from 'react';
import { FaHandshake, FaUsers, FaCogs } from 'react-icons/fa';

const PartnershipOpportunities = () => {
  const opportunities = [
    {
      icon: <FaHandshake className="text-5xl mb-6" style={{color: '#2C5AA0'}} />,
      title: "Strategic Partners",
      description: "Long-term strategic alliances for mutual growth and market expansion",
      features: [
        "Joint venture opportunities",
        "Technology integration",
        "Market co-development"
      ]
    },
    {
      icon: <FaUsers className="text-5xl mb-6" style={{color: '#2C5AA0'}} />,
      title: "Channel Partners",
      description: "Expand your reach through our established distribution network",
      features: [
        "Reseller programs",
        "Distributor network",
        "Sales support"
      ]
    },
    {
      icon: <FaCogs className="text-5xl mb-6" style={{color: '#2C5AA0'}} />,
      title: "Technology Partners",
      description: "Integrate and innovate with cutting-edge technology solutions",
      features: [
        "API integrations",
        "Platform partnerships",
        "Innovation labs"
      ]
    }
  ];

  return (
    <section className="bg-gray-50 mt-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            Partnership <span style={{color: '#2C5AA0'}}>Opportunities</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 rounded-full" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="flex justify-center mb-6">
                {opportunity.icon}
              </div>
              <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-4">{opportunity.title}</h3>
              <p className="font-geist text-gray-600 mb-8 leading-relaxed">{opportunity.description}</p>
              <ul className="text-left space-y-3 mb-8">
                {opportunity.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center font-geist text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="font-poppins text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg" style={{backgroundColor: '#2C5AA0'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3f73'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2C5AA0'}>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipOpportunities;