import React, { useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiHelpCircle, FiMail, FiPhone, FiUsers } from 'react-icons/fi';
import Header from '../../../Component/Header';
import Footer from '../../../Component/Footer';

const countries = [
  { name: 'Australia', logo: 'https://cdn-icons-png.flaticon.com/128/9906/9906443.png' },
  { name: 'United Kingdom', logo: 'https://cdn-icons-png.flaticon.com/128/3909/3909136.png' },
  { name: 'Canada', logo: 'https://cdn-icons-png.flaticon.com/128/197/197430.png' },
  { name: 'United States', logo: 'https://cdn-icons-png.flaticon.com/128/197/197484.png' },
  { name: 'South Africa', logo: 'https://cdn-icons-png.flaticon.com/128/16022/16022663.png' },
  { name: 'Germany', logo: 'https://cdn-icons-png.flaticon.com/128/197/197571.png' },
  { name: 'France', logo: 'https://cdn-icons-png.flaticon.com/128/197/197560.png' },
  { name: 'Singapore', logo: 'https://cdn-icons-png.flaticon.com/128/197/197496.png' },
  { name: 'Philippines', logo: 'https://cdn-icons-png.flaticon.com/128/16022/16022850.png' },
  { name: 'Egypt', logo: 'https://cdn-icons-png.flaticon.com/128/16022/16022071.png' }
];

const GlobalServices = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [activeSection, setActiveSection] = useState('manpower');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('partnerUser');
    if (!stored) return;
    try {
      const user = JSON.parse(stored);
      const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
      setFormValues((prev) => ({
        ...prev,
        name: fullName || prev.name,
        email: user?.email || prev.email,
        phone: user?.phone || prev.phone
      }));
    } catch (error) {
      console.error('Failed to read partner user data', error);
    }
  }, []);

  const sections = useMemo(() => ([
    {
      key: 'manpower',
      label: 'Manpower support',
      heading: 'Manpower support',
      description: 'Tell us your manpower requirements and we will align the right team.'
    },
    {
      key: 'enquiry',
      label: 'Consumer support',
      heading: 'Consumer support',
      description: 'Share your enquiry and our team will respond with the right guidance.'
    },
    {
      key: 'training',
      label: 'Training support',
      heading: 'Training support',
      description: 'We help your teams learn, practice, and deliver with confidence.'
    },
    {
      key: 'contact',
      label: 'Contact us',
      heading: 'Immediate Response Contact',
      description: 'Reach us quickly via email, WhatsApp, or call.'
    }
  ]), []);

  const activeSectionData = sections.find((section) => section.key === activeSection) || sections[0];

  const formTitleMap = {
    manpower: 'Manpower Support Request Info',
    enquiry: 'Consumer Support Enquiry',
    training: 'Training Request Info'
  };
  const formCtaMap = {
    manpower: 'Submit Manpower Request',
    enquiry: 'Submit Enquiry',
    training: 'Submit Training Request'
  };
  const messagePlaceholderMap = {
    manpower: 'Tell us your manpower requirement (roles, count, duration, location).',
    enquiry: 'Share your enquiry about global services.',
    training: 'Tell us the training topic, team size, and preferred timeline.'
  };
  const formTitle = formTitleMap[activeSection] || 'Request More Info';
  const formCta = formCtaMap[activeSection] || 'Submit Request';
  const messagePlaceholder = messagePlaceholderMap[activeSection] || 'Tell us about your requirement';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-[#f5f7fb] via-[#f9fbff] to-[#eef2f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
            <p className="font-geist text-xs uppercase tracking-[0.2em] text-slate-400">
              Global Services
            </p>
            <h1 className="font-poppins text-2xl sm:text-3xl font-semibold text-slate-900 mt-2">
              We provide services globally
            </h1>
            <p className="font-geist text-sm text-slate-600 mt-2">
              Choose your country to view the right support and submit your requirements.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {countries.map((country) => (
                <button
                  key={country.name}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setSubmitted(false);
                  }}
                  className={`group rounded-2xl border px-4 py-3 text-left transition will-change-transform ${
                    selectedCountry.name === country.name
                      ? 'border-[#2C5AA0] bg-gradient-to-br from-[#2C5AA0]/15 via-white to-[#2C5AA0]/5 text-[#1e3a8a] shadow-[0_16px_30px_rgba(15,23,42,0.2)] scale-[1.03]'
                      : 'border-slate-200 bg-white text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(15,23,42,0.16)] hover:scale-[1.02]'
                  }`}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex items-center justify-center">
                      <img
                        src={country.logo}
                        alt={`${country.name} flag`}
                        className={`h-12 w-12 object-contain transition-transform duration-300 ${
                          selectedCountry.name === country.name ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                        loading="lazy"
                      />
                    </span>
                    <div>
                      <p className="font-geist text-sm font-semibold">{country.name}</p>
                      <p className="font-geist text-xs text-slate-500 mt-1">Regional support</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-[32%] border border-slate-200 rounded-2xl bg-white shadow-sm lg:sticky lg:top-40 lg:self-start">
              <div className="p-6 border-b border-slate-200">
                <p className="font-geist text-xs uppercase tracking-[0.2em] text-slate-400">
                  {selectedCountry.name}
                </p>
                <h2 className="font-poppins text-2xl font-semibold text-gray-900 mt-2">
                  Global Services
                </h2>
                <p className="font-geist text-sm text-gray-600 mt-3">
                  Tailored delivery, compliance-ready support, and regional execution.
                </p>
              </div>
              <div className="px-4 py-4 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveSection(section.key)}
                    className={`group relative w-full text-left px-4 py-3 rounded-xl border transition ${
                      activeSection === section.key
                        ? 'bg-[#2C5AA0]/10 border-[#2C5AA0]/30 text-[#1e3a8a]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="relative inline-block text-sm font-semibold font-geist">
                      {section.label}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#2C5AA0] transition-all duration-500 group-hover:w-full"></span>
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <section className="lg:w-[68%]">
              <div className="space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-poppins text-2xl font-semibold text-gray-900">
                      {activeSectionData.heading}
                    </h3>
                    <p className="font-geist text-gray-600 mt-2 pl-8">
                      {activeSectionData.description}
                    </p>
                  </div>
                </div>

                {activeSection === 'manpower' && (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiUsers className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-poppins text-xl font-semibold">
                          Manpower support
                        </h4>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    <p className="font-geist text-gray-600 mt-3 pl-8">
                      We provide trained professionals aligned to your regional requirements,
                      ready to integrate with your team and deliver measurable outcomes.
                    </p>
                  </div>
                )}

                {activeSection === 'training' && (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                      <div>
                        <div className="inline-flex items-start gap-2 text-gray-900">
                          <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                            <FiBookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <div>
                            <h4 className="font-poppins text-xl font-semibold">
                              Training that builds real capability
                            </h4>
                            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                          </div>
                        </div>
                        <p className="font-geist text-gray-600 mt-3 pl-8">
                          We can help you train teams so they are ready to deliver with confidence,
                          safety, and measurable outcomes.
                        </p>
                        <div className="mt-5 pl-8">
                          <p className="font-geist text-sm text-slate-500 uppercase tracking-[0.2em]">
                            What we cover
                          </p>
                          <ul className="mt-3 space-y-2 text-gray-700 list-disc list-outside pl-5 font-geist">
                            <li>Role-based onboarding and process walkthroughs</li>
                            <li>Hands-on practice with real project scenarios</li>
                            <li>Quality, safety, and compliance standards</li>
                            <li>Assessment and continuous improvement plans</li>
                          </ul>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="font-geist text-sm text-slate-500 uppercase tracking-[0.2em]">
                          Program Highlights
                        </p>
                        <div className="mt-4 space-y-4">
                          <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="font-poppins text-sm font-semibold text-gray-900">
                              Tailored Training Tracks
                            </p>
                            <p className="font-geist text-sm text-gray-600 mt-2">
                              Modules aligned to scope, team maturity, and timelines.
                            </p>
                          </div>
                          <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="font-poppins text-sm font-semibold text-gray-900">
                              On-site or Remote Delivery
                            </p>
                            <p className="font-geist text-sm text-gray-600 mt-2">
                              Flexible formats to match your operational schedule and locations.
                            </p>
                          </div>
                          <div className="rounded-xl border border-slate-200 bg-white p-4">
                            <p className="font-poppins text-sm font-semibold text-gray-900">
                              Certified Completion
                            </p>
                            <p className="font-geist text-sm text-gray-600 mt-2">
                              Completion reports and readiness confirmation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'enquiry' && (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiHelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-poppins text-xl font-semibold">
                          Enquiry Details
                        </h4>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    <p className="font-geist text-gray-600 mt-3 pl-8">
                      Share your enquiry and we will respond with the right scope, timeline,
                      and next steps.
                    </p>
                  </div>
                )}

                {activeSection === 'contact' && (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h4 className="font-poppins text-xl font-semibold text-gray-900">
                          Immediate Response Contact
                        </h4>
                        <p className="font-geist text-gray-600 text-sm mt-2">
                          Reach us quickly via email, WhatsApp, or call.
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <a
                          href="mailto:info@bncglobal.in"
                          className="group border border-slate-200 rounded-2xl bg-white p-5 transition hover:border-slate-300 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-geist">
                                Email
                              </p>
                              <p className="font-geist text-sm text-slate-700 mt-2">
                                info@bncglobal.in
                              </p>
                            </div>
                            <div className="ml-4 h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center group-hover:border-[#2C5AA0]/40 group-hover:bg-[#2C5AA0]/10 transition">
                              <FiMail className="h-5 w-5 text-[#2C5AA0]" aria-hidden="true" />
                            </div>
                          </div>
                        </a>
                        <a
                          href="https://wa.me/919958711796"
                          target="_blank"
                          rel="noreferrer"
                          className="group border border-emerald-200 rounded-2xl bg-white p-5 transition hover:border-emerald-300 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-emerald-500 font-geist">
                                WhatsApp
                              </p>
                              <p className="font-geist text-sm text-emerald-700 mt-2">
                                +91 99587 11796
                              </p>
                            </div>
                            <div className="ml-4 h-10 w-10 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-center group-hover:border-emerald-300 group-hover:bg-emerald-100 transition">
                              <FiUsers className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                            </div>
                          </div>
                        </a>
                        <a
                          href="tel:+919810575613"
                          className="group border border-slate-200 rounded-2xl bg-white p-5 transition hover:border-slate-300 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-geist">
                                Call
                              </p>
                              <p className="font-geist text-sm text-slate-700 mt-2">
                                +91 98105 75613
                              </p>
                            </div>
                            <div className="ml-4 h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center group-hover:border-[#2C5AA0]/40 group-hover:bg-[#2C5AA0]/10 transition">
                              <FiPhone className="h-5 w-5 text-[#2C5AA0]" aria-hidden="true" />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection !== 'contact' && (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiMail className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-poppins text-xl font-semibold">
                          {formTitle}
                        </h4>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    <p className="font-geist text-gray-600 text-sm mt-3 mb-4 pl-8">
                      Share your requirements and we will get back to you.
                    </p>
                    {submitted ? (
                      <div className="bg-green-50 border border-green-100 text-green-800 rounded-xl p-4 font-geist text-sm">
                        Thank you! Your request has been noted for {selectedCountry.name}.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3 pl-8">
                        <input type="hidden" name="country" value={selectedCountry.name} />
                        <input type="hidden" name="topic" value={activeSectionData.label} />
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                          required
                          readOnly
                        />
                        <input
                          type="email"
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          placeholder="Email address"
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                          required
                          readOnly
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formValues.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                          readOnly
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
                          placeholder={messagePlaceholder}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-[#2C5AA0]/20"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#2C5AA0] text-white py-2.5 rounded-xl font-semibold shadow hover:bg-[#1e3a8a] transition"
                        >
                          {isSubmitting ? 'Submitting...' : formCta}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GlobalServices;
