import { useState } from 'react';
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
  type: ContentType;
}

export default function ContentUI({ type }: ContentUIProps) {
  const [showPanel, setShowPanel] = useState(false);
  const { emoji, label, title, subtitle } = CONFIG[type];
  const trabajos = bd[type];

  return (
    <>
      <div style={{ position: 'fixed', top: '20px', right: '20px', pointerEvents: 'auto', zIndex: 1040 }}>
        <button
          className="glass-panel btn text-white px-4 fw-bold"
          onClick={() => setShowPanel(true)}
          style={{ backdropFilter: 'blur(15px)' }}
        >
          {emoji} {label}
        </button>
      </div>

      <Offcanvas
        show={showPanel}
        onHide={() => setShowPanel(false)}
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
        <Offcanvas.Header closeButton closeVariant="white" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Offcanvas.Title className="fw-bold fs-3">{title}</Offcanvas.Title>
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
    </>
  );
}
