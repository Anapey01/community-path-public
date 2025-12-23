import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle, XCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { confirmPasswordReset } from '../services/api';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    // Redirect if token or email is missing
    useEffect(() => {
        if (!token || !email) {
            setError('Invalid reset link. Please request a new password reset.');
        }
    }, [token, email]);

    const passwordRequirements = [
        { test: (p) => p.length >= 10, label: 'At least 10 characters' },
        { test: (p) => /[A-Z]/.test(p), label: 'At least one uppercase letter' },
        { test: (p) => /[a-z]/.test(p), label: 'At least one lowercase letter' },
        { test: (p) => /\d/.test(p), label: 'At least one number' },
        { test: (p) => /[!@#$%^&*(),.?":{}|<>\-_=+\[\]\\;'`~]/.test(p), label: 'At least one special character' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        // Check all requirements
        const unmet = passwordRequirements.filter(req => !req.test(password));
        if (unmet.length > 0) {
            setError(`Password must have: ${unmet.map(r => r.label.toLowerCase()).join(', ')}`);
            return;
        }

        setIsLoading(true);

        try {
            await confirmPasswordReset(token, email, password, password2);
            setIsSuccess(true);

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            if (typeof err === 'string') {
                setError(err);
            } else if (err.error) {
                setError(err.error);
            } else if (err.password) {
                setError(Array.isArray(err.password) ? err.password.join(', ') : err.password);
            } else {
                setError('Failed to reset password. The link may have expired.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Password Reset!</h1>
                    <p className="text-gray-600 mb-6">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Redirecting to login in 3 seconds...
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    if (!token || !email) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
                    <p className="text-gray-600 mb-6">
                        This password reset link is invalid or has expired. Please request a new one.
                    </p>
                    <Link
                        to="/forgot-password"
                        className="inline-flex items-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition"
                    >
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h1>
                    <p className="text-gray-600">
                        Enter your new password below.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* New Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password requirements */}
                        <div className="mt-3 space-y-1">
                            {passwordRequirements.map((req, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-2 text-xs ${password && req.test(password) ? 'text-green-600' : 'text-gray-400'
                                        }`}
                                >
                                    {password && req.test(password) ? (
                                        <CheckCircle className="w-3 h-3" />
                                    ) : (
                                        <div className="w-3 h-3 rounded-full border border-current" />
                                    )}
                                    {req.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${password2 && password !== password2
                                    ? 'border-red-300 bg-red-50'
                                    : password2 && password === password2
                                        ? 'border-green-300 bg-green-50'
                                        : 'border-gray-300'
                                }`}
                        />
                        {password2 && password !== password2 && (
                            <p className="text-red-600 text-xs mt-1">Passwords don't match</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !password || !password2}
                        className="w-full bg-green-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-800 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Resetting...
                            </>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>

                {/* Back link */}
                <div className="mt-6 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
