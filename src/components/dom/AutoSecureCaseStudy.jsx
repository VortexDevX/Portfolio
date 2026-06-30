"use client";

import React, { useEffect, useMemo, useState } from "react";
import { autosecureCaseStudy as caseStudy } from "../../data/autosecureCaseStudy";

function CaseStudyButton({ href, children, variant = "primary" }) {
  const className =
    variant === "primary"
      ? "border-signal bg-signal text-night hover:bg-mist hover:border-mist"
      : "border-steel/45 bg-surface/70 text-ash hover:border-signal hover:text-signal";

  if (!href) {
    return (
      <span
        className={`inline-flex min-h-11 min-w-0 items-center justify-center border px-4 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] sm:px-5 sm:tracking-[0.28em] ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex min-h-11 min-w-0 items-center justify-center border px-4 py-3 text-center font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 sm:px-5 sm:tracking-[0.28em] ${className}`}
    >
      {children}
    </a>
  );
}

function MetricStrip() {
  return (
    <div className="grid grid-cols-2 border border-steel/25 bg-surface/45 md:grid-cols-4">
      {caseStudy.stats.map((stat) => (
        <div
          key={stat.label}
          className="border-b border-r border-steel/20 p-4 last:border-r-0 md:border-b-0"
        >
          <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-steel">
            {stat.label}
          </div>
          <div className="mt-2 font-serif text-xl leading-none text-mist">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScreenshotSlide({ slide, index, total }) {
  const isPortrait = slide.title.toLowerCase().includes("android");

  return (
    <div className="overflow-hidden border border-steel/35 bg-night">
      <div className="flex items-center justify-between border-b border-steel/20 bg-surface/55 px-4 py-3 md:px-5">
        <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-signal">
          {slide.status}
        </div>
        <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-steel">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div
        className={`relative flex items-center justify-center overflow-hidden bg-[#05070A] p-3 md:p-5 ${
          isPortrait ? "min-h-[520px]" : "aspect-video min-h-[220px]"
        }`}
      >
        {slide.src ? (
          <>
            <img
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-15 blur-xl"
              draggable="false"
            />
            <img
              src={slide.src}
              alt={slide.alt}
              className={`relative z-10 object-contain shadow-[0_28px_100px_rgba(0,0,0,0.45)] ${
                isPortrait
                  ? "max-h-[76vh] max-w-[19rem] md:max-w-[23rem]"
                  : "h-full w-full"
              }`}
              draggable="false"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,247,200,0.12),transparent_35%),repeating-linear-gradient(0deg,rgba(232,236,231,0.045)_0px,rgba(232,236,231,0.045)_1px,transparent_1px,transparent_22px),repeating-linear-gradient(90deg,rgba(111,125,140,0.08)_0px,rgba(111,125,140,0.08)_1px,transparent_1px,transparent_28px)]" />
        )}
      </div>

      <div className="grid gap-4 border-t border-steel/20 bg-surface/55 p-5 md:grid-cols-[1fr_auto] md:items-end md:p-6">
        <div>
          <h3 className="font-serif text-3xl leading-none text-mist md:text-5xl">
            {slide.title}
          </h3>
          <p className="mt-3 max-w-3xl font-sans text-sm leading-6 text-ash">
            {slide.caption}
          </p>
        </div>
        {slide.src && (
          <a
            href={slide.src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center border border-steel/35 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ash transition-colors hover:border-signal hover:text-signal"
          >
            Full image
          </a>
        )}
      </div>
    </div>
  );
}

function ScreenshotCarousel() {
  const [active, setActive] = useState(0);
  const slides = caseStudy.media;

  const activeSlide = slides[active];
  const nextSlide = () => setActive((value) => (value + 1) % slides.length);
  const prevSlide = () =>
    setActive((value) => (value - 1 + slides.length) % slides.length);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section aria-label="AutoSecure screenshots" className="space-y-4">
      <ScreenshotSlide slide={activeSlide} index={active} total={slides.length} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous screenshot"
            className="min-h-11 border border-steel/35 bg-surface/70 px-5 font-mono text-xs font-bold text-ash transition-colors duration-200 hover:border-signal hover:text-signal focus:outline-none focus:ring-2 focus:ring-signal"
          >
            PREV
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next screenshot"
            className="min-h-11 border border-steel/35 bg-surface/70 px-5 font-mono text-xs font-bold text-ash transition-colors duration-200 hover:border-signal hover:text-signal focus:outline-none focus:ring-2 focus:ring-signal"
          >
            NEXT
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={active === index}
              className={`h-11 border px-2 font-mono text-[9px] font-bold uppercase tracking-widest transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-signal ${
                active === index
                  ? "border-signal bg-signal text-night"
                  : "border-steel/30 bg-surface/60 text-steel hover:border-steel hover:text-ash"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title, children }) {
  return (
    <div className="mb-6">
      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-signal">
        {kicker}
      </div>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-mist md:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 max-w-3xl font-sans text-base leading-7 text-ash">
          {children}
        </p>
      )}
    </div>
  );
}

function FeatureGroup({ group }) {
  const visibleItems = group.items.slice(0, 3);

  return (
    <div className="atelier-soft-panel p-5 md:p-6">
      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#161A18]">
        {group.title}
      </h3>
      <ul className="mt-5 space-y-4">
        {visibleItems.map((item) => (
          <li key={item} className="flex gap-3 font-sans text-sm leading-6 text-[#303834]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ember" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListPanel({ title, items }) {
  return (
    <article className="border border-steel/25 bg-surface/45 p-5 md:p-6">
      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#161A18]">
        {title}
      </h3>
      <ol className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li
            key={item}
            className="grid grid-cols-[2rem_1fr] gap-3 font-sans text-sm leading-6 text-[#303834]"
          >
            <span className="font-mono text-ember">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

function StackSnapshot() {
  const groups = [
    {
      title: "Frontend",
      lead: "Next.js + React",
      items: ["TypeScript", "Tailwind", "Capacitor"],
    },
    {
      title: "Backend",
      lead: "Node.js + Express",
      items: ["MongoDB", "JWT/cookies", "CSRF guards"],
    },
    {
      title: "Services",
      lead: "R2 + Razorpay + Resend",
      items: ["Backups", "Exports", "MFA"],
    },
  ];

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <article key={group.title} className="border border-steel/25 bg-night/50 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-signal">
                {group.title}
              </h3>
              <p className="mt-2 font-serif text-2xl leading-none text-mist">
                {group.lead}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:max-w-[12rem] sm:justify-end">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="border border-steel/20 bg-surface/45 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ash"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ArchitectureMap() {
  const decisions = [
    {
      title: "Tenant boundary",
      body: "Every protected request resolves user and organization before controller logic.",
    },
    {
      title: "Split auth",
      body: "Web uses cookies with CSRF. Android uses Bearer tokens from native storage.",
    },
    {
      title: "Stable files",
      body: "Documents use storage keys instead of mutable policy numbers.",
    },
    {
      title: "Service layer",
      body: "Billing, email, backups, and legal versions stay behind backend services.",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {decisions.map((item) => (
        <article key={item.title} className="border border-steel/25 bg-night/50 p-4">
          <h3 className="font-serif text-2xl leading-none text-mist">
            {item.title}
          </h3>
          <p className="mt-3 font-sans text-sm leading-6 text-ash">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function WorkflowMap() {
  const flows = [
    {
      title: "Web request",
      accent: "Cookie session",
      items: [
        "Browser sends auth cookies",
        "CSRF token protects unsafe methods",
        "Tenant, role, feature, and subscription gates run",
        "Controller queries MongoDB with organization filters",
      ],
    },
    {
      title: "Mobile request",
      accent: "Native token bridge",
      items: [
        "Capacitor provides stored Bearer token",
        "Backend resolves user and organization from JWT",
        "Mobile refresh path handles one expired-token retry",
        "WebView keeps multipart uploads in normal form flow",
      ],
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {flows.map((flow) => (
        <article key={flow.title} className="border border-steel/30 bg-surface/45 p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-serif text-3xl leading-none text-mist">
              {flow.title}
            </h3>
            <span className="border border-signal/30 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-signal">
              {flow.accent}
            </span>
          </div>
          <div className="mt-6 space-y-3">
            {flow.items.map((item, index) => (
              <div key={item} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 border border-signal bg-night" />
                  {index < flow.items.length - 1 && (
                    <div className="h-full min-h-8 w-px bg-steel/30" />
                  )}
                </div>
                <div className="flex-1 border border-steel/20 bg-night/50 px-4 py-3 font-sans text-sm leading-6 text-ash">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function ChallengeGrid() {
  const visibleChallenges = caseStudy.challenges.slice(0, 4);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {visibleChallenges.map((challenge) => (
        <article key={challenge.title} className="atelier-soft-panel p-5">
          <h3 className="font-serif text-2xl text-[#161A18]">{challenge.title}</h3>
          <p className="mt-3 font-sans text-sm leading-6 text-[#303834]">
            {challenge.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function DetailGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="atelier-soft-panel p-5">
          <h3 className="font-serif text-2xl text-[#161A18]">{item.title}</h3>
          <p className="mt-3 font-sans text-sm leading-6 text-[#303834]">
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}

function SecurityDecisions() {
  const visibleDecisions = caseStudy.securityDecisions.slice(0, 8);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {visibleDecisions.map((decision) => (
        <div
          key={decision}
          className="flex gap-3 atelier-soft-panel p-4 font-sans text-sm leading-6 text-[#303834]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ember" />
          <span>{decision}</span>
        </div>
      ))}
    </div>
  );
}

export default function AutoSecureCaseStudy({ onClose }) {
  const surfaceSummary = useMemo(
    () => caseStudy.productSurfaces.join(" // "),
    [],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AutoSecure case study"
      className="fixed inset-0 z-[220] overflow-y-auto overflow-x-hidden bg-night text-mist"
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(75,63,114,0.2),transparent_32%),linear-gradient(180deg,rgba(8,10,13,0),#080A0D_72%)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-night to-transparent" />

      <header className="sticky top-0 z-20 border-b border-steel/25 bg-night/80 px-3 py-4 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 shrink-0 border border-steel/35 bg-surface/60 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ash transition-colors duration-200 hover:border-signal hover:text-signal focus:outline-none focus:ring-2 focus:ring-signal sm:tracking-[0.18em]"
          >
            Close
          </button>
          <div className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-steel md:block">
            AutoSecure // SaaS Case File
          </div>
          <CaseStudyButton href={caseStudy.liveUrl}>
            <span className="sm:hidden">Live</span>
            <span className="hidden sm:inline">Live Product</span>
          </CaseStudyButton>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl min-w-0 px-4 pb-20 pt-8 md:px-8 md:pt-14">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="min-w-0">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-signal">
              {caseStudy.eyebrow}
            </div>
            <h1 className="mt-5 break-words font-serif text-[clamp(3rem,14vw,9rem)] leading-[0.86] tracking-[-0.035em] text-mist md:leading-[0.82] md:tracking-[-0.04em]">
              {caseStudy.title}
            </h1>
            <p className="mt-5 max-w-2xl break-words font-serif text-[clamp(1.7rem,7vw,2.4rem)] leading-tight text-mist/90 md:text-4xl">
              {caseStudy.subtitle}
            </p>
            <p className="mt-6 max-w-2xl break-words border-l border-signal/60 pl-5 font-sans text-base leading-7 text-ash">
              {caseStudy.summary}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CaseStudyButton href={caseStudy.liveUrl}>Launch SaaS</CaseStudyButton>
              <CaseStudyButton variant="secondary">
                {caseStudy.repositoryLabel}
              </CaseStudyButton>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <ScreenshotCarousel />
            <div className="break-words font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-steel sm:tracking-[0.16em]">
              {surfaceSummary}
            </div>
          </div>
        </section>

        <section className="mt-12 md:mt-16">
          <MetricStrip />
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader kicker="Problem" title="Scattered agency operations">
              {caseStudy.problem}
            </SectionHeader>
          </div>
          <div>
            <SectionHeader kicker="Solution" title="One tenant-safe workspace">
              {caseStudy.solution}
            </SectionHeader>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Capabilities" title="Built as SaaS, not a demo" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {caseStudy.featureGroups.map((group) => (
              <FeatureGroup key={group.title} group={group} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Architecture" title="System layout">
            The product keeps tenant access, auth mode, file storage, and integrations separated so backend rules stay predictable.
          </SectionHeader>

          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border border-steel/30 bg-surface/45 p-5 md:p-6">
              <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-steel">
                Key decisions
              </div>
              <ArchitectureMap />
            </div>

            <div className="border border-steel/30 bg-surface/45 p-5 md:p-6">
              <div className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-steel">
                Stack snapshot
              </div>
              <StackSnapshot />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Backend" title="Authority lives server-side">
            Routes, middleware, controllers, services, models, and presenters keep tenant checks, subscription gates, response shaping, and integration logic separated.
          </SectionHeader>
          <DetailGrid items={caseStudy.backendLayers} />
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Workflow" title="Two auth paths, one tenant model">
            Browser sessions and Android WebView sessions use different auth paths because cookies plus CSRF and native Bearer tokens solve different runtime problems.
          </SectionHeader>
          <WorkflowMap />
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Subsystems" title="Storage, billing, backup, legal" />
          <DetailGrid items={caseStudy.architectureNotes} />
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Hard parts" title="Challenges solved" />
          <ChallengeGrid />
        </section>

        <section className="mt-16">
          <SectionHeader kicker="Security" title="Privacy and platform guardrails" />
          <SecurityDecisions />
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="border border-steel/35 bg-surface/60 p-5 md:p-7">
            <SectionHeader kicker="Learning" title="What this changed" />
            <ul className="space-y-4">
              {caseStudy.lessons.slice(0, 5).map((lesson) => (
                <li key={lesson} className="flex gap-3 font-sans text-sm leading-6 text-ash">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between border border-signal/35 bg-signal/10 p-5 md:p-7">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-signal">
                Access
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-none text-mist">
                Live product, no source repository.
              </h2>
              <p className="mt-4 font-sans text-sm leading-6 text-ash">
                AutoSecure is presented as a live SaaS case study. Public screenshots should use demo or sample data only.
              </p>
            </div>
            <div className="mt-8">
              <CaseStudyButton href={caseStudy.liveUrl}>Open AutoSecure</CaseStudyButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
