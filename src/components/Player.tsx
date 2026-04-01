import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import usePlayerControls from './usePlayerControls';

const MAX_SPEED = 5;
const ACCELERATION = 15;
const DECELERATION = 10;
const ROTATION_SPEED = 10;

export default function Player(props: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const bodyRef = useRef<RapierRigidBody>(null);
    const velocity = useRef(new THREE.Vector3());
    const { forward, backward, left, right } = usePlayerControls();

    useFrame((state, delta) => {
        if (!meshRef.current || !bodyRef.current) return;

        // 1. Obtener los vectores direccionales de la cámara plana
        const forwardVector = new THREE.Vector3();
        state.camera.getWorldDirection(forwardVector);
        forwardVector.y = 0;
        forwardVector.normalize();

        const rightVector = new THREE.Vector3();
        rightVector.crossVectors(forwardVector, state.camera.up).normalize();

        // 2. Obtener la dirección basada en el teclado y la rotación de la cámara
        const direction = new THREE.Vector3();

        if (forward) direction.add(forwardVector);
        if (backward) direction.sub(forwardVector);
        if (right) direction.add(rightVector);
        if (left) direction.sub(rightVector);

        // Normalizar la dirección
        if (direction.lengthSq() > 0) {
            direction.normalize();

            // Rota el personaje suavemente hacia la dirección
            const angle = Math.atan2(direction.x, direction.z);
            const targetRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            meshRef.current.quaternion.slerp(targetRotation, ROTATION_SPEED * delta);
        }

        // 3. Obtener la velocidad objetivo
        const targetVelocity = direction.clone().multiplyScalar(MAX_SPEED);

        // EXTRAER LA VELOCIDAD REAL DEL MOTOR DE FÍSICAS
        const currentLinVel = bodyRef.current.linvel();
        velocity.current.set(currentLinVel.x, currentLinVel.y, currentLinVel.z);

        // 4. Aplicar aceleración y desaceleración iterativa
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

        // 5. Mover el cuerpo insertando la nueva velocidad de forma segura en las físicas
        bodyRef.current.setLinvel({
            x: velocity.current.x,
            y: currentLinVel.y, // mantenemos la Y real para la gravedad/caídas
            z: velocity.current.z
        }, true);
    });

    return (
        <RigidBody
            ref={bodyRef}
            colliders="cuboid"
            lockRotations // Evitar que el cubo se caiga rodando
            position={props.position}
        >
            <mesh ref={meshRef} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
                <mesh position={[0, 0.2, 0.5]} castShadow>
                    <boxGeometry args={[0.5, 0.2, 0.2]} />
                    <meshStandardMaterial color={'blue'} />
                </mesh>
            </mesh>
        </RigidBody>
    );
}