import { Html } from "@react-three/drei";

interface ScreenProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale?: [number, number, number];
    width?: number;
    height?: number;
}

export default function ScreenHTMLshow({ position, rotation, scale = [3, 3, 3], width = 600, height = 300 }: ScreenProps) {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <Html
                transform
                // "blending" suele ser más estable que el true por defecto
                occlude="blending"
                // Esto ayuda a que el DOM no se vuelva loco con las escalas
                distanceFactor={1.2}
                // Centramos el HTML respecto al grupo
                position={[0, 0, 0.02]}
                // Importante: que el contenedor CSS no interfiera con el raycaster si no es necesario
                style={{
                    userSelect: 'none',
                    pointerEvents: 'auto'
                }}
            >
                <div style={{
                    width: width,
                    height: height,
                    background: 'red',
                    padding: '20px',
                    borderRadius: '20px',
                    // Evita que el navegador intente suavizar fuentes de forma que vibren
                    WebkitFontSmoothing: 'antialiased'
                }}>
                    <h1>Interfaz Plana</h1>
                    <p>Texto estable.</p>
                    <p>klk mundo</p>
                    <button>Botón real</button>
                </div>
            </Html >
        </group>
    )
}