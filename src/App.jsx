import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Chatbot from './Component/Chatbot';
import Home from './pages/Home';
import Partnerships from './pages/Partnerships';
import Login from './auth/Login';
import PartnerDashboard from './pages/PartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BncServices from './pages/BncServices';
import IndiaServices from './pages/services/india/IndiaServices';
import SaudiArabiaServices from './pages/services/saudi-arabia/SaudiArabiaServices';
import OtherServices from './pages/services/other/OtherServices';
import ServiceDetail from './pages/services/ServiceDetail';

function App() {
  useEffect(() => {
    const existing = document.getElementById('elevenlabs-convai-widget');
    if (existing) return;

    const widget = document.createElement('elevenlabs-convai');
    widget.id = 'elevenlabs-convai-widget';
    widget.setAttribute('agent-id', 'agent_3501khh6r508esna3y2xcgd45751');
    widget.style.position = 'fixed';
    widget.style.right = '24px';
    widget.style.left = 'auto';
    widget.style.bottom = '24px';
    widget.style.zIndex = '9999';
    document.body.appendChild(widget);

    return () => {
      widget.remove();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PartnerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/bnc-services" element={<BncServices />} />
          <Route path="/services/india" element={<IndiaServices />} />
          <Route path="/services/saudi-arabia" element={<SaudiArabiaServices />} />
          <Route path="/services/other" element={<OtherServices />} />
          <Route path="/services/:country/:serviceId" element={<ServiceDetail />} />
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/partnerships" element={<Partnerships />} />
                  <Route path="/partner-form" element={<Home />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
