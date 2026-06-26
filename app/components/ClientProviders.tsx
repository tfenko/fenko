'use client';

import dynamic from 'next/dynamic';

// Імпортуємо тільки ті компоненти, які мають залишатися
const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false });
const FloatingNotes = dynamic(() => import('./FloatingNotes'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Фонові елементи, які не заважають взаємодії 
        та не блокують стандартний курсор 
      */}
      <FloatingNotes />
      
      {/* SmoothScroll залишається для плавного ефекту, 
        але тепер він не конфліктує з кастомним курсором
      */}
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </>
  );
}