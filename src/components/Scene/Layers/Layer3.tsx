import Trigger from '../../prefabs/Trigger';

interface Layer3Props {
  setCameraFree: (free: boolean) => void;
  setCameraPosition: (pos: [number, number, number]) => void;
  setCamerafocus: (focus: [number, number, number]) => void;
}

export default function Layer3({ setCameraFree, setCameraPosition, setCamerafocus }: Layer3Props) {
  return (
    <>
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
    </>
  );
}
