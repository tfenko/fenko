'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Слухаємо скрол для приховування
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button 
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="fixed bottom-8 left-8 z-[900] font-mono text-[9px] uppercase tracking-[0.3em] 
                 hover:opacity-50 text-foreground cursor-none pointer-events-auto"
    >
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </motion.button>
  );
}
