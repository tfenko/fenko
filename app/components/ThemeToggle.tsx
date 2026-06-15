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
    const handleScroll = () => {
      setIsVisible(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button 
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        // Додаємо динамічну зміну pointer-events
        pointerEvents: isVisible ? 'auto' : 'none' 
      }}
      transition={{ duration: 0.4 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="font-mono text-[9px] uppercase tracking-[0.3em] 
                 hover:opacity-50 text-foreground cursor-none"
    >
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </motion.button>
  );
}
