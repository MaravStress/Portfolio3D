import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Player from '../prefabs/Player';
import Trigger from '../prefabs/Trigger';
import Layer1 from './Layers/Layer1';
import Layer2 from './Layers/Layer2';

export default function Scene() {
  const cameraControlRef = useRef<CameraControls>(null);
  const playerRef = useRef<any>(null);
  const [cameraFree, setCameraFree] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([10, 8, 4]);
  const [camerafocus, setCamerafocus] = useState([0, 0, 0]);
  const [UIpanel, setUIpanel] = useState<"home" | "trabajos_3D" | "trabajos_Programar" | "cine" | "gamesplace">("home");
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

      <Physics>
        <Player ref={playerRef} position={[0, 0, 0]} />

        {/* ////////////////////////////////////////////////// escenario */}
        <group name="scene-layer-container">
          <Layer1 />
          <Layer2 />
        </group>

        {/* //////////////////////////////////////////////////  trigger */}
        {/* casa */}
        <Trigger
          position={[0, -0.5, 0]}
          size={[10, 1, 10]}
          onEnter={() => { setCameraFree(false); setCameraPosition([10, 8, 4]); setCamerafocus([0, 0, 0]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {/* estudios */}
        <Trigger
          position={[12.5, -0.5, 0]}
          size={[5, 1, 8]}
          onEnter={() => { setCameraFree(false); setCameraPosition([19, 9, 0]); setCamerafocus([12.5, 0, 0]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {/* mirador */}
        <Trigger
          position={[22.5, 3.638, 0]}
          size={[5, 1, 10]}
          onEnter={() => { setCameraFree(false); setCameraPosition([40, 18, 0]); setCamerafocus([22.5, 3.638, 0]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {/* pasillo L (cine) */}
        <Trigger
          position={[12.5, -0.5, 15]}
          size={[15, 1, 7]}
          onEnter={() => { setCameraFree(true); setCameraPosition([10, 8, -10]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {/* pasillo R (game)*/}
        <Trigger
          position={[12.5, -0.5, -15]}
          size={[15, 1, 7]}
          onEnter={() => { setCameraFree(true); setCameraPosition([10, 8, 10]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {UIpanel === "home" && <HomeUI />}
        {UIpanel === "trabajos_3D" && <Trabajos3DUI />}
        {UIpanel === "trabajos_Programar" && <TrabajosProgramarUI />}
        {UIpanel === "cine" && <CineUI />}
        {UIpanel === "gamesplace" && <GamesPlaceUI />}
      </Physics>
      <CameraControls ref={cameraControlRef} />
    </>
  );
}
