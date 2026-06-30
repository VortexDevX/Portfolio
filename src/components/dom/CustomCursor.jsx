"use client";

import React, { useEffect, useRef } from "react";
import { useStore } from "../../store/useStore";

export default function CustomCursor() {
  const wrapperRef = useRef(null);
  const position   = useRef({ x: -100, y: -100 });
  const rafRef     = useRef(null);

  const hoveredId = useStore((state) => state.hoveredMonolithId);
  const activeId  = useStore((state) => state.activeMonolithId);

  const isHovering    = hoveredId !== null;
  const isViewingInfo = activeId  !== null;

  useEffect(() => {
    const onMouseMove = (e) => {
      position.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Drive position updates through rAF instead of React state.
  // This keeps the cursor off the React render cycle entirely —
  // zero re-renders per mouse move.
  useEffect(() => {
    const tick = () => {
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center justify-center">
        {isViewingInfo ? (
          <div className="w-5 h-5 rounded-full border border-steel flex items-center justify-center transition-all duration-200">
            <div className="w-1 h-1 bg-ash rounded-full" />
          </div>
        ) : isHovering ? (
          <div className="w-8 h-8 rounded-full border border-signal flex items-center justify-center bg-signal/10 transition-all duration-200 shadow-[0_0_18px_rgba(124,247,200,0.28)]">
            <div className="w-1.5 h-1.5 bg-mist rounded-full" />
          </div>
        ) : (
          <div className="w-2 h-2 bg-mist rounded-full shadow-[0_0_10px_rgba(232,236,231,0.65)] transition-all duration-200" />
        )}
      </div>
    </div>
  );
}
