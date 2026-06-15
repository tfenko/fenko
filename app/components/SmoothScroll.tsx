'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Наказуємо браузеру ЗАВЖДИ скидати скрол в нуль при перезавантаженні сторінки
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Примусово скролимо вікно браузера в самий верх [x:0, y:0] прямо на старті
    window.scrollTo(0, 0);

    // 2. Ініціалізуємо плавний скрол Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Примусово кажемо Lenis миттєво стати в позицію 0 (top) без анімації
    lenis.scrollTo(0, { immediate: true });

    // Запускаємо цикл анімації скролу
    function raf(time: number) {
      lenis.raster(time); // Або lenis.raf(time) залежно від версії, для нових версій використовується lenis.raf
      // Якщо в консолі буде варнінг на raster, заміни цей рядок на: lenis.raf(time)
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Чистимо за собою при демонтажі компонента
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
