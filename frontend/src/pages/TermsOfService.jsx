import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function TermsOfService() {
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
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
                    <p className="text-gray-500 mb-8">Last updated: December 22, 2024</p>

                    <div className="prose prose-gray max-w-none">
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                By accessing or using The Community Path Project ("Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Community Path Project is an educational technology platform designed to connect students in Ghana with personalized learning pathways aligned with the United Nations Sustainable Development Goals (SDGs). Our services include:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
                                <li>Personalized educational content and recommendations</li>
                                <li>Career pathway guidance</li>
                                <li>Community engagement features</li>
                                <li>Progress tracking and analytics</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Registration</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.
                            </p>

                            <h3 className="text-lg font-medium text-gray-800 mb-2">Account Security</h3>
                            <p className="text-gray-600 leading-relaxed">
                                You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized access or use of your account.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Conduct</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">You agree not to:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                <li>Use the Platform for any unlawful purpose</li>
                                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                                <li>Interfere with or disrupt the Platform's operation</li>
                                <li>Upload malicious code or content</li>
                                <li>Harass, abuse, or harm other users</li>
                                <li>Impersonate others or provide false information</li>
                                <li>Violate any applicable laws or regulations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed">
                                The Platform and its original content, features, and functionality are owned by The Community Path Project and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. User-Generated Content</h2>
                            <p className="text-gray-600 leading-relaxed">
                                You retain ownership of any content you submit to the Platform. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content in connection with operating and improving the Platform.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our Platform may integrate with third-party services (such as Google OAuth). Your use of these services is subject to their respective terms and privacy policies. We are not responsible for the practices of third-party services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
                            <p className="text-gray-600 leading-relaxed">
                                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMMUNITY PATH PROJECT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We may terminate or suspend your account and access to the Platform immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Platform will cease immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We reserve the right to modify these Terms at any time. We will notify users of material changes by posting the updated Terms on this page. Your continued use of the Platform after such changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
                            <p className="text-gray-600 leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of the Republic of Ghana, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
                            <p className="text-gray-600 leading-relaxed">
                                For questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-700 font-medium">The Community Path Project</p>
                                <p className="text-gray-600">Email: legal@communitypathproject.org</p>
                            </div>
                        </section>
                    </div>
                </article>

                {/* Footer links */}
                <div className="mt-8 text-center">
                    <Link to="/privacy-policy" className="text-green-700 hover:text-green-800 font-medium">
                        ← View Privacy Policy
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default TermsOfService;
