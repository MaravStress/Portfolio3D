import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import Player from './components/Player';
import Trigger from './components/Trigger';



function Ground() {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={'#444'} />
      </mesh>
    </RigidBody>
  );
}

function Walls() {
  return (
    <>
      <RigidBody type="fixed">
        <mesh position={[0, 0, -10]} castShadow receiveShadow>
          <boxGeometry args={[20, 2, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[0, 0, 10]} castShadow receiveShadow>
          <boxGeometry args={[20, 2, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[-10, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 2, 20]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh position={[10, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1, 2, 20]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </RigidBody>
    </>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 50 }}>
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
          <Ground />
          <Walls />
          <Trigger />
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
