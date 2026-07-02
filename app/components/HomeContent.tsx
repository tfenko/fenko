'use client';

import { useState } from 'react';
import Music from './Music';
import PlayerOverlay from './Player/PlayerOverlay';

export default function HomeContent() {
  // Додано 'stillgetclose' до типу стану, щоб уникнути помилки TypeScript
  const [activeTrack, setActiveTrack] = useState<'deepend' | 'halfreal' | 'stillgetclose' | null>(null);

  return (
    <>
      {/* Тепер onOpenPlayer коректно передає тип, який очікує setActiveTrack */}
      <Music onOpenPlayer={(trackKey) => setActiveTrack(trackKey)} />
      
      {/* PlayerOverlay тепер також підтримує 'stillgetclose' через props */}
      <PlayerOverlay 
        isOpen={activeTrack !== null} 
        onClose={() => setActiveTrack(null)} 
        trackKey={activeTrack || 'deepend'} 
      />
    </>
  );
}