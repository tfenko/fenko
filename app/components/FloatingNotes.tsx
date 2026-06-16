'use client';

import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { useState } from 'react';

// Компонент ноти, що отримує стан скролу від батька
const Note = ({ top, left, right, delay, isScrolling }: { top: string; left?: string; right?: string; delay: number; isScrolling: boolean }) => {
  const opacity = useSpring(isScrolling ? 0.3 : 0, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      style={{ top, left, right, opacity }}
      animate={{ 
        y: [0, -30, 0],
        rotate: [0, 45, -45, 0],
        x: [0, 10, -10, 0]
      }}
      transition={{ 
        duration: 5 + Math.random() * 5, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className="fixed pointer-events-none text-foreground/20 text-5xl z-[1]"
    >
      ♪
    </motion.div>
  );
};

export default function FloatingNotes() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);

  // Один слухач на весь компонент замість восьми
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolling(latest > 0);
    const timer = setTimeout(() => setIsScrolling(false), 300);
    return () => clearTimeout(timer);
  });

  const positions = [
    { top: '10%', left: '5%' }, { top: '15%', right: '10%' },
    { top: '35%', left: '15%' }, { top: '45%', right: '5%' },
    { top: '60%', left: '10%' }, { top: '75%', right: '15%' },
    { top: '85%', left: '25%' }, { top: '20%', right: '25%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block">
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.5} isScrolling={isScrolling} />
      ))}
    </div>
  );
}
