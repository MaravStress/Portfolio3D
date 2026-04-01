import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Player from './components/Player';
import Trigger from './components/Trigger';
import Blocking from './components/Blocking';

function Ground() {
  return (
    <>
      {/* Suelo plano principal */}
      <Blocking type="ground" size={[20, 20, 1]} />

      {/* Rampa pequeña (ángulo de 22.5 grados aprox) */}
      <Blocking type="ramp" position={[8, 0, 0]} size={[4, 0.5, 40]} color="#525252" />

      {/* Rampa más empinada y alta (ángulo de 30 grados) */}
      <Blocking type="box" position={[-5, -0.2, -4]} rotation={[0, 0, -Math.PI / 6]} size={[6, 0.5, 4]} color="#888" />
    </>
  );
}

function Walls() {
  return (
    <>
      <Blocking type="box" position={[0, 0, -10]} size={[20, 2, 1]} color="red" />
      <Blocking type="box" position={[0, 0, 10]} size={[20, 2, 1]} color="blue" />
      <Blocking type="box" position={[-10, 0, 0]} size={[1, 2, 20]} color="green" />
      <Blocking type="box" position={[10, 0, 0]} size={[1, 2, 20]} color="yellow" />
    </>
  );
}


function Scene() {

  const cameraControlRef = useRef<CameraControls>(null);

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
        <Player position={[0, 0, 0]} />

        {/* escenario */}
        <Ground />
        <Walls />

        {/* trigger */}
        <Trigger
          position={[0, -0.5, 3]}
          size={[3, 1, 3]}
          visible={true}
          onEnter={() => {
            console.log("🎬 Moviendo cámara a una nueva posición.");
            // setLookAt(posiciónX, posiciónY, posiciónZ, objetivoX, objetivoY, objetivoZ, TransiciónSuave(true/false))
            cameraControlRef.current?.setLookAt(0, 5, -5, 0, 0, 0, true);
          }}
          onExit={() => {
            console.log("🎬 Regresando a la posición inicial.");
            cameraControlRef.current?.setLookAt(5, 5, 10, 0, 0, 0, true);
          }}
        />

      </Physics>
      <CameraControls ref={cameraControlRef} />
    </>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
