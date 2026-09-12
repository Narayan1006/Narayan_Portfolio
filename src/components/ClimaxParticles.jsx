/**
 * ClimaxParticles
 *
 * Standalone radial burst particle system for climax state.
 * Completely decoupled from the model mesh — no bone/morph references.
 * Driven purely by time elapsed since activation.
 *
 * Props:
 *   active   — boolean, mount/unmount triggers burst
 *   origin   — THREE.Vector3 world position to burst from (model center approx)
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT  = 60;
const BURST_SPEED_MIN = 0.8;
const BURST_SPEED_MAX = 3.2;
const LIFETIME        = 1.4; // seconds per cycle before reset
const DRAG            = 0.94; // velocity multiplier per frame (60fps basis)
const COLOR_START     = new THREE.Color("#6FCF55");
const COLOR_END       = new THREE.Color("#4A7A3A");

function buildParticles() {
  const positions  = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = new Float32Array(PARTICLE_COUNT * 3);
  const ages       = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Random unit sphere direction
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const speed = BURST_SPEED_MIN + Math.random() * (BURST_SPEED_MAX - BURST_SPEED_MIN);

    velocities[i * 3]     = Math.sin(phi) * Math.cos(theta) * speed;
    velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
    velocities[i * 3 + 2] = Math.cos(phi) * speed;

    // Stagger age so they don"t all reset simultaneously
    ages[i] = Math.random() * LIFETIME;

    positions[i * 3]     = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
  }

  return { positions, velocities, ages };
}

function BurstPoints({ origin }) {
  const pointsRef = useRef();
  const data      = useRef(null);
  if (!data.current) data.current = buildParticles();

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pa  = pointsRef.current.geometry.attributes.position;
    const d   = data.current;
    const drag = Math.pow(DRAG, delta * 60);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      d.ages[i] += delta;

      if (d.ages[i] > LIFETIME) {
        // Reset particle to origin
        d.ages[i] = 0;
        pa.setXYZ(i, origin.x, origin.y, origin.z);
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.acos(2 * Math.random() - 1);
        const speed = BURST_SPEED_MIN + Math.random() * (BURST_SPEED_MAX - BURST_SPEED_MIN);
        d.velocities[i * 3]     = Math.sin(phi) * Math.cos(theta) * speed;
        d.velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
        d.velocities[i * 3 + 2] = Math.cos(phi) * speed;
        continue;
      }

      // Integrate position
      const vx = d.velocities[i * 3]     * drag;
      const vy = d.velocities[i * 3 + 1] * drag;
      const vz = d.velocities[i * 3 + 2] * drag;
      d.velocities[i * 3]     = vx;
      d.velocities[i * 3 + 1] = vy;
      d.velocities[i * 3 + 2] = vz;

      pa.setXYZ(
        i,
        pa.getX(i) + vx * delta,
        pa.getY(i) + vy * delta,
        pa.getZ(i) + vz * delta,
      );
    }

    pa.needsUpdate = true;

    // Pulse color and opacity based on avg age
    const mat = pointsRef.current.material;
    const avgLife = d.ages.reduce((a, b) => a + b, 0) / PARTICLE_COUNT / LIFETIME;
    const c = COLOR_START.clone().lerp(COLOR_END, avgLife);
    mat.color.set(c);
    mat.opacity = 0.85 - avgLife * 0.4;
  });

  const initPos = new Float32Array(PARTICLE_COUNT * 3).fill(0);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={initPos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        color={COLOR_START}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ClimaxParticles({ active, origin = new THREE.Vector3(0, 0, 0) }) {
  if (!active) return null;
  return <BurstPoints origin={origin} />;
}
