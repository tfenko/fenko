'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PlayerOverlay.module.css';

interface PlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  trackKey: 'deepend' | 'halfreal' | 'stillgetclose';
}

const TRACKS_DATA = {
  deepend: {
    title: "Deep End",
    audioSrc: "/Deep-End.mp3",
    coverSrc: "/deepend.webp",
    bgGradient: "radial-gradient(circle at center, #0d1520 0%, #03070c 100%)",
    links: [
      { name: 'Spotify', url: 'https://open.spotify.com/track/1EG19rhMAOtv57SfzxfG6V' },
      { name: 'Apple Music', url: 'https://music.apple.com/ua/album/deep-end/1895073227?i=6763819432' },
      { name: 'YouTube', url: 'https://music.youtube.com/playlist?list=OLAK5uy_myDt0WSvtAR2rKNX-p6_k2S4GVc7DAfkQ&si=GA2iGhEq4exWtb-8' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/fenkomus/deep-end' }
    ],
    lyrics: [
      { time: 21.66, text: "Blue light, crawling up the wall" },
      { time: 25.64, text: "Wait for the tide, wait for the fall" },
      { time: 30.10, text: "Your ghost is dancing in the smoke" },
      { time: 34.70, text: "A heavy chain, a velvet choke" },
      { time: 39.23, text: "You say you're mine, but you're like the sea" },
      { time: 44.08, text: "Always drifting away from me" },
      { time: 50.45, text: "Away from me" },
      { time: 57.12, text: "I'm diving in the deep end for you" },
      { time: 65.92, text: "There's nothing else that I can do" },
      { time: 73.03, text: "I'm losing air, 'm losing time" },
      { time: 77.79, text: "But I'd die to make you mine" },
      { time: 91.17, text: "Salt on my skin, dust in my lungs" },
      { time: 95.46, text: "We're speaking in those silent tongues" },
      { time: 99.74, text: "The water's cold, the moon is high" },
      { time: 104.31, text: "A beautiful way for us to die" },
      { time: 108.65, text: "Don't reach for me, just let me sink" },
      { time: 112.91, text: "I'm closer to you than you think" },
      { time: 119.18, text: "Yeah, closer than you think" },
      { time: 128.87, text: "I'm diving in the deep end for you" },
      { time: 137.68, text: "There's nothing else that I can do" },
      { time: 144.44, text: "I'm losing air, I'm losing time" },
      { time: 149.38, text: "But I'd die to make you mine" },
      { time: 158.32, text: "Yeah, I'd die to make you mine" },
      { time: 186.05, text: "Drifting" },
      { time: 189.56, text: "Losing light" }
    ]
  },
  halfreal: {
    title: "Half Real",
    audioSrc: "/Half-Real.mp3",
    coverSrc: "/halfreal-2.webp",
    bgGradient: "radial-gradient(circle at center, #1a0808 0%, #050101 100%)",
    links: [
      { name: 'Spotify', url: 'https://open.spotify.com/track/6UOYiUahxxA4wWBawrfmzY' },
      { name: 'Apple Music', url: 'https://music.apple.com/ua/album/half-real/6769801424?i=6769801425' },
      { name: 'YouTube', url: 'https://music.youtube.com/watch?v=Fs0ZWHbaxBg&si=HG0NwzzWarDTfzLj' },
      { name: 'SoundCloud', url: 'https://soundcloud.com/fenkomus/half-real' }
    ],
    lyrics: [
      { time: 3.05, text: "I see your shadow in the light again" },
      { time: 10.07, text: "But I don't know if you were ever here" },
      { time: 16.55, text: "You come back in the night time" },
      { time: 19.99, text: "Fading through the red lights" },
      { time: 23.79, text: "Cold hands on my throat now" },
      { time: 27.53, text: "Say you love me, don't lie" },
      { time: 31.36, text: "We don't talk in the daytime" },
      { time: 35.00, text: "We just live in the low light" },
      { time: 38.97, text: "Hearts numb but it feels right" },
      { time: 42.49, text: "You come back every night" },
      { time: 45.41, text: "You move like static in my room" },
      { time: 47.48, text: "Like you're half real, half a dream" },
      { time: 49.41, text: "Say my name like it don't mean" },
      { time: 51.15, text: "Anything you promised me" },
      { time: 53.14, text: "No past, no reason why" },
      { time: 54.95, text: "We just meet before sunrise" },
      { time: 56.97, text: "Then you vanish from my sight" },
      { time: 58.77, text: "Like you never were alive" },
      { time: 60.64, text: "And I try to let it go" },
      { time: 62.48, text: "But it pulls me back again" },
      { time: 64.38, text: "Every time I fall asleep" },
      { time: 66.39, text: "You return inside my head" },
      { time: 72.24, text: "You come back in the night time" },
      { time: 75.53, text: "Fading through the red lights" },
      { time: 79.58, text: "Cold hands on my throat now" },
      { time: 83.06, text: "Say you love me, don't lie" },
      { time: 87.32, text: "We don't talk in the daytime" },
      { time: 90.47, text: "We just live in the low light" },
      { time: 94.12, text: "Hearts numb but it feels right" },
      { time: 97.86, text: "You come back every night" },
      { time: 115.41, text: "I can't tell if you are real" },
      { time: 118.88, text: "Or just something I repeat" },
      { time: 122.93, text: "In the silence you appear" },
      { time: 126.67, text: "Then you disappear from me" },
      { time: 144.16, text: "You come back" },
      { time: 153.51, text: "And I don't ask why" }
    ]
  },
  stillgetclose: {
    title: "Still Get Close",
    audioSrc: "/Still-Get-Close.mp3",
    coverSrc: "/cover3.webp",
    // Кастомний глибокий бурштиново-чорний градієнт під обкладинку
    bgGradient: "radial-gradient(circle at center, #241403 0%, #050300 100%)",
    links: [
      { name: 'Spotify', url: 'https://open.spotify.com/album/1p9F7f6gA1KRgNVF8oRum1?si=dzQWd9uFSWGAOH107PVTPA' },
      { name: 'Apple Music', url: 'https://music.apple.com/ua/artist/fenko/1895075050' },
      { name: 'YouTube', url: 'https://music.youtube.com/@Fenkomus' },
      { name: 'SoundCloud', url: 'https://on.soundcloud.com/rfogNc8uJBfpiR0MHT' }
    ],
    lyrics: [
      { time: 2.91, text: "One Touch" },
      { time: 7.95, text: "That's enough" },
      { time: 18.75, text: "You walk in like you own the room" },
      { time: 21.40, text: "Black dress and expensive perfume" },
      { time: 23.83, text: "Everybody turns to look at you" },
      { time: 26.04, text: "But you looking through" },
      { time: 29.03, text: "You say my name and bite your lip" },
      { time: 31.38, text: "One more drink, one more stupid trip" },
      { time: 34.24, text: "I know exactly where this goes" },
      { time: 35.93, text: "But I still get close" },
      { time: 40.36, text: "You got me (you got me)" },
      { time: 42.45, text: "Right where you want me (no warning)" },
      { time: 45.57, text: "No warning" },
      { time: 47.01, text: "No way to stop it" },
      { time: 49.21, text: "You make me lose my mind (lose my mind)" },
      { time: 52.48, text: "Every single time" },
      { time: 54.42, text: "I tell myself goodbye (goodbye)" },
      { time: 57.55, text: "Then I stay all night" },
      { time: 59.77, text: "I know you trouble, I know the signs" },
      { time: 62.11, text: "But you make me lose my mind" },
      { time: 67.46, text: "Every single time" },
      { time: 77.22, text: "City lights reflected in your eyes (in your eyes)" },
      { time: 82.56, text: "We're too good at telling pretty lies" },
      { time: 85.81, text: "Nothing here is built to last" },
      { time: 87.90, text: "But we're moving fast" },
      { time: 90.37, text: "Handshake when you pull me in" },
      { time: 92.58, text: "Maybe that's why I never win (never win)" },
      { time: 95.32, text: "Every time I try to leave" },
      { time: 97.92, text: "You get what you need" },
      { time: 100.40, text: "You got me" },
      { time: 102.61, text: "Right where you want me" },
      { time: 104.30, text: "You know it, I know it" },
      { time: 106.52, text: "Nobody's innocent" },
      { time: 109.25, text: "You make me lose my mind (lose my mind)" },
      { time: 112.38, text: "Every single time" },
      { time: 114.07, text: "I tell myself goodbye (goodbye)" },
      { time: 117.46, text: "Then I stay all night" },
      { time: 119.80, text: "I know you trouble, I know the signs" },
      { time: 122.41, text: "But you make me lose my mind" },
      { time: 127.22, text: "Every single time" },
      { time: 137.38, text: "Every single time" },
      { time: 159.26, text: "Every single time" },
      { time: 164.34, text: "Every single time" }
    ]
  }
};

const OverlayVisualizer = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="flex items-end gap-[3px] h-5 justify-center opacity-80">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <motion.div
        key={i}
        className="w-[2px] bg-foreground rounded-full"
        animate={{ height: isPlaying ? ['20%', '100%', '40%', '90%', '30%'] : '15%' }}
        transition={{
          repeat: Infinity,
          duration: 0.5 + i * 0.08,
          ease: "easeInOut",
          delay: i * 0.03
        }}
      />
    ))}
  </div>
);

export default function PlayerOverlay({ isOpen, onClose, trackKey }: PlayerOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsScrollRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [volume, setVolume] = useState(1);

  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = TRACKS_DATA[trackKey];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => { 
      document.body.style.overflow = ''; 
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlay]);

  const handleLyricsScroll = () => {
    isUserScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => { isUserScrolling.current = false; }, 4000);
  };

  const handleLineClick = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      lastUpdateRef.current = time;
      let clickedIndex = -1;
      const lyrics = currentTrack.lyrics;
      for (let i = 0; i < lyrics.length; i++) {
        if (time >= lyrics[i].time) clickedIndex = i;
      }
      setActiveLineIndex(clickedIndex);
      if (audioRef.current.paused) togglePlay();
    }
  };

  const onTimeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const currentTime = e.currentTarget.currentTime;
    if (currentTime - lastUpdateRef.current < 0.1) return;
    lastUpdateRef.current = currentTime;
    let currentLineIndex = -1;
    const lyrics = currentTrack.lyrics;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) currentLineIndex = i;
      else break;
    }
    setActiveLineIndex((prev) => (prev !== currentLineIndex ? currentLineIndex : prev));
  };

  useEffect(() => {
    if (!isUserScrolling.current && activeLineIndex !== -1 && lyricsScrollRef.current) {
      const container = lyricsScrollRef.current;
      const activeElement = container.children[activeLineIndex] as HTMLElement;
      if (activeElement) activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLineIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveLineIndex(-1);
    lastUpdateRef.current = 0;
  }, [isOpen, trackKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className={styles.overlay}
          style={{ background: currentTrack.bgGradient }}
        >
          <button onClick={onClose} className={styles.closeBtnOverlay}>✕ CLOSE</button>
          <div className={styles.lyricsContainer}>
            <div className={styles.lyricsScroll} ref={lyricsScrollRef} onScroll={handleLyricsScroll}>
              {currentTrack.lyrics.map((line, index) => (
                <p key={index} className={`${styles.lyricLine} ${index === activeLineIndex ? styles.lyricLineActive : ''}`} onClick={() => handleLineClick(line.time)}>
                  {line.text}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.musicCard}>
            <div className={styles.coverWrapper} onClick={togglePlay}>
              <img src={currentTrack.coverSrc} alt={currentTrack.title} className={styles.squareCover} />
              <div className={styles.coverOverlay}>
                <div className={styles.playIconContainer}>
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.metaBlock}>
              <h2 className={styles.trackTitle}>{currentTrack.title}</h2>
              <p className={styles.artistName}>FENKO</p>
            </div>
            <div className="h-6 flex items-center justify-center my-2">
               <OverlayVisualizer isPlaying={isPlaying} />
            </div>
            <div className={styles.platformsGrid}>
              {currentTrack.links.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.platformBadge}>
                  {link.name}
                </a>
              ))}
            </div>
            <div className={styles.volumeBlock}>
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (audioRef.current) audioRef.current.volume = v;
                }} className={styles.volumeSlider}
              />
            </div>
            <audio ref={audioRef} src={currentTrack.audioSrc} preload="auto" onTimeUpdate={onTimeUpdateHandler} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
