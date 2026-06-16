'use client';

import './globals.css';
import { ThemeContext } from './components/ThemeContext';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';

// Динамічні імпорти для компонентів, що потребують клієнтського рендеру
const SmoothScroll = dynamic(() => import('./components/SmoothScroll'), { ssr: false });
const CustomCursor = dynamic(() => import('./components/CustomCursor'), { ssr: false });
const FloatingNotes = dynamic(() => import('./components/FloatingNotes'), { ssr: false });

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsVisible(window.scrollY < 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!mounted) return null;

  return (
    <motion.button 
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
      className="font-mono text-[9px] uppercase tracking-[0.3em] hover:opacity-50 text-foreground cursor-none pointer-events-auto"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '[ LIGHT MODE ]' : '[ DARK MODE ]'}
    </motion.button>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FENKO</title>
      </head>
      {/* Додаємо FloatingNotes одразу в body, щоб він був "поверх" усього */}
      <body className="font-sans bg-background text-foreground antialiased overflow-x-hidden selection:bg-foreground selection:text-background cursor-none">
        
        <FloatingNotes />
        
        <ThemeContext>
          <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18240888787" strategy="afterInteractive" />
          <Script id="google-ads-tag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18240888787');`}
          </Script>

          <div className="hidden md:block">
            <CustomCursor />
          </div>

          <div className="film-grain" />
          
          {/* UI Елементи */}
          <div className="fixed bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 z-[900] flex justify-between pointer-events-none">
            <div className="pointer-events-auto">
              <ThemeToggle />
            </div>
          </div>
            
          <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[900] mix-blend-difference">
            <span className="font-cormorant text-base md:text-lg font-light tracking-[0.3em] uppercase text-foreground">F //</span>
          </div>

          <SmoothScroll>
            <main className="w-full relative z-10 min-h-screen">{children}</main>
          </SmoothScroll>
          
          <Analytics />
        </ThemeContext>
      </body>
    </html>
  );
}
