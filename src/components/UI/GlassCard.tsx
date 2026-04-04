import { useState } from 'react';
import { Modal, Badge } from 'react-bootstrap';

export interface ProjectData {
  id: string;
  titulo: string;
  etiquetas: string[];
  imagen: string;
  descripcion: string;
}

interface GlassCardProps {
  data: ProjectData;
}

export default function GlassCard({ data }: GlassCardProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Parse custom links [Text](url) into buttons
  const renderDescription = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const match = linkRegex.exec(text);
      if (!match) break;

      if (match.index > lastIndex) {
        parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
      }

      parts.push(
        <div key={`link-${match.index}`} className="mt-3">
          <a href={match[2]} target="_blank" rel="noreferrer" className="btn btn-outline-light w-100 rounded-pill glass-panel py-2" style={{ backdropFilter: 'none' }}>
            {match[1]}
          </a>
        </div>
      );

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <>
      <div className="glass-panel glass-card d-flex flex-column h-100" onClick={handleShow} style={{ color: 'white' }}>
        <div
          style={{
            height: '150px',
            backgroundImage: `url(${data.imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        />
        <h5 className="fw-bold mb-3">{data.titulo}</h5>
        <div className="mt-auto">
          {data.etiquetas.map(tag => (
            <Badge bg="light" text="dark" className="me-2 mb-2 p-1 px-2 rounded-pill" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered contentClassName="glass-modal-content" style={{ zIndex: 1060 }}>
        <Modal.Header closeButton closeVariant="white" className="border-0 pb-0 glass-modal-header">
          <Modal.Title className="fw-bold fs-4" style={{ color: 'white' }}>{data.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <img
            src={data.imagen}
            alt={data.titulo}
            className="img-fluid rounded mb-4 w-100"
            style={{ maxHeight: '350px', objectFit: 'cover' }}
          />
          <div className="mb-4">
            {data.etiquetas.map(tag => (
              <Badge bg="primary" className="me-2 mb-2 p-2 px-3 rounded-pill" key={`modal-${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
          <p className="fs-5 lh-lg" style={{ color: 'white' }}>
            {renderDescription(data.descripcion)}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
