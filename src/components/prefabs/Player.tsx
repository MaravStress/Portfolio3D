import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RigidBody, RapierRigidBody, CapsuleCollider } from '@react-three/rapier';
import { useGLTF, useAnimations } from '@react-three/drei';
import usePlayerControls from './usePlayerControls';

const MAX_SPEED = 7;
const ACCELERATION = 10;
const DECELERATION = 10;
const ROTATION_SPEED = 10;

const Player = forwardRef((props: any, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<RapierRigidBody>(null);
    const velocity = useRef(new THREE.Vector3());
    const { forward, backward, left, right } = usePlayerControls();

    // Cargar el modelo
    const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}player.glb`);
    const { actions } = useAnimations(animations, groupRef);

    const [animation, setAnimation] = useState('idle');

    useImperativeHandle(ref, () => ({
        get position() {
            return bodyRef.current ? bodyRef.current.translation() : { x: 0, y: 0, z: 0 };
        }
    }));

    // Control de animaciones
    useEffect(() => {
        const action = actions[animation];
        if (action) {
            action.reset().fadeIn(0.2).play();
            return () => {
                action.fadeOut(0.2);
            };
        }
    }, [animation, actions]);

    useFrame((state, delta) => {
        if (!bodyRef.current || !groupRef.current) return;

        // 1. Obtener los vectores direccionales de la cámara plana
        const forwardVector = new THREE.Vector3();
        state.camera.getWorldDirection(forwardVector);
        forwardVector.y = 0;
        forwardVector.normalize();

        const rightVector = new THREE.Vector3();
        rightVector.crossVectors(forwardVector, state.camera.up).normalize();

        // 2. Obtener la dirección basada en el teclado
        const direction = new THREE.Vector3(0, 0, 0);

        if (forward) direction.add(forwardVector);
        if (backward) direction.sub(forwardVector);
        if (right) direction.add(rightVector);
        if (left) direction.sub(rightVector);

        // Determinar Animación
        let nextAnimation = 'idle';
        if (direction.lengthSq() > 0) {
            nextAnimation = 'run';
        } else {
            nextAnimation = 'idle';
        }

        if (animation !== nextAnimation) {
            setAnimation(nextAnimation);
        }

        // Normalizar la dirección para el movimiento
        if (direction.lengthSq() > 0) {
            direction.normalize();

            // Rota el personaje suavemente hacia la dirección de movimiento
            const angle = Math.atan2(direction.x, direction.z);
            const targetRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            groupRef.current.quaternion.slerp(targetRotation, ROTATION_SPEED * delta);
        }

        // 3. Obtener la velocidad objetivo
        const targetVelocity = direction.clone().multiplyScalar(MAX_SPEED);

        // EXTRAER LA VELOCIDAD REAL DEL MOTOR DE FÍSICAS
        const currentLinVel = bodyRef.current.linvel();
        velocity.current.set(currentLinVel.x, currentLinVel.y, currentLinVel.z);

        // 4. Aplicar aceleración y desaceleración
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

        // 5. Mover el cuerpo físico
        bodyRef.current.setLinvel({
            x: velocity.current.x,
            y: currentLinVel.y,
            z: velocity.current.z
        }, true);
    });

    return (
        <RigidBody
            ref={bodyRef}
            colliders={false} // Desactivar auto-colliders para usar uno personalizado
            lockRotations
            position={props.position}
            enabledRotations={[false, false, false]} // Asegura que no rote por físicas
        >
            <CapsuleCollider args={[0.5, 0.4]} position={[0, 1.0, 0]} />
            <group ref={groupRef} dispose={null}>
                <primitive object={scene} position={[0, 0.13, 0]} />
            </group>
        </RigidBody>
    );
});

export default Player;
useGLTF.preload(`${import.meta.env.BASE_URL}player.glb`);
