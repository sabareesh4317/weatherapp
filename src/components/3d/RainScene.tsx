import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const RainScene: React.FC = () => {
  const rainCount = 1000;
  const rainRef = useRef<THREE.Points>(null);
  
  const rainGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);
    const velocities = new Float32Array(rainCount);
    
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = Math.random() * 20 - 10;
      positions[i * 3 + 1] = Math.random() * 20 - 10;
      positions[i * 3 + 2] = Math.random() * 20 - 10;
      velocities[i] = 0.1 + Math.random() / 5;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    
    return geo;
  }, [rainCount]);
  
  const rainMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });
  }, []);
  
  useFrame(() => {
    if (!rainRef.current) return;
    
    const positions = rainRef.current.geometry.attributes.position;
    const velocities = rainRef.current.geometry.attributes.velocity;
    
    for (let i = 0; i < rainCount; i++) {
      positions.array[i * 3 + 1] -= velocities.array[i];
      
      if (positions.array[i * 3 + 1] < -10) {
        positions.array[i * 3 + 1] = 10;
      }
    }
    
    positions.needsUpdate = true;
  });
  
  return (
    <>
      <color attach="background" args={['#203050']} />
      <fog attach="fog" args={['#203050', 5, 30]} />
      
      <points ref={rainRef} geometry={rainGeo} material={rainMaterial} />
      
      <group position={[0, -2, 0]}>
        <Cloud position={[-4, 2, 0]} args={[3, 2]} opacity={0.8} />
        <Cloud position={[4, 3, -6]} args={[3, 2]} opacity={0.7} />
        <Cloud position={[0, 6, -10]} args={[4, 2]} opacity={0.5} />
      </group>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#203050" />
      </mesh>
    </>
  );
};