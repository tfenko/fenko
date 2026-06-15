'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringSpringConfig = { damping: 30, stiffness: 100, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    // Слухаємо наведення на посилання/кнопки
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovered(true);
      }
    };
    const handleMouseOut = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Ядро */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovered ? 0.5 : 1 }}
      />
      
      {/* Кільце */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-foreground/50 rounded-full z-[9998] pointer-events-none mix-blend-difference"
        style={{ x: ringXSpring, y: ringYSpring }} 
        animate={{ 
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(var(--foreground-rgb), 0.5)'
        }}
      />
    </>
  );
}
