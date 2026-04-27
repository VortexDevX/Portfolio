"use client";

import { useState, useEffect } from "react";

/**
 * Returns whether the viewport is below the given breakpoint.
 *
 * IMPORTANT — SSR/hydration safety:
 * Initial state is `null` (unknown), not `false`.
 * This prevents the server from assuming "desktop" and briefly
 * mounting the heavy Three.js canvas on mobile clients before
 * the first client-side measurement fires.
 *
 * Consumers should treat `null` as "not yet determined" and
 * render nothing (or a neutral placeholder) until resolved.
 */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check(); // Resolve immediately on mount
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
