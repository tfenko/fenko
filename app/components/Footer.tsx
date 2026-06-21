'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Footer() {
  // Логіка лічильника
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, 9011, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, count]);

  const socials = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/6DyQbxEBYocDwvxPvl2gBS?si=jpGzjHaHSsWz7knbsVIPDQ', label: 'Listen on Spotify' },
    { name: 'Apple Music', url: 'https://music.apple.com/ua/artist/fenko/1895075050', label: 'Listen on Apple Music' },
    { name: 'YouTube', url: 'https://music.youtube.com/@Fenkomus', label: 'Watch on YouTube' },
    { name: 'SoundCloud', url: 'https://www.soundcloud.com/fenkomus', label: 'Listen on SoundCloud' },
    { name: 'Instagram', url: 'https://www.instagram.com/fenkomus', label: 'Follow on Instagram' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@fenkomus', label: 'Follow on TikTok' },
  ];

  return (
    <footer ref={ref} className="relative z-10 w-full bg-foreground/5 text-foreground pt-32 pb-12 px-4 md:px-12 border-t border-foreground/10 transition-colors duration-400">
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-foreground mb-4 uppercase">FENKO</h3>
            <p className="text-xs tracking-[0.3em] uppercase text-foreground/60">
              Some people only exist after midnight.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {socials.map((link, index) => (
              <a 
                key={index} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-sm tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 uppercase font-light"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Новий шикарний блок статистики */}
        <div className="flex flex-col items-center justify-center py-20 border-y border-foreground/10 my-12 bg-foreground/[0.02]">
          <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/40 mb-6">
            Global reach // Total streams
          </span>
          
          <div className="flex items-baseline gap-3">
            <motion.span className="font-cormorant text-5xl md:text-7xl font-light text-foreground">
              {rounded}
            </motion.span>
            <span className="text-sm font-mono text-foreground/30 uppercase tracking-widest">
              Streams
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-foreground/20">
              AS OF JUNE 20, 2026
            </span>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mt-2" />
          </div>
        </div>

        {/* Нижня лінія */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-foreground/50 font-mono">
          <p>© {new Date().getFullYear()} FENKO. All night reserved.</p>
          <p 
            role="button" 
            aria-label="Design credits: Designed for the shadows"
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            Designed for the shadows.
          </p>
        </div>
      </div>
    </footer>
  );
}
