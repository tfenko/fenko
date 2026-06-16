'use client';

import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { useState, useRef } from 'react';

const Note = ({ top, left, right, delay }: { top: string; left?: string; right?: string; delay: number }) => (
  <motion.div
    animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0], x: [0, 10, -10, 0] }}
    transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay, ease: "easeInOut" }}
    style={{ top, left, right }}
    className="absolute text-foreground/60 text-4xl md:text-6xl"
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
    // Якщо скрол зупинився на 300мс — ховаємо ноти
    timeoutRef.current = setTimeout(() => setIsScrolling(false), 300);
  });

  const opacity = useSpring(isScrolling ? 1 : 0, { stiffness: 100, damping: 20 });

  return (
    // Фіксований шар на весь екран, поверх усього контенту
    <motion.div 
      style={{ opacity }} 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block"
    >
      {[
        { top: '10%', left: '5%' }, { top: '20%', right: '10%' },
        { top: '40%', left: '15%' }, { top: '60%', right: '5%' },
        { top: '75%', left: '10%' }, { top: '85%', right: '15%' }
      ].map((p, i) => (
        <Note key={i} {...p} delay={i * 0.5} />
      ))}
    </motion.div>
  );
}
