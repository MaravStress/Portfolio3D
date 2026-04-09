import Trigger from '../../prefabs/Trigger';

interface Layer4Props {
  setUIpanel: (panel: "home" | "reviews_3D" | "reviews_Programming" | "3DAnimations" | "Programming" | null) => void;
}

export default function Layer4({ setUIpanel }: Layer4Props) {
  return (
    <>
      {/* casa */}
      <Trigger
        position={[0, -0.5, 0]}
        size={[10, 1, 10]}
        onEnter={() => { setUIpanel("home"); }}
        onExit={() => { setUIpanel(null); }}
      />
      {/* 3d animations */}
      <Trigger
        position={[12.5, -0.5, 23.5]}
        size={[9, 1, 9]}
        onEnter={() => { setUIpanel("3DAnimations"); }}
        onExit={() => { setUIpanel(null); }}
      />
      {/* programming */}
      <Trigger
        position={[12.5, -0.5, -23.5]}
        size={[9, 1, 9]}
        onEnter={() => { setUIpanel("Programming"); }}
        onExit={() => { setUIpanel(null); }}
      />
      {/* reviews 3D */}
      <Trigger
        position={[7.5, -0.5, 14]}
        size={[5, 1, 7]}
        onEnter={() => { setUIpanel("reviews_3D"); }}
        onExit={() => { setUIpanel(null); }}
      />
      {/* reviews Programar */}
      <Trigger
        position={[7.5, -0.5, -14]}
        size={[5, 1, 7]}
        onEnter={() => { setUIpanel("reviews_Programming"); }}
        onExit={() => { setUIpanel(null); }}
      />
    </>
  );
}
