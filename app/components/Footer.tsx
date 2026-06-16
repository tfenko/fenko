'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const socials = [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/6DyQbxEBYocDwvxPvl2gBS?si=jpGzjHaHSsWz7knbsVIPDQ', label: 'Listen on Spotify' },
    { name: 'Apple Music', url: 'https://music.apple.com/ua/artist/fenko/1895075050', label: 'Listen on Apple Music' },
    { name: 'YouTube', url: 'https://music.youtube.com/@Fenkomus', label: 'Watch on YouTube' },
    { name: 'SoundCloud', url: 'https://www.soundcloud.com/fenkomus', label: 'Listen on SoundCloud' },
    { name: 'Instagram', url: 'https://www.instagram.com/fenkomus', label: 'Follow on Instagram' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@fenkomus', label: 'Follow on TikTok' },
  ];

  return (
    <footer className="relative z-10 w-full bg-foreground/5 text-foreground pt-32 pb-12 px-4 md:px-12 border-t border-foreground/10 transition-colors duration-400">
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* Ліва частина */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-foreground mb-4 uppercase">FENKO</h3>
            <p className="text-xs tracking-[0.3em] uppercase text-foreground/60">
              Some people only exist after midnight.
            </p>
          </div>

          {/* Права частина */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {socials.map((link, index) => (
              <a 
                key={index} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label} // Важливо для Lighthouse Accessibility
                className="text-sm tracking-widest text-foreground/60 hover:text-foreground transition-colors duration-300 uppercase font-light"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Нижня лінія */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-foreground/50 font-mono">
          <p>© {new Date().getFullYear()} FENKO. All night reserved.</p>
          {/* Додано role="button" та aria-label для доступності */}
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
