import { useState } from 'react';
import { Container, Alert, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import bd from '../bd.json';

type Project = {
  id: string;
  titulo: string;
  etiquetas: string[];
  imagen: string;
  descripcion: string;
};

type BDType = Record<string, Project[]>;

export default function AdminUI() {
  const [data, setData] = useState<BDType>(bd as BDType);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(Object.keys(bd)[0]);

  // Manejar actualización de un proyecto específico
  const updateProject = (category: string, projectId: string, field: keyof Project, value: string) => {
    setData((prev) => {
      const categoryData = prev[category] || [];
      const updatedCategory = categoryData.map((p) => {
        if (p.id === projectId) {
          if (field === 'etiquetas') {
            return { ...p, etiquetas: value.split(',').map((s) => s.trim()).filter(Boolean) };
          }
          return { ...p, [field]: value };
        }
        return p;
      });
      return { ...prev, [category]: updatedCategory };
    });
  };

  // Agregar nuevo proyecto a la categoría
  const addProject = (category: string) => {
    setData((prev) => {
      const categoryData = prev[category] || [];
      const newId = category + '-' + Date.now();
      const newProject: Project = {
        id: newId,
        titulo: 'Nuevo Proyecto',
        etiquetas: ['Ejemplo'],
        imagen: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=400&q=80',
        descripcion: 'Descripción aquí',
      };
      return { ...prev, [category]: [newProject, ...categoryData] };
    });
  };

  // Eliminar proyecto
  const deleteProject = (category: string, projectId: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar este proyecto?')) return;
    setData((prev) => {
      const categoryData = prev[category] || [];
      return { ...prev, [category]: categoryData.filter((p) => p.id !== projectId) };
    });
  };

  // Mover proyecto
  const moveProject = (category: string, index: number, direction: 'up' | 'down') => {
    setData((prev) => {
      const categoryData = [...(prev[category] || [])];
      
      if (direction === 'up' && index > 0) {
        [categoryData[index - 1], categoryData[index]] = [categoryData[index], categoryData[index - 1]];
      } else if (direction === 'down' && index < categoryData.length - 1) {
        [categoryData[index + 1], categoryData[index]] = [categoryData[index], categoryData[index + 1]];
      }
      
      return { ...prev, [category]: categoryData };
    });
  };

  // Copiar JSON
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Descargar JSON
  const downloadJson = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bd.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Container fluid className="py-5 d-flex flex-column" style={{ height: '100vh', backgroundColor: '#0f0f1e', color: 'white', overflowY: 'auto' }}>
      <Container className="flex-grow-1 d-flex flex-column">
        <h1 className="fw-bold mb-3 d-flex align-items-center">
          <span className="me-3">⚙️</span> Editor Visual de Datos
        </h1>
        <p className="text-white-50 mb-4" style={{ fontSize: '1.1rem' }}>
          Edita la información de tus proyectos utilizando los formularios a continuación.
          Recuerda finalizar haciendo clic en <strong>Copiar Cambios</strong> y reemplazando tu archivo <code>src/components/bd.json</code>.
        </p>

        {copied && (
          <Alert variant="success" className="glass-panel glass-border p-3 d-flex align-items-center bg-success bg-opacity-25 text-white border-0 fw-bold">
            ✅ ¡Código copiado! Pégalo en tu archivo local bd.json
          </Alert>
        )}

        <div className="d-flex gap-3 pb-4 pt-2">
          <button
            className="btn btn-success fw-bold px-4 py-2 rounded-pill d-flex align-items-center flex-grow-1 justify-content-center"
            onClick={copyToClipboard}
            style={{ transition: 'all 0.3s' }}
          >
            <span className="me-2 text-white">📋</span> {copied ? 'Copiado al Portapapeles' : 'Copiar Cambios'}
          </button>
          <button
            className="btn btn-primary fw-bold px-4 py-2 rounded-pill d-flex align-items-center flex-grow-1 justify-content-center"
            onClick={downloadJson}
            style={{ transition: 'all 0.3s' }}
          >
            <span className="me-2 text-white">💾</span> Descargar bd.json
          </button>
          <button
            className="btn btn-outline-light fw-bold px-4 py-2 rounded-pill d-flex align-items-center glass-card"
            onClick={() => window.location.hash = ''}
          >
            <span className="me-2">🔙</span> Volver al Portafolio
          </button>
        </div>

        {/* CONTENEDOR MULTI-TABS */}
        <div className="glass-panel glass-border p-4 mb-4 flex-grow-1" style={{ borderRadius: '15px' }}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => k && setActiveTab(k)}
            className="mb-4 custom-tabs border-secondary"
          >
            {Object.keys(data).map((category) => (
              <Tab eventKey={category} title={category.replace('_', ' ').toUpperCase()} key={category}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold m-0 text-white">Proyectos en {category.replace('_', ' ')}</h4>
                  <button className="btn btn-primary rounded-pill fw-bold" onClick={() => addProject(category)}>
                    + Agregar Proyecto
                  </button>
                </div>

                <div className="d-flex flex-column gap-4">
                  {(data[category] || []).length === 0 ? (
                    <div className="text-center text-white-50 p-5 glass-panel bg-dark bg-opacity-25 border-0">
                      No hay proyectos en esta categoría.
                    </div>
                  ) : (
                    (data[category] || []).map((project, index) => (
                      <div key={project.id} className="glass-panel bg-dark bg-opacity-50 border-secondary position-relative p-4" style={{ borderRadius: '12px' }}>
                        <div className="position-absolute top-0 end-0 p-3 d-flex gap-2">
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => moveProject(category, index, 'up')}
                            disabled={index === 0}
                            title="Mover arriba"
                          >
                            ⬆️
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => moveProject(category, index, 'down')}
                            disabled={index === (data[category] || []).length - 1}
                            title="Mover abajo"
                          >
                            ⬇️
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteProject(category, project.id)}>
                            🗑️ Eliminar
                          </button>
                        </div>
                        <h5 className="text-secondary fw-bold mb-3"># {index + 1} | ID: {project.id}</h5>

                        <Row className="g-4">
                          <Col md={8}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold text-white-50">Título del Proyecto</Form.Label>
                              <Form.Control
                                type="text"
                                className="bg-black bg-opacity-25 text-white border-secondary"
                                value={project.titulo}
                                onChange={(e) => updateProject(category, project.id, 'titulo', e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold text-white-50">Etiquetas (separadas por coma)</Form.Label>
                              <Form.Control
                                type="text"
                                className="bg-black bg-opacity-25 text-white border-secondary"
                                value={project.etiquetas.join(', ')}
                                onChange={(e) => updateProject(category, project.id, 'etiquetas', e.target.value)}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label className="fw-bold text-white-50">URL de Imagen</Form.Label>
                              <Form.Control
                                type="text"
                                className="bg-black bg-opacity-25 text-white border-secondary"
                                value={project.imagen}
                                onChange={(e) => updateProject(category, project.id, 'imagen', e.target.value)}
                              />
                            </Form.Group>
                          </Col>

                          <Col md={4} className="d-flex align-items-center justify-content-center">
                            <div
                              className="w-100 rounded bg-black bg-opacity-25 border border-secondary"
                              style={{
                                height: '200px',
                                backgroundImage: `url(${project.imagen})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            >
                              {!project.imagen && <span className="d-flex h-100 align-items-center justify-content-center text-white-50">Sin Imagen</span>}
                            </div>
                          </Col>

                          <Col xs={12}>
                            <Form.Group>
                              <Form.Label className="fw-bold text-white-50">Descripción (Soporta [Texto](URL) para botones)</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                className="bg-black bg-opacity-25 text-white border-secondary"
                                value={project.descripcion}
                                onChange={(e) => updateProject(category, project.id, 'descripcion', e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                      </div>
                    ))
                  )}
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>

      </Container>
    </Container>
  );
}
