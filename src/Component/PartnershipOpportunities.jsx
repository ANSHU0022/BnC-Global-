import React from 'react';
import { FaHandshake, FaUsers, FaCogs, FaUserTie, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const PartnershipOpportunities = () => {
  const { t } = useTranslation();
  const opportunities = [
    { key: 'strategic', icon: FaHandshake },
    { key: 'channel', icon: FaUsers },
    { key: 'technology', icon: FaCogs },
    { key: 'service', icon: FaUserTie }
  ];

  return (
    <section className="bg-gray-50 -mt-20 pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 pt-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            {t('partnershipOpportunities.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.key}
              className="group relative bg-white p-9 rounded-3xl border border-slate-100 shadow-lg shadow-[#2C5AA0]/5 hover:shadow-2xl hover:shadow-[#2C5AA0]/15 hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="absolute inset-x-0 -top-px h-1 rounded-t-3xl bg-gradient-to-r from-[#2C5AA0] via-[#3b6cc4] to-[#1e3f73]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-[#2C5AA0]/10 text-[#2C5AA0] flex items-center justify-center transition group-hover:scale-105">
                  <opportunity.icon className="text-3xl" />
                </div>
                <h3 className="font-poppins text-xl font-semibold text-gray-900">
                  {t(`partnershipOpportunities.cards.${opportunity.key}.title`)}
                </h3>
              </div>
              <p className="font-geist text-gray-600 mb-6 leading-relaxed">
                {t(`partnershipOpportunities.cards.${opportunity.key}.description`)}
              </p>
              <ul className="space-y-3 mb-8">
                {t(`partnershipOpportunities.cards.${opportunity.key}.features`, { returnObjects: true }).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-geist text-gray-700">
                    <span className="mt-1 text-[#2C5AA0]">
                      <FaCheckCircle className="h-5 w-5" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-auto inline-flex items-center gap-2 font-poppins text-white px-6 py-2.5 rounded-full font-semibold bg-gradient-to-r from-[#2C5AA0] to-[#1e3f73] transition-all duration-300 hover:shadow-lg hover:shadow-[#2C5AA0]/25">
                {t('partnershipOpportunities.learnMore')}
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white text-sm transition-transform duration-300 group-hover:translate-x-0.5">
                  <FaArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipOpportunities;
