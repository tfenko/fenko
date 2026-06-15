'use client';

import { ThemeProvider } from 'next-themes';

export function ThemeContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      forcedTheme="dark" // Це змушує сайт завжди ігнорувати світлу тему при першому завантаженні
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
