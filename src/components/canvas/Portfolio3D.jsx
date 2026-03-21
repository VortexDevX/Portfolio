import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useTexture, Edges, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../../data/projects';
import { useStore } from '../../store/useStore';

function FloatingImage({ project, basePosition, isLeft }) {
  const texture = useTexture(project.frontendTexture);
  const meshRef = useRef();
  
  const activeId = useStore((state) => state.activeMonolithId);
  const isActive = activeId === project.id;
  const isAnyActive = activeId !== null;
  const scroll = useScroll();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (isActive) {
      // Cinematic Focus Zoom! Fly the active Image exactly to the absolute center of the camera overriding local scroll mutations entirely!
      // Total 8 pages in App.jsx -> scroll.offset covers 7 viewports of translation.
      const exactCenterY = -scroll.offset * 7 * viewport.height;
      meshRef.current.position.lerp(new THREE.Vector3(0, exactCenterY, 2.5), delta * 5);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, delta * 5);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, delta * 5);
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1), delta * 5);
    } else {
      // Normal Floating Parallax State bypassed deprecated THREE.Clock to silence console warnings
      const time = performance.now() / 1000;
      const targetX = basePosition[0];
      const targetY = basePosition[1] + Math.sin(time + basePosition[1]) * 0.1;
      const targetZ = basePosition[2];

      meshRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 3);
      meshRef.current.rotation.x = Math.sin(time * 0.5 + basePosition[0]) * 0.02;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, isLeft ? 0.05 : -0.05, delta * 3);
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 3);
    }
    
    // Dim inactive planes aggressively so the active glass pane asserts dominance visually
    if (meshRef.current.material) {
      const targetOpacity = isAnyActive && !isActive ? 0.02 : 1.0;
      meshRef.current.material.opacity = THREE.MathUtils.lerp(meshRef.current.material.opacity, targetOpacity, delta * 5);
    }
  });

  return (
    <mesh ref={meshRef} position={basePosition}>
      <planeGeometry args={[6.4, 3.6]} />
      <meshBasicMaterial map={texture} color="#ffffff" transparent />
      <Edges scale={1.01} color="#00e5ff" opacity={isActive ? 0.9 : 0.6} transparent />
    </mesh>
  );
}

export default function Portfolio3D() {
  const { viewport } = useThree();
  const vh = viewport.height;
  
  return (
    <group>
      {/* Hero 3D Graphic */}
      <mesh position={[0, -vh * 0.1, -5]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[3, 0]} />
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.15} />
      </mesh>

      {projects.map((project, idx) => {
        const pageIndex = idx + 2; 
        const isLeft = idx % 2 === 0;
        
        // Mobile Aspect Vector Overrides mathematically snapping planes strictly to central grids
        const isMobile = viewport.width < 5;
        const xPos = isMobile ? 0 : (isLeft ? -viewport.width * 0.23 : viewport.width * 0.23);
        const yOffset = isMobile ? vh * 0.18 : 0; // Push 3D mesh slightly upwards clearing raw DOM typography space on portrait screens.
        
        return (
          <FloatingImage 
            key={project.id}
            project={project}
            basePosition={[xPos, -pageIndex * vh + yOffset, 0]}
            isLeft={isLeft}
          />
        );
      })}
    </group>
  );
}
