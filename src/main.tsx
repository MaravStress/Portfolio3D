import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'

// Suppress known third-party deprecation warnings that cannot be fixed from userland
const originalWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('THREE.Clock') ||
    msg.includes('THREE.THREE.Clock') ||
    msg.includes('pass a single object instead') ||
    msg.includes('Browsing Topics API') ||
    msg.includes('PCFSoftShadowMap')
  ) return;
  originalWarn(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
