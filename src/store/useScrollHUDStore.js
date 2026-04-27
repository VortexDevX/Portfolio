// Shared ref store for bridging ScrollControls (canvas) → HUD (DOM).
// Plain module-level refs — no Zustand overhead needed for raw DOM writes.

export const scrollHUDRefs = {
  label:   null,
  barFill: null,
  index:   null,
};
