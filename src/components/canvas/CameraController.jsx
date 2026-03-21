import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';
import { projects } from '../../data/projects';

export default function CameraController() {
  const { camera } = useThree();
  const activeMonolithId = useStore((state) => state.activeMonolithId);
  const GAP = 9;
  const START_X = -((projects.length - 1) * GAP) / 2;

  useFrame((state, delta) => {
    // If exploring a project, glide camera exactly smoothly in front of it!
    if (activeMonolithId !== null) {
      const activeIndex = projects.findIndex(p => p.id === activeMonolithId);
      const targetX = START_X + activeIndex * GAP;
      
      const targetPosition = new THREE.Vector3(targetX, 0, 4.0); // Perfect zooming distance
      camera.position.lerp(targetPosition, delta * 3.5);
      
      const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
      camera.quaternion.slerp(targetRotation, delta * 3.5);
    } 
    // If idle, track mouse horizontally for Awwwards-style panoramic gallery
    else {
      const panLimit = (projects.length * GAP) / 2.2; // How far the camera can travel left/right
      const targetX = state.pointer.x * panLimit;
      const targetPosition = new THREE.Vector3(targetX, 0, 9); // Distance pushed back
      
      camera.position.lerp(targetPosition, delta * 2.5);
      
      // Add slight parallax tilt
      const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(
        -state.pointer.y * 0.05, 
        -state.pointer.x * 0.08, 
        0
      ));
      camera.quaternion.slerp(targetRotation, delta * 2.5);
    }
  });

  return null;
}
