'use client';

import { motion } from 'framer-motion';

export default function StatsCounter() {
  // Сума: 6400 + 920 + 554 + 1137 = 9011
  const totalStreams = "9,011"; 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-16 border-y border-foreground/10 my-12"
    >
      <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/40 mb-4">
        Global reach // Total streams
      </span>
      
      <div className="flex items-baseline gap-2">
        <span className="font-cormorant text-5xl md:text-6xl font-light text-foreground">
          {totalStreams}
        </span>
        <span className="text-sm font-mono text-foreground/30 uppercase tracking-widest">
          Streams
        </span>
      </div>

      {/* Дата актуальності */}
      <span className="mt-4 text-[8px] font-mono uppercase tracking-[0.3em] text-foreground/20">
        AS OF JUNE 20, 2026
      </span>

      <div className="mt-6 w-32 h-[1px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
    </motion.div>
  );
}
