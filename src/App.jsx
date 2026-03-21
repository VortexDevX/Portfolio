import React from 'react';
import CustomCursor from './components/dom/CustomCursor.jsx';
import Scene from './components/canvas/Scene.jsx';
import ProjectModal from './components/dom/ProjectModal.jsx';

export default function App() {
  return (
    <>
      <div className="absolute inset-0 w-full h-full text-white bg-[#030712]">
        <Scene />
      </div>

      <CustomCursor />
      
      {/* Central rendering portal for modal payloads strictly isolating interactions */}
      <ProjectModal />
    </>
  );
}
