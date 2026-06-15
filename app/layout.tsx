'use client';

import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SoundControl from './components/SoundControl';
import Script from 'next/script';
import { useState } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" className="select-none md:cursor-none bg-background">
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-background text-foreground antialiased overflow-x-hidden transition-colors duration-400`}>
        
        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18240888787"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18240888787');
          `}
        </Script>

        {/* Прелоадер */}
        <Preloader onComplete={() => setIsLoading(false)} />
        
        {/* Зерно (film-grain) */}
        <div className="film-grain" />
        
        {/* Кастомний курсор */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        
        {/* Глобальний інтерфейс */}
        {!isLoading && (
          <>
            {/* Рамки — тепер використовують змінні для адаптації до теми */}
            <div className="fixed inset-0 hidden md:block border-[12px] border-background z-[999] pointer-events-none" />
            <div className="fixed inset-3 hidden md:block border border-foreground/10 z-[999] pointer-events-none" />
            
            {/* Маркер бренду */}
            <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[900] mix-blend-difference">
              <span className="font-cormorant text-base md:text-lg font-light tracking-[0.3em] uppercase text-foreground">F //</span>
            </div>
            
            <div className="fixed top-8 right-8 z-[900] mix-blend-difference font-mono text-[9px] tracking-[0.2em] uppercase text-foreground/50 hidden sm:block">
              [ midnight edition ]
            </div>

            {/* SoundControl */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[900]">
              <SoundControl />
            </div>
          </>
        )}

        {/* Контент */}
        <SmoothScroll>
          <main className="w-full relative z-10">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
