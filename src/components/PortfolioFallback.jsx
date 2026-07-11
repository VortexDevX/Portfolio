export default function PortfolioFallback() {
  return (
    <div className="flex min-h-screen items-center bg-night px-5 text-mist md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
          Computer Engineering Student — Full-Stack Developer
        </p>
        <h1 className="mt-6 font-serif text-[clamp(4.8rem,11vw,10.5rem)] leading-[0.82] tracking-[-0.04em]">
          Vaibhav
          <br />
          Patel
        </h1>
        <p className="mt-8 max-w-xl border-l border-steel/50 pl-6 font-sans text-lg leading-8 text-ash">
          Building modern web applications with clean architecture, thoughtful
          interfaces, and production-ready systems.
        </p>
      </div>
    </div>
  );
}
