import React, { useState } from 'react';
import { FaUser, FaShieldAlt, FaLock, FaIdCard, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('partner');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === 'admin') {
      // Admin validation
      if (!formData.email.trim()) {
        newErrors.email = 'Admin ID is required';
      }
    } else {
      // Partner validation
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      let params, url;
      
      if (activeTab === 'admin') {
        params = new URLSearchParams({
          action: 'adminLogin',
          adminId: formData.email,
          password: formData.password
        });
      } else {
        params = new URLSearchParams({
          action: 'login',
          email: formData.email,
          password: formData.password
        });
      }
      
      url = `https://script.google.com/macros/s/AKfycby-worRSM90xQ6Ekb-axlZKY_c45-p4uXJkJfkFDtIDx6a33X-fjbZIZqOzk5kj2LPh8Q/exec?${params}`;
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      });
      
      const result = await response.json();
      
      if (result.success) {
        if (activeTab === 'admin') {
          localStorage.setItem('adminUser', JSON.stringify(result.admin));
          alert('Admin login successful!');
          window.location.href = '/admin-dashboard';
        } else {
          localStorage.setItem('partnerUser', JSON.stringify(result.user));
          alert('Login successful! Welcome ' + result.user.firstName);
          window.location.href = '/dashboard';
        }
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <img 
              src="https://static.wixstatic.com/media/0446e3_50ff54e1251b45ef8a1066bca3a75b0e~mv2.png/v1/fill/w_256,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b%20nc%20global.png" 
              alt="BnC Global" 
              className="h-16 w-16"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your BnC Global account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Tabs */}
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('partner')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-l-lg font-semibold transition-colors ${
                activeTab === 'partner'
                  ? 'bg-[#2C5AA0] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaUser className="mr-2" />
              Partner Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-r-lg font-semibold transition-colors ${
                activeTab === 'admin'
                  ? 'bg-[#2C5AA0] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaShieldAlt className="mr-2" />
              Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}
            
            {/* User ID (Email/Admin ID) */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaIdCard className="mr-2 text-[#2C5AA0]" />
                {activeTab === 'admin' ? 'Admin ID' : 'User ID (Email)'}
              </label>
              <input
                type={activeTab === 'admin' ? 'text' : 'email'}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={activeTab === 'admin' ? 'Enter admin ID' : 'Enter your email address'}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <span className="inline-block w-4 h-4 bg-gray-400 text-white rounded-full text-xs flex items-center justify-center mr-2">i</span>
                {activeTab === 'admin' ? 'Use your admin ID' : 'Use the email address you registered with'}
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FaLock className="mr-2 text-[#2C5AA0]" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-[#2C5AA0] focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2C5AA0] hover:bg-[#1e3f73] text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50"
            >
              <span className="mr-2">→</span>
              {isLoading ? 'Signing in...' : `Sign In as ${activeTab === 'partner' ? 'Partner' : 'Admin'}`}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-[#2C5AA0] hover:text-[#1e3f73] font-medium"
            >
              <FaArrowLeft className="mr-2" />
              Back to Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;