import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { getServiceById } from '../../data/services';

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { country, serviceId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const service = useMemo(() => {
    const found = getServiceById(serviceId);
    if (!found || !found.country.includes(country)) {
      return null;
    }
    return found;
  }, [country, serviceId]);

  const countryLabelMap = {
    india: 'India',
    'saudi-arabia': 'Saudi Arabia',
    other: 'Other Regions'
  };
  const countryLabel = countryLabelMap[country] || country.replace('-', ' ');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (!service) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg">
            <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-3">
              Service not found
            </h2>
            <p className="font-geist text-gray-600 mb-6">
              We could not locate this service in the selected country.
            </p>
            <button
              onClick={() => navigate('/bnc-services')}
              className="bg-[#2C5AA0] text-white px-5 py-2.5 rounded-xl font-semibold"
            >
              Back to BnC Services
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#f5f7fb] via-[#f9fbff] to-[#eef2f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-10">
            <div className="p-8 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-geist text-sm uppercase tracking-[0.2em] text-slate-400">
                    {countryLabel}
                  </p>
                  <h1 className="font-poppins text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                    {service.title}
                  </h1>
                  <p className="font-geist text-gray-600 text-lg mt-3 max-w-2xl">
                    {service.summary}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/services/${country}`)}
                  className="bg-[#2C5AA0] text-white px-5 py-2.5 rounded-xl font-semibold shadow"
                >
                  Back to Services
                </button>
              </div>
            </div>
            <div className="bg-slate-50 px-8 pb-8">
              {service.videoUrl ? (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                  <iframe
                    className="w-full h-full"
                    src={service.videoUrl}
                    title={`${service.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-500 font-geist">
                  Video overview coming soon
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h2 className="font-poppins text-2xl font-semibold text-gray-900 mb-4">
                Service Details
              </h2>
              {service.bullets.length > 0 ? (
                <ul className="space-y-2 text-gray-700 list-disc list-inside font-geist">
                  {service.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="font-geist text-gray-600">
                  Services will be available soon.
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h2 className="font-poppins text-2xl font-semibold text-gray-900 mb-4">
                Request More Info
              </h2>
              <p className="font-geist text-gray-600 text-sm mb-4">
                Share your requirements and we will get back to you.
              </p>
              {submitted ? (
                <div className="bg-green-50 border border-green-100 text-green-800 rounded-xl p-4 font-geist text-sm">
                  Thank you! Your request has been noted for {service.title} in {countryLabel}.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="hidden" name="country" value={country} />
                  <input type="hidden" name="service" value={service.title} />
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                  />
                  <input
                    type="text"
                    name="company"
                    value={formValues.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                  />
                  <textarea
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your requirement"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#2C5AA0] text-white py-2.5 rounded-xl font-semibold shadow hover:bg-[#1e3a8a] transition"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetail;
