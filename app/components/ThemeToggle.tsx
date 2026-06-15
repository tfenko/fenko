'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="fixed bottom-8 left-8 z-[900] font-mono text-[9px] uppercase tracking-[0.3em] 
                 px-4 py-2 transition-all duration-300 hover:opacity-60
                 bg-foreground text-background border border-foreground"
    >
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </button>
  );
}
