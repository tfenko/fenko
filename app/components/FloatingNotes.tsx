'use client';

import { motion } from 'framer-motion';

const Note = ({ className, delay }: { className: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      y: [0, -100, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      duration: 10 + Math.random() * 10, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut" 
    }}
    className={`fixed pointer-events-none text-foreground/10 text-4xl ${className}`}
  >
    ♪
  </motion.div>
);

export default function FloatingNotes() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden hidden md:block">
      <Note className="top-[10%] left-[5%]" delay={0} />
      <Note className="top-[30%] right-[10%]" delay={2} />
      <Note className="bottom-[20%] left-[15%]" delay={4} />
      <Note className="bottom-[40%] right-[5%]" delay={6} />
    </div>
  );
}
