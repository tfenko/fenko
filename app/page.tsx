// app/page.tsx

import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Footer from './components/Footer'; // Імпортуємо футер назад

// ГЛОБАЛЬНІ МЕТАДАНІ ДЛЯ ВКЛАДКИ БРАУЗЕРА
export const metadata = {
  title: 'Fenko // Soundscapes',
  description: 'Alternative R&B // Dark Soundscapes',
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Music />
      <Footer /> {/* Футер тепер на своєму законному місці */}
    </>
  );
}
