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
    // z-[9999] — це гарантія того, що вони поверх усього
    className="absolute pointer-events-none text-foreground/60 text-5xl z-[9999]"
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
    }, 600); // Збільшено час, щоб ноти довше жили при зупинці
  });

  // opacity від 0.2 (коли стоїмо) до 0.7 (коли скролимо)
  const opacity = useSpring(isScrolling ? 0.7 : 0.2, { 
    stiffness: 60, 
    damping: 20 
  });

  const positions = [
    { top: '10vh', left: '5%' }, { top: '20vh', right: '10%' },
    { top: '35vh', left: '15%' }, { top: '45vh', right: '5%' },
    { top: '60vh', left: '10%' }, { top: '75vh', right: '15%' },
    { top: '85vh', left: '20%' }, { top: '25vh', right: '20%' }
  ];

  return (
    <motion.div 
      style={{ opacity }} 
      // Використовуємо absolute замість fixed для кращої сумісності з блоками
      className="absolute top-0 left-0 w-full min-h-[200vh] pointer-events-none z-[9999] overflow-visible hidden md:block"
    >
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.4} />
      ))}
    </motion.div>
  );
}
