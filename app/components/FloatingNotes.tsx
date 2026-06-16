'use client';

import { motion } from 'framer-motion';

const Note = ({ className, delay }: { className: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.15, 0.4, 0.15], // Збільшили видимість
      y: [0, -150, 0],           // Трохи вища амплітуда руху
      rotate: [0, 360]
    }}
    transition={{ 
      duration: 15 + Math.random() * 10, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear" 
    }}
    // z-50 піднімає їх над фоном, але під контентом
    className={`fixed pointer-events-none text-foreground/30 text-6xl md:text-8xl z-50 ${className}`}
  >
    ♪
  </motion.div>
);

export default function FloatingNotes() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden hidden md:block">
      <Note className="top-[10%] left-[5%]" delay={0} />
      <Note className="top-[40%] right-[10%]" delay={3} />
      <Note className="bottom-[15%] left-[15%]" delay={6} />
      <Note className="bottom-[30%] right-[5%]" delay={9} />
    </div>
  );
}
