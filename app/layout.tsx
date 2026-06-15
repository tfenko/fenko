'use client';

import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SoundControl from './components/SoundControl';
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
    <html lang="en" className="select-none cursor-none bg-black">
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-black antialiased overflow-x-hidden`}>
        {/* Прелоадер сайту */}
        <Preloader onComplete={() => setIsLoading(false)} />
        
        {/* Невагоме статичне зерно під Retina */}
        <div className="film-grain" />
        
        <SmoothScroll>
          <CustomCursor />
          
          {/* Елементи інтерфейсу після завантаження */}
          {!isLoading && (
            <>
              {/* Фірмова тонка люкс-рамка по краях всього екрана */}
              <div className="fixed inset-0 border-[12px] border-black z-[999] pointer-events-none" />
              <div className="fixed inset-3 border border-white/5 z-[999] pointer-events-none" />
              
              {/* Мінімалістичний фіксований верхній маркер */}
              <div className="fixed top-8 left-8 z-[900] mix-blend-difference">
                <span className="font-cormorant text-lg font-light tracking-[0.3em] text-white uppercase">F //</span>
              </div>
              <div className="fixed top-8 right-8 z-[900] mix-blend-difference font-mono text-[9px] tracking-[0.2em] text-gray-500 uppercase hidden sm:block">
                [ midnight edition ]
              </div>

              {/* КНОПКА КЕРУВАННЯ АТМОСФЕРНИМ ЗВУКОМ */}
              <SoundControl />
            </>
          )}

          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}