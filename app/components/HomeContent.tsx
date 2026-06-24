'use client';

import { useState } from 'react';
import Music from './Music';
import PlayerOverlay from './Player/PlayerOverlay';

export default function HomeContent() {
  // Стан обов'язково має приймати null або рядок з ключем треку!
  const [activeTrack, setActiveTrack] = useState<'deepend' | 'halfreal' | null>(null);

  return (
    <>
      {/* Кліки по треках змінюють стан на 'deepend' або 'halfreal' */}
      <Music onOpenPlayer={(trackKey) => setActiveTrack(trackKey)} />
      
      {/* КРИТИЧНЕ МІСЦЕ: trackKey має братися СУВОРO зі стану activeTrack */}
      <PlayerOverlay 
        isOpen={activeTrack !== null} 
        onClose={() => setActiveTrack(null)} 
        trackKey={activeTrack || 'deepend'} // Якщо activeTrack змінить значення на 'halfreal', плеєр перемикнеться!
      />
    </>
  );
}
