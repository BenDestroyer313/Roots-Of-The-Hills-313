
import React from 'react';

const MountainSVG = () => (
    <svg viewBox="0 0 100 40" className="absolute bottom-0 left-0 w-full h-auto text-rh-green opacity-20" preserveAspectRatio="none">
        <path d="M0 40 L0 25 Q 25 10, 50 25 T 100 20 L100 40 Z" fill="currentColor" />
        <path d="M0 40 L0 30 Q 15 20, 35 30 T 70 25 T 100 30 L100 40 Z" fill="currentColor" className="opacity-50" />
    </svg>
);


const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-rh-off-white text-rh-green relative overflow-hidden">
        <MountainSVG />
        <div className="z-10 text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-sans">Roots of the Hills</h1>
            <p className="mt-4 text-lg md:text-xl animate-fade-in-slow">Connecting Hearts to Hills…</p>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 1.5s ease-out forwards;
            }
            @keyframes fade-in-slow {
                0% { opacity: 0; }
                50% { opacity: 0; }
                100% { opacity: 1; }
            }
            .animate-fade-in-slow {
                animation: fade-in-slow 2.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default SplashScreen;
