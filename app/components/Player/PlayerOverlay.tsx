'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../../store/usePlayerStore';
import styles from './PlayerOverlay.module.css';

export default function PlayerOverlay() {
  const { isOpen, closePlayer } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const recordRef = useRef<HTMLImageElement>(null);
  const tonearmRef = useRef<HTMLImageElement>(null);
  const iconPathRef = useRef<SVGPathElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(-1);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setIsPlaying(true);
      recordRef.current?.classList.add(styles.isRotating);
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-5deg)';
      iconPathRef.current?.setAttribute('d', 'M7 5h4v14H7V5zm6 0h4v14h-4V5z');
    } else {
      audio.pause();
      setIsPlaying(false);
      recordRef.current?.classList.remove(styles.isRotating);
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-25deg)';
      iconPathRef.current?.setAttribute('d', 'M8 5v14l11-7z');
    }
  };

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
        if (!isUserScrolling.current && lyricsContainerRef.current) {
          const activeElement = lyricsContainerRef.current.children[0]?.children[currentLineIndex];
          activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, [activeLineIndex]);

  const handleLyricsScroll = () => {
    isUserScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 3000);
  };

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setActiveLineIndex(-1);
      recordRef.current?.classList.remove(styles.isRotating);
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-25deg)';
      iconPathRef.current?.setAttribute('d', 'M8 5v14l11-7z');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
          style={{ cursor: 'none' }}
        >
          <div className={styles.customCursor} ref={cursorRef} />
          <div className={styles.lyricsContainer} ref={lyricsContainerRef} onScroll={handleLyricsScroll}>
            <div className={styles.lyricsScroll}>
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
          </div>

          <div className={styles.musicCard}>
            <div className={styles.recordContainer}>
              <img src="/tonarm.png" alt="Tonearm" className={styles.tonearm} ref={tonearmRef} />
              <img src="/DeepEnd Cover.png" alt="Record" className={styles.record} ref={recordRef} />
              <button onClick={togglePlay} className={styles.playBtn}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                  <path ref={iconPathRef} d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            <div className={styles.trackInfo}>
              <h2 className={styles.trackTitle}>Deep End</h2>
              <button onClick={closePlayer} className="mt-4 text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
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
