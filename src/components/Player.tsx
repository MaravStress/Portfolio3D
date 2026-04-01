import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import usePlayerControls from './usePlayerControls';

const MAX_SPEED = 5;
const ACCELERATION = 15;
const DECELERATION = 10;
const ROTATION_SPEED = 10;

export default function Player(props: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const velocity = useRef(new THREE.Vector3());
    const { forward, backward, left, right } = usePlayerControls();

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // 1. Obtener los vectores direccionales de la cámara plana
        const forwardVector = new THREE.Vector3();
        state.camera.getWorldDirection(forwardVector);
        forwardVector.y = 0;
        forwardVector.normalize();

        // El vector derecho es el producto cruzado del vector 'hacia adelante' y el vector 'arriba' (eje Y)
        const rightVector = new THREE.Vector3();
        rightVector.crossVectors(forwardVector, state.camera.up).normalize();

        // 2. Obtener la dirección basada en el teclado y la rotación de la cámara
        const direction = new THREE.Vector3();

        // Sumamos y restamos los vectores según la tecla presionada
        if (forward) direction.add(forwardVector);
        if (backward) direction.sub(forwardVector);
        if (right) direction.add(rightVector);
        if (left) direction.sub(rightVector);

        // Normalizar la dirección para que las diagonales no sean más rápidas
        if (direction.lengthSq() > 0) {
            direction.normalize();

            // Rota el personaje suavemente hacia la dirección en la que nos movemos
            const angle = Math.atan2(direction.x, direction.z);
            const targetRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            meshRef.current.quaternion.slerp(targetRotation, ROTATION_SPEED * delta);
        }

        // 3. Obtener la velocidad objetivo (dirección * velocidad máxima)
        const targetVelocity = direction.clone().multiplyScalar(MAX_SPEED);

        // 4. Aplicar aceleración y desaceleración iterativa (Lerp / Interpolación lineal)

        if (direction.x !== 0) {
            velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, targetVelocity.x, ACCELERATION * delta);
        } else {
            velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, DECELERATION * delta);
        }

        if (direction.z !== 0) {
            velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, targetVelocity.z, ACCELERATION * delta);
        } else {
            velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, DECELERATION * delta);
        }

        // 5. Mover el cubo sumando la velocidad calculada por el delta del frame
        meshRef.current.position.addScaledVector(velocity.current, delta);
    });

    return (
        <mesh {...props} ref={meshRef} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
            {/* Pequeño indicador para saber hacia dónde está mirando el cubo (sirve como la 'cara' frontal) */}
            <mesh position={[0, 0.2, 0.5]} castShadow>
                <boxGeometry args={[0.5, 0.2, 0.2]} />
                <meshStandardMaterial color={'blue'} />
            </mesh>
        </mesh>
    );
}