'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import ThreeScene from './ThreeScene';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

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

  const handleSceneReady = () => {
    document.dispatchEvent(new Event('heroMediaLoaded'));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-background flex items-center justify-center overflow-hidden z-30 transition-colors duration-600"
    >
      {/* Інверсія сцени для світлої теми: тепер 3D виглядає як "негатив", а не просто бліда пляма */}
      <div className={`absolute inset-0 z-10 transition-all duration-700 ${theme === 'dark' ? 'invert-0' : 'invert-[0.85] grayscale'}`}>
        <ThreeScene onReady={handleSceneReady} />
      </div>

      {/* Адаптивне затемнення: темне для Dark, світле для Light */}
      <div className={`absolute inset-0 z-20 pointer-events-none transition-colors duration-600 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/40'}`} />
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,var(--background)_85%)] opacity-90" />

      {/* Текст */}
      <div 
        ref={contentRef} 
        className="relative z-50 text-center px-4 will-change-transform transition-opacity duration-700"
      >
        {/* Прибрано text-outline-light. Замість нього font-semibold для контрасту */}
        <h1 className="font-cormorant text-7xl sm:text-8xl md:text-9xl font-semibold tracking-[0.25em] uppercase mb-4 text-foreground transition-all duration-500">
          FENKO
        </h1>
        <p className="font-sans text-[10px] md:text-xs text-foreground/70 font-light tracking-[0.5em] uppercase max-w-xl mx-auto leading-relaxed">
          Some people only exist after midnight
        </p>
      </div>

      {/* Скролл маркер */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 opacity-30 flex flex-col items-center gap-2">
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-foreground">scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent animate-pulse" />
      </div>
    </div>
  );
}
