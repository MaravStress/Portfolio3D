import { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function HomeUI() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div style={{ position: 'fixed', top: '20px', right: '20px', pointerEvents: 'auto', zIndex: 1040 }}>
        <button className="glass-panel btn text-white px-4 fw-bold" onClick={() => setShow(true)} style={{ backdropFilter: 'blur(15px)' }}>
          👋 Información Principal
        </button>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg" contentClassName="glass-modal-content">
        <Modal.Header closeButton closeVariant="white" className="border-0 pb-0 glass-modal-header" />
        <Modal.Body className="p-5 text-center">
          <h1 className="fw-bold mb-4 display-4">Bienvenido a mi Portafolio</h1>
          <p className="lead fw-normal mb-4">
            Explora la sala interactiva en 3D para ver mis trabajos y habilidades. 
            Acércate a cada una de las zonas temáticas para conocer más detalles sobre mis proyectos y presiona el botón en la esquina superior derecha para ver la información.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <span className="badge bg-primary px-3 py-2 rounded-pill">Modelado 3D</span>
            <span className="badge bg-success px-3 py-2 rounded-pill">Programación</span>
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Cine</span>
            <span className="badge bg-danger px-3 py-2 rounded-pill">Videojuegos</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
