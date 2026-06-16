'use client';

import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
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
    className="fixed pointer-events-none text-foreground/20 text-4xl md:text-6xl z-[1]"
  >
    ♪
  </motion.div>
);

export default function FloatingNotes() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useMotionValueEvent(scrollY, "change", () => {
    setIsScrolling(true);
    
    // Скидаємо таймер при кожному русі
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Якщо скрол зупинився на 200мс — ховаємо ноти
    timeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  });

  // Використовуємо spring для плавного зникнення
  const opacity = useSpring(isScrolling ? 0.3 : 0, { 
    stiffness: 100, 
    damping: 30 
  });

  const positions = [
    { top: '10%', left: '5%' }, { top: '15%', right: '10%' },
    { top: '30%', left: '15%' }, { top: '45%', right: '5%' },
    { top: '55%', left: '10%' }, { top: '70%', right: '15%' },
    { top: '80%', left: '20%' }, { top: '20%', right: '20%' }
  ];

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block">
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.4} />
      ))}
    </motion.div>
  );
}
