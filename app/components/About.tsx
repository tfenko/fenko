'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

export default function About() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-32 overflow-hidden transition-colors duration-600">
      
      {/* Фоновий текст VIBE */}
      <div className={`${cormorant.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-bold text-foreground/[0.03] uppercase select-none pointer-events-none`}>
        VIBE
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[9px] font-mono tracking-[0.6em] uppercase mb-16 text-foreground/50"
        >
          // MANIFESTO
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className={`${cormorant.className} text-[22px] sm:text-3xl md:text-5xl font-light tracking-[0.05em] uppercase leading-[1.6] text-foreground`}
        >
          <span className="block mb-1">FENKO IS NOT JUST MUSIC.</span>
          <span className="italic opacity-80 block">IT IS A WORLD YOU ENTER.</span>
          
          <span className="font-sans text-[9px] md:text-xs block mt-12 tracking-[0.3em] font-light lowercase text-foreground/60">
            — a memory, a dream, a late-night drive.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
