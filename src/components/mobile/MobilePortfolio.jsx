"use client";

import React, { useState, useEffect } from "react";
import { projects } from "../../data/projects";
import useContactForm from "../../hooks/useContactForm";

const BOOT_LINES = [
  "[ INIT_SYS... ]",
  "[ LOADING_MODULES... ]",
  "[ MOUNTING_IDENTITY_NODE... ]",
  "[ ESTABLISHING_UPLINK... ]",
  "[ STATUS: OPERATIONAL ]",
];

/* ──────────────────── BOOT SEQUENCE ──────────────────── */
function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 300);
        setTimeout(() => onComplete(), 800);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9000] bg-void flex flex-col justify-center items-center px-8 transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="font-mono text-[10px] tracking-widest text-gray-500 space-y-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className="animate-[fadeSlideIn_0.3s_ease_forwards]"
            style={{ color: i === lines.length - 1 ? "#00e5ff" : undefined }}
          >
            {line}
          </div>
        ))}
        <span className="inline-block w-1.5 h-3 bg-accent animate-pulse ml-1" />
      </div>
    </div>
  );
}

/* ──────────────────── STICKY HUD ──────────────────── */
function HUD() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-void/90 backdrop-blur-sm border-b border-gray-800/50 px-4 py-3 flex justify-between items-center font-mono text-[9px] tracking-widest uppercase">
        <div className="text-gray-500 font-bold">VP.SYS</div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-gray-400 font-bold">ONLINE</span>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="flex flex-col gap-1 p-1"
          >
            <span
              className={`block w-4 h-px bg-gray-500 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-gray-500 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-gray-500 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-[41px] left-0 right-0 z-[99] bg-void/95 backdrop-blur-sm border-b border-gray-800/50 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {navItems.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="block px-5 py-3 font-mono text-[10px] tracking-[0.4em] uppercase text-gray-500 hover:text-accent border-b border-gray-800/30 transition-colors duration-150 font-bold"
          >
            {"> "}
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

/* ──────────────────── HERO SECTION ──────────────────── */
function HeroSection() {
  return (
    <section className="h-[100dvh] flex flex-col items-center justify-center px-6 relative">
      <div className="w-20 h-20 mb-10 relative">
        <div
          className="absolute inset-0 border border-gray-700"
          style={{
            animation: "spin 8s linear infinite",
            transform: "rotate(45deg)",
          }}
        />
        <div
          className="absolute inset-2 border border-gray-800"
          style={{
            animation: "spin 12s linear infinite reverse",
            transform: "rotate(30deg)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-accent/50 rotate-45" />
        </div>
      </div>

      <h1 className="font-serif text-[15vw] leading-[0.9] text-white tracking-tighter text-center">
        VAIBHAV
        <br />
        PATEL
      </h1>

      <div className="font-mono text-gray-400 text-[10px] tracking-[0.4em] uppercase mt-6 font-bold">
        FULL_STACK_WEB_DEVELOPER
      </div>

      <div className="absolute bottom-8 font-mono text-[9px] text-gray-600 tracking-[0.3em] uppercase animate-pulse">
        ↓ SCROLL ↓
      </div>
    </section>
  );
}

/* ──────────────────── SECTION DIVIDER ──────────────────── */
function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 px-5 py-6">
      <div className="h-px flex-1 bg-gray-800" />
      <span className="font-mono text-gray-600 text-[9px] tracking-[0.4em] uppercase font-bold whitespace-nowrap">
        // {label}
      </span>
      <div className="h-px flex-1 bg-gray-800" />
    </div>
  );
}

/* ──────────────────── SKILL ROW ──────────────────── */
function SkillRow({ label, value, isAccent }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border-b border-gray-800/50 px-5 py-4 active:bg-white/[0.02] transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          {label}
        </span>
        <span className="font-mono text-[10px] text-gray-700">
          {open ? "▲" : "▼"}
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "80px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div
          className={`font-mono text-xs mt-3 leading-relaxed ${
            isAccent ? "text-accent font-bold tracking-widest" : "text-gray-300"
          }`}
        >
          {value}
        </div>
      </div>
    </button>
  );
}

/* ──────────────────── IDENTITY SECTION ──────────────────── */
function IdentitySection() {
  return (
    <section id="about" className="px-5 pb-10">
      <div className="mb-10">
        <div className="font-mono text-accent text-[9px] tracking-[0.4em] uppercase font-bold mb-4 border-b border-gray-800 pb-2 inline-block">
          System Identity
        </div>
        <p className="font-serif text-lg text-gray-300 leading-relaxed">
          Full-Stack Developer and 3rd-year Computer Engineering student
          building production-grade web applications across frontend and
          backend. Strong focus on security, realtime systems, and scalable
          architecture. Experience in owning end-to-end features from design to
          deployment.
        </p>
      </div>

      <div className="mb-10">
        <div className="font-mono text-accent text-[9px] tracking-[0.4em] uppercase font-bold mb-4 border-b border-gray-800 pb-2 inline-block">
          Education Node
        </div>
        <div className="font-serif text-base text-white mb-1 tracking-wide">
          Bachelor of Engineering (Computer Engineering)
        </div>
        <div className="font-mono text-gray-400 text-[10px] tracking-widest uppercase">
          Ahmedabad Institute of Technology
        </div>
        <div className="font-mono text-gray-600 text-[9px] mt-2 uppercase tracking-[0.3em] font-bold">
          Expected 2027
        </div>
      </div>

      <div className="border border-gray-800 bg-surface/80">
        <div className="px-5 py-4 border-b border-gray-800">
          <span className="font-mono text-accent text-[9px] tracking-[0.4em] uppercase font-bold">
            Core Competencies
          </span>
        </div>
        <SkillRow
          label="Languages"
          value="JavaScript (ES6+), TypeScript, Python"
        />
        <SkillRow label="Frontend" value="React, Next.js, HTML5, CSS3, PWA" />
        <SkillRow label="Backend" value="Node.js, Express, WebSockets, APIs" />
        <SkillRow label="Databases" value="MongoDB, PostgreSQL, IndexedDB" />
        <SkillRow label="Security" value="JWT, OAuth2, 2FA, RBAC" isAccent />
        <SkillRow label="Dev_Tools" value="Git, Docker, AWS S3, CI/CD" />
      </div>
    </section>
  );
}

/* ──────────────────── PROJECT CARD ──────────────────── */
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const [flashing, setFlashing] = useState(false);

  const handleDecrypt = () => {
    if (!expanded) {
      setFlashing(true);
      setTimeout(() => {
        setFlashing(false);
        setExpanded(true);
      }, 400);
    } else {
      setExpanded(false);
    }
  };

  return (
    <div
      className="mx-5 mb-6 border border-gray-800 bg-surface/60 overflow-hidden"
      style={
        flashing ? { animation: "decryptFlash 0.4s ease forwards" } : undefined
      }
    >
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <img
          src={project.frontendTexture}
          alt={project.title.replace(/_/g, " ")}
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-gray-400 tracking-widest font-bold bg-black/70 px-2 py-1">
          PROJ_0{index + 1}
        </div>
      </div>

      <div className="px-5 pt-4 pb-2">
        <h3 className="font-serif text-2xl text-white tracking-tight capitalize mb-2">
          {project.title.replace(/_/g, " ")}
        </h3>
        <div className="font-mono text-[10px] text-gray-600 tracking-wider leading-relaxed">
          {project.backendData.sys_arch.replace(/\/\//g, " · ")}
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: expanded ? "600px" : "0px",
          opacity: expanded ? 1 : 0,
        }}
      >
        <div className="px-5 pt-3 pb-2">
          <p className="font-mono text-[11px] text-gray-400 leading-relaxed mb-5">
            {project.backendData.description}
          </p>

          <div className="space-y-3 mb-5">
            {project.backendData.features.map((feat, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-gray-600 font-mono text-xs mt-0.5">
                  ┃
                </span>
                <span className="font-mono text-[11px] text-gray-300 leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 border border-gray-800 bg-void text-gray-300 font-mono text-[10px] tracking-widest uppercase py-3 text-center active:bg-accent active:text-black transition-colors font-bold"
            >
              SOURCE
            </a>
            {project.links.live !== "NOT_DEPLOYED" && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-gray-800 bg-void text-gray-300 font-mono text-[10px] tracking-widest uppercase py-3 text-center active:bg-accent active:text-black transition-colors font-bold"
              >
                LIVE
              </a>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleDecrypt}
        className="w-full py-4 font-mono text-[10px] tracking-[0.3em] uppercase text-gray-600 active:text-accent transition-colors font-bold border-t border-gray-800/50"
      >
        {expanded ? "▲ COLLAPSE" : "▼ DECRYPT INTEL"}
      </button>
    </div>
  );
}

/* ──────────────────── PROJECTS SECTION ──────────────────── */
function ProjectsSection() {
  return (
    <section id="projects" className="pb-10">
      {projects.map((project, idx) => (
        <ProjectCard key={project.id} project={project} index={idx} />
      ))}
    </section>
  );
}

/* ──────────────────── CONTACT SECTION ──────────────────── */
function ContactSection() {
  const { status, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="px-5 pb-10">
      <div className="mb-8">
        <h2 className="font-serif text-2xl text-white leading-snug">
          Ready to formulate high&#8209;performance infrastructure?
        </h2>
      </div>

      <div className="flex gap-3 mb-8">
        <a
          href="https://linkedin.com/in/vaibhavpatel-dev/"
          target="_blank"
          rel="noreferrer"
          className="flex-1 border border-gray-800 bg-surface text-gray-300 font-mono text-[10px] tracking-widest uppercase py-4 text-center active:bg-accent active:text-black transition-colors font-bold flex items-center justify-center"
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/VortexDevX"
          target="_blank"
          rel="noreferrer"
          className="flex-1 border border-gray-800 bg-surface text-gray-300 font-mono text-[10px] tracking-widest uppercase py-4 text-center active:bg-accent active:text-black transition-colors font-bold flex items-center justify-center"
        >
          GITHUB
        </a>
        <a
          href="/resume.pdf"
          download
          className="flex-1 border border-gray-800 bg-surface text-gray-300 font-mono text-[10px] tracking-widest uppercase py-4 text-center active:bg-accent active:text-black transition-colors font-bold flex items-center justify-center"
        >
          RESUME
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-gray-800 bg-pit p-5 space-y-5"
      >
        <div className="space-y-2">
          <label className="font-mono text-gray-500 text-[9px] tracking-widest uppercase font-bold">
            IDENTIFIER_
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="YOUR NAME"
            className="w-full bg-surface border border-gray-800 focus:border-accent outline-none text-white px-4 py-3 font-mono text-[11px] tracking-wider transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-gray-500 text-[9px] tracking-widest uppercase font-bold">
            RETURN_NODE_
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="YOUR EMAIL"
            className="w-full bg-surface border border-gray-800 focus:border-accent outline-none text-white px-4 py-3 font-mono text-[11px] tracking-wider transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-gray-500 text-[9px] tracking-widest uppercase font-bold">
            TRANSMISSION_PAYLOAD_
          </label>
          <textarea
            name="message"
            required
            rows="4"
            placeholder="YOUR MESSAGE"
            className="w-full bg-surface border border-gray-800 focus:border-accent outline-none text-white px-4 py-3 font-mono text-[11px] tracking-wider transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full border border-accent bg-accent/10 text-accent font-mono text-[10px] tracking-[0.3em] uppercase py-4 font-bold active:bg-accent active:text-black transition-colors disabled:opacity-40 flex items-center justify-center gap-3"
        >
          {status === "sending" && "[ TRANSMITTING... ]"}
          {status === "sent" && "[ ✓ MESSAGE DEPLOYED ]"}
          {status === "error" && "[ ✗ TRANSMISSION FAILED ]"}
          {status === "idle" && "DEPLOY_MESSAGE"}
        </button>
      </form>
    </section>
  );
}

/* ──────────────────── FOOTER ──────────────────── */
function Footer() {
  return (
    <div className="border-t border-gray-800 px-5 py-8 space-y-1 font-mono text-[9px] text-gray-700 tracking-[0.3em] uppercase">
      <div>SYSTEM_TERMINATION</div>
      <div>VP_2025</div>
      <div>EOF_</div>
    </div>
  );
}

/* ──────────────────── MAIN SHELL ──────────────────── */
export default function MobilePortfolio() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-void text-white overflow-y-auto overflow-x-hidden">
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && (
        <>
          <HUD />
          <HeroSection />
          <SectionDivider label="SYSTEM_IDENTITY" />
          <IdentitySection />
          <SectionDivider label="FIELD_PROJECTS" />
          <ProjectsSection />
          <SectionDivider label="INITIATE_UPLINK" />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
}
