'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const Note = ({ top, left, right, delay }: { top: string; left?: string; right?: string; delay: number }) => {
  const { scrollYProgress } = useScroll();
  // Анімація руху ноти при скролі
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0]);

  return (
    <motion.div
      style={{ 
        y, 
        opacity,
        top, 
        left, 
        right 
      }}
      className="fixed pointer-events-none text-foreground/40 text-4xl md:text-6xl z-[50]"
    >
      ♪
    </motion.div>
  );
};

export default function FloatingNotes() {
  const notes = [
    { top: '5%', left: '5%' }, { top: '15%', right: '10%' },
    { top: '25%', left: '15%' }, { top: '35%', right: '5%' },
    { top: '45%', left: '10%' }, { top: '55%', right: '15%' },
    { top: '65%', left: '5%' }, { top: '75%', right: '10%' },
    { top: '85%', left: '20%' }, { top: '95%', right: '20%' },
  ];

  return (
    <div className="fixed inset-0 z-[50] overflow-hidden hidden md:block pointer-events-none">
      {notes.map((pos, i) => (
        <Note 
          key={i} 
          top={pos.top} 
          left={pos.left} 
          right={pos.right} 
          delay={i} 
        />
      ))}
    </div>
  );
}
