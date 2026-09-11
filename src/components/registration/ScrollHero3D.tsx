import React, { Suspense, useEffect, useRef, useState, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll, motion, useTransform } from 'framer-motion';
import { ScrollHeroModel } from './scroll-hero-model';

interface ScrollHero3DProps {
  isFormInteracting?: boolean;
  isBookedOrScrolled?: boolean;
  onIntroComplete?: () => void;
  startAnimation?: boolean;
}

export const ScrollHero3D: React.FC<ScrollHero3DProps> = memo(({
  isFormInteracting = false,
  isBookedOrScrolled = false,
  onIntroComplete,
  startAnimation = true,
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollProgressRef = useRef<number>(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Track global window scroll with framer-motion
  const { scrollYProgress } = useScroll();

  // Gentle opacity fade when scrolled towards form
  const domOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.88]);

  // Bridge framer-motion value to Three.js RAF
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      scrollProgressRef.current = latest;
    });
  }, [scrollYProgress]);

  const [dpr, setDpr] = useState(1);
  const [cameraFov, setCameraFov] = useState(25);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Cap DPR to 1.5 to eliminate high-DPI GPU fill-rate bottlenecks
      setDpr(Math.min(window.devicePixelRatio || 1, 1.5));
      const updateFov = () => {
        setCameraFov(window.innerWidth < 768 ? 45 : 20);
      };
      updateFov();
      window.addEventListener('resize', updateFov);
      return () => window.removeEventListener('resize', updateFov);
    }
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        opacity: domOpacity,
      }}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 will-change-[opacity]"
    >
      <Suspense fallback={null}>
        <Canvas
          frameloop={isFormInteracting ? 'never' : 'always'}
          dpr={dpr}
          camera={{ position: [0, 1.05, 5.2], fov: cameraFov }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0, 0);
          }}
          gl={{
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.95} />
          <directionalLight position={[10, 10, 6]} intensity={1.8} color="#FFFFFF" />
          <directionalLight position={[-10, -6, -5]} intensity={0.7} color="#166C16" />

          {/* Overhead Point Light illuminating the model from above */}
          <pointLight position={[0, 4.2, 3.2]} intensity={2.6} distance={18} decay={1.2} color="#FFFFFF" />
          <pointLight position={[0, 2, 3]} intensity={1.2} color="#FBE202" />

          <ScrollHeroModel
            scrollProgressRef={scrollProgressRef}
            isBookedOrScrolled={isBookedOrScrolled}
            reducedMotion={reducedMotion}
            onIntroComplete={onIntroComplete}
            startAnimation={startAnimation}
          />
        </Canvas>
      </Suspense>
    </motion.div>
  );
});

export default ScrollHero3D;
