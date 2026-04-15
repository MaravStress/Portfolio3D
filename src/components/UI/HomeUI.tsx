import { useState } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import GlassCard from './GlassCard';
import bd from '../bd.json';

export default function HomeUI({ show }: { show: boolean }) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('eliamjesusparedes@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Tomaremos un elemento destacado de cada categoría para el Home
  const featuredProjects = [
    bd["reviews_3D"][0],
    bd["reviews_Programming"][0],
    bd["3DAnimations"][0],
  ].filter(Boolean); // Filtrar nulos si falla algo

  return (
    <>
      {/* 📌 Left Panel (Profile & Info) - Llega desde la izquierda */}
      <Offcanvas
        show={show}
        placement="start"
        backdrop={false}
        scroll={true}
        style={{
          width: '480px',
          background: 'rgba(0, 0, 0, 0)',
          borderRight: '1px solid rgba(0,0,0,0)',
          zIndex: 1050,
        }}
      >
        <Offcanvas.Body className="p-4 p-md-5 d-flex flex-column" style={{ overflowY: 'auto' }}>

          {/* Perfil */}
          <div className="glass-panel d-flex align-items-center mb-4 p-3 bg-opacity-10 glass-border position-relative" style={{ borderRadius: '15px' }}>
            <div
              className="d-flex justify-content-center align-items-center text-white fw-bold fs-4"
              style={{
                width: '60px', height: '60px',
                borderRadius: '50%',
                marginRight: '15px',
                backgroundImage: 'url(' + import.meta.env.BASE_URL + 'yo.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
            </div>
            <div>
              <h4 className="mb-0 fw-bold text-white">Eliam Paredes</h4>
              <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>3D Animations and Programmer</p>
            </div>
            <a href="#admin"
              className="position-absolute text-white-50"
              style={{ top: '15px', right: '15px', textDecoration: 'none', fontSize: '1.2rem', transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(45deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
              title="Panel de Datos">
              ⚙️
            </a>
          </div>

          {/* Educación */}
          <Row className="mb-4 gx-3">
            <Col xs={6}>
              <div className="glass-panel text-center d-flex flex-column justify-content-center p-3 bg-opacity-10 glass-border" style={{ borderRadius: '15px', height: '100%' }}>
                <div className="fs-3 mb-1">📜</div>
                <h6 className="fw-bold mb-1 text-white">ITLA</h6>
                <p className="mb-0 text-white-50" style={{ fontSize: '0.70rem', lineHeight: '1.2' }}>multimedia technician<br />(2020-2024)</p>
              </div>
            </Col>
            <Col xs={6}>
              <div className="glass-panel text-center d-flex flex-column justify-content-center p-3 bg-opacity-10 glass-border" style={{ borderRadius: '15px', height: '100%' }}>
                <div className="fs-3 mb-1">📜</div>
                <h6 className="fw-bold mb-1 text-white">UNAPEC</h6>
                <p className="mb-0 text-white-50" style={{ fontSize: '0.70rem', lineHeight: '1.2' }}>Software Engineering<br />(2024-Present)</p>
              </div>
            </Col>
          </Row>

          <hr className="my-2 mb-4 text-white opacity-25" />

          {/* Upwork */}
          <div
            className="glass-panel glass-card d-flex align-items-center p-3 mb-4 bg-opacity-10 glass-border"
            style={{ borderRadius: '15px' }}
            onClick={() => window.open('https://www.upwork.com/freelancers/~01297e972c464635aa?mp_source=share', '_blank')}
            title="Abrir perfil en Upwork"
          >
            <div
              className="d-flex justify-content-center align-items-center text-white fw-bold fs-5"
              style={{
                width: '50px', height: '50px', backgroundImage: 'url(' + import.meta.env.BASE_URL + 'yo.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center', borderRadius: '50%', marginRight: '15px', border: '1px solid rgba(255,255,255,0.2)'
              }}>

            </div>

            <div>
              <h6 className="mb-1 text-white" style={{ fontWeight: 800 }}>Upwork</h6>
              <div className="d-flex gap-2 mb-1">
                <span className="badge text-success bg-success bg-opacity-25" style={{ fontSize: '0.65rem', border: '1px solid rgba(25, 135, 84, 0.5)' }}>100% Job Success</span>
                <span className="badge text-primary bg-primary bg-opacity-25" style={{ fontSize: '0.65rem', border: '1px solid rgba(13, 110, 253, 0.5)' }}>Top Rated</span>
              </div>
              <div className="text-warning" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>⭐⭐⭐⭐⭐</div>
            </div>

          </div>

          {/* Email */}
          <div
            className="glass-panel glass-card p-3 text-center mt-auto bg-opacity-10 glass-border"
            style={{ borderRadius: '15px' }}
            onClick={handleCopyEmail}
            title="Copiar correo"
          >
            <h6 className="fw-bold mb-1 text-white">Email</h6>
            <p className={emailCopied ? "mb-0 text-success fw-bold" : "mb-0 text-white-50"} style={{ fontSize: '0.85rem' }}>
              {emailCopied ? '¡Copiado al portapapeles!' : 'eliamjesusparedes@gmail.com'}
            </p>
          </div>

        </Offcanvas.Body>
      </Offcanvas>

      {/* 📁 Right Panel (Projects) - Estilo copiado de ContentUI.tsx */}
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
          <Offcanvas.Title className="fw-bold fs-3">✨ Proyectos Destacados</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4" style={{ overflowY: 'auto' }}>
          <p className="lead mb-4">Algunos de mis mejores trabajos en desarrollo y diseño.</p>
          <Row className="g-4">
            {featuredProjects.map(trabajo => (
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
