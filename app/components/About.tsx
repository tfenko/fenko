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
    <section className="relative w-full min-h-[80vh] flex items-center justify-center px-6 md:px-12 py-32 overflow-hidden transition-colors duration-600">
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[9px] font-mono tracking-[0.6em] uppercase mb-16 text-foreground/30"
        >
          // BACKGROUND
        </motion.p>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${cormorant.className} text-[24px] sm:text-3xl md:text-4xl font-light tracking-[0.02em] leading-[1.4] text-foreground`}
        >
          <span className="block mb-6">FENKO.</span>
          <span className="italic opacity-60 block font-light">
            Soundscapes born in the shadows. <br />
            Written for the restless and the night-dwellers.
          </span>
          
          <span className="font-sans text-[9px] block mt-16 tracking-[0.4em] font-light uppercase text-foreground/40">
            Based in Lviv // Independent.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}