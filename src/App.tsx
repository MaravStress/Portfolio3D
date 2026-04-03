import { Canvas, useFrame } from '@react-three/fiber';
import Scene from './components/Scene/Scene';

function CameraTracker() {
  useFrame(({ camera }) => {
    const el = document.getElementById('camera-coords');
    if (el) {
      el.innerText = `Cam Camera\nX: ${camera.position.x.toFixed(2)}\nY: ${camera.position.y.toFixed(2)}\nZ: ${camera.position.z.toFixed(2)}`;
    }
  });
  return null;
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
