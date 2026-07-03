'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const TOTAL_STREAMS = 14153;
  const CURRENT_DATE = "July 3, 2026";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, TOTAL_STREAMS, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, TOTAL_STREAMS]);

  const socials = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/6DyQbxEBYocDwvxPvl2gBS' },
    { name: 'Apple Music', url: 'https://music.apple.com/ua/artist/fenko/1895075050' },
    { name: 'YouTube', url: 'https://music.youtube.com/@Fenkomus' },
    { name: 'SoundCloud', url: 'https://www.soundcloud.com/fenkomus' },
    { name: 'Instagram', url: 'https://www.instagram.com/fenkomus' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@fenkomus' },
  ];

  return (
    <footer ref={ref} className="relative z-10 w-full bg-background text-foreground pt-32 pb-12 px-6 md:px-16 border-t border-foreground/10 transition-colors duration-600">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Головний блок */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pb-20">
          
          {/* Бренд — ЗАМІНЕНО ТЕКСТ ТУТ */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold tracking-[0.25em] uppercase mb-3">FENKO</h3>
            <p className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 block font-mono">
              [ Independent Artist ]
            </p>
          </div>

          {/* Central Focus */}
          <div className="md:col-span-4 flex flex-col items-center text-center py-2 md:py-0">
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 block mb-4 font-medium">
              Total Streams
            </span>
            <motion.span className="font-cormorant text-5xl md:text-6xl font-light block tracking-tight mb-3 text-foreground">
              {rounded}
            </motion.span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 block font-sans">
              Verified statistics
            </span>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-x-8 gap-y-3 justify-items-center md:justify-items-end text-center md:text-right font-mono">
            {socials.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

        </div>

        {/* Нижня лінія — ЗАМІНЕНО ТЕКСТ ТУТ */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] tracking-[0.25em] uppercase text-foreground/30 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} FENKO.SPACE</span>
            <span className="hidden sm:inline">//</span>
            <a 
              href="mailto:fenkomus@gmail.com" 
              className="text-foreground/50 hover:text-foreground transition-colors underline underline-offset-4 decoration-foreground/10 hover:decoration-foreground/30"
            >
              fenkomus@gmail.com
            </a>
          </div>
          <p className="text-center sm:text-right text-foreground/20">[ Archive Node ]</p>
        </div>

      </div>
    </footer>
  );
}