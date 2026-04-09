import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Layer2() {
  // Cargar el modelo GLB del escenario
  const { scene } = useGLTF('/escenario.glb');

  useMemo(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        // Obtenemos el nombre del material (manejando tanto si es un material único como un array)
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        
        const hasGlassMaterial = materials.some(mat => 
          mat.name && mat.name.toLowerCase().includes('glass')
        );

        if (hasGlassMaterial) {
          // Asignaremos un nuevo material que simula vidrio
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,         // Color base del vidrio (blanco puro para cristal transparente)
            metalness: 0.1,          // Ligero toque metálico para reflejos
            roughness: 0.05,         // Casi sin aspereza para que sea nítido
            envMapIntensity: 1.5,    // Reflejará con más fuerza el skybox/entorno
            transmission: 1,         // Transmisión total de luz (esto simula el vidrio real)
            ior: 1.5,                // Índice de refracción del cristal~
            thickness: 0.5,          // Grosor virtual del vidrio
            transparent: true,       // Activar transparencia
            opacity: 1               // Opacidad 1 porque la transparencia está dominada por 'transmission'
          });
        }
      }
    });
  }, [scene]);

  return (
    <group name="layer-2">
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/escenario.glb');
