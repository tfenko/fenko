'use client';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="fixed bottom-8 left-8 z-[900] font-mono text-[9px] uppercase">
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </button>
  );
}
