'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Плавність: spring - це те, що дає цей "преміальний" ефект
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Точка (ядро) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      {/* Кільце (шлейф) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-foreground/50 rounded-full z-[9998] pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY }} 
      />
    </>
  );
}
