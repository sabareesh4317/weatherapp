import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const SnowScene: React.FC = () => {
  const snowCount = 1000;
  const snowRef = useRef<THREE.Points>(null);
  
  const snowGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(snowCount * 3);
    const velocities = new Float32Array(snowCount);
    const rotations = new Float32Array(snowCount);
    
    for (let i = 0; i < snowCount; i++) {
      positions[i * 3] = Math.random() * 20 - 10;
      positions[i * 3 + 1] = Math.random() * 20 - 10;
      positions[i * 3 + 2] = Math.random() * 20 - 10;
      velocities[i] = 0.05 + Math.random() / 20;
      rotations[i] = Math.random() * Math.PI;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    geo.setAttribute('rotation', new THREE.BufferAttribute(rotations, 1));
    
    return geo;
  }, [snowCount]);
  
  const snowMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    });
  }, []);
  
  useFrame((state) => {
    if (!snowRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = snowRef.current.geometry.attributes.position;
    const velocities = snowRef.current.geometry.attributes.velocity;
    const rotations = snowRef.current.geometry.attributes.rotation;
    
    for (let i = 0; i < snowCount; i++) {
      // Fall downwards
      positions.array[i * 3 + 1] -= velocities.array[i];
      
      // Also move slightly sideways based on rotation and time
      positions.array[i * 3] += Math.sin(time + rotations.array[i]) * 0.01;
      
      // Reset position when snowflake falls below the scene
      if (positions.array[i * 3 + 1] < -10) {
        positions.array[i * 3 + 1] = 10;
      }
    }
    
    positions.needsUpdate = true;
  });
  
  return (
    <>
      <color attach="background" args={['#E8F0FF']} />
      <fog attach="fog" args={['#E8F0FF', 1, 20]} />
      
      <points ref={snowRef} geometry={snowGeo} material={snowMaterial} />
      
      <group position={[0, -2, 0]}>
        <Cloud position={[-4, 2, 0]} args={[3, 2]} opacity={0.6} color="#E8F0FF" />
        <Cloud position={[4, 3, -6]} args={[3, 2]} opacity={0.5} color="#E8F0FF" />
        <Cloud position={[0, 6, -10]} args={[4, 2]} opacity={0.4} color="#E8F0FF" />
      </group>
      
      {/* Snow ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </>
  );
};