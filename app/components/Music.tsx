'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';
import Image from 'next/image';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
});

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
  },
  { 
    id: 2, 
    title: 'Half Real', 
    type: 'Single // Out now', 
    description: 'Navigating the duality of a haunting relationship. Love that feels both real and illusory.', 
    image: '/halfreal-2.webp', 
    canScramble: true, 
  },
  { 
    id: 1, 
    title: 'Deep End', 
    type: 'Single // Out now', 
    description: 'A deep dive into the weight of attachment. Salt on skin, dust in lungs.', 
    image: '/deepend.webp', 
    canScramble: false, 
  },
];

export default function Music() {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);
  
  const [activePlatforms, setActivePlatforms] = useState<{ [key: number]: 'spotify' | 'apple' | 'soundcloud' | 'youtube' | null }>({
    3: null,
    2: null,
    1: null,
  });

  const handleActivatePlatform = (trackId: number, platform: 'spotify' | 'apple' | 'soundcloud' | 'youtube') => {
    setActivePlatforms(prev => ({ ...prev, [trackId]: platform }));
  };

  return (
    <section id="music" className="relative z-10 w-full bg-background text-foreground py-20 md:py-28 px-6 md:px-16 flex flex-col justify-center border-t border-foreground/10 transition-colors duration-600">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Заголовок секції */}
        <div className="mb-14 border-b border-foreground/10 pb-6 flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4">
          <div>
            <p className="font-sans text-[9px] tracking-[0.5em] text-foreground/40 uppercase mb-2">// Archives</p>
            <h2 className={`${cormorant.className} text-3xl md:text-4xl font-light tracking-tight text-foreground`}>Discography</h2>
          </div>
          <span className="text-[9px] font-mono text-foreground/30 tracking-widest hidden sm:block">FENKO // ARCHIVE</span>
        </div>

        {/* Список треків з компактнішими відступами */}
        <div className="flex flex-col gap-20 md:gap-24">
          {releases.map((track, index) => {
            const currentPlatform = activePlatforms[track.id];

            return (
              <div key={track.id}>
                <div 
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`} 
                  onMouseEnter={() => setHoveredTrackId(track.id)} 
                  onMouseLeave={() => setHoveredTrackId(null)}
                >
                  
                  {/* Зменшена, акуратна обкладинка */}
                  <div className="relative w-full lg:w-[42%] aspect-square max-w-[380px] overflow-hidden bg-foreground/5 border border-foreground/5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] group">
                    <Image 
                      src={track.image} 
                      alt={`${track.title} cover art`} 
                      fill
                      className="object-cover grayscale contrast-125 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-90" 
                    />
                    <div className="absolute inset-0 bg-foreground/10 opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
                  </div>

                  <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/40 mb-3 block">{track.type}</span>
                    <h3 className={`${cormorant.className} text-2xl md:text-3xl font-light mb-4 text-foreground`}>
                      <ScrambleText text={track.title} isHovered={hoveredTrackId === track.id} enabled={track.canScramble} />
                    </h3>
                    
                    <p className="text-foreground/60 text-xs md:text-sm leading-relaxed mb-6 max-w-sm">
                      {track.description}
                    </p>

                    <div className="w-full max-w-sm">
                      
                      {currentPlatform ? (
                        <div className="bg-foreground/[0.02] border border-foreground/10 rounded-2xl p-2 backdrop-blur-md overflow-hidden overscroll-contain mb-3 animate-fadeIn">
                          
                          {/* === HALF REAL (id: 2) === */}
                          {track.id === 2 && currentPlatform === 'spotify' && (
                            <iframe data-testid="embed-iframe" style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} src="https://open.spotify.com/embed/track/6UOYiUahxxA4wWBawrfmzY?utm_source=generator&theme=0&si=df7238f3dad34764" width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                          )}
                          {track.id === 2 && currentPlatform === 'apple' && (
                            <iframe allow="autoplay *; encrypted-media *;" frameBorder="0" height="150" style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '12px', overscrollBehavior: 'contain' }} sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/ua/album/half-real/6769801424?i=6769801425&theme=dark" loading="lazy" />
                          )}
                          {track.id === 2 && currentPlatform === 'soundcloud' && (
                            <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay; encrypted-media" style={{ borderRadius: '12px', overscrollBehavior: 'contain', background: '#111111' }} src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2322358568&color=%23111111&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" loading="lazy" />
                          )}
                          {track.id === 2 && currentPlatform === 'youtube' && (
                            <iframe width="100%" height="152" src="https://www.youtube.com/embed/Fs0ZWHbaxBg?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} loading="lazy" />
                          )}

                          {/* === DEEP END (id: 1) === */}
                          {track.id === 1 && currentPlatform === 'spotify' && (
                            <iframe data-testid="embed-iframe" style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} src="https://open.spotify.com/embed/track/1EG19rhMAOtv57SfzxfG6V?utm_source=generator&theme=0&si=6852b3fa7e0c4e40" width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                          )}
                          {track.id === 1 && currentPlatform === 'apple' && (
                            <iframe allow="autoplay *; encrypted-media *;" frameBorder="0" height="150" style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '12px', overscrollBehavior: 'contain' }} sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/ua/album/deep-end/1895507327?i=6763819432&theme=dark" loading="lazy" />
                          )}
                          {track.id === 1 && currentPlatform === 'soundcloud' && (
                            <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay; encrypted-media" style={{ borderRadius: '12px', overscrollBehavior: 'contain', background: '#111111' }} src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2316745055&color=%23151416&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" loading="lazy" />
                          )}
                          {track.id === 1 && currentPlatform === 'youtube' && (
                            <iframe width="100%" height="152" src="https://www.youtube.com/embed/QVCaTgY_r7w?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} loading="lazy" />
                          )}

                          {/* === STILL GET CLOSE (id: 3) === */}
                          {track.id === 3 && currentPlatform === 'spotify' && (
                            <iframe data-testid="embed-iframe" style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} src="https://open.spotify.com/embed/track/2bHUTKRBxnVq4MNF4ngvC4?utm_source=generator&theme=0&si=681075c6ae1d4c67" width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
                          )}
                          {track.id === 3 && currentPlatform === 'apple' && (
                            <iframe allow="autoplay *; encrypted-media *;" frameBorder="0" height="150" style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent', borderRadius: '12px', overscrollBehavior: 'contain' }} sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/ua/song/still-get-close/6781459464?theme=dark" loading="lazy" />
                          )}
                          {track.id === 3 && currentPlatform === 'soundcloud' && (
                            <iframe width="100%" height="166" scrolling="no" frameBorder="no" allow="autoplay; encrypted-media" style={{ borderRadius: '12px', overscrollBehavior: 'contain', background: '#111111' }} src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2344733477&color=%23151416&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true" loading="lazy" />
                          )}
                          {track.id === 3 && currentPlatform === 'youtube' && (
                            <iframe width="100%" height="152" src="https://www.youtube.com/embed/vqeTIjubkuQ?autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ borderRadius: '12px', overscrollBehavior: 'contain' }} loading="lazy" />
                          )}

                        </div>
                      ) : (
                        <div className="bg-foreground/[0.02] border border-foreground/10 rounded-2xl py-4 px-6 text-center backdrop-blur-md mb-3 flex items-center justify-center">
                          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40">Select platform to listen</p>
                        </div>
                      )}

                      {/* Кнопки перемикання платформ */}
                      <div className="flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-widest">
                        <button 
                          onClick={() => handleActivatePlatform(track.id, 'spotify')}
                          className={`px-3 py-1.5 rounded-md border transition-all ${currentPlatform === 'spotify' ? 'border-foreground bg-foreground text-background' : 'border-foreground/10 text-foreground/50 hover:text-foreground'}`}
                        >
                          Spotify
                        </button>
                        <button 
                          onClick={() => handleActivatePlatform(track.id, 'apple')}
                          className={`px-3 py-1.5 rounded-md border transition-all ${currentPlatform === 'apple' ? 'border-foreground bg-foreground text-background' : 'border-foreground/10 text-foreground/50 hover:text-foreground'}`}
                        >
                          Apple Music
                        </button>
                        <button 
                          onClick={() => handleActivatePlatform(track.id, 'soundcloud')}
                          className={`px-3 py-1.5 rounded-md border transition-all ${currentPlatform === 'soundcloud' ? 'border-foreground bg-foreground text-background' : 'border-foreground/10 text-foreground/50 hover:text-foreground'}`}
                        >
                          SoundCloud
                        </button>
                        <button 
                          onClick={() => handleActivatePlatform(track.id, 'youtube')}
                          className={`px-3 py-1.5 rounded-md border transition-all ${currentPlatform === 'youtube' ? 'border-foreground bg-foreground text-background' : 'border-foreground/10 text-foreground/50 hover:text-foreground'}`}
                        >
                          YouTube
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Елегантний розділювач між треками */}
                {index < releases.length - 1 && (
                  <div className="w-full h-[1px] bg-foreground/10 my-16 md:my-20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}