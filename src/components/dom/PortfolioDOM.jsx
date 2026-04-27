"use client";

import React, { useRef, useEffect } from "react";
import { projects } from "../../data/projects";
import { useStore } from "../../store/useStore";
import useContactForm from "../../hooks/useContactForm";

function useRevealOnScroll(ref, callback) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
}

const HeroSection = () => (
  <div className="h-screen flex flex-col items-center justify-center w-full relative">
    <div className="font-serif text-[9vw] lg:text-[8vw] text-white tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(0,229,255,0.15)]">
      VAIBHAV PATEL
    </div>
    <div className="font-mono text-gray-400 tracking-[0.4em] uppercase mt-8 text-sm md:text-base font-bold">
      Full Stack Web Developer
    </div>
    <div className="absolute bottom-16 font-mono text-gray-600 text-[10px] tracking-[0.5em] animate-pulse border-b border-gray-800 pb-2 uppercase">
      [ SCROLL TO NAVIGATE ]
    </div>
  </div>
);

function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  useRevealOnScroll(sectionRef, () => setVisible(true));

  return (
    <div
      ref={sectionRef}
      className={`h-screen flex flex-col justify-center max-w-7xl mx-auto px-8 w-full z-10 overflow-hidden py-10 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 w-full items-center">
        <div className="lg:col-span-7 space-y-12">
          <div>
            <h2 className="font-mono text-accent tracking-[0.4em] uppercase mb-6 text-[10px] border-b border-gray-800 pb-2 inline-block font-bold">
              System Identity
            </h2>
            <p className="font-serif text-2xl md:text-3xl text-gray-300 leading-relaxed text-justify">
              Full-Stack Developer and 3rd-year Computer Engineering student
              building production-grade web applications across frontend and
              backend. Strong focus on security, realtime systems, and scalable
              architecture. Experience in owning end-to-end features from design
              to deployment. Ready to contribute meaningful engineering impact
              from day one.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-accent tracking-[0.4em] uppercase mb-6 text-[10px] border-b border-gray-800 pb-2 inline-block font-bold">
              Education Node
            </h2>
            <div className="text-white font-serif text-xl md:text-2xl mb-2 tracking-wide">
              Bachelor of Engineering (Computer Engineering)
            </div>
            <div className="font-mono text-gray-400 text-xs md:text-sm tracking-widest uppercase">
              Ahmedabad Institute of Technology, Ahmedabad
            </div>
            <div className="font-mono text-gray-500 font-bold text-[10px] mt-3 uppercase tracking-[0.4em]">
              Expected 2027
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface/95 backdrop-blur-md border border-gray-800 p-8 md:p-10 self-center shadow-2xl">
          <h2 className="font-mono text-accent tracking-[0.4em] uppercase mb-8 text-[10px] border-b border-gray-800 pb-4 inline-block font-bold">
            Core Competencies
          </h2>
          <div className="space-y-6 font-mono text-[10px] md:text-xs leading-relaxed">
            {[
              {
                label: "Languages",
                value: "JavaScript (ES6+), TypeScript, Python",
              },
              { label: "Frontend", value: "React, Next.js, HTML5, CSS3, PWA" },
              { label: "Backend", value: "Node.js, Express, WebSockets, APIs" },
              { label: "Databases", value: "MongoDB, PostgreSQL, IndexedDB" },
              {
                label: "Security",
                value: "JWT, OAuth2, 2FA, RBAC",
                accent: true,
              },
              { label: "Dev_Tools", value: "Git, Docker, AWS S3, CI/CD" },
            ].map(({ label, value, accent }) => (
              <div key={label} className="grid grid-cols-3 gap-6 items-start">
                <span className="text-gray-500 uppercase tracking-widest col-span-1 border-r border-gray-800">
                  {label}
                </span>
                <span
                  className={`col-span-2 ${accent ? "text-accent font-bold tracking-widest" : "text-gray-300"}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const { status, handleSubmit } = useContactForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 w-full flex flex-col gap-4 md:gap-8 font-mono text-xs tracking-widest uppercase bg-pit border border-gray-800 p-5 md:p-12 shadow-2xl"
    >
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="text-gray-500 font-bold text-[9px] md:text-[10px]">
          IDENTIFIER_
        </label>
        <input
          type="text"
          name="name"
          required
          className="bg-surface border border-gray-800 focus:border-accent outline-none text-white px-4 md:px-6 py-3 md:py-4 transition-colors text-[10px] md:text-xs"
          placeholder="YOUR NAME"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="text-gray-500 font-bold text-[9px] md:text-[10px]">
          RETURN_NODE_
        </label>
        <input
          type="email"
          name="email"
          required
          className="bg-surface border border-gray-800 focus:border-accent outline-none text-white px-4 md:px-6 py-3 md:py-4 transition-colors text-[10px] md:text-xs"
          placeholder="YOUR EMAIL"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="text-gray-500 font-bold text-[9px] md:text-[10px]">
          TRANSMISSION_PAYLOAD_
        </label>
        <textarea
          name="message"
          required
          rows="3"
          className="bg-surface border border-gray-800 focus:border-accent outline-none text-white px-4 md:px-6 py-3 md:py-4 transition-colors resize-none text-[10px] md:text-xs"
          placeholder="YOUR MESSAGE"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="border border-accent bg-accent/10 hover:bg-accent hover:text-black text-accent px-6 md:px-8 py-3 md:py-5 transition-colors font-bold flex items-center justify-center gap-4 group text-[10px] md:text-xs disabled:opacity-40"
      >
        {status === "sending" && "[ TRANSMITTING... ]"}
        {status === "sent" && "[ ✓ MESSAGE DEPLOYED ]"}
        {status === "error" && "[ ✗ TRANSMISSION FAILED ]"}
        {status === "idle" && (
          <>
            <span className="text-lg md:text-xl leading-none group-hover:translate-x-2 transition-transform">
              &gt;
            </span>
            DEPLOY_MESSAGE
          </>
        )}
      </button>
    </form>
  );
}

function ProjectEntry({
  project,
  idx,
  setActiveMonolithId,
  setHoveredMonolithId,
}) {
  const isLeft = idx % 2 === 0;
  const revealRef = useRef(null);
  const [visible, setVisible] = React.useState(false);

  useRevealOnScroll(revealRef, () => setVisible(true));

  return (
    <div className="h-screen w-full relative pointer-events-none">
      {idx === 0 && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-gray-600 text-[10px] tracking-[0.5em] uppercase font-bold border-b border-gray-800 pb-2 whitespace-nowrap">
          [ FIELD_PROJECTS_ARRAY ]
        </div>
      )}

      <div
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-auto ${
          isLeft ? "right-0 w-[48vw]" : "left-0 w-[48vw]"
        }`}
      >
        <div
          ref={revealRef}
          onClick={() => setActiveMonolithId(project.id)}
          onMouseEnter={() => setHoveredMonolithId(project.id)}
          onMouseLeave={() => setHoveredMonolithId(null)}
          className={`group px-[5vw] transition-all duration-700 ease-out ${
            visible
              ? "opacity-100 translate-x-0"
              : isLeft
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-accent group-hover:shadow-[0_0_10px_rgba(0,229,255,0.7)] transition-all duration-300" />
              <span className="font-mono text-[10px] text-gray-600 tracking-widest font-bold">
                0{idx + 1}
              </span>
            </div>
            <div className="h-px flex-1 bg-gray-800 group-hover:bg-gray-700 transition-colors duration-500" />
          </div>

          <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-white tracking-tighter capitalize mb-4 transition-all duration-500 group-hover:text-accent group-hover:drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">
            {project.title.replace(/_/g, " ")}
          </h2>

          <div className="font-mono text-[11px] text-gray-600 tracking-wider uppercase mb-3 group-hover:text-gray-400 transition-colors duration-300">
            {project.backendData.sys_arch.replace(/\/\//g, " · ")}
          </div>

          <p className="font-mono text-[11px] text-gray-700 tracking-wide leading-relaxed max-w-md group-hover:text-gray-500 transition-colors duration-300">
            {project.backendData.outcome.replace(/_/g, " ")}
          </p>

          <div className="flex items-center gap-4 mt-8">
            <div className="h-px flex-1 bg-gray-800 group-hover:bg-gray-700 transition-colors duration-500" />
            <span className="font-mono text-[10px] text-gray-600 tracking-[0.3em] uppercase font-bold group-hover:text-accent transition-colors duration-300 whitespace-nowrap">
              EXPAND_INTEL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioDOM() {
  const activeId = useStore((state) => state.activeMonolithId);
  const setActiveMonolithId = useStore((state) => state.setActiveMonolithId);
  const setHoveredMonolithId = useStore((state) => state.setHoveredMonolithId);

  return (
    <div
      className={`w-full relative transition-opacity duration-700 ease-in-out ${
        activeId
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      <HeroSection />
      <AboutSection />

      {projects.map((project, idx) => (
        <ProjectEntry
          key={project.id}
          project={project}
          idx={idx}
          setActiveMonolithId={setActiveMonolithId}
          setHoveredMonolithId={setHoveredMonolithId}
        />
      ))}

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <div className="h-screen flex flex-col items-center justify-center w-full px-4 md:px-8 pointer-events-auto relative">
        <h2 className="font-mono text-accent tracking-[0.5em] uppercase mb-6 md:mb-12 text-[10px] md:text-xs border-b border-gray-800 pb-3 md:pb-4 font-bold">
          Initiate Uplink
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-16 lg:gap-24 w-full max-w-6xl items-center lg:items-start justify-center">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="font-serif text-2xl md:text-5xl lg:text-6xl text-white mb-6 md:mb-12 leading-tight">
              Ready to formulate high&#8209;performance infrastructure?
            </div>

            {/* LinkedIn, GitHub, Resume — grouped as equal external links */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-4 font-mono tracking-widest text-gray-400 text-[9px] md:text-xs font-bold uppercase w-full max-w-sm">
              <a
                href="https://linkedin.com/in/vaibhavpatel-dev/"
                target="_blank"
                rel="noreferrer"
                className="group border border-gray-800 hover:border-accent bg-surface hover:bg-accent px-4 md:px-8 py-3 md:py-5 transition-colors hover:text-black flex items-center gap-3 md:gap-6 shadow-xl flex-1 md:flex-none"
              >
                <span className="text-accent group-hover:text-black text-base md:text-lg leading-none">
                  &gt;
                </span>
                LINKEDIN
              </a>
              <a
                href="https://github.com/VortexDevX"
                target="_blank"
                rel="noreferrer"
                className="group border border-gray-800 hover:border-accent bg-surface hover:bg-accent px-4 md:px-8 py-3 md:py-5 transition-colors hover:text-black flex items-center gap-3 md:gap-6 shadow-xl flex-1 md:flex-none"
              >
                <span className="text-accent group-hover:text-black text-base md:text-lg leading-none">
                  &gt;
                </span>
                GITHUB
              </a>
              <a
                href="/resume.pdf"
                download
                className="group border border-gray-800 hover:border-accent bg-surface hover:bg-accent px-4 md:px-8 py-3 md:py-5 transition-colors hover:text-black flex items-center gap-3 md:gap-6 shadow-xl flex-1 md:flex-none"
              >
                <span className="text-accent group-hover:text-black text-base md:text-lg leading-none">
                  &gt;
                </span>
                RESUME
              </a>
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="absolute bottom-12 font-mono text-[10px] text-gray-700 tracking-[0.4em] uppercase font-bold">
          SYSTEM_TERMINATION // EOF
        </div>
      </div>
    </div>
  );
}
