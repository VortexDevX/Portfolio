"use client";

import React, { useEffect } from "react";
import { useStore } from "../../store/useStore";
import { projects } from "../../data/projects";
import AutoSecureCaseStudy from "./AutoSecureCaseStudy";

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

  if (project.caseStudy === "autosecure") {
    return <AutoSecureCaseStudy onClose={() => setActiveId(null)} />;
  }

  const hasLiveLink = project.links.live !== "NOT_DEPLOYED";
  const hasSourceLink = Boolean(project.links.github);
  const title = project.title.replace(/_/g, " ");
  const stack = project.backendData.sys_arch.replace(/\/\//g, " · ");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title.replace(/_/g, " ")}`}
      className="fixed inset-0 z-[200] pointer-events-auto bg-[radial-gradient(circle_at_70%_20%,rgba(75,63,114,0.22),transparent_34%),linear-gradient(180deg,rgba(8,10,13,0.96),rgba(8,10,13,0.9))] animate-in fade-in duration-700 flex flex-col justify-between overflow-hidden text-mist"
    >
      <div
        className="absolute inset-0 z-0"
        onClick={() => setActiveId(null)}
        aria-hidden="true"
      />

      <div className="w-full flex justify-between items-start border-b border-steel/20 p-6 md:p-8 z-10 bg-gradient-to-b from-night/95 to-night/60">
        <button
          onClick={() => setActiveId(null)}
          aria-label="Close project view"
          className="font-mono text-steel hover:text-signal text-xs md:text-sm tracking-[0.18em] uppercase group flex items-center gap-5 font-bold transition-colors duration-200"
        >
          <span className="text-2xl font-light group-hover:-translate-x-2 transition-transform duration-200">
            &larr;
          </span>
          Close
        </button>
        <div className="font-mono text-[10px] md:text-xs text-steel tracking-[0.16em] text-right hidden md:block">
          Project details <br />
          <span className="text-ash">{stack}</span>
        </div>
      </div>

      <div className="relative z-10 min-h-0 flex-1 overflow-y-auto px-5 py-5 md:px-8 md:py-7">
        <main className="mx-auto flex w-full max-w-[116rem] flex-col gap-5">
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="pointer-events-auto overflow-hidden border border-steel/30 bg-night/85 shadow-[0_40px_130px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-steel/20 px-4 py-3 md:px-5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-signal">
                  Product preview
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel">
                  {String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </div>
              </div>
              <div className="relative h-[58vh] min-h-[360px] md:h-[66vh] xl:h-[calc(100vh-15.5rem)] xl:min-h-[520px]">
                <img
                  src={project.frontendTexture}
                  alt={`${title} interface preview`}
                  className="h-full w-full object-contain p-3 opacity-95 md:p-5"
                  draggable="false"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_58%,rgba(8,10,13,0.42))]" />
              </div>
            </div>

            <aside className="pointer-events-auto border border-steel/25 bg-surface/65 p-6 md:p-7">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-signal">
                Project brief
              </div>
              <h1 className="mt-5 break-words font-serif text-[clamp(3rem,4.8vw,5.5rem)] capitalize leading-[0.86] tracking-[-0.035em] text-mist">
                {title}
              </h1>
              <div className="mt-5 font-mono text-[10px] leading-5 tracking-[0.14em] text-steel">
                {stack}
              </div>
              <p className="mt-6 border-l border-signal/50 pl-5 font-sans text-sm leading-7 text-ash">
                {project.backendData.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 border-t border-steel/25 pt-5">
                {hasSourceLink && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-between border border-steel/30 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ash transition-colors hover:border-signal hover:text-signal"
                  >
                    Source code
                    <span className="text-signal">&gt;</span>
                  </a>
                )}
                {hasLiveLink && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-between border border-steel/30 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ash transition-colors hover:border-signal hover:text-signal"
                  >
                    Live deployment
                    <span className="text-signal">&gt;</span>
                  </a>
                )}
              </div>
            </aside>
          </section>

          <section className="pointer-events-auto grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {project.backendData.features.map((feat) => (
              <article
                key={feat}
                className="border border-steel/25 bg-surface/55 p-4 font-sans text-sm leading-6 text-ash"
              >
                <span className="mb-3 block h-1.5 w-1.5 bg-signal" />
                {feat}
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
