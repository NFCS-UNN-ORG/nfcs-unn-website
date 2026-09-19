import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { PageTab } from '../types';

const MODEL_PATH = '/models/st_bartholomew-the-less_interior.glb';
useGLTF.preload(MODEL_PATH);

// Exact center constants of st_bartholomew-the-less_interior.glb
const MODEL_CENTER_X = 2.17397;
const MODEL_CENTER_Y = 4.52557;
const MODEL_CENTER_Z = -1.94404;

export interface ChurchHero3DProps {
  scrollProgressRef?: React.MutableRefObject<number>;
  activeTab?: PageTab;
  onIntroComplete?: () => void;
  onLoaded?: () => void;
}

function ChurchModel({
  scrollProgressRef,
  activeTab,
  onIntroComplete,
  onLoaded,
}: {
  scrollProgressRef?: React.MutableRefObject<number>;
  activeTab?: PageTab;
  onIntroComplete?: () => void;
  onLoaded?: () => void;
}) {
  const { scene } = useGLTF(MODEL_PATH);
  const introStartTime = useRef<number | null>(null);
  const introCompleteRef = useRef(false);
  const onLoadedNotified = useRef(false);

  // Mouse parallax state
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Camera lookAt tracking for smooth orientation transitions
  const currentLookAt = useRef(new THREE.Vector3(0, -4.0, -13));

  // Clone and configure materials once in useMemo for rock-solid stability
  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.position.set(-MODEL_CENTER_X, -MODEL_CENTER_Y, -MODEL_CENTER_Z);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.frustumCulled = false; // Prevents meshes disappearing when camera pans inside
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => {
            m.side = THREE.DoubleSide;
            m.depthWrite = true;
            m.depthTest = true;
          });
        }
      }
    });
    return clone;
  }, [scene]);

  // Listen to mousemove for subtle parallax panning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Notify parent only once that model is ready
  useEffect(() => {
    if (!onLoadedNotified.current && onLoaded) {
      onLoadedNotified.current = true;
      onLoaded();
    }
  }, [onLoaded]);

  useFrame((state, delta) => {
    if (introStartTime.current === null) {
      introStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - introStartTime.current;
    // Initial cinematic entrance zoom down the central aisle towards the altar
    const introDuration = 2.0;
    const rawT = Math.min(Math.max(elapsed / introDuration, 0), 1);
    const introT = 1 - Math.pow(1 - rawT, 3);

    if (rawT >= 1 && !introCompleteRef.current) {
      introCompleteRef.current = true;
      if (onIntroComplete) onIntroComplete();
    }

    // Camera initial zoom: starts at entrance (Z = 8.5) and glides down aisle to settledZ = 4.8
    const initialZ = 8.5;
    const settledZ = 4.8;
    const currentIntroZ = THREE.MathUtils.lerp(initialZ, settledZ, introT);

    // Safe, validated scroll progress (always finite and clamped 0 to 1)
    const rawScroll = scrollProgressRef?.current ?? 0;
    const scrollP = Number.isFinite(rawScroll) ? Math.min(Math.max(rawScroll, 0), 1) : 0;

    // Mouse parallax dampening
    const safeDelta = Math.min(delta || 0.016, 0.1);
    mouseRef.current.x = THREE.MathUtils.damp(mouseRef.current.x, mouseRef.current.targetX, 3.0, safeDelta);
    mouseRef.current.y = THREE.MathUtils.damp(mouseRef.current.y, mouseRef.current.targetY, 3.0, safeDelta);

    const mousePanX = mouseRef.current.x * 0.35;
    const mousePanY = -mouseRef.current.y * 0.22;

    // Base position
    const targetX = -1.8 * scrollP + mousePanX;
    const targetZ = currentIntroZ - scrollP * 3.2;
    const targetY = -3.6 + Math.sin(scrollP * Math.PI) * 0.25 + mousePanY;

    // Smooth position interpolation
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 3.5, safeDelta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 3.5, safeDelta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3.5, safeDelta);

    // Check tab for camera orientation
    const isStructure =
      activeTab === 'structure' ||
      [
        'mass-confession',
        'prayer-request',
        'fellowship',
        'organs',
        'societies',
        'faculties',
        'mentorship',
        'academic-support',
        'forums',
        'alumni',
      ].includes(activeTab || '');

    const isGetInvolved = activeTab === 'get-involved';
    const isContact = activeTab === 'contact';

    let targetLookX = 0;
    let targetLookY = -4.0;
    let targetLookZ = -13;

    if (isStructure) {
      // Face 90 degrees (facing right along +X axis)
      targetLookX = state.camera.position.x + 18;
      targetLookY = -3.6 + mousePanY * 2;
      targetLookZ = state.camera.position.z - mousePanX * 2;
    } else if (isGetInvolved) {
      // Face 270 degrees / -90 degrees (facing left along -X axis)
      targetLookX = state.camera.position.x - 18;
      targetLookY = -3.6 + mousePanY * 2;
      targetLookZ = state.camera.position.z + mousePanX * 2;
    } else if (isContact) {
      // Face the ceiling (facing straight up along +Y axis)
      targetLookX = state.camera.position.x + mousePanX * 2;
      targetLookY = 16;
      targetLookZ = state.camera.position.z + mousePanY * 2;
    } else {
      // Default: face down the center aisle towards the altar (Z = -13, Y = -4.0)
      targetLookX = -0.8 * scrollP + mousePanX * 2;
      targetLookY = -4.0 + mousePanY * 2;
      targetLookZ = -13;
    }

    // Smoothly damp lookAt
    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookX, 2.5, safeDelta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookY, 2.5, safeDelta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookZ, 2.5, safeDelta);

    state.camera.lookAt(currentLookAt.current.x, currentLookAt.current.y, currentLookAt.current.z);
  });

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <primitive object={model} />
    </group>
  );
}

export const ChurchHero3D: React.FC<ChurchHero3DProps> = ({
  scrollProgressRef,
  activeTab,
  onIntroComplete,
  onLoaded,
}) => {
  const [dpr, setDpr] = useState(1);
  const [cameraFov, setCameraFov] = useState(58);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Limit DPR to 1.5 to prevent high-DPI GPU throttling
      setDpr(Math.min(window.devicePixelRatio || 1, 1.5));
      const updateFov = () => {
        // Wider FOV gives farther, more expansive view of the sanctuary
        setCameraFov(window.innerWidth < 768 ? 78 : 58);
      };
      updateFov();
      window.addEventListener('resize', updateFov);
      return () => window.removeEventListener('resize', updateFov);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden bg-[#080A26]"
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, -3.6, 8.5], fov: cameraFov }}
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#080A26']} />
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.4} color="#FFF5E0" />
        <Suspense fallback={null}>
          <ChurchModel
            scrollProgressRef={scrollProgressRef}
            activeTab={activeTab}
            onIntroComplete={onIntroComplete}
            onLoaded={onLoaded}
          />
        </Suspense>
      </Canvas>

      {/* Cinematic dark theme overlay with gentle bottom depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080A26]/40 via-transparent to-[#080A26]/75 pointer-events-none" />
    </div>
  );
};
