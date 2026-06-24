'use client';

import { useState } from 'react';
import Music from './Music';
import PlayerOverlay from './Player/PlayerOverlay';

export default function HomeContent() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <>
      <Music onOpenPlayer={() => setIsPlayerOpen(true)} />
      <PlayerOverlay isOpen={isPlayerOpen} onClose={() => setIsPlayerOpen(false)} />
    </>
  );
}
