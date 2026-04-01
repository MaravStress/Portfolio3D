import { RigidBody } from "@react-three/rapier";

interface BlockingProps {
    type?: 'box' | 'ramp' | 'ground';
    position?: [number, number, number];
    size?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    rigidBodyType?: 'fixed' | 'dynamic';
    visible?: boolean;
}

export default function Blocking({ type = 'box', position = [0, 0, 0], size = [1, 1, 1], rotation = [0, 0, 0], color = "#525252", rigidBodyType = 'fixed', visible = true }: BlockingProps) {
    return (
        <>
            <RigidBody type={rigidBodyType}>
                {type === 'box' && (
                    <mesh position={position} rotation={rotation} castShadow receiveShadow visible={visible}>
                        <boxGeometry args={size} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                )}
                {type === 'ramp' && (
                    <group position={position} rotation={rotation}>
                        <mesh position={[0, -size[1], 0]} rotation={[Math.PI / 8, 0, 0]} castShadow receiveShadow visible={visible}>
                            <boxGeometry args={size} />
                            <meshStandardMaterial color={color} />
                        </mesh>
                    </group>
                )}
                {type === 'ground' && (
                    <group position={position} rotation={rotation}>
                        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow visible={visible}>
                            <planeGeometry args={size} />
                            <meshStandardMaterial color={color} />
                        </mesh>
                    </group>
                )}
            </RigidBody>
        </>
    );
}

