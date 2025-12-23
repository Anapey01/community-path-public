import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
// We don't need the logo import here, but keeping clean structure

function Login() {
    const navigate = useNavigate();

    // Load saved email from localStorage
    const savedEmail = localStorage.getItem('rememberedEmail') || '';

    const [formData, setFormData] = useState({
        email: savedEmail,
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberEmail, setRememberEmail] = useState(!!savedEmail);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);

            // Save or remove remembered email
            if (rememberEmail) {
                localStorage.setItem('rememberedEmail', formData.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            // Mark this browser as a returning user
            localStorage.setItem('hasLoggedInBefore', 'true');

            // Redirect to the User Hub (Dashboard)
            navigate('/dashboard');

        } catch (err) {
            console.error("Login failed", err);
            setError(
                err.detail ||
                err.non_field_errors?.[0] ||
                (typeof err === 'object' ? JSON.stringify(err) : "Invalid email or password.")
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        // MAIN CONTAINER: Split Screen (Flex Row on Desktop, Col on Mobile)
        <div className="flex flex-col md:flex-row min-h-screen w-full font-sans overflow-hidden">

            {/* --- LEFT SIDE: IMAGE (Top Banner on Mobile, Side on Desktop) --- */}
            <div className="w-full h-64 md:h-full md:w-[45%] relative md:fixed inset-y-0 left-0 bg-gray-900 shrink-0">
                {/* Image Container with relative positioning for absolute overlays */}
                <div className="relative w-full h-full">
                    <img
                        src="/assets/images/login.jpg"
                        alt="Community collaboration"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Subtle dark overlay for text readability */}
                    <div className="absolute inset-0 bg-gray-900/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>

                    {/* Content overlay - Logo only */}
                    <div className="absolute inset-0 z-10 flex flex-col h-full p-12 text-white">
                        <div>
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
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: FORM --- */}
            <div className="w-full md:w-[55%] md:ml-[45%] bg-white flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto">

                <div className="w-full max-w-md">

                    {/* HEADER */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                        <p className="text-gray-500">Please enter your details.</p>
                    </div>

                    {/* Professional Google Sign In Button */}
                    <div className="mb-8">
                        <button
                            type="button"
                            onClick={() => window.location.href = `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || (window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://the-community-path-project.onrender.com')}/accounts/google/login/?process=login`}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                        >
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            <span className="text-gray-700 font-semibold text-sm">Continue with Google</span>
                        </button>
                    </div>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">Or sign in with email</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-700 focus:bg-white focus:ring-0 text-gray-900 transition"
                                    required
                                />
                                {/* Mail Icon SVG */}
                                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Password *</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-green-700 focus:bg-white focus:ring-0 text-gray-900 transition"
                                    required
                                />
                                {/* Eye Icon Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberEmail}
                                        onChange={(e) => setRememberEmail(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-green-700 focus:ring-green-700"
                                    />
                                    <span className="text-sm text-gray-600">Remember email</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm font-medium text-green-700 hover:text-green-800">Forgot password?</Link>
                            </div>
                        </div>

                        {/* GREEN SIGN IN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            // CHANGED: bg-amber-400 -> bg-green-700
                            className="w-full py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg transform transition hover:-translate-y-0.5 focus:ring-4 focus:ring-green-200"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>

                    {/* FOOTER */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-gray-600">
                            Don't have an account? <Link to="/signup" className="font-bold text-green-700 hover:underline">Sign up</Link>
                        </p>

                        <div className="text-sm">
                            <span className="text-gray-500 font-bold">Struggling to log in or sign up? </span>
                            <a href="#" className="text-green-700 hover:underline">Click here</a> to contact us
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;