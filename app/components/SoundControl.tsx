'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Браузер заблокував автоплей:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      onClick={toggleSound}
      // Додано cursor-none, щоб приховати системну стрілку
      className="flex items-center gap-3 cursor-none select-none group transition-opacity duration-300 hover:opacity-50"
    >
      {/* Анімовані лінії (використовуємо currentColor, щоб вони завжди були контрастними) */}
      <div className="flex items-end justify-center gap-[2px] h-3 w-4">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className="w-[1px] bg-foreground"
            initial={{ height: 2 }}
            animate={isPlaying ? { height: [2, 12, 4, 10, 2] } : { height: 2 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: bar * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Текстовий маркер */}
      <span className="font-mono text-[9px] tracking-[0.3em] text-foreground uppercase">
        [ sound : {isPlaying ? 'on' : 'off'} ]
      </span>
    </div>
  );
}
