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
  { id: 3, title: 'Release Soon...', type: 'Upcoming // July 3', description: 'The new sound is coming. Stay tuned.', meta: { bpm: '---', key: '---', mood: 'PRE-SAVE // SOON' }, image: '/cover3.webp', canScramble: false, previewUrl: '/tiser3.mp3', links: [{ name: 'Spotify', url: '#' }] },
  { id: 2, title: 'Half Real', type: 'Single // Release', description: 'The lyrics explore a haunting relationship...', meta: { bpm: '129', key: 'D minor', mood: 'INTROSPECTIVE' }, image: '/halfreal.webp', canScramble: true, previewUrl: '/tiser2.mp3', links: [{ name: 'Spotify', url: '#' }] },
  { id: 1, title: 'Deep End', type: 'Single // Release', description: 'The lyrics convey a sense of longing...', meta: { bpm: '80', key: 'A# minor', mood: 'MELANCHOLIC' }, image: '/deepend.webp', canScramble: false, previewUrl: '/tiser1.mp3', links: [{ name: 'Spotify', url: '#' }] },
];

export default function Music() {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = (id: number, url: string) => {
    if (playingId === id) {
      audio?.pause();
      setPlayingId(null);
    } else {
      audio?.pause();
      const newAudio = new Audio(url);
      newAudio.play();
      setAudio(newAudio);
      setPlayingId(id);
      newAudio.onended = () => setPlayingId(null);
    }
  };

  return (
    <section id="music" className="relative z-10 w-full min-h-screen bg-background text-foreground py-24 px-4 md:px-16 border-t border-foreground/10">
      <div className="max-w-6xl mx-auto w-full">
        {/* ... (Твій заголовок залишається тут) ... */}
        <div className="flex flex-col gap-24 md:gap-40">
          {releases.map((track) => (
            <div key={track.id} className="flex flex-col lg:flex-row gap-8 items-center" onMouseEnter={() => setHoveredTrackId(track.id)} onMouseLeave={() => setHoveredTrackId(null)}>
              
              <motion.div className="relative w-full lg:w-3/5 aspect-[16/10] overflow-hidden bg-foreground/5">
                <img src={track.image} className="w-full h-full object-cover grayscale" />
              </motion.div>

              <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start">
                <h3 className="text-2xl uppercase mb-4">{track.title}</h3>
                
                {/* Кнопка тизера */}
                <button 
                  onClick={() => togglePlay(track.id, track.previewUrl)}
                  className="mb-6 font-mono text-[9px] uppercase tracking-[0.2em] border border-foreground/30 px-6 py-2 hover:bg-foreground hover:text-background transition-all"
                >
                  {playingId === track.id ? '[ PAUSE PREVIEW ]' : '[ PLAY PREVIEW ]'}
                </button>

                {/* ... (Посилання на стрімінги) ... */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
