import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const ClearScene: React.FC = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  
  // Create a simple sun texture
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: '#FDB813',
    emissive: '#FDB813',
    emissiveIntensity: 2,
  });
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Make the sun pulsate slightly
    if (sunRef.current) {
      sunRef.current.scale.x = 1 + Math.sin(time) * 0.05;
      sunRef.current.scale.y = 1 + Math.sin(time) * 0.05;
      sunRef.current.scale.z = 1 + Math.sin(time) * 0.05;
    }
    
    // Move the clouds slowly
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.05;
    }
  });
  
  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 5, 30]} />
      
      {/* Sun */}
      <mesh ref={sunRef} position={[8, 8, -10]}>
        <sphereGeometry args={[2, 32, 32]} />
        <primitive object={sunMaterial} />
      </mesh>
      
      {/* Ambient glow around sun */}
      <mesh position={[8, 8, -10.1]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial 
          color="#FDB813" 
          transparent 
          opacity={0.3} 
          depthWrite={false}
        />
      </mesh>
      
      {/* Clouds */}
      <group ref={cloudsRef}>
        <Cloud position={[-4, 2, 0]} args={[3, 2]} opacity={0.8} />
        <Cloud position={[4, 3, -6]} args={[3, 2]} opacity={0.7} />
        <Cloud position={[0, 6, -10]} args={[4, 2]} opacity={0.5} />
      </group>
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8FBC8F" />
      </mesh>
    </>
  );
};