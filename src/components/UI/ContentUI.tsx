import { useState, useEffect } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import GlassCard from './GlassCard';
import bd from '../bd.json';

type ContentType = 'reviews_3D' | 'reviews_Programming' | '3DAnimations' | 'Programming';

const CONFIG: Record<ContentType, { emoji: string; title: string; subtitle: string }> = {
  reviews_3D: {
    emoji: '🎨',
    title: 'Costumer Reviews',
    subtitle: 'Some of the best customer reviews I\'ve received in the field of 3D animation. \n I have a fairly strict privacy policy with my clients, so only reviews will be shown.',
  },
  reviews_Programming: {
    emoji: '💻',
    title: 'Costumer Reviews',
    subtitle: 'Some of the best customer reviews I\'ve received in the field of programming. \n I have a fairly strict privacy policy with my clients, so only reviews will be shown.',
  },
  "3DAnimations": {
    emoji: '🎬',
    title: '3D Animations',
    subtitle: '3D animation projects, modeling, texturing, rigging, animation, rendering and post-production.',
  },
  Programming: {
    emoji: '🕹️',
    title: 'Programming',
    subtitle: 'Video game development and design projects or software solutions.',
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
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px)',
        borderLeft: '1px solid rgba(255,255,255,0.25)',
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
