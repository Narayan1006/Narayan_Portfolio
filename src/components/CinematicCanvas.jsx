import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Final resting angle: model on RIGHT looks INWARD toward the left content & cards
const TARGET_ROT_Y = Math.PI + 0.08; // Turned inward toward center/left
const TARGET_ROT_X = -0.04;          // Chin leveled naturally
const ENTER_ROT_Y  = TARGET_ROT_Y - 0.5; // Smooth cinematic entrance
const ENTRANCE_DURATION = 1.8;

function SculptureMesh({ onModelLoaded }) {
  const { scene } = useGLTF("/model.glb");
  const modelRef = useRef();
  const { camera } = useThree();

  const initialized = useRef(false);
  const baseScale = useRef(1);
  const modelOffset = useRef(new THREE.Vector3());
  const entranceStart = useRef(null);

  // Setup bounding box, centering offset, and scale
  useEffect(() => {
    if (!scene || !modelRef.current || initialized.current) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness || 0.4, 0.35);
          child.material.metalness = Math.min(child.material.metalness || 0.1, 0.25);
        }
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fovRad = (camera.fov * Math.PI) / 180;
    const dist = camera.position.z;
    const frustumH = 2 * dist * Math.tan(fovRad / 2);
    const frustumW = frustumH * camera.aspect;

    // Scale so bust dominates ~55-60% of right viewport
    const scale = (frustumH * 0.95) / maxDim;
    baseScale.current = scale;

    // Center geometry inside local group
    modelOffset.current.set(-center.x, -center.y, -center.z);

    // Position on right half of the hero screen
    modelRef.current.position.set(frustumW * 0.18, -frustumH * 0.08, 0);
    modelRef.current.scale.setScalar(scale);
    modelRef.current.rotation.set(TARGET_ROT_X, ENTER_ROT_Y, 0);

    initialized.current = true;
    if (onModelLoaded) onModelLoaded();
  }, [scene, camera, onModelLoaded]);

  useFrame((state) => {
    if (!modelRef.current || !initialized.current) return;
    const now = state.clock.getElapsedTime();

    if (entranceStart.current === null) {
      entranceStart.current = now;
    }

    const elapsed = now - entranceStart.current;
    const t = Math.min(elapsed / ENTRANCE_DURATION, 1);

    if (t < 1) {
      // Smooth entrance spin
      const eased = 1 - Math.pow(1 - t, 3);
      modelRef.current.rotation.y = ENTER_ROT_Y + (TARGET_ROT_Y - ENTER_ROT_Y) * eased;
      modelRef.current.rotation.x = TARGET_ROT_X;
      return;
    }

    // Additive subtle idle floating & gentle sway
    const idleY = Math.sin(now * 0.6) * 0.035;
    const idleRotY = Math.sin(now * 0.45) * 0.02;
    const idleRotX = Math.cos(now * 0.5) * 0.01;

    // Micro cursor parallax
    const mx = state.pointer.x;
    const my = state.pointer.y;

    const targetRotY = TARGET_ROT_Y + idleRotY + mx * 0.35;
    const targetRotX = TARGET_ROT_X + idleRotX - my * 0.12;

    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, 0.06);
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, 0.06);
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      -0.08 + idleY + my * 0.05,
      0.06
    );
  });

  return (
    <group ref={modelRef}>
      <group position={[modelOffset.current.x, modelOffset.current.y, modelOffset.current.z]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={2.6} color="#F0EDE6" />
      <directionalLight position={[-3, 6, 5]} intensity={5.2} color="#FFFDF8" castShadow />
      <directionalLight position={[5, 2, -3]} intensity={2.8} color="#C8C2B6" />
      <pointLight position={[0, -2, 3]} intensity={2.2} color="#4A7A3A" />
    </>
  );
}

export default function CinematicCanvas({ onModelLoaded }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42, near: 0.01, far: 2000 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <Lights />
        <SculptureMesh onModelLoaded={onModelLoaded} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/model.glb");
