'use client';

import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';

const Note = ({ top, left, right, delay }: { top: string; left?: string; right?: string; delay: number }) => (
  <motion.div
    animate={{ 
      y: [0, -30, 0],
      rotate: [0, 15, -15, 0],
      x: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 8 + Math.random() * 4, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    style={{ top, left, right }}
    className="fixed pointer-events-none text-foreground/40 text-4xl md:text-6xl z-[1]"
  >
    ♪
  </motion.div>
);

export default function FloatingNotes() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", () => {
    setIsScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 400); // Збільшив час до 400мс, щоб ноти довше залишалися видимими
  });

  // Базова прозорість 0.1, при скролі зростає до 0.4
  const opacity = useSpring(isScrolling ? 0.4 : 0.1, { 
    stiffness: 80, 
    damping: 30 
  });

  const positions = [
    { top: '10%', left: '5%' }, { top: '15%', right: '10%' },
    { top: '30%', left: '15%' }, { top: '45%', right: '5%' },
    { top: '55%', left: '10%' }, { top: '70%', right: '15%' },
    { top: '80%', left: '20%' }, { top: '20%', right: '20%' }
  ];

  return (
    <motion.div 
      style={{ opacity }} 
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block"
    >
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.4} />
      ))}
    </motion.div>
  );
}
