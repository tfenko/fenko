// components/ThemeContext.tsx
import { ThemeProvider } from 'next-themes';

export function ThemeContext({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
