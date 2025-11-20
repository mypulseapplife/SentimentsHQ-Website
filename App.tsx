import React, { useState } from 'react';
import { Shield, ChevronRight, Mail } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TikTokSection } from './components/TikTokSection';
import { DashboardState } from './types';

// Initial Mock Data
const INITIAL_DATA: DashboardState = {
  level: 7,
  currentXP: 2340,
  maxXP: 3000,
  vibeScore: 72,
  streak: 3,
  totalMentions: 1420,
  reach: "2.4M",
  alerts: [
    { id: '1', type: 'CRITICAL', message: 'Viral TikTok detected: 50K views in 30 minutes', time: '2 min ago', impact: '-12% sentiment', xp: 25 },
    { id: '2', type: 'WARNING', message: 'Reddit thread gaining traction: -12% sentiment', time: '15 min ago', impact: 'Monitoring' },
    { id: '3', type: 'SUCCESS', message: 'Positive coverage detected across 5 platforms', time: '1 hour ago', impact: '+5% sentiment' },
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

const App: React.FC = () => {
  const [dashboardData] = useState<DashboardState>(INITIAL_DATA);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-brand-pink selection:text-white flex flex-col">
      
      {/* Left-Aligned Navbar */}
      <nav className="w-full py-8 px-6 flex items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-purple to-brand-pink rounded-lg flex items-center justify-center shadow-lg shadow-brand-purple/20">
            <Shield className="text-white" size={24} fill="currentColor" fillOpacity={0.2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight leading-none">VibeScore</h1>
            <span className="text-xs text-slate-400">by Sentiment AI</span>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 md:px-8 pt-8 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 z-10">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Protect Your Brand <br />
            Before It's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-pink to-brand-purple">Too Late</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
            Real-time reputation monitoring from across the entire web. 
            Detect threats, catch sentiment shifts and take control of your brand narrative.
          </p>

          {/* Form Area */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mt-2">
            <div className="relative flex-grow group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg blur-sm group-hover:blur transition-all duration-300 opacity-50"></div>
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative w-full bg-slate-950/80 border border-slate-800 rounded-lg px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
            </div>
            <button className="relative overflow-hidden group bg-brand-purple hover:bg-brand-pink transition-all duration-300 text-white font-semibold rounded-lg px-8 py-4 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]">
              <span>Join Waitlist</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-400">
            {['Real-time monitoring', 'Instant alerts', 'Free 14-day trial'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-purple"></div>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right Content (Dashboard Preview) */}
        <div className="relative w-full flex items-center justify-center perspective-[2000px] group">
          {/* Glow Effects behind dashboard */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-purple/20 blur-[100px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
          
          {/* 3D Tilt Effect Container */}
          <div className="relative w-full max-w-3xl transform transition-all duration-500 hover:rotate-y-[-2deg] hover:rotate-x-[2deg]">
              
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 z-20">
                  <div className="relative">
                      <div className="absolute inset-0 bg-red-500 blur-lg opacity-50 animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl border border-red-400/50 flex items-center gap-2">
                         <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                         +150 XP LIVE
                      </div>
                  </div>
              </div>

              <Dashboard data={dashboardData} loading={false} />
              
              {/* Reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-xl pointer-events-none"></div>
          </div>
        </div>

      </main>

      {/* TikTok Section */}
      <TikTokSection />
      
      {/* Floating Footer element just for style */}
      <div className="fixed bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
    </div>
  );
};

export default App;