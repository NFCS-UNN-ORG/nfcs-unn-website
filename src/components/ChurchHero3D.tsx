import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/st_bartholomew-the-less_interior.glb';
useGLTF.preload(MODEL_PATH);

// Exact center constants of st_bartholomew-the-less_interior.glb
const MODEL_CENTER_X = 2.17397;
const MODEL_CENTER_Y = 4.52557;
const MODEL_CENTER_Z = -1.94404;

interface ChurchHero3DProps {
  scrollProgressRef: React.MutableRefObject<number>;
  onIntroComplete?: () => void;
  onLoaded?: () => void;
}

function ChurchModel({
  scrollProgressRef,
  onIntroComplete,
  onLoaded,
}: {
  scrollProgressRef: React.MutableRefObject<number>;
  onIntroComplete?: () => void;
  onLoaded?: () => void;
}) {
  const { scene } = useGLTF(MODEL_PATH);
  const introStartTime = useRef<number | null>(null);
  const introCompleteRef = useRef(false);

  // Center the scene once in local coordinates (before rotation)
  const isCentered = useRef(false);
  if (!isCentered.current) {
    scene.position.set(-MODEL_CENTER_X, -MODEL_CENTER_Y, -MODEL_CENTER_Z);
    isCentered.current = true;
  }

  // Configure materials and disable frustum culling on interior meshes
  useEffect(() => {
    scene.traverse((child) => {
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
    // Notify that the 3D model is loaded and prepared
    if (onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  useFrame((state, delta) => {
    if (introStartTime.current === null) {
      introStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - introStartTime.current;
    // Initial cinematic entrance zoom down the central aisle towards the altar
    const introDuration = 2.2;
    const rawT = Math.min(Math.max(elapsed / introDuration, 0), 1);
    // Smooth ease-out cubic
    const introT = 1 - Math.pow(1 - rawT, 3);

    if (rawT >= 1 && !introCompleteRef.current) {
      introCompleteRef.current = true;
      if (onIntroComplete) onIntroComplete();
    }

    // Camera initial zoom: starts at Z = 7.0 (entrance nave), smoothly glides down the center aisle to Z = 3.2
    const initialZ = 7.0;
    const settledZ = 3.2;
    const currentIntroZ = THREE.MathUtils.lerp(initialZ, settledZ, introT);

    // Safe, validated scroll progress (always finite and clamped 0 to 1)
    const rawScroll = scrollProgressRef.current;
    const scrollP = Number.isFinite(rawScroll) ? Math.min(Math.max(rawScroll, 0), 1) : 0;

    // Requirement: parallax scroll of panning to the right when user scrolls up
    // Scrolling down -> targetX moves left (-1.8 * scrollP)
    // Scrolling up -> targetX moves right back to 0
    const targetX = -1.8 * scrollP;
    const targetZ = currentIntroZ - scrollP * 2.8;
    // Eye level inside church aisle: Floor is at -5.75, camera is at -3.8 (standing eye height)
    const targetY = -3.8 + Math.sin(scrollP * Math.PI) * 0.25;

    // Smooth position interpolation
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 4.0, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY, 4.0, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4.0, delta);

    // Look directly down the center aisle towards the altar (Z = -13, Y = -4.2)
    const lookTargetX = -0.8 * scrollP;
    state.camera.lookAt(lookTargetX, -4.2, -13);
  });

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export const ChurchHero3D: React.FC<ChurchHero3DProps> = ({
  scrollProgressRef,
  onIntroComplete,
  onLoaded,
}) => {
  const [dpr, setDpr] = useState(1);
  const [cameraFov, setCameraFov] = useState(50);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Limit DPR to 1.5 to prevent high-DPI GPU throttling
      setDpr(Math.min(window.devicePixelRatio || 1, 1.5));
      const updateFov = () => {
        setCameraFov(window.innerWidth < 768 ? 62 : 50);
      };
      updateFov();
      window.addEventListener('resize', updateFov);
      return () => window.removeEventListener('resize', updateFov);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden"
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, -3.8, 7.0], fov: cameraFov }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFF5E0" />
          <ChurchModel
            scrollProgressRef={scrollProgressRef}
            onIntroComplete={onIntroComplete}
            onLoaded={onLoaded}
          />
        </Canvas>
      </Suspense>

      {/* Cinematic dark theme overlay with gentle bottom depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080A26]/40 via-transparent to-[#080A26]/75 pointer-events-none" />
    </div>
  );
};
