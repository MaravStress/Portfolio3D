import { useState } from 'react';
import Blocking from '../../prefabs/Blocking';

export function Pisos() {
  return (
    <>
      {/* Home */}
      <Blocking type="ground" size={[10, 10, 1]} />

      {/* Estudios */}
      <Blocking type="ground" position={[12.5, 0, 0]} size={[5, 8, 1]} />

      {/* Pasillo */}
      <Blocking type="ground" position={[7.5, 0, 0]} size={[5, 37, 1]} />
      <Blocking type="ground" position={[17.5, 0, 16]} size={[15, 5, 1]} />
      <Blocking type="ground" position={[17.5, 0, -16]} size={[15, 5, 1]} />
      <Blocking type="ramp" position={[22.5, 1, 9.5]} size={[5, 0.5, 10]} />
      <Blocking type="ramp" position={[22.5, 1, -9.5]} rotation={[0, Math.PI, 0]} size={[5, 0.5, 10]} />
      <Blocking type="ground" position={[22.5, 3.638, 0]} size={[5, 10, 1]} />

      {/* Cinema */}
      <Blocking type="ground" position={[12.5, 0, -23.5]} size={[10, 10, 1]} color="green" />

      {/* GamesPlace */}
      <Blocking type="ground" position={[12.5, 0, 23.5]} size={[10, 10, 1]} color="blue" />
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
  return (
    <group name="layer-1">
      <Pisos />
      <Paredes visible={false} />
    </group>
  );
}
