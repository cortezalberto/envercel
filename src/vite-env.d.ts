/// <reference types="vite/client" />

/**
 * Type definitions for Vite environment variables
 * This file provides TypeScript support for import.meta.env
 */

interface ImportMetaEnv {
  /**
   * Backend API URL
   * Example: http://localhost:49000
   */
  readonly VITE_API_URL: string

  /**
   * Vite mode (development, production, etc.)
   */
  readonly MODE: string

  /**
   * Base URL for the application
   */
  readonly BASE_URL: string

  /**
   * Whether the app is running in production
   */
  readonly PROD: boolean

  /**
   * Whether the app is running in development
   */
  readonly DEV: boolean

  /**
   * Whether the app is running in SSR mode
   */
  readonly SSR: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
