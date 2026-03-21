"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const hoveredId = useStore((state) => state.hoveredMonolithId);
  const activeId = useStore((state) => state.activeMonolithId);

  useEffect(() => {
    const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const isHovering = hoveredId !== null;
  const isViewingInfo = activeId !== null;

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] ease-out transition-transform duration-75"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }}
    >
      <div className="flex items-center justify-center transition-all duration-300">
        {isViewingInfo ? (
            <div className="w-6 h-6 rounded-full border border-accent/30 flex flex-col items-center justify-center bg-accent/10">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
            </div>
        ) : isHovering ? (
            // User requested to remove the "big ass initialize button". 
            // Scaled dynamically into a hyper-minimal glowing interaction ring retaining the tracking dot gracefully.
            <div className="w-8 h-8 rounded-full border border-accent flex flex-col items-center justify-center bg-accent/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                <div className="w-2 h-2 bg-white rounded-full" />
            </div>
        ) : (
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] transition-all duration-300" />
        )}
      </div>
    </div>
  );
}
