import { useEffect, useState } from "react";

export default function usePlayerControls() {
    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW': setMovement((m) => ({ ...m, forward: true })); break;
                case 'KeyS': setMovement((m) => ({ ...m, backward: true })); break;
                case 'KeyA': setMovement((m) => ({ ...m, left: true })); break;
                case 'KeyD': setMovement((m) => ({ ...m, right: true })); break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            switch (e.code) {
                case 'KeyW': setMovement((m) => ({ ...m, forward: false })); break;
                case 'KeyS': setMovement((m) => ({ ...m, backward: false })); break;
                case 'KeyA': setMovement((m) => ({ ...m, left: false })); break;
                case 'KeyD': setMovement((m) => ({ ...m, right: false })); break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
};