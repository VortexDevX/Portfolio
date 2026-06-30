"use client";

import React, { useRef } from "react";
import CustomCursor from "./dom/CustomCursor.jsx";
import Scene from "./canvas/Scene.jsx";
import ProjectModal from "./dom/ProjectModal.jsx";
import ScrollHUD from "./dom/ScrollHUD.jsx";
import PortfolioDOM from "./dom/PortfolioDOM.jsx";

export default function DesktopApp() {
  const scrollRef = useRef(null);

  return (
    <>
      <div className="fixed inset-0 z-0 w-full h-full text-mist bg-night">
        <Scene />
      </div>
      <div
        ref={scrollRef}
        className="fixed inset-0 z-10 overflow-y-auto overflow-x-hidden text-mist"
      >
        <PortfolioDOM />
      </div>
      <ScrollHUD scrollRef={scrollRef} />
      <CustomCursor />
      <ProjectModal />
    </>
  );
}
