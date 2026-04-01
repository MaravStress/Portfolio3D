import { useState } from 'react';
import { CuboidCollider } from '@react-three/rapier';

interface TriggerProps {
    position: [number, number, number];
    size: [number, number, number];
    visible?: boolean;
    onEnter: () => void;
    onExit: () => void;
}

export default function Trigger({ position, size, visible = false, onEnter, onExit }: TriggerProps) {
    const [isInside, setIsInside] = useState(false);

    return (
        <group position={position}>
            <mesh visible={visible}>
                <boxGeometry args={size} />
                <meshStandardMaterial
                    color={isInside ? 'lime' : 'yellow'}
                    transparent
                    opacity={0.5}
                />
            </mesh>
            <CuboidCollider
                args={size.map((s) => s / 2) as [number, number, number]} // args en CuboidCollider son mitades (1.5 = 3 de ancho)
                sensor
                onIntersectionEnter={() => {
                    onEnter();
                    setIsInside(true);
                }}
                onIntersectionExit={() => {
                    onExit();
                    setIsInside(false);
                }}
            />
        </group>
    );
}