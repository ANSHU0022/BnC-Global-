import React, { useState } from 'react';
import { FaTimes, FaArrowRight, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

const PartnerFormModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const countries = [
    { value: 'india', label: 'India / भारत', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Other'] },
    { value: 'usa', label: 'United States / संयुक्त राज्य अमेरिका', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'] },
    { value: 'uk', label: 'United Kingdom / यूनाइटेड किंगडम', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds', 'Sheffield'] },
    { value: 'canada', label: 'Canada / कनाडा', cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton'] },
    { value: 'australia', label: 'Australia / ऑस्ट्रेलिया', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'] },
    { value: 'germany', label: 'Germany / जर्मनी', cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart'] },
    { value: 'france', label: 'France / फ्रांस', cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes'] },
    { value: 'japan', label: 'Japan / जापान', cities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Kobe', 'Nagoya'] },
    { value: 'china', label: 'China / चीन', cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou'] },
    { value: 'singapore', label: 'Singapore / सिंगापुर', cities: ['Singapore City', 'Jurong', 'Woodlands', 'Tampines', 'Bedok', 'Hougang'] },
    { value: 'saudi', label: 'Saudi Arabia / सऊदी अरब', cities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar'] },
    { value: 'uae', label: 'UAE / संयुक्त अरब अमीरात', cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah'] }
  ];

  const checkEmailExists = async (email) => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    
    setIsCheckingEmail(true);
    try {
      const params = new URLSearchParams({
        action: 'checkEmail',
        email: email
      });
      
      const url = `https://script.google.com/macros/s/AKfycbxzBlON2yrLD6uqHaSybZutsndvgpsZFoA2HMOBY4bfynBKQdz6LHp13dXDD4CUlnY6Hw/exec?${params}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      
      const result = await response.json();
      
      if (result.exists) {
        setErrors(prev => ({ ...prev, email: 'You have already registered with this email address.' }));
        setEmailExists(true);
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
        setEmailExists(false);
      }
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const getCitiesForCountry = (country) => {
    const selectedCountry = countries.find(c => c.value === country);
    return selectedCountry ? selectedCountry.cities : [];
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        break;
      case 3:
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.city) newErrors.city = 'City is required';
        break;
      case 4:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
          newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'country' && { city: '' }) // Reset city when country changes
    }));
    
    // Check email availability when email field changes
    if (name === 'email' && value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setTimeout(() => checkEmailExists(value), 500);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (currentStep === 2 && emailExists) {
      return; // Don't allow next if email exists
    }
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      setIsSubmitting(true);
      try {
        // Create URL with parameters for GET request
        const params = new URLSearchParams({
          action: 'register',
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          password: formData.password
        });
        
        const url = `https://script.google.com/macros/s/AKfycbxzBlON2yrLD6uqHaSybZutsndvgpsZFoA2HMOBY4bfynBKQdz6LHp13dXDD4CUlnY6Hw/exec?${params}`;
        
        // Use fetch with GET method
        const response = await fetch(url, {
          method: 'GET',
          mode: 'no-cors'
        });
        
        // Since we can't read response with no-cors, we'll check by trying to login
        // Wait a moment for the data to be processed
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Try to verify the registration by attempting login
        const verifyParams = new URLSearchParams({
          action: 'login',
          email: formData.email,
          password: formData.password
        });
        
        const verifyUrl = `https://script.google.com/macros/s/AKfycbxzBlON2yrLD6uqHaSybZutsndvgpsZFoA2HMOBY4bfynBKQdz6LHp13dXDD4CUlnY6Hw/exec?${verifyParams}`;
        
        const verifyResponse = await fetch(verifyUrl, {
          method: 'GET',
          mode: 'cors'
        });
        
        const verifyResult = await verifyResponse.json();
        
        if (verifyResult.success) {
          // Registration successful
          setIsSubmitted(true);
          console.log('Form submitted:', formData);
        } else if (verifyResult.message === 'Invalid email or password') {
          // This means registration failed, likely due to duplicate email
          alert('Registration failed: Email already exists. Please use a different email address.');
        } else {
          alert('Registration failed: ' + verifyResult.message);
        }
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleLoginRedirect = () => {
    onClose();
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      password: ''
    });
    setCurrentStep(1);
    setErrors({});
    setIsSubmitted(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  if (!isOpen) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <div className="fixed inset-0 bg-black/50"></div>
          
          <div className="relative inline-block w-full max-w-md p-0 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl z-10">
            <button
              onClick={handleLoginRedirect}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <FaTimes size={18} />
            </button>
            <div className="p-8 text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted Successfully!</h3>
              <p className="text-gray-600 mb-4">Thank you for registering with us. Our team will contact you shortly.</p>
              <p className="text-sm text-gray-500 mb-6">Your registered email: <span className="font-medium text-gray-700">{formData.email}</span></p>
              <button
                onClick={handleLoginRedirect}
                className="w-full bg-[#254C89] hover:bg-[#1e3f73] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information / व्यक्तिगत जानकारी</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name / पहला नाम *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your first name / अपना पहला नाम दर्ज करें"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name / अंतिम नाम *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your last name / अपना अंतिम नाम दर्ज करें"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information / संपर्क जानकारी</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email / ईमेल *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email / अपना ईमेल दर्ज करें"
              />
              {isCheckingEmail && <p className="text-blue-500 text-sm mt-1">Checking email availability...</p>}
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number / फोन नंबर *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number (10 digits) / फोन नंबर दर्ज करें (10 अंक)"
                maxLength="10"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              <p className="text-gray-500 text-sm mt-1">Phone number must be exactly 10 digits / फोन नंबर बिल्कुल 10 अंकों का होना चाहिए</p>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Location / स्थान</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country / देश *
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Country / देश चुनें</option>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City / शहर *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.country}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } ${!formData.country ? 'bg-gray-100' : ''}`}
              >
                <option value="">Select City / शहर चुनें</option>
                {getCitiesForCountry(formData.country).map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Password / पासवर्ड बनाएं</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password / पासवर्ड *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-[#254C89] focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a password / पासवर्ड बनाएं"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-gray-500 text-sm mt-1">
                Password must contain at least 8 characters including uppercase, lowercase, number and special character / पासवर्ड में कम से कम 8 अक्षर होने चाहिए जिसमें बड़े अक्षर, छोटे अक्षर, संख्या और विशेष अक्षर शामिल हों
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
        
        <div className="relative inline-block w-full max-w-xl p-0 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#254C89] to-[#1e3f73] px-6 py-4 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes size={18} />
            </button>
            <h2 className="text-xl font-bold mb-1">Partner Application</h2>
            <p className="text-blue-100 text-sm">Join our growing network of partners</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm">Step {currentStep} of 4</span>
              <span className="text-sm">{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-[#1a3d6b] rounded-full h-2 mt-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {renderStep()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FaArrowLeft className="mr-2" size={14} />
                  Back
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentStep === 2 && emailExists}
                  className={`flex items-center ml-auto px-6 py-2 rounded-lg font-semibold transition-colors ${
                    currentStep === 2 && emailExists 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-[#254C89] hover:bg-[#1e3f73] text-white'
                  }`}
                >
                  Next
                  <FaArrowRight className="ml-2" size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="ml-auto bg-[#2C5AA0] hover:bg-[#1e3f73] text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerFormModal;

