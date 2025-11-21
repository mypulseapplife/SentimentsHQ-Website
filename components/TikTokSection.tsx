import React, { useEffect } from 'react';
import { MessageCircle, Eye, TrendingUp, AlertTriangle, MapPin, Flame, AlertOctagon } from 'lucide-react';

const TIKTOK_DATA = [
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
    id: '7562367991032155413',
    url: 'https://www.tiktok.com/@alexbiron/video/7562367991032155413',
    company: 'Limoncello Miami',
    location: 'Miami, Florida',
    views: '22.1M',
    comments: '48.9k',
    impact: 'STAFF TERMINATION',
    summary: 'Aggressive staff behavior caught on camera resulted in immediate terminations and targeted hate campaigns.'
  }
];

export const TikTokSection: React.FC = () => {
  useEffect(() => {
    const scriptId = 'tiktok-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 opacity-0 animate-fade-in-up duration-700">
            <div className="space-y-6 max-w-3xl">
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-[0.95]">
                    Real life <span className="text-red-500">viral-risk</span> content detected.
                </h2>
                <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl">
                    The speed of cancellation is accelerating. See how these real brands lost control of their narrative in hours.
                </p>
            </div>
            <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-full text-sm font-bold text-red-400 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <Flame size={18} className="text-red-500 fill-red-500" />
                <span>HIGH VELOCITY THREATS</span>
            </div>
        </div>

        {/* Carousel */}
        <div className="flex overflow-x-auto gap-6 pb-16 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide lg:justify-center">
            {TIKTOK_DATA.map((item, index) => (
                <div 
                  key={item.id} 
                  className="snap-center shrink-0 w-[85vw] md:w-[350px] bg-[#0f1115] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_20px_60px_-20px_rgba(220,38,38,0.15)] group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${100 + (index * 100)}ms`, animationFillMode: 'forwards' }}
                >
                    {/* Crisis Header Block */}
                    <div className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/5">
                        
                        {/* Company Identity */}
                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                                        {item.company}
                                    </h3>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                        <MapPin size={12} className="text-slate-500" />
                                        {item.location}
                                    </div>
                                </div>
                                <div className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(220,38,38,0.6)] animate-pulse">
                                    Verified Crisis
                                </div>
                            </div>
                        </div>

                        {/* Impact Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="relative p-3 bg-white/[0.02] rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-2 text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1">
                                    <Eye size={12} /> Views
                                </div>
                                <div className="text-2xl font-bold text-white tracking-tighter">
                                    {item.views}
                                </div>
                            </div>
                            <div className="relative p-3 bg-white/[0.02] rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-2 text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1">
                                    <MessageCircle size={12} /> Comments
                                </div>
                                <div className="text-2xl font-bold text-white tracking-tighter">
                                    {item.comments}
                                </div>
                            </div>
                        </div>

                        {/* Impact Summary */}
                        <div className="relative bg-red-500/[0.03] border border-red-500/20 rounded-xl p-4 overflow-hidden group-hover:bg-red-500/[0.05] transition-all duration-500">
                             <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 rounded-l-xl"></div>
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                             
                             <div className="mb-1.5 flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-wider relative z-10">
                                <AlertOctagon size={12} />
                                <span>Consequence: {item.impact}</span>
                             </div>
                             <p className="text-xs text-slate-300 leading-relaxed font-medium relative z-10">
                                "{item.summary}"
                             </p>
                        </div>
                    </div>
                    
                    {/* Video Container */}
                    <div className="relative bg-black flex-1 min-h-[580px] flex items-center justify-center border-t border-white/5">
                        <div className="w-full h-full scale-[1.0] origin-top"> 
                             <blockquote 
                                className="tiktok-embed" 
                                cite={item.url}
                                data-video-id={item.id} 
                                style={{maxWidth: '100%', minWidth: '325px', margin: 0}} 
                            > 
                                <section> 
                                    <a target="_blank" href={item.url} className="text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm w-full h-96">
                                        <div className="w-6 h-6 border-2 border-slate-700 border-t-white rounded-full animate-spin"></div>
                                    </a> 
                                </section> 
                            </blockquote>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1115] to-transparent pointer-events-none"></div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};