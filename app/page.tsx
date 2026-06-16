// app/page.tsx

import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Footer from './components/Footer';

// ГЛОБАЛЬНІ МЕТАДАНІ ДЛЯ ПОШУКОВОЇ ОПТИМІЗАЦІЇ (SEO) ТА СОЦМЕРЕЖ
export const metadata = {
  title: 'FENKO // Official Website',
  description: 'Official archive of FENKO (fenkomus). Alternative R&B, Dark Soundscapes, and Cinematic Soul Trap production. Author of the novel "Exit from Full Screen Mode".',
  keywords: [
    'fenko', 
    'fenkomus', 
    'fenko space', 
    'dark r&b', 
    'alternative r&b', 
    'cinematic soul trap', 
    'deep end fenko', 
    'half real', 
    'music producer lviv'
  ],
  // Налаштування для гарного відображення посилання в соцмережах (Telegram, Insta, Twitter)
  openGraph: {
    title: 'FENKO // Official Website',
    description: 'Alternative R&B // Dark Soundscapes // Exit from Full Screen Mode',
    url: 'https://fenko.space',
    siteName: 'FENKO SPACE',
    images: [
      {
        url: '/og-image.webp', // Твій файл з папки public
        width: 1200,
        height: 631,
        alt: 'FENKO - Official Art Cover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FENKO // Official Website',
    description: 'Alternative R&B // Dark Soundscapes // Exit from Full Screen Mode',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Music />
      <Footer />
    </>
  );
}
