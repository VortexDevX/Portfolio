"use client";

import React, { useEffect } from "react";
import { useStore } from "../../store/useStore";
import { projects } from "../../data/projects";

export default function ProjectModal() {
  const activeId    = useStore((state) => state.activeMonolithId);
  const setActiveId = useStore((state) => state.setActiveMonolithId);

  useEffect(() => {
    if (!activeId) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, setActiveId]);

  if (!activeId) return null;

  const project = projects.find((p) => p.id === activeId);
  if (!project) return null;

  const hasLiveLink = project.links.live !== "NOT_DEPLOYED";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title.replace(/_/g, " ")}`}
      className="fixed inset-0 z-[200] pointer-events-auto bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,0.82)_100%)] animate-in fade-in duration-700 flex flex-col justify-between overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        onClick={() => setActiveId(null)}
        aria-hidden="true"
      />

      {/* Top nav */}
      <div className="w-full flex justify-between items-start border-b border-white/5 p-8 md:p-12 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => setActiveId(null)}
          aria-label="Close project view"
          className="font-mono text-gray-400 hover:text-white text-xs md:text-sm tracking-[0.4em] uppercase group flex items-center gap-6 font-bold transition-colors duration-200"
        >
          <span className="text-2xl font-light group-hover:-translate-x-2 transition-transform duration-200">
            &larr;
          </span>
          [ CLOSE ]
        </button>
        <div className="font-mono text-[10px] md:text-xs text-gray-600 tracking-[0.3em] text-right uppercase hidden md:block">
          CONNECTION_SECURE <br />
          <span className="text-gray-400">
            {project.backendData.sys_arch.replace(/\/\//g, " · ")}
          </span>
        </div>
      </div>

      {/* Content panels */}
      <div className="w-full h-full relative pointer-events-none z-10">

        {/* Bottom-left panel */}
        <div className="absolute top-16 md:top-auto md:bottom-12 left-6 md:left-12 w-[85vw] md:w-full md:max-w-[24vw] pointer-events-auto text-left">
          <div className="font-mono text-accent text-[10px] tracking-[0.4em] mb-4 md:mb-6 uppercase font-bold">
            Intelligence Brief
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-tighter capitalize leading-none">
            {project.title.replace(/_/g, " ")}
          </h1>
          <p className="font-mono text-[10px] md:text-xs xl:text-sm text-gray-400 leading-relaxed mt-4 md:mt-8 border-l-2 border-gray-700 pl-4 md:pl-6 bg-black/50 p-4 md:p-6 line-clamp-4 md:line-clamp-none">
            {project.backendData.description}
          </p>

          <div className="mt-6 md:mt-8 flex flex-col gap-4">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-gray-400 hover:text-accent transition-colors duration-200 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold group"
            >
              <span className="text-accent text-lg leading-none group-hover:translate-x-2 transition-transform duration-200">
                &gt;
              </span>
              SOURCE_CODE
            </a>
            {hasLiveLink && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-gray-400 hover:text-accent transition-colors duration-200 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold group"
              >
                <span className="text-accent text-lg leading-none group-hover:translate-x-2 transition-transform duration-200">
                  &gt;
                </span>
                LIVE_DEPLOYMENT
              </a>
            )}
          </div>
        </div>

        {/* Bottom-right panel */}
        <div className="absolute bottom-12 right-6 md:right-12 md:max-w-[22vw] pointer-events-auto text-right hidden md:flex flex-col items-end">
          <div className="font-mono text-[10px] text-gray-500 tracking-[0.4em] mb-8 uppercase font-bold border-b border-gray-800 pb-4 inline-block">
            Execution Protocols
          </div>
          <ul className="space-y-4 font-mono text-[10px] xl:text-xs text-gray-400 flex flex-col items-end bg-black/40 p-5 border-r border-gray-700">
            {project.backendData.features.map((feat, i) => (
              <li key={i} className="flex gap-4 items-start justify-end w-full">
                <span className="leading-relaxed text-right">{feat}</span>
                <span className="text-gray-600 font-bold mt-1">_</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
