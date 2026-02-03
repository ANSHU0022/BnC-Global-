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
    <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-gray-100 relative overflow-hidden backdrop-blur-sm">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${isUpcoming ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-gray-400 to-gray-600'}`}></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-8 right-8 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-ping"></div>
      
      {/* Corner decoration */}
      <div className={`absolute top-0 right-0 w-20 h-20 ${isUpcoming ? 'opacity-10 group-hover:opacity-20' : 'bg-gradient-to-br from-gray-400 to-gray-500 opacity-10 group-hover:opacity-20'} rounded-bl-full transition-opacity duration-300`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}></div>
      
      <div className="flex items-start space-x-4 relative z-10">
        <div className={`text-center p-4 rounded-xl shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${isUpcoming ? 'text-white' : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'}`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}>
          <div className="text-2xl font-bold group-hover:animate-pulse">{event.date}</div>
          <div className="text-sm font-medium">{event.month}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-gray-900 transition-colors duration-300">{event.title}</h3>
          <div className="flex items-center text-gray-500 mb-3 group-hover:text-gray-600 transition-colors duration-300">
            <FaMapMarkerAlt className="mr-2 text-sm group-hover:animate-bounce" />
            <span className="text-sm font-medium">{event.location}</span>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed text-sm group-hover:text-gray-700 transition-colors duration-300">{event.description}</p>
          <button className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 hover:shadow-lg relative overflow-hidden ${
            isUpcoming 
              ? 'text-white shadow-lg hover:shadow-xl' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 shadow-md hover:shadow-lg'
          }`} style={isUpcoming ? {backgroundColor: '#2C5AA0'} : {}}>
            <span className="relative z-10">{event.status}</span>
            {isUpcoming && <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-50 rounded-full opacity-40 animate-ping"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative inline-block animate-fade-in">
            Recent & Upcoming <span style={{color: '#2C5AA0'}} className="animate-pulse">Events</span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full animate-pulse" style={{backgroundColor: '#2C5AA0'}}></div>
            {/* Glowing effect */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 rounded-full opacity-20 blur-sm animate-pulse" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
          <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto animate-fade-in-up">Stay connected with our latest events and networking opportunities</p>
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex items-center mb-10 group">
            <div className="p-3 rounded-full mr-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg" style={{backgroundColor: '#2C5AA0'}}>
              <FaCalendarAlt className="text-white text-lg group-hover:animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">Upcoming Events</h3>
            <div className="ml-4 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <EventCard event={event} isUpcoming={true} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Events */}
        <div>
          <div className="flex items-center mb-10 group">
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-3 rounded-full mr-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
              <FaCalendarAlt className="text-white text-lg group-hover:animate-pulse" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">Recent Events</h3>
            <div className="ml-4 w-12 h-0.5 bg-gradient-to-r from-gray-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {recentEvents.map((event, index) => (
              <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                <EventCard event={event} isUpcoming={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;