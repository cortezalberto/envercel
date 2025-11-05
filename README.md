# 🎨 Python Playground - Frontend

Interfaz web moderna construida con React + TypeScript + Vite para interactuar con la API de Python Playground.

## 📋 Descripción

Frontend interactivo que proporciona:
- **Editor de código**: Monaco Editor con resaltado de sintaxis Python
- **Navegación jerárquica**: Selección de materia → unidad → problema
- **Evaluación en tiempo real**: Polling automático de resultados
- **Sistema de pistas**: 4 niveles de ayuda progresiva
- **Logos dinámicos**: Cambian según la tecnología de la materia
- **Anti-cheating**: Sistema de integridad académica (anti-paste, monitoreo de tabs)
- **Panel administrativo**: Estadísticas y envíos de estudiantes

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+
- npm o yarn

### Instalación y Desarrollo Local

1. **Navegar al directorio del frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar la URL del backend:**
   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env

   # Editar .env y configurar la URL del backend
   VITE_API_URL=http://localhost:49000
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` en el directorio `frontend/`:

```bash
# URL del backend API
# Para desarrollo local:
VITE_API_URL=http://localhost:49000

# Para producción:
# VITE_API_URL=https://api.tu-dominio.com
```

### Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Playground.tsx       # Interfaz principal de estudiante
│   │   ├── AdminPanel.tsx       # Panel administrativo
│   │   └── LanguageLogo.tsx     # Logos dinámicos por materia
│   ├── types/
│   │   └── api.ts               # Interfaces TypeScript de la API
│   ├── config.ts                # Configuración centralizada
│   ├── App.tsx                  # Componente raíz con tabs
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globales
├── public/                      # Assets estáticos
├── .env                         # Variables de entorno (no commitear)
├── .env.example                 # Plantilla de variables de entorno
├── package.json                 # Dependencias
├── tsconfig.json                # Configuración TypeScript
├── vite.config.ts               # Configuración Vite
└── Dockerfile                   # Para despliegue en Docker (opcional)
```

## 📦 Scripts Disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview

# Type checking sin compilar
npx tsc --noEmit

# Linting (si tienes ESLint configurado)
npm run lint
```

## 🎨 Características Principales

### 1. Editor de Código (Monaco Editor)

- **Resaltado de sintaxis**: Python con tema VS Code
- **Autocompletado**: Sugerencias inteligentes
- **Auto-guardado**: El código se persiste en localStorage
- **Multi-línea**: Soporte completo para código complejo

### 2. Navegación Jerárquica

Tres niveles de selección:
1. **📚 Materia**: Ej. Programación 1, Paradigmas, Algoritmos
2. **📖 Unidad Temática**: Ej. Estructuras Secuenciales, Condicionales
3. **🎯 Ejercicio**: Lista de problemas disponibles

### 3. Sistema de Pistas (4 niveles)

- **Nivel 1**: Orientación general
- **Nivel 2**: Guía de funciones
- **Nivel 3**: Ejemplos de sintaxis
- **Nivel 4**: Solución casi completa

Botón: `💡 Dame una pista (2/4)`

### 4. Logos Dinámicos

Los logos cambian automáticamente según la materia:
- **Programación 1**: Python
- **Programación 2**: Java
- **Paradigmas**: Java + SWI-Prolog + Haskell (3 logos)
- **Frontend**: HTML5 + CSS3 + JavaScript + TypeScript (4 logos)
- **Backend**: Python + FastAPI (2 logos)

### 5. Sistema Anti-Cheating

**Anti-Paste:**
- Bloquea Ctrl+V / Cmd+V
- Bloquea click derecho → pegar
- Muestra banner educativo

**Monitoreo de Tabs:**
- Detecta cambio de pestaña
- Detecta minimización de ventana
- 2 advertencias antes de bloqueo
- Bloquea atajos de teclado (Ctrl+T, Ctrl+N, Ctrl+W)

### 6. Visualización de Resultados

- **Puntaje total**: X/Y puntos
- **Tests passed/failed**: Contador visual
- **Tests públicos**: Detalles completos (nombre, outcome, mensaje, duración)
- **Tests ocultos**: Solo pass/fail (sin mensajes de error)
- **Duración de ejecución**: Tiempo total

### 7. Panel Administrativo

- Estadísticas globales:
  - Total de envíos
  - Estudiantes únicos
  - Promedio de puntuación
  - Tasa de completado
- Envíos recientes con filtros
- Desglose por problema

## 🔗 Integración con el Backend

### Conexión Independiente

El frontend se conecta al backend vía HTTP usando la URL configurada en `.env`:

```typescript
// src/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
```

### Endpoints Utilizados

```typescript
// Listar materias
GET ${API_BASE_URL}/api/subjects

// Obtener unidades
GET ${API_BASE_URL}/api/subjects/${subjectId}/units

// Obtener problemas
GET ${API_BASE_URL}/api/subjects/${subjectId}/units/${unitId}/problems

// Enviar código
POST ${API_BASE_URL}/api/submit

// Obtener resultado
GET ${API_BASE_URL}/api/result/${jobId}

// Estadísticas admin
GET ${API_BASE_URL}/api/admin/summary
GET ${API_BASE_URL}/api/admin/submissions?limit=20
```

### Manejo de Errores

El frontend maneja errores de red y muestra alertas amigables:
- Timeout de conexión
- Errores 4xx/5xx del servidor
- Problemas de CORS
- Problemas de parsing JSON

## 🎯 Casos de Uso

### Estudiante

1. Selecciona materia, unidad y problema
2. Ve el enunciado del problema
3. Escribe código en el editor
4. Solicita pistas si necesita ayuda (hasta 4 niveles)
5. Envía código para evaluación
6. Ve resultados en tiempo real (polling cada 1s)
7. Revisa tests públicos fallidos para depurar
8. Reenvía código mejorado

### Instructor

1. Accede al Panel Docente (tab superior)
2. Ve estadísticas globales
3. Revisa envíos recientes
4. Filtra por problema o estudiante
5. Analiza tasas de completado y promedios

## 🐛 Troubleshooting

### El frontend no se conecta al backend

**Solución 1: Verificar URL del backend**
```bash
# Editar frontend/.env
VITE_API_URL=http://localhost:49000

# Reiniciar servidor de desarrollo
npm run dev
```

**Solución 2: Verificar CORS en el backend**
```bash
# En docker-compose.yml o .env del backend
CORS_ALLOW_ALL=true
```

**Solución 3: Verificar que el backend esté corriendo**
```bash
curl http://localhost:49000/api/health
```

### Errores de CORS

Si ves errores de CORS en la consola del navegador:

1. Verificar que el backend tenga CORS configurado correctamente
2. Asegurarse de que `CORS_ALLOW_ALL=true` en desarrollo
3. Verificar que la URL en `VITE_API_URL` sea correcta

### El editor no carga

**Problema**: Monaco Editor no aparece

**Solución**:
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build de producción falla

**Problema**: Errores de TypeScript en build

**Solución**:
```bash
# Verificar types
npx tsc --noEmit

# Si hay errores, corregir y luego:
npm run build
```

## 📱 Responsive Design

El frontend es totalmente responsive:
- **Desktop**: Layout completo con editor amplio
- **Tablet**: Layout adaptado con scrolling
- **Mobile**: Layout vertical optimizado

## 🚀 Despliegue en Producción

### Build para Producción

```bash
# 1. Configurar URL del backend en producción
echo "VITE_API_URL=https://api.tu-dominio.com" > .env

# 2. Build
npm run build

# 3. Verificar output
ls -lh dist/

# 4. Preview local
npm run preview
```

### Opciones de Despliegue

#### Opción 1: Hosting Estático (Recomendado)

Desplegar `dist/` en:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Configurar GitHub Actions
- **AWS S3 + CloudFront**: Subir `dist/` a S3
- **Firebase Hosting**: `firebase deploy`

#### Opción 2: Docker (Opcional)

```bash
# Build de la imagen
docker build -t playground-frontend:latest ./frontend

# Run
docker run -p 5173:5173 \
  -e VITE_API_URL=https://api.tu-dominio.com \
  playground-frontend:latest
```

#### Opción 3: Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/playground-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache estático
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Variables de Entorno en Producción

**IMPORTANTE**: Las variables de entorno de Vite (`VITE_*`) se embeben en el bundle durante el build. Para diferentes entornos:

```bash
# Development
VITE_API_URL=http://localhost:49000 npm run dev

# Staging
VITE_API_URL=https://api-staging.tu-dominio.com npm run build

# Production
VITE_API_URL=https://api.tu-dominio.com npm run build
```

## 🧪 Testing

### Type Checking

```bash
# Verificar tipos sin compilar
npx tsc --noEmit
```

### Manual Testing Checklist

- [ ] Navegación entre materias/unidades/problemas funciona
- [ ] Editor carga correctamente
- [ ] Código se persiste en localStorage
- [ ] Envío de código funciona
- [ ] Polling de resultados funciona
- [ ] Sistema de pistas funciona (4 niveles)
- [ ] Panel admin carga estadísticas
- [ ] Logos dinámicos cambian según materia
- [ ] Anti-paste funciona en el editor
- [ ] Monitoreo de tabs funciona

## 📚 Tecnologías Utilizadas

- **React 18**: UI library
- **TypeScript 5**: Type safety
- **Vite 6**: Build tool y dev server
- **Monaco Editor**: Editor de código (mismo de VS Code)
- **Axios**: HTTP client
- **CSS Modules**: Estilos scoped

## 🤝 Desarrollo

### Agregar Nuevo Componente

```bash
# Crear componente TypeScript
touch src/components/MiComponente.tsx
```

```typescript
// src/components/MiComponente.tsx
import { useState } from 'react'

interface MiComponenteProps {
  titulo: string
  onSubmit: (data: string) => void
}

function MiComponente({ titulo, onSubmit }: MiComponenteProps) {
  const [value, setValue] = useState<string>('')

  return (
    <div>
      <h2>{titulo}</h2>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => onSubmit(value)}>Enviar</button>
    </div>
  )
}

export default MiComponente
```

### Agregar Nuevo Tipo de API

```typescript
// src/types/api.ts
export interface NuevoTipo {
  id: string
  name: string
  data: Record<string, any>
}
```

## 📄 Licencia

MIT License

---

**¿Necesitas ayuda?** Consulta el [README_BACKEND.md](README_BACKEND.md) para documentación de la API.
