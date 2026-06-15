'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

// Шляхи до твоїх круглих іконок у папці public
const platformIcons: { [key: string]: string } = {
  'Apple Music': '/apple-music.png',
  Spotify: '/spotify.png',
  YouTube: '/youtube-music.png',
  SoundCloud: '/soundcloud.png',
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
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text, enabled]);

  return <>{displayText}</>;
}

// Релізи зі зміненим порядком стрімінгів (Apple Music тепер перша)
const releases = [
  {
    id: 1,
    title: 'Deep End',
    type: 'Single // Release',
    description: 'Dark, atmospheric, deep emotional mood with minimal electronic production. The sound of empty streets at 2 AM, dragging you into an endless ocean of nocturnal reflections where the water meets the shadows of the city.',
    image: '/deepend.png',
    canScramble: false,
    links: [
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/deep-end-single/1895507327' },
      { name: 'Spotify', url: 'https://open.spotify.com/track/4f97uWd7vK9L8Z6b8Xz1Y2' },
      { name: 'YouTube', url: 'https://music.youtube.com/watch?v=QVCaTgY_r7w&list=RDAMVMQVCaTgY_r7w' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/fenkomus/deep-end?si=15a04180a465443aa31b13d5ba692493&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' }
    ]
  },
  {
    id: 2,
    title: 'Half Real',
    type: 'Single // Release',
    description: 'More cinematic, night-time energy, urban atmosphere. Emotional but confident music for midnight drives, capturing the glitchy distortion of city lights blurred by rain and the high-speed rush of losing yourself in the neon dark.',
    image: '/halfreal.png',
    canScramble: true,
    links: [
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/half-real-single/6769801424' },
      { name: 'Spotify', url: 'https://open.spotify.com/track/3b8Z6vK9L8Z6b8Xz1Y2uF3' },
      { name: 'YouTube', url: 'https://music.youtube.com/watch?v=Fs0ZWHbaxBg&list=OLAK5uy_myPYbcMPqiegpvjCbv0sgJbqMe_rWa8Pw' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/fenkomus/half-real' }
    ]
  }
];

export default function Music() {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);

  return (
    <section className="relative z-10 w-full min-h-screen bg-black text-white py-24 md:py-40 px-4 md:px-16 flex flex-col justify-center border-t border-[#141414]">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        <div className="mb-16 md:mb-24 border-b border-[#141414] pb-6 flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.6em] text-gray-600 uppercase mb-2">Selected Works</p>
            <h2 className={`${cormorant.className} text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-gray-300`}>Soundscapes</h2>
          </div>
          <span className="text-[9px] font-mono text-gray-600 tracking-widest hidden sm:block">FENKO // ARCHIVE</span>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {releases.map((track, index) => (
            <div 
              key={track.id} 
              className={`flex flex-col lg:flex-row gap-8 lg:gap-20 items-center ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
              onMouseEnter={() => setHoveredTrackId(track.id)}
              onMouseLeave={() => setHoveredTrackId(null)}
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2 }}
                className="relative w-full lg:w-3/5 aspect-[16/10] overflow-hidden bg-[#0A0A0A] group"
              >
                <img 
                  src={track.image} 
                  alt={track.title} 
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <span className="text-[9px] font-mono tracking-[0.4em] text-gray-600 uppercase mb-2 block">
                  {track.type}
                </span>
                
                <h3 className={`${cormorant.className} text-2xl md:text-5xl font-light tracking-[0.1em] uppercase mb-4 text-white min-h-0 md:min-h-[60px] flex items-center justify-center lg:justify-start`}>
                  <ScrambleText 
                    text={track.title} 
                    isHovered={hoveredTrackId === track.id} 
                    enabled={track.canScramble} 
                  />
                </h3>
                
                <p className="font-sans text-gray-400 font-light text-xs md:text-sm leading-relaxed mb-8 max-w-sm md:max-w-md mx-auto lg:mx-0">
                  {track.description}
                </p>

                {/* БЛОК КНОПОК */}
                <div className="w-full flex flex-wrap justify-center lg:justify-start gap-x-4 md:gap-x-6 gap-y-4 pt-6 border-t border-[#141414] items-center">
                  {track.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-all duration-300 relative group flex items-center justify-center w-12 h-12 md:w-auto md:h-auto"
                      title={link.name}
                    >
                      {/* ІКОНКА (Для мобільних) */}
                      <span className="flex md:hidden items-center justify-center w-8 h-8 flex-shrink-0">
                        {platformIcons[link.name] ? (
                          <img 
                            src={platformIcons[link.name]} 
                            alt={link.name}
                            // Оптимальний фільтр для круглих іконок: знебарвлення + делікатна яскравість
                            className="w-6 h-6 object-contain grayscale contrast-200 opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 rounded-full" 
                          />
                        ) : (
                          link.name
                        )}
                      </span>

                      {/* ТЕКСТ (Для десктопів) */}
                      <span className="hidden md:block text-[11px] tracking-[0.25em] uppercase">
                        {link.name}
                      </span>
                      
                      <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full hidden md:block" />
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
