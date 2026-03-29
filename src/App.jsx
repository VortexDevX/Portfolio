"use client";

import React from "react";
import useIsMobile from "./hooks/useIsMobile";
import CustomCursor from "./components/dom/CustomCursor.jsx";
import Scene from "./components/canvas/Scene.jsx";
import ProjectModal from "./components/dom/ProjectModal.jsx";
import MobilePortfolio from "./components/mobile/MobilePortfolio.jsx";

export default function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobilePortfolio />;
  }

  return (
    <>
      <div className="absolute inset-0 w-full h-full text-white bg-[#030712]">
        <Scene />
      </div>
      <CustomCursor />
      <ProjectModal />
    </>
  );
}
