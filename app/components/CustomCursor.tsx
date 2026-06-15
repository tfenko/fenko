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

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
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
      {/* Ядро: використовуємо bg-foreground для автоматичної зміни кольору (білий/чорний) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full z-[9999] pointer-events-none"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: isHovered ? 0.5 : 1 }}
      />
      
      {/* Кільце: використовуємо border-foreground для автоматичного підлаштування */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-foreground rounded-full z-[9998] pointer-events-none"
        style={{ x: ringXSpring, y: ringYSpring }} 
        animate={{ 
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.8 : 0.5
        }}
      />
    </>
  );
}
