import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export default function BootSequence() {
  const setBooted = useStore((state) => state.setBooted);
  const isBooted = useStore((state) => state.isBooted);
  
  const [logs, setLogs] = useState([]);
  const [phase, setPhase] = useState('LOGGING'); // LOGGING, LINE, SPLIT

  useEffect(() => {
    if (phase !== 'LOGGING') return;
    
    let lineCount = 0;
    const maxLines = 45;
    const interval = setInterval(() => {
      setLogs(prev => {
        const memory = `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0')}`;
        const newLog = `${memory} ... SYSTEM_CORE_MOUNT ... OK`;
        return [...prev, newLog].slice(-maxLines);
      });
      lineCount++;
      if (lineCount > maxLines) {
        clearInterval(interval);
        setPhase('LINE');
      }
    }, 25);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'LINE') {
      setTimeout(() => setPhase('SPLIT'), 600);
    } else if (phase === 'SPLIT') {
      setTimeout(() => {
        setBooted(true);
      }, 700);
    }
  }, [phase, setBooted]);

  if (isBooted) return null;

  return (
    <div className="fixed inset-0 z-[9000] pointer-events-auto bg-transparent text-[#333] font-mono text-[8px] overflow-hidden select-none">
      {/* Background left half splitting */}
      <div 
        className={`absolute top-0 left-0 w-1/2 h-full bg-black flex flex-col justify-end pb-8 pl-4 transition-transform duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] ${phase === 'SPLIT' ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className={`absolute top-0 right-0 h-full w-[1px] bg-white transition-transform duration-500 ease-in-out origin-center ${phase === 'LOGGING' ? 'scale-y-0' : 'scale-y-100'}`}></div>
        {logs.map((log, i) => (<div key={i} className="opacity-80">{log}</div>))}
      </div>

      {/* Background right half splitting */}
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full bg-black transition-transform duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] ${phase === 'SPLIT' ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div className={`absolute top-0 left-0 h-full w-[1px] bg-white transition-transform duration-500 ease-in-out origin-center ${phase === 'LOGGING' ? 'scale-y-0' : 'scale-y-100'}`}></div>
      </div>
    </div>
  );
}
