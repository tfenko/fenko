'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Слідкуємо за прогресом скролу для нашої "аудіо-стрічки"
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'listen', id: 'music' },
    { name: 'info', id: 'about' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-[900] px-4 md:px-8 pointer-events-none">
      {/* Плаваюча інженерна капсула */}
      <motion.nav
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="max-w-4xl mx-auto bg-background/40 dark:bg-background/20 backdrop-blur-md border border-foreground/5 flex flex-col justify-between pointer-events-auto overflow-hidden relative rounded-full shadow-2xl shadow-black/10"
      >
        
        {/* Головний контент навбару */}
        <div className="flex justify-between items-center px-6 py-3.5 w-full">
          {/* Лого з мікшерним індикатором */}
          <div className="flex items-center gap-2 mix-blend-difference">
            <span className="font-cormorant text-sm font-light tracking-[0.3em] uppercase text-foreground">
              F //
            </span>
            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse opacity-40 hidden sm:block" />
          </div>

          {/* Елементи керування (як кнопки на деці) */}
          <div className="flex gap-8 font-mono text-[9px] tracking-[0.3em] uppercase">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/40 hover:text-foreground transition-all duration-300 relative py-1 group flex flex-col items-center focus-visible:outline-2 focus-visible:outline-foreground"
              >
                <span>[{item.name}]</span>
                {/* Діодний індикатор під кнопкою при ховері */}
                <span className="w-1 h-1 bg-foreground rounded-full absolute -bottom-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* СКЕВOМОРФНИЙ ЕЛЕМЕНТ: Індикатор плейбеку / прогрес-бар скролу */}
        <div className="w-full h-[1px] bg-foreground/5 relative">
          <motion.div 
            className="absolute top-0 bottom-0 left-0 right-0 bg-foreground/20 origin-left"
            style={{ scaleX }}
          />
        </div>

      </motion.nav>
    </div>
  );
}