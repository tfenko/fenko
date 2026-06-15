'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

// Ініціалізуємо шрифт прямо в компоненті
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

export default function About() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-32 overflow-hidden">
      
      {/* Фоновий ледве помітний елемент для об'єму */}
      <div className={`${cormorant.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-bold text-white/[0.01] uppercase select-none pointer-events-none`}>
        VIBE
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[9px] font-mono tracking-[0.6em] uppercase mb-16 text-gray-500"
        >
          // MANIFESTO
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={`${cormorant.className} text-3xl md:text-5xl font-light tracking-[0.05em] uppercase leading-[1.7] text-gray-300`}
        >
          FENKO is not just music. <br />
          <span className="text-white italic">It is a world you enter.</span> <br />
          <span className="font-sans text-[10px] md:text-xs block mt-14 tracking-[0.4em] font-light lowercase text-gray-600">
            — a memory, a dream, a late-night drive.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}