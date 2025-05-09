import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const CloudsScene: React.FC = () => {
  const cloudsRef = useRef<THREE.Group>(null);
  const cloudMeshes = useRef<THREE.Mesh[]>([]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Move each cloud independently
    cloudMeshes.current.forEach((cloud, i) => {
      if (cloud) {
        // Different speeds and directions for each cloud
        const factor = i % 2 === 0 ? 1 : -1;
        const speed = 0.05 + (i * 0.01);
        cloud.position.x += Math.sin(time * speed) * 0.01 * factor;
        cloud.position.y += Math.cos(time * speed) * 0.005;
      }
    });
    
    // Rotate the entire cloud group slowly
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.03;
    }
  });
  
  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 1, 30]} />
      
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.8} />
      
      {/* Directional light to simulate sunlight */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FDB813" />
      
      {/* Cloud formations */}
      <group ref={cloudsRef}>
        <Cloud 
          ref={(el) => (cloudMeshes.current[0] = el as THREE.Mesh)} 
          position={[-4, 2, 0]} 
          args={[3, 2]} 
          opacity={0.9} 
        />
        <Cloud 
          ref={(el) => (cloudMeshes.current[1] = el as THREE.Mesh)} 
          position={[4, 3, -6]} 
          args={[3, 2]} 
          opacity={0.85} 
        />
        <Cloud 
          ref={(el) => (cloudMeshes.current[2] = el as THREE.Mesh)} 
          position={[0, 5, -10]} 
          args={[4, 2.5]} 
          opacity={0.8} 
        />
        <Cloud 
          ref={(el) => (cloudMeshes.current[3] = el as THREE.Mesh)} 
          position={[-6, 4, -5]} 
          args={[3.5, 2]} 
          opacity={0.75} 
        />
        <Cloud 
          ref={(el) => (cloudMeshes.current[4] = el as THREE.Mesh)} 
          position={[6, 6, -8]} 
          args={[3, 2]} 
          opacity={0.7} 
        />
      </group>
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8FBC8F" />
      </mesh>
    </>
  );
};