import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, CheckCircle2, Quote, Loader2, ChevronRight } from 'lucide-react';
import { submitOnboarding } from '../services/api';

// --- LESSON DATA ---
const LESSONS = [
    {
        id: 'vision',
        type: 'rhetorical',
        title: "The Spark of Vision",
        prompt: "As you watch, ask yourself: If education is the key, why are so many doors still locked?",
        videoUrl: "https://www.youtube.com/embed/mAN_r1K02uw", // Fred Swaniker
        videoTitle: "The ALX Vision",
        context: "Inspired by the vision of ALX and Fred Swaniker (CEO, Sand Technologies).",
        rhetoricalContent: "\"Observation is the first step of design. Watch closely.\""
    },
    {
        id: 'context',
        type: 'rhetorical',
        title: "The Community Context",
        prompt: "Look around you. How does the education you see connect to the reality of your community?",
        videoUrl: "/assets/videos/path_idea.mp4",
        videoTitle: "The Gap",
        context: "Understanding the disconnect between theory and reality.",
        rhetoricalContent: "\"The answers are often hidden in plain sight. Look deeper.\"",
        videoClasses: "object-cover object-top" // Anchor to top to show face in 16:9 crop
    },
    {
        id: 'commitment',
        type: 'rhetorical',
        title: "Your Commitment",
        prompt: "This path requires a shift in mindset. Reflect on your readiness to be a solver, not just a student.",
        videoUrl: "", // Placeholder
        videoTitle: "The Solver's Mindset",
        context: "Moving from passive learning to active solving.",
        rhetoricalContent: "\"True commitment is a quiet resolve. Are you ready?\""
    }
];

function Onboarding() {
    const navigate = useNavigate();
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);

    const currentLesson = LESSONS[currentLessonIndex];
    const isLastLesson = currentLessonIndex === LESSONS.length - 1;

    // Reset video state when lesson changes
    useEffect(() => {
        setVideoStarted(false);
    }, [currentLessonIndex]);

    const handleNext = async () => {
        if (isLastLesson) {
            setIsSubmitting(true);
            try {
                // Compile answers for backend
                const payload = {
                    community_problem: answers['context'] || "No problem identifed",
                    sdg_alignment: "Generic Alignment", // To be refined later
                    curiosity_score: 10,
                    academic_realism_score: 10,
                    // We might want to save the 'vision' and 'commitment' answers too, 
                    // but the backend model might not have fields for them yet.
                    // For MVP, we map them to existing fields or meta field if available.
                    // We'll append them to community_problem for now to ensure they are saved.
                    meta_answers: JSON.stringify(answers)
                };

                await submitOnboarding(payload);
                navigate('/dashboard');
            } catch (error) {
                console.error("Submission error", error);
                setIsSubmitting(false);
            }
        } else {
            setCurrentLessonIndex(prev => prev + 1);
        }
    };

    const currentAnswer = answers[currentLesson.id] || '';
    const isRhetorical = currentLesson.type === 'rhetorical';

    const isYoutubeUrl = (url) => url && (url.includes('youtube') || url.includes('youtu.be'));

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-green-500/30">

            {/* Background Grain */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none fixed" />

            {/* --- HEADER --- */}
            <div className="w-full p-6 border-b border-white/10 flex justify-between items-center relative z-10 bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-green-400 border border-white/10">
                        {currentLessonIndex + 1}
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-400 uppercase tracking-widest font-bold">Orientation Phase</h2>
                        <h1 className="text-xl font-serif font-black tracking-wide">{currentLesson.title}</h1>
                    </div>
                </div>
                {/* Progress Dots */}
                <div className="flex gap-2">
                    {LESSONS.map((_, idx) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx <= currentLessonIndex ? 'w-8 bg-green-500' : 'w-2 bg-gray-800'}`} />
                    ))}
                </div>
            </div>

            {/* --- MAIN CONTENT (Split View) --- */}
            <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">

                {/* LEFT: REFLECTION (Prompt) */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center border-r border-white/5 bg-gradient-to-br from-black to-gray-900/50">
                    <div className="max-w-xl mx-auto w-full space-y-8 animate-fade-up">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                <Quote className="w-3 h-3" /> Guided Reflection
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                                {currentLesson.prompt}
                            </h3>
                        </div>

                        {/* Render Input OR Rhetorical Spacer */}
                        {!isRhetorical ? (
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide">
                                    {currentLesson.inputLabel}
                                </label>
                                <textarea
                                    value={currentAnswer}
                                    onChange={(e) => setAnswers({ ...answers, [currentLesson.id]: e.target.value })}
                                    placeholder={currentLesson.placeholder}
                                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-lg text-gray-200 focus:border-green-500 focus:bg-white/10 focus:ring-1 focus:ring-green-500/50 transition resize-none placeholder:text-gray-700"
                                />
                            </div>
                        ) : (
                            <div className="py-8">
                                <p className="text-gray-400 italic text-lg border-l-2 border-green-500 pl-4">
                                    {currentLesson.rhetoricalContent}
                                </p>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                onClick={handleNext}
                                disabled={(!isRhetorical && currentAnswer.length < 5) || isSubmitting}
                                className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-green-400 hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(74,222,128,0.4)] disabled:opacity-30 disabled:cursor-not-allowed group w-full justify-center lg:w-auto"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : (
                                    isRhetorical ? 'I Have Reflected. Continue.' : (isLastLesson ? 'Complete Orientation' : 'Continue to Next Lesson')
                                )}
                                {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT: VIDEO */}
                <div className="flex-1 bg-black relative flex items-center justify-center border-t lg:border-t-0 border-white/10 lg:min-h-full min-h-[40vh]">
                    {/* Video Context */}
                    <div className="absolute top-6 left-6 z-20 hidden lg:block">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Now Playing</p>
                        <p className="text-white font-serif">{currentLesson.videoTitle}</p>
                    </div>

                    <div className="w-full max-w-2xl px-6 relative z-10 aspect-video">
                        {currentLesson.videoUrl ? (
                            !videoStarted ? (
                                <button
                                    onClick={() => setVideoStarted(true)}
                                    className="absolute inset-0 flex items-center justify-center group bg-black/50 hover:bg-black/40 transition rounded-xl overflow-hidden border border-white/10"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500 shadow-2xl relative z-10">
                                        <Play className="w-8 h-8 text-white ml-1 fill-white" />
                                    </div>
                                    <div className="absolute bottom-6 left-6 text-left">
                                        <p className="text-sm font-light text-gray-300">{currentLesson.context}</p>
                                    </div>
                                </button>
                            ) : (
                                isYoutubeUrl(currentLesson.videoUrl) ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`${currentLesson.videoUrl}?autoplay=1&rel=0`}
                                        title={currentLesson.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-xl shadow-2xl border border-white/10 bg-black"
                                    ></iframe>
                                ) : (
                                    <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black relative">
                                        <video
                                            width="100%"
                                            height="100%"
                                            src={currentLesson.videoUrl}
                                            title={currentLesson.title}
                                            autoPlay
                                            controls
                                            className={`w-full h-full object-cover ${currentLesson.videoClasses || ''}`}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )
                            )
                        ) : (
                            /* Placeholder for Empty Video URL */
                            <div className="w-full h-full bg-white/5 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center p-8 animate-pulse">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                                    <Play className="w-6 h-6 text-white/20" />
                                </div>
                                <h3 className="text-white font-bold mb-2">Video Coming Soon</h3>
                                <p className="text-gray-500 text-sm max-w-xs">{currentLesson.context}</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Onboarding;

