import React from 'react';
import { FaUserTie, FaCog, FaDollarSign, FaBolt, FaShieldAlt, FaLayerGroup } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserTie className="text-4xl mb-4" style={{color: '#2C5AA0'}} />,
      title: "Expert Guidance",
      description: "Certified CA & experienced advisory services to guide your business every step."
    },
    {
      icon: <FaCog className="text-4xl mb-4" style={{color: '#2C5AA0'}} />,
      title: "All-in-One Solutions",
      description: "Complete experience, 15+ business services, one convenient location."
    },
    {
      icon: <FaDollarSign className="text-4xl mb-4" style={{color: '#2C5AA0'}} />,
      title: "Transparent Pricing",
      description: "No hidden costs, clear pricing with competitive rates and value."
    },
    {
      icon: <FaBolt className="text-4xl mb-4" style={{color: '#2C5AA0'}} />,
      title: "Fast Turnaround",
      description: "Complete registration in just 7-10 working days."
    },
    {
      icon: <FaShieldAlt className="text-4xl mb-4" style={{color: '#2C5AA0'}} />,
      title: "Post-Setup Support",
      description: "Annual filing, compliance management and ongoing business support."
    },
    {
      icon: <FaLayerGroup className="text-4xl mb-4" style={{color: '#2C5AA0'}} />,
      title: "Multiple Entry Types",
      description: "Support for Pvt Ltd, LLP, OPC, Sole Proprietorship and Partnership."
    }
  ];

  return (
    <section className="bg-white py-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            Why Choose <span style={{color: '#2C5AA0'}}>BnC Global?</span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 rounded-full" style={{backgroundColor: '#2C5AA0'}}></div>
          </h2>
          <p className="font-geist text-xl text-gray-600 max-w-3xl mx-auto">
            We combine legal expertise with technology to provide the fastest, most reliable business setup experience in India.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-150 border border-gray-100">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-poppins text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="font-geist text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;