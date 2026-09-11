import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

// User-provided 3D model in /public/models/
export const MODEL_URL: string | null = '/models/ferris_wheel.glb';

function CustomGLTFModel({ url, startAnimation = true }: { url: string; startAnimation?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);

  // Play embedded rotation animation (e.g. 'Take 001' on ferris wheel)
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      const action = actions[names[0]];
      if (startAnimation) {
        action?.reset().fadeIn(0.8).play();
        action?.setEffectiveTimeScale(0.36); // Smooth, majestic carnival rotation
      } else {
        action?.stop();
      }
    }
  }, [actions, names, startAnimation]);

  // Normalize scale to fit the hero viewport frustum (~3.4 units)
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? 3.4 / maxDim : 1;
  }, [scene]);

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

useGLTF.preload('/models/ferris_wheel.glb');

interface ScrollHeroModelProps {
  scrollProgressRef: React.MutableRefObject<number>;
  isBookedOrScrolled: boolean;
  reducedMotion?: boolean;
  onIntroComplete?: () => void;
  startAnimation?: boolean;
}

export const ScrollHeroModel: React.FC<ScrollHeroModelProps> = ({
  scrollProgressRef,
  isBookedOrScrolled,
  reducedMotion = false,
  onIntroComplete,
  startAnimation = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const introFinishedRef = useRef(false);

  // Time tracker for the intro animation
  const introStartTime = useRef<number | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!startAnimation) {
      introStartTime.current = null;
      groupRef.current.visible = false;
      return;
    }

    groupRef.current.visible = true;

    if (introStartTime.current === null) {
      introStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - introStartTime.current;
    const introDuration = 1.65; // Reduced speed by 10% (1.5s -> 1.65s) for a smoother entrance
    const rawIntroT = Math.min(Math.max(elapsed / introDuration, 0), 1);

    // Easing: Accelerates smoothly then settles into place facing the user (ease-out cubic)
    const introProgress = reducedMotion ? 1 : 1 - Math.pow(1 - rawIntroT, 3);

    if (rawIntroT >= 1 && !introFinishedRef.current) {
      introFinishedRef.current = true;
      onIntroComplete?.();
    }

    // Scroll / Book trigger progression (0 at top hero -> 1 when scrolled into form)
    const rawScroll = Math.min(Math.max(scrollProgressRef.current || 0, 0), 1);
    const normalizedScroll = Math.min(rawScroll / 0.45, 1);
    const transitionFactor = isBookedOrScrolled
      ? Math.max(normalizedScroll, 0.85)
      : normalizedScroll;

    // --- 1. INITIAL VIEW -> PLACED SCENE FACING USER ---
    // Start state (t=0): Top of model fills background (close up, shifted down, tilted)
    // Placed state (t=1): Centered, facing user directly with 20 deg tilt towards user
    const startY = -2.2;
    const targetPlacedY = 0.05;
    const currentBaseY = THREE.MathUtils.lerp(startY, targetPlacedY, introProgress);

    const startZ = 2.1;
    const targetPlacedZ = 0.0;
    const currentBaseZ = THREE.MathUtils.lerp(startZ, targetPlacedZ, introProgress);

    const startScale = 2.5;
    const targetPlacedScale = 1.25;
    const currentBaseScale = THREE.MathUtils.lerp(startScale, targetPlacedScale, introProgress);

    // --- 2. ROTATION & SECOND ANIMATION ---
    // User requested: "When the model has fully [loaded] the x: 20deg towards me, while preserve other dimensions"
    const degToRad = (deg: number) => (deg * Math.PI) / 180;
    const baseSettledRotX = degToRad(20); // 20 deg tilted towards user
    const targetRotX = degToRad(-20);
    const targetRotY = degToRad(20);

    const finalScale = THREE.MathUtils.lerp(currentBaseScale, 0.92, transitionFactor);
    const finalY = THREE.MathUtils.lerp(currentBaseY, 0.2, transitionFactor);
    const finalZ = THREE.MathUtils.lerp(currentBaseZ, -0.9, transitionFactor);
    const finalX = THREE.MathUtils.lerp(0, 0.35, transitionFactor);

    // Apply scale and position with smooth lerp
    groupRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, finalScale), 0.09);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, finalX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, finalY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, finalZ, 0.08);

    // Apply Rotation:
    // During intro: transitions into 20 deg X tilt towards user
    // On scroll / button click: smoothly transitions into (-20 deg X, 20 deg Y)
    if (introProgress < 1) {
      const introRotX = THREE.MathUtils.lerp(degToRad(34), baseSettledRotX, introProgress);
      groupRef.current.rotation.x = introRotX;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(degToRad(-15), 0, introProgress);
    } else {
      const idleWobble = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
      const targetCurrRotX = THREE.MathUtils.lerp(baseSettledRotX, targetRotX, transitionFactor) + idleWobble;
      const targetCurrRotY =
        THREE.MathUtils.lerp(0, targetRotY, transitionFactor) +
        (reducedMotion ? 0 : Math.cos(state.clock.elapsedTime * 0.6) * 0.04);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetCurrRotX, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetCurrRotY, 0.08);
    }

    // Material Opacity: keeps a rich, luminous presence behind the frosted glass
    if (materialRef.current) {
      const targetOpacity = THREE.MathUtils.lerp(1.0, 0.75, transitionFactor);
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2.2, 2.1]} scale={[2.5, 2.5, 2.5]}>
      <Float speed={reducedMotion ? 0 : 1.8} rotationIntensity={0.3} floatIntensity={0.5}>
        {MODEL_URL ? (
          <Suspense fallback={null}>
            <CustomGLTFModel url={MODEL_URL} startAnimation={startAnimation} />
          </Suspense>
        ) : (
          <>
            {/* Core Glowing Geometry (Torus Knot with Distort Material in brand accent #4D2EAB) */}
            <mesh ref={meshRef} castShadow receiveShadow>
              <torusKnotGeometry args={[1.35, 0.42, 160, 32, 2, 3]} />
              <MeshDistortMaterial
                ref={materialRef}
                color="#4D2EAB"
                emissive="#240D6B"
                emissiveIntensity={0.8}
                roughness={0.12}
                metalness={0.88}
                distort={reducedMotion ? 0 : 0.32}
                speed={reducedMotion ? 0 : 1.6}
                transparent
                opacity={1}
              />
            </mesh>

            {/* Outer Orbital Ring in Lavender Accent #B79EFF */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[2.3, 0.038, 16, 100]} />
              <meshStandardMaterial
                color="#B79EFF"
                emissive="#6F43EE"
                emissiveIntensity={0.9}
                roughness={0.2}
                metalness={0.9}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Secondary Cross Ring in #DCD1FF */}
            <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
              <torusGeometry args={[2.55, 0.024, 16, 100]} />
              <meshStandardMaterial
                color="#DCD1FF"
                emissive="#4D2EAB"
                emissiveIntensity={0.6}
                roughness={0.3}
                metalness={0.8}
                transparent
                opacity={0.6}
              />
            </mesh>
          </>
        )}
      </Float>
    </group>
  );
};

export default ScrollHeroModel;
