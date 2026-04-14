import { useState, useEffect } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import GlassCard from './GlassCard';
import bd from '../bd.json';

type ContentType = 'reviews_3D' | 'reviews_Programming' | '3DAnimations' | 'Programming';

const CONFIG: Record<ContentType, { emoji: string; label: string; title: string; subtitle: string }> = {
  reviews_3D: {
    emoji: '🎮',
    label: 'Proyectos 3D',
    title: 'Trabajos 3D',
    subtitle: 'Explora mi portafolio de modelado y diseño tridimensional. Haz clic en cualquiera para ver más detalles.',
  },
  reviews_Programming: {
    emoji: '💻',
    label: 'Desarrollo Web & App',
    title: 'Desarrollo & Programación',
    subtitle: 'Descubre mis proyectos técnicos y de desarrollo de software. Haz clic para ver repositorios y demos.',
  },
  "3DAnimations": {
    emoji: '🎬',
    label: 'Proyectos de Cine',
    title: 'Cine & Audiovisual',
    subtitle: 'Proyectos de dirección, postproducción y efectos visuales. Haz clic en las tarjetas para ver más información.',
  },
  Programming: {
    emoji: '🕹️',
    label: 'Games Place',
    title: 'Games Place',
    subtitle: 'Desarrollo y diseño de videojuegos interactivos. Observa los distintos trabajos a continuación.',
  },
};

interface ContentUIProps {
  activePanel: "home" | "reviews_3D" | "reviews_Programming" | "3DAnimations" | "Programming" | null;
}

export default function ContentUI({ activePanel }: ContentUIProps) {
  const isContentPanel = activePanel !== null && activePanel !== "home";
  
  const [currentType, setCurrentType] = useState<ContentType>("reviews_3D");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isContentPanel) {
      setCurrentType(activePanel as ContentType);
      setShow(true);
    } else {
      setShow(false);
    }
  }, [activePanel, isContentPanel]);

  const { emoji, title, subtitle } = CONFIG[currentType];
  const trabajos = bd[currentType];

  return (
    <Offcanvas
      show={show}
      placement="end"
      backdrop={false}
      scroll={true}
      style={{
        width: '480px',
        background: 'rgba(15, 15, 30, 0.16)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        zIndex: 1050,
      }}
    >
      <Offcanvas.Header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Offcanvas.Title className="fw-bold fs-3">{emoji} {title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-4" style={{ overflowY: 'auto' }}>
        <p className="lead mb-4">{subtitle}</p>
        <Row className="g-4">
          {trabajos.map(trabajo => (
            <Col xs={12} key={trabajo.id}>
              <GlassCard data={trabajo} />
            </Col>
          ))}
        </Row>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
