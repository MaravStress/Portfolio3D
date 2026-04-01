import { useState } from 'react';
import { CuboidCollider } from '@react-three/rapier';

export default function Trigger() {
    const [isInside, setIsInside] = useState(false);

    return (
        <group position={[3, -0.5, 3]}>
            {/* Elemento visual para que sepamos dónde está la zona */}
            <mesh>
                <boxGeometry args={[3, 1, 3]} />
                <meshStandardMaterial
                    color={isInside ? 'lime' : 'yellow'}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Sensor físico (Trigger) */}
            <CuboidCollider
                args={[1.5, 0.5, 1.5]} // args en CuboidCollider son mitades (1.5 = 3 de ancho)
                sensor
                onIntersectionEnter={() => {
                    console.log("🔥 ¡El jugador activó el trigger!");
                    setIsInside(true);
                }}
                onIntersectionExit={() => {
                    console.log("❄️ El jugador salió de la zona.");
                    setIsInside(false);
                }}
            />
        </group>
    );
}