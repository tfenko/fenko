'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function StatsCounter() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, 8942, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, count]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 border-y border-foreground/10 my-12 bg-foreground/[0.02]"
    >
      <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/40 mb-6">
        Global reach // Total streams
      </span>
      
      <div className="flex items-baseline gap-3">
        <motion.span className="font-cormorant text-5xl md:text-7xl font-light text-foreground">
          {rounded}
        </motion.span>
        <span className="text-sm font-mono text-foreground/30 uppercase tracking-widest">
          Streams
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-foreground/20">
          AS OF JUNE 21, 2026
        </span>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent mt-2" />
      </div>
    </motion.div>
  );
}
