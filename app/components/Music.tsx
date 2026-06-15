'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

// Геометрично вирівняні, пропорційні та стабільні іконки
const platformIcons: { [key: string]: React.ReactNode } = {
  Spotify: (
    <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.785-.97-.337.077-.67-.138-.746-.473-.077-.337.138-.67.473-.746 3.81-.87 7.077-.496 9.71 1.115.293.18.386.563.205.867zm1.224-2.722c-.226.367-.707.487-1.074.26-2.69-1.654-6.79-2.134-9.967-1.17-.413.125-.845-.107-.97-.522-.125-.413.107-.847.522-.97 3.637-1.103 8.142-.566 11.23 1.333.366.226.486.707.26 1.07zM17.91 11.4c-.272.44-.847.587-1.287.316-3.132-1.91-8.312-2.08-11.332-1.164-.5.152-1.023-.13-1.174-.633-.153-.502.13-1.022.634-1.174 3.595-1.09 9.32-.9 12.843 1.25.442.27.59.845.317 1.286z"/>
    </svg>
  ),
  'Apple Music': (
    <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.33 13.06c-.28.25-.66.42-1.05.47-.63.08-1.25-.16-1.62-.62-.35-.44-.45-1.02-.27-1.55.15-.46.52-.82.98-.96.47-.14.98-.07 1.39.2.14.09.28.2.39.33v-3.71c0-.44.29-.81.71-.92l2.36-.63c.48-.13.97.23.97.73v1.65c0 .32-.2.61-.51.7l-2.06.56v4.75z"/>
    </svg>
  ),
  YouTube: (
    <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 02.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  SoundCloud: (
    <svg className="w-5 h-5 block" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.111 13.914a3.111 3.111 0 0 0-3.08-2.736c-.161 0-.322.013-.48.038A4.667 4.667 0 0 0 11 13c0 .08.006.157.013.235-.4-.28-.888-.453-1.424-.453-.133 0-.263.012-.392.031a2.8 2.8 0 0 0-3.072-1.926 3.111 3.111 0 0 0-2.936 2.33 1.556 1.556 0 0 0-.564-.105A1.556 1.556 0 0 0 1.05 14.67v3.888c0 .86.7 1.556 1.556 1.556H21.56a2.333 2.333 0 0 0 2.333-2.333c0-1.25-.98-2.285-2.222-2.324a3.12 3.12 0 0 0-.56-.543z"/>
    </svg>
  )
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

const releases = [
  {
    id: 1,
    title: 'Deep End',
    type: 'Single // Release',
    description: 'Dark, atmospheric, deep emotional mood with minimal electronic production. The sound of empty streets at 2 AM, dragging you into an endless ocean of nocturnal reflections where the water meets the shadows of the city.',
    image: '/deepend.png',
    canScramble: false,
    links: [
      { name: 'Spotify', url: 'https://open.spotify.com/track/4O26Nf20G2C1FwYnIDM7Iu' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/deep-end-single/1895507327' },
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
      { name: 'Spotify', url: 'https://open.spotify.com/track/5uXFfO3P8H12fG98XcY12d' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/album/half-real-single/6769801424' },
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
                <div className="w-full flex flex-wrap justify-center lg:justify-start gap-x-2 md:gap-x-6 gap-y-4 pt-6 border-t border-[#141414]">
                  {track.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-all duration-300 relative group flex items-center justify-center w-12 h-12 md:w-auto md:h-auto"
                      title={link.name}
                    >
                      {/* ІКОНКА (Тільки для мобільних) */}
                      <span className="flex md:hidden text-gray-400 hover:text-white items-center justify-center w-6 h-6 flex-shrink-0">
                        {platformIcons[link.name] || link.name}
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
