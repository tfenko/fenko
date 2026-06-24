'use client';

import { useState } from 'react';
import Music from './Music'; // або звідки він у тебе імпортується
import PlayerOverlay from './Player/PlayerOverlay';

export default function HomeContent() {
  // Замість boolean використовуємо рядок або null
  const [activeTrack, setActiveTrack] = useState<'deepend' | 'halfreal' | null>(null);

  return (
    <>
      {/* Якщо твій компонент Music очікує нову функцію, передаємо вибір треку */}
      {/* Для тесту, або якщо Music поки приймає старий пропс, залишаємо увімкнення дефолтного 'deepend' */}
      <Music onOpenPlayer={() => setActiveTrack('deepend')} />
      
      {/* Фікс помилки TypeScript: тепер передаємо обов'язковий trackKey */}
      <PlayerOverlay 
        isOpen={activeTrack !== null} 
        onClose={() => setActiveTrack(null)} 
        trackKey={activeTrack || 'deepend'} 
      />
    </>
  );
}
