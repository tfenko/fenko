'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }} // Центруємо
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
    >
      {/* Основна крапка курсора */}
      <div className="w-6 h-6 rounded-full bg-foreground mix-blend-difference" />
      
      {/* Зовнішнє кільце для ефекту */}
      <div className="absolute w-12 h-12 border border-foreground/30 rounded-full mix-blend-difference" />
    </motion.div>
  );
}
