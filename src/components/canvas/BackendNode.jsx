import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function BackendNode() {
  const meshRefOuter = useRef();
  const meshRefInner = useRef();

  useFrame((state, delta) => {
    if (meshRefOuter.current) {
      meshRefOuter.current.rotation.x += delta * 0.5;
      meshRefOuter.current.rotation.y += delta * 0.2;
    }
    if (meshRefInner.current) {
      meshRefInner.current.rotation.x -= delta * 0.8;
      meshRefInner.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRefOuter}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#FF003C" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={meshRefInner}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#FFFFFF" wireframe />
      </mesh>
    </group>
  );
}
