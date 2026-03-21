import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Html, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BackendNode from './BackendNode';

export default function Monolith({ project, position, rotation }) {
  const setHoveredMonolithId = useStore((state) => state.setHoveredMonolithId);
  const hoveredMonolithId = useStore((state) => state.hoveredMonolithId);
  const isInsideBackend = useStore((state) => state.isInsideBackend);
  const activeMonolithId = useStore((state) => state.activeMonolithId);
  const isDiving = useStore((state) => state.isDiving);
  const planeMaterialRef = useRef();

  const isHovered = hoveredMonolithId === project.id;
  
  const texture = useTexture(project.frontendTexture);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state, delta) => {
    if (planeMaterialRef.current) {
      // By default 0, turns to 1 on hover only.
      const targetOpacity = isInsideBackend ? 0 : (isHovered ? 1 : 0);
      planeMaterialRef.current.opacity = THREE.MathUtils.lerp(
        planeMaterialRef.current.opacity,
        targetOpacity,
        delta * 8
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!activeMonolithId) {
            setHoveredMonolithId(project.id);
            document.body.style.cursor = 'none'; 
          }
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredMonolithId(null);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!isDiving && !isInsideBackend && !activeMonolithId) {
            useStore.getState().setActiveMonolithId(project.id);
          }
        }}
      >
        <boxGeometry args={[4, 12, 4]} />
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.9}
          roughness={0.2}
          clearcoat={1.0}
        />
      </mesh>

      {/* The Actual Frontend UI Hologram Plane */}
      <mesh position={[0, 0, 2.05]}>
        <planeGeometry args={[6.4, 3.6]} />
        <meshBasicMaterial 
          ref={planeMaterialRef}
          color="white" 
          map={texture}
          transparent 
          opacity={0} 
          depthWrite={false}
        />
      </mesh>

      {isInsideBackend && activeMonolithId === project.id && (
        <BackendNode />
      )}

      {/* Massive White Serif placed exactly off to the right */}
      <Html position={[4.5, 0, 2.05]} center transform pointerEvents="none">
        <div 
          className="font-serif italic text-white whitespace-nowrap pointer-events-none"
          style={{ 
            fontSize: '5vw', 
            letterSpacing: '-0.02em',
            opacity: isHovered && !isInsideBackend ? 1 : 0,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {project.title.replace(/_/g, ' ')}
        </div>
      </Html>
    </group>
  );
}
