'use client';

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { useState } from 'react';

const Note = ({ top, left, right, delay }: { top: string; left?: string; right?: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        y: [0, -40, 0],
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
      className="fixed pointer-events-none text-foreground/20 text-4xl md:text-6xl z-[1]"
    >
      ♪
    </motion.div>
  );
};

export default function FloatingNotes() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Ноти з'являються тільки під час скролу
  useMotionValueEvent(scrollY, "change", () => {
    setIsScrolling(true);
    // Таймер зникнення через 200мс після зупинки скролу
    const timer = setTimeout(() => setIsScrolling(false), 200);
    return () => clearTimeout(timer);
  });

  const opacity = useSpring(isScrolling ? 1 : 0, { stiffness: 40, damping: 15 });

  const positions = [
    { top: '12%', left: '8%' }, { top: '18%', right: '12%' },
    { top: '35%', left: '18%' }, { top: '42%', right: '7%' },
    { top: '58%', left: '12%' }, { top: '68%', right: '18%' },
    { top: '82%', left: '22%' }, { top: '25%', right: '28%' }
  ];

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block">
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.4} />
      ))}
    </motion.div>
  );
}
