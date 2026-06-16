'use client';

import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const Note = ({ top, left, right, delay, isScrolling }: { top: string; left?: string; right?: string; delay: number, isScrolling: boolean }) => {
  // Кожна нота тепер сама керує своєю прозорістю
  const opacity = useSpring(isScrolling ? 1 : 0, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ top, left, right, opacity }}
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
      className="fixed text-foreground/80 text-5xl z-[9999] pointer-events-none"
    >
      ♪
    </motion.div>
  );
};

export default function FloatingNotes() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", () => {
    setIsScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsScrolling(false), 300);
  });

  const positions = [
    { top: '10%', left: '5%' }, { top: '20%', right: '10%' },
    { top: '40%', left: '15%' }, { top: '60%', right: '5%' },
    { top: '75%', left: '10%' }, { top: '85%', right: '15%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.5} isScrolling={isScrolling} />
      ))}
    </div>
  );
}
