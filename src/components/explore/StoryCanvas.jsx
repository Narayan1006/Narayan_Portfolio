/**
 * StoryCanvas — Cinematic 3D Sculpture Canvas for /explore
 *
 * Architecture:
 * - Single unified sculpture object (no detached body parts or morphs)
 * - Occupies ~55-65% of viewport as the visual anchor
 * - Model, Camera, Lighting, and Environment states separated cleanly
 * - Smooth damp/lerp in useFrame toward targets updated by GSAP ScrollTrigger
 * - Additive subtle idle floating (never overrides story positioning)
 */
import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function SculptureMesh({ storyStateRef }) {
  const { scene } = useGLTF("/model.glb");
  const modelRef = useRef();
  const { camera } = useThree();
  const initialized = useRef(false);

  // Normalized base scale and offset to center the sculpture at origin
  const baseScale = useRef(1);
  const modelOffset = useRef(new THREE.Vector3());

  // Cloned scene to maintain isolation
  const clonedScene = useRef(null);
  if (!clonedScene.current) {
    clonedScene.current = scene.clone(true);
  }

  // Setup bounding box, centering offset, and base scale
  useEffect(() => {
    if (!clonedScene.current || !modelRef.current || initialized.current) return;

    const s = clonedScene.current;

    s.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = false;
        // High quality shadow and material settings
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness || 0.4, 0.35);
          child.material.metalness = Math.min(child.material.metalness || 0.1, 0.25);
        }
      }
    });

    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fovRad = (camera.fov * Math.PI) / 180;
    const dist = 6.5; // reference camera distance
    const frustumH = 2 * dist * Math.tan(fovRad / 2);

    // Scale model so it commands ~55-65% of the viewport height naturally
    const scale = (frustumH * 0.92) / maxDim;
    baseScale.current = scale;

    // Centering offset: shift geometry so center of the bust is at local (0, 0, 0)
    modelOffset.current.set(-center.x, -center.y, -center.z);

    // Initialize rotation face-toward-viewer immediately
    modelRef.current.rotation.set(-0.12, Math.PI + 0.55, 0);
    modelRef.current.scale.setScalar(scale);

    initialized.current = true;
  }, [camera]);

  useFrame((state) => {
    if (!modelRef.current || !storyStateRef.current || !initialized.current) return;

    const { model } = storyStateRef.current;
    const time = state.clock.getElapsedTime();

    // ── 1. ADDITIVE IDLE FLOATING (Ultra-smooth & subtle) ──
    // Floating movement is strictly additive so it never overrides or fights scroll positioning
    const idleY = Math.sin(time * 0.6) * 0.04;
    const idleRotY = Math.sin(time * 0.4) * 0.015;
    const idleRotX = Math.cos(time * 0.5) * 0.008;

    // ── 2. POSITION DAMPING (Lerp toward target + additive idle) ──
    const targetX = model.posX;
    const targetY = model.posY + idleY;
    const targetZ = model.posZ;

    modelRef.current.position.x = THREE.MathUtils.lerp(modelRef.current.position.x, targetX, 0.07);
    modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetY, 0.07);
    modelRef.current.position.z = THREE.MathUtils.lerp(modelRef.current.position.z, targetZ, 0.07);

    // ── 3. ROTATION DAMPING ──
    const targetRotX = model.rotX + idleRotX;
    const targetRotY = model.rotY + idleRotY;
    const targetRotZ = model.rotZ;

    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRotX, 0.06);
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRotY, 0.06);
    modelRef.current.rotation.z = THREE.MathUtils.lerp(modelRef.current.rotation.z, targetRotZ, 0.06);

    // ── 4. SCALE DAMPING ──
    const currentTargetScale = baseScale.current * model.scale;
    modelRef.current.scale.setScalar(
      THREE.MathUtils.lerp(modelRef.current.scale.x, currentTargetScale, 0.08)
    );
  });

  return (
    <group
      ref={modelRef}
      onClick={(e) => {
        e.stopPropagation();
        if (onModelClick) onModelClick();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Internal group to center geometry at origin */}
      <group position={[modelOffset.current.x, modelOffset.current.y, modelOffset.current.z]}>
        <primitive object={clonedScene.current} />
      </group>
    </group>
  );
}

function CinematicRig({ storyStateRef }) {
  const { camera, gl } = useThree();

  const ambientRef = useRef();
  const keyLightRef = useRef();
  const fillLightRef = useRef();
  const rimLightRef = useRef();

  useFrame(() => {
    if (!storyStateRef.current) return;
    const { camera: camTarget, lighting, environment } = storyStateRef.current;

    // ── CAMERA DAMPING ──
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camTarget.posX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camTarget.posY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camTarget.posZ, 0.06);

    // ── ENVIRONMENT BACKGROUND COLOR ──
    if (environment.bgColor) {
      const currentClear = gl.getClearColor(new THREE.Color());
      const targetClear = new THREE.Color(environment.bgColor);
      currentClear.lerp(targetClear, 0.06);
      gl.setClearColor(currentClear, 1);
    }

    // ── DYNAMIC LIGHTING MORPHING ──
    if (ambientRef.current && lighting.ambientColor) {
      ambientRef.current.color.lerp(new THREE.Color(lighting.ambientColor), 0.06);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        lighting.ambientIntensity,
        0.06
      );
    }

    if (keyLightRef.current && lighting.keyColor) {
      keyLightRef.current.color.lerp(new THREE.Color(lighting.keyColor), 0.06);
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        lighting.keyIntensity,
        0.06
      );
      keyLightRef.current.position.x = THREE.MathUtils.lerp(keyLightRef.current.position.x, lighting.keyPosX, 0.06);
      keyLightRef.current.position.y = THREE.MathUtils.lerp(keyLightRef.current.position.y, lighting.keyPosY, 0.06);
      keyLightRef.current.position.z = THREE.MathUtils.lerp(keyLightRef.current.position.z, lighting.keyPosZ, 0.06);
    }

    if (fillLightRef.current && lighting.fillColor) {
      fillLightRef.current.color.lerp(new THREE.Color(lighting.fillColor), 0.06);
      fillLightRef.current.intensity = THREE.MathUtils.lerp(
        fillLightRef.current.intensity,
        lighting.fillIntensity,
        0.06
      );
      fillLightRef.current.position.x = THREE.MathUtils.lerp(fillLightRef.current.position.x, lighting.fillPosX, 0.06);
      fillLightRef.current.position.y = THREE.MathUtils.lerp(fillLightRef.current.position.y, lighting.fillPosY, 0.06);
      fillLightRef.current.position.z = THREE.MathUtils.lerp(fillLightRef.current.position.z, lighting.fillPosZ, 0.06);
    }

    if (rimLightRef.current && lighting.rimColor) {
      rimLightRef.current.color.lerp(new THREE.Color(lighting.rimColor), 0.06);
      rimLightRef.current.intensity = THREE.MathUtils.lerp(
        rimLightRef.current.intensity,
        lighting.rimIntensity,
        0.06
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={2.0} color="#FFFFFF" />
      <directionalLight ref={keyLightRef} position={[-3, 5, 4]} intensity={4.5} color="#FFFDF8" />
      <directionalLight ref={fillLightRef} position={[3, -2, -2]} intensity={2.0} color="#4A7A3A" />
      <pointLight ref={rimLightRef} position={[0, 4, -3]} intensity={2.5} color="#6B9A55" />
    </>
  );
}

function RendererDisposer() {
  const { gl } = useThree();
  useEffect(() => {
    return () => {
      gl.dispose();
      gl.forceContextLoss();
    };
  }, [gl]);
  return null;
}

export default function StoryCanvas({ storyStateRef }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <RendererDisposer />
        <CinematicRig storyStateRef={storyStateRef} />
        <Suspense fallback={null}>
          <SculptureMesh storyStateRef={storyStateRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/model.glb");
