import React from 'react';
import { useStore } from '../../store/useStore';

export default function Terminal() {
  const isTerminalOpen = useStore((state) => state.isTerminalOpen);
  const setTerminalOpen = useStore((state) => state.setTerminalOpen);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-void/80 backdrop-blur-xl pointer-events-auto transition-opacity duration-700 z-[100] flex items-center justify-center ${isTerminalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className={`bg-[#040812] border border-[#222] shadow-[0_0_80px_rgba(0,229,255,0.05)] p-12 max-w-4xl w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-sm ${isTerminalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}
        >
          <div className="flex justify-between items-center border-b border-[#222] pb-8 mb-10">
            <div className="font-serif text-4xl text-white tracking-widest text-shadow">Vortex_Dev_X</div>
            <button 
              onClick={() => {
                setTerminalOpen(false);
                document.body.style.cursor = 'none';
              }} 
              className="text-[#555] hover:text-accent font-mono text-3xl transition-colors cursor-pointer"
            >
              &times;
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-16 font-mono text-sm text-[#aaa]">
            <div className="space-y-8 pl-4 border-l border-[#222]">
              <div>
                <span className="block text-[10px] text-accent tracking-[0.3em] uppercase mb-2 font-bold">Designation</span>
                <span className="text-white text-base tracking-wide">FULL_STACK_ENGINEER</span>
              </div>
              <div>
                <span className="block text-[10px] text-accent tracking-[0.3em] uppercase mb-2 font-bold">Current Status</span>
                <span className="text-white text-base tracking-wide flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse"></span>
                  OPEN TO CONTRACTS
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-accent tracking-[0.3em] uppercase mb-2 font-bold">Locational Node</span>
                <span className="text-white text-base tracking-wide">LAT: 40.7128 // LNG: -74.0060</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 justify-center">
              <a href="mailto:patelvaibhav020406@gmail.com" className="group w-full border border-[#222] hover:border-accent bg-[#060a12] text-white px-8 py-5 transition-colors cursor-pointer flex items-center gap-4">
                <span className="text-accent group-hover:text-black font-bold">&gt;</span> 
                <span className="tracking-widest uppercase text-xs group-hover:text-black transition-colors">INITIATE_EMAIL_HANDSHAKE</span>
              </a>
              <a href="https://github.com/VortexDevX" target="_blank" rel="noreferrer" className="group w-full border border-[#222] hover:border-accent bg-[#060a12] text-white px-8 py-5 transition-colors cursor-pointer flex items-center gap-4">
                <span className="text-accent group-hover:text-black font-bold">&gt;</span> 
                <span className="tracking-widest uppercase text-xs group-hover:text-black transition-colors">VIEW_GITHUB_REPOSITORY</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute top-8 right-12 cursor-pointer pointer-events-auto font-mono text-white text-xs group flex items-center z-[200]"
        onClick={() => {
          setTerminalOpen(true);
          document.body.style.cursor = 'default';
        }}
        onPointerEnter={(e) => { document.body.style.cursor = 'default'; }}
        onPointerLeave={(e) => { if(!isTerminalOpen) document.body.style.cursor = 'none'; }}
      >
        <span className="opacity-0 group-hover:opacity-100 mr-4 tracking-[0.3em] uppercase transition-opacity duration-300 font-bold">
          INITIATE_UPLINK
        </span>
        <div className="w-12 h-12 border border-[#333] group-hover:border-accent bg-[#040812] flex items-center justify-center transition-colors shadow-lg">
          <span className="animate-pulse font-bold text-accent text-lg mb-1">_</span>
        </div>
      </div>
    </>
  );
}
