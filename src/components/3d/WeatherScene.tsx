import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { RainScene } from './RainScene';
import { ClearScene } from './ClearScene';
import { SnowScene } from './SnowScene';
import { ThunderstormScene } from './ThunderstormScene';
import { CloudsScene } from './CloudsScene';

interface WeatherSceneProps {
  weather?: string;
}

export const WeatherScene: React.FC<WeatherSceneProps> = ({ weather = 'Clear' }) => {
  const getWeatherComponent = () => {
    switch (weather) {
      case 'Rain':
      case 'Drizzle':
        return <RainScene />;
      case 'Clear':
        return <ClearScene />;
      case 'Snow':
        return <SnowScene />;
      case 'Thunderstorm':
        return <ThunderstormScene />;
      case 'Clouds':
        return <CloudsScene />;
      default:
        return <ClearScene />;
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      {getWeatherComponent()}
    </Canvas>
  );
};