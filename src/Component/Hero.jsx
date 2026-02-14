import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PartnerFormModal from './PartnerFormModal';

const Hero = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredStackCard, setHoveredStackCard] = useState(null);
  const [modelTilt, setModelTilt] = useState({ x: 8, y: -14 });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/partner-form') {
      setIsModalOpen(true);
    }
  }, [location]);

  return (
    <>
      <section
        className="relative min-h-screen overflow-hidden text-slate-900"
        style={{ marginTop: '-80px', paddingTop: '140px' }}
      >
        <div className="absolute inset-0 bg-[#F7F2ED]">
          <div className="absolute -top-28 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#2C5AA0]/25 via-[#7ea5ff]/25 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-cyan-400/15 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(44,90,160,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,247,251,0.95),rgba(245,247,251,0.65))]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="text-center lg:text-left lg:-mt-25">
              <div className="relative inline-flex items-center gap-2 rounded-full border border-slate-900/60 bg-[#e8f1ff] px-4 py-1.5 text-xs font-semibold mb-6 -mt-2 backdrop-blur-sm text-slate-900 overflow-hidden shadow-[0_10px_26px_rgba(15,23,42,0.12)]">
                <span className="absolute inset-0 bg-gradient-to-r from-[#2C5AA0]/20 via-[#7ea5ff]/20 to-transparent blur-md" />
                <span className="relative flex items-center gap-2">
                  <svg className="h-4 w-4 text-slate-900" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.5l1.9 4.7 4.9 1.2-4.1 3.4 1.2 5-3.9-2.6-3.9 2.6 1.2-5-4.1-3.4 4.9-1.2L12 2.5z" />
                  </svg>
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-3 leading-tight -mt-5">
                {t('hero.titlePrefix')}{' '}
                <span style={{ color: '#2C5AA0' }} className="wave-text">
                  {'BnC Global'.split('').map((letter, index) => (
                    <span
                      key={index}
                      className="wave-letter"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        display: letter === ' ' ? 'inline' : 'inline-block'
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="font-geist text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 text-slate-600">
                {t('hero.subtitle')}
              </p>

              <div className="mb-8 -mt-2">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="inline-flex h-4 w-4 items-center justify-center text-[#2C5AA0]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8.5 12.5l2.4 2.4 4.6-5.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="font-geist text-sm md:text-base">
                    Strategic Finance Control
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-3 text-slate-700">
                  <span className="inline-flex h-4 w-4 items-center justify-center text-[#2C5AA0]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8.5 12.5l2.4 2.4 4.6-5.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="font-geist text-sm md:text-base">
                    Rapid Manpower Deployment
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-3 text-slate-700">
                  <span className="inline-flex h-4 w-4 items-center justify-center text-[#2C5AA0]">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8.5 12.5l2.4 2.4 4.6-5.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="font-geist text-sm md:text-base">
                    Data &amp; AI Technology
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-10 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transform"
                >
                  {t('hero.becomePartner')}
                </button>
                <Link
                  to="/login"
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-black px-10 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                  {t('hero.partnerLogin')}
                </Link>
              </div>

              <div className="mt-8 max-w-lg mx-auto lg:mx-0" style={{ perspective: '1400px' }}>
                <div className="relative cursor-pointer rounded-2xl border border-white/80 bg-gradient-to-b from-white/95 via-white/80 to-slate-100/80 px-6 py-4 shadow-[0_30px_70px_rgba(15,23,42,0.18)] backdrop-blur transform-gpu [transform:rotateX(6deg)_rotateY(-6deg)] transition duration-300 hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-10px)_scale(1.015)] hover:shadow-[0_50px_110px_rgba(15,23,42,0.24)] hover:ring-1 hover:ring-[#2C5AA0]/30">
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_55%)] pointer-events-none" />
                  <div className="relative grid gap-4 text-center sm:grid-cols-3">
                    <div>
                      <p className="font-poppins text-2xl font-semibold text-slate-900">100+</p>
                      <p className="text-xs text-slate-600">Global Partners</p>
                    </div>
                    <div>
                      <p className="font-poppins text-2xl font-semibold text-slate-900">15+</p>
                      <p className="text-xs text-slate-600">Years of Expertise</p>
                    </div>
                    <div>
                      <p className="font-poppins text-2xl font-semibold text-slate-900">5+</p>
                      <p className="text-xs text-slate-600">Countries Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end lg:-mt-30">
              <div
                className="relative w-full max-w-md"
                style={{ perspective: '1200px' }}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = (event.clientX - rect.left) / rect.width;
                  const y = (event.clientY - rect.top) / rect.height;
                  const rotateY = -14 + (x - 0.5) * 14;
                  const rotateX = 8 + (0.5 - y) * 12;
                  setModelTilt({ x: rotateX, y: rotateY });
                }}
                onMouseLeave={() => setModelTilt({ x: 8, y: -14 })}
              >
                <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-tr from-[#2C5AA0]/25 via-[#7ea5ff]/20 to-transparent blur-2xl" />
                <div
                  className="relative rounded-[32px] border border-white/60 bg-white/80 p-6 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
                  style={{
                    transform: `rotateY(${modelTilt.y}deg) rotateX(${modelTilt.x}deg)`,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 80ms ease-out'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        Global Capability
                      </p>
                      <p className="font-poppins text-lg font-semibold text-slate-900 mt-2">
                        Your End-to-End Service Stack
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#2C5AA0] to-[#7ea5ff] shadow-lg" />
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div
                      className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
                      onMouseEnter={() => setHoveredStackCard(1)}
                      onMouseLeave={() => setHoveredStackCard(null)}
                      style={{
                        transform:
                          hoveredStackCard === 1
                            ? 'translateZ(90px) rotateX(8deg) rotateY(-6deg) scale(1.05) translateY(-8px)'
                            : 'translateZ(24px)',
                        transition: 'transform 120ms ease-out, box-shadow 120ms ease-out',
                        boxShadow:
                          hoveredStackCard === 1
                            ? '0 32px 70px rgba(15,23,42,0.24)'
                            : '0 12px 30px rgba(15,23,42,0.12)'
                      }}
                    >
                      <p className="text-sm font-semibold text-slate-900">Finance & Accounts</p>
                      <p className="text-xs text-slate-600 mt-2">
                        Reliable reporting and compliance at scale.
                      </p>
                    </div>
                    <div
                      className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_16px_32px_rgba(15,23,42,0.12)]"
                      onMouseEnter={() => setHoveredStackCard(2)}
                      onMouseLeave={() => setHoveredStackCard(null)}
                      style={{
                        transform:
                          hoveredStackCard === 2
                            ? 'translateZ(110px) rotateX(8deg) rotateY(6deg) scale(1.05) translateY(-8px)'
                            : 'translateZ(36px)',
                        transition: 'transform 120ms ease-out, box-shadow 120ms ease-out',
                        boxShadow:
                          hoveredStackCard === 2
                            ? '0 36px 74px rgba(15,23,42,0.24)'
                            : '0 16px 32px rgba(15,23,42,0.12)'
                      }}
                    >
                      <p className="text-sm font-semibold text-slate-900">Manpower Solutions</p>
                      <p className="text-xs text-slate-600 mt-2">
                        Trained manpower for every project phase.
                      </p>
                    </div>
                    <div
                      className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_18px_34px_rgba(15,23,42,0.1)]"
                      onMouseEnter={() => setHoveredStackCard(3)}
                      onMouseLeave={() => setHoveredStackCard(null)}
                      style={{
                        transform:
                          hoveredStackCard === 3
                            ? 'translateZ(130px) rotateX(8deg) rotateY(-5deg) scale(1.05) translateY(-8px)'
                            : 'translateZ(48px)',
                        transition: 'transform 120ms ease-out, box-shadow 120ms ease-out',
                        boxShadow:
                          hoveredStackCard === 3
                            ? '0 40px 80px rgba(15,23,42,0.24)'
                            : '0 18px 34px rgba(15,23,42,0.1)'
                      }}
                    >
                      <p className="text-sm font-semibold text-slate-900">Training & Upskilling</p>
                      <p className="text-xs text-slate-600 mt-2">
                        Skills, safety, and readiness in weeks.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                    <p className="text-xs text-slate-600">Live operations across India & KSA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <PartnerFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Hero;
