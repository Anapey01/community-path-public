import React from 'react';
import { Link } from 'react-router-dom';
import {
    Heart,
    Globe2,
    Users,
    Shield,
    Zap,
    BookOpen,
    ArrowRight,
    CheckCircle2,
    Share2
} from 'lucide-react';

function About() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-green-900 selection:text-white pb-20">
            {/* 1. VISUAL NAV (Simple back link or reuse Home Nav - usually Back for subpages) */}
            <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 group">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-xl italic">C</span>
                    </div>
                    <span className="text-2xl font-serif font-black tracking-tight text-gray-900">
                        COMMUNITY<span className="text-gray-400 font-normal ml-1">PATH</span>
                    </span>
                </Link>
                <Link to="/signup" className="text-sm font-bold text-gray-900 uppercase tracking-widest hover:text-green-700 transition">
                    Join Us
                </Link>
            </nav>

            {/* 2. PREMIUM HERO */}
            <section className="relative px-6 pt-12 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="inline-block text-xs font-black text-green-700 uppercase tracking-[0.3em] mb-6 animate-fade-up">
                        Our Mission & Vision
                    </span>
                    <h1 className="text-4xl md:text-6xl/tight font-serif font-black text-gray-900 mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
                        Turning real community problems into clear education pathways.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
                        We exist to make higher education purposeful and impact‑driven by guiding learners to programs, institutions, and fields of study that align with their interests, strengths, and the societal challenges they want to solve.
                    </p>
                </div>

                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-200/40 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-0 pointer-events-none" />
            </section>

            {/* 3. OUR STORY */}
            <section className="px-6 py-20 bg-white relative">
                <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 relative">
                        {/* Abstract Graphic representing "Confusion" vs "Clarity" */}
                        <div className="relative aspect-square md:aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90" />
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="text-center text-white/80 font-serif text-3xl italic">
                                    "Why are you going to study this program?"
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full" />
                            <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
                        </div>
                        {/* The Clarity Card overlapping */}
                        <div className="absolute -bottom-10 -right-10 bg-green-50 p-8 rounded-3xl shadow-xl max-w-xs hidden md:block border border-green-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <span className="font-bold text-gray-900">Purpose Found</span>
                            </div>
                            <p className="text-sm text-gray-600">Connecting learning to real societal needs.</p>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <span className="inline-block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
                            Origin Story
                        </span>
                        <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 mb-8">
                            A pattern that was hard to ignore.
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                            <p>
                                As the product lead, Gabriel spoke with final‑year SHS students preparing to graduate. When asked a simple question, “Why are you going to study this program?” many could not answer.
                            </p>
                            <p>
                                Some said: <span className="font-serif italic text-gray-900">“I just want to find a program that will get me a job when I complete.”</span> It was honest, yet alarming. Too many students progress through education without clarity.
                            </p>
                            <p>
                                The Community Path was created to slow that moment down; to help learners see university not as an obligation, but as a deliberate tool for purpose, impact, and contribution.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CORE VALUES (Grid) */}
            <section className="px-6 py-24 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-gray-500">The principles that guide every feature we build.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Student‑Centric</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Your goals, interests, and growth come first. We specifically design for your clarity.
                            </p>
                        </div>
                        {/* Value 2 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 transition-transform">
                                <Globe2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Clear guidance should be available to everyone, not just a few.
                            </p>
                        </div>
                        {/* Value 3 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-700 mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Purpose‑Driven</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Education should create real impact, not just credentials.
                            </p>
                        </div>
                        {/* Value 4 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-700 mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We explain pathways clearly, without hidden agendas or bias.
                            </p>
                        </div>
                        {/* Value 5 */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group md:col-span-2">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-700 mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We use technology responsibly to improve decision‑making, combining data with human insight.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TEAM */}
            <section className="px-6 py-20 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-black text-gray-900 mb-4">Meet the Team</h2>
                        <p className="text-gray-500">Multidisciplinary. Passionate. Impact-driven.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Team Member 1 */}
                        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                            <div className="w-full md:w-1/3">
                                <div className="h-32 bg-gray-200 rounded-xl" /> {/* Placeholder for photo */}
                            </div>
                            <div className="w-full md:w-2/3">
                                <h3 className="text-xl font-bold text-gray-900">Founder / Product Lead</h3>
                                <p className="text-gray-500 text-sm mb-3">Gabriel</p>
                                <p className="text-gray-600 text-sm">Drives the vision, user experience, and long‑term strategy.</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Team Member 2 */}
                        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                            <div className="w-full md:w-1/3">
                                <div className="h-32 bg-gray-200 rounded-xl" />
                            </div>
                            <div className="w-full md:w-2/3">
                                <h3 className="text-xl font-bold text-gray-900">Education & Research Lead</h3>
                                <p className="text-gray-600 text-sm">Ensures pathways align with real academic programs and global challenges.</p>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Team Member 3 */}
                        <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                            <div className="w-full md:w-1/3">
                                <div className="h-32 bg-gray-200 rounded-xl" />
                            </div>
                            <div className="w-full md:w-2/3">
                                <h3 className="text-xl font-bold text-gray-900">Technology Lead</h3>
                                <p className="text-gray-600 text-sm">Builds and maintains the platform, AI systems, and data infrastructure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TECHNOLOGY & DATA */}
            <section className="px-6 py-24 bg-gray-900 text-white relative overflow-hidden">
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-8">
                        How it works
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-black mb-12">
                        Guided self‑reflection meets <br /> intelligent matching.
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="font-bold text-xl mb-2">Explore Yourself</h3>
                            <p className="text-gray-400 text-sm">We guide you to articulate your interests, strengths, and the problems you care about.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-4xl mb-4">🤖</div>
                            <h3 className="font-bold text-xl mb-2">AI Matching</h3>
                            <p className="text-gray-400 text-sm">Our system connects your profile to relevant fields of study and university programs.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-4xl mb-4">📍</div>
                            <h3 className="font-bold text-xl mb-2">Clear Pathways</h3>
                            <p className="text-gray-400 text-sm">Get a personalized roadmap that makes your next step obvious and achievable.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FINAL CTA */}
            <section className="px-6 py-24 bg-white text-center">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="text-4xl font-serif font-black text-gray-900 mb-6">
                        Join the Community
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                        Your education journey shouldn’t feel confusing or disconnected from your purpose.
                        <br />
                        The Community Path is built with you in mind.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/signup" className="inline-flex items-center justify-center px-8 py-4 bg-green-700 text-white rounded-full font-bold hover:bg-green-800 transition shadow-lg hover:shadow-green-700/30">
                            Start Your Path <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/" className="inline-flex items-center justify-center px-8 py-4 bg-gray-50 text-gray-900 rounded-full font-bold hover:bg-gray-100 border border-gray-200 transition">
                            Explore Pathways
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER (Simple) */}
            <footer className="py-8 text-center text-gray-400 text-sm bg-gray-50 border-t border-gray-200">
                &copy; {new Date().getFullYear()} The Community Path. All rights reserved.
            </footer>
        </div>
    );
}

export default About;
