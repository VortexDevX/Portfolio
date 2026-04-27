"use client";

import useIsMobile from "./hooks/useIsMobile";
import DesktopApp from "./components/DesktopApp";
import MobilePortfolio from "./components/mobile/MobilePortfolio";

export default function App() {
  const isMobile = useIsMobile();

  // null = hook has not resolved yet (first server render or pre-hydration).
  // Render nothing rather than flash the wrong experience.
  // Resolution is near-instant on the client (~1 paint frame).
  if (isMobile === null) return null;

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return <DesktopApp />;
}
