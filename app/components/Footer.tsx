'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Footer() {
  // --- РЕДАГУЙ ДАНІ ТУТ ---
  const TOTAL_STREAMS = 10469;
  const CURRENT_DATE = "June 23, 2026";
  // -----------------------

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, TOTAL_STREAMS, { duration: 2.5, ease: "easeOut" });
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
    <footer ref={ref} className="relative z-10 w-full bg-background text-foreground py-16 px-6 md:px-16 border-t border-foreground/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Верхній блок: Бренд та посилання */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-[0.2em] uppercase mb-2">FENKO</h3>
            <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/50">Some people only exist after midnight.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2">
            {socials.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-widest text-foreground/50 hover:text-foreground transition-colors uppercase">
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Компактний блок статистики */}
        <div className="border border-foreground/10 p-8 mb-16 text-center">
          <span className="text-[8px] uppercase tracking-[0.4em] text-foreground/30 block mb-2">Global reach // Total streams</span>
          <motion.span className="font-cormorant text-4xl block mb-2">{rounded}</motion.span>
          <span className="text-[10px] uppercase tracking-widest text-foreground/30">Streams // As of {CURRENT_DATE}</span>
        </div>

        {/* Футер лінія */}
        <div className="flex justify-between text-[9px] tracking-[0.3em] uppercase text-foreground/30 font-mono">
          <p>© {new Date().getFullYear()} FENKO</p>
          <p>Designed for the shadows.</p>
        </div>
      </div>
    </footer>
  );
}
