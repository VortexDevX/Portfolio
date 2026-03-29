"use client";

import React from "react";
import CustomCursor from "./dom/CustomCursor.jsx";
import Scene from "./canvas/Scene.jsx";
import ProjectModal from "./dom/ProjectModal.jsx";

export default function DesktopApp() {
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
