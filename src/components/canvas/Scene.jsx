import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Sparkles } from '@react-three/drei';
import Portfolio3D from './Portfolio3D';
import PortfolioDOM from '../dom/PortfolioDOM';

export default function Scene() {
  return (
    <Canvas 
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 2]}
    >
      {/* Strict deep abyssal cyan background */}
      <color attach="background" args={['#030712']} />
      
      {/* Massive clear lighting setup ensures Screenshots render with perfect web color accuracy */}
      <ambientLight intensity={2} color="#ffffff" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Subtle particle engine layered strictly into the void */}
      <Sparkles count={800} scale={40} size={1.2} speed={0.1} opacity={0.15} color="#00e5ff" />

      {/* 
        ScrollControls effortlessly manages 8 full vertical sections (100vh each).
        It seamlessly synchronizes the invisible HTML scrolling wheel directly with 3D translation engines.
      */}
      <ScrollControls pages={8} damping={0.25} distance={1}>
        <Suspense fallback={null}>
          
          {/* Scroll block for 3D Renders */}
          <Scroll>
            <Portfolio3D />
          </Scroll>

          {/* Scroll block for cleanly positioned standard DOM HTML */}
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <PortfolioDOM />
          </Scroll>

        </Suspense>
      </ScrollControls>
    </Canvas>
  );
}
