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
          <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center transition-all duration-200">
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
          </div>
        ) : isHovering ? (
          <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center bg-accent/10 transition-all duration-200 shadow-[0_0_16px_rgba(0,229,255,0.35)]">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        ) : (
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-200" />
        )}
      </div>
    </div>
  );
}
