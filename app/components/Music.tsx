'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';
import Image from 'next/image';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

const Visualizer = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="flex items-center gap-[2px] h-3 mr-3">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-[2px] bg-background"
        animate={{ height: isPlaying ? ['20%', '100%', '40%', '80%', '30%'] : '20%' }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.8, 
          delay: i * 0.1,
          ease: "linear" 
        }}
      />
    ))}
  </div>
);

const platformIcons: { [key: string]: string } = {
  'Apple Music': '/apple-music.png',
  'Spotify': '/spotify.png',
  'YouTube': '/youtube-music.png',
  'SoundCloud': '/soundcloud.png',
};

const iconSizes: { [key: string]: string } = {
  'Apple Music': 'w-[18px] h-[22px]',
  'Spotify': 'w-6 h-6',
  'YouTube': 'w-6.5 h-6.5 scale-[1]',
  'SoundCloud': 'w-6 h-6',
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
    id: 3, 
    title: 'Still Get Close', 
    type: 'Single // Out now', 
    description: 'You make me lose my mind. Every single time.', 
    image: '/cover3.webp', 
    canScramble: false, 
    previewUrl: '/Still-Get-Close.mp3', 
    links: [
      { name: 'Spotify', url: 'https://open.spotify.com/album/1p9F7f6gA1KRgNVF8oRum1?si=dzQWd9uFSWGAOH107PVTPA' },
      { name: 'Apple Music', url: 'https://music.apple.com/ua/artist/fenko/1895075050' },
      { name: 'YouTube', url: 'https://music.youtube.com/@Fenkomus' },
      { name: 'SoundCloud', url: 'https://on.soundcloud.com/rfogNc8uJBfpiR0MHT' }
    ] 
  },
  { 
    id: 2, 
    title: 'Half Real', 
    type: 'Single // Out now', 
    description: 'Navigating the duality of a haunting relationship. Love that feels both real and illusory.', 
    image: '/halfreal-2.webp', 
    canScramble: true, 
    previewUrl: '/Half-Real.mp3', 
    links: [
      { name: 'Apple Music', url: 'https://music.apple.com/ua/album/half-real/6769801424?i=6769801425' }, 
      { name: 'Spotify', url: 'https://open.spotify.com/track/6UOYiUahxxA4wWBawrfmzY' }, 
      { name: 'YouTube', url: 'https://music.youtube.com/watch?v=Fs0ZWHbaxBg&si=HG0NwzzWarDTfzLj' }, 
      { name: 'SoundCloud', url: 'https://soundcloud.com/fenkomus/half-real' }
    ] 
  },
  { 
    id: 1, 
    title: 'Deep End', 
    type: 'Single // Out now', 
    description: 'A deep dive into the weight of attachment. Salt on skin, dust in lungs.', 
    image: '/deepend.webp', 
    canScramble: false, 
    previewUrl: '/Deep-End.mp3', 
    links: [
      { name: 'Apple Music', url: 'https://music.apple.com/ua/album/deep-end/1895507327?i=6763819432' }, 
      { name: 'Spotify', url: 'https://open.spotify.com/track/1EG19rhMAOtv57SfzxfG6V' }, 
      { name: 'YouTube', url: 'https://music.youtube.com/playlist?list=OLAK5uy_myDt0WSvtAR2rKNX-p6_k2S4GVc7DAfkQ&si=jnRofbx12M4-0dqS' }, 
      { name: 'SoundCloud', url: 'https://soundcloud.com/fenkomus/deep-end' }
    ] 
  },
];

interface MusicProps {
  onOpenPlayer: (trackKey: 'deepend' | 'halfreal' | 'stillgetclose') => void;
}

export default function Music({ onOpenPlayer }: MusicProps) {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  
  const togglePlay = (id: number) => {
    const trackMap: { [key: number]: 'deepend' | 'halfreal' | 'stillgetclose' } = {
      1: 'deepend',
      2: 'halfreal',
      3: 'stillgetclose'
    };
    
    onOpenPlayer(trackMap[id]);
    setPlayingId(id);
  };

  return (
    <section id="music" className="relative z-10 w-full min-h-screen bg-background text-foreground py-24 md:py-40 px-6 md:px-16 flex flex-col justify-center border-t border-foreground/10 transition-colors duration-600">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        <div className="mb-20 border-b border-foreground/10 pb-6 flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.5em] text-foreground/40 uppercase mb-2">// Archives</p>
            <h2 className={`${cormorant.className} text-4xl md:text-5xl font-light tracking-tight text-foreground`}>Discography</h2>
          </div>
          <span className="text-[9px] font-mono text-foreground/30 tracking-widest hidden sm:block">FENKO // ARCHIVE</span>
        </div>

        <div className="flex flex-col gap-32 md:gap-40">
          {releases.map((track, index) => (
            <div 
              key={track.id} 
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`} 
              onMouseEnter={() => setHoveredTrackId(track.id)} 
              onMouseLeave={() => setHoveredTrackId(null)}
            >
              
              <div className="relative w-full lg:w-1/2 aspect-square overflow-hidden bg-foreground/5 group">
                <Image 
                  src={track.image} 
                  alt={`${track.title} cover art`} 
                  fill
                  className="object-cover grayscale contrast-125 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90" 
                />
                <div className="absolute inset-0 bg-foreground/10 opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
              </div>

              <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/40 mb-4 block">{track.type}</span>
                <h3 className={`${cormorant.className} text-3xl md:text-4xl font-light mb-6 text-foreground`}>
                  <ScrambleText text={track.title} isHovered={hoveredTrackId === track.id} enabled={track.canScramble} />
                </h3>
                
                <p className="text-foreground/60 text-sm leading-relaxed mb-8 max-w-sm">
                  {track.description}
                </p>

                <div className="w-full flex flex-col items-center lg:items-start gap-6">
                  <button 
                    onClick={() => togglePlay(track.id)}
                    className="bg-foreground text-background px-8 py-3 text-[10px] tracking-[0.2em] uppercase flex items-center hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  >
                    {playingId === track.id && <Visualizer isPlaying={true} />}
                    [ Listen now ]
                  </button>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-4 pt-6 border-t border-foreground/10 items-center w-full lg:w-auto">
                    {track.links.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-foreground/50 hover:text-foreground transition-colors duration-300 relative group flex items-center justify-center w-12 h-12 md:w-auto md:h-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                      >
                        <span className="flex md:hidden items-center justify-center w-8 h-8">
                          <Image src={platformIcons[link.name]} alt="" width={24} height={24} className={`${iconSizes[link.name]} object-contain opacity-70`} />
                        </span>
                        <span className="hidden md:block text-[11px] tracking-[0.25em] uppercase">{link.name}</span>
                        <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full hidden md:block" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}