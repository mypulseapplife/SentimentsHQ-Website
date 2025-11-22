import React from 'react';

// SVG Logos components for crisp rendering at any size

const LogoAccenture = () => (
  <svg className="h-full w-auto" viewBox="0 0 140 40" fill="currentColor">
    <path d="M10,25 L20,10 L30,25" fill="none" stroke="currentColor" strokeWidth="3" />
    <text x="35" y="28" fontFamily="sans-serif" fontWeight="bold" fontSize="20" letterSpacing="-1">accenture</text>
  </svg>
);

const LogoMCB = () => (
  <svg className="h-full w-auto" viewBox="0 0 120 40" fill="currentColor">
    <rect x="5" y="10" width="20" height="20" rx="2" fill="currentColor" fillOpacity="0.2"/>
    <path d="M15,10 L15,30 M5,20 L25,20" stroke="currentColor" strokeWidth="2" />
    <text x="35" y="28" fontFamily="serif" fontWeight="bold" fontSize="22">MCB</text>
  </svg>
);

const LogoArtisan = () => (
  <svg className="h-full w-auto" viewBox="0 0 180 40" fill="currentColor">
    <path d="M15,12 C15,12 10,15 10,20 C10,25 15,28 20,28 C25,28 30,25 30,20 C30,15 25,12 25,12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M30,15 C32,15 34,17 34,20 C34,23 32,25 30,25" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <text x="45" y="26" fontFamily="monospace" fontWeight="bold" fontSize="18" letterSpacing="1">ARTISAN</text>
  </svg>
);

const LogoLux = () => (
  <svg className="h-full w-auto" viewBox="0 0 100 40" fill="currentColor">
    <text x="5" y="28" fontFamily="serif" fontWeight="bold" fontSize="24">LUX</text>
    <text x="60" y="15" fontFamily="sans-serif" fontSize="14">*</text>
    <text x="60" y="28" fontFamily="sans-serif" fontSize="8" letterSpacing="1">RESORTS</text>
  </svg>
);

const LogoCiel = () => (
  <svg className="h-full w-auto" viewBox="0 0 100 40" fill="currentColor">
    <circle cx="15" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M15,12 L15,20 L20,25" stroke="currentColor" strokeWidth="1.5" />
    <text x="32" y="27" fontFamily="sans-serif" fontWeight="bold" fontSize="20" letterSpacing="2">CIEL</text>
  </svg>
);

const LogoVendi = () => (
  <svg className="h-full w-auto" viewBox="0 0 120 40" fill="currentColor">
    <path d="M10,12 L15,28 L20,12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="30" y="28" fontFamily="sans-serif" fontWeight="800" fontSize="20" letterSpacing="-0.5">Vendi</text>
  </svg>
);

const logos = [
  { id: 1, Component: LogoAccenture },
  { id: 2, Component: LogoMCB },
  { id: 3, Component: LogoLux },
  { id: 4, Component: LogoCiel },
  { id: 5, Component: LogoArtisan },
  { id: 6, Component: LogoVendi },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-14 border-y border-white/5 bg-[#02040a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-20">
        
        {/* Static Text Section */}
        <div className="md:w-56 shrink-0 text-center md:text-left relative z-20 bg-[#02040a] md:bg-transparent">
           <p className="text-lg text-slate-300 font-medium leading-relaxed tracking-wide">
             Trusted by fast-growing companies around the world
           </p>
        </div>

        {/* Scrolling Logos Section */}
        <div className="flex-1 relative overflow-hidden h-24 flex items-center w-full">
             
             {/* Gradient Masks to fade in/out */}
             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#02040a] via-[#02040a]/90 to-transparent z-10 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#02040a] via-[#02040a]/90 to-transparent z-10 pointer-events-none"></div>

             {/* Animated Track */}
             <div className="flex animate-scroll items-center">
                
                {/* First Set */}
                <div className="flex items-center gap-20 pr-20 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`a-${idx}`} className="h-11 text-slate-400 hover:text-white transition-all duration-500 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                           <Logo.Component />
                        </div>
                    ))}
                </div>

                {/* Duplicate Set for Infinite Loop */}
                <div className="flex items-center gap-20 pr-20 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`b-${idx}`} className="h-11 text-slate-400 hover:text-white transition-all duration-500 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                           <Logo.Component />
                        </div>
                    ))}
                </div>
                
                {/* Triplicate Set to ensure full coverage on very wide screens */}
                <div className="flex items-center gap-20 pr-20 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`c-${idx}`} className="h-11 text-slate-400 hover:text-white transition-all duration-500 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
                           <Logo.Component />
                        </div>
                    ))}
                </div>
                
                {/* Quadruplicate Set just in case */}
                <div className="flex items-center gap-20 pr-20 shrink-0">
                    {logos.map((Logo, idx) => (
                        <div key={`d-${idx}`} className="h-11 text-slate-400 hover:text-white transition-all duration-500 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 cursor-pointer">
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