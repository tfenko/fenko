'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

// Об'єкт з SVG-іконками для брендів (матимуть однаковий розмір та адаптивний колір)
const platformIcons: { [key: string]: React.ReactNode } = {
  Spotify: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.438-5.305-1.764-8.785-.97-.337.077-.67-.138-.746-.473-.077-.337.138-.67.473-.746 3.81-.87 7.077-.496 9.71 1.115.293.18.386.563.205.867zm1.224-2.722c-.226.367-.707.487-1.074.26-2.69-1.654-6.79-2.134-9.967-1.17-.413.125-.845-.107-.97-.522-.125-.413.107-.847.522-.97 3.637-1.103 8.142-.566 11.23 1.333.366.226.486.707.26 1.07zM17.91 11.4c-.272.44-.847.587-1.287.316-3.132-1.91-8.312-2.08-11.332-1.164-.5.152-1.023-.13-1.174-.633-.153-.502.13-1.022.634-1.174 3.595-1.09 9.32-.9 12.843 1.25.442.27.59.845.317 1.286z"/>
    </svg>
  ),
  'Apple Music': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.766 11.13c-.156.402-.375.766-.66 1.094-.48.55-.99.932-1.53 1.143-.45.176-.967.264-1.554.264-.56 0-1.066-.08-1.517-.24-.452-.16-.867-.423-1.246-.788a4.912 4.912 0 01-.986-1.443c-.244-.573-.367-1.218-.367-1.936 0-.712.128-1.354.383-1.928a4.852 4.852 0 011.026-1.442c.38-.363.805-.626 1.27-.788.468-.163.974-.244 1.518-.244.59 0 1.107.087 1.552.26.544.212 1.047.59 1.51 1.135a5.57 5.57 0 01.7 1.046V7.472c0-.528.14-.908.423-1.143.284-.234.693-.35 1.226-.35a3.42 3.42 0 011.09.186V13.13zm-1.854.498a2.532 2.532 0 00.548-.824 3.327 3.327 0 00.22-.84v-1.637a2.63 2.63 0 00-.518-.895c-.328-.393-.728-.59-1.2-.59-.444 0-.822.18-1.132.544-.31.363-.466.865-.466 1.504 0 .616.155 1.11.466 1.482.31.373.693.56 1.147.56.368 0 .68-.068.935-.204z"/>
    </svg>
  ),
  YouTube: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  SoundCloud: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 13.5c-.069 0-.125.056-.125.125v1.75c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-1.75c0-.069-.056-.125-.125-.125zm.75-1.25c-.069 0-.125.056-.125.125v3.25c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-3.25c0-.069-.056-.125-.125-.125zm.75-1c-.069 0-.125.056-.125.125v4.5c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-4.5c0-.069-.056-.125-.125-.125zm.75.25c-.069 0-.125.056-.125.125v4.25c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-4.25c0-.069-.056-.125-.125-.125zm.75-.75c-.069 0-.125.056-.125.125v5c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-5c0-.069-.056-.125-.125-.125zm.75.5c-.069 0-.125.056-.125.125v4.5c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-4.5c0-.069-.056-.125-.125-.125zm.75-.75c-.069 0-.125.056-.125.125v5.25c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-5.25c0-.069-.056-.125-.125-.125zm.75-.25c-.069 0-.125.056-.125.125v5.5c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-5.5c0-.069-.056-.125-.125-.125zm.75.75c-.069 0-.125.056-.125.125v5c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-5c0-.069-.056-.125-.125-.125zm.75-.875c-.069 0-.125.056-.125.125v5.875c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125V10c0-.069-.056-.125-.125-.125zm.75-.125c-.069 0-.125.056-.125.125v6.125c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125V9.875c0-.069-.056-.125-.125-.125zm.75.25c-.069 0-.125.056-.125.125v5.875c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125V10.125c0-.069-.056-.125-.125-.125zm.75-.5c-.069 0-.125.056-.125.125v6.375c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125V9.625c0-.069-.056-.125-.125-.125zm.75 0c-.069 0-.125.056-.125.125v6.375c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125V9.625c0-.069-.056-.125-.125-.125zm.75.25c-.069 0-.125.056-.125.125v6.125c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125V9.875c0-.069-.056-.125-.125-.125zm.75-.75c-.069 0-.125.056-.125.125v7c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-7c0-.069-.056-.125-.125-.125zm.75 1c-.069 0-.125.056-.125.125v6c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-6c0-.069-.056-.125-.125-.125zm.75-.5c-.069 0-.125.056-.125.125v6.5c0 .069.056.125.125.125h.25c.069 0 .125-.056.125-.125v-6.5c0-.069-.056-.125-.125-.125zm.875-.75c-.446 0-.853.161-1.173.426.031.104.048.213.048.324v6.5c0 .073-.008.143-.021.212.316.208.694.329 1.101.329.131 0 .258-.016.383-.042A3.239 3.239 0 0 0 17 12.35c0-1.795-1.455-3.25-3.25-3.25zm5.176 1.832A4.246 4.246 0 0 0 21.25 11.5c0-2.347-1.903-4.25-4.25-4.25-.303 0-.594.037-.877.098.016.084.027.17.027.258v5c0 .052-.005.102-.012.152.197-.1.417-.163.652-.18.118-.046.241-.078.369-.078a3.25 3.25 0 0 1 3.203 2.748 4.225 4.225 0 0 0 3.039-3.916z"/>
    </svg>
  )
};

// Компонент для ефекту цифрового шуму (Text Scramble)
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
      { name: 'Spotify', url: 'https://open.spotify.com/album/4NY1b2mrLPHuZhBKpRoBGu' },
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
      { name: 'Spotify', url: 'https://open.spotify.com/album/1Jc4lauN0rccbUD6JK9RRn' },
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
        
        {/* Верхній маркер */}
        <div className="mb-16 md:mb-24 border-b border-[#141414] pb-6 flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.6em] text-gray-600 uppercase mb-2">Selected Works</p>
            <h2 className={`${cormorant.className} text-2xl md:text-3xl font-light tracking-[0.2em] uppercase text-gray-300`}>Soundscapes</h2>
          </div>
          <span className="text-[9px] font-mono text-gray-600 tracking-widest hidden sm:block">FENKO // ARCHIVE</span>
        </div>

        {/* Список релізів */}
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
              {/* Блок з обкладинкою */}
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

              {/* Блок з інформацією */}
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

                {/* БЛОК КНОПОК: на телефонах збільшений зазор для тапу іконками, на десктопі — класичні посилання */}
                <div className="w-full flex flex-wrap justify-center lg:justify-start gap-x-8 md:gap-x-6 gap-y-4 pt-6 border-t border-[#141414]">
                  {track.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-all duration-300 relative group flex items-center justify-center"
                      title={link.name}
                    >
                      {/* ІКОНКА (видима на мобільних, на десктопі перетворюється на текст завдяки md:hidden) */}
                      <span className="block md:hidden text-gray-400 hover:text-white transform hover:scale-110 transition-transform duration-200">
                        {platformIcons[link.name] || link.name}
                      </span>

                      {/* ТЕКСТ (прихований на мобілках через hidden, виходить на md:block) */}
                      <span className="hidden md:block text-[11px] tracking-[0.25em] uppercase">
                        {link.name}
                      </span>
                      
                      {/* Лінія підкреслення працює ТІЛЬКИ для тексту на великих екранах */}
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
