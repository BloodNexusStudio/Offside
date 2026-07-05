import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';

const FloatingObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshPhysicalMaterial 
          color="#0A0A0A" 
          metalness={0.9} 
          roughness={0.1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
        />
      </mesh>
    </Float>
  );
};

const ThreeDViewer = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative z-10 cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <FloatingObject />
        </PresentationControls>

        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-gray-400">
        Drag to rotate
      </div>
    </div>
  );
};

export default ThreeDViewer;
