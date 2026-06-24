'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/store/usePlayerStore';
import './player.css'; // Твої стилі (переконайся, що вони підключені)

export default function PlayerOverlay() {
  const { isOpen, closePlayer } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const recordRef = useRef<HTMLImageElement>(null);
  const tonearmRef = useRef<HTMLImageElement>(null);
  const iconPathRef = useRef<SVGPathElement>(null);

  // Логіка керування плеєром
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      recordRef.current?.classList.add('is-rotating');
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-5deg)';
      iconPathRef.current?.setAttribute('d', 'M7 5h4v14H7V5zm6 0h4v14h-4V5z');
    } else {
      audio.pause();
      recordRef.current?.classList.remove('is-rotating');
      if (tonearmRef.current) tonearmRef.current.style.transform = 'rotate(-25deg)';
      iconPathRef.current?.setAttribute('d', 'M8 5v14l11-7z');
    }
  };

  // Зупинка музики при закритті
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex items-center justify-center cursor-none"
        >
          <div className="music-card">
            <div className="record-container">
              <img src="/tonarm.png" alt="Tonearm" className="tonearm" ref={tonearmRef} />
              <img src="/DeepEnd Cover.png" alt="Record" className="record" ref={recordRef} />
              
              <button onClick={togglePlay} className="play-btn">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                  <path ref={iconPathRef} d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>

            <div className="track-info">
              <h2 className="track-title">Deep End</h2>
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
