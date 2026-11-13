import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Suppress known Three.js r185 Clock deprecation warning emitted inside R3F internals
const origWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
    return
  }
  origWarn.apply(console, args)
}

createRoot(document.getElementById('root')).render(
  <App />
)

