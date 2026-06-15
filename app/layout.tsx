'use client';

import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { ThemeContext } from './components/ThemeContext';
import { useTheme } from 'next-themes';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SoundControl from './components/SoundControl';
import Script from 'next/script';
import { useState, useEffect } from 'react';

// Компонент кнопки
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="fixed bottom-8 left-8 z-[900] font-mono text-[9px] uppercase tracking-widest hover:opacity-50 transition-opacity">
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </button>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeContext>
          <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18240888787" strategy="afterInteractive" />
          <Script id="google-ads-tag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18240888787');`}
          </Script>

          <Preloader onComplete={() => setIsLoading(false)} />
          <div className="film-grain" />
          
          {!isLoading && (
            <>
              <ThemeToggle />
              <div className="fixed inset-0 hidden md:block border-[12px] border-background z-[999] pointer-events-none" />
              <div className="fixed inset-3 hidden md:block border border-foreground/10 z-[999] pointer-events-none" />
              <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[900] mix-blend-difference">
                <span className="font-cormorant text-base md:text-lg font-light tracking-[0.3em] uppercase text-foreground">F //</span>
              </div>
              <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[900]">
                <SoundControl />
              </div>
            </>
          )}

          <SmoothScroll>
            <main className="w-full relative z-10">{children}</main>
          </SmoothScroll>
        </ThemeContext>
      </body>
    </html>
  );
}
