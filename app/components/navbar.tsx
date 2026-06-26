'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Чекаємо монтування клієнта, щоб уникнути помилок гідрації кольорів
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'listen', id: 'music' },
    { name: 'info', id: 'about' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-[9999] px-4 md:px-8 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ backgroundColor: 'var(--background)' }}
        className="max-w-4xl mx-auto border border-foreground/10 flex flex-col justify-between pointer-events-auto overflow-hidden relative rounded-full shadow-2xl opacity-95"
      >
        
        <div className="flex justify-between items-center px-6 py-3 w-full">
          
          {/* Логотип */}
          <div className="flex items-center gap-2">
            <span className="font-cormorant text-sm font-light tracking-[0.3em] uppercase text-foreground select-none">
              F //
            </span>
            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse opacity-40 hidden sm:block" />
          </div>

          {/* Права частина: Меню + Перемикач теми */}
          <div className="flex items-center gap-6 md:gap-8">
            
            {/* Елементи навігації */}
            <div className="flex gap-6 font-mono text-[9px] tracking-[0.3em] uppercase">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/50 hover:text-foreground transition-all duration-300 relative py-1 group flex flex-col items-center cursor-pointer"
                >
                  <span>[{item.name}]</span>
                  <span className="w-1 h-1 bg-foreground rounded-full absolute -bottom-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Вертикальний мікро-розділювач між меню і кнопкою теми */}
            <div className="w-[1px] h-3 bg-foreground/10 hidden sm:block" />

            {/* МІНІМАЛІСТИЧНИЙ ЧБ ПЕРЕМИКАЧ ТЕМИ */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center p-1.5 rounded-full border border-foreground/10 hover:border-foreground/30 bg-foreground/[0.03] hover:bg-foreground/[0.08] transition-all cursor-pointer pointer-events-auto group text-foreground"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  // Іконка сонця для темної теми (щоб перемкнути на світлу)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.59 1.59m12.38 12.38l1.59 1.59M3 12h2.25m13.5 0H21M4.22 19.78l1.59-1.59m12.38-12.38l1.59-1.59M12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                  </svg>
                ) : (
                  // Іконка місяця для світлої теми (щоб перемкнути на темну)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12.83A9.54 9.54 0 0112 21.75c-5.28 0-9.5-4.22-9.5-9.5a9.54 9.54 0 0112.58-9.04 8.25 8.25 0 008.67 8.67z" />
                  </svg>
                )}
              </button>
            )}

          </div>
        </div>

        {/* Прогрес-бар скролу */}
        <div className="w-full h-[1px] bg-foreground/10 relative">
          <motion.div 
            className="absolute top-0 bottom-0 left-0 right-0 bg-foreground/40 origin-left"
            style={{ scaleX }}
          />
        </div>

      </motion.nav>
    </div>
  );
}