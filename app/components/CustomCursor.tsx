'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Використовуємо окремі значення для ядра та кільця
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Пружинні налаштування для "преміальної" плавності
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Для кільця робимо трохи повільнішу інерцію
  const ringSpringConfig = { damping: 30, stiffness: 100, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8); // -8 для центрування ядра
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Ядро (рухається швидко) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      
      {/* Кільце (рухається з ефектом затримки) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-foreground/50 rounded-full z-[9998] pointer-events-none mix-blend-difference"
        style={{ x: ringXSpring, y: ringYSpring }} 
      />
    </>
  );
}
