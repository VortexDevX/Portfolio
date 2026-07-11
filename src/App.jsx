"use client";

import dynamic from "next/dynamic";
import useIsMobile from "./hooks/useIsMobile";
import PortfolioFallback from "./components/PortfolioFallback";

const DesktopApp = dynamic(() => import("./components/DesktopApp"), {
  ssr: false,
  loading: () => <PortfolioFallback />,
});
const MobilePortfolio = dynamic(
  () => import("./components/mobile/MobilePortfolio"),
  { loading: () => <PortfolioFallback /> },
);

export default function App() {
  const isMobile = useIsMobile();

  // null = hook has not resolved yet (first server render or pre-hydration).
  // Render nothing rather than flash the wrong experience.
  // Resolution is near-instant on the client (~1 paint frame).
  if (isMobile === null) return <PortfolioFallback />;

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return <DesktopApp />;
}
