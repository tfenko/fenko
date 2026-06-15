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
    <html lang="en" className="select-none md:cursor-none bg-black">
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-black antialiased overflow-x-hidden`}>
        {/* Ініціалізація Google Ads Tag */}
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

        {/* Прелоадер сайту */}
        <Preloader onComplete={() => setIsLoading(false)} />
        
        {/* Невагоме статичне зерно під Retina */}
        <div className="film-grain" />
        
        {/* Кастомний курсор рендериться ТІЛЬКИ на десктопах */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        
        {/* ГЛОБАЛЬНИЙ ІНТЕРФЕЙС (Поза межами SmoothScroll!) */}
        {!isLoading && (
          <>
            {/* Фірмова тонка люкс-рамка — прихована на мобільних, видна від md:block */}
            <div className="fixed inset-0 hidden md:block border-[12px] border-black z-[999] pointer-events-none" />
            <div className="fixed inset-3 hidden md:block border border-white/5 z-[999] pointer-events-none" />
            
            {/* Мінімалістичний фіксований верхній маркер — адаптовані відступи */}
            <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[900] mix-blend-difference">
              <span className="font-cormorant text-base md:text-lg font-light tracking-[0.3em] text-white uppercase">F //</span>
            </div>
            <div className="fixed top-8 right-8 z-[900] mix-blend-difference font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase hidden sm:block">
              [ midnight edition ]
            </div>

            {/* КНОПКА КЕРУВАННЯ АТМОСФЕРНИМ ЗВУКОМ */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[900]">
              <SoundControl />
            </div>
          </>
        )}

        {/* СУТО КОНТЕНТ СТОРІНКИ ДЛЯ ПЛАВНОГО СКРОЛУ */}
        <SmoothScroll>
          <main className="w-full relative z-10">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
