import React from 'react';
import { useStore } from '../../store/useStore';
import { projects } from '../../data/projects';

export default function ProjectModal() {
  const activeId = useStore((state) => state.activeMonolithId);
  const setActiveId = useStore((state) => state.setActiveMonolithId);

  if (!activeId) return null;

  const project = projects.find(p => p.id === activeId);
  if (!project) return null;

  // USER REQUEST FIX: Removed backdrop-blur drastically! It was blurring the physical 3D canvas behind the UI. Using radial gradient vignette to strictly highlight the center 3D plane while darkening text corners natively.
  return (
    <div className="fixed inset-0 z-[200] pointer-events-auto bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.8)_100%)] transition-opacity animate-in fade-in duration-700 flex flex-col justify-between overflow-hidden">
      
      {/* Background physical listener strictly aborting intelligence view */}
      <div className="absolute inset-0 cursor-pointer z-0" onClick={() => setActiveId(null)} />
      
      {/* EXTREME BRUTALIST HUD: Top Alignment Nav */}
      <div className="w-full flex justify-between items-start border-b border-[#222]/50 p-8 md:p-12 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => setActiveId(null)}
          className="font-mono text-accent text-xs md:text-sm tracking-[0.4em] hover:text-white uppercase group flex items-center gap-6 font-bold cursor-none"
        >
          <span className="text-3xl font-light transform group-hover:-translate-x-3 transition-transform">&larr;</span>
          [ ABORT_INTELLIGENCE_VIEW ]
        </button>
        <div className="font-mono text-[10px] md:text-xs text-gray-400 tracking-[0.3em] text-right uppercase hidden md:block">
           CONNECTION_SECURE <br/> <span className="text-accent">{project.backendData.sys_arch.replace(/\/\//g, '-')}</span>
        </div>
      </div>

      {/* Extreme Corner Anchored Readouts - Pure Text Vectors natively exposing the 3D Zoom Effect */}
      <div className="w-full h-full relative pointer-events-none z-10">
        
        {/* Bottom Left Title Data pinned tightly to the corner */}
        <div className="absolute top-16 md:top-auto md:bottom-12 left-6 md:left-12 w-[85vw] md:w-full max-w-[24vw] pointer-events-auto block text-left">
          <div className="font-mono text-accent text-[10px] md:text-xs tracking-[0.4em] mb-4 md:mb-6 uppercase font-bold drop-shadow-md">Intelligence Brief</div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tighter capitalize leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
            {project.title.replace(/_/g, ' ')}
          </h1>
          <p className="font-mono text-[10px] md:text-xs xl:text-sm text-gray-300 leading-relaxed text-left mt-4 md:mt-8 opacity-90 border-l-2 border-accent/40 pl-4 md:pl-6 bg-black/50 md:bg-black/40 p-4 md:p-6 backdrop-blur-md md:backdrop-blur-sm drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] line-clamp-4 md:line-clamp-none">
            {project.backendData.description}
          </p>
          <div className="mt-6 md:mt-8">
            <a href={project.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 text-white hover:text-accent transition-colors font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold group cursor-none">
              <span className="text-accent text-xl md:text-2xl leading-none -mt-1 group-hover:translate-x-3 transition-transform">&gt;</span> OVERRIDE_SOURCE_CODE
            </a>
          </div>
        </div>

        {/* Bottom Right Matrix Data pinned tightly to the alternate corner */}
        <div className="absolute bottom-12 right-6 md:right-12 wfull md:max-w-[22vw] pointer-events-auto text-right hidden md:flex flex-col items-end">
          <div className="font-mono text-[10px] xl:text-xs text-accent tracking-[0.4em] mb-8 uppercase font-bold border-b border-[#222] pb-4 inline-block drop-shadow-md">Execution Protocols</div>
          <ul className="space-y-4 font-mono text-[10px] xl:text-xs text-gray-300 flex flex-col items-end bg-black/40 p-5 backdrop-blur-sm border-r-2 border-accent/40 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {project.backendData.features.map((feat, i) => (
              <li key={i} className="flex gap-4 items-start group justify-end w-full">
                <span className="leading-relaxed transition-colors text-right">{feat}</span>
                <span className="text-accent font-bold mt-1 text-sm">_</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
