import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import {
  Heart,
  Lightbulb,
  GraduationCap,
  Users,
  Globe2,
  CheckCircle2,
  Target,
  Scale,
  Briefcase,
  Palette,
  Cpu,
  ArrowRight,
  MousePointer2,
  Building2,
  HeartPulse,
  Truck,
  Activity,
  Box,
  Zap,
  Leaf,
  Milestone,
  Sprout,
  Menu,
  X
} from 'lucide-react';

// A high-impact counter component for the 'Opportunity Counters'
const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// A small custom hook for scroll reveals with a safety check
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Safety check for older browsers or headless environments
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("Section visible, triggering reveal");
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    });

    const currentElement = elementRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, []); // Only run once on mount

  return [elementRef, isVisible];
};

// --- TYPEWRITER COMPONENT ---
const TypewriterParagraph = ({ text, isVisible, startDelay = 0, onComplete, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Skip Handler
  const finishNow = () => {
    if (isDone || !hasStarted) return;
    setDisplayedText(text);
    setIsDone(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    // RESET if scrolled out of view
    if (!isVisible) {
      setDisplayedText('');
      setIsDone(false);
      return;
    }

    let currentIdx = 0;
    let timer = null;

    // Start typing after initial delay
    const startTyping = setTimeout(() => {
      setHasStarted(true);
      timer = setInterval(() => {
        if (currentIdx < text.length) {
          // If bold marker ** is detected
          if (text.substr(currentIdx, 2) === '**') {
            // Skip markers in the raw unique text build, but since we are simulating raw typing
            // we will just type everything and then parse it in render? 
            // SIMPLE APPROACH: Type raw chars. Render parses.
            setDisplayedText(text.slice(0, currentIdx + 1));
          } else {
            setDisplayedText(text.slice(0, currentIdx + 1));
          }
          currentIdx++;
        } else {
          clearInterval(timer);
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTyping);
      clearInterval(timer);
    };
  }, [isVisible, text, startDelay, speed]);

  // Helper to parse bold markers "**" and add Tooltip
  const renderText = (raw) => {
    if (!raw) return null;
    const parts = raw.split('**');
    return parts.map((part, i) => {
      // Even indices are normal, Odd are bold (assuming closed tags)
      if (i % 2 === 1) {
        // Check if this is the special phrase for the tooltip
        if (part.includes("Africa’s most pressing challenges")) {
          return (
            <span key={i} className="relative group inline-block cursor-help">
              <strong className="text-gray-900 font-black decoration-green-500 underline decoration-2 underline-offset-2 hover:bg-green-100 transition-colors px-1 rounded">
                {part}
              </strong>
              {/* TOOLTIP */}
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white/90 backdrop-blur-md border border-gray-200 p-4 rounded-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 text-sm text-gray-600 font-sans font-normal leading-relaxed text-center">
                <span className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Examples</span>
                Urban Infrastructure, Food Security, Healthcare Access.
                <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-gray-200 rotate-45"></span>
              </span>
            </span>
          );
        }
        return <strong key={i} className="text-gray-900 font-black decoration-green-500 underline decoration-2 underline-offset-2">{part}</strong>;
      }
      return part;
    });
  };

  if (!displayedText && !isVisible) return <div className="min-h-[1.5em]" />; // Placeholder

  return (
    <p
      onClick={finishNow}
      className={`text-xl md:text-2xl text-gray-700 leading-relaxed font-serif font-medium relative ${!isDone ? 'cursor-pointer select-none' : ''}`}
      title={!isDone ? "Click to finish typing" : ""}
    >
      {renderText(displayedText)}
      {/* Blinking Cursor - Only show while typing or recently finished */}
      {isVisible && !isDone && (
        <span className="inline-block w-[3px] h-[1em] bg-gray-900 align-middle ml-1 cursor-blink"></span>
      )}
    </p>
  );
};

// --- GC/GO DATA STRUCTURE (Updated with Color Themes) ---
const challengesData = [
  {
    id: "urbanization",
    title: "Urbanization",
    icon: Building2,
    color: "group-hover:text-blue-600",
    bg: "group-hover:bg-blue-50",
    border: "group-hover:border-blue-200",
    logic: "Rapid urban growth creates demand for housing, transport, services, and employment solutions.",
    opportunities: [
      { title: "Job Creation", icon: Briefcase },
      { title: "Infrastructure", icon: Truck },
      { title: "Regional Integration", icon: Globe2 }
    ]
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    color: "group-hover:text-amber-600",
    bg: "group-hover:bg-amber-50",
    border: "group-hover:border-amber-200",
    logic: "Education gaps limit employability and inclusion; solutions unlock skills, creativity, and economic participation.",
    opportunities: [
      { title: "Job Creation", icon: Briefcase },
      { title: "Empowerment of Women", icon: Users },
      { title: "Arts, Culture, & Design", icon: Palette }
    ]
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: HeartPulse,
    color: "group-hover:text-rose-600",
    bg: "group-hover:bg-rose-50",
    border: "group-hover:border-rose-200",
    logic: "Health system challenges open opportunities in service delivery, community health, and workforce expansion.",
    opportunities: [
      { title: "Job Creation", icon: Briefcase },
      { title: "Empowerment of Women", icon: Users }
    ]
  },
  {
    id: "climate",
    title: "Climate Change",
    icon: Leaf,
    color: "group-hover:text-green-600",
    bg: "group-hover:bg-green-50",
    border: "group-hover:border-green-200",
    logic: "Climate pressure demands sustainable farming, conservation, and eco-based economic models.",
    opportunities: [
      { title: "Agriculture", icon: Leaf },
      { title: "Wildlife Conservation", icon: CheckCircle2 },
      { title: "Tourism", icon: Globe2 }
    ]
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: Truck,
    color: "group-hover:text-indigo-600",
    bg: "group-hover:bg-indigo-50",
    border: "group-hover:border-indigo-200",
    logic: "Infrastructure deficits create opportunities for construction, logistics, and cross-border connectivity.",
    opportunities: [
      { title: "Job Creation", icon: Briefcase },
      { title: "Regional Integration", icon: Globe2 }
    ]
  },
  {
    id: "governance",
    title: "Governance",
    icon: Scale,
    color: "group-hover:text-purple-600",
    bg: "group-hover:bg-purple-50",
    border: "group-hover:border-purple-200",
    logic: "Governance reform enables inclusion, participation, and stronger regional collaboration.",
    opportunities: [
      { title: "Empowerment of Women", icon: Users },
      { title: "Regional Integration", icon: Globe2 }
    ]
  },
  {
    id: "resources",
    title: "Natural Resources",
    icon: Box,
    color: "group-hover:text-emerald-600",
    bg: "group-hover:bg-emerald-50",
    border: "group-hover:border-emerald-200",
    logic: "Poor resource management is a challenge; sustainable use unlocks economic and environmental value.",
    opportunities: [
      { title: "Agriculture", icon: Leaf },
      { title: "Tourism", icon: Globe2 },
      { title: "Job Creation", icon: Briefcase }
    ]
  },
  {
    id: "wildlife",
    title: "Wildlife Conservation",
    icon: Target,
    color: "group-hover:text-teal-600",
    bg: "group-hover:bg-teal-50",
    border: "group-hover:border-teal-200",
    logic: "Conservation challenges become opportunities through eco-tourism and sustainable livelihoods.",
    opportunities: [
      { title: "Tourism", icon: Globe2 },
      { title: "Job Creation", icon: Briefcase }
    ]
  }
];

// Shuffle Utility
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fullText = "Find Your Purpose.";

  // Detect returning user
  const isReturningUser = localStorage.getItem('hasLoggedInBefore') === 'true';
  const rememberedEmail = localStorage.getItem('rememberedEmail') || '';

  // Hook for Section 2 Reveal
  const [contextRef, contextVisible] = useIntersectionObserver({ threshold: 0.4 });
  const [sdgRef, sdgVisible] = useIntersectionObserver({ threshold: 0.2 }); // Hook for SDG
  const [goRef, goVisible] = useIntersectionObserver({ threshold: 0.2 }); // Hook for GO Animation
  const [gcRef, gcVisible] = useIntersectionObserver({ threshold: 0.2 }); // Hook for GC Animation
  const [frameworkRef, frameworkVisible] = useIntersectionObserver({ threshold: 0.2 }); // Hook for Framework
  const [gcPhase, setGcPhase] = useState('dispersed'); // 'dispersed' | 'aligning' | 'floating'
  const [displayChallenges, setDisplayChallenges] = useState(challengesData);
  const [para1Finished, setPara1Finished] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false); // Back To Top State

  // Back to Top Scroll Listener

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(y > 20);
          setShowBackToTop(y > 400);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Welcome Toast
  const { addToast } = useToast();
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setTimeout(() => {
        addToast("Welcome to the Community Path!", "info");
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);
    }
  }, [addToast]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // GC Animation Loop
  useEffect(() => {
    if (!gcVisible) return;

    const runCycle = () => {
      setGcPhase('dispersed');

      // Shuffle the order while dispersed (invisible)
      setTimeout(() => {
        setDisplayChallenges(shuffleArray([...challengesData]));
      }, 500);

      // Step 1: Align (Converge)
      setTimeout(() => setGcPhase('aligning'), 100);

      // Step 2: Float (Sustain)
      setTimeout(() => setGcPhase('floating'), 3100); // Wait for slow 3s alignment

      // Step 3: Reset (Disperse again) - Loop after 10 seconds
    };

    runCycle();
    const interval = setInterval(runCycle, 35000); // 35s total cycle

    return () => clearInterval(interval);
  }, [gcVisible]);

  // Random dispersal positions for the "Magnet" effect
  const dispersalOffsets = [
    { x: '-100vw', y: '-50vh' }, { x: '100vw', y: '-50vh' },
    { x: '-100vw', y: '50vh' }, { x: '100vw', y: '50vh' },
    { x: '-50vw', y: '-100vh' }, { x: '50vw', y: '-100vh' },
    { x: '-50vw', y: '100vh' }, { x: '50vw', y: '100vh' }
  ];

  // Reset sequence when scrolled out
  useEffect(() => {
    if (!contextVisible) {
      setPara1Finished(false);
    }
  }, [contextVisible]);

  // Removed heavy scrollY listener

  useEffect(() => {
    let currentIdx = 0;
    const type = () => {
      if (currentIdx <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIdx));
        currentIdx++;
        setTimeout(type, 100);
      } else {
        // Wait at the end, then clear and restart
        setTimeout(() => {
          setDisplayText('');
          currentIdx = 0;
          setTimeout(type, 1000);
        }, 3000);
      }
    };

    type();
  }, []);
  // Positions for the "Floating Freely" GC Cloud
  const floatingPositions = [
    { top: "10%", left: "10%", delay: "0ms" },
    { top: "15%", right: "15%", delay: "100ms" },
    { top: "35%", left: "5%", delay: "200ms" },
    { top: "40%", right: "5%", delay: "300ms" },
    { bottom: "25%", left: "15%", delay: "400ms" },
    { bottom: "30%", right: "15%", delay: "500ms" },
    { top: "20%", left: "45%", delay: "600ms" }, // Center top
    { bottom: "15%", left: "48%", delay: "700ms" } // Center bottom
  ];



  const [activeChallenge, setActiveChallenge] = useState(challengesData[0]);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isSlideShowPaused, setIsSlideShowPaused] = useState(false);

  // Auto-cycle through challenges every 5 seconds
  useEffect(() => {
    if (isSlideShowPaused) return;

    const interval = setInterval(() => {
      setActiveChallengeIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % displayChallenges.length;
        setActiveChallenge(displayChallenges[nextIndex]);
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [displayChallenges, isSlideShowPaused]);

  // Update activeChallenge when index changes manually
  const goToSlide = (index) => {
    setActiveChallengeIndex(index);
    setActiveChallenge(displayChallenges[index]);
  };

  const nextSlide = () => {
    const nextIndex = (activeChallengeIndex + 1) % displayChallenges.length;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = activeChallengeIndex === 0 ? displayChallenges.length - 1 : activeChallengeIndex - 1;
    goToSlide(prevIndex);
  };

  // --- PREMIUM INTERACTIONS (Tilt & Swipe) ---
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25; // Negate Y for natural tilt
    setTilt({ x: y, y: x });
  };

  const handleMouseLeaveCard = () => {
    setTilt({ x: 0, y: 0 });
    setIsSlideShowPaused(false);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSlideShowPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) nextSlide(); // Swipe Left -> Next
    if (diff < -50) prevSlide(); // Swipe Right -> Prev

    setTouchStart(null);
    setIsSlideShowPaused(false);
  };

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-gray-900 selection:text-white">
      {/* --- HEADER/NAV --- */}
      {/* --- HEADER/NAV (Sticky Pill) --- */}
      <header
        className={isScrolled
          ? "fixed z-50 transition-all duration-500 ease-in-out top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-6xl rounded-2xl md:rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 bg-white/90 backdrop-blur-md"
          : "fixed z-50 transition-all duration-500 ease-in-out top-0 left-0 right-0 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md"
        }
      >
        <nav className={`container mx-auto px-6 flex justify-between items-center ${isScrolled ? 'py-3' : 'py-4'}`}>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl italic">C</span>
            </div>
            <span className="text-2xl font-serif font-black tracking-tight text-gray-900">
              COMMUNITY<span className="text-gray-400 font-normal ml-1">PATH</span>
            </span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-sm font-bold text-gray-800 hover:text-gray-900 transition uppercase tracking-[0.2em]">Home</Link>
            <Link to="/about" className="text-sm font-bold text-gray-800 hover:text-gray-900 transition uppercase tracking-[0.2em]">About</Link>
            <Link
              to="/signup"
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-sm uppercase tracking-wider"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu Dropdown (Solid White) */}
        <div
          className={`fixed top-[72px] left-0 right-0 bg-white shadow-2xl z-40 transition-all duration-300 md:hidden flex flex-col overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100 py-8 border-t border-gray-100' : 'max-h-0 opacity-0 py-0'}`}
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="flex flex-col items-center space-y-6">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-900 hover:text-green-600 transition">Home</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-900 hover:text-green-600 transition">About</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-gray-900 hover:text-green-600 transition">Login</Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gray-900 text-white text-lg px-10 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* --- PARALLAX WRAPPER (Main Content) --- */}
      <main className="relative z-10 bg-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] md:mb-[400px]">
        {/* --- 1. HERO SECTION (Restored Desktop Aesthetic + Mobile Harmony) --- */}
        <section className="bg-white py-20 md:py-48 overflow-hidden relative min-h-[85vh] flex items-center">

          {/* THE SEAMLESS SURFACE: High-Quality Photo with Parallax */}
          <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0 overflow-hidden">
            {/* 
              Desktop: 100% Opacity, Horizontal Fade. 
              Mobile: 25% Opacity, Bottom Fade for readability.
              Sharpness: No grayscale/brightness filters.
            */}
            <div
              className="absolute inset-0 bg-cover bg-center md:bg-[center_right] hero-image-mask"
              style={{
                backgroundImage: 'url(/assets/images/hero.jpg)',
                // Removed JS Parallax for Performance
              }}
            ></div>

            {/* Subtle Grid Overlay for that Blueprint/Technical feel */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(#111827 0.5px, transparent 0.5px)',
              backgroundSize: '40px 40px'
            }}></div>

            {/* Soft Peach Glow for Brand Warmth */}
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#FDE6D5] rounded-full blur-[160px] opacity-20 md:opacity-30 animate-pulse"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              {/* Left: Typography & CTA (Animated Reveal) */}
              <div className="text-left py-10 md:py-0">
                {/* [REC 3] MISSION TAGLINE */}
                <span className="inline-block text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-[0.3em] mb-4 md:mb-6 opacity-0 animate-fade-up [animation-delay:100ms] border-l-4 border-gray-900 pl-4">
                  Built for Africa's Next Leaders
                </span>

                <h1 className="font-serif text-gray-900 leading-[1.05] md:leading-[0.95] mb-6 md:mb-8">
                  <span className="block text-3xl md:text-5xl font-normal mb-2 md:mb-4 text-gray-400 opacity-0 animate-fade-up [animation-delay:300ms]">Don't Just Pick a Major.</span>
                  <span className="block text-6xl md:text-9xl font-black tracking-tight opacity-0 animate-fade-up [animation-delay:600ms]">
                    <span className="inline-block min-h-[1.1em]">
                      {displayText}
                    </span>
                  </span>
                </h1>

                <p className="text-xl md:text-3xl font-serif text-gray-800 mb-10 md:mb-12 font-medium italic opacity-0 animate-fade-up [animation-delay:900ms] max-w-xl leading-relaxed">
                  One student, one match at a time.
                </p>

                {/* [REC 2] POLISHED CTA BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-5 md:gap-6 opacity-0 animate-fade-up [animation-delay:1200ms]">
                  {isReturningUser ? (
                    // Returning user - show quick login
                    <>
                      <Link
                        to="/login"
                        className="group relative bg-gray-900 text-white text-lg md:text-xl font-bold px-10 md:px-12 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-gray-900/40 text-center"
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
                        <span className="relative flex items-center justify-center gap-2 md:gap-3">
                          Welcome Back{rememberedEmail ? `, ${rememberedEmail.split('@')[0]}` : ''}!
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </Link>
                      <Link
                        to="/signup"
                        className="bg-white/40 backdrop-blur-md border border-gray-900/10 text-gray-900 text-lg md:text-xl font-bold px-10 md:px-12 py-4 md:py-5 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 text-center"
                      >
                        New Account
                      </Link>
                    </>
                  ) : (
                    // New user - show signup as primary
                    <>
                      <Link
                        to="/signup"
                        className="group relative bg-gray-900 text-white text-lg md:text-xl font-bold px-10 md:px-12 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-gray-900/40 text-center"
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
                        <span className="relative flex items-center justify-center gap-2 md:gap-3">
                          Start Your Journey
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </Link>
                      <Link
                        to="/login"
                        className="bg-white/40 backdrop-blur-md border border-gray-900/10 text-gray-900 text-lg md:text-xl font-bold px-10 md:px-12 py-4 md:py-5 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 text-center"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. THE CONTEXT SECTION (Storytelling Mode) --- */}
        <section ref={contextRef} className="py-32 bg-gray-50/50 overflow-hidden relative">
          {/* Parallax Background for Context */}
          <div className="absolute top-0 left-0 w-full h-full z-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#111827 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px'
            }}>
          </div>

          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 md:order-1 max-w-xl">
              <span
                className={`inline-block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 border-l-4 border-gray-200 pl-4 transition-all duration-700 ease-out`}
                style={{
                  opacity: contextVisible ? 1 : 0,
                  transform: contextVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: '100ms'
                }}
              >
                The Context
              </span>
              <h2
                className={`text-4xl md:text-5xl font-serif font-black text-gray-900 leading-tight mb-8 transition-all duration-1000 ease-out`}
                style={{
                  opacity: contextVisible ? 1 : 0,
                  transform: contextVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '300ms',
                }}
              >
                The Gap in Guidance
              </h2>

              <div className="space-y-8 min-h-[200px]">
                {/* Paragraph 1 */}
                <TypewriterParagraph
                  text="Students are rarely guided to think about careers in terms of the problems their communities face. Instead, choices are often driven by trends, titles, or prestige."
                  isVisible={contextVisible}
                  startDelay={500}
                  onComplete={() => setPara1Finished(true)}
                />

                {/* Paragraph 2 - Starts after P1 finishes */}
                <TypewriterParagraph
                  text="Our platform helps students understand **Africa’s most pressing challenges** and shows them how their talents can be directed toward solutions that matter locally and globally."
                  isVisible={contextVisible && para1Finished}
                  startDelay={0} // Immediate start once P1 signals
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative group">
                {/* [REC 1] ANNOTATED INNOVATOR FEEL */}
                <div
                  className={`absolute -top-16 -left-10 z-20 hidden md:flex items-center space-x-2 transition-all duration-1000 ease-out`}
                  style={{
                    opacity: contextVisible ? 1 : 0,
                    transform: contextVisible ? 'scale(1)' : 'scale(0.8) translateY(20px)',
                    transitionDelay: '1000ms'
                  }}
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-serif italic font-bold text-gray-400 -mb-1">Real Problems.</span>
                    <span className="text-sm font-serif italic font-bold text-gray-900">Real Impact.</span>
                  </div>
                  <MousePointer2 className="w-6 h-6 text-gray-900 rotate-[-15deg] animate-pulse" />
                </div>

                {/* Decoration: A matching subtle grid behind the image box */}
                <div className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.05]" style={{
                  backgroundImage: 'radial-gradient(#111827 0.5px, transparent 0.5px)',
                  backgroundSize: '20px 20px'
                }}></div>

                <div
                  className={`bg-white p-3 rounded-2xl shadow-2xl transition-all duration-[1.5s] ease-out hover:rotate-0`}
                  style={{
                    opacity: contextVisible ? 1 : 0,
                    transform: contextVisible ? 'rotate(2deg) translateY(0)' : 'rotate(-5deg) translateY(40px)',
                    transitionDelay: '400ms'
                  }}
                >
                  <div className="overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src="/assets/images/dots.jpg"
                      alt="Student connecting career dots"
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. UN SUSTAINABLE DEVELOPMENT GOALS (SDGs) - Premium Dark Mode --- */}
        <section ref={sdgRef} className="py-24 md:py-32 bg-gray-900 relative overflow-hidden">
          {/* [REC 1] The "Blueprint' Grid Background (White opacity on Dark) */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          {/* Ambient Glows */}
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-green-500 rounded-full blur-[150px] opacity-10 animate-pulse transition-opacity duration-1000 ${sdgVisible ? 'opacity-20' : 'opacity-0'}`}></div>
          <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-10 transition-opacity duration-1000 ${sdgVisible ? 'opacity-20' : 'opacity-0'}`}></div>

          <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 transform ${sdgVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left Content */}
              <div>
                <span className="inline-block text-xs font-black text-green-400 uppercase tracking-[0.3em] mb-6 border-l-4 border-green-500 pl-4">
                  Global Framework
                </span>

                <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-tight mb-8">
                  Aligned with the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                    UN SDGs
                  </span>
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed font-light mb-12 max-w-lg">
                  The Sustainable Development Goals are the blueprint for a better future for all. Every solution we build is aligned with all 17 SDGs. The pathways below show how this alignment comes to life through learning.
                </p>

                {/* Glassmorphism Cards */}
                <div className="grid gap-6">
                  {[
                    { id: 4, title: "Quality Education", desc: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.", color: "border-green-500/30" },
                    { id: 8, title: "Decent Work", desc: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.", color: "border-emerald-500/30" }
                  ].map((goal) => (
                    <div key={goal.id} className={`group bg-white/5 backdrop-blur-lg border ${goal.color} p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:translate-x-2`}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
                          {goal.id}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">{goal.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                            {goal.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image / Parallax */}
              <div className="relative">
                {/* Floating Elements Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-[2rem] transform rotate-3 scale-105 blur-xl"></div>

                <div className="relative bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-700 shadow-2xl group">
                  <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img
                    src="/assets/images/sdg.png"
                    alt="UN Sustainable Development Goals Wheel"
                    loading="lazy"
                    className="w-full relative z-0 transform transition-transform duration-[1.5s] group-hover:scale-110"
                  />

                  {/* Interactive Overlay Tag */}
                  <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="bg-white/90 backdrop-blur text-gray-900 p-4 rounded-xl shadow-lg border-l-4 border-green-600">
                      <p className="font-bold text-sm">Official Framework</p>
                      <p className="text-xs text-gray-600 mt-1">We adhere to global standards for sustainable impact.</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 border-2 border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 4. GRAND CHALLENGES & OPPORTUNITIES (The Innovator Overhaul) --- */}
        {/* --- 4. GRAND CHALLENGES & OPPORTUNITIES (Story Mode) --- */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Branding */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gray-900 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">

            {/* SCENE 1: THE REALITY (Back to Grid - Clean & Solid) */}
            <div className="mb-32 text-center">
              <span className="inline-block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
                The Reality
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 leading-tight mb-6">
                Global Challenges
              </h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
                Turning challenges into clearly defined global opportunities.
              </p>

              {/* Solid Grid Layout */}
              {/* Grid Layout with Motion State */}
              {/* Grid Layout with Motion State */}
              <div ref={gcRef} className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto min-h-[300px] content-center relative">
                {displayChallenges.map((c, idx) => {
                  const offset = dispersalOffsets[idx % dispersalOffsets.length];

                  // Compute styles based on Phase
                  // Compute styles based on Phase
                  let style = { transition: 'all 3s cubic-bezier(0.34, 1.56, 0.64, 1)' };
                  // Added group class for hover theming
                  let className = `group flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${c.border} ${c.bg}`;

                  if (gcPhase === 'dispersed') {
                    style.transform = `translate(${offset.x}, ${offset.y}) scale(0.5)`;
                    style.opacity = 0;
                  } else if (gcPhase === 'aligning') {
                    style.transform = `translate(0, 0) scale(1)`;
                    style.opacity = 1;
                  } else if (gcPhase === 'floating') {
                    style.transform = `translate(0, 0) scale(1)`;
                    style.opacity = 1;
                    className += " animate-float"; // Add bobbing effect
                  }

                  return (
                    <div
                      key={idx}
                      className={className}
                      style={style}
                    >
                      <c.icon className={`w-5 h-5 text-gray-400 transition-colors duration-300 ${c.color}`} />
                      <span className="font-serif font-bold text-gray-900 text-sm md:text-base tracking-wide">{c.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SCENE 2: THE CONVERGENCE (The Orbital System) */}
            <div ref={goRef} className="mb-32 relative h-[700px] flex items-center justify-center">
              {/* Background Glow */}
              <div className={`absolute w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl transition-opacity duration-1000 ${goVisible ? 'opacity-100' : 'opacity-0'}`}></div>

              {/* Center Hub */}
              <div className={`relative z-20 text-center transition-all duration-1000 delay-300 ${goVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] mx-auto mb-6 relative">
                  <Globe2 className="w-10 h-10 text-white animate-pulse" />
                  {/* Inner Orbit Ring */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                  Global<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-700">Opportunities</span>
                </h2>
              </div>

              {/* ORBITAL RING CONTAINER */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-dashed border-gray-200 rounded-full transition-all duration-[1.5s] ease-out ${goVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'}`}>

                {/* Rotating Group - Duration 20s */}
                <div className="w-full h-full animate-orbit relative">

                  {/* Icon 1: Jobs (Top) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-orbit-reverse">
                      <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center gap-2 group hover:scale-110 transition-transform cursor-pointer hover:bg-white/80">
                        <div className="p-2 bg-blue-100/50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">Job Creation</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon 2: Agri-Tech (Right) */}
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                    <div className="animate-orbit-reverse">
                      <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center gap-2 group hover:scale-110 transition-transform cursor-pointer hover:bg-white/80">
                        <div className="p-2 bg-green-100/50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <Sprout className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">Agri-Business</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon 3: Energy (Bottom) */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="animate-orbit-reverse">
                      <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center gap-2 group hover:scale-110 transition-transform cursor-pointer hover:bg-white/80">
                        <div className="p-2 bg-amber-100/50 rounded-lg text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Zap className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">Renewable Energy</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon 4: Health (Left) */}
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="animate-orbit-reverse">
                      <div className="bg-white/60 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center gap-2 group hover:scale-110 transition-transform cursor-pointer hover:bg-white/80">
                        <div className="p-2 bg-rose-100/50 rounded-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">Health Systems</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon 5: Innovation (Top-Right Angle) */}
                  <div className="absolute top-[15%] right-[15%]">
                    <div className="animate-orbit-reverse">
                      <div className="bg-white/60 backdrop-blur-xl p-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-2 group hover:scale-110 transition-transform cursor-pointer hover:bg-white/80">
                        <Lightbulb className="w-5 h-5 text-purple-600" />
                        <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">Innovation</span>
                      </div>
                    </div>
                  </div>

                  {/* Icon 6: Trade (Bottom-Left Angle) */}
                  <div className="absolute bottom-[15%] left-[15%]">
                    <div className="animate-orbit-reverse">
                      <div className="bg-white/60 backdrop-blur-xl p-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-2 group hover:scale-110 transition-transform cursor-pointer hover:bg-white/80">
                        <Truck className="w-5 h-5 text-indigo-600" />
                        <span className="text-xs font-bold text-gray-900 font-sans tracking-wide">Trade</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* SCENE 3: THE SYNTHESIS (Interactive Nexus) */}
            <div className="mb-12 text-center">
              <span className="inline-block text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">
                The Synthesis
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-black text-gray-900">
                Connection Engine
              </h3>
              <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                Select a challenge to trace the logic pathway to your potential impact.
              </p>
            </div>

            {/* THE INTERACTIVE NEXUS (Refined Split-Card Slideshow) */}
            <div
              className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 flex flex-col md:flex-row min-h-[450px] group transition-all duration-100 ease-out hover:shadow-2xl"
              style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
              onMouseEnter={() => setIsSlideShowPaused(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeaveCard}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >

              {/* --- LEFT SIDE: THEME & TITLE (40%) --- */}
              <div className={`relative md:w-2/5 p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-colors duration-1000 ${activeChallenge.bg.replace('group-hover:', '')}`}>


                {/* Visual Anchor (Large Icon - Parallax) */}
                <div
                  className="absolute -right-12 -bottom-12 text-gray-900/5 transition-transform duration-100 ease-out"
                  style={{ transform: `rotate(12deg) scale(1.5) translateX(${tilt.y * 12}px) translateY(${tilt.x * 12}px)` }}
                >
                  <activeChallenge.icon className="w-64 h-64" />
                </div>

                {/* Content */}
                <div className="relative z-10 animate-fade-in key={`left-${activeChallenge.id}`}">


                  <h3 className="text-3xl md:text-5xl font-serif font-black text-gray-900 leading-tight mb-4">
                    {activeChallenge.title}
                  </h3>
                  <div className={`w-12 h-1 bg-gray-900/20 rounded-full mb-6`}></div>
                </div>

                {/* Navigation (Bottom Left) */}
                <div className="relative z-10 flex gap-3 mt-auto">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Challenge"
                    className="p-3 rounded-full bg-white/40 hover:bg-white text-gray-900 transition-all shadow-sm backdrop-blur-md"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next Challenge"
                    className="p-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* --- RIGHT SIDE: LOGIC & OPPORTUNITIES (60%) --- */}
              <div className="relative md:w-3/5 p-8 md:p-10 bg-white flex flex-col justify-center">
                <div key={`right-${activeChallenge.id}`}>

                  <div className="mb-8 animate-slide-in-right" style={{ animationDelay: '0ms' }}>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">The Logic</span>
                    <p className="text-lg md:text-xl text-gray-700 font-medium italic leading-relaxed">
                      "{activeChallenge.logic}"
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block flex items-center gap-2 animate-slide-in-right" style={{ animationDelay: '100ms' }}>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Key Opportunities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeChallenge.opportunities.map((opp, idx) => (
                        <button
                          key={idx}
                          onClick={() => window.location.hash = '#framework'}
                          className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 group/item hover:bg-white hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-left cursor-pointer active:scale-95 animate-slide-in-right"
                          style={{ animationFillMode: 'both', animationDelay: `${200 + idx * 100}ms` }}
                        >
                          <div className={`p-2 rounded-md bg-white shadow-sm group-hover/item:text-white transition-colors ${activeChallenge.color.replace('group-hover:', '')} group-hover/item:bg-gray-900`}>
                            <opp.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-gray-800 group-hover/item:text-gray-900">{opp.title}</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* [REC 2] OPPORTUNITY COUNTERS BAR */}
            <div className="mt-24 pt-16 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-serif font-black text-gray-900 mb-2">
                  <Counter end={8} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Grand Challenges</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-serif font-black text-gray-900 mb-2">
                  <Counter end={1200} suffix="+" />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Career Paths</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-serif font-black text-gray-900 mb-2">
                  <Counter end={54} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Nations Served</p>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-6xl font-serif font-black text-gray-900 mb-2 text-emerald-600">
                  <Counter end={100} suffix="%" />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Student Match Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. FRAMEWORK SECTION (The Path) - Harmonized Light Mode --- */}
        <section ref={frameworkRef} className="py-24 md:py-32 bg-white relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: 'radial-gradient(#111827 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px'
          }}></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <span className="inline-block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
                The Compass
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-black text-gray-900 leading-tight">
                Purpose + Reality = <span className="text-green-600">A Viable Match</span>
              </h2>
            </div>

            {/* The Connected Path Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Identify", desc: "Start by identifying a specific challenge within a community.", icon: Target, delay: "0ms" },
                { step: "02", title: "Align", desc: "Elevate the community challenge into a globally aligned opportunity under the UN SDGs.", icon: Lightbulb, delay: "200ms" },
                { step: "03", title: "Assess", desc: "Check how your strengths, background, and readiness align with the challenge you want to solve.", icon: Milestone, delay: "400ms" },
                { step: "04", title: "Match", desc: "Get a Tier 1 or Tier 2 match to university programs and schools that can help you solve your chosen challenge.", icon: CheckCircle2, delay: "600ms" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative group bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:bg-white hover:shadow-2xl hover:border-gray-200 transition-all duration-500 ease-out hover:-translate-y-2 ${frameworkVisible ? 'animate-fade-up' : 'opacity-0'}`}
                  style={{ animationDelay: item.delay }}
                >
                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-gray-900 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300 border border-gray-100">
                    <item.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-700 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. TESTIMONIALS SECTION (The Proof) --- */}
        <section className="bg-gray-50 py-24 md:py-32 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(#111827 0.5px, transparent 0.5px)',
            backgroundSize: '20px 20px'
          }}></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">
                Impact Stories
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 leading-tight">
                From Confusion to <span className="text-green-600">Clarity</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "This platform helped me choose a program that truly fits my passion for agriculture.", author: "Ama", role: "Key Opportunities: Agri-Tech", color: "bg-green-500" },
                { quote: "I discovered opportunities in data science I never knew existed in Ghana.", author: "Kofi", role: "Key Opportunities: Innovation", color: "bg-blue-500" },
                { quote: "The recommendations were practical and helped me convince my parents.", author: "Efua", role: "Key Opportunities: Healthcare", color: "bg-rose-500" }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative group">
                  <div className="absolute top-8 right-8 text-6xl font-serif text-gray-100 group-hover:text-gray-200 transition-colors">"</div>
                  <div className="relative z-10">
                    <p className="text-gray-700 font-medium text-lg leading-relaxed mb-8">
                      {item.quote}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}>
                        {item.author[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.author}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 7. FINAL CTA (The Launchpad) --- */}
        <section className="py-32 bg-gray-900 relative overflow-hidden flex items-center justify-center">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/20 rounded-full blur-[200px] animate-pulse"></div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 tracking-tight">
              Your Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Waiting.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
              Join thousands of students who have found their path by connecting their passion to Africa's potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/signup"
                className="bg-white text-gray-900 text-xl font-bold px-12 py-5 rounded-full hover:bg-green-500 hover:text-white transition-all shadow-2xl hover:shadow-[0_20px_40px_rgba(34,197,94,0.3)] transform hover:-translate-y-1"
              >
                Start Now
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* --- BACK TO TOP BUTTON --- */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all duration-500 transform ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Back to Top"
      >
        <ArrowRight className="w-6 h-6 -rotate-90" />
      </button>

      {/* --- FOOTER (Parallax Reveal) --- */}
      <footer className="bg-gray-900 text-gray-300 py-12 md:fixed md:bottom-0 md:left-0 md:w-full md:-z-0 md:h-[400px] md:flex md:items-center">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-gray-400 font-medium text-lg max-w-3xl mx-auto italic">
              "The Community Path is built with you in mind; for you, and for the communities your education is meant to serve."
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">The Community Path Project</span>
              <p className="text-sm mt-2 text-gray-400">&copy; 2025 All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="hover:text-white transition">About</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link to="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;