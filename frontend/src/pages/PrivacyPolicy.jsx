import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                    <p className="text-gray-500 mb-8">Last updated: December 22, 2024</p>

                    <div className="prose prose-gray max-w-none">
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to The Community Path Project ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational technology platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Personal Information</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                We may collect personal information that you voluntarily provide when registering for an account, including:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Name (first and last name)</li>
                                <li>Email address</li>
                                <li>Account credentials (password - stored securely hashed)</li>
                                <li>Profile information you choose to provide</li>
                            </ul>

                            <h3 className="text-lg font-medium text-gray-800 mb-2 mt-6">Information from Third-Party Services</h3>
                            <p className="text-gray-600 leading-relaxed">
                                If you choose to sign in using Google OAuth, we receive your name, email address, and profile picture from Google. We do not receive or store your Google password.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Create and manage your account</li>
                                <li>Provide personalized educational content and recommendations</li>
                                <li>Communicate with you about your account or our services</li>
                                <li>Improve our platform and develop new features</li>
                                <li>Ensure the security and integrity of our services</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information, including:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
                                <li>Encryption of data in transit (HTTPS/TLS)</li>
                                <li>Secure password hashing (PBKDF2)</li>
                                <li>Rate limiting and brute force protection</li>
                                <li>Regular security audits and updates</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We do not sell your personal information. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
                                <li>With your consent</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect our rights and safety</li>
                                <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your account and data</li>
                                <li>Withdraw consent at any time</li>
                                <li>Object to certain processing activities</li>
                            </ul>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                To exercise these rights, please contact us at the email address provided below.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our platform is designed for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We use essential cookies and local storage to maintain your session and remember your preferences. We do not use third-party tracking cookies for advertising purposes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed">
                                If you have questions about this Privacy Policy or our practices, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 font-medium">The Community Path Project</p>
                                <p className="text-gray-600">Email: privacy@communitypathproject.org</p>
                            </div>
                        </section>
                    </div>
                </article>

                {/* Footer links */}
                <div className="mt-8 text-center">
                    <Link to="/terms-of-service" className="text-green-700 hover:text-green-800 font-medium">
                        View Terms of Service →
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default PrivacyPolicy;
