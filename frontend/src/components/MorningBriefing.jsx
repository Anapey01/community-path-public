import React, { useState, useEffect } from 'react';
import { Sun, Battery, Target, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

const MorningBriefing = () => {
  const [step, setStep] = useState(0); // 0: Intro, 1: Mood, 2: Focus, 3: Gratitude, 4: Summary
  const [reflection, setReflection] = useState({
    mood: 50,
    focus: '',
    gratitude: ''
  });
  const [username, setUsername] = useState('Traveler');

  useEffect(() => {
    // Load username
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);

    // Check if already completed today
    const today = new Date().toDateString();
    const lastReflection = localStorage.getItem('lastReflectionDate');
    if (lastReflection === today) {
      setStep(4);
      const savedData = JSON.parse(localStorage.getItem('dailyReflectionData') || '{}');
      setReflection(savedData);
    }
  }, []);

  const handleNext = () => setStep(step + 1);

  const handleComplete = () => {
    const today = new Date().toDateString();
    localStorage.setItem('lastReflectionDate', today);
    localStorage.setItem('dailyReflectionData', JSON.stringify(reflection));

    // Update streak
    let streak = parseInt(localStorage.getItem('streak') || '0');
    const lastStreakDate = localStorage.getItem('lastStreakDate');

    // Simple streak logic (if yesterday or today involved)
    // For MVP we just increment if it's a new day
    if (lastStreakDate !== today) {
      streak += 1;
      localStorage.setItem('streak', streak.toString());
      localStorage.setItem('lastStreakDate', today);
    }

    setStep(4);
  };

  // Render Step Content
  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="text-orange-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-black text-gray-900">Good Morning, {username}.</h3>
            <p className="text-gray-500">Ready to align your compass for the day?</p>
            <button onClick={handleNext} className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition shadow-lg flex items-center mx-auto space-x-2">
              <span>Begin Briefing</span>
              <ArrowRight size={18} />
            </button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Battery className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-xl font-serif font-black text-gray-900">Energy Check</h3>
              <p className="text-gray-500 text-sm">How is your battery level right now?</p>
            </div>
            <input
              type="range"
              min="0" max="100"
              value={reflection.mood}
              onChange={(e) => setReflection({ ...reflection, mood: e.target.value })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
              <span>Depleted</span>
              <span>Charged</span>
            </div>
            <button onClick={handleNext} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold transition">Next</button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="text-xl font-serif font-black text-gray-900">Daily Focus</h3>
              <p className="text-gray-500 text-sm">What is the ONE thing that matters today?</p>
            </div>
            <input
              type="text"
              placeholder="e.g. Finish the API integration..."
              value={reflection.focus}
              onChange={(e) => setReflection({ ...reflection, focus: e.target.value })}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center font-medium"
              autoFocus
            />
            <button onClick={handleNext} disabled={!reflection.focus} className="w-full py-3 bg-gray-900 disabled:opacity-50 text-white rounded-lg font-bold transition">Next</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
              <h3 className="text-xl font-serif font-black text-gray-900">Gratitude</h3>
              <p className="text-gray-500 text-sm">What is one thing going right?</p>
            </div>
            <input
              type="text"
              placeholder="e.g. Coffee, sunshine, progress..."
              value={reflection.gratitude}
              onChange={(e) => setReflection({ ...reflection, gratitude: e.target.value })}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-center font-medium"
              autoFocus
            />
            <button onClick={handleComplete} disabled={!reflection.gratitude} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition shadow-md">Complete</button>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-6 animate-fade-in py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="text-green-600 w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-black text-gray-900">Briefing Complete.</h3>
              <p className="text-gray-500">You are on a <span className="font-bold text-green-600">{localStorage.getItem('streak') || 1} day streak!</span></p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-left space-y-3">
              <div className="flex items-center space-x-3">
                <Target size={18} className="text-red-500" />
                <span className="font-medium text-gray-800">{reflection.focus}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart size={18} className="text-pink-500" />
                <span className="font-medium text-gray-800">{reflection.gratitude}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 w-full max-w-lg mx-auto md:mx-0">
      {renderContent()}
    </div>
  );
};

export default MorningBriefing;
