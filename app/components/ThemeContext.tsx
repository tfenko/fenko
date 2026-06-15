'use client';

import { ThemeProvider } from 'next-themes';

export function ThemeContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false} // Вимкнено forcedTheme
    >
      {children}
    </ThemeProvider>
  );
}
