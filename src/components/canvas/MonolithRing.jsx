import React from 'react';
import Monolith from './Monolith';
import { projects } from '../../data/projects';

export default function MonolithRing() {
  // Distance from center
  const RADIUS = 15;

  return (
    <group>
      {projects.map((project, index) => {
        // Calculate the angle for each monolith
        const angle = (index / projects.length) * Math.PI * 2;
        
        // Calculate X and Z on the ring
        const x = Math.sin(angle) * RADIUS;
        const z = Math.cos(angle) * RADIUS;
        
        // Critically adding Math.PI to rotation Y ensures the plane geometry mounted on local +Z faces origin [0,0,0] perfectly
        const rotation = [0, angle + Math.PI, 0];
        
        return (
          <Monolith 
            key={project.id} 
            project={project}
            position={[x, 0, z]} 
            rotation={rotation} 
          />
        );
      })}
    </group>
  );
}
