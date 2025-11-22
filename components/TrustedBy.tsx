import React from 'react';

// SVG Logos components for crisp rendering at any size
const LogoStripe = () => (
  <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor">
    <path d="M10,15 L20,5 L20,25 L10,15 M30,5 L30,25 L40,25 L40,20 L35,20 L35,17 L40,17 L40,12 L35,12 L35,5 L30,5 Z" fillOpacity="0.9"/>
    <text x="45" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">STRIPE</text>
  </svg>
);

const LogoSpotify = () => (
  <svg className="h-7 w-auto" viewBox="0 0 110 30" fill="currentColor">
    <circle cx="15" cy="15" r="10" fillOpacity="0.9"/>
    <path d="M10,12 Q15,8 20,12 M9,15 Q15,11 21,15 M10,18 Q15,15 20,18" stroke="black" strokeWidth="1.5" fill="none"/>
    <text x="32" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">Spotify</text>
  </svg>
);

const LogoSlack = () => (
  <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor">
    <rect x="5" y="5" width="8" height="8" rx="2" fillOpacity="0.8"/>
    <rect x="15" y="5" width="8" height="8" rx="2" fillOpacity="0.6"/>
    <rect x="5" y="15" width="8" height="8" rx="2" fillOpacity="0.6"/>
    <rect x="15" y="15" width="8" height="8" rx="2" fillOpacity="0.8"/>
    <text x="32" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">slack</text>
  </svg>
);

const LogoNetflix = () => (
  <svg className="h-7 w-auto" viewBox="0 0 110 30" fill="currentColor">
    <path d="M10,5 L15,5 L25,25 L25,5 L30,5 L30,25 L25,25 L15,5 L15,25 L10,25 Z" fillOpacity="0.9"/>
    <text x="40" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">NETFLIX</text>
  </svg>
);

const LogoAirbnb = () => (
  <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor">
    <path d="M15,5 C10,5 5,10 5,15 C5,22 15,28 15,28 C15,28 25,22 25,15 C25,10 20,5 15,5 Z M15,20 C12,20 12,15 15,12 C18,15 18,20 15,20 Z" fillOpacity="0.9"/>
    <text x="35" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">airbnb</text>
  </svg>
);

const LogoUber = () => (
  <svg className="h-7 w-auto" viewBox="0 0 90 30" fill="currentColor">
    <circle cx="15" cy="15" r="10" fill="none" stroke="currentColor" strokeWidth="3"/>
    <rect x="10" y="14" width="10" height="2" fill="currentColor"/>
    <text x="35" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">Uber</text>
  </svg>
);

const LogoNotion = () => (
  <svg className="h-7 w-auto" viewBox="0 0 100 30" fill="currentColor">
    <rect x="8" y="5" width="14" height="18" rx="2" fillOpacity="0.9"/>
    <text x="32" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">Notion</text>
  </svg>
);

const LogoDiscord = () => (
  <svg className="h-7 w-auto" viewBox="0 0 110 30" fill="currentColor">
    <path d="M10,10 C10,5 20,5 20,10 L20,20 C20,25 10,25 10,20 Z" fillOpacity="0.9"/>
    <text x="30" y="22" fontFamily="sans-serif" fontWeight="bold" fontSize="16">Discord</text>
  </svg>
);

const logos = [
  { id: 1, Component: LogoStripe },
  { id: 2, Component: LogoSpotify },
  { id: 3, Component: LogoSlack },
  { id: 4, Component: LogoNetflix },
  { id: 5, Component: LogoAirbnb },
  { id: 6, Component: LogoUber },
  { id: 7, Component: LogoNotion },
  { id: 8, Component: LogoDiscord },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-10 border-y border-white/5 bg-[#02040a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        
        {/* Static Text Section */}
        <div className="md:w-48 shrink-0 text-center md:text-left relative z-20 bg-[#02040a] md:bg-transparent">
           <p className="text-sm text-slate-400 font-medium leading-relaxed">
             Trusted by fast-growing companies around the world
           </p>
        </div>

        {/* Scrolling Logos Section */}
        <div className="flex-1 relative overflow-hidden h-20 flex items-center w-full">
             
             {/* Gradient Masks to fade in/out - Stronger mask on left to fade before text */}
             <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#02040a] via-[#02040a]/80 to-transparent z-10 pointer-events-none"></div>

             {/* Animated Track - Single wrapper moving left */}
             <div className="flex animate-scroll items-center">
                
                {/* First Set */}
                <div className="flex items-center gap-16 pr-16 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`a-${idx}`} className="text-slate-600 hover:text-white transition-colors duration-500 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                           <Logo.Component />
                        </div>
                    ))}
                </div>

                {/* Duplicate Set for Infinite Loop */}
                <div className="flex items-center gap-16 pr-16 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`b-${idx}`} className="text-slate-600 hover:text-white transition-colors duration-500 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                           <Logo.Component />
                        </div>
                    ))}
                </div>
                
                {/* Triplicate Set to ensure full coverage on very wide screens */}
                <div className="flex items-center gap-16 pr-16 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`c-${idx}`} className="text-slate-600 hover:text-white transition-colors duration-500 opacity-70 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                           <Logo.Component />
                        </div>
                    ))}
                </div>

             </div>
        </div>
      </div>
    </section>
  );
};
