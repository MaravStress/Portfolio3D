// import { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

import Blocking from '../../prefabs/Blocking';

export function Pisos({ visible = true }: { visible?: boolean }) {
  return (
    <>
      {/* Home */}
      <Blocking type="ground" size={[10, 10, 1]} visible={visible} />

      {/* Estudios */}
      <Blocking type="ground" position={[12.5, 0, 0]} size={[5, 8, 1]} visible={visible} />

      {/* Pasillo */}
      <Blocking type="ground" position={[7.5, 0, 0]} size={[5, 37, 1]} visible={visible} />
      <Blocking type="ground" position={[17.5, 0, 16]} size={[15, 5, 1]} visible={visible} />
      <Blocking type="ground" position={[17.5, 0, -16]} size={[15, 5, 1]} visible={visible} />
      <Blocking type="ramp" position={[22.5, 1, 9.5]} size={[5, 0.5, 10]} visible={visible} />
      <Blocking type="ramp" position={[22.5, 1, -9.5]} rotation={[0, Math.PI, 0]} size={[5, 0.5, 10]} visible={visible} />
      <Blocking type="ground" position={[22.5, 3.638, 0]} size={[5, 10, 1]} visible={visible} />

      {/* Cinema */}
      <Blocking type="ground" position={[12.5, 0, -23.5]} size={[10, 10, 1]} color="green" visible={visible} />

      {/* GamesPlace */}
      <Blocking type="ground" position={[12.5, 0, 23.5]} size={[10, 10, 1]} color="blue" visible={visible} />
    </>
  );
}

export function Paredes({ visible }: { visible: boolean }) {
  return (
    <>
      {/* Paredes de Home */}
      <Blocking type="box" position={[-4.75, -0.25, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[0, -0.25, 4.75]} size={[10, 1.5, 0.5]} visible={visible} />
      <Blocking type="box" position={[0, -0.25, -4.75]} size={[10, 1.5, 0.5]} visible={visible} />

      {/* Paredes de Estudios */}
      <Blocking type="box" position={[14.75, -0.25, 0]} size={[0.5, 1.5, 8]} visible={visible} />
      <Blocking type="box" position={[12.5, -0.25, 3.75]} size={[5, 1.5, 0.5]} visible={visible} />
      <Blocking type="box" position={[12.5, -0.25, -3.75]} size={[5, 1.5, 0.5]} visible={visible} />

      {/* Paredes exteriores de Pasillo */}
      <Blocking type="box" position={[4.75, -0.25, 11.75]} size={[0.5, 1.5, 13.5]} visible={visible} />
      <Blocking type="box" position={[4.75, -0.25, -11.75]} size={[0.5, 1.5, 13.5]} visible={visible} />
      <Blocking type="box" position={[25.25, -0.25, 16.5]} size={[0.5, 1.5, 4]} visible={visible} />
      <Blocking type="box" position={[25.25, 1.424, 9.883]} rotation={[Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[25.25, 3.388, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[25.25, 1.424, -9.883]} rotation={[-Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[25.25, -0.25, -16.5]} size={[0.5, 1.5, 4]} visible={visible} />
      <Blocking type="box" position={[6, -0.25, 18.75]} size={[3, 1.5, 0.5]} visible={visible} />
      <Blocking type="box" position={[21.5, -0.25, 18.75]} size={[8, 1.5, 0.5]} visible={visible} />
      <Blocking type="box" position={[6, -0.25, -18.75]} size={[3, 1.5, 0.5]} visible={visible} />
      <Blocking type="box" position={[21.5, -0.25, -18.75]} size={[8, 1.5, 0.5]} visible={visible} />

      {/* Paredes interiores de Pasillo */}
      <Blocking type="box" position={[10.25, -0.25, 8.75]} size={[0.5, 1.5, 9.5]} visible={visible} />
      <Blocking type="box" position={[10.25, -0.25, -8.75]} size={[0.5, 1.5, 9.5]} visible={visible} />
      <Blocking type="box" position={[19.75, 1.5, 8.55]} rotation={[Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[19.75, 3.388, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[19.75, 1.5, -8.55]} rotation={[-Math.PI / 8, 0, 0]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[15, -0.25, 13.25]} size={[9, 1.5, 0.5]} visible={visible} />
      <Blocking type="box" position={[15, -0.25, -13.25]} size={[9, 1.5, 0.5]} visible={visible} />

      {/* Paredes de Cinema */}
      <Blocking type="box" position={[7.75, -0.25, -23.5]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[17.25, -0.25, -23.5]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[12.5, -0.25, -28.25]} size={[10, 1.5, 0.5]} visible={visible} />

      {/* Paredes de GamesPlace */}
      <Blocking type="box" position={[7.75, -0.25, 23.5]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[17.25, -0.25, 23.5]} size={[0.5, 1.5, 10]} visible={visible} />
      <Blocking type="box" position={[12.5, -0.25, 28.25]} size={[10, 1.5, 0.5]} visible={visible} />
    </>
  );
}

export default function Layer1() {
  /*
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Export when pressing Ctrl + E
      if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        
        if (groupRef.current) {
          const exporter = new GLTFExporter();
          // We must ensure the objects are visible or the exporter may skip them by default.
          // By default, GLTFExporter respects `visible` properties. 
          // However, the `Paredes` are passed `visible={false}` or `true` so they will be exported based on that value.
          
          exporter.parse(
            groupRef.current,
            (gltf) => {
              const output = JSON.stringify(gltf, null, 2);
              const blob = new Blob([output], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.download = 'layer1_export.gltf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              
              console.log("Model exported successfully!");
            },
            (error) => {
              console.error('An error happened during parsing', error);
            },
            { binary: false, trs: false }
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  */

  return (
    <group /* ref={groupRef} */ name="layer-1">
      <Pisos visible={false} />
      <Paredes visible={false} />
    </group>
  );
}
