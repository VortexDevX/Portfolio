"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { projects } from "../../data/projects";
import { scrollHUDRefs } from "../../store/useScrollHUDStore";

const SECTIONS = [
  "HERO",
  "ABOUT",
  ...projects.map((p) => p.title.replace(/_/g, " ")),
  "CONTACT",
];

const TOTAL_SECTIONS = SECTIONS.length;

// Must match Scene.jsx SCROLL_PAGES exactly:
// 1 (hero) + 1 (about) + projects.length + 1 (contact)
const SCROLL_PAGES = 1 + 1 + projects.length + 1;

export default function ScrollHUDCanvas() {
  const scroll = useScroll();
  // Instance-level ref — safe across remounts and strict mode double-invoke
  const lastIndexRef = useRef(-1);

  useFrame(() => {
    const t = scroll.offset; // 0 → 1

    // Progress bar — runs every frame, direct style mutation
    if (scrollHUDRefs.barFill) {
      scrollHUDRefs.barFill.style.transform = `scaleY(${t})`;
    }

    // Map scroll offset → page index → section index.
    // Each section occupies exactly 1 page out of SCROLL_PAGES total.
    // floor(t * SCROLL_PAGES) gives current page (0-indexed).
    // Clamp to TOTAL_SECTIONS - 1 so the last page maps cleanly to CONTACT.
    const page = Math.floor(t * SCROLL_PAGES);
    const current = Math.min(page, TOTAL_SECTIONS - 1);

    // Only update text nodes when section actually changes
    if (current !== lastIndexRef.current) {
      lastIndexRef.current = current;

      if (scrollHUDRefs.label) {
        scrollHUDRefs.label.textContent = SECTIONS[current];
      }
      if (scrollHUDRefs.index) {
        scrollHUDRefs.index.textContent = `${String(current + 1).padStart(2, "0")} / ${String(TOTAL_SECTIONS).padStart(2, "0")}`;
      }
    }
  });

  return null;
}
