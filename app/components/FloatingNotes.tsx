'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

const Note = ({ top, left, right }: { top: string; left?: string; right?: string }) => (
  <motion.div
    animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0], x: [0, 10, -10, 0] }}
    transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
    style={{ top, left, right }}
    className="fixed pointer-events-none text-foreground/20 text-4xl md:text-6xl z-[1]"
  >
    ♪
  </motion.div>
);

export default function FloatingNotes() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Анімація прозорості через трансформацію скролу
  const scrollRange = useTransform(scrollY, [0, 50, 200], [0, 1, 0]);
  const opacity = useSpring(scrollRange, { stiffness: 100, damping: 30 });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Не рендеримо до клієнта

  const positions = [
    { top: '12%', left: '8%' }, { top: '18%', right: '12%' },
    { top: '35%', left: '18%' }, { top: '42%', right: '7%' },
    { top: '58%', left: '12%' }, { top: '68%', right: '18%' },
    { top: '82%', left: '22%' }, { top: '25%', right: '28%' }
  ];

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden md:block">
      {positions.map((p, i) => (
        <Note key={i} {...p} />
      ))}
    </motion.div>
  );
}
