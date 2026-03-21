import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Html, useTexture, Edges } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ProjectCard({ project, position }) {
  const setActiveMonolithId = useStore((state) => state.setActiveMonolithId);
  const setHoveredMonolithId = useStore((state) => state.setHoveredMonolithId);
  const hoveredId = useStore((state) => state.hoveredMonolithId);
  const activeId = useStore((state) => state.activeMonolithId);
  
  const isHovered = hoveredId === project.id;
  const isActive = activeId === project.id;
  const isAnyActive = activeId !== null;

  const groupRef = useRef();
  const materialRef = useRef();
  
  const texture = useTexture(project.frontendTexture);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Scale up slightly on hover, or scale heavily forward if active
    const targetScale = isActive ? 1.15 : (isHovered && !isAnyActive ? 1.05 : 1.0);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);

    // Dim other unselected cards
    if (materialRef.current) {
      const targetOpacity = (isAnyActive && !isActive) ? 0.05 : 1.0;
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, delta * 5);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Sleek 16:9 Widescreen Plane */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          if (!isAnyActive) {
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
          if (!isAnyActive) {
            setActiveMonolithId(project.id);
            document.body.style.cursor = 'default';
          }
        }}
      >
        <planeGeometry args={[6.4, 3.6]} />
        <meshBasicMaterial 
          ref={materialRef}
          color="white" 
          map={texture}
          transparent
          opacity={1}
        />
        {/* Glowing border around the card */}
        <Edges scale={1.01} color="#00e5ff" opacity={isHovered ? 0.8 : 0.2} transparent />
      </mesh>

      {/* Floating Display Title Below Card */}
      <Html position={[0, -2.6, 0]} center transform pointerEvents="none">
        <div 
          className="font-serif text-white whitespace-nowrap tracking-wide"
          style={{ 
            fontSize: '1.8rem', 
            opacity: (!isAnyActive) ? (isHovered ? 1 : 0.6) : 0, 
            transition: 'opacity 0.4s ease',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          {project.title.replace(/_/g, ' ')}
        </div>
      </Html>
    </group>
  );
}
