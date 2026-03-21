import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';

export default function ProjectGallery() {
  const GAP = 9; // Spacing horizontally between cards
  const START_X = -((projects.length - 1) * GAP) / 2;

  return (
    <group>
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project}
          position={[START_X + index * GAP, 0, 0]} 
        />
      ))}
    </group>
  );
}
