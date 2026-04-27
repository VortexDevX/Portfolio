"use client";

import React, { useEffect, useRef } from "react";
import { scrollHUDRefs } from "../../store/useScrollHUDStore";
import { projects } from "../../data/projects";

const TOTAL_SECTIONS = 1 + 1 + projects.length + 1;

export default function ScrollHUD() {
  const labelRef   = useRef(null);
  const barFillRef = useRef(null);
  const indexRef   = useRef(null);

  // Register DOM nodes into the shared ref store so ScrollHUDCanvas
  // can write to them directly from useFrame without any React re-renders
  useEffect(() => {
    scrollHUDRefs.label   = labelRef.current;
    scrollHUDRefs.barFill = barFillRef.current;
    scrollHUDRefs.index   = indexRef.current;

    return () => {
      scrollHUDRefs.label   = null;
      scrollHUDRefs.barFill = null;
      scrollHUDRefs.index   = null;
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[300] flex flex-col items-center gap-4 pointer-events-none select-none">

      {/* Progress bar track */}
      <div className="w-px h-32 bg-gray-800 relative overflow-hidden">
        <div
          ref={barFillRef}
          className="absolute inset-0 bg-accent origin-top"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {/* Section index */}
      <div
        ref={indexRef}
        className="font-mono text-[9px] text-gray-600 tracking-widest font-bold tabular-nums"
      >
        01 / {String(TOTAL_SECTIONS).padStart(2, "0")}
      </div>

      {/* Section label — vertical */}
      <div
        ref={labelRef}
        className="font-mono text-[9px] text-gray-500 tracking-[0.3em] uppercase font-bold transition-opacity duration-300"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        HERO
      </div>
    </div>
  );
}
