// app/page.tsx

import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Preloader from './components/Preloader';

// ГЛОБАЛЬНІ МЕТАДАНІ ДЛЯ ВКЛАДКИ БРАУЗЕРА — ТЕПЕР ВОНИ ТУТ!
export const metadata = {
  title: 'Fenko // Soundscapes', // Те, що буде написано на вкладці
  description: 'Alternative R&B // Dark Soundscapes',
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Music />
    </>
  );
}
