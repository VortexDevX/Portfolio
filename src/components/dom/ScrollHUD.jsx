"use client";

import React, { useEffect, useState } from "react";

const FALLBACK_SECTIONS = ["Hero", "About", "Projects", "Contact"];

export default function ScrollHUD({ scrollRef }) {
  const [state, setState] = useState({
    progress: 0,
    index: 0,
    sections: FALLBACK_SECTIONS,
  });

  useEffect(() => {
    const scroller = scrollRef?.current;
    if (!scroller) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = Array.from(
        scroller.querySelectorAll("[data-section-label]"),
      );
      const labels = sections.map((section) => section.dataset.sectionLabel);
      const max = Math.max(scroller.scrollHeight - scroller.clientHeight, 1);
      const progress = scroller.scrollTop / max;
      const probe = scroller.scrollTop + scroller.clientHeight * 0.45;
      const index = Math.max(
        0,
        sections.findLastIndex((section) => section.offsetTop <= probe),
      );

      setState({
        progress,
        index,
        sections: labels.length ? labels : FALLBACK_SECTIONS,
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [scrollRef]);

  const total = state.sections.length;
  const label = state.sections[state.index] || FALLBACK_SECTIONS[0];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[300] flex flex-col items-center gap-4 pointer-events-none select-none">
      <div className="w-px h-32 bg-steel/25 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-signal origin-top"
          style={{ transform: `scaleY(${state.progress})` }}
        />
      </div>

      <div className="font-mono text-[9px] text-steel tracking-[0.14em] font-bold tabular-nums">
        {String(state.index + 1).padStart(2, "0")} /{" "}
        {String(total).padStart(2, "0")}
      </div>

      <div
        className="font-mono text-[9px] text-ash/70 tracking-[0.18em] uppercase font-bold transition-opacity duration-300"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {label}
      </div>
    </div>
  );
}
