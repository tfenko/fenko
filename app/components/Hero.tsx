'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import ThreeScene from './ThreeScene';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
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
    const musicSection = document.getElementById('music');
    if (musicSection) {
      musicSection.scrollIntoView({ behavior: 'smooth' });
    }
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

        {/* Стильна кнопка [ Listen Now ] */}
        <button 
          onClick={scrollToMusic}
          aria-label="Scroll to music section"
          className="mt-12 group relative px-8 py-3 overflow-hidden border border-foreground/20 hover:border-foreground transition-all duration-300 cursor-none"
        >
          {/* Фон, що з'являється при ховері */}
          <div className="absolute inset-0 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          
          <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground group-hover:text-background transition-colors duration-300">
            [ Listen Now ]
          </span>
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
