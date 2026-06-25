'use client';

import dynamic from 'next/dynamic';

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false });
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const FloatingNotes = dynamic(() => import('./FloatingNotes'), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FloatingNotes />
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </>
  );
}