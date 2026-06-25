'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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
      // ... (щоб не роздувати код, уяви, що тут твої лірики. ЗАЛИШ ЇХ ТУТ З ПОПЕРЕДНЬОГО ФАЙЛУ!)
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
      // ... (ЗАЛИШ СВОЇ ЛІРИКИ ТУТ)
      { time: 153.51, text: "And I don't ask why" }
    ]
  }
};

// ✅ ДОДАНА ФІЧА 3: Динамічний візуалізатор для оверлею
const OverlayVisualizer = ({ isPlaying }: { isPlaying: boolean }) => (
  <div className="flex items-end gap-[4px] h-8 justify-center opacity-70">
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <motion.div
        key={i}
        className="w-[3px] bg-foreground rounded-full"
        animate={{ height: isPlaying ? ['20%', '100%', '30%', '90%', '40%'] : '10%' }}
        transition={{
          repeat: Infinity,
          duration: 0.4 + i * 0.1,
          ease: "easeInOut",
          delay: i * 0.05
        }}
      />
    ))}
  </div>
);

export default function PlayerOverlay({ isOpen, onClose, trackKey }: PlayerOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const tonearmRef = useRef<HTMLImageElement>(null);
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
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [isOpen]);

  // Обертаємо в useCallback для безпечного використання у слухачі клавіатури
  const togglePlay = useCallback(() => {
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
  }, []);

  // ✅ ДОДАНА ФІЧА 1: Гарячі клавіші (Keyboard Shortcuts)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Запобігаємо скролу сторінки вниз
        togglePlay();
      }
      if (e.code === 'ArrowRight' && audioRef.current) {
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, audioRef.current.duration);
      }
      if (e.code === 'ArrowLeft' && audioRef.current) {
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0);
      }
      if (e.code === 'KeyM') {
        setVolume((prev) => {
          const newVol = prev > 0 ? 0 : 1;
          if (audioRef.current) audioRef.current.volume = newVol;
          return newVol;
        });
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
      const lyrics = TRACKS_DATA[trackKey].lyrics;
      for (let i = 0; i < lyrics.length; i++) {
        if (time >= lyrics[i].time) {
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

  const onTimeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const currentTime = e.currentTarget.currentTime;
    
    if (currentTime - lastUpdateRef.current < 0.1) return;
    lastUpdateRef.current = currentTime;

    let currentLineIndex = -1;
    const lyrics = TRACKS_DATA[trackKey].lyrics;

    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        currentLineIndex = i;
      } else {
        break;
      }
    }

    setActiveLineIndex((prev) => (prev !== currentLineIndex ? currentLineIndex : prev));
  };

  useEffect(() => {
    if (!isUserScrolling.current && activeLineIndex !== -1 && lyricsScrollRef.current) {
      const container = lyricsScrollRef.current;
      const activeElement = container.children[activeLineIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
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
            <div 
              className={styles.lyricsScroll} 
              ref={lyricsScrollRef} 
              onScroll={handleLyricsScroll}
              role="region"
              aria-live="polite"
              aria-atomic="false"
              aria-label="Current lyrics"
            >
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
          </div>

          <div className={`${styles.musicCard} ${isPlaying ? styles.musicCardShifted : ''}`}>
            <div className={styles.recordContainer}>
              <img src="/tonarm.png" alt="Vinyl record tonearm" className={styles.tonearm} ref={tonearmRef} />
              <img src={currentTrack.coverSrc} alt={`${currentTrack.title} vinyl record`} className={`${styles.record} ${isPlaying ? styles.isRotating : ''}`} />
              
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

            {/* Вбудовуємо візуалізатор під назвою треку */}
            <div className="mb-4">
               <OverlayVisualizer isPlaying={isPlaying} />
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

            <audio 
              ref={audioRef} 
              src={currentTrack.audioSrc} 
              preload="auto" 
              onTimeUpdate={onTimeUpdateHandler} 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}