'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/store/usePlayerStore'; // той самий Zustand store
import './player.css'; // твій CSS тут

export default function PlayerOverlay() {
  const { isOpen, closePlayer } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex items-center justify-center"
        >
          {/* Твоя HTML верстка плеєра */}
          <div className="music-card">
            {/* ... твій HTML код з файлу ... */}
            <button onClick={closePlayer} className="absolute top-10 right-10 text-white">Close</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
