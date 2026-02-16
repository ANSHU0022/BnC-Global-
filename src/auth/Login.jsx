import React, { useState, useEffect } from 'react';
import { FaUser, FaShieldAlt, FaLock, FaIdCard, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('partner');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const loginType = searchParams.get('type');
    if (loginType === 'admin') {
      setActiveTab('admin');
    }
  }, [location]);

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
      
      url = `https://script.google.com/macros/s/AKfycbxFTbVglGTWrOFI0VVjM4NwcQ80kUtuvLhwPPwNw-Vi3OMF3Cn7tzC3cz_iyCzSNY8T9g/exec?${params}`;
      
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
    <div className="min-h-screen bg-[#f2f5fb] relative overflow-hidden flex items-center justify-center px-4 py-6">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2C5AA0]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#1e3f73]/15 blur-3xl" />
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/60">
          {/* Left Brand Panel */}
          <div className="relative hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-[#2C5AA0] via-[#24508f] to-[#163062] text-white">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:16px_16px]" />
            <div className="relative">
              <div className="inline-flex items-center gap-3">
                <div className="h-14 w-14 rounded-full flex items-center justify-center">
                  <img
                    src="/favicon/b%20nc%20global%20(2).avif"
                    alt="BnC Global"
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    BnC Global
                  </p>
                  <h1 className="text-2xl font-semibold mt-1">Welcome Back</h1>
                </div>
              </div>
              <p className="mt-6 text-sm text-white/80 leading-relaxed">
                Access your partner or admin dashboard and manage services, enquiries,
                and registrations in one place.
              </p>
            </div>
            <div className="relative space-y-4 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <FaShieldAlt />
                </div>
                Secure role-based access
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                  <FaUser />
                </div>
                Partner onboarding updates
              </div>
              <div className="flex items-center justify-center pt-2">
                <div className="grid gap-3 w-full max-w-sm">
                  <a
                    href="mailto:info@bncglobal.in"
                    className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 transition hover:bg-white/15 hover:border-white/40"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-white">info@bncglobal.in</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4.236 8 4.8 8-4.8V6l-8 4.8L4 6v2.236z" />
                      </svg>
                    </div>
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://wa.me/919958711796"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 transition hover:bg-white/15 hover:border-white/40"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                          WhatsApp
                        </p>
                      <p className="text-sm font-semibold text-white whitespace-nowrap">+91 99587 11796</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition ml-2">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.15-.198.297-.768.967-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.67-1.611-.916-2.206-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347M12.057 2.347c-5.523 0-10.017 4.494-10.017 10.017 0 1.77.463 3.445 1.355 4.94L2 22l4.861-1.277c1.413.771 3.007 1.195 4.696 1.195h.001c5.523 0 10.017-4.494 10.017-10.017S17.58 2.347 12.057 2.347m0 18.138c-1.52 0-2.985-.404-4.263-1.168l-.305-.182-2.883.758.769-2.81-.199-.32a8.27 8.27 0 0 1-1.259-4.404c0-4.561 3.711-8.273 8.273-8.273 4.561 0 8.273 3.712 8.273 8.273 0 4.561-3.712 8.273-8.273 8.273" />
                        </svg>
                      </div>
                    </a>
                    <a
                      href="tel:+919810575613"
                      className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 transition hover:bg-white/15 hover:border-white/40"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                          Call
                        </p>
                      <p className="text-sm font-semibold text-white whitespace-nowrap">+91 9304002266</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition ml-2">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-6 md:p-8">
            <div className="md:hidden text-center mb-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full mb-3">
                <img
                  src="/favicon/b%20nc%20global%20(2).avif"
                  alt="BnC Global"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-500 text-sm">Sign in to your BnC Global account</p>
            </div>

            {/* Tabs */}
            <div className="flex mb-5 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('partner')}
                className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'partner'
                    ? 'bg-white text-[#1e3f73] shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaUser className="mr-2" />
                Partner Login
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'admin'
                    ? 'bg-white text-[#1e3f73] shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaShieldAlt className="mr-2" />
                Admin Login
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2C5AA0]/30 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={activeTab === 'admin' ? 'Enter admin ID' : 'Enter your email address'}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                <p className="text-[11px] text-gray-400 mt-1">
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
                    className={`w-full px-4 py-2.5 pr-12 border rounded-lg focus:ring-2 focus:ring-[#2C5AA0]/30 focus:border-transparent ${
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
                className="w-full bg-gradient-to-r from-[#2C5AA0] to-[#1e3f73] hover:from-[#1e3f73] hover:to-[#163062] text-white py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center disabled:opacity-50 shadow-lg shadow-[#2C5AA0]/20"
              >
                {isLoading ? 'Signing in...' : `Sign In as ${activeTab === 'partner' ? 'Partner' : 'Admin'}`}
              </button>
              <Link
                to="/?open=partner"
                className="w-full border border-[#2C5AA0]/30 text-[#1e3f73] py-2.5 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center hover:bg-[#2C5AA0]/10"
              >
                Create an account
              </Link>
            </form>

            {/* Back Link */}
            <div className="mt-4 text-center">
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
    </div>
  );
};

export default Login;

