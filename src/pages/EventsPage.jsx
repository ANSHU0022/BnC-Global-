import React from 'react';
import Events from '../Component/Events';
import CTA from '../Component/CTA';

const EventsPage = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay updated with our latest events and networking opportunities
          </p>
        </div>
      </section>
      <Events />
      <CTA />
    </div>
  );
};

export default EventsPage;