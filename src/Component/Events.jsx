import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Events = () => {
  const upcomingEvents = [
    {
      date: '15',
      month: 'Dec',
      title: 'Global Partnership Summit 2026',
      location: 'Mumbai, India',
      description: 'Join industry leaders for networking and partnership opportunities.',
      status: 'Register Now'
    },
    {
      date: '28',
      month: 'Dec',
      title: 'Technology Innovation Workshop',
      location: 'Bangalore, India',
      description: 'Explore latest tech trends and partnership models.',
      status: 'Register Now'
    }
  ];

  const recentEvents = [
    {
      date: '10',
      month: 'Nov',
      title: 'Partner Appreciation Gala',
      location: 'Delhi, India',
      description: 'Celebrated successful partnerships and achievements.',
      status: 'View Highlights'
    },
    {
      date: '20',
      month: 'Oct',
      title: 'Annual Business Conference',
      location: 'Bangalore, India',
      description: 'Strategic planning session with key partners and stakeholders.',
      status: 'View Summary'
    }
  ];

  const EventCard = ({ event, isUpcoming = true }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4">
        <div className={`text-center p-3 rounded-lg ${isUpcoming ? 'text-white' : 'bg-gray-100 text-gray-600'}`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}>
          <div className="text-2xl font-bold">{event.date}</div>
          <div className="text-sm">{event.month}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{event.location}</span>
          </div>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <button className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isUpcoming 
              ? 'text-white hover:opacity-90' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}>
            {event.status}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            Recent & Upcoming <span style={{color: '#2C5AA0'}}>Events</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 rounded-full" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <FaCalendarAlt className="mr-3" style={{color: '#2C5AA0'}} />
            <h3 className="text-2xl font-bold text-gray-800">Upcoming Events</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} event={event} isUpcoming={true} />
            ))}
          </div>
        </div>
        
        {/* Recent Events */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <FaCalendarAlt className="text-gray-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">Recent Events</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {recentEvents.map((event, index) => (
              <EventCard key={index} event={event} isUpcoming={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;