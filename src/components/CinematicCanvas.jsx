import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Final resting angle (profile view, looking up-right)
const TARGET_ROT_Y = Math.PI + 0.55
const TARGET_ROT_X = -0.28
// Entrance start angle (facing away, will spin to front)
const ENTER_ROT_Y = TARGET_ROT_Y - Math.PI * 0.75
const ENTRANCE_DURATION = 2.0 // seconds

function ModelMesh({ onModelLoaded }) {
  const { scene } = useGLTF('/model.glb')
  const groupRef = useRef()
  const { camera } = useThree()
  const initialized = useRef(false)
  const entranceStart = useRef(null)

  useEffect(() => {
    if (!scene || !groupRef.current || initialized.current) return

    // Disable frustum culling
    scene.traverse((child) => {
      if (child.isMesh) child.frustumCulled = false
    })

    // Compute bounding box and auto-scale/position
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const fovRad = (camera.fov * Math.PI) / 180
    const dist = camera.position.z
    const frustumHeight = 2 * dist * Math.tan(fovRad / 2)
    const frustumWidth = frustumHeight * camera.aspect

    // Scale: fill ~135% of frustum height so model is large and naturally crops below waist
    const scale = (frustumHeight * 1.35) / maxDim
    groupRef.current.scale.setScalar(scale)

    // Position right of centre, head in upper half
    groupRef.current.position.set(
      -center.x * scale + frustumWidth * 0.20,
      -center.y * scale - frustumHeight * 0.08,
      0
    )

    // Set entrance start rotation — back of head facing camera
    groupRef.current.rotation.set(TARGET_ROT_X, ENTER_ROT_Y, 0)

    initialized.current = true
    if (onModelLoaded) onModelLoaded()
  }, [scene, camera, onModelLoaded])

  useFrame((state) => {
    if (!groupRef.current) return

    const now = state.clock.getElapsedTime()

    // Record when animation actually starts (after model ready)
    if (entranceStart.current === null && initialized.current) {
      entranceStart.current = now
    }
    if (entranceStart.current === null) return

    const elapsed = now - entranceStart.current
    const t = Math.min(elapsed / ENTRANCE_DURATION, 1)

    if (t < 1) {
      // Entrance: ease-out cubic spin into final pose
      const eased = 1 - Math.pow(1 - t, 3)
      groupRef.current.rotation.y = ENTER_ROT_Y + (TARGET_ROT_Y - ENTER_ROT_Y) * eased
      groupRef.current.rotation.x = TARGET_ROT_X
    } else {
      // Settled: gentle left-right rotation sway
      const swayY = Math.sin(now * 0.7) * 0.04
      const swayX = Math.cos(now * 0.5) * 0.015
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, TARGET_ROT_Y + swayY, 0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, TARGET_ROT_X + swayX, 0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

// Floating leaf particles
function Particles({ count = 22 }) {
  const ref = useRef()
  const data = useRef(null)

  if (!data.current) {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      spd[i] = 0.12 + Math.random() * 0.28
    }
    data.current = { pos, spd }
  }

  useFrame((state, delta) => {
    if (!ref.current) return
    const pa = ref.current.geometry.attributes.position
    const t = state.clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      let y = pa.getY(i) - data.current.spd[i] * delta * 0.55
      let x = pa.getX(i) + Math.sin(t * data.current.spd[i] + i) * delta * 0.35
      if (y < -4) { y = 4; x = (Math.random() - 0.5) * 12 }
      pa.setY(i, y)
      pa.setX(i, x)
    }
    pa.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={data.current.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.11} color="#4A7A3A" transparent opacity={0.72} sizeAttenuation />
    </points>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={2.6} color="#F0EDE6" />
      <directionalLight position={[-3, 6, 5]}  intensity={5.5} color="#FFFDF8" castShadow />
      <directionalLight position={[5, 2, -3]}  intensity={3.0} color="#C8C2B6" />
      <pointLight      position={[0, -3, 3]}   intensity={2.0} color="#4A7A3A" />
    </>
  )
}

export default function CinematicCanvas({ onModelLoaded }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42, near: 0.01, far: 2000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <Lights />
        <Particles count={22} />
        <ModelMesh onModelLoaded={onModelLoaded} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/model.glb')
