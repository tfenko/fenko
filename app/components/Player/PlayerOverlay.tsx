'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PlayerOverlay.module.css';

interface PlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LYRICS_DATA = [
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
];

export default function PlayerOverlay({ isOpen, onClose }: PlayerOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const tonearmRef = useRef<HTMLImageElement>(null);
  const lyricsScrollRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const [trackProgress, setTrackProgress] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Гучність від 0 до 1

  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
    scrollTimeout.current = setTimeout(() => { isUserScrolling.current = false; }, 3000);
  };

  const handleLineClick = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setTrackProgress(time);
      if (audioRef.current.paused) togglePlay();
    }
  };

  // Керування прогресом (перемотка мишкою)
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setTrackProgress(newTime);
    }
  };

  // Керування мікшером звуку
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Форматування часу (напр. 03:45)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Метадані аудіо (дізнаємось довжину треку)
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTrackDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      setTrackProgress(currentTime);

      let currentLineIndex = -1;
      for (let i = 0; i < LYRICS_DATA.length; i++) {
        if (currentTime >= LYRICS_DATA[i].time) {
          currentLineIndex = i;
        } else {
          break;
        }
      }

      if (currentLineIndex !== -1 && currentLineIndex !== activeLineIndex) {
        setActiveLineIndex(currentLineIndex);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [activeLineIndex]);

  // Автоскролл
  useEffect(() => {
    if (!isUserScrolling.current && activeLineIndex !== -1 && lyricsScrollRef.current) {
      const container = lyricsScrollRef.current;
      const activeElement = container.children[activeLineIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLineIndex, isPlaying]);

  // Скидання при закритті
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setActiveLineIndex(-1);
      setTrackProgress(0);
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-25deg)';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className={styles.overlay}
        >
          <div className={`${styles.bgVideo} ${isPlaying ? styles.bgVideoActive : ''}`} />

          <div className={`${styles.lyricsContainer} ${isPlaying ? styles.lyricsActive : ''}`}>
            {isPlaying && (
              <div className={styles.lyricsScroll} ref={lyricsScrollRef} onScroll={handleLyricsScroll}>
                {LYRICS_DATA.map((line, index) => (
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
              <img src="/deepend.webp" alt="Record" className={`${styles.record} ${isPlaying ? styles.isRotating : ''}`} />
              
              <button onClick={togglePlay} className={styles.playBtn}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                  {isPlaying ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/> : <path d="M8 5v14l11-7z"/>}
                </svg>
              </button>
            </div>

            <div className={styles.trackInfo}>
              <h2 className={styles.trackTitle}>Deep End</h2>
              <a href="https://fenko.space" target="_blank" rel="noopener noreferrer" className={styles.artistLink}>
                <p className={styles.artistName}>FENKO</p>
              </a>
            </div>

            {/* ==========================================
               ПРОГРЕС-БАР ТА МІКШЕР ЗВУКУ
            ========================================== */}
            <div className={styles.controlsWrapper}>
              {/* Прогрес-бар */}
              <div className={styles.sliderContainer}>
                <div className={styles.timeLabel}>{formatTime(trackProgress)}</div>
                <input 
                  type="range" 
                  min="0" 
                  max={trackDuration || 100} 
                  value={trackProgress} 
                  onChange={handleProgressChange} 
                  className={styles.audioSlider}
                />
                <div className={styles.timeLabel}>{formatTime(trackDuration)}</div>
              </div>

              {/* Мікшер звуку */}
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
            </div>

            <button onClick={onClose} className={styles.closeBtn}>
              [ CLOSE PLAYER ]
            </button>

            <audio 
              ref={audioRef} 
              src="/Deep-End.mp3" 
              preload="auto" 
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
