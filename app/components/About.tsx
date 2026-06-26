'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';
import Image from 'next/image';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center bg-background text-foreground py-24 px-6 md:px-16 border-t border-foreground/10 transition-colors duration-600">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        
        {/* ЛІВА СТОРОНА: Фото артиста */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="col-span-1 md:col-span-5 w-full aspect-[3/4] relative overflow-hidden bg-foreground/5 group"
        >
          <Image
            src="/ava2.webp"
            alt="FENKO Artist Portrait"
            fill
            sizes="(max-w-768px) 100vw, 40vw"
            quality={90}
            className="object-cover grayscale contrast-115 brightness-95 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </motion.div>

        {/* ПРАВА СТОРОНА: Текст Біографії */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[9px] font-mono tracking-[0.5em] uppercase mb-6 text-foreground/40"
          >
            // BIOGRAPHY // CONTEXT
          </motion.p>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`${cormorant.className} text-4xl md:text-5xl font-light tracking-tight mb-8 text-foreground`}
          >
            Taras Fenko
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-xs md:text-sm text-foreground/70 space-y-6 leading-relaxed font-light tracking-wide max-w-xl"
          >
            <p>
              Operating under the moniker <span className="text-foreground font-normal">FENKO</span>, the Lviv-based producer and artist builds dark, immersive soundscapes at the intersection of alternative R&B and cinematic soul trap.
            </p>
            <p className="italic font-light text-foreground/60">
              "Some people only exist after midnight."
            </p>
            <p>
              Driven by a heavy late-night aesthetic, the project rejects artificial conceptuality in favor of raw atmospheric depth. It serves as an exploration of fleeting nighttime encounters, emotional friction, and the quiet spaces found within digital and physical noise.
            </p>
          </motion.div>

          {/* Технічні маркери внизу */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 pt-6 border-t border-foreground/10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9px] tracking-widest text-foreground/40 uppercase"
          >
            <div>Origin: <span className="text-foreground/60">Lviv, UA</span></div>
            <div>Focus: <span className="text-foreground/60">Alternative R&B</span></div>
            <div>Status: <span className="text-foreground/60">Independent</span></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}