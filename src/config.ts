/**
 * Frontend configuration
 * Centralizes environment variables and API configuration
 */

// API Base URL - obtiene de variable de entorno o usa proxy local
export const API_BASE_URL = import.meta.env.VITE_API_URL || ''

// Si API_BASE_URL está vacío, las peticiones usarán rutas relativas (/api/...)
// que serán manejadas por el proxy de Vite en desarrollo

// Log configuration in development for debugging
// eslint-disable-next-line no-console
console.log('Frontend Config:', {
  API_BASE_URL,
  mode: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV
})
