'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Використовуємо скрол вікна для анімації
  const { scrollY } = useScroll();
  
  // Коли скрол від 0 до 100 пікселів, прозорість падає від 1 до 0
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.button 
      style={{ opacity }} // Прив'язуємо прозорість до скролу
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="fixed bottom-8 left-8 z-[900] font-mono text-[9px] uppercase tracking-[0.3em] 
                 transition-opacity duration-300 hover:opacity-50
                 text-foreground cursor-none"
    >
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </motion.button>
  );
}
