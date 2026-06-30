"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import Portfolio3D from "./Portfolio3D";

export default function Scene() {
  return (
    <Canvas
      frameloop="demand"
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#080A0D"]} />

      <Sparkles
        count={280}
        scale={40}
        size={1.2}
        speed={0}
        opacity={0.11}
        color="#7CF7C8"
      />

      <Suspense fallback={null}>
        <Portfolio3D />
      </Suspense>
    </Canvas>
  );
}
