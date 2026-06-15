'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ініціалізуємо аудіо лише на клієнті
    audioRef.current = new Audio('/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Робимо звук м'яким фоном (40% гучності)

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
      className="fixed bottom-8 right-8 z-[900] flex items-center gap-3 cursor-none select-none mix-blend-difference group"
    >
      {/* Анімовані лінії звукової хвилі (показуємо тільки коли ON) */}
      <div className="flex items-end gap-[2px] h-3 w-4 overflow-hidden">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className="w-[1px] bg-white"
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

      {/* Мінімалістичний текстовий маркер */}
      <span className="font-mono text-[9px] tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors duration-300 uppercase">
        [ sound : {isPlaying ? 'on' : 'off'} ]
      </span>
    </div>
  );
}