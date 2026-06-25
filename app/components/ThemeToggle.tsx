'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsVisible(window.scrollY < 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!mounted) return null;

  // ✅ ДОДАНА ФІЧА 2: Dark Mode Toggle з кінематографічною анімацією
  const handleToggle = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Затримуємо фактичну зміну теми, поки екран не заллється кольором
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }, 400);

    // Знімаємо блокування анімації після її завершення
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 bg-foreground z-[10000] rounded-full origin-bottom-left"
            style={{ pointerEvents: 'none', left: '24px', bottom: '24px', width: '100px', height: '100px' }}
          />
        )}
      </AnimatePresence>

      <motion.button 
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleToggle} 
        className="font-mono text-[9px] uppercase tracking-[0.3em] hover:opacity-50 text-foreground cursor-none pointer-events-auto relative z-[10001]"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
      </motion.button>
    </>
  );
}