'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PlayerOverlay.module.css';

interface PlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  trackKey: 'deepend' | 'halfreal';
}

const TRACKS_DATA = {
  deepend: {
    title: "Deep End",
    audioSrc: "/Deep-End.mp3",
    coverSrc: "/deepend.webp",
    bgGradient: "linear-gradient(135deg, #050b14, #0a1118, #0e2530, #131a22, #050b14)",
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
      { time: 73.03, text: "I'm losing air, I'm losing time" },
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
    bgGradient: "linear-gradient(135deg, #000000, #150505, #2d0b0b, #100303, #000000)",
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
  }
};

export default function PlayerOverlay({ isOpen, onClose, trackKey }: PlayerOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const tonearmRef = useRef<HTMLImageElement>(null);
  const lyricsScrollRef = useRef<HTMLDivElement>(null);
  
  // ФІКС 1: Створюємо Ref для лірики, щоб слухач часу ЗАВЖДИ бачив актуальний масив
  const lyricsRef = useRef(TRACKS_DATA[trackKey].lyrics);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [volume, setVolume] = useState(1);

  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = TRACKS_DATA[trackKey];

  // Синхронізуємо реф лірики при зміні треку
  useEffect(() => {
    lyricsRef.current = TRACKS_DATA[trackKey].lyrics;
  }, [trackKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-5deg)';
    } else {
      audio.pause();
      setIsPlaying(false);
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-25deg)';
    }
  };

  const handleLyricsScroll = () => {
    isUserScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => { isUserScrolling.current = false; }, 4000);
  };

  const handleLineClick = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      let clickedIndex = -1;
      const lines = lyricsRef.current;
      for (let i = 0; i < lines.length; i++) {
        if (time >= lines[i].time) {
          clickedIndex = i;
        }
      }
      setActiveLineIndex(clickedIndex);
      if (audioRef.current.paused) togglePlay();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  // ФІКС 2: ЗАЛІЗОБЕТОННИЙ СЛУХАЧ ЧАСУ (Тепер працює абсолютно однаково для обох треків)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      let currentLineIndex = -1;
      const lines = lyricsRef.current; // Беремо дані напряму з актуального рефу

      for (let i = 0; i < lines.length; i++) {
        if (currentTime >= lines[i].time) {
          currentLineIndex = i;
        } else {
          break;
        }
      }

      setActiveLineIndex((prevIndex) => {
        if (currentLineIndex !== prevIndex) {
          return currentLineIndex;
        }
        return prevIndex;
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [trackKey]); // Залежить тільки від треку, ніяких внутрішніх підвисань!

  // АВТОМАТИЧНИЙ СКРОЛЛ ДО ЦЕНТРУ
  useEffect(() => {
    if (!isUserScrolling.current && activeLineIndex !== -1 && lyricsScrollRef.current) {
      const container = lyricsScrollRef.current;
      const activeElement = container.children[activeLineIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLineIndex, isPlaying]);

  // Скидання стану
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveLineIndex(-1);
    if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-25deg)';
  }, [isOpen, trackKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className={styles.overlay}
        >
          <button onClick={onClose} className={styles.closeBtnOverlay}>
            [ CLOSE PLAYER ]
          </button>

          <div 
            className={`${styles.bgVideo} ${isPlaying ? styles.bgVideoActive : ''}`} 
            style={{ background: currentTrack.bgGradient }}
          />

          <div className={`${styles.lyricsContainer} ${isPlaying ? styles.lyricsActive : ''}`}>
            {isPlaying && (
              <div className={styles.lyricsScroll} ref={lyricsScrollRef} onScroll={handleLyricsScroll}>
                {currentTrack.lyrics.map((line, index) => (
                  <p 
                    key={index} 
                    className={`${styles.lyricLine} ${index === activeLineIndex ? styles.lyricLineActive : ''}`}
                    onClick={() => handleLineClick(line.time)}
                  >
                    {line.text}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className={`${styles.musicCard} ${isPlaying ? styles.musicCardShifted : ''}`}>
            <div className={styles.recordContainer}>
              <img src="/tonarm.png" alt="Tonearm" className={styles.tonearm} ref={tonearmRef} />
              <img src={currentTrack.coverSrc} alt="Record" className={`${styles.record} ${isPlaying ? styles.isRotating : ''}`} />
              
              <button onClick={togglePlay} className={styles.playBtn}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                  {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/> : <path d="M8 5v14l11-7z"/>}
                </svg>
              </button>
            </div>

            <div className={styles.trackInfo}>
              <h2 className={styles.trackTitle}>{currentTrack.title}</h2>
              <a href="https://fenko.space" target="_blank" rel="noopener noreferrer" className={styles.artistLink}>
                <p className={styles.artistName}>FENKO</p>
              </a>
            </div>

            <div className={styles.volumeContainer}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className={styles.volumeIcon}>
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={handleVolumeChange} 
                className={styles.volumeSlider}
              />
            </div>

            <audio ref={audioRef} src={currentTrack.audioSrc} preload="auto" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
