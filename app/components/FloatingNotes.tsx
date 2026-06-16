'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Note = ({ top, left, right, delay }: { top: string; left?: string; right?: string; delay: number }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -60, 0],
        rotate: [0, 20, -20, 0],
        x: [0, 20, -20, 0]
      }}
      transition={{ 
        duration: 10 + Math.random() * 5, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      style={{ top, left, right }}
      className="fixed pointer-events-none text-foreground/40 text-6xl z-[500] hidden md:block"
    >
      ♪
    </motion.div>
  );
};

export default function FloatingNotes() {
  const { scrollY } = useScroll();
  const opacity = useSpring(useTransform(scrollY, [0, 100], [0, 1]), { stiffness: 50 });

  const positions = [
    { top: '10%', left: '5%' }, { top: '20%', right: '10%' },
    { top: '40%', left: '15%' }, { top: '50%', right: '5%' },
    { top: '65%', left: '10%' }, { top: '75%', right: '15%' },
    { top: '85%', left: '25%' }, { top: '30%', right: '25%' }
  ];

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 pointer-events-none z-[500]">
      {positions.map((p, i) => (
        <Note key={i} {...p} delay={i * 0.7} />
      ))}
    </motion.div>
  );
}
