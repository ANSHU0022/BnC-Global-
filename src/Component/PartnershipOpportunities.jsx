import React from 'react';
import { FaHandshake, FaUsers, FaCogs } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PartnershipOpportunities = () => {
  const { t } = useTranslation();
  const opportunities = [
    { key: 'strategic', icon: <FaHandshake className="text-5xl mb-6" style={{color: '#2C5AA0'}} /> },
    { key: 'channel', icon: <FaUsers className="text-5xl mb-6" style={{color: '#2C5AA0'}} /> },
    { key: 'technology', icon: <FaCogs className="text-5xl mb-6" style={{color: '#2C5AA0'}} /> }
  ];

  return (
    <section className="bg-gray-50 -mt-20 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 pt-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t('partnershipOpportunities.title')}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 rounded-full" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {opportunities.map((opportunity) => (
            <div key={opportunity.key} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="flex justify-center mb-6">
                {opportunity.icon}
              </div>
              <h3 className="font-poppins text-2xl font-bold text-gray-800 mb-4">
                {t(`partnershipOpportunities.cards.${opportunity.key}.title`)}
              </h3>
              <p className="font-geist text-gray-600 mb-8 leading-relaxed">
                {t(`partnershipOpportunities.cards.${opportunity.key}.description`)}
              </p>
              <ul className="text-left space-y-3 mb-8">
                {t(`partnershipOpportunities.cards.${opportunity.key}.features`, { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-center font-geist text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="font-poppins text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
                style={{backgroundColor: '#2C5AA0'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1e3f73'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2C5AA0'}
              >
                {t('partnershipOpportunities.learnMore')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipOpportunities;
