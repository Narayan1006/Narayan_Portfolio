import { useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { PROFILE, SUMMARY } from '../../data/recruiterData'

function Hero3DModel() {
  const { scene } = useGLTF('/model.glb')
  const groupRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (!scene || !groupRef.current) return
    scene.traverse((child) => {
      if (child.isMesh) child.frustumCulled = false
    })

    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)

    const maxDim = Math.max(size.x, size.y, size.z)
    const fovRad = (camera.fov * Math.PI) / 180
    const dist = camera.position.z
    const frustumHeight = 2 * dist * Math.tan(fovRad / 2)

    // Scaled appropriately for hero visual accent
    const scale = (frustumHeight * 1.1) / maxDim
    groupRef.current.scale.setScalar(scale)

    groupRef.current.position.set(
      -center.x * scale + 0.2,
      -center.y * scale - 0.3,
      0
    )

    groupRef.current.rotation.set(-0.25, Math.PI + 0.5, 0)
  }, [scene, camera])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

export default function RecruiterHero() {
  return (
    <section id="profile" className="relative min-h-[90vh] pt-32 pb-16 flex items-center justify-between overflow-hidden">
      
      {/* LEFT CONTENT */}
      <div className="w-full lg:w-3/5 space-y-8 z-10">
        
        {/* AVAILABILITY STATUS BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E5E0D5] border border-[#D0C9BA]">
          <span className="w-2 h-2 rounded-full bg-[#4A7A3A] animate-pulse" />
          <span className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest">
            {PROFILE.availability}
          </span>
        </div>

        {/* HEADINGS */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black italic tracking-tight text-[#1A1612] font-['Space_Grotesk'] leading-none">
            {PROFILE.name}
          </h1>
          <p className="label-mono text-sm sm:text-base font-bold text-[#4A7A3A] tracking-[0.25em]">
            {PROFILE.role} — <span className="text-[#5A5448] font-normal">{PROFILE.roleSubtitle}</span>
          </p>
        </div>

        {/* SUMMARY PARAGRAPH */}
        <p className="text-sm sm:text-base text-[#5A5448] leading-relaxed max-w-2xl">
          {SUMMARY}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#4A7A3A] hover:bg-[#3B632E] text-white label-mono text-xs font-bold rounded-lg shadow-sm transition-all duration-200"
          >
            DOWNLOAD RESUME ↓
          </a>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#1A1612] border border-[#D0C9BA] hover:border-[#1A1612] label-mono text-xs font-bold rounded-lg transition-all duration-200"
          >
            GITHUB →
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#1A1612] border border-[#D0C9BA] hover:border-[#1A1612] label-mono text-xs font-bold rounded-lg transition-all duration-200"
          >
            LINKEDIN →
          </a>
        </div>

        {/* METADATA STRIP */}
        <div className="pt-4 border-t border-[#D0C9BA]/60 flex flex-wrap gap-6 text-xs text-[#7A7468] label-mono">
          <div><span className="text-[#1A1612] font-bold">LOCATION:</span> {PROFILE.location}</div>
          <div><span className="text-[#1A1612] font-bold">EMAIL:</span> {PROFILE.email}</div>
        </div>

      </div>

      {/* RIGHT 3D MODEL ACCENT */}
      <div className="hidden lg:block w-2/5 h-[500px] relative pointer-events-none">
        <Canvas
          frameloop="demand"
          dpr={1}
          camera={{ position: [0, 0, 4.5], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={2.2} color="#F0EDE6" />
          <directionalLight position={[-2, 5, 4]} intensity={4.5} color="#FFFDF8" />
          <Hero3DModel />
        </Canvas>
      </div>

    </section>
  )
}

useGLTF.preload('/model.glb')
