import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-black relative w-full overflow-hidden">
      {/* Секції йдуть щільно, створюючи єдиний таймлайн нічної поїздки */}
      <Hero />
      <div className="relative z-50 bg-gradient-to-b from-black via-[#050505] to-[#0A0A0A]">
        <About />
        <Music />
      </div>
      <Footer />
    </main>
  );
}