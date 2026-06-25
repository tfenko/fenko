'use client';

import { useEffect } from 'react';

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логуємо помилку (корисно для дебагу на продакшні)
    console.error('Captured by FENKO Architecture Error Boundary:', error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background p-6 text-center font-mono">
      <div className="max-w-md border border-foreground/20 p-8 md:p-12 bg-background relative overflow-hidden">
        <span className="text-[10px] tracking-[0.5em] text-foreground/40 uppercase block mb-4">
          System // Runtime Error
        </span>
        <h2 className="text-xl font-light tracking-widest text-foreground uppercase mb-6">
          [ Audio System Crash ]
        </h2>
        <p className="text-xs text-foreground/60 leading-relaxed mb-8">
          The sound engine or interactive module failed to initialize. This can occur due to strict media policies or browser resource limits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="text-[9px] tracking-[0.3em] uppercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            [ REBOOT SYSTEM ]
          </button>
          <a
            href="/"
            className="text-[9px] tracking-[0.3em] uppercase border border-foreground/20 px-6 py-3 hover:border-foreground transition-all flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            [ RETURN HOME ]
          </a>
        </div>
      </div>
    </div>
  );
}