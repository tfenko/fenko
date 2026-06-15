'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Наказуємо браузеру ЗАВЖДИ скидати скрол в нуль при перезавантаженні сторінки
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Примусово скролимо вікно браузера в самий верх прямо на старті
    window.scrollTo(0, 0);

    // Ініціалізуємо плавний скрол Lenis
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

    // Запускаємо чистий цикл анімації через єдиний актуальний метод .raf()
    function raf(time: number) {
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
