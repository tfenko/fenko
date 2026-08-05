'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
});

export default function Rotation() {
  return (
    <section id="rotation" className="relative z-10 w-full bg-background text-foreground py-16 md:py-24 px-6 md:px-16 border-t border-foreground/10 transition-colors duration-600">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Заголовок секції */}
        <div className="mb-10 md:mb-14 border-b border-foreground/10 pb-5 flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.5em] text-foreground/40 uppercase mb-2">// CURATED SOUNDS</p>
            <h2 className={`${cormorant.className} text-3xl md:text-4xl font-light tracking-tight text-foreground`}>In Rotation</h2>
          </div>
          <span className="text-[9px] font-mono text-foreground/30 tracking-widest hidden sm:block">NOCTURNAL VIBES // SPOTIFY</span>
        </div>

        {/* Контентний блок */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Опис та концепт плейлиста */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/40 block mb-3">
              [ Curator : FENKO ]
            </span>
            <h3 className={`${cormorant.className} text-2xl md:text-3xl font-light mb-3 text-foreground`}>
              Noir Vibes
            </h3>
            <p className="text-xs md:text-sm text-foreground/60 leading-relaxed font-light mb-6 max-w-sm mx-auto lg:mx-0">
              A collection of tracks I listen to regularly. Music that inspires my creative process and defines my current sound preferences.
            </p>

            <div className="pt-5 border-t border-foreground/10 flex flex-wrap justify-center lg:justify-start gap-6 font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
              <div>Vibe: <span className="text-foreground/70">Late Night</span></div>
              <div>Genre: <span className="text-foreground/70">Dark R&B / Soul</span></div>
            </div>
          </motion.div>

          {/* Віджет Spotify з виправленою висотою */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 w-full relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-foreground/10 via-foreground/5 to-transparent blur-2xl opacity-40 pointer-events-none rounded-3xl" />

            <div className="relative w-full bg-foreground/[0.02] border border-foreground/10 rounded-2xl p-2 backdrop-blur-md shadow-xl overflow-hidden overscroll-contain">
              <iframe 
                data-testid="embed-iframe" 
                style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} 
                src="https://open.spotify.com/embed/playlist/4cy88PJ0imBgxlQ9a2MkAz?utm_source=generator&theme=0&si=b987cacc1ac84baa" 
                width="100%" 
                height="480" 
                frameBorder="0" 
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
