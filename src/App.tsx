import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Player from './components/Player';
import Trigger from './components/Trigger';
import Blocking from './components/Blocking';

function CameraTracker() {
  useFrame(({ camera }) => {
    const el = document.getElementById('camera-coords');
    if (el) {
      el.innerText = `Cam Camera\nX: ${camera.position.x.toFixed(2)}\nY: ${camera.position.y.toFixed(2)}\nZ: ${camera.position.z.toFixed(2)}`;
    }
  });
  return null;
}

function Home() {
  return (
    <>
      {/* Suelo plano principal */}
      <Blocking type="ground" size={[10, 10, 1]} />

      {/* Paredes de Home (Lado que da a pasillo está abierto) */}
      <Blocking type="box" position={[-4.75, -0.25, 0]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[0, -0.25, 4.75]} size={[10, 1.5, 0.5]} visible={false} />
      <Blocking type="box" position={[0, -0.25, -4.75]} size={[10, 1.5, 0.5]} visible={false} />
    </>
  );
}
function Estudios() {
  return (
    <>
      {/* Suelo plano principal */}
      <Blocking type="ground" position={[12.5, 0, 0]} size={[5, 8, 1]} />

      {/* Paredes de Estudios (Lado que da a pasillo está abierto) */}
      <Blocking type="box" position={[14.75, -0.25, 0]} size={[0.5, 1.5, 8]} visible={false} />
      <Blocking type="box" position={[12.5, -0.25, 3.75]} size={[5, 1.5, 0.5]} visible={false} />
      <Blocking type="box" position={[12.5, -0.25, -3.75]} size={[5, 1.5, 0.5]} visible={false} />
    </>
  );
}
function Pasillo() {
  return (
    <>
      <Blocking type="ground" position={[7.5, 0, 0]} size={[5, 37, 1]} />
      <Blocking type="ground" position={[17.5, 0, 16]} size={[15, 5, 1]} />
      <Blocking type="ground" position={[17.5, 0, -16]} size={[15, 5, 1]} />
      <Blocking type="ramp" position={[22.5, 1, 9.5]} size={[5, 0.5, 10]} />
      <Blocking type="ramp" position={[22.5, 1, -9.5]} rotation={[0, Math.PI, 0]} size={[5, 0.5, 10]} />
      <Blocking type="ground" position={[22.5, 3.638, 0]} size={[5, 10, 1]} />

      {/* Paredes exteriores de Pasillo */}
      {/* Izquierda (abierta en el medio [Z: -5 a 5] para conectar con la Casa) */}
      <Blocking type="box" position={[4.75, -0.25, 11.75]} size={[0.5, 1.5, 13.5]} visible={false} />
      <Blocking type="box" position={[4.75, -0.25, -11.75]} size={[0.5, 1.5, 13.5]} visible={false} />

      {/* Derecha (sigue las rampas y la plataforma [X=25.25]) */}
      <Blocking type="box" position={[25.25, -0.25, 16.5]} size={[0.5, 1.5, 4]} visible={false} />
      <Blocking type="box" position={[25.25, 1.424, 9.883]} rotation={[Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[25.25, 3.388, 0]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[25.25, 1.424, -9.883]} rotation={[-Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[25.25, -0.25, -16.5]} size={[0.5, 1.5, 4]} visible={false} />

      {/* Arriba (abierta en X: 7.5 a 17.5 para no bloquear ir a GamesPlace) */}
      <Blocking type="box" position={[6, -0.25, 18.75]} size={[3, 1.5, 0.5]} visible={false} />
      <Blocking type="box" position={[21.5, -0.25, 18.75]} size={[8, 1.5, 0.5]} visible={false} />

      {/* Abajo (abierta en X: 7.5 a 17.5 para no bloquear ir a Cinema) */}
      <Blocking type="box" position={[6, -0.25, -18.75]} size={[3, 1.5, 0.5]} visible={false} />
      <Blocking type="box" position={[21.5, -0.25, -18.75]} size={[8, 1.5, 0.5]} visible={false} />

      {/* Paredes interiores rodeando el gran hueco central que no tiene piso */}
      {/* Izquierda del hueco (abierta en Z: -4 a 4 para no bloquear a Estudios) */}
      <Blocking type="box" position={[10.25, -0.25, 8.75]} size={[0.5, 1.5, 9.5]} visible={false} />
      <Blocking type="box" position={[10.25, -0.25, -8.75]} size={[0.5, 1.5, 9.5]} visible={false} />

      {/* Derecha del hueco (sigue las rampas y la plataforma [X=19.75]) */}
      <Blocking type="box" position={[19.75, 1.5, 8.55]} rotation={[Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[19.75, 3.388, 0]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[19.75, 1.5, -8.55]} rotation={[-Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={false} />

      {/* Arriba del hueco */}
      <Blocking type="box" position={[15, -0.25, 13.25]} size={[9, 1.5, 0.5]} visible={false} />

      {/* Abajo del hueco */}
      <Blocking type="box" position={[15, -0.25, -13.25]} size={[9, 1.5, 0.5]} visible={false} />

    </>
  );
}

function Cinema() {
  return (
    <>
      <Blocking type="ground" position={[12.5, 0, -23.5]} size={[10, 10, 1]} color='green' />

      {/* Paredes de Cinema (Arriba que da a pasillo está abierto) */}
      <Blocking type="box" position={[7.75, -0.25, -23.5]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[17.25, -0.25, -23.5]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[12.5, -0.25, -28.25]} size={[10, 1.5, 0.5]} visible={false} />
    </>
  );
}

function GamesPlace() {
  return (
    <>
      <Blocking type="ground" position={[12.5, 0, 23.5]} size={[10, 10, 1]} color='blue' />

      {/* Paredes de GamesPlace (Abajo que da a pasillo está abierto) */}
      <Blocking type="box" position={[7.75, -0.25, 23.5]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[17.25, -0.25, 23.5]} size={[0.5, 1.5, 10]} visible={false} />
      <Blocking type="box" position={[12.5, -0.25, 28.25]} size={[10, 1.5, 0.5]} visible={false} />
    </>
  );
}
function Mirador() {
  return (
    <>

    </>
  );
}


function Scene() {

  const cameraControlRef = useRef<CameraControls>(null);
  const playerRef = useRef<any>(null);
  const [cameraFree, setCameraFree] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([10, 8, 4]);
  useFrame(() => {
    if (cameraFree) {
      cameraControlRef.current?.setLookAt(cameraPosition[0] + playerRef.current?.position.x, cameraPosition[1] + playerRef.current?.position.y, cameraPosition[2] + playerRef.current?.position.z, playerRef.current?.position.x, playerRef.current?.position.y, playerRef.current?.position.z, true);
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
        <Home />
        <Pasillo />
        <Cinema />
        <GamesPlace />
        <Mirador />
        <Estudios />

        {/* //////////////////////////////////////////////////  trigger */}
        {/* casa */}
        <Trigger
          position={[0, -0.5, 0]}
          size={[10, 1, 10]}
          visible={true}
          onEnter={() => { setCameraFree(false); cameraControlRef.current?.setLookAt(10, 8, 4, 0, 0, 0, true); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {/* estudios */}
        <Trigger
          position={[12.5, -0.5, 0]}
          size={[5, 1, 8]}
          visible={true}
          onEnter={() => { setCameraFree(false); cameraControlRef.current?.setLookAt(19, 9, 0, 12.5, 0, 0, true); }}
          onExit={() => { setCameraFree(true); }}
        />
        {/* mirador */}
        <Trigger
          position={[22.5, 3.638, 0]}
          size={[5, 1, 10]}
          visible={true}
          onEnter={() => { setCameraFree(false); cameraControlRef.current?.setLookAt(40, 18, 0, 22.5, 3.638, 0, true); }}
          onExit={() => { setCameraFree(true); }}
        />
        {/* pasillo L (cine) */}
        <Trigger
          position={[12.5, -0.5, 15]}
          size={[15, 1, 7]}
          visible={true}
          onEnter={() => { setCameraFree(true); setCameraPosition([10, 8, -10]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />
        {/* pasillo R (game)*/}
        <Trigger
          position={[12.5, -0.5, -15]}
          size={[15, 1, 7]}
          visible={true}
          onEnter={() => { setCameraFree(true); setCameraPosition([10, 8, 10]); }}
          onExit={() => { setCameraFree(true); setCameraPosition([15, 8, 0]); }}
        />


      </Physics>
      <CameraControls ref={cameraControlRef} />
    </>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, position: 'relative' }}>
      <div
        id="camera-coords"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#00ffcc',
          padding: '12px 16px',
          borderRadius: '10px',
          fontFamily: 'monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 10,
          whiteSpace: 'pre-line',
          userSelect: 'none',
          pointerEvents: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 255, 204, 0.3)'
        }}
      >
        Cam Camera
        X: 0.00
        Y: 0.00
        Z: 0.00
      </div>
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 50 }}>
        <CameraTracker />
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
