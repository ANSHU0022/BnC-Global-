import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Chatbot from './Component/Chatbot';
import Home from './pages/Home';
import Partnerships from './pages/Partnerships';
import EventsPage from './pages/EventsPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import Login from './pages/Login';
import PartnerDashboard from './pages/PartnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BncServices from './pages/BncServices';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PartnerDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/bnc-services" element={<BncServices />} />
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/partnerships" element={<Partnerships />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
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
