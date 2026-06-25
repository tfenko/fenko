'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

/**
 * 3D Particle System: Візуалізатор частинок, що реагує на курсор
 */
function ParticleSystem() {
  const ref = useRef<THREE.Points>(null!);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.0005;
      ref.current.rotation.y -= 0.0002;
      // Плавна реакція на положення миші
      ref.current.position.x = state.mouse.x * 0.2;
      ref.current.position.y = state.mouse.y * 0.2;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#888" 
        size={0.003} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </Points>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Параметри анімації при скролі
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToMusic = () => {
    document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
  };

  const musicLinks = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/6DyQbxEBYocDwvxPvl2gBS?si=jpGzjHaHSsWz7knbsVIPDQ' },
    { name: 'Apple Music', url: 'https://music.apple.com/ua/artist/fenko/1895075050' },
    { name: 'YouTube', url: 'https://music.youtube.com/@Fenkomus' },
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity: bgOpacity }}
      className="relative w-full h-screen bg-background flex items-center justify-center overflow-hidden z-30"
    >
      {/* 3D Контейнер */}
      <div className={`absolute inset-0 z-10 opacity-60 ${theme === 'light' ? 'invert' : ''}`}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleSystem />
        </Canvas>
      </div>

      {/* Градієнтна підкладка для читабельності контенту */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

      {/* Головний контент */}
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

        {/* Платформи */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {musicLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-foreground/20 hover:border-foreground bg-foreground/5 hover:bg-foreground hover:text-background transition-all duration-300 focus-visible:outline-2 focus-visible:outline-foreground"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.3em]">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Кнопка переходу */}
        <button 
          onClick={scrollToMusic}
          className="mt-12 px-12 py-4 border border-foreground/30 hover:border-foreground transition-all duration-500 backdrop-blur-sm hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-foreground"
        >
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-foreground">
            [ Discography ]
          </span>
        </button>
      </motion.div>

      {/* Анімований скрол-маркер */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 pointer-events-none"
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