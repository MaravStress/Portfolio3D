import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls, Sky, Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Player from '../prefabs/Player';
import Layer1 from './Layers/Layer1';
import Layer2 from './Layers/Layer2';
import Layer3 from './Layers/Layer3';
import Layer4 from './Layers/Layer4';

interface SceneProps {
  setUIpanel: (panel: "home" | "reviews_3D" | "reviews_Programming" | "3DAnimations" | "Programming" | null) => void;
}

export default function Scene({ setUIpanel }: SceneProps) {
  const cameraControlRef = useRef<CameraControls>(null);
  const playerRef = useRef<any>(null);
  const [cameraFree, setCameraFree] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([10, 8, 4]);
  const [camerafocus, setCamerafocus] = useState([0, 0, 0]);
  useFrame(() => {
    if (cameraFree) {
      // La cámara persigue al jugador fluidamente
      cameraControlRef.current?.setLookAt(cameraPosition[0] + playerRef.current?.position.x, cameraPosition[1] + playerRef.current?.position.y, cameraPosition[2] + playerRef.current?.position.z, playerRef.current?.position.x, playerRef.current?.position.y, playerRef.current?.position.z, true);
    } else {
      cameraControlRef.current?.setLookAt(cameraPosition[0], cameraPosition[1], cameraPosition[2], camerafocus[0], camerafocus[1], camerafocus[2], true);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Skybox genérico y entorno de iluminación */}
      <Sky sunPosition={[5, 10, 5]} />
      <Environment preset="city" />

      {/* Postprocesamiento: Efecto Bloom */}
      <EffectComposer>
        <Bloom luminanceThreshold={3} mipmapBlur intensity={1.2} />
      </EffectComposer>

      <Physics>
        <Player ref={playerRef} position={[0, 0, 0]} />

        {/* ////////////////////////////////////////////////// escenario */}
        <group name="scene-layer-container">
          <Layer1 />
          <Layer2 />
        </group>

        {/* //////////////////////////////////////////////////  trigger camera */}
        <Layer3
          setCameraFree={setCameraFree}
          setCameraPosition={setCameraPosition}
          setCamerafocus={setCamerafocus}
        />

        {/* //////////////////////////////////////////////////  trigger UI */}
        <Layer4
          setUIpanel={setUIpanel}
        />

      </Physics>
      <CameraControls ref={cameraControlRef} />
    </>
  );
}
