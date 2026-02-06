import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

const countryCards = [
  {
    key: 'india',
    title: 'India',
    description: 'All services available for India based engagements.',
    route: '/services/india'
  },
  {
    key: 'saudi-arabia',
    title: 'Saudi Arabia',
    description: 'Services aligned with Saudi regulatory requirements.',
    route: '/services/saudi-arabia'
  },
  {
    key: 'other',
    title: 'Other Regions',
    description: 'Services for regions outside India and Saudi Arabia.',
    route: '/services/other'
  }
];

const BncServices = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#f5f7fb] via-[#f9fbff] to-[#eef2f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative rounded-3xl shadow-xl mb-10 border border-white/60">
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C5AA0] via-[#1f4f93] to-[#12346b]" />
              <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -left-16 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            </div>
            <div className="relative z-10 p-8 md:p-10 text-white">
              <h1 className="font-poppins text-3xl md:text-4xl font-bold">
                BnC Services
              </h1>
              <p className="font-geist text-blue-100 text-lg mt-3 max-w-2xl">
                Choose a country to explore the services available in that region.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {countryCards.map((card) => (
              <button
                key={card.key}
                type="button"
                onClick={() => navigate(card.route)}
                className="text-left bg-white rounded-2xl border border-gray-100 shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h2 className="font-poppins text-2xl font-semibold text-gray-900">
                  {card.title}
                </h2>
                <p className="font-geist text-gray-600 mt-3">
                  {card.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold font-geist text-[#1e3a8a]">
                  View services
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BncServices;
