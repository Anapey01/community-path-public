import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            {/* Background Noise & Gradient */}
            <div className="absolute inset-0 bg-gray-50 opacity-50 z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>

            <div className="relative z-10 max-w-2xl">
                <h1 className="text-9xl font-serif font-black text-gray-900 mb-4 opacity-10">404</h1>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 -mt-20">
                    Off the Path?
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    The page you are looking for seems to have drifted away.
                    <br />Let's get you back to your journey.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/"
                        className="group bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Back Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="group bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
