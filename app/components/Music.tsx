'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

// ... (Твої існуючі platformIcons, iconSizes та ScrambleText залиш без змін) ...

const releases = [
  { 
    id: 3, title: 'Release Soon...', type: 'Upcoming // July 3', 
    description: 'The new sound is coming. A journey into the depths of the shadows. Stay tuned for the release.', 
    meta: { bpm: '---', key: '---', mood: 'PRE-SAVE // SOON' }, 
    image: '/cover3.webp', canScramble: false, previewUrl: '/tiser3.mp3', 
    links: [{ name: 'Spotify', url: '#' }] 
  },
  { 
    id: 2, title: 'Half Real', type: 'Single // Release', 
    description: 'The lyrics explore a haunting relationship characterized by fleeting encounters and emotional turmoil.', 
    meta: { bpm: '129', key: 'D minor', mood: 'INTROSPECTIVE' }, 
    image: '/halfreal.webp', canScramble: true, previewUrl: '/tiser2.mp3', 
    links: [{ name: 'Apple Music', url: '#' }, { name: 'Spotify', url: '#' }] 
  },
  // ... додай сюди всі інші треки
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
    <section id="music" className="relative z-10 w-full min-h-screen py-24 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-24 md:gap-40">
          {releases.map((track) => (
            <div key={track.id} className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Картинка */}
              <motion.div className="w-full lg:w-3/5 aspect-[16/10] overflow-hidden bg-foreground/5">
                <img src={track.image} alt={track.title} className="w-full h-full object-cover grayscale" />
              </motion.div>

              {/* Текстова частина */}
              <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
                <span className="text-[9px] font-mono tracking-[0.4em] text-foreground/50 uppercase mb-2">{track.type}</span>
                <h3 className={`${cormorant.className} text-3xl md:text-5xl uppercase mb-4`}>{track.title}</h3>
                
                {/* ОПИС */}
                <p className="text-foreground/70 text-sm mb-6 leading-relaxed">{track.description}</p>
                
                {/* МЕТАДАНІ */}
                <div className="flex gap-4 font-mono text-[8px] tracking-[0.2em] opacity-50 uppercase mb-8">
                  <span>BPM: {track.meta.bpm} // KEY: {track.meta.key} // MOOD: {track.meta.mood}</span>
                </div>

                {/* КНОПКА ПЛЕЄРА */}
                <button 
                  onClick={() => togglePlay(track.id, track.previewUrl)}
                  className="mb-8 font-mono text-[9px] uppercase tracking-[0.3em] border border-foreground/30 px-6 py-2 hover:bg-foreground hover:text-background transition-all"
                >
                  {playingId === track.id ? '[ PAUSE PREVIEW ]' : '[ PLAY PREVIEW ]'}
                </button>

                {/* ПОСИЛАННЯ */}
                <div className="flex gap-6">
                  {track.links.map((link) => (
                    <a key={link.name} href={link.url} className="text-[10px] uppercase tracking-[0.2em] hover:opacity-50">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
