import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOnboardingStatus } from '../services/api';
import {
    LayoutDashboard,
    Compass,
    User,
    Map,
    MessageSquare,
    Calendar,
    Settings,
    Bell,
    LogOut,
    Search,
    MapPin,
    Target,
    Edit3,
    X,
    Check,
    Layers,
    Camera,
    Cpu,
    Palette,
    Users,
    Flame,
    Star,
    Flag,
    Quote,
    ArrowRight,
    Activity,
    Shield,
    Moon,
    Smartphone,
    Download,
    Trash2,
    Eye,
    EyeOff,
    Lock,
    Globe,
    Sun,
    Menu
} from 'lucide-react';

function Dashboard() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(null); // null=loading, false=locked, true=unlocked

    useEffect(() => {
        getOnboardingStatus().then(data => setIsOnboardingComplete(data.is_completed));
    }, []);

    // Load saved location from localStorage or use default
    const savedLocation = localStorage.getItem('userCommunity');
    const initialLocation = savedLocation ? JSON.parse(savedLocation) : { name: 'Cape Coast', region: 'Central Region', lat: 5.1315, lng: -1.2795 };

    const [userLocation, setUserLocation] = useState({ lat: initialLocation.lat, lng: initialLocation.lng });
    const [locationName, setLocationName] = useState(`${initialLocation.name}, ${initialLocation.region}`);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Dynamic search with geocoding API
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setIsSearching(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=8&addressdetails=1&viewbox=-26,-35,52,38&bounded=1`
                );
                const data = await response.json();
                const results = data.map(item => ({
                    name: item.address?.city || item.address?.town || item.address?.village || item.name,
                    region: item.address?.state || item.address?.country || '',
                    fullName: item.display_name,
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon)
                }));
                setSearchResults(results);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            }
            setIsSearching(false);
        }, 400); // Debounce 400ms

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Select a community location
    const selectLocation = (place) => {
        setUserLocation({ lat: place.lat, lng: place.lng });
        const displayName = place.region ? `${place.name}, ${place.region}` : place.name;
        setLocationName(displayName);
        localStorage.setItem('userCommunity', JSON.stringify({ ...place, name: place.name, region: place.region }));
        setShowLocationModal(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    // User Profile State (synced with localStorage)
    const [userProfile, setUserProfile] = useState({
        name: localStorage.getItem('username') || 'Alex Rivera',
        username: 'arivera', // Default handle
        bio: 'Passionate about technology and social impact. Looking to combine AI with education policy.',
        location: 'San Francisco, CA'
    });

    // Fallback for backward compatibility with existing code using 'username'
    const username = userProfile.name;

    const handleProfileUpdate = (field, value) => {
        setUserProfile(prev => {
            const newProfile = { ...prev, [field]: value };
            if (field === 'name') localStorage.setItem('username', value);
            return newProfile;
        });
    };

    // Profile picture
    const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || null);
    const fileInputRef = React.useRef(null);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                setProfilePic(base64);
                localStorage.setItem('profilePic', base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        // Only remove auth tokens, keep user activity data
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // Keep: profilePic, activeMenu, location, hasLoggedInBefore, rememberedEmail
        navigate('/');
    };

    // Active menu state - persist to localStorage
    const [activeMenu, setActiveMenu] = useState(
        localStorage.getItem('activeMenu') || 'Dashboard'
    );

    // Save activeMenu when it changes
    useEffect(() => {
        localStorage.setItem('activeMenu', activeMenu);
    }, [activeMenu]);

    // Navigation menu items (simplified for clutter-free navigation)
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: Compass, label: 'Purpose Compass' },
        { icon: User, label: 'Profile' },
        { icon: MessageSquare, label: 'Inbox' },
        { icon: Settings, label: 'Settings' },
    ];

    // --- ACTIVITY PERSISTENCE: JOURNEY PROGRESS ---
    // Track visited sections to calculate "Journey Progress"
    const [visitedSections, setVisitedSections] = useState(
        JSON.parse(localStorage.getItem('visitedSections')) || ['Dashboard']
    );

    // --- PATHWAY VISUALIZER STATE ---
    const [activeCategory, setActiveCategory] = useState(null);

    // --- SETTINGS STATE ---
    const [activeSettingsTab, setActiveSettingsTab] = useState('account');

    // --- TOAST STATE ---
    const [toast, setToast] = useState(null); // { message, type: 'success'|'error' }

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // --- THEME STATE ---
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'Light');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'Dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        showToast(`${newTheme} mode activated`);
    };

    // --- NOTIFICATION STATE ---
    const [notifications, setNotifications] = useState({
        'Mentorship Requests': true,
        'New Pathways Found': true,
        'Community Updates': false,
        'Marketing Emails': false
    });

    const toggleNotification = (key) => {
        setNotifications(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            showToast(`${key} turned ${newState[key] ? 'On' : 'Off'}`);
            return newState;
        });
    };

    // --- NOTIFICATION DROPDOWN STATE ---
    const [showNotifications, setShowNotifications] = useState(false);
    const [alerts, setAlerts] = useState([
        { id: 1, title: 'New Badge Earned', message: 'You unlocked "Early Adopter"', time: '2m ago', read: false },
        { id: 2, title: 'Mentorship Request', message: 'Sarah K. wants to connect', time: '1h ago', read: false },
        { id: 3, title: 'Goal Reached', message: 'Profile completion at 80%', time: '1d ago', read: true }
    ]);

    const markAsRead = (id) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
    };

    // --- HUMAN-CENTRIC DATA ---
    const mentorSpotlight = {
        name: "Dr. Elena Rodriguez",
        role: "Chief Innovation Officer at EduTech Globals",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
        quote: "Don't just collect skills. Build things that matter. Your portfolio is your new degree.",
        topic: "Career Strategy"
    };

    const communityBuzz = [
        { id: 1, user: "Marcus Chen", action: "deployed a new project", target: "EcoTracker App", time: "2 min ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
        { id: 2, user: "Sarah Miller", action: "earned a certification", target: "React Advanced", time: "15 min ago", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
        { id: 3, user: "Priya Patel", action: "is looking for a team", target: "Hackathon 2024", time: "1 hr ago", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" }
    ];

    // Calculate progress based on activities
    const calculateProgress = () => {
        let score = 0;
        // 1. Visited Sections (Max 50%)
        const trackableSections = ['Purpose Compass', 'Profile Insights', 'Pathway Matching', 'Messages', 'Schedule'];
        const visitedCount = trackableSections.filter(s => visitedSections.includes(s)).length;
        score += visitedCount * 10;

        // 2. Profile Picture (20%)
        if (profilePic) score += 20;

        // 3. Location Selected (10%) - (Assuming default is set, but if they changed it... lets just give 10% base)
        score += 10;

        // 4. Base (20%)
        score += 20;

        return Math.min(score, 100);
    };

    const progressPercentage = calculateProgress();

    // Update visited sections when activeMenu changes
    useEffect(() => {
        if (!visitedSections.includes(activeMenu)) {
            const newVisited = [...visitedSections, activeMenu];
            setVisitedSections(newVisited);
            localStorage.setItem('visitedSections', JSON.stringify(newVisited));
        }
    }, [activeMenu, visitedSections]);

    // Render content based on active menu
    const renderContent = () => {
        switch (activeMenu) {
            case 'Dashboard':
                return (

                    <div className="animate-slide-up space-y-6">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
                                    Welcome back, <br />
                                    <span className="text-gray-900">
                                        {username}!
                                    </span>
                                </h1>
                                <p className="text-gray-500 mt-3 text-lg font-medium">Ready to continue your journey?</p>
                            </div>
                        </div>

                        {/* --- MORNING BRIEFING GRID --- */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                            {/* COL 1: MOMENTUM (Stats Re-imagined) - Span 4 */}
                            <div className="lg:col-span-4 space-y-6">
                                {/* Focus Card */}
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[180px] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                        <Target className="w-32 h-32" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2 opacity-80">
                                            <Flame className="w-4 h-4 text-orange-400" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Current Momentum</span>
                                        </div>
                                        <h3 className="text-2xl font-bold leading-tight mb-1">12 Day Streak</h3>
                                        <p className="text-gray-400 text-sm">You're consistent! Keep it up to earn the "Disciplined" badge.</p>
                                    </div>
                                    <div className="relative z-10 mt-4">
                                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                                            View Progress
                                        </button>
                                    </div>
                                </div>

                                {/* Skills / Next Step Split */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-3xl hover:border-blue-200 transition">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">5</p>
                                        <p className="text-xs font-semibold text-gray-500">New Skills</p>
                                    </div>
                                    <div className="bg-purple-50/50 border border-purple-100 p-5 rounded-3xl hover:border-purple-200 transition">
                                        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
                                            <Flag className="w-5 h-5 fill-current" />
                                        </div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Next Goal</p>
                                        <p className="text-sm font-bold text-gray-900 leading-tight">Complete Profile</p>
                                    </div>
                                </div>
                            </div>

                            {/* COL 2: MENTOR HIGHLIGHT (Quote Re-imagined) - Span 5 */}
                            <div className="lg:col-span-5">
                                <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 h-full flex flex-col relative group hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex gap-4">
                                            <img src={mentorSpotlight.image} alt={mentorSpotlight.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
                                            <div>
                                                <h3 className="font-bold text-gray-900 leading-tight">{mentorSpotlight.name}</h3>
                                                <p className="text-xs text-gray-500 font-medium max-w-[150px]">{mentorSpotlight.role}</p>
                                            </div>
                                        </div>
                                        <span className="bg-gray-50 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-100 uppercase tracking-wide">
                                            {mentorSpotlight.topic}
                                        </span>
                                    </div>

                                    <div className="flex-1">
                                        <Quote className="w-8 h-8 text-gray-200 mb-4" />
                                        <blockquote className="text-xl font-medium text-gray-900 leading-relaxed">
                                            "{mentorSpotlight.quote}"
                                        </blockquote>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <p className="text-xs text-gray-400 font-medium">Daily advice from industry leaders</p>
                                        <button
                                            onClick={() => showToast('Redirecting to EduTech Insights...', 'success')}
                                            className="text-sm font-bold text-gray-900 hover:underline"
                                        >
                                            Read full article
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* COL 3: COMMUNITY BUZZ (List Re-imagined) - Span 3 */}
                            <div className="lg:col-span-3">
                                <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 h-full flex flex-col hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-gray-900">Happening Now</h3>
                                        <div className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </div>
                                    </div>

                                    <div className="space-y-6 relative">
                                        {/* Vertical line connecting items */}
                                        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-50"></div>

                                        {communityBuzz.map((buzz) => (
                                            <div key={buzz.id} className="relative pl-10">
                                                <div className="absolute left-0 top-0">
                                                    <img src={buzz.avatar} alt={buzz.user} className="w-8 h-8 rounded-full border-2 border-white shadow-sm z-10 relative" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-900 leading-snug">
                                                        <span className="font-bold">{buzz.user}</span> {buzz.action} <span className="text-blue-600 font-medium">{buzz.target}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1 font-medium">{buzz.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-6">
                                        <button
                                            onClick={() => setActiveMenu('Messages')}
                                            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
                                        >
                                            Join the conversation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Purpose Compass':
                return (
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                                <Compass className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-serif font-black text-gray-900">Purpose Compass</h1>
                                <p className="text-gray-500">Discover your direction and life goals</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3">What drives you?</h3>
                            <p className="text-gray-600 mb-4">Understanding your core motivations helps us guide you to the right path.</p>
                            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">Start Assessment</button>
                        </div>
                    </div>
                );
            case 'Profile Insights':
                const skills = [
                    { name: 'Technical', value: 80, angle: 0 },
                    { name: 'Creative', value: 65, angle: 72 },
                    { name: 'Leadership', value: 70, angle: 144 },
                    { name: 'Communication', value: 90, angle: 216 },
                    { name: 'Problem Solving', value: 85, angle: 288 },
                ];

                // Calculate polygon points
                const center = 100;
                const scale = 0.8;
                const points = skills.map(skill => {
                    const r = (skill.value / 100) * center * scale;
                    const x = center + r * Math.cos(skill.angle * Math.PI / 180);
                    const y = center + r * Math.sin(skill.angle * Math.PI / 180);
                    return `${x},${y}`;
                }).join(' ');

                return (
                    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-gray-900">Profile Insights</h1>
                                <p className="text-sm text-gray-500">Your unique professional fingerprint</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Radar Chart Card */}
                            <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                                <h3 className="absolute top-6 left-6 font-bold text-gray-900">Skill Analysis</h3>
                                <div className="w-64 h-64 relative">
                                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 drop-shadow-xl">
                                        {/* Background Circles */}
                                        {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (
                                            <circle key={i} cx="100" cy="100" r={100 * 0.8 * r} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                                        ))}
                                        {/* Axes */}
                                        {skills.map((skill, i) => {
                                            const x = 100 + 80 * Math.cos(skill.angle * Math.PI / 180);
                                            const y = 100 + 80 * Math.sin(skill.angle * Math.PI / 180);
                                            return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
                                        })}
                                        {/* Data Polygon */}
                                        <polygon points={points} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                                        {/* Data Points */}
                                        {skills.map((skill, i) => {
                                            const r = (skill.value / 100) * 100 * 0.8;
                                            const x = 100 + r * Math.cos(skill.angle * Math.PI / 180);
                                            const y = 100 + r * Math.sin(skill.angle * Math.PI / 180);
                                            return (
                                                <g key={i} className="group cursor-pointer">
                                                    <circle cx={x} cy={y} r="4" fill="white" stroke="#3b82f6" strokeWidth="2" className="transition-all group-hover:r-6" />
                                                    {/* Tooltip (Fixed rotation) */}
                                                    <g transform={`rotate(90, ${x}, ${y})`}>
                                                        <rect x={x - 40} y={y - 35} width="80" height="25" rx="4" fill="#1e293b" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <text x={x} y={y - 18} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {skill.name}: {skill.value}%
                                                        </text>
                                                    </g>
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="space-y-6">
                                <div className="glass-card rounded-2xl p-6">
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Primary Archetype</p>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Strategic Innovator</h3>
                                    <p className="text-sm text-gray-600">
                                        You balance strong technical capabilities with a creative approach to problem-solving. This makes you ideal for leadership roles in tech.
                                    </p>
                                </div>
                                <div className="glass-card rounded-2xl p-6">
                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Recommended Focus</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                            Deepen system architecture knowledge
                                        </li>
                                        <li className="flex items-center gap-3 text-sm text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                            Explore public speaking opportunities
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Pathway Matching':
                return (
                    // "Remove the plate" -> No bg-slate-900, No border, No shadow. Transparent container.
                    <div className="animate-fade-in w-full h-[600px] relative overflow-hidden flex items-center justify-center p-8">

                        {/* No inner grid - we use the main Dashboard grid */}

                        {/* Glow effect adapted for Light Mode (Subtle tint) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] animate-pulse"></div>

                        {/* --- VISUALIZER CANVAS --- */}
                        <div className="relative w-full max-w-4xl h-full">

                            {/* SVG LAYER FOR CONNECTIONS */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
                                    </linearGradient>
                                </defs>

                                {/* Lines to Main Clusters - Darker stroke for Visibility on Light BG */}
                                {/* Center to Top-Left */}
                                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="url(#grad1)" strokeWidth="2"
                                    className={`transition-all duration-500 ${activeCategory === 'creative' ? 'stroke-blue-600 stroke-[3px] opacity-100' : 'opacity-20 grayscale'}`} />

                                {/* Center to Top-Right */}
                                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="url(#grad1)" strokeWidth="2"
                                    className={`transition-all duration-500 ${activeCategory === 'tech' ? 'stroke-purple-600 stroke-[3px] opacity-100' : 'opacity-20 grayscale'}`} />

                                {/* Center to Bottom */}
                                <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="url(#grad1)" strokeWidth="2"
                                    className={`transition-all duration-500 ${activeCategory === 'social' ? 'stroke-green-600 stroke-[3px] opacity-100' : 'opacity-20 grayscale'}`} />

                                {/* DYNAMIC SUB-LINES */}
                                {activeCategory === 'tech' && (
                                    <>
                                        <line x1="75%" y1="25%" x2="85%" y2="15%" stroke="#9333ea" strokeWidth="2" className="animate-dash" strokeDasharray="5" />
                                        <line x1="75%" y1="25%" x2="85%" y2="35%" stroke="#9333ea" strokeWidth="2" className="animate-dash" strokeDasharray="5" />
                                    </>
                                )}
                                {activeCategory === 'creative' && (
                                    <>
                                        <line x1="25%" y1="25%" x2="15%" y2="15%" stroke="#2563eb" strokeWidth="2" className="animate-dash" strokeDasharray="5" />
                                        <line x1="25%" y1="25%" x2="15%" y2="35%" stroke="#2563eb" strokeWidth="2" className="animate-dash" strokeDasharray="5" />
                                    </>
                                )}
                                {activeCategory === 'social' && (
                                    <>
                                        <line x1="50%" y1="80%" x2="40%" y2="90%" stroke="#16a34a" strokeWidth="2" className="animate-dash" strokeDasharray="5" />
                                        <line x1="50%" y1="80%" x2="60%" y2="90%" stroke="#16a34a" strokeWidth="2" className="animate-dash" strokeDasharray="5" />
                                    </>
                                )}
                            </svg>

                            {/* NODES LAYER */}

                            {/* 1. CENTRAL USER NODE - Keeps Dark Tech Look for Contrast */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                                <div className="relative group cursor-pointer">
                                    <div className="w-20 h-20 rounded-full bg-gray-900 border-4 border-gray-800 shadow-xl flex items-center justify-center overflow-hidden z-20 relative transition-transform duration-300 group-hover:scale-110">
                                        {profilePic ? (
                                            <img src={profilePic} alt="Me" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-8 h-8 text-gray-400" />
                                        )}
                                    </div>
                                    {/* Pulse Ring */}
                                    <div className="absolute inset-0 rounded-full border border-gray-900/30 scale-125 opacity-0 animate-[pulse-ring_3s_infinite]"></div>
                                    <div className="mt-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200 text-gray-900 text-xs font-black tracking-widest shadow-sm">
                                        YOU
                                    </div>
                                </div>
                            </div>

                            {/* 2. TECH CLUSTER */}
                            <div
                                className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer group"
                                onMouseEnter={() => setActiveCategory('tech')}
                            >
                                <div className={`w-18 h-18 p-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${activeCategory === 'tech' ? 'bg-purple-600 scale-110 shadow-purple-500/40' : 'bg-white border-2 border-gray-100 group-hover:border-purple-200'}`}>
                                    <Cpu className={`w-8 h-8 ${activeCategory === 'tech' ? 'text-white' : 'text-purple-600'}`} />
                                </div>
                                <span className={`mt-3 text-sm font-bold px-3 py-1 rounded-full backdrop-blur transition-colors ${activeCategory === 'tech' ? 'bg-purple-100 text-purple-900' : 'bg-white/60 text-gray-600'}`}>
                                    Technology
                                </span>

                                {activeCategory === 'tech' && (
                                    <>
                                        <div className="absolute top-[-50px] right-[-80px] animate-fade-up">
                                            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">AI Engineer</div>
                                        </div>
                                        <div className="absolute bottom-[-50px] right-[-80px] animate-fade-up [animation-delay:100ms]">
                                            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">Data Scientist</div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* 3. CREATIVE CLUSTER */}
                            <div
                                className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer group"
                                onMouseEnter={() => setActiveCategory('creative')}
                            >
                                <div className={`w-18 h-18 p-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${activeCategory === 'creative' ? 'bg-blue-600 scale-110 shadow-blue-500/40' : 'bg-white border-2 border-gray-100 group-hover:border-blue-200'}`}>
                                    <Palette className={`w-8 h-8 ${activeCategory === 'creative' ? 'text-white' : 'text-blue-600'}`} />
                                </div>
                                <span className={`mt-3 text-sm font-bold px-3 py-1 rounded-full backdrop-blur transition-colors ${activeCategory === 'creative' ? 'bg-blue-100 text-blue-900' : 'bg-white/60 text-gray-600'}`}>
                                    Creative
                                </span>

                                {activeCategory === 'creative' && (
                                    <>
                                        <div className="absolute top-[-50px] left-[-80px] animate-fade-up">
                                            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">UX Designer</div>
                                        </div>
                                        <div className="absolute bottom-[-50px] left-[-80px] animate-fade-up [animation-delay:100ms]">
                                            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">Digital Artist</div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* 4. SOCIAL CLUSTER */}
                            <div
                                className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center cursor-pointer group"
                                onMouseEnter={() => setActiveCategory('social')}
                            >
                                <div className={`w-18 h-18 p-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${activeCategory === 'social' ? 'bg-green-600 scale-110 shadow-green-500/40' : 'bg-white border-2 border-gray-100 group-hover:border-green-200'}`}>
                                    <Users className={`w-8 h-8 ${activeCategory === 'social' ? 'text-white' : 'text-green-600'}`} />
                                </div>
                                <span className={`mt-3 text-sm font-bold px-3 py-1 rounded-full backdrop-blur transition-colors ${activeCategory === 'social' ? 'bg-green-100 text-green-900' : 'bg-white/60 text-gray-600'}`}>
                                    Social Impact
                                </span>

                                {activeCategory === 'social' && (
                                    <>
                                        <div className="absolute bottom-[-50px] left-[-80px] animate-fade-up">
                                            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">Public Health</div>
                                        </div>
                                        <div className="absolute bottom-[-50px] right-[-80px] animate-fade-up [animation-delay:100ms]">
                                            <div className="bg-gray-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">Education Policy</div>
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                );
            case 'Messages':
                return (
                    <div className="animate-fade-in max-w-4xl mx-auto h-[600px] bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden flex">
                        {/* Sidebar List */}
                        <div className="w-80 border-r border-gray-100 bg-gray-50 flex flex-col">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-bold text-gray-900">Messages</h2>
                                <button className="p-2 hover:bg-gray-200 rounded-full transition"><Edit3 className="w-4 h-4 text-gray-600" /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                                {[
                                    { name: "Sarah Miller", msg: "Hey! Keep going with React!", time: "2m", active: true, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
                                    { name: "Dr. Elena Rodriguez", msg: "Your latest project looks great.", time: "1d", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" },
                                    { name: "Marcus Chen", msg: "Thanks for the feedback.", time: "2d", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" }
                                ].map((chat, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${chat.active ? 'bg-white shadow-sm ring-1 ring-gray-100' : 'hover:bg-gray-100'}`}>
                                        <div className="relative">
                                            <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover" />
                                            {chat.active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h3 className="text-sm font-bold text-gray-900 truncate">{chat.name}</h3>
                                                <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{chat.msg}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="flex-1 flex flex-col bg-white">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" className="w-10 h-10 rounded-full object-cover" />
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 leading-tight">Sarah Miller</h3>
                                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Online
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900"><Smartphone className="w-4 h-4" /></button>
                                    <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900"><Star className="w-4 h-4" /></button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50/30">
                                <div className="flex justify-center">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Today</span>
                                </div>

                                <div className="flex gap-3">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" className="w-8 h-8 rounded-full border border-white mt-1" />
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-sm">
                                        <p className="text-sm text-gray-600">Hi! I saw you just started the React path. Let me know if you need any help with Hooks! ⚛️</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 flex-row-reverse">
                                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-bold mt-1">ME</div>
                                    <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none shadow-lg shadow-blue-500/20 max-w-sm">
                                        <p className="text-sm text-white">Hey Sarah! That would be amazing. I'm actually stuck on useEffect right now.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" className="w-8 h-8 rounded-full border border-white mt-1" />
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-sm">
                                        <p className="text-sm text-gray-600">No worries! It's tricky at first. Think of it as a way to sync your component with an external system.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" className="w-8 h-8 rounded-full border border-white mt-1" />
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-sm">
                                        <p className="text-sm text-gray-600">Hey! Keep going with React!</p>
                                    </div>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <form onSubmit={(e) => { e.preventDefault(); showToast("Message sent!", "success"); }} className="flex gap-2">
                                    <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 transition" />
                                    <button type="submit" className="bg-gray-900 text-white p-3 rounded-xl hover:bg-gray-800 transition shadow-lg"><ArrowRight className="w-4 h-4" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            case 'Schedule':
                return (
                    <div className="animate-fade-in max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-serif font-black text-gray-900">Schedule</h1>
                                <p className="text-gray-500">Your upcoming sessions and deadlines</p>
                            </div>
                        </div>
                        <div className="glass-card rounded-2xl p-6 text-center">
                            <p className="text-gray-600">No upcoming events. Schedule a mentorship session!</p>
                        </div>
                    </div>
                );
            case 'Settings':
                return (
                    <div className="animate-fade-in max-w-5xl mx-auto min-h-[600px] flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* LEFT COLUMN: Navigation */}
                        <div className="w-full md:w-64 glass-card rounded-2xl p-4 flex flex-col gap-2 h-auto md:h-full shrink-0">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Settings</h2>

                            {[
                                { id: 'account', label: 'Account', icon: User },
                                { id: 'security', label: 'Security', icon: Shield },
                                { id: 'notifications', label: 'Notifications', icon: Bell },
                                { id: 'appearance', label: 'Appearance', icon: Moon },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveSettingsTab(tab.id)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                        ${activeSettingsTab === tab.id
                                            ? 'bg-gray-900 text-white shadow-lg shadow-gray-200'
                                            : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}

                            <div className="mt-auto border-t border-gray-100 pt-4">
                                <button
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                                            showToast('Account scheduled for deletion', 'error');
                                        }
                                    }}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Content Area */}
                        <div className="flex-1 glass-card rounded-2xl p-8 overflow-y-auto">
                            {/* ACCOUNT TAB */}
                            {activeSettingsTab === 'account' && (
                                <div className="animate-slide-up space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-serif font-black text-gray-900 mb-1">Account Settings</h2>
                                        <p className="text-gray-500">Manage your profile details and personal information</p>
                                    </div>

                                    {/* Profile Form */}
                                    <div className="space-y-6">
                                        <div className="flex gap-6">
                                            <div className="flex-1 space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={userProfile.name}
                                                    onChange={(e) => handleProfileUpdate('name', e.target.value)}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Username</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">@</span>
                                                    <input
                                                        type="text"
                                                        value={userProfile.username}
                                                        onChange={(e) => handleProfileUpdate('username', e.target.value)}
                                                        className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900 bg-gray-50/50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Bio</label>
                                            <textarea
                                                rows="3"
                                                value={userProfile.bio}
                                                onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all text-gray-700 resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Location</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={userProfile.location}
                                                    onChange={(e) => handleProfileUpdate('location', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all font-medium text-gray-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex justify-end">
                                            <button
                                                onClick={() => showToast('Profile updated successfully!')}
                                                className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:bg-gray-800 transition transform hover:-translate-y-0.5"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECURITY TAB */}
                            {activeSettingsTab === 'security' && (
                                <div className="animate-slide-up space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-serif font-black text-gray-900 mb-1">Security</h2>
                                        <p className="text-gray-500">Protect your account and monitor activity</p>
                                    </div>

                                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 text-orange-800">
                                        <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-bold mb-1">Two-Factor Authentication is Off</p>
                                            <p className="opacity-80">Enable 2FA to add an extra layer of security to your account.</p>
                                        </div>
                                        <button onClick={() => showToast('2FA setup sent to email')} className="ml-auto text-sm font-bold underline hover:text-orange-900">Enable</button>
                                    </div>

                                    {/* Password Change */}
                                    <div className="space-y-6 pt-4 border-t border-gray-100">
                                        <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                                        <div className="space-y-4 max-w-md">
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input type="password" placeholder="Current Password" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all" />
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input type="password" placeholder="New Password" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all" />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => showToast('Password updated successfully!')}
                                            className="text-sm font-bold text-gray-900 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Update Password
                                        </button>
                                    </div>

                                    {/* Active Sessions */}
                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <h3 className="text-lg font-bold text-gray-900">Active Sessions</h3>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                                                    <Globe className="w-5 h-5 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">Chrome on Windows</p>
                                                    <p className="text-xs text-gray-500">San Francisco, US • Active now</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
                                                Current
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* NOTIFICATIONS TAB */}
                            {activeSettingsTab === 'notifications' && (
                                <div className="animate-slide-up space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-serif font-black text-gray-900 mb-1">Notifications</h2>
                                        <p className="text-gray-500">Choose what updates you want to receive</p>
                                    </div>

                                    <div className="space-y-2">
                                        {Object.keys(notifications).map((item) => (
                                            <div key={item} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition">
                                                <span className="font-medium text-gray-900">{item}</span>
                                                <button
                                                    onClick={() => toggleNotification(item)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${notifications[item] ? 'bg-gray-900' : 'bg-gray-200'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition border border-gray-100 shadow-sm ${notifications[item] ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* APPEARANCE TAB */}
                            {activeSettingsTab === 'appearance' && (
                                <div className="animate-slide-up space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 mb-1">Appearance</h2>
                                        <p className="text-gray-500">Customize your interface experience</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { id: 'Light', icon: Sun },
                                            { id: 'Dark', icon: Moon },
                                            { id: 'System', icon: Globe } // Using Globe as placeholder for System
                                        ].map((mode) => (
                                            <button
                                                key={mode.id}
                                                onClick={() => handleThemeChange(mode.id)}
                                                className={`p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-3 ${theme === mode.id ? 'border-gray-900 bg-gray-900 text-white shadow-lg' : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
                                            >
                                                <mode.icon className={`w-6 h-6 ${theme === mode.id ? 'text-white' : 'text-gray-400'}`} />
                                                <span className="font-bold text-sm">{mode.id}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-blue-800">
                                        <div className="flex-shrink-0 mt-0.5"><Star className="w-5 h-5 text-blue-600" /></div>
                                        <p className="text-sm">Dark mode is currently in beta. Some elements may not fully support it yet.</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Dashboard search
    const [dashboardSearch, setDashboardSearch] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    // Searchable items
    const searchableItems = [
        { label: 'Dashboard', icon: LayoutDashboard, type: 'page' },
        { label: 'Purpose Compass', icon: Compass, type: 'page' },
        { label: 'Profile Insights', icon: User, type: 'page' },
        { label: 'Pathway Matching', icon: Layers, type: 'page' },
        { label: 'Messages', icon: MessageSquare, type: 'page' },
        { label: 'Schedule', icon: Calendar, type: 'page' },
        { label: 'Settings', icon: Settings, type: 'page' },
        { label: 'Find career paths', icon: Compass, type: 'action' },
        { label: 'Update profile', icon: User, type: 'action' },
        { label: 'View community', icon: MapPin, type: 'action' },
    ];

    const filteredSearch = dashboardSearch.trim()
        ? searchableItems.filter(item =>
            item.label.toLowerCase().includes(dashboardSearch.toLowerCase())
        )
        : [];

    const handleSearchKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredSearch.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            // Handle selection
            setDashboardSearch('');
            setSearchFocused(false);
            setSelectedIndex(-1);
        } else if (e.key === 'Escape') {
            setSearchFocused(false);
            setSelectedIndex(-1);
        }
    };

    // Interactive grid cell hover effect
    const [hoverCell, setHoverCell] = useState(null);
    const mainRef = React.useRef(null);
    const GRID_SIZE = 40;

    const handleGridHover = (e) => {
        if (!mainRef.current) return;
        const rect = mainRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Snap to grid
        const gridX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
        const gridY = Math.floor(y / GRID_SIZE) * GRID_SIZE;

        setHoverCell({ x: gridX, y: gridY });
    };

    const handleGridLeave = () => {
        setHoverCell(null);
    };

    return (
        <div className="flex min-h-screen bg-white font-sans">
            {/* --- LOCKED DASHBOARD OVERLAY --- */}
            {isOnboardingComplete === false && (
                <div className="fixed inset-0 z-[100] bg-gray-900/40 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl p-10 max-w-lg w-full shadow-2xl text-center border border-gray-100 relative overflow-hidden">
                        {/* Visual Flair */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                                <Compass className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-serif font-black text-gray-900 mb-4 tracking-tight">
                                Orientation<br />Required
                            </h2>
                            <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                                Welcome to The Community Path. <br />
                                To unlock your dashboard, please watch the vision statement and align your goals.
                            </p>
                            <button
                                onClick={() => navigate('/onboarding')}
                                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 group text-lg"
                            >
                                Begin Orientation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MOBILE OVERLAY --- */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* --- LEFT SIDEBAR --- */}
            <aside className={`w-64 bg-white flex flex-col min-h-screen fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300 border-r border-gray-100 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo with LED Scrolling Animation */}
                <div className="p-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xl italic">C</span>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
                                COMMUNITY<span className="text-blue-600">PATH</span>
                            </h1>
                        </div>
                    </Link>
                </div>

                {/* White Line Separator */}
                <div className="mx-4 border-t border-white/20"></div>

                {/* Navigation Menu */}
                <nav className="flex-1 py-6 px-4 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={() => setActiveMenu(item.label)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${activeMenu === item.label
                                        ? 'bg-gray-900 text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${activeMenu === item.label ? 'text-white' : 'text-gray-400'}`} />
                                    <span className="font-medium text-sm">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Branding */}
                <div className="p-4">
                    <p className="text-xs text-gray-400 text-center">© 2025 Community Path</p>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA with dynamic grid --- */}
            <main
                ref={mainRef}
                onMouseMove={handleGridHover}
                onMouseLeave={handleGridLeave}
                className="flex-1 lg:ml-64 lg:mr-80 min-h-screen relative overflow-hidden transition-all duration-300"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                        linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            >
                {/* Subtle hover highlight */}
                {/* White background for professional look */}
                <div className="absolute inset-0 bg-gray-50 -z-10"></div>

                {/* Top Header Bar */}
                <header className="bg-white/90 backdrop-blur-sm px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-40 border-b border-gray-100">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Professional Search Bar */}
                    <div className="relative flex-1 max-w-lg">
                        <div className={`relative transition-all duration-200 ${searchFocused ? 'scale-[1.02]' : ''}`}>
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${searchFocused ? 'text-gray-900' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search pages, actions, or features..."
                                value={dashboardSearch}
                                onChange={(e) => { setDashboardSearch(e.target.value); setSelectedIndex(-1); }}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                                onKeyDown={handleSearchKeyDown}
                                className={`w-full pl-12 pr-10 py-3 bg-white border rounded-xl text-sm transition-all duration-200
                                    ${searchFocused
                                        ? 'border-gray-900 ring-2 ring-gray-900/10 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'}
                                    focus:outline-none`}
                            />
                            {dashboardSearch && (
                                <button
                                    onClick={() => { setDashboardSearch(''); setSelectedIndex(-1); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Search Dropdown */}
                        {searchFocused && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                {dashboardSearch.trim() ? (
                                    filteredSearch.length > 0 ? (
                                        <ul className="py-2">
                                            {filteredSearch.map((item, index) => (
                                                <li key={item.label}>
                                                    <button
                                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition
                                                            ${selectedIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                                        onMouseEnter={() => setSelectedIndex(index)}
                                                        onClick={() => {
                                                            setDashboardSearch('');
                                                            setSearchFocused(false);
                                                            setSelectedIndex(-1);
                                                        }}
                                                    >
                                                        <item.icon className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-900">{item.label}</span>
                                                        <span className="ml-auto text-xs text-gray-400 capitalize">{item.type}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="py-8 text-center text-sm text-gray-400">
                                            No results for "{dashboardSearch}"
                                        </div>
                                    )
                                ) : (
                                    <div className="py-4 px-4">
                                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Quick Actions</p>
                                        <div className="space-y-1">
                                            {searchableItems.slice(0, 4).map((item) => (
                                                <button
                                                    key={item.label}
                                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition text-left"
                                                    onClick={() => {
                                                        setSearchFocused(false);
                                                    }}
                                                >
                                                    <item.icon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-700">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Keyboard hint */}
                                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                                    <span><kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-500">↑↓</kbd> Navigate</span>
                                    <span><kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-500">↵</kbd> Select</span>
                                    <span><kbd className="px-1.5 py-0.5 bg-white border rounded text-gray-500">Esc</kbd> Close</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-6">
                        <Link to="/pathways" className="hidden lg:flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition">
                            Explore Paths <ArrowRight className="w-4 h-4" />
                        </Link>

                        {/* Notification Center */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`relative p-2 rounded-full transition ${showNotifications ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                <Bell className="w-5 h-5" />
                                {alerts.some(a => !a.read) && (
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                                )}
                            </button>

                            {/* Dropdown Panel */}
                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-4 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-slide-up origin-top-right ring-1 ring-black/5">
                                    <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                                        <h3 className="font-bold text-sm text-gray-900">Notifications</h3>
                                        <button className="text-xs text-blue-600 font-medium hover:underline">Mark all read</button>
                                    </div>
                                    <div className="max-h-[20rem] overflow-y-auto custom-scrollbar">
                                        {alerts.map((alert) => (
                                            <div
                                                key={alert.id}
                                                onClick={() => markAsRead(alert.id)}
                                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer flex gap-4 ${!alert.read ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!alert.read ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                                                <div>
                                                    <p className={`text-sm ${!alert.read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{alert.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{alert.message}</p>
                                                    <p className="text-[10px] text-gray-400 mt-2 font-medium">{alert.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 text-center bg-gray-50/50">
                                        <button className="text-xs text-gray-500 font-bold hover:text-gray-900 uppercase tracking-wide">View History</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="p-8">
                    {renderContent()}
                </div>
            </main>

            {/* --- RIGHT SIDEBAR (Profile & Calendar) --- */}
            <aside className="hidden lg:block w-80 bg-white fixed right-0 top-0 bottom-0 overflow-y-auto border-l border-gray-100">
                {/* Top Bar with Notification & Logout */}
                <div className="p-4 flex items-center justify-end gap-3">
                    {/* Notifications */}
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>

                {/* User Profile Card */}
                <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                        {/* Clickable Profile Picture */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleProfilePicChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="relative group mb-4"
                            title="Click to change profile picture"
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-gray-400">
                                {profilePic ? (
                                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-gray-500" />
                                )}
                            </div>
                            {/* Camera overlay on hover */}
                            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{username}</h3>
                        <p className="text-gray-500 text-sm">student@communitypath.org</p>
                    </div>
                </div>

                {/* Journey Progress */}
                <div className="px-6 pb-6">
                    {/* Progress Indicator */}
                    <div className="mb-5">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-medium text-gray-700">Journey Progress</span>
                            <span className="text-xs text-gray-400">{progressPercentage}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Stage Card */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 mb-4">
                        <div className="w-9 h-9 bg-gray-900 rounded-md flex items-center justify-center">
                            <Compass className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[11px] text-gray-400 uppercase tracking-wide">Stage</p>
                            <p className="text-sm font-semibold text-gray-900">Explorer</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-2 mb-5">
                        <div className="flex-1 p-3 rounded-lg bg-gray-50 text-center">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-bold text-gray-900">0</span>
                            </div>
                            <p className="text-[10px] text-gray-400">Paths</p>
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-gray-50 text-center">
                            <div className="flex items-center justify-center gap-1 mb-0.5">
                                <Target className="w-3 h-3 text-gray-400" />
                                <span className="text-lg font-bold text-gray-900">0</span>
                            </div>
                            <p className="text-[10px] text-gray-400">Skills</p>
                        </div>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                        Begin Discovery
                    </button>
                </div>

                {/* My Community */}
                <div className="px-6 pb-6">
                    <p className="text-xs text-gray-500 mb-3">My Community</p>

                    {/* Google Maps - Satellite view with terrain */}
                    <div className="rounded-lg overflow-hidden mb-3 border border-gray-100" style={{ height: '150px' }}>
                        <iframe
                            title="Community Location"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=16&t=k&output=embed`}
                        />
                    </div>

                    {/* Location with Edit */}
                    <button
                        onClick={() => setShowLocationModal(true)}
                        className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                    >
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="flex-1 text-left text-sm font-medium text-gray-900 truncate">
                            {locationName}
                        </span>
                        <Edit3 className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500" />
                    </button>
                </div>

                {/* Location Selection Modal */}
                {
                    showLocationModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl">
                                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900">Select Your Community</h3>
                                    <button
                                        onClick={() => { setShowLocationModal(false); setSearchQuery(''); }}
                                        className="p-1.5 hover:bg-gray-100 rounded-md"
                                    >
                                        <X className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>

                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                                        <Search className="w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search any location..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                                            autoFocus
                                        />
                                        {isSearching && (
                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                        )}
                                    </div>
                                </div>

                                <div className="max-h-64 overflow-y-auto">
                                    {!searchQuery.trim() && (
                                        <p className="text-center text-sm text-gray-400 py-8">
                                            Type to search for any location
                                        </p>
                                    )}
                                    {searchQuery.trim() && searchResults.length === 0 && !isSearching && (
                                        <p className="text-center text-sm text-gray-400 py-8">
                                            No locations found
                                        </p>
                                    )}
                                    {searchResults.map((place, index) => (
                                        <button
                                            key={`${place.lat}-${place.lng}-${index}`}
                                            onClick={() => selectLocation(place)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
                                        >
                                            <MapPin className="w-4 h-4 text-gray-300 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{place.region}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </aside>
            {/* TOAST NOTIFICATION */}
            {toast && (
                <div className="fixed bottom-8 right-8 z-[100] animate-slide-up">
                    <div className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border ${toast.type === 'success' ? 'bg-white border-green-100' : 'bg-red-50 border-red-100'}`}>
                        <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className={`text-sm font-medium ${toast.type === 'success' ? 'text-gray-900' : 'text-red-800'}`}>{toast.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
