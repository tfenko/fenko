'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

const platformIcons: { [key: string]: string } = {
  'Apple Music': '/apple-music.png',
  Spotify: '/spotify.png',
  YouTube: '/youtube-music.png',
  SoundCloud: '/soundcloud.png',
};

const iconSizes: { [key: string]: string } = {
  'Apple Music': 'w-[18px] h-[22px]',
  Spotify: 'w-6 h-6',
  YouTube: 'w-6.5 h-6.5 scale-[1]',
  SoundCloud: 'w-6 h-6',
};

function ScrambleText({ text, isHovered, enabled }: { text: string; isHovered: boolean; enabled: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'XØR█▓░🤖01_//';

  useEffect(() => {
    if (!enabled || !isHovered) {
      setDisplayText(text);
      return;
    }
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered, text, enabled]);

  return <>{displayText}</>;
}

const releases = [
  {
    id: 1,
    title: 'Deep End',
    type: 'Single // Release',
    description:
      'The lyrics convey a sense of longing and emotional struggle in a relationship marked by distance and uncertainty. The imagery of water and sinking suggests a deep dive into love, while metaphors like "heavy chain" illustrate the weight of attachment. It is a haunting exploration of unresolved emotions and the sacrificial nature of intimacy.',
    meta: {
      bpm: '80',
      key: 'A# minor',
      mood: 'MELANCHOLIC // YEARNING',
    },
    image: '/deepend.png',
    canScramble: false,
    links: [
      {
        name: 'Apple Music',
        url: 'https://music.apple.com/ua/album/deep-end/1895507327?i=6763819432',
      },
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/track/1EG19rhMAOtv57SfzxfG6V',
      },
      {
        name: 'YouTube',
        url: 'https://music.youtube.com/playlist?list=OLAK5uy_myDt0WSvtAR2rKNX-p6_k2S4GVc7DAfkQ&si=GA2iGhEq4exWtb-8',
      },
      {
        name: 'SoundCloud',
        url: 'https://soundcloud.com/fenkomus/deep-end',
      },
    ],
  },
  {
    id: 2,
    title: 'Half Real',
    type: 'Single // Release',
    description:
      'The lyrics explore a haunting relationship characterized by fleeting encounters and emotional turmoil. Navigating the complexities of love that feels both real and illusory, the narrator grapples with the duality of presence. Themes of numbness and desire intertwine, suggesting a connection that exists primarily within the shadows of the night.',
    meta: {
      bpm: '129',
      key: 'D minor',
      mood: 'INTROSPECTIVE // MYSTERIOUS',
    },
    image: '/halfreal.png',
    canScramble: true,
    links: [
      {
        name: 'Apple Music',
        url: 'https://music.apple.com/ua/album/half-real/6769801424?i=6769801425',
      },
      {
        name: 'Spotify',
        url: 'https://open.spotify.com/track/6UOYiUahxxA4wWBawrfmzY',
      },
      {
        name: 'YouTube',
        url: 'https://music.youtube.com/watch?v=Fs0ZWHbaxBg&si=HG0NwzzWarDTfzLj',
      },
      {
        name: 'SoundCloud',
        url: 'https://soundcloud.com/fenkomus/half-real',
      },
    ],
  },
];

export default function Music() {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);

  return (
    <section className="relative z-10 w-full min-h-screen bg-background text-foreground py-24 md:py-40 px-4 md:px-16 flex flex-col justify-center border-t border-foreground/10 transition-colors duration-600">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        <div className="mb-16 md:mb-24 border-b border-foreground/10 pb-6 flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.6em] text-foreground/50 uppercase mb-2">Selected Works</p>
            <h2 className={`${cormorant.className} text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-foreground/80`}>Soundscapes</h2>
          </div>
          <span className="text-[9px] font-mono text-foreground/30 tracking-widest hidden sm:block">FENKO // ARCHIVE</span>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {releases.map((track, index) => (
            <div key={track.id} className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`} onMouseEnter={() => setHoveredTrackId(track.id)} onMouseLeave={() => setHoveredTrackId(null)}>
              
              <motion.div className="relative w-full lg:w-3/5 aspect-[16/10] overflow-hidden bg-foreground/5 group">
                <img src={track.image} alt={track.title} className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-foreground/10 opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
              </motion.div>

              <motion.div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[9px] font-mono tracking-[0.4em] text-foreground/50 uppercase mb-2 block">{track.type}</span>
                <h3 className={`${cormorant.className} text-2xl md:text-5xl font-light tracking-[0.1em] uppercase mb-4 text-foreground`}>
                  <ScrambleText text={track.title} isHovered={hoveredTrackId === track.id} enabled={track.canScramble} />
                </h3>
                
                <p className="font-sans text-foreground/70 font-light text-xs md:text-sm leading-relaxed mb-6 max-w-sm md:max-w-md mx-auto lg:mx-0">
                  {track.description}
                </p>

                <div className="flex gap-4 font-mono text-[8px] tracking-[0.2em] opacity-50 uppercase mb-8">
                  <span>BPM: {track.meta.bpm}</span>
                  <span>//</span>
                  <span>KEY: {track.meta.key}</span>
                  <span>//</span>
                  <span>MOOD: {track.meta.mood}</span>
                </div>

                <div className="w-full flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-4 pt-6 border-t border-foreground/10 items-center">
                  {track.links.map((link) => (
                    <a key={link.name} href={link.url} className="text-foreground/50 hover:text-foreground transition-colors duration-300 relative group flex items-center justify-center w-12 h-12 md:w-auto md:h-auto">
                      <span className="flex md:hidden items-center justify-center w-8 h-8">
                        <img src={platformIcons[link.name]} alt={link.name} className={`${iconSizes[link.name]} object-contain opacity-70`} />
                      </span>
                      <span className="hidden md:block text-[11px] tracking-[0.25em] uppercase">{link.name}</span>
                      <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full hidden md:block" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
