import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Events = () => {
  const upcomingEvents = [
    {
      date: '30',
      month: 'Jan',
      title: 'Global Partnership Summit 2026',
      location: 'Delhi, India',
      description: 'Join industry leaders for networking and partnership opportunities.',
      status: 'Register Now'
    },
    {
      date: '15',
      month: 'March',
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
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 ${isUpcoming ? 'opacity-10' : 'bg-gradient-to-br from-gray-400 to-gray-500 opacity-10'} rounded-bl-full`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}></div>
      <div className="flex items-start space-x-4 relative z-10">
        <div className={`text-center p-4 rounded-xl shadow-md ${isUpcoming ? 'text-white' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'}`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}>
          <div className="text-2xl font-bold">{event.date}</div>
          <div className="text-sm font-medium">{event.month}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{event.title}</h3>
          <div className="flex items-center text-gray-500 mb-3">
            <FaMapMarkerAlt className="mr-2 text-sm" />
            <span className="text-sm font-medium">{event.location}</span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm">{event.description}</p>
          <button className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
            isUpcoming 
              ? 'text-white shadow-lg hover:opacity-90' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 shadow-md'
          }`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}>
            {event.status}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative inline-block">
            Recent & Upcoming <span style={{color: '#2C5AA0'}}>Events</span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">Stay connected with our latest events and networking opportunities</p>
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex items-center mb-10">
            <div className="p-3 rounded-full mr-4" style={{backgroundColor: '#2C5AA0'}}>
              <FaCalendarAlt className="text-white text-lg" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Upcoming Events</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} event={event} isUpcoming={true} />
            ))}
          </div>
        </div>
        
        {/* Recent Events */}
        <div>
          <div className="flex items-center mb-10">
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-3 rounded-full mr-4">
              <FaCalendarAlt className="text-white text-lg" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800">Recent Events</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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