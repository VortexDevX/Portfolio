"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Sparkles } from "@react-three/drei";
import Portfolio3D from "./Portfolio3D";
import PortfolioDOM from "../dom/PortfolioDOM";
import ScrollHUDCanvas from "../dom/ScrollHUDCanvas";
import { projects } from "../../data/projects";

const SCROLL_PAGES = 1 + 1 + projects.length + 1;

export default function Scene() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#030712"]} />

      <Sparkles
        count={800}
        scale={40}
        size={1.2}
        speed={0.1}
        opacity={0.15}
        color="#00e5ff"
      />

      <ScrollControls pages={SCROLL_PAGES} damping={0.25} distance={1}>
        <Suspense fallback={null}>
          <Scroll>
            <Portfolio3D />
          </Scroll>

          <Scroll html style={{ width: "100%", height: "100%" }}>
            <PortfolioDOM />
          </Scroll>

          {/* Canvas-context reader — writes scroll data to DOM refs via useFrame */}
          <ScrollHUDCanvas />
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
}
