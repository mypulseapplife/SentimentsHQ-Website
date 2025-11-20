import React, { useEffect } from 'react';
import { MessageCircle, Eye, TrendingUp } from 'lucide-react';

const TIKTOK_DATA = [
  {
    id: '7530126495008689422',
    url: 'https://www.tiktok.com/@itskarlabb/video/7530126495008689422',
    company: 'Kis Cafe',
    views: '30.2M',
    comments: '36.5k',
    impact: 'Service Complaint'
  },
  {
    id: '7565632133260234014',
    url: 'https://www.tiktok.com/@kimmyk561/video/7565632133260234014',
    company: 'Texas Road House Steak',
    views: '18.4M',
    comments: '52.1k',
    impact: 'Food Safety'
  },
  {
    id: '7569711258534939959',
    url: 'https://www.tiktok.com/@so_thats_toya/video/7569711258534939959',
    company: 'The Joule SPA texas',
    views: '6.7M',
    comments: '15.3k',
    impact: 'Customer Service'
  },
  {
    id: '7540010763990224183',
    url: 'https://www.tiktok.com/@auroramccausland/video/7540010763990224183',
    company: 'Cigna Healthcare',
    views: '9.2M',
    comments: '31.8k',
    impact: 'Policy Backlash'
  },
  {
    id: '7562367991032155413',
    url: 'https://www.tiktok.com/@alexbiron/video/7562367991032155413',
    company: 'Limoncello Miami',
    views: '22.1M',
    comments: '48.9k',
    impact: 'Viral Altercation'
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
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Viral <span className="text-brand-red">Threats</span> Detected
                </h2>
                <p className="text-slate-400 max-w-2xl text-lg">
                    See real-time examples of brand reputation crises unfolding on TikTok. 
                    These videos generated millions of views in hours, destroying trust overnight.
                </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm text-slate-400">
                <TrendingUp size={16} className="text-brand-red" />
                <span>Trending Negative Sentiment</span>
            </div>
        </div>

        {/* Carousel */}
        <div className="flex overflow-x-auto gap-6 pb-10 pt-2 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
            {TIKTOK_DATA.map((item) => (
                <div key={item.id} className="snap-center shrink-0 w-[340px] bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col hover:border-slate-700 transition-all duration-300 group">
                    {/* Header */}
                    <div className="p-5 bg-slate-900 border-b border-slate-800">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-lg font-bold text-white truncate max-w-[200px]" title={item.company}>
                                {item.company}
                            </h3>
                            <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-500/10 text-brand-red border border-red-500/20 uppercase tracking-wider">
                                {item.impact}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Views</span>
                                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                    <Eye size={14} />
                                    {item.views}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Comments</span>
                                <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                                    <MessageCircle size={14} />
                                    {item.comments}
                                </div>
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
                                <a target="_blank" href={item.url} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2">
                                   Loading TikTok...
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