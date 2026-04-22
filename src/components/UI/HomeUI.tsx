import { useState } from 'react';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import GlassCard from './GlassCard';
import FreelanceCard from './FreelanceCard';
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
    bd["Programming"][0],
    bd["3DAnimations"][0],
    bd["reviews_3D"][0],
    bd["reviews_Programming"][0],
    bd["Programming"][1],
    bd["3DAnimations"][1],
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
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(255,255,255,0.25)',
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
            {/* <a href="#admin"
              className="position-absolute text-white-50"
              style={{ top: '15px', right: '15px', textDecoration: 'none', fontSize: '1.2rem', transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(45deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
              title="Panel de Datos">
              ⚙️
            </a> */}
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

          {/* FreelanceCard */}
          <FreelanceCard
            image={import.meta.env.BASE_URL + 'upworklogo.png'}
            link="https://www.upwork.com/freelancers/~01297e972c464635aa?mp_source=share"
            title="Upwork"
            stars={5}
            tags={[
              { text: '100% Job Success', color: 'success', borderColor: 'rgba(25, 135, 84, 0.5)' },
              { text: 'Top Rated', color: 'primary', borderColor: 'rgba(13, 110, 253, 0.5)' }
            ]}
          />
          {/* <FreelanceCard
            image={import.meta.env.BASE_URL + 'fiverrlogo.svg'}
            link="https://es.fiverr.com/s/bdNQZoW"
            title="Fiverr"
            stars={5}
            tags={[
              { text: '100% Job Success', color: 'success', borderColor: 'rgba(25, 135, 84, 0.5)' },
              { text: 'Top Rated', color: 'primary', borderColor: 'rgba(13, 110, 253, 0.5)' }
            ]}
          /> */}
          {/* <FreelanceCard
            image={import.meta.env.BASE_URL + 'workanalogo.png'}
            link="https://www.workana.com/e/a7b1552d4459a6b06b51ccd0f71cc949"
            title="Workana"
            stars={5}
            tags={[
              { text: '100% Job Success', color: 'success', borderColor: 'rgba(25, 135, 84, 0.5)' },
              { text: 'Top Rated', color: 'primary', borderColor: 'rgba(13, 110, 253, 0.5)' }
            ]}
          /> */}
          {/* <FreelanceCard
            image={import.meta.env.BASE_URL + 'yo.webp'}
            link="https://www.malt.es/profile/eliamjesusparedesguerrero1"
            title="Malt"
            stars={5}
            tags={[
              { text: '100% Job Success', color: 'success', borderColor: 'rgba(25, 135, 84, 0.5)' },
              { text: 'Top Rated', color: 'primary', borderColor: 'rgba(13, 110, 253, 0.5)' }
            ]}
          /> */}
          <FreelanceCard
            image={import.meta.env.BASE_URL + 'linkedInlogo.png'}
            link="https://www.linkedin.com/in/eliam-paredes-803660186/"
            title="LinkedIn"
            stars={5}
            tags={[
              { text: '100% Job Success', color: 'success', borderColor: 'rgba(25, 135, 84, 0.5)' },
              { text: 'Top Rated', color: 'primary', borderColor: 'rgba(13, 110, 253, 0.5)' }
            ]}
          />

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
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          borderLeft: '1px solid rgba(255,255,255,0.25)',
          color: 'white',
          zIndex: 1050,
        }}
      >
        <Offcanvas.Header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Offcanvas.Title className="fw-bold fs-3">✨ Featured Projects</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-4" style={{ overflowY: 'auto' }}>
          <p className="lead mb-4">Some of my best work in development and 3D design.</p>
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
