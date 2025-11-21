import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Mail, ArrowRight } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TikTokSection } from './components/TikTokSection';
import { DashboardState } from './types';

// Initial Mock Data
const INITIAL_DATA: DashboardState = {
  level: 7, // Hidden in UI
  currentXP: 2340,
  maxXP: 3000,
  vibeScore: 72,
  streak: 3,
  totalMentions: 1420,
  reach: "2.4M",
  alerts: [
    { id: '1', type: 'CRITICAL', message: 'Viral TikTok detected: 50K views in 30 minutes', time: '2 min ago', impact: '-12% sentiment', source: '@tiktok_trend_watch', xp: 25 },
    { id: '2', type: 'WARNING', message: 'Reddit thread gaining traction: "Unethical practices..."', time: '15 min ago', impact: 'Monitoring', source: 'r/ConsumerAdvice' },
    { id: '3', type: 'SUCCESS', message: 'Positive coverage detected across 5 platforms', time: '1 hour ago', impact: '+5% sentiment', source: 'Global News Feed' },
  ],
  achievements: [
    { name: 'Crisis Defender', xp: 150, icon: 'shield' },
    { name: 'Sentiment Booster', xp: 100, icon: 'trending-up' }
  ],
  platforms: [
    { name: 'TikTok', percentage: 34, trend: 'up', data: [20, 40, 35, 50, 80] },
    { name: 'Reddit', percentage: 22, trend: 'down', data: [60, 55, 40, 30, 22] },
    { name: 'Google', percentage: 18, trend: 'up', data: [15, 16, 16, 17, 18] },
    { name: 'Twitter', percentage: 15, trend: 'down', data: [30, 25, 20, 18, 15] }
  ],
  sentimentHistory: [
    { time: "10:00", score: 68 },
    { time: "11:00", score: 70 },
    { time: "12:00", score: 75 },
    { time: "13:00", score: 72 },
    { time: "14:00", score: 65 },
    { time: "15:00", score: 60 },
    { time: "16:00", score: 72 }
  ]
};

const ROTATING_WORDS = ["threats", "news", "TikTok", "tweets", "threads", "content"];

const App: React.FC = () => {
  const [dashboardData] = useState<DashboardState>(INITIAL_DATA);
  const [email, setEmail] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimatingWord, setIsAnimatingWord] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimatingWord(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimatingWord(false);
      }, 500); // Wait for exit animation
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#02040a] text-white overflow-x-hidden selection:bg-brand-purple/30 selection:text-white flex flex-col font-sans">
      
      {/* Navbar - Minimal & Premium */}
      <nav className="w-full py-8 px-6 md:px-12 flex items-center justify-between max-w-[1400px] mx-auto opacity-0 animate-fade-in duration-1000">
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="relative w-10 h-10 flex items-center justify-center">
             <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-md group-hover:bg-brand-purple/40 transition-all duration-500"></div>
             <Shield className="relative text-white transition-transform duration-500 group-hover:scale-110" size={26} fill="currentColor" fillOpacity={0.1} strokeWidth={2} />
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="text-xl font-bold tracking-wide">VibeScore</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">by Sentiment AI</span>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-grow w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 lg:pt-24 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Content - Typography Focus */}
        <div className="flex flex-col gap-10 z-10 max-w-2xl lg:max-w-3xl">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-[5rem] leading-[0.95] font-semibold tracking-tighter opacity-0 animate-fade-in-up delay-100">
              Stop viral{' '}
              <span className="relative inline-block min-w-[4ch]">
                 <span 
                    key={currentWordIndex}
                    className={`text-red-500 inline-block transition-all duration-500 absolute left-0 top-0 ${
                        isAnimatingWord 
                        ? 'opacity-0 transform translate-y-4 blur-sm' 
                        : 'opacity-100 transform translate-y-0 blur-0 animate-fade-in-up'
                    }`}
                 >
                    {ROTATING_WORDS[currentWordIndex]}
                 </span>
                 {/* Invisible placeholder to maintain width */}
                 <span className="opacity-0">{ROTATING_WORDS[currentWordIndex]}</span>
              </span>
              <br />
              from destroying your brand overnight.
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed opacity-0 animate-fade-in-up delay-200 font-light tracking-wide">
              Real-time reputation intelligence. Detect threats, track sentiment, and control the narrative instantly.
            </p>
          </div>

          {/* Premium Form Input */}
          <div className="flex flex-col gap-6 opacity-0 animate-fade-in-up delay-300 max-w-lg">
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow group">
                  <input 
                    type="email" 
                    placeholder="work@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-purple/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm"
                  />
                </div>
                <button className="group relative overflow-hidden bg-white text-black font-medium rounded-full px-8 py-4 flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0">
                  <span className="relative z-10 text-sm tracking-wide">Join Waitlist</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-slate-500 font-medium tracking-wide opacity-0 animate-fade-in-up delay-500">
               <span className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                 <div className="w-1 h-1 bg-brand-purple rounded-full"></div> Real-time monitoring
               </span>
               <span className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                 <div className="w-1 h-1 bg-brand-purple rounded-full"></div> Instant alerts
               </span>
               <span className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                 <div className="w-1 h-1 bg-brand-purple rounded-full"></div> Free 14-day trial
               </span>
            </div>
          </div>
        </div>

        {/* Right Content (Dashboard Preview) */}
        <div className="relative w-full flex items-center justify-center perspective-[2000px] group opacity-0 animate-fade-in-up delay-300">
          {/* Subtle Atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-purple/10 blur-[120px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
          
          {/* iPad Frame Container */}
          <div className="relative w-full max-w-[850px] mx-auto opacity-0 animate-tilt-in delay-300">
            
            {/* Device Frame */}
            <div className="relative rounded-[2.5rem] bg-[#121212] p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/5 transition-transform duration-700 hover:scale-[1.01]">
                 
                 {/* Camera Notch (Optional, kept subtle) */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1.5 w-24 bg-black/40 rounded-b-xl z-30 backdrop-blur-md border-b border-x border-white/5 hidden sm:block"></div>

                 {/* Inner Bezel/Screen Container */}
                 <div className="rounded-[2rem] overflow-hidden bg-[#0B0F17] border border-white/5 relative isolate">
                    {/* Dashboard Component */}
                    <Dashboard data={dashboardData} loading={false} />
                    
                    {/* Glass Reflection Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30 z-20 rounded-[2rem]"></div>
                 </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-5 -right-5 z-40 animate-bounce-slow">
                <div className="flex items-center gap-2 bg-[#0f172a] border border-red-500/30 text-red-500 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    LIVE
                </div>
            </div>

          </div>
        </div>

      </main>

      {/* TikTok Section */}
      <TikTokSection />
      
      {/* Footer Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>
    </div>
  );
};

export default App;