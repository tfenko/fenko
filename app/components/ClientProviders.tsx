'use client';

import dynamic from 'next/dynamic';

// Імпортуємо тільки необхідний функціонал
const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {children}
    </SmoothScroll>
  );
}