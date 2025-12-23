import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("You must agree to the terms of service.");
      return;
    }
    setLoading(true);
    setError('');

    try {
      const backendPayload = {
        email: formData.email,
        password: formData.password,
        password2: formData.password,  // Required by backend for password confirmation
        first_name: formData.firstName,
        last_name: formData.lastName
      };

      await signupUser(backendPayload);
      alert("Account created successfully! Please log in.");
      navigate('/login');
    } catch (err) {
      console.error("Signup failed", err);
      if (err.username) setError(`Username issue: ${err.username[0]}`);
      else if (err.email) setError(`Email issue: ${err.email[0]}`);
      else if (err.password) setError(`Password issue: ${err.password[0]}`);
      else setError(`Signup failed: ${err.detail || (typeof err === 'object' ? JSON.stringify(err) : 'Please check your connection and try again.')}`);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-700 focus:bg-white focus:ring-0 text-gray-900 transition pl-4 pr-10";

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full font-sans overflow-hidden">
      {/* Left panel - Image Banner on Mobile, Sidebar on Desktop */}
      <div className="w-full h-64 md:h-full md:w-[45%] relative md:fixed inset-y-0 left-0 bg-gray-900 shrink-0">
        {/* Image Container with relative positioning for absolute overlays */}
        <div className="relative w-full h-full">
          <img
            src="/assets/images/signup.jpg"
            alt="Community collaboration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Subtle dark overlay for text readability, but letting image shine through */}
          <div className="absolute inset-0 bg-gray-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>

          {/* Content overlay - Logo and Text */}
          <div className="absolute inset-0 z-10 flex flex-col h-full p-12 text-white justify-between">
            <div className="mb-8">
              <Link to="/" className="flex items-center space-x-2 group">
                {/* Logo matching Home page navbar style */}
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl italic">C</span>
                </div>
                <span className="text-2xl font-serif font-black tracking-tight text-white">
                  COMMUNITY<span className="text-gray-400 font-normal ml-1">PATH</span>
                </span>
              </Link>
            </div>

            <div className="mb-20">
              <h1 className="text-4xl lg:text-5xl font-serif font-black mb-6 leading-tight tracking-tight">
                Discover Your Place.
              </h1>
              <p className="text-gray-200 text-xl leading-relaxed max-w-md font-medium">
                We are developing communities and inspiring students, one match at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[55%] md:ml-[45%] bg-white flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="text-gray-500 mt-2">Join the community today.</p>
          </div>

          {/* Professional Google Sign In Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || (window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://the-community-path-project.onrender.com')}/accounts/google/login/?process=login`}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="text-gray-700 font-semibold text-sm">Continue with Google</span>
            </button>
          </div>

          <div className="relative flex py-4 items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase tracking-wider font-medium">Or register with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg font-medium">
                {error}
              </p>
            )}

            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
              <div className="relative">
                <input type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} className={inputClasses} required />
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
              <div className="relative">
                <input type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} className={inputClasses} required />
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className={inputClasses} required />
                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} className={inputClasses} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters, contain uppercase, lowercase, numeric and symbol characters</p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
              </div>

              <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                By signing up I agree to the <a href="#" className="text-green-600 hover:underline font-medium">terms of service</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-md transform transition hover:-translate-y-0.5 focus:ring-4 focus:ring-green-200 text-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="font-bold text-green-600 hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
