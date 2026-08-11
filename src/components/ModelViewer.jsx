import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'

function ModelMesh() {
  const { scene } = useGLTF('/model.glb')

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return (
    <primitive
      object={scene}
      scale={3.6}
      position={[0, 0.4, 0]}
    />
  )
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 8, 5]} intensity={3} color="#FAF8F5" castShadow />
        <directionalLight position={[-5, 3, -2]} intensity={2} color="#6B9A55" />
        <pointLight position={[0, -2, 2]} intensity={1.5} color="#D9A45C" />

        <Suspense fallback={null}>
          <ModelMesh />
        </Suspense>

        <OrbitControls
          autoRotate={false}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
