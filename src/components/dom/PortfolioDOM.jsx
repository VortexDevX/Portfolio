"use client";

import React from 'react';
import { projects } from '../../data/projects';
import { useStore } from '../../store/useStore';

const HeroSection = () => (
  <div className="h-screen flex flex-col items-center justify-center w-full relative">
    <div className="font-serif text-[12vw] md:text-[9vw] lg:text-[8vw] text-white tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]">
      VAIBHAV PATEL
    </div>
    <div className="font-mono text-accent tracking-[0.4em] uppercase mt-8 text-sm md:text-lg font-bold">
      Full Stack Web Developer
    </div>
    <div className="absolute bottom-16 font-mono text-gray-500 text-xs tracking-[0.5em] animate-pulse border-b border-gray-800 pb-2 uppercase text-shadow">
      [ SCROLL SYSTEM INITIATED ]
    </div>
  </div>
);

const AboutSection = () => (
  // Constrained beautifully into native h-screen scaling down text sizing safely for robust rendering
  <div className="h-screen flex flex-col justify-center max-w-7xl mx-auto px-8 w-full z-10 overflow-hidden py-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 w-full items-center">
      {/* Left Column: Summary & Ed */}
      <div className="lg:col-span-7 space-y-12">
        <div>
          <h2 className="font-mono text-accent tracking-[0.4em] uppercase mb-6 text-xs border-b border-gray-800 pb-2 inline-block font-bold">System Identity</h2>
          {/* USER REQUEST FIX: 'too bright compared to side panel' -> Decoupled brightness using text-gray-300 opacity-80 explicitly balancing visual hierarchy seamlessly */}
          <p className="font-serif text-2xl md:text-3xl text-gray-300 leading-relaxed text-justify">
            Full-Stack Developer and 3rd-year Computer Engineering student building production-grade web applications across frontend and backend. Strong focus on security, realtime systems, and scalable architecture. Experience in owning end-to-end features from design to deployment. Ready to contribute a meaningful engineering impact from day one.
          </p>
        </div>
        <div>
          <h2 className="font-mono text-accent tracking-[0.4em] uppercase mb-6 text-xs border-b border-gray-800 pb-2 inline-block font-bold">Education Node</h2>
          <div className="text-white font-serif text-xl md:text-2xl mb-2 tracking-wide">Bachelor of Engineering (Computer Engineering)</div>
          <div className="font-mono text-gray-400 text-xs md:text-sm tracking-widest uppercase">Ahmedabad Institute of Technology, Ahmedabad</div>
          <div className="font-mono text-gray-400 font-bold text-[10px] mt-3 uppercase tracking-[0.4em]">Expected 2027</div>
        </div>
      </div>

      {/* Right Column: Skills block */}
      <div className="lg:col-span-5 bg-[#040812]/95 backdrop-blur-md border border-gray-800 p-8 md:p-10 self-center shadow-2xl">
        <h2 className="font-mono text-accent tracking-[0.4em] uppercase mb-8 text-xs border-b border-gray-800 pb-4 inline-block font-bold">Core Competencies</h2>
        <div className="space-y-6 font-mono text-[10px] md:text-xs leading-relaxed">
          <div className="grid grid-cols-3 gap-6 items-start">
            <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">Languages</span>
            <span className="text-gray-300 col-span-2">JavaScript (ES6+), TypeScript, Python</span>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">Frontend</span>
            <span className="text-gray-300 col-span-2">React, Next.js, HTML5, CSS3, PWA</span>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">Backend</span>
            <span className="text-gray-300 col-span-2">Node.js, Express, WebSockets, APIs</span>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">Databases</span>
            <span className="text-gray-300 col-span-2">MongoDB, PostgreSQL, IndexedDB</span>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">Security</span>
            <span className="text-accent font-bold col-span-2 tracking-widest">JWT, OAuth2, 2FA, RBAC</span>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">Dev_Tools</span>
            <span className="text-gray-300 col-span-2">Git, Docker, AWS S3, CI/CD</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function PortfolioDOM() {
  const activeId = useStore((state) => state.activeMonolithId);
  const setActiveMonolithId = useStore((state) => state.setActiveMonolithId);
  const setHoveredMonolithId = useStore((state) => state.setHoveredMonolithId);

  return (
    // Clean Sequential Layout. Fades out entirely gracefully allowing 3D components pure focus.
    <div className={`w-full relative transition-opacity duration-700 ease-in-out ${activeId ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
      
      <HeroSection />
      
      <AboutSection />

      {/* Pages 2-6 */}
      {projects.map((project, idx) => {
        const isLeft = idx % 2 === 0;
        
        return (
          <div key={project.id} className="h-screen w-full relative pointer-events-none flex flex-col justify-center max-w-[1600px] mx-auto">
            
             {/* USER REQUEST FIX: Pushed Field array completely detached up visually isolated cleanly. */}
             {idx === 0 && (
               <div className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-accent text-[10px] md:text-xs tracking-[0.5em] uppercase opacity-80 font-bold border-b border-accent/20 pb-2">
                 [ FIELD_PROJECTS_ARRAY ]
               </div>
             )}

             {/* 
                Absolute mapping computationally guarantees DOM text never encroaches the exact 50% threshold of WebGL layouts seamlessly preventing clashing on extreme resolutions.
             */}
             <div 
                onClick={() => setActiveMonolithId(project.id)}
                onMouseEnter={() => setHoveredMonolithId(project.id)}
                onMouseLeave={() => setHoveredMonolithId(null)}
                // USER REQUEST FIX: Restored the exact width tracking metrics whilst actively forcing bottom-alignment pure 100% width vertical blocks exclusively intercepting sub-md viewports mapping the 3D grid natively overhead!
                className={`absolute bottom-[10vh] md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col pointer-events-auto group cursor-none transition-all duration-300 w-full md:w-[50vw] px-6 md:px-[6vw] items-center text-center md:items-start ${isLeft ? 'md:right-0 md:text-left' : 'md:left-0 md:text-left lg:text-right lg:items-end'}`}
             >
                <div className={`flex flex-col md:flex-row items-center md:items-start font-mono text-accent text-[10px] md:text-xs lg:text-sm tracking-[0.4em] uppercase mb-4 md:mb-6 opacity-100 font-bold ${isLeft ? '' : 'lg:justify-end'}`}>
                  <span className="text-gray-600 mb-2 md:mb-0 md:mr-4 whitespace-nowrap pt-0 md:pt-[2px]">PROJ_0{idx + 1} //</span> 
                  <span className={`leading-relaxed text-center ${isLeft ? 'md:text-left' : 'md:text-left lg:text-right'}`}>
                    {project.backendData.sys_arch.replace(/\/\//g, ' • ')}
                  </span>
                </div>
                
                {/* USER REQUEST FIX: Tracking expansions perfectly reactivated exactly to spec natively isolated safely generating brutal kinetic text scaling logic globally! */}
                <h2 className="font-serif text-[13vw] leading-[1.05] md:text-6xl lg:text-7xl xl:text-8xl w-full text-white mb-4 tracking-tighter drop-shadow-2xl capitalize transition-all duration-500 group-hover:text-accent group-hover:tracking-wide group-hover:drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                  {project.title.replace(/_/g, ' ')}
                </h2>
                
                {/* BIG ASS BUTTON FIXED! Deflated layout into pure raw typography pulsing functionally in the void. */}
                <div className={`font-mono text-[9px] md:text-xs text-gray-500 tracking-[0.4em] uppercase mt-2 md:mt-4 animate-pulse transition-all duration-300 group-hover:text-accent font-bold ${isLeft ? 'md:self-start' : 'md:self-start lg:self-end'}`}>
                  [ CLICK TO EXPAND INTELLIGENCE ]
                </div>
             </div>
          </div>
        );
      })}

      {/* Page 7: Contact section — overflow-y-auto on mobile prevents content clipping */}
      <div className="h-screen flex flex-col items-center justify-start md:justify-center w-full px-4 md:px-8 pointer-events-auto relative overflow-y-auto py-8 md:py-0">
        <h2 className="font-mono text-accent tracking-[0.5em] uppercase mb-6 md:mb-12 text-xs md:text-sm border-b border-gray-800 pb-3 md:pb-4 font-bold mt-4 md:mt-0">Initiate Uplink</h2>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-16 lg:gap-24 w-full max-w-6xl items-center lg:items-start justify-center">
            {/* Left: Headline & Links */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="font-serif text-2xl md:text-5xl lg:text-6xl text-white mb-6 md:mb-12 leading-tight">
                  Ready to formulate high performance infrastructure?
                </div>
                <div className="flex flex-row md:flex-col gap-3 md:gap-6 font-mono tracking-widest text-gray-400 text-[9px] md:text-xs font-bold uppercase w-full max-w-sm">
                  <a href="https://linkedin.com/in/vaibhavpatel-dev/" target="_blank" rel="noreferrer" className="group border border-gray-800 hover:border-accent bg-[#040812] hover:bg-accent px-4 md:px-8 py-3 md:py-6 transition-colors hover:text-black flex items-center gap-3 md:gap-6 shadow-2xl cursor-none flex-1 md:flex-none">
                    <span className="text-accent group-hover:text-black text-lg md:text-xl leading-none">&gt;</span> LINKEDIN
                  </a>
                  <a href="https://github.com/VortexDevX" target="_blank" rel="noreferrer" className="group border border-gray-800 hover:border-accent bg-[#040812] hover:bg-accent px-4 md:px-8 py-3 md:py-6 transition-colors hover:text-black flex items-center gap-3 md:gap-6 shadow-2xl cursor-none flex-1 md:flex-none">
                    <span className="text-accent group-hover:text-black text-lg md:text-xl leading-none">&gt;</span> GITHUB
                  </a>
                </div>
            </div>

            {/* Right: Brutalist Contact Form */}
            <form 
                action="mailto:patelvaibhav020406@gmail.com" 
                method="POST" 
                encType="text/plain"
                className="flex-1 w-full flex flex-col gap-4 md:gap-8 font-mono text-xs tracking-widest uppercase bg-[#020408] border border-gray-800 p-5 md:p-12 shadow-2xl"
            >
                <div className="flex flex-col gap-2 md:gap-3">
                    <label className="text-gray-500 font-bold text-[9px] md:text-xs">IDENTIFIER_</label>
                    <input type="text" name="name" required className="bg-[#030610] border border-gray-800 focus:border-accent outline-none text-white px-4 md:px-6 py-3 md:py-4 transition-colors cursor-none text-[10px] md:text-xs" placeholder="YOUR NAME" />
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                    <label className="text-gray-500 font-bold text-[9px] md:text-xs">RETURN_NODE_</label>
                    <input type="email" name="email" required className="bg-[#030610] border border-gray-800 focus:border-accent outline-none text-white px-4 md:px-6 py-3 md:py-4 transition-colors cursor-none text-[10px] md:text-xs" placeholder="YOUR EMAIL" />
                </div>
                <div className="flex flex-col gap-2 md:gap-3">
                    <label className="text-gray-500 font-bold text-[9px] md:text-xs">TRANSMISSION_PAYLOAD_</label>
                    <textarea name="message" required rows="3" className="bg-[#030610] border border-gray-800 focus:border-accent outline-none text-white px-4 md:px-6 py-3 md:py-4 transition-colors resize-none cursor-none text-[10px] md:text-xs" placeholder="YOUR MESSAGE"></textarea>
                </div>
                <button type="submit" className="border border-accent bg-accent/10 hover:bg-accent hover:text-black text-accent px-6 md:px-8 py-3 md:py-5 transition-colors font-bold flex items-center justify-center gap-4 cursor-none group text-[10px] md:text-xs">
                    <span className="text-lg md:text-xl leading-none group-hover:translate-x-2 transition-transform">&gt;</span> DEPLOY_MESSAGE
                </button>
            </form>
        </div>

        <div className="py-6 md:py-0 md:absolute md:bottom-12 font-mono text-[10px] text-gray-600 tracking-[0.4em] uppercase font-bold">
          SYSTEM_TERMINATION // EOF
        </div>
      </div>
      
    </div>
  );
}
