'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const Note = ({ className, delay }: { className: string; delay: number }) => {
  const { scrollYProgress } = useScroll();
  // Нота з'являється і рухається тільки при скролі
  const y = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className={`fixed pointer-events-none text-foreground/40 text-4xl md:text-6xl z-0 ${className}`}
    >
      ♪
    </motion.div>
  );
};

export default function FloatingNotes() {
  // Генеруємо 10 нот з випадковими позиціями
  const notes = [
    { top: '5%', left: '5%' }, { top: '15%', right: '10%' },
    { top: '25%', left: '15%' }, { top: '35%', right: '5%' },
    { top: '45%', left: '10%' }, { top: '55%', right: '15%' },
    { top: '65%', left: '5%' }, { top: '75%', right: '10%' },
    { top: '85%', left: '20%' }, { top: '95%', right: '20%' },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden hidden md:block pointer-events-none">
      {notes.map((pos, i) => (
        <Note key={i} className={`${pos.top ? `top-[${pos.top}]` : ''} ${pos.left ? `left-[${pos.left}]` : ''} ${pos.right ? `right-[${pos.right}]` : ''}`} delay={i} />
      ))}
    </div>
  );
}
