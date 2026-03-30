"use client";

import useIsMobile from "./hooks/useIsMobile";
import DesktopApp from "./components/DesktopApp";
import MobilePortfolio from "./components/mobile/MobilePortfolio";

export default function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return <DesktopApp />;
}
