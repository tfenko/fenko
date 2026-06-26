import type { Metadata } from 'next';
import Script from 'next/script';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import HomeContent from './components/HomeContent';

export const metadata: Metadata = {
  title: 'FENKO // Official Website',
  description: 'Official archive of FENKO (fenkomus). Alternative R&B, Dark Soundscapes, and Cinematic Soul Trap production. Author of the novel "Exit from Full Screen Mode".',
  keywords: [
    'fenko', 'fenkomus', 'fenko space', 'dark r&b', 
    'alternative r&b', 'cinematic soul trap', 'deep end fenko', 
    'half real', 'music producer lviv', 'exit from full screen mode'
  ],
  authors: [{ name: 'FENKO', url: 'https://fenko.space' }],
  creator: 'FENKO',
  publisher: 'FENKO',
  alternates: {
    canonical: 'https://fenko.space',
  },
  openGraph: {
    title: 'FENKO // Official Website',
    description: 'Alternative R&B // Dark Soundscapes // Official archive of FENKO and the fenkomus label.',
    url: 'https://fenko.space',
    siteName: 'FENKO SPACE',
    images: [
      {
        url: '/og-image.webp', 
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
    description: 'Alternative R&B // Dark Soundscapes // Official archive of FENKO and the fenkomus label.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="schema-music-artist"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicGroup", // Змінено на MusicGroup для кращого охоплення артист/лейбл
            "name": "FENKO",
            "alternateName": ["fenkomus", "FENKO Music"],
            "url": "https://fenko.space",
            "sameAs": [
              "https://open.spotify.com/artist/6DyQbxEBYocDwvxPvl2gBS",
              "https://music.apple.com/ua/artist/fenko/1895075050",
              "https://soundcloud.com/fenkomus",
              "https://www.instagram.com/fenkomus",
              "https://www.tiktok.com/@fenkomus"
            ],
            "description": "Alternative R&B artist FENKO (also known as fenkomus). Primary artist identity representing the creative label and production imprint."
          }),
        }}
      />

      <Hero />
      <About />
      <HomeContent />
      <Footer />
    </>
  );
}