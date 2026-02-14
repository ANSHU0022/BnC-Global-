import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiEye,
  FiFileText,
  FiHelpCircle,
  FiInfo,
  FiList,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiUsers
} from 'react-icons/fi';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import { getServiceById } from '../../data/services';

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { country, serviceId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('know-more');
  const [hoveredHighlight, setHoveredHighlight] = useState(null);
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
  const commonDocuments = [
    {
      label: 'BNC Global',
      url: 'https://drive.google.com/file/d/1U44K-42bhLuTntT2xOdWAIqBW1KzMMpp/view?usp=sharing'
    }
  ];
  const saudiOnlyDocuments = [
    {
      label: 'BNC Global (KSA)',
      url: 'https://drive.google.com/file/d/1XV4OlKqt_7YhIR4B4koFVXYISw7Oa8Er/view?usp=sharing'
    }
  ];

  const sections = [
    {
      key: 'know-more',
      label: 'Know more about services',
      heading: 'Know more about services',
      description: 'Detailed overview of this service, scope, and delivery model.'
    },
    {
      key: 'manpower',
      label: 'Want manpower supply',
      heading: 'Want manpower supply',
      description: 'Tell us your manpower requirements and we will align the right team.'
    },
    {
      key: 'enquiry',
      label: `Enquiry Service ${service?.title || ''}`.trim(),
      heading: `Enquiry Service ${service?.title || ''}`.trim(),
      description: 'Share your enquiry and our team will respond with the right guidance.'
    },
    {
      key: 'training',
      label: 'Training',
      heading: 'Training & Capability Building',
      description: 'We help your teams learn, practice, and deliver with confidence.'
    },
    {
      key: 'contact',
      label: 'Contact Us',
      heading: 'Immediate Response Contact',
      description: 'Reach us quickly via email, WhatsApp, or call.'
    }
  ];

  const activeSectionData = sections.find((section) => section.key === activeSection) || sections[0];
  const sectionIconMap = {
    'know-more': FiInfo,
    manpower: FiUsers,
    enquiry: FiHelpCircle,
    training: FiBookOpen
  };
  const ActiveSectionIcon = sectionIconMap[activeSection] || FiInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setSubmitted(false);
  }, [activeSection, serviceId, country]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const LazyVideo = ({ src, title }) => {
    const containerRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
      if (!containerRef.current) return undefined;
      if (shouldLoad) return undefined;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShouldLoad(true);
            }
          });
        },
        { rootMargin: '150px' }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }, [shouldLoad]);

    return (
      <div ref={containerRef} className="relative w-full h-full">
        {shouldLoad ? (
          <iframe
            className="w-full h-full"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 via-white to-slate-100">
            <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,rgba(226,232,240,0.35),rgba(255,255,255,0.8),rgba(226,232,240,0.35))] bg-[length:200%_100%]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-geist text-slate-500 shadow-sm">
                Preparing preview
              </div>
            </div>
          </div>
        )}
      </div>
    );
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-[32%] border border-slate-200 rounded-2xl bg-white shadow-sm lg:sticky lg:top-40 lg:self-start">
              <div className="p-6 border-b border-slate-200">
                  <p className="font-geist text-xs uppercase tracking-[0.2em] text-slate-400">
                    {countryLabel}
                  </p>
                  <h1 className="font-poppins text-2xl font-semibold text-gray-900 mt-2">
                    {service.title}
                  </h1>
                  <p className="font-geist text-sm text-gray-600 mt-3">
                    {service.summary}
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
                    <div>
                      <h2 className="font-poppins text-2xl font-semibold text-gray-900">
                        {activeSectionData.heading}
                      </h2>
                    </div>
                    <p className="font-geist text-gray-600 mt-2 pl-8">
                      {activeSectionData.description}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/services/${country}`)}
                    className="bg-[#2C5AA0] text-white px-5 py-2.5 rounded-xl font-semibold shadow hover:bg-[#1e3a8a] transition"
                  >
                    Back to Services
                  </button>
                </div>

                {activeSection === 'know-more' ? (
                  <>
                    <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                      {service.videoUrl ? (
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
                          <LazyVideo
                            src={service.videoUrl}
                            title={`${service.title} overview`}
                          />
                        </div>
                      ) : (
                        <div className="aspect-video rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-500 font-geist">
                          Video overview coming soon
                        </div>
                      )}
                      <div className="mt-5 border-t border-slate-200 pt-5">
                        <div className="inline-flex items-start gap-2 text-gray-900">
                          <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                            <FiEye className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="font-poppins text-xl font-semibold">
                              Overview
                            </h3>
                            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                          </div>
                        </div>
                        {service.description && service.description.length > 0 ? (
                          <p className="text-gray-600 font-geist mt-3 pl-8">
                            {service.description.join(' ')}
                          </p>
                        ) : (
                          <p className="font-geist text-gray-600 mt-3 pl-8">
                            Service overview will be available soon.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                      <div className="grid gap-6 md:grid-cols-2 items-start">
                        <div>
                          <div className="inline-flex items-start gap-2 text-gray-900">
                            <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                              <FiList className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <div>
                              <h3 className="font-poppins text-xl font-semibold">
                                Service Details
                              </h3>
                              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                            </div>
                          </div>
                        </div>
                        <div className="md:pl-6">
                          <div className="inline-flex items-start gap-2 text-gray-900">
                            <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                              <FiFileText className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                            <div>
                              <h4 className="font-poppins text-lg font-semibold">
                                Documents
                              </h4>
                              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-6 md:grid-cols-2">
                        <div className="pl-8">
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
                        <div className="border-t border-slate-200 pt-4 md:border-t-0 md:border-l md:border-slate-300 md:pl-6">
                          {(() => {
                            const serviceDocs = service.documents || [];
                            const countryDocs = country === 'saudi-arabia' ? saudiOnlyDocuments : [];
                            const docs = [...commonDocuments, ...serviceDocs, ...countryDocs];
                            if (docs.length === 0) {
                              return (
                                <p className="font-geist text-gray-600 pl-8">
                                  Documents will be available soon.
                                </p>
                              );
                            }
                            return (
                              <ul className="space-y-3 font-geist text-gray-700 pl-8">
                                {docs.map((doc) => (
                                  <li key={`${doc.label}-${doc.url}`}>
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-2 text-[#2C5AA0] hover:text-[#1e3a8a] font-semibold"
                                    >
                                      <FiFileText className="h-4 w-4" aria-hidden="true" />
                                      {doc.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </>
                ) : activeSection === 'manpower' ? (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiUsers className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-poppins text-xl font-semibold">
                          Manpower support
                        </h3>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    {service.manpowerDescription ? (
                      <p className="font-geist text-gray-600 mt-3 pl-8">
                        {service.manpowerDescription}
                      </p>
                    ) : (
                      <p className="font-geist text-gray-600 mt-3 pl-8">
                        We provide trained professionals aligned to {service.title} requirements, ready to integrate with your team and deliver measurable outcomes.
                      </p>
                    )}
                  </div>
                ) : activeSection === 'training' ? (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                      <div>
                        <div className="inline-flex items-start gap-2 text-gray-900">
                          <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                            <FiBookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="font-poppins text-xl font-semibold">
                              Training that builds real capability
                            </h3>
                            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                          </div>
                        </div>
                        <p className="font-geist text-gray-600 mt-3 pl-8">
                          We can help you learn and train your teams so they are ready to deliver
                          on {service.title} with confidence, safety, and measurable outcomes.
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
                        <div className="mt-4 space-y-4" style={{ perspective: '1000px' }}>
                          <div
                            className="rounded-xl border border-slate-200 bg-white p-4"
                            onMouseEnter={() => setHoveredHighlight(1)}
                            onMouseLeave={() => setHoveredHighlight(null)}
                            style={{
                              transform:
                                hoveredHighlight === 1
                                  ? 'translateY(-8px) rotateX(6deg) rotateY(-4deg)'
                                  : 'translateZ(0)',
                              boxShadow:
                                hoveredHighlight === 1
                                  ? '0 18px 40px rgba(15, 23, 42, 0.18)'
                                  : '0 4px 12px rgba(15, 23, 42, 0.08)',
                              transition: 'transform 240ms ease, box-shadow 240ms ease'
                            }}
                          >
                            <p className="font-poppins text-sm font-semibold text-gray-900">
                              Tailored Training Tracks
                            </p>
                            <p className="font-geist text-sm text-gray-600 mt-2">
                              Modules aligned to your project scope, team maturity, and timelines.
                            </p>
                          </div>
                          <div
                            className="rounded-xl border border-slate-200 bg-white p-4"
                            onMouseEnter={() => setHoveredHighlight(2)}
                            onMouseLeave={() => setHoveredHighlight(null)}
                            style={{
                              transform:
                                hoveredHighlight === 2
                                  ? 'translateY(-8px) rotateX(6deg) rotateY(4deg)'
                                  : 'translateZ(0)',
                              boxShadow:
                                hoveredHighlight === 2
                                  ? '0 18px 40px rgba(15, 23, 42, 0.18)'
                                  : '0 4px 12px rgba(15, 23, 42, 0.08)',
                              transition: 'transform 240ms ease, box-shadow 240ms ease'
                            }}
                          >
                            <p className="font-poppins text-sm font-semibold text-gray-900">
                              On-site or Remote Delivery
                            </p>
                            <p className="font-geist text-sm text-gray-600 mt-2">
                              Flexible formats to match your operational schedule and locations.
                            </p>
                          </div>
                          <div
                            className="rounded-xl border border-slate-200 bg-white p-4"
                            onMouseEnter={() => setHoveredHighlight(3)}
                            onMouseLeave={() => setHoveredHighlight(null)}
                            style={{
                              transform:
                                hoveredHighlight === 3
                                  ? 'translateY(-8px) rotateX(6deg) rotateY(-3deg)'
                                  : 'translateZ(0)',
                              boxShadow:
                                hoveredHighlight === 3
                                  ? '0 18px 40px rgba(15, 23, 42, 0.18)'
                                  : '0 4px 12px rgba(15, 23, 42, 0.08)',
                              transition: 'transform 240ms ease, box-shadow 240ms ease'
                            }}
                          >
                            <p className="font-poppins text-sm font-semibold text-gray-900">
                              Certified Completion
                            </p>
                            <p className="font-geist text-sm text-gray-600 mt-2">
                              Completion reports, skill matrices, and readiness confirmation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeSection === 'contact' ? (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="font-poppins text-xl font-semibold text-gray-900">
                          Immediate Response Contact
                        </h3>
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
                ) : activeSection === 'enquiry' ? (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiHelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-poppins text-xl font-semibold">
                          Enquiry Details
                        </h3>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    <p className="font-geist text-gray-600 mt-3 pl-8">
                      Share your enquiry about {service.title} and we will respond with the right scope, timeline, and next steps.
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiHelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-poppins text-xl font-semibold">
                          How we help
                        </h3>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    <p className="font-geist text-gray-600 mt-3 pl-8">
                      Share the details and we will align the right team, scope, and timeline for {service.title}.
                    </p>
                  </div>
                )}

                {activeSection !== 'contact' && activeSection !== 'know-more' && (
                  <div className="border border-slate-200 rounded-2xl p-6 bg-white">
                    <div className="inline-flex items-start gap-2 text-gray-900">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#2C5AA0]">
                        <FiMail className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-poppins text-xl font-semibold">
                          {activeSection === 'enquiry' ? 'Submit Enquiry' : 'Request More Info'}
                        </h3>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3a8a]"></div>
                      </div>
                    </div>
                    <p className="font-geist text-gray-600 text-sm mt-3 mb-4 pl-8">
                      {activeSection === 'enquiry'
                        ? `Tell us your enquiry about ${service.title} and we will get back to you.`
                        : 'Share your requirements and we will get back to you.'}
                    </p>
                    {submitted ? (
                      <div className="bg-green-50 border border-green-100 text-green-800 rounded-xl p-4 font-geist text-sm">
                        Thank you! Your request has been noted for {service.title} in {countryLabel}.
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3 pl-8">
                        <input type="hidden" name="country" value={country} />
                        <input type="hidden" name="service" value={service.title} />
                        <input type="hidden" name="topic" value={activeSectionData.label} />
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

export default ServiceDetail;
