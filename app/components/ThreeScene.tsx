'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  onReady?: () => void;
}

export default function ThreeScene({ onReady }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 1.5;

    let mesh: THREE.Mesh | null = null;
    const textureLoader = new THREE.TextureLoader();

    // Безпечне завантаження текстури з тригером готовності
    textureLoader.load(
      '/vibe.webp',
      (texture) => {
        const geometry = new THREE.PlaneGeometry(5.5, 3.2, 1, 1);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.45,
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Повідомляємо Hero та Preloader, що 3D-сцена успішно завантажена
        if (onReady) {
          setTimeout(() => {
            onReady();
          }, 100);
        }
      },
      undefined,
      (err) => {
        console.error("Помилка завантаження картинки vibe.webp. Перевірте папку public.", err);
        // Якщо сталася помилка, все одно пускаємо користувача на сайт, щоб не було вічного завантаження
        if (onReady) onReady();
      }
    );

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = ((event.clientX / window.innerWidth) - 0.5) * 0.1;
      mouseY = ((event.clientY / window.innerHeight) - 0.5) * 0.1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    const clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (mesh) {
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        mesh.position.x = targetX + Math.sin(elapsedTime * 0.3) * 0.005;
        mesh.position.y = -targetY + Math.cos(elapsedTime * 0.2) * 0.003;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onReady]);

  return <div ref={containerRef} className="absolute inset-0 -z-10 bg-black" />;
}
