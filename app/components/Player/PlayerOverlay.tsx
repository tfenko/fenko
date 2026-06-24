'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PlayerOverlay.module.css';

interface PlayerOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlayerOverlay({ isOpen, onClose }: PlayerOverlayProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const tonearmRef = useRef<HTMLImageElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const lyrics = [
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
    { time: 77.79, text: "But I'd die to make you mine" }
  ];

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

  // Стежимо за часом відтворення для караоке
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      let currentLineIndex = -1;
      lyrics.forEach((line, index) => {
        if (audio.currentTime >= line.time) {
          currentLineIndex = index;
        }
      });

      if (currentLineIndex !== -1 && currentLineIndex !== activeLineIndex) {
        setActiveLineIndex(currentLineIndex);
        
        // Автоматичний плавний скролл до активного рядка
        if (lyricsContainerRef.current) {
          const activeElement = lyricsContainerRef.current.children[currentLineIndex] as HTMLElement;
          if (activeElement) {
            lyricsContainerRef.current.scrollTo({
              top: activeElement.offsetTop - lyricsContainerRef.current.offsetHeight / 2 + activeElement.offsetHeight / 2,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [activeLineIndex]);

  // Скидання стану при закритті вікна
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setActiveLineIndex(-1);
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
          {/* Блок тексту зліва */}
          <div className={styles.lyricsContainer} ref={lyricsContainerRef}>
            {lyrics.map((line, index) => (
              <p 
                key={index} 
                className={`${styles.lyricLine} ${index === activeLineIndex ? styles.active : ''}`}
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = line.time;
                    if (audioRef.current.paused) togglePlay();
                  }
                }}
              >
                {line.text}
              </p>
            ))}
          </div>

          {/* Блок програвача справа */}
          <div className={styles.musicCard}>
            <div className={styles.recordContainer}>
              <img src="/tonarm.png" alt="Tonearm" className={styles.tonearm} ref={tonearmRef} />
              <img 
                src="/DeepEnd Cover.png" 
                alt="Record" 
                className={`${styles.record} ${isPlaying ? styles.isRotating : ''}`} 
              />
              
              <button onClick={togglePlay} className={styles.playBtn}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  ) : (
                    <path d="M8 5v14l11-7z"/>
                  )}
                </svg>
              </button>
            </div>

            <div className={styles.trackInfo}>
              <h2 className={styles.trackTitle}>Deep End</h2>
              <p className={styles.trackArtist}>FENKO</p>
              <button onClick={onClose} className={styles.closeBtn}>
                [ CLOSE PLAYER ]
              </button>
            </div>

            <audio ref={audioRef} src="/Deep End.wav" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
