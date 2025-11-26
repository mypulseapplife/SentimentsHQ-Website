import React, { useEffect, memo } from 'react';
import { MessageCircle, Eye, MapPin, Flame, AlertOctagon, Play } from 'lucide-react';

const TIKTOK_DATA = [
  {
    id: '7565632133260234014',
    url: 'https://www.tiktok.com/@kimmyk561/video/7565632133260234014',
    company: 'Texas Roadhouse',
    location: 'West Palm Beach, Florida',
    views: '18.4M',
    comments: '52.1k',
    impact: 'HEALTH CODE VIOLATION',
    summary: 'Viral exposure of health violations forced an immediate corporate apology, third-party audit, and public PR crisis.'
  },
  {
    id: '7562367991032155413',
    url: 'https://www.tiktok.com/@alexbiron/video/7562367991032155413',
    company: 'Limoncello Miami',
    location: 'Miami, Florida',
    views: '22.1M',
    comments: '48.9k',
    impact: 'STAFF TERMINATION',
    summary: 'Aggressive staff behavior caught on camera resulted in immediate terminations and targeted hate campaigns.'
  },
  {
    id: '7530126495008689422',
    url: 'https://www.tiktok.com/@itskarlabb/video/7530126495008689422',
    company: 'Kis Cafe',
    location: 'Hayes St, San Francisco, CA',
    views: '30.2M',
    comments: '36.5k',
    impact: 'CRITICAL FAILURE',
    summary: 'This video led to the permanent shutdown of the business in just 7 days following mass community boycott.'
  },
  {
    id: '7569711258534939959',
    url: 'https://www.tiktok.com/@so_thats_toya/video/7569711258534939959',
    company: 'The Joule Spa',
    location: 'Dallas, Texas',
    views: '6.7M',
    comments: '15.3k',
    impact: 'REPUTATION DAMAGE',
    summary: 'Discriminatory service allegations sparked a massive review bombing campaign, dropping rating by 2.5 stars overnight.'
  },
  {
    id: '7540010763990224183',
    url: 'https://www.tiktok.com/@auroramccausland/video/7540010763990224183',
    company: 'Cigna Healthcare',
    location: 'Bloomfield, Connecticut',
    views: '9.2M',
    comments: '31.8k',
    impact: 'BRAND BOYCOTT',
    summary: 'Patient denial story went viral, pressuring executives to reverse the decision publicly within 48 hours.'
  },
  {
    id: '7556755811742092575',
    url: 'https://www.tiktok.com/@adventure.sleep.repeat/video/7556755811742092575',
    company: 'Mazda USA',
    location: 'Vancouver, Washington',
    views: '8.5M',
    comments: '14.2k',
    impact: 'WARRANTY DENIAL',
    summary: 'Spontaneous sunroof explosion denied by warranty sparked viral outrage regarding vehicle build quality and safety.'
  }
];

export const TikTokSection: React.FC = memo(() => {
  useEffect(() => {
    // Check if script is already present to avoid duplicates
    const scriptId = 'tiktok-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      const existingScript = document.getElementById(scriptId);
      // @ts-ignore
      if (window.tiktok) {
        // @ts-ignore
        window.tiktok.embed.load();
      }
    }
  }, []);

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none"></div>

      {/* Container adjusted for 3-column layout balance */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 md:gap-8 opacity-0 animate-fade-in-up duration-700 max-w-[1200px] mx-auto text-center md:text-left">
            <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto md:mx-0">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.95]">
                    When <span className="text-red-500">viral-risk</span> content goes undetected.
                </h2>
                <p className="text-slate-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                    The speed of reputation crisis is accelerating. See how these real brands lost control of their narrative in hours.
                </p>
            </div>
            <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-bold text-red-400 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <Flame size={18} className="text-red-500 fill-red-500" />
                <span>HIGH VELOCITY THREATS</span>
            </div>
        </div>

        {/* Grid Layout: 1 Col Mobile, 3 Cols Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12">
            {TIKTOK_DATA.map((item, index) => (
                <div 
                  key={item.id} 
                  className="w-full bg-[#0f1115] border border-white/5 rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_20px_60px_-20px_rgba(220,38,38,0.15)] group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${100 + (index * 100)}ms`, animationFillMode: 'forwards' }}
                >
                    {/* Crisis Header Block */}
                    <div className="p-4 bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/5">
                        
                        {/* Company Identity */}
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg font-bold text-white tracking-tight mb-0.5 truncate">
                                        {item.company}
                                    </h3>
                                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium truncate">
                                        <MapPin size={10} className="text-slate-500 shrink-0" />
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                </div>
                                {/* Compact Crisis Badge */}
                                <div className="shrink-0 px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(220,38,38,0.6)] animate-pulse">
                                    Crisis
                                </div>
                            </div>
                        </div>

                        {/* Impact Metrics */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="relative p-2 bg-white/[0.02] rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-1 text-[9px] uppercase text-slate-500 font-bold tracking-widest mb-0.5">
                                    <Eye size={10} /> Views
                                </div>
                                <div className="text-lg font-bold text-white tracking-tighter">
                                    {item.views}
                                </div>
                            </div>
                            <div className="relative p-2 bg-white/[0.02] rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-1 text-[9px] uppercase text-slate-500 font-bold tracking-widest mb-0.5">
                                    <MessageCircle size={10} /> Comments
                                </div>
                                <div className="text-lg font-bold text-white tracking-tighter">
                                    {item.comments}
                                </div>
                            </div>
                        </div>

                        {/* Impact Summary */}
                        <div className="relative bg-red-500/[0.03] border border-red-500/20 rounded-lg p-3 overflow-hidden group-hover:bg-red-500/[0.05] transition-all duration-500">
                             <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 rounded-l-lg"></div>
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                             
                             <div className="mb-1 flex items-center gap-1.5 text-red-400 font-bold text-[9px] uppercase tracking-wider relative z-10">
                                <AlertOctagon size={10} />
                                <span className="truncate">{item.impact}</span>
                             </div>
                             <p className="text-[10px] text-slate-300 leading-relaxed font-medium relative z-10 line-clamp-3">
                                "{item.summary}"
                             </p>
                        </div>
                    </div>
                    
                    {/* Video Container */}
                    <div className="relative bg-black flex-1 min-h-[420px] flex items-center justify-center border-t border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="w-full h-full flex items-center justify-center overflow-hidden"> 
                             <blockquote 
                                className="tiktok-embed" 
                                cite={item.url}
                                data-video-id={item.id} 
                                style={{maxWidth: '100%', minWidth: 'auto', width: '100%', margin: 0}} 
                            > 
                                <section> 
                                    {/* Optimized Skeleton Loader */}
                                    <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center z-20 w-full h-full animate-pulse">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                                            <Play size={24} fill="white" className="text-white opacity-50 ml-1" />
                                        </div>
                                        <div className="w-32 h-2 bg-white/10 rounded-full"></div>
                                        <div className="absolute bottom-12 left-6 right-6 space-y-3">
                                            <div className="w-3/4 h-3 bg-white/10 rounded-full"></div>
                                            <div className="w-1/2 h-3 bg-white/10 rounded-full"></div>
                                        </div>
                                    </div>
                                </section> 
                            </blockquote>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f1115] to-transparent pointer-events-none z-30"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
});