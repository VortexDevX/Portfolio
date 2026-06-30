"use client";

import React, { useRef, useEffect } from "react";
import { projects } from "../../data/projects";
import { experiences } from "../../data/experience";
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
      { threshold: 0.12 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);
}

function Eyebrow({ children }) {
  return (
    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-steel">
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      data-section-label="Hero"
      className="min-h-screen flex items-center justify-center w-full relative px-8"
    >
      <div className="absolute top-8 left-8 font-serif text-3xl text-mist/90">
        Vaibhav Patel
      </div>
      <div className="absolute inset-x-[12vw] top-1/2 h-px bg-gradient-to-r from-transparent via-steel/40 to-transparent" />
      <div className="relative max-w-6xl w-full grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-8">
          <Eyebrow>
            <span className="inline-block h-2 w-2 rounded-full bg-signal mr-3 shadow-[0_0_16px_rgba(124,247,200,0.4)]" />
            Computer Engineering Student - Full-Stack Developer
          </Eyebrow>
          <h1 className="mt-6 font-serif text-[clamp(4.8rem,11vw,10.5rem)] text-mist tracking-[-0.04em] leading-[0.82]">
            Vaibhav
            <br />
            Patel
          </h1>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:pb-6">
          <p className="border-l border-steel/50 pl-6 font-sans text-lg leading-8 text-ash">
            Building modern web applications with a focus on clean
            architecture, thoughtful UI, and production-ready systems.
          </p>
          <div className="mt-8 flex gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-steel">
            <span>SaaS</span>
            <span>Realtime</span>
            <span>UX</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-steel/80">
        Scroll through selected work
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  useRevealOnScroll(sectionRef, () => setVisible(true));

  const disciplines = [
    ["Frontend", "React, Next.js, TypeScript, Tailwind, PWA"],
    ["Backend", "Node.js, Express, APIs, WebSockets"],
    ["Data", "MongoDB, PostgreSQL, IndexedDB"],
    ["Security", "JWT, OAuth2, 2FA, RBAC"],
    ["Delivery", "Git, Docker, AWS S3/R2, CI/CD"],
  ];

  return (
    <section
      ref={sectionRef}
      data-section-label="About"
      className={`min-h-screen flex items-center max-w-7xl mx-auto px-8 py-28 w-full z-10 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="grid grid-cols-12 gap-10 lg:gap-16 w-full items-start">
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <div>
            <Eyebrow>Studio note</Eyebrow>
            <p className="mt-5 font-serif text-3xl md:text-5xl leading-[1.08] text-mist">
              I enjoy building software from end to end, from interface and
              backend to database structure, deployment, and production fixes.
            </p>
          </div>
          <div className="atelier-soft-panel p-7 md:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <p className="font-sans text-base md:text-lg leading-8">
              I'm a Computer Engineering student and Full-Stack Developer who
              enjoys building products that solve real problems. Most of my
              work revolves around scalable web applications, multi-tenant SaaS
              platforms, secure authentication systems, and real-time features.
              I like keeping projects clean, maintainable, and built for
              growth instead of just getting them to work.
            </p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 atelier-panel p-7 md:p-9">
          <Eyebrow>System coverage</Eyebrow>
          <div className="mt-7 space-y-5">
            {disciplines.map(([label, value], index) => (
              <div
                key={label}
                className="grid grid-cols-[3rem_1fr] gap-5 border-b border-steel/20 pb-5 last:border-b-0"
              >
                <span className="font-mono text-xs text-steel">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-serif text-2xl leading-none text-mist">
                    {label}
                  </div>
                  <p className="mt-2 font-sans text-sm leading-6 text-ash">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-l border-signal/50 pl-5">
            <div className="font-serif text-2xl text-mist">
              Bachelor of Engineering
            </div>
            <p className="mt-2 font-sans text-sm leading-6 text-ash">
              Computer Engineering, Ahmedabad Institute of Technology. Expected
              2027.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, onOpen, onHover, featured = false }) {
  const title = project.title.replace(/_/g, " ");
  const isCaseStudy = project.caseStudy === "autosecure";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project.id);
        }
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className={`group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-night ${
        featured
          ? "lg:col-span-8 atelier-panel"
          : "lg:col-span-4 border border-steel/25 bg-night/65"
      }`}
    >
      <div
        className={`relative overflow-hidden ${featured ? "aspect-[16/8.5]" : "aspect-[4/3]"}`}
      >
        <img
          src={project.frontendTexture}
          alt={`${title} interface preview`}
          loading="lazy"
          className="h-full w-full object-cover opacity-75 grayscale transition duration-500 group-hover:opacity-95 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
        <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.16em] text-ash bg-night/75 border border-steel/30 px-3 py-2">
          {String(index + 1).padStart(2, "0")}
        </div>
        {isCaseStudy && (
          <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.16em] text-signal bg-night/75 border border-signal/35 px-3 py-2">
            Case study
          </div>
        )}
      </div>

      <div className={featured ? "p-7 md:p-9" : "p-6"}>
        <div className="flex items-center gap-4">
          <h3
            className={`font-serif capitalize leading-none tracking-[-0.035em] text-mist transition-colors group-hover:text-signal ${
              featured ? "text-6xl" : "text-4xl"
            }`}
          >
            {title}
          </h3>
          <div className="hidden md:block h-px flex-1 bg-steel/25 transition-colors group-hover:bg-signal/60" />
        </div>

        <div className="mt-4 font-mono text-[11px] leading-5 tracking-[0.12em] text-steel">
          {project.backendData.sys_arch.replace(/\/\//g, " · ")}
        </div>

        <p className="mt-5 font-sans text-sm leading-6 text-ash">
          {project.backendData.outcome.replace(/_/g, " ")}
        </p>

        {featured && (
          <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-ash">
            {project.backendData.description}
          </p>
        )}

        <div className="mt-7 inline-flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mist transition-colors group-hover:text-signal">
          {isCaseStudy ? "Open case study" : "View project"}
          <span className="h-px w-12 bg-signal/70" />
        </div>
      </div>
    </article>
  );
}

function ProjectsSection({ setActiveMonolithId, setHoveredMonolithId }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const featured = projects[0];
  const rest = projects.slice(1);

  useRevealOnScroll(sectionRef, () => setVisible(true));

  return (
    <section
      ref={sectionRef}
      data-section-label="Projects"
      className={`relative max-w-7xl mx-auto px-8 py-28 lg:py-36 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-16">
          <Eyebrow>Selected projects</Eyebrow>
          <h2 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em] text-mist">
            Projects that feel complete.
          </h2>
          <p className="mt-6 font-sans text-base leading-8 text-ash max-w-sm">
            Not just a landing page or an API, but the whole system:
            authentication, databases, permissions, real-time features,
            deployment, and details that make software reliable after people
            start using it.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm">
            {["SaaS", "Realtime", "Commerce", "Ops"].map((tag) => (
              <div
                key={tag}
                className="border border-steel/25 bg-surface/45 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ash"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 lg:grid-cols-8 gap-5">
          <ProjectCard
            project={featured}
            index={0}
            featured
            onOpen={setActiveMonolithId}
            onHover={setHoveredMonolithId}
          />
          {rest.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx + 1}
              onOpen={setActiveMonolithId}
              onHover={setHoveredMonolithId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section
      data-section-label="Experience"
      className="relative max-w-7xl mx-auto px-8 py-24 lg:py-32"
    >
      <div className="grid grid-cols-12 gap-8 lg:gap-14">
        <div className="col-span-12 lg:col-span-4">
          <Eyebrow>Experience</Eyebrow>
          <h2 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em] text-mist">
            Production work outside the classroom.
          </h2>
          <p className="mt-6 max-w-sm font-sans text-base leading-8 text-ash">
            Real development work, deployed output, and lessons from building
            software with practical constraints.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-5">
          {experiences.map((item, index) => (
            <article key={item.id} className="atelier-panel p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[4rem_1fr_auto] md:items-start">
                <div className="font-mono text-xs text-steel">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal">
                    {item.start} - {item.end} · {item.duration}
                  </div>
                  <h3 className="mt-3 font-serif text-4xl md:text-5xl leading-none text-mist">
                    {item.role}
                  </h3>
                  <div className="mt-2 font-sans text-lg text-ash">
                    {item.organization}
                  </div>
                  <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-ash">
                    {item.summary}
                  </p>
                  <ul className="mt-5 grid gap-3 md:grid-cols-3">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="border border-steel/25 bg-night/55 p-4 font-sans text-sm leading-6 text-ash"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center border border-steel/35 px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ash transition-colors hover:border-signal hover:text-signal"
                >
                  View work
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { status, handleSubmit } = useContactForm();

  return (
    <form
      onSubmit={handleSubmit}
      className="atelier-panel flex-1 w-full flex flex-col gap-5 p-6 md:p-9"
    >
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
        <div key={name} className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
            {label}
          </label>
          <input
            type={type}
            name={name}
            required
            maxLength={name === "email" ? 120 : 80}
            className="bg-night/70 border border-steel/35 focus:border-signal focus:ring-1 focus:ring-signal/40 outline-none text-mist px-4 py-3 transition-colors font-sans text-base"
            placeholder={placeholder}
          />
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
          Message
        </label>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows="4"
          className="bg-night/70 border border-steel/35 focus:border-signal focus:ring-1 focus:ring-signal/40 outline-none text-mist px-4 py-3 transition-colors resize-none font-sans text-base"
          placeholder="Tell me what you're building."
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 border border-signal bg-signal text-night px-6 py-3 transition-colors font-mono text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-mist hover:border-mist disabled:opacity-40"
      >
        {status === "sending" && "Sending..."}
        {status === "sent" && "Message sent"}
        {status === "error" && "Message failed"}
        {status === "idle" && "Send message"}
      </button>
    </form>
  );
}

function ContactSection() {
  return (
    <section
      data-section-label="Contact"
      className="min-h-screen flex flex-col items-center justify-center w-full px-4 md:px-8 py-28 pointer-events-auto relative"
    >
      <div className="flex flex-col lg:flex-row gap-8 md:gap-16 w-full max-w-6xl items-stretch justify-center">
        <div className="flex-1 flex flex-col justify-between text-left">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <div className="mt-5 font-serif text-4xl md:text-6xl text-mist leading-[0.98] tracking-[-0.025em]">
              Building something interesting?
            </div>
            <p className="mt-6 max-w-xl font-sans text-base md:text-lg text-ash leading-8">
              Whether it's a full-stack application, an internal dashboard, or
              a SaaS product, I enjoy building software that's reliable,
              scalable, and pleasant to use. If you're working on something
              interesting, I'd love to hear about it.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 font-mono tracking-[0.12em] text-[10px] font-bold uppercase max-w-md">
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
                className="border border-steel/35 bg-surface/70 px-4 py-4 text-center text-ash hover:border-signal hover:text-signal transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>

      <div className="absolute bottom-12 font-mono text-[10px] text-steel tracking-[0.18em] uppercase">
        Good software isn't just functional. It should be reliable, intuitive, and built to last.
      </div>
    </section>
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
      <ExperienceSection />
      <ProjectsSection
        setActiveMonolithId={setActiveMonolithId}
        setHoveredMonolithId={setHoveredMonolithId}
      />
      <ContactSection />
    </div>
  );
}
