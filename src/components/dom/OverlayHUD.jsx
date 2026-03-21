import React from 'react';
import { useStore } from '../../store/useStore';
import { projects } from '../../data/projects';

export default function OverlayHUD() {
  const activeId = useStore((state) => state.activeMonolithId);
  const setActiveId = useStore((state) => state.setActiveMonolithId);

  if (!activeId) return null;

  const project = projects.find(p => p.id === activeId);
  if (!project) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-end pb-12 px-16 animate-in fade-in duration-700">
      
      {/* Return Button */}
      <div className="absolute top-12 left-16">
        <button 
          onClick={() => {
            setActiveId(null);
            document.body.style.cursor = 'none';
          }}
          className="pointer-events-auto flex items-center gap-4 text-[#888] hover:text-white transition-colors group"
        >
          <span className="text-2xl font-light transform group-hover:-translate-x-2 transition-transform">&larr;</span>
          <span className="font-mono text-xs tracking-[0.3em] font-bold uppercase">Return to Gallery</span>
        </button>
      </div>

      {/* Elegant Widescreen Details Panel */}
      <div className="flex gap-16 items-end justify-between max-w-7xl w-full mx-auto">
        
        {/* Left Side: Title and Vision */}
        <div className="max-w-xl">
          <h1 className="font-serif text-5xl text-white mb-6 tracking-wide drop-shadow-xl capitalize">
            {project.title.replace(/_/g, ' ')}
          </h1>
          <p className="font-mono text-sm text-[#aaa] leading-relaxed mb-8">
            {project.backendData.description}
          </p>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest font-bold">
            <a href={project.links.github} target="_blank" rel="noreferrer" className="pointer-events-auto border border-[#333] hover:border-accent hover:bg-accent hover:text-black bg-[#060a12] text-white px-8 py-4 transition-all">
              View Source
            </a>
            <a href={project.links.live} target="_blank" rel="noreferrer" className="pointer-events-auto border border-[#333] hover:border-accent hover:bg-accent hover:text-black bg-[#060a12] text-white px-8 py-4 transition-all tracking-widest">
              Live Deployment
            </a>
          </div>
        </div>

        {/* Right Side: Architecture & Features */}
        <div className="max-w-md text-right">
          <div className="mb-8 border-b border-[#222] pb-6">
            <div className="font-mono text-[10px] text-accent tracking-[0.3em] mb-3 uppercase">Architecture Node</div>
            <div className="font-mono text-sm text-white tracking-wider bg-[#111] inline-block px-3 py-1 border border-[#333]">
              {project.backendData.sys_arch.replace(/\/\//g, '•')}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-accent tracking-[0.3em] mb-4 uppercase">Core Implementations</div>
            <ul className="text-left font-mono text-[11px] text-[#aaa] space-y-3 opacity-90">
              {project.backendData.features.map((feat, i) => (
                <li key={i} className="pl-4 border-l-2 border-[#333] hover:border-accent transition-colors leading-relaxed">
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
}
