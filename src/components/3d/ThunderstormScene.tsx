import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const ThunderstormScene: React.FC = () => {
  const rainCount = 1500;
  const rainRef = useRef<THREE.Points>(null);
  const lightningRef = useRef<THREE.Group>(null);
  const [lightning, setLightning] = useState(false);
  const cloudRefs = useRef<THREE.Mesh[]>([]);
  
  const rainGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);
    const velocities = new Float32Array(rainCount);
    
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = Math.random() * 20 - 10;
      positions[i * 3 + 1] = Math.random() * 20 - 10;
      positions[i * 3 + 2] = Math.random() * 20 - 10;
      velocities[i] = 0.2 + Math.random() / 2;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    
    return geo;
  }, [rainCount]);
  
  const rainMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    });
  }, []);
  
  // Lightning effect
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Handle rain
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position;
      const velocities = rainRef.current.geometry.attributes.velocity;
      
      for (let i = 0; i < rainCount; i++) {
        positions.array[i * 3 + 1] -= velocities.array[i];
        
        if (positions.array[i * 3 + 1] < -10) {
          positions.array[i * 3 + 1] = 10;
        }
      }
      
      positions.needsUpdate = true;
    }
    
    // Random lightning
    if (Math.random() > 0.995) {
      setLightning(true);
      setTimeout(() => setLightning(false), 200);
    }
    
    // Animate clouds
    cloudRefs.current.forEach((cloud, i) => {
      if (cloud) {
        cloud.position.x += Math.sin(time * 0.1 + i) * 0.01;
      }
    });
  });
  
  return (
    <>
      <color attach="background" args={['#1a1a2e']} />
      <fog attach="fog" args={['#1a1a2e', 1, 20]} />
      
      {/* Rain */}
      <points ref={rainRef} geometry={rainGeo} material={rainMaterial} />
      
      {/* Lightning */}
      {lightning && (
        <pointLight position={[0, 5, 0]} intensity={20} color="#a6e3fc" decay={1.5} />
      )}
      
      {/* Clouds */}
      <group>
        <Cloud ref={(el) => (cloudRefs.current[0] = el as THREE.Mesh)} position={[-4, 2, 0]} args={[3, 2]} opacity={0.9} color="#333333" />
        <Cloud ref={(el) => (cloudRefs.current[1] = el as THREE.Mesh)} position={[4, 3, -6]} args={[3, 2]} opacity={0.9} color="#333333" />
        <Cloud ref={(el) => (cloudRefs.current[2] = el as THREE.Mesh)} position={[0, 6, -10]} args={[4, 2]} opacity={0.9} color="#333333" />
        <Cloud ref={(el) => (cloudRefs.current[3] = el as THREE.Mesh)} position={[-5, 5, -8]} args={[3.5, 2]} opacity={0.9} color="#333333" />
      </group>
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </>
  );
};