import './globals.css';
import { ThemeContext } from './components/ThemeContext';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientProviders from './components/ClientProviders';
import Navbar from './components/Navbar'; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FENKO</title>
      </head>
      <body className="font-sans bg-background text-foreground antialiased overflow-x-hidden selection:bg-foreground selection:text-background">
        
        {/* SEO */}
        <Script
          id="schema-music-group"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              "name": "FENKO",
              "alternateName": "fenkomus",
              "url": "https://fenko.space",
              "genre": ["Alternative R&B", "Dark Pop", "Soul Trap", "Cinematic Soul Trap"],
              "description": "Alternative R&B artist // Dark Soundscapes // Cinematic Soul Trap production.",
              "sameAs": [
                "https://open.spotify.com/artist/6DyQbxEBYocDwvxPvl2gBS",
                "https://music.apple.com/ua/artist/fenko/1895075050",
                "https://www.instagram.com/fenkomus",
                "https://www.tiktok.com/@fenkomus",
                "https://soundcloud.com/fenkomus"
              ],
              "foundingDate": "2024",
              "image": "https://fenko.space/deepend.webp"
            })
          }}
        />

        <Script
          id="schema-music-releases"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "MusicRelease",
                  "name": "Half Real",
                  "byArtist": { "@type": "MusicGroup", "name": "FENKO" },
                  "datePublished": "2026-05-08",
                  "genre": "Alternative R&B",
                  "musicReleaseFormat": "https://schema.org/DigitalFormat",
                  "url": "https://fenko.space/#music"
                },
                {
                  "@type": "MusicRelease",
                  "name": "Deep End",
                  "byArtist": { "@type": "MusicGroup", "name": "FENKO" },
                  "datePublished": "2024",
                  "genre": "Alternative R&B",
                  "musicReleaseFormat": "https://schema.org/DigitalFormat",
                  "url": "https://fenko.space/#music"
                },
                {
                  "@type": "MusicRelease",
                  "name": "Still Get Close",
                  "byArtist": { "@type": "MusicGroup", "name": "FENKO" },
                  "datePublished": "2026-07-03",
                  "genre": "Alternative R&B",
                  "musicReleaseFormat": "https://schema.org/DigitalFormat",
                  "url": "https://fenko.space/#music"
                }
              ]
            })
          }}
        />

        {/* Аналітика */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3T3TFTGZX0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3T3TFTGZX0');
            gtag('config', 'AW-18240888787');
          `}
        </Script>
        
        <ThemeContext>
          <div className="film-grain" />
          
          {/* Навбар з вмонтованим перемикачем теми керує усім зверху */}
          <Navbar />

          <ClientProviders>
            <main className="w-full relative z-10 min-h-screen">{children}</main>
          </ClientProviders>
          
          <Analytics />
          <SpeedInsights />
        </ThemeContext>
      </body>
    </html>
  );
}