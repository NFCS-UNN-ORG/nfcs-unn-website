import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const CHEST_MODEL_URL = '/models/pirate_chest_full_of_gold_coins.glb';

/*
  Component structure generated from PMNDRS gltfjsx:
  Author: polish_farmer / Eryk Stańko (Sketchfab CC-BY-4.0)
  Nodes: Armature rootJoint + SkinnedMeshes (Object_11, 13, 15) + Decimated coin meshes (materials.coin)
*/
function PirateChestGLTF({ isVisible = true }: { isVisible?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(CHEST_MODEL_URL) as any;
  const scrollYRef = useRef(0);
  const introStartTime = useRef<number | null>(null);

  // Track window scroll for responsive 3D parallax depth
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!isVisible) {
      groupRef.current.visible = false;
      introStartTime.current = null;
      return;
    }

    groupRef.current.visible = true;

    // 1. Single first-load entrance animation
    if (introStartTime.current === null) {
      introStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - introStartTime.current;
    const introDuration = 1.15;
    const progress = Math.min(Math.max(elapsed / introDuration, 0), 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);

    // Slides up into place from below on first load
    const entranceY = THREE.MathUtils.lerp(-1.6, -0.05, easeOut);
    const entranceRotX = THREE.MathUtils.lerp(0.3, 0.08, easeOut);

    // 2. Parallax depth response on scroll
    const scroll = scrollYRef.current;
    const parallaxY = scroll * -0.0028;
    const parallaxZ = scroll * -0.002;
    const parallaxRotX = scroll * 0.0006;
    const parallaxRotY = scroll * 0.0004;

    // 3. Subtle stationary floating breath
    const idleFloat = Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
    const idleRotY = Math.cos(state.clock.elapsedTime * 1.1) * 0.04;

    groupRef.current.position.y = entranceY + parallaxY + idleFloat;
    groupRef.current.position.z = parallaxZ;
    groupRef.current.rotation.x = entranceRotX + parallaxRotX;
    groupRef.current.rotation.y = -0.15 + idleRotY + parallaxRotY;
  });

  return (
    <group ref={groupRef} position={[0, -1.6, 0]}>
      <Center top={false}>
        {/* Scale container from gltfjsx specification */}
        <group scale={0.012}>
          {/* Armature Root Joint & Skinned Chest Meshes */}
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            {nodes._rootJoint && <primitive object={nodes._rootJoint} />}
            {nodes.Object_11 && (
              <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Object_11.geometry}
                material={materials.chest}
                skeleton={nodes.Object_11.skeleton}
              />
            )}
            {nodes.Object_13 && (
              <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Object_13.geometry}
                material={materials.chest}
                skeleton={nodes.Object_13.skeleton}
              />
            )}
            {nodes.Object_15 && (
              <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Object_15.geometry}
                material={materials.chest}
                skeleton={nodes.Object_15.skeleton}
              />
            )}
          </group>

          {/* Individual Gold Coin Meshes */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION001_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION077_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION078_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION079_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION080_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION081_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION082_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION083_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION084_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION085_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION086_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION087_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION088_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION089_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION090_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION091_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION092_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION093_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION094_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION095_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION096_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION097_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION098_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION099_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION100_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION101_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION102_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION103_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION104_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION105_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION106_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION107_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION108_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION109_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION110_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION111_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION112_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION113_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION114_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION115_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION116_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION117_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION118_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION119_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION120_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION121_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION122_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION123_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION124_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION125_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION126_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION127_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION128_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION129_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION130_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION131_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION132_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION133_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION134_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION135_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION136_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION137_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION138_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION139_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION140_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION141_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION142_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION143_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION144_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION145_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION146_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION147_coin_0?.geometry}
            material={materials.coin}
            position={[0, -26.592, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION148_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION149_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION150_coin_0?.geometry}
            material={materials.coin}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.coin_DECIMATION151_coin_0?.geometry}
            material={materials.coin}
            position={[-51.45, 109.129, 66.101]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </Center>
    </group>
  );
}

useGLTF.preload(CHEST_MODEL_URL);

interface PirateChestModelProps {
  className?: string;
  isVisible?: boolean;
}

export const PirateChestModel: React.FC<PirateChestModelProps> = ({
  className = '',
  isVisible = true,
}) => {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDpr(Math.min(window.devicePixelRatio || 1, 2));
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative w-full max-w-xs sm:max-w-md h-36 sm:h-44 mx-auto my-0.5 pointer-events-none select-none z-10 ${className}`}
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 1.2, 3.4], fov: 40 }}
          onCreated={({ camera }) => {
            camera.lookAt(0, 0.1, 0);
          }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[5, 8, 5]} intensity={3.2} color="#FFF8D6" />
          <directionalLight position={[-5, 4, -3]} intensity={1.4} color="#166C16" />
          <pointLight position={[0, 2.2, 2.0]} intensity={3.0} color="#FBE202" />

          <PirateChestGLTF isVisible={isVisible} />
        </Canvas>
      </Suspense>
    </motion.div>
  );
};

export default PirateChestModel;
