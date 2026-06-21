export default function StatsCounter() {
  const stats = [
    { platform: 'Spotify', count: '12.4K' },
    { platform: 'Apple', count: '8.2K' },
    { platform: 'YouTube', count: '15.1K' },
    { platform: 'SoundCloud', count: '5.9K' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 py-8 border-t border-foreground/10">
      {stats.map((stat) => (
        <div key={stat.platform} className="text-center">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-1">{stat.platform}</span>
          <span className="font-mono text-xl tracking-[0.1em] text-foreground">{stat.count}</span>
        </div>
      ))}
    </div>
  );
}
