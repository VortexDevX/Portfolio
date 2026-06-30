"use client";

import React, { useState, useEffect } from "react";
import { projects } from "../../data/projects";
import { experiences } from "../../data/experience";
import useContactForm from "../../hooks/useContactForm";
import AutoSecureCaseStudy from "../dom/AutoSecureCaseStudy";

const BOOT_LINES = [
  "Loading systems",
  "Mounting projects",
  "Preparing interface",
  "Ready",
];

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
        setTimeout(() => setDone(true), 250);
        setTimeout(() => onComplete(), 650);
      }
    }, 210);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9000] bg-night flex flex-col justify-center items-center px-8 transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="font-serif text-4xl text-mist mb-8">Vaibhav Patel</div>
      <div className="font-mono text-[11px] tracking-[0.16em] text-steel space-y-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className="animate-[fadeSlideIn_0.3s_ease_forwards]"
            style={{ color: i === lines.length - 1 ? "#7CF7C8" : undefined }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function HUD() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] bg-night/88 backdrop-blur-md border-b border-steel/25 px-4 py-3 flex justify-between items-center">
        <a href="#" className="font-serif text-2xl text-mist">
          Vaibhav
        </a>

        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_14px_rgba(124,247,200,0.45)]" />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            className="min-h-11 min-w-11 border border-steel/35 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block w-5 h-px bg-ash transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-ash transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-ash transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      <nav
        className={`fixed top-[61px] left-0 right-0 z-[99] bg-night/95 backdrop-blur-md border-b border-steel/25 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-label="Mobile navigation"
      >
        {navItems.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="block px-5 py-4 font-mono text-[11px] tracking-[0.16em] text-ash hover:text-signal border-b border-steel/15 transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}

function SectionDivider({ label, index }) {
  return (
    <div className="flex items-center gap-3 px-5 py-8">
      <span className="font-mono text-[11px] text-steel">
        {String(index).padStart(2, "0")}
      </span>
      <div className="h-px flex-1 bg-steel/25" />
      <span className="font-serif text-2xl text-mist whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-5 pt-20 relative">
      <div className="absolute inset-x-5 top-28 h-px bg-gradient-to-r from-transparent via-steel/35 to-transparent" />
      <div className="font-mono text-[11px] tracking-[0.16em] text-steel flex items-center gap-2 mb-5">
        <span className="h-2 w-2 rounded-full bg-signal" />
        Computer Engineering Student - Full-Stack Developer
      </div>
      <h1 className="font-serif text-[22vw] leading-[0.82] tracking-[-0.05em] text-mist">
        Vaibhav
        <br />
        Patel
      </h1>
      <p className="mt-8 border-l border-signal/50 pl-5 font-sans text-base leading-7 text-ash">
        Building scalable web applications, multi-tenant SaaS platforms, and
        modern user experiences.
      </p>
      <a
        href="#projects"
        className="mt-10 min-h-12 border border-signal px-5 py-3 text-center font-mono text-[11px] tracking-[0.16em] text-signal"
      >
        Explore projects
      </a>
    </section>
  );
}

function IdentitySection() {
  const disciplines = [
    ["Frontend", "React, Next.js, TypeScript, PWA"],
    ["Backend", "Node.js, Express, WebSockets, APIs"],
    ["Security", "JWT, OAuth2, 2FA, RBAC"],
    ["Data", "MongoDB, PostgreSQL, IndexedDB"],
    ["Tools", "Git, Docker, AWS S3/R2, CI/CD"],
  ];

  return (
    <section id="about" className="px-5 pb-8">
      <div className="atelier-soft-panel p-6 mb-6">
        <h2 className="font-serif text-3xl leading-tight text-[#161A18]">
          I enjoy building software from end to end.
        </h2>
        <p className="mt-4 font-sans text-base leading-7 text-[#303834]">
          I'm a Computer Engineering student and Full-Stack Developer who
          enjoys building products that solve real problems. I work across the
          full stack: UI, APIs, databases, deployment, and the small production
          details that make software reliable.
        </p>
      </div>

      <div className="atelier-panel p-5">
        <div className="font-mono text-[11px] tracking-[0.16em] text-signal mb-5">
          System coverage
        </div>
        <div className="space-y-4">
          {disciplines.map(([label, value], index) => (
            <div key={label} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-steel/20 pb-4 last:border-b-0">
              <span className="font-mono text-[11px] text-steel">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-serif text-2xl text-mist">{label}</div>
                <p className="mt-1 font-sans text-sm leading-6 text-ash">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onOpenCaseStudy }) {
  const [expanded, setExpanded] = useState(false);
  const isCaseStudy = project.caseStudy === "autosecure";
  const hasSourceLink = Boolean(project.links.github);

  const handleOpen = () => {
    if (isCaseStudy) {
      onOpenCaseStudy(project.caseStudy);
      return;
    }
    setExpanded((value) => !value);
  };

  return (
    <article className={`mx-5 mb-7 overflow-hidden ${isCaseStudy ? "border border-signal/45 bg-signal/10" : "atelier-panel"}`}>
      <div className="relative w-full aspect-[4/3] bg-night overflow-hidden">
        <img
          src={project.frontendTexture}
          alt={project.title.replace(/_/g, " ")}
          className="w-full h-full object-cover opacity-80 grayscale transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent" />
        <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.16em] text-ash bg-night/70 border border-steel/25 px-3 py-2">
          {String(index + 1).padStart(2, "0")}
        </div>
        {isCaseStudy && (
          <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.16em] text-signal bg-night/70 border border-signal/30 px-3 py-2">
            Case study
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-4xl leading-none text-mist capitalize">
          {project.title.replace(/_/g, " ")}
        </h3>
        <div className="mt-3 font-mono text-[11px] text-steel tracking-[0.12em]">
          {project.backendData.sys_arch.replace(/\/\//g, " · ")}
        </div>
        <p className="mt-4 font-sans text-sm leading-6 text-ash">
          {project.backendData.outcome.replace(/_/g, " ")}
        </p>

        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: expanded ? "560px" : "0px",
            opacity: expanded ? 1 : 0,
          }}
        >
          <p className="mt-5 font-sans text-base leading-7 text-ash">
            {project.backendData.description}
          </p>
          <div className="mt-5 space-y-3">
            {project.backendData.features.map((feat) => (
              <div key={feat} className="flex gap-3 font-sans text-sm leading-6 text-ash">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {hasSourceLink && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-steel/35 bg-night/60 text-ash font-mono text-[10px] tracking-[0.16em] py-3 text-center hover:border-signal hover:text-signal transition-colors"
              >
                Source
              </a>
            )}
            {project.links.live !== "NOT_DEPLOYED" && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex-1 border border-steel/35 bg-night/60 text-ash font-mono text-[10px] tracking-[0.16em] py-3 text-center hover:border-signal hover:text-signal transition-colors"
              >
                Live
              </a>
            )}
          </div>
        </div>

        <button
          onClick={handleOpen}
          className="mt-6 w-full min-h-12 border border-steel/35 font-mono text-[11px] tracking-[0.16em] text-mist hover:border-signal hover:text-signal transition-colors"
        >
          {isCaseStudy ? "Open case study" : expanded ? "Close project" : "Read project"}
        </button>
      </div>
    </article>
  );
}

function ProjectsSection({ onOpenCaseStudy }) {
  return (
    <section id="projects" className="pb-8">
      {projects.map((project, idx) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={idx}
          onOpenCaseStudy={onOpenCaseStudy}
        />
      ))}
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="px-5 pb-8">
      <div className="space-y-5">
        {experiences.map((item, index) => (
          <article key={item.id} className="atelier-panel p-5">
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[11px] text-steel">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="border border-signal/35 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-signal">
                {item.duration}
              </span>
            </div>
            <div className="mt-5 font-mono text-[10px] tracking-[0.14em] text-steel">
              {item.start} - {item.end}
            </div>
            <h3 className="mt-3 font-serif text-4xl leading-none text-mist">
              {item.role}
            </h3>
            <div className="mt-2 font-sans text-base text-ash">
              {item.organization}
            </div>
            <p className="mt-4 font-sans text-sm leading-6 text-ash">
              {item.summary}
            </p>
            <div className="mt-5 space-y-3">
              {item.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3 font-sans text-sm leading-6 text-ash">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block min-h-12 border border-steel/35 py-4 text-center font-mono text-[11px] tracking-[0.16em] text-mist hover:border-signal hover:text-signal transition-colors"
            >
              View work
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  const { status, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="px-5 pb-10">
      <div className="mb-6">
        <h2 className="font-serif text-4xl text-mist leading-none">
          Building something interesting?
        </h2>
        <p className="mt-4 font-sans text-base leading-7 text-ash">
          Whether it's a full-stack application, an internal dashboard, or a
          SaaS product, I enjoy building software that's reliable, scalable, and
          pleasant to use.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          ["LinkedIn", "https://linkedin.com/in/vaibhavpatel-dev/"],
          ["GitHub", "https://github.com/VortexDevX"],
          ["Resume", "/resume.pdf"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            target={label === "Resume" ? undefined : "_blank"}
            rel={label === "Resume" ? undefined : "noreferrer"}
            download={label === "Resume" ? true : undefined}
            className="border border-steel/35 bg-surface/70 text-ash font-mono text-[10px] tracking-[0.12em] py-4 text-center hover:border-signal hover:text-signal transition-colors"
          >
            {label}
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="atelier-panel p-5 space-y-5">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />
        {[
          ["name", "Name", "Your name", "text"],
          ["email", "Email", "your@email.com", "email"],
        ].map(([name, label, placeholder, type]) => (
          <div key={name} className="space-y-2">
            <label className="font-mono text-steel text-[11px] tracking-[0.16em]">
              {label}
            </label>
            <input
              type={type}
              name={name}
              required
              maxLength={name === "email" ? 120 : 80}
              placeholder={placeholder}
              className="w-full bg-night/70 border border-steel/35 focus:border-signal outline-none text-mist px-4 py-3 font-sans text-base transition-colors"
            />
          </div>
        ))}
        <div className="space-y-2">
          <label className="font-mono text-steel text-[11px] tracking-[0.16em]">
            Message
          </label>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows="4"
            placeholder="Tell me what you're building."
            className="w-full bg-night/70 border border-steel/35 focus:border-signal outline-none text-mist px-4 py-3 font-sans text-base transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full min-h-12 border border-signal bg-signal text-night font-mono text-[11px] tracking-[0.16em] py-4 font-bold disabled:opacity-40"
        >
          {status === "sending" && "Sending..."}
          {status === "sent" && "Message sent"}
          {status === "error" && "Message failed"}
          {status === "idle" && "Send message"}
        </button>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <div className="border-t border-steel/25 px-5 py-8 space-y-1 font-mono text-[10px] text-steel tracking-[0.14em]">
      <div>Good software is reliable, intuitive, and built to last.</div>
      <div>Vaibhav Patel</div>
    </div>
  );
}

export default function MobilePortfolio() {
  const [booted, setBooted] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  return (
    <div className="fixed inset-0 z-50 bg-night text-mist overflow-y-auto overflow-x-hidden">
      {activeCaseStudy === "autosecure" && (
        <AutoSecureCaseStudy onClose={() => setActiveCaseStudy(null)} />
      )}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      {booted && (
        <>
          <HUD />
          <HeroSection />
          <SectionDivider label="Identity" index={1} />
          <IdentitySection />
          <SectionDivider label="Experience" index={2} />
          <ExperienceSection />
          <SectionDivider label="Projects" index={3} />
          <ProjectsSection onOpenCaseStudy={setActiveCaseStudy} />
          <SectionDivider label="Contact" index={4} />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  );
}
