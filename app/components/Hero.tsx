'use client';

import ThreeScene from './ThreeScene';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight || 800;
      
      if (contentRef.current) {
        const opacity = Math.max(0, 1 - scrollY / (windowHeight * 0.5));
        contentRef.current.style.opacity = String(opacity);
        contentRef.current.style.transform = `translateY(-${scrollY * 0.15}px)`;
      }

      if (containerRef.current) {
        const bgOpacity = Math.max(0, 1 - scrollY / windowHeight);
        containerRef.current.style.opacity = String(bgOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden z-30"
    >
      <ThreeScene />

      {/* Затемнення фону */}
      <div className="absolute inset-0 bg-black/60 z-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_85%)] opacity-90 z-40 pointer-events-none" />

      {/* Текст з новим шрифтом */}
      <div 
        ref={contentRef} 
        className="relative z-50 text-center px-4 will-change-transform transition-opacity duration-700"
      >
        <h1 className="font-cormorant text-7xl sm:text-8xl md:text-9xl font-light text-white tracking-[0.25em] uppercase mb-4 drop-shadow-[0_0_60px_rgba(255,255,255,0.08)]">
          FENKO
        </h1>
        <p className="font-sans text-[10px] md:text-xs text-gray-500 font-light tracking-[0.5em] uppercase max-w-xl mx-auto leading-relaxed">
          Some people only exist after midnight
        </p>
      </div>

      {/* Скролл маркер */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 opacity-30 flex flex-col items-center gap-2">
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-gray-400">scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </div>
  );
}