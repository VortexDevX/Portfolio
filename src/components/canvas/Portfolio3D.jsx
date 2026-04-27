"use client";

import React, { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useTexture, Edges, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "../../data/projects";
import { useStore } from "../../store/useStore";

// ─── Reusable scratch vectors — allocated once per component instance,
// mutated in place inside useFrame. Never triggers GC during animation.
// Each FloatingImage gets its own set via useRef so instances don't share state.
function useScratchVectors() {
  return useRef({
    activeTarget: new THREE.Vector3(),
    idleTarget: new THREE.Vector3(),
    scaleActive: new THREE.Vector3(1.1, 1.1, 1),
    scaleIdle: new THREE.Vector3(1, 1, 1),
  });
}

function FloatingImage({ project, basePosition, isLeft }) {
  const texture = useTexture(project.frontendTexture);
  const meshRef = useRef();
  const timeRef = useRef(0);
  const scratch = useScratchVectors();

  const activeId = useStore((state) => state.activeMonolithId);
  const isActive = activeId === project.id;
  const isAnyActive = activeId !== null;
  const scroll = useScroll();
  const { viewport } = useThree();

  const isMobile = viewport.width < 5;
  const planeW = isMobile ? 4 : 6.4;
  const planeH = isMobile ? 2.25 : 3.6;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Cap delta to prevent tab-switch teleportation
    const safeDelta = Math.min(delta, 0.1);
    timeRef.current += safeDelta;
    const time = timeRef.current;

    if (isActive) {
      const exactCenterY = -scroll.offset * 7 * viewport.height;

      // Mutate the cached vector in place — zero allocation
      scratch.current.activeTarget.set(0, exactCenterY, 2.5);
      meshRef.current.position.lerp(scratch.current.activeTarget, safeDelta * 5);

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0,
        safeDelta * 5,
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        safeDelta * 5,
      );

      // Mutate scale vector in place
      meshRef.current.scale.lerp(scratch.current.scaleActive, safeDelta * 5);
    } else {
      const targetX = basePosition[0];
      const targetY = basePosition[1] + Math.sin(time + basePosition[1]) * 0.1;
      const targetZ = basePosition[2];

      // Mutate the cached idle target in place
      scratch.current.idleTarget.set(targetX, targetY, targetZ);
      meshRef.current.position.lerp(scratch.current.idleTarget, safeDelta * 3);

      meshRef.current.rotation.x =
        Math.sin(time * 0.5 + basePosition[0]) * 0.02;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        isLeft ? 0.05 : -0.05,
        safeDelta * 3,
      );

      // Mutate scale vector in place
      meshRef.current.scale.lerp(scratch.current.scaleIdle, safeDelta * 3);
    }

    if (meshRef.current.material) {
      const targetOpacity = isAnyActive && !isActive ? 0.02 : 1.0;
      meshRef.current.material.opacity = THREE.MathUtils.lerp(
        meshRef.current.material.opacity,
        targetOpacity,
        safeDelta * 5,
      );
    }
  });

  return (
    <mesh ref={meshRef} position={basePosition}>
      <planeGeometry args={[planeW, planeH]} />
      <meshBasicMaterial map={texture} color="#ffffff" transparent />
      <Edges
        scale={1.01}
        color="#00e5ff"
        opacity={isActive ? 0.9 : 0.6}
        transparent
      />
    </mesh>
  );
}

export default function Portfolio3D() {
  const { viewport } = useThree();
  const vh = viewport.height;

  return (
    <group>
      {/* Hero geometric accent */}
      <mesh position={[0, -vh * 0.1, -5]} rotation={[0.5, 0.5, 0]}>
        <octahedronGeometry args={[3, 0]} />
        <meshBasicMaterial
          color="#00e5ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {projects.map((project, idx) => {
        const pageIndex = idx + 2;
        const isLeft = idx % 2 === 0;

        const isMobile = viewport.width < 5;
        const xPos = isMobile
          ? 0
          : isLeft
            ? -viewport.width * 0.23
            : viewport.width * 0.23;
        const yOffset = isMobile ? vh * 0.18 : 0;

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
