import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import Scene from './components/Scene/Scene';
import HomeUI from './components/UI/HomeUI';
import ContentUI from './components/UI/ContentUI';
import AdminUI from './components/UI/AdminUI';


function App() {
  const [UIpanel, setUIpanel] = useState<"home" | "reviews_3D" | "reviews_Programming" | "3DAnimations" | "Programming" | null>(null);
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (hash === '#admin') {
    return <AdminUI />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, position: 'relative' }}>
      <Canvas
        camera={{ position: [5, 5, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Scene setUIpanel={setUIpanel} />
      </Canvas>
      {/* UI Overlay */}
      <div className="scene-ui-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
        <HomeUI show={UIpanel === "home"} />
        <ContentUI activePanel={UIpanel} />
      </div>
    </div>
  );
}

export default App;
