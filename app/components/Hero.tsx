'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useLenis } from '@studio-freight/react-lenis';
import ThreeScene from './ThreeScene';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const lenis = useLenis();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSceneReady = () => {
    document.dispatchEvent(new Event('heroMediaLoaded'));
  };

  const scrollToMusic = () => {
    lenis?.scrollTo('#music', { offset: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: bgOpacity }}
      className="relative w-full h-screen bg-background flex items-center justify-center overflow-hidden z-30"
    >
      <div className={`absolute inset-0 z-10 transition-all duration-1000 ${theme === 'dark' ? 'invert-0' : 'invert grayscale'}`}>
        <ThreeScene onReady={handleSceneReady} />
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)]" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-50 text-center px-4"
      >
        <h1 className="font-cormorant text-7xl sm:text-8xl md:text-[140px] font-bold tracking-[0.2em] uppercase mb-4 text-foreground transition-colors duration-500">
          FENKO
        </h1>
        <p className="font-sans text-[10px] md:text-[11px] text-foreground/60 font-light tracking-[0.5em] uppercase max-w-xl mx-auto leading-relaxed">
          Some people only exist after midnight
        </p>

        {/* Кнопка скролу */}
        <button 
          onClick={scrollToMusic}
          aria-label="Scroll to music section"
          className="mt-12 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground hover:opacity-50 transition-opacity cursor-none border border-foreground/20 px-6 py-2"
        >
          [ View Archive ]
        </button>
      </motion.div>

      {/* Скролл маркер */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-foreground">scroll</span>
        <div className="w-[1px] h-10 bg-foreground/30 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 40] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 w-full h-1/2 bg-foreground"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
