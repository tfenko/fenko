'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  
  // Використовуємо ref, щоб інтервал завжди бачив актуальний стан завантаження медіа
  const isMediaLoadedRef = useRef(false);

  useEffect(() => {
    // Слухаємо подію від ThreeScene
    const handleMediaReady = () => {
      setIsMediaLoaded(true);
      isMediaLoadedRef.current = true;
    };
    document.addEventListener('heroMediaLoaded', handleMediaReady);

    // Кінематографічний інтервал лічильника
    const counterInterval = setInterval(() => {
      setCount((prev) => {
        // Якщо ми дійшли до 99%, але 3D-сцена ще не готова — тримаємо 99% і чекаємо
        if (prev >= 99 && !isMediaLoadedRef.current) {
          return 99;
        }

        // Якщо все готово і ми на фініші (99% або 100%)
        if (prev >= 100 || (prev >= 99 && isMediaLoadedRef.current)) {
          clearInterval(counterInterval);
          
          // Естетична пауза на 100%, щоб людина встигла прочитати таглайн
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Плавне зникнення штори
          }, 600);
          
          return 100;
        }

        // Робимо приріст відсотків нерівномірним (імітація реального завантаження)
        const randomIncrement = Math.floor(Math.random() * 6) + 2;
        const nextCount = prev + randomIncrement;
        
        // Не даємо лічильнику перескочити на 100 раніше, ніж завантажиться медіа
        return nextCount >= 99 ? 99 : nextCount;
      });
    }, 45);

    return () => {
      clearInterval(counterInterval);
      document.removeEventListener('heroMediaLoaded', handleMediaReady);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-black z-[9999] flex flex-col justify-between p-8 md:p-16 select-none pointer-events-auto"
        >
          {/* Тонка лінія рамки всередині прелоадера */}
          <div className="absolute inset-4 border border-white/5 pointer-events-none" />

          {/* Верхній маркер */}
          <div className="flex justify-between items-baseline z-10">
            <span className="font-sans text-[9px] tracking-[0.4em] text-gray-600 uppercase">
              FENKO // DIGITAL INSTALLATION
            </span>
            <span className="font-mono text-[9px] text-gray-500 tracking-widest">
              2026 // ED.01
            </span>
          </div>

          {/* Центр: Головний таглайн, який плавно мерехтить */}
          <div className="text-center z-10 max-w-xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.2, 0.6, 0.3, 0.5] }}
              transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
              className="font-sans text-xs md:text-sm text-gray-400 font-light tracking-[0.4em] uppercase leading-relaxed"
            >
              “Some people only exist after midnight.”
            </motion.p>
          </div>

          {/* Низ: Великий дизайнерський лічильник відсотків */}
          <div className="flex justify-between items-end z-10">
            <div className="overflow-hidden">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.4, y: 0 }}
                className="font-sans text-[10px] tracking-[0.3em] text-gray-500 uppercase block mb-2"
              >
                Loading System
              </motion.span>
              <h2 className="font-sans text-5xl md:text-7xl font-extralight tracking-tighter text-white/90 font-mono">
                {count < 10 ? `0${count}` : count}%
              </h2>
            </div>
            
            <span className="font-sans text-[8px] tracking-[0.2em] text-gray-600 uppercase max-w-[120px] text-right hidden sm:block leading-relaxed">
              Please turn on your sound for full immersion.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
