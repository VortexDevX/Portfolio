"use client";

import React, { useRef } from "react";

export default function Portfolio3D() {
  const groupRef = useRef(null);

  return (
    <group ref={groupRef} position={[1.2, -0.2, -5]}>
      <mesh rotation={[0.55, 0.45, 0.2]}>
        <octahedronGeometry args={[3.2, 0]} />
        <meshBasicMaterial
          color="#4B3F72"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      <mesh rotation={[0.2, -0.3, 0.7]}>
        <torusGeometry args={[3.9, 0.006, 8, 96]} />
        <meshBasicMaterial color="#7CF7C8" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
