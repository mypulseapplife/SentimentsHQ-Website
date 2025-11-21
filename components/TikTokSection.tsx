import React, { useEffect } from 'react';
import { MessageCircle, Eye, TrendingUp, AlertTriangle } from 'lucide-react';

const TIKTOK_DATA = [
  {
    id: '7530126495008689422',
    url: 'https://www.tiktok.com/@itskarlabb/video/7530126495008689422',
    company: 'Kis Cafe',
    views: '30.2M',
    comments: '36.5k',
    impact: 'Service Complaint',
    summary: 'This video led to the permanent shutdown of the business in just 7 days following mass community boycott.'
  },
  {
    id: '7565632133260234014',
    url: 'https://www.tiktok.com/@kimmyk561/video/7565632133260234014',
    company: 'Texas Road House',
    views: '18.4M',
    comments: '52.1k',
    impact: 'Food Safety',
    summary: 'Viral exposure of health violations forced an immediate corporate apology, audit, and public PR crisis.'
  },
  {
    id: '7569711258534939959',
    url: 'https://www.tiktok.com/@so_thats_toya/video/7569711258534939959',
    company: 'The Joule SPA',
    views: '6.7M',
    comments: '15.3k',
    impact: 'Customer Service',
    summary: 'Discriminatory service allegations sparked a massive review bombing campaign, dropping rating by 2.5 stars.'
  },
  {
    id: '7540010763990224183',
    url: 'https://www.tiktok.com/@auroramccausland/video/7540010763990224183',
    company: 'Cigna Healthcare',
    views: '9.2M',
    comments: '31.8k',
    impact: 'Policy Backlash',
    summary: 'Patient denial story went viral, pressuring executives to reverse the decision and issue a public statement.'
  },
  {
    id: '7562367991032155413',
    url: 'https://www.tiktok.com/@alexbiron/video/7562367991032155413',
    company: 'Limoncello Miami',
    views: '22.1M',
    comments: '48.9k',
    impact: 'Viral Altercation',
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
    <section className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 opacity-0 animate-fade-in-up duration-700">
            <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
                    Real life <span className="text-red-500">viral-risk content</span> detected.
                </h2>
                <p className="text-slate-400 text-lg font-light leading-relaxed">
                    Real-time examples of brand reputation crises unfolding on TikTok. 
                    These videos generated millions of views in hours, destroying trust overnight.
                </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300 backdrop-blur-sm">
                <TrendingUp size={14} className="text-red-500" />
                <span>Trending Negative Sentiment</span>
            </div>
        </div>

        {/* Carousel */}
        <div className="flex overflow-x-auto gap-6 pb-12 pt-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
            {TIKTOK_DATA.map((item, index) => (
                <div 
                  key={item.id} 
                  className="snap-center shrink-0 w-[340px] bg-[#0a0f1e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-500 hover:border-white/10 hover:-translate-y-1 group opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${100 + (index * 100)}ms`, animationFillMode: 'forwards' }}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-base font-semibold text-white truncate max-w-[180px]" title={item.company}>
                                {item.company}
                            </h3>
                            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-red-500/10 text-red-500 tracking-wide">
                                {item.impact}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 mb-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Views</span>
                                <div className="flex items-center gap-1.5 text-white font-medium">
                                    <Eye size={14} className="text-slate-400" />
                                    {item.views}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Comments</span>
                                <div className="flex items-center gap-1.5 text-white font-medium">
                                    <MessageCircle size={14} className="text-slate-400" />
                                    {item.comments}
                                </div>
                            </div>
                        </div>

                        {/* Summary Statement */}
                        <div className="relative bg-white/5 rounded-lg p-3 border border-white/5">
                             <div className="flex items-start gap-2">
                                <AlertTriangle size={12} className="text-red-500 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                                    {item.summary}
                                </p>
                             </div>
                        </div>
                    </div>
                    
                    {/* Video Body */}
                    <div className="relative bg-black flex-1 min-h-[600px] flex items-center justify-center overflow-hidden">
                        <blockquote 
                            className="tiktok-embed" 
                            cite={item.url}
                            data-video-id={item.id} 
                            style={{maxWidth: '605px', minWidth: '325px', margin: 0}} 
                        > 
                            <section> 
                                <a target="_blank" href={item.url} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm">
                                   Loading Video...
                                </a> 
                            </section> 
                        </blockquote>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};