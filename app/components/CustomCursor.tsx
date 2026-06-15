'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);

    // Додаємо ефект збільшення на кнопках та посиланнях
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.group') // зпрацює на наших картках релізів
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Плавний наздоганяючий ефект для "хвоста" курсора
  useEffect(() => {
    let animFrame: number;
    
    const updateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animFrame = requestAnimationFrame(updateTrail);
    };
    
    animFrame = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animFrame);
  }, [position]);

  return (
    <>
      {/* Головна маленька точка */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
        style={{ transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)` }}
      />
      {/* Велике розмите нічне коло (хвіст) */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-white/30 transition-all duration-300 ease-out ${
          hovered ? 'w-16 h-16 -translate-x-8 -translate-y-8 bg-white/5 border-white/60' : 'w-8 h-8 -translate-x-4 -translate-y-4'
        }`}
        style={{ transform: `translate3d(${trail.x}px, ${trail.y}px, 0)` }}
      />
    </>
  );
}