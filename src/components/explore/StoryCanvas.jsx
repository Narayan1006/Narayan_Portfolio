import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Model mesh component driven by storyStateRef
function StoryModelMesh({ storyStateRef }) {
  const { scene } = useGLTF('/model.glb')
  const groupRef = useRef()
  const { camera } = useThree()
  const initialized = useRef(false)
  const baseScale = useRef(1)
  const basePos = useRef(new THREE.Vector3(0, 0, 0))

  // Clone GLB scene to prevent conflicts/shared mutation
  const clonedScene = useRef(null)
  if (!clonedScene.current) {
    clonedScene.current = scene.clone(true)
  }

  useEffect(() => {
    if (!clonedScene.current || !groupRef.current || initialized.current) return

    // Disable frustum culling
    clonedScene.current.traverse((child) => {
      if (child.isMesh) child.frustumCulled = false
    })

    // Compute bounding box & auto-scale
    const box = new THREE.Box3().setFromObject(clonedScene.current)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const fovRad = (camera.fov * Math.PI) / 180
    const dist = camera.position.z
    const frustumHeight = 2 * dist * Math.tan(fovRad / 2)

    baseScale.current = (frustumHeight * 1.2) / maxDim
    basePos.current.set(
      -center.x * baseScale.current,
      -center.y * baseScale.current - frustumHeight * 0.05,
      0
    )

    groupRef.current.scale.setScalar(baseScale.current)
    groupRef.current.position.copy(basePos.current)

    initialized.current = true
  }, [camera])

  // Continuous frame loop reading from GSAP animated storyStateRef
  useFrame((state) => {
    if (!groupRef.current || !storyStateRef.current) return

    const s = storyStateRef.current
    const now = state.clock.getElapsedTime()

    // Smooth lerp positions driven by GSAP scroll timeline
    const targetScale = baseScale.current * s.modelScale
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1))

    // Apply mouse parallax micro-movements (restrained)
    const mouseX = (state.pointer.x * 0.15)
    const mouseY = (state.pointer.y * 0.1)

    const targetX = basePos.current.x + s.modelPosX + mouseX
    const targetY = basePos.current.y + s.modelPosY + mouseY

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)

    // Apply rotation (base target + subtle idle breathing sway)
    const idleSway = Math.sin(now * 0.8) * 0.02
    const targetRotY = s.modelRotY + idleSway + (mouseX * 0.2)
    const targetRotX = s.modelRotX + (mouseY * 0.1)

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08)

    // Update Camera position dynamically
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, s.cameraZ, 0.08)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.5, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY * 0.5, 0.05)

    // Update Background Color dynamically
    state.gl.setClearColor(s.bgColor, 1)
  })

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene.current} />
    </group>
  )
}

// Particle field responding to scroll
function DynamicParticles({ count = 24 }) {
  const ref = useRef()
  const data = useRef(null)

  if (!data.current) {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      spd[i] = 0.15 + Math.random() * 0.35
    }
    data.current = { pos, spd }
  }

  useFrame((state, delta) => {
    if (!ref.current) return
    const pa = ref.current.geometry.attributes.position
    const t = state.clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      let y = pa.getY(i) - data.current.spd[i] * delta * 0.6
      let x = pa.getX(i) + Math.sin(t * data.current.spd[i] + i) * delta * 0.4
      if (y < -5) { y = 5; x = (Math.random() - 0.5) * 14 }
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
      <pointsMaterial size={0.12} color="#6B9A55" transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

export default function StoryCanvas({ storyStateRef }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={2.2} color="#F0EDE6" />
        <directionalLight position={[-2, 6, 4]} intensity={4.8} color="#FFFDF8" />
        <directionalLight position={[3, -2, -2]} intensity={1.5} color="#4A7A3A" />
        <StoryModelMesh storyStateRef={storyStateRef} />
        <DynamicParticles />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/model.glb')
