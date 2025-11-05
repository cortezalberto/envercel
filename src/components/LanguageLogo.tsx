interface LanguageLogoProps {
  subjectId: string
  size?: number
}

function LanguageLogo({ subjectId, size = 40 }: LanguageLogoProps) {
  // Determinar qué logo mostrar según la materia
  const getLogoContent = () => {
    switch (subjectId) {
      case 'programacion-1':
        // Logo de Python (SVG simplificado)
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 255"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <defs>
              <linearGradient id="pyYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#387EB8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#366994', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="pyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFE873', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFD43B', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#pyYellow)"
              d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
            />
            <path
              fill="url(#pyBlue)"
              d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
            />
          </svg>
        )

      case 'programacion-2':
        // Logo de Java (SVG simplificado)
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 346"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <path
              d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532"
              fill="#5382A1"
            />
            <path
              d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6"
              fill="#E76F00"
            />
            <path
              d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.99-7.411 1.99s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 .001 1.003-.895 1.302-1.697"
              fill="#5382A1"
            />
            <path
              d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37"
              fill="#E76F00"
            />
            <path
              d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201"
              fill="#5382A1"
            />
          </svg>
        )

      case 'programacion-3':
        // Logo de Spring Boot (SVG simplificado con colores oficiales)
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <defs>
              <linearGradient id="springGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#6DB33F', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#78BE20', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="128" cy="128" r="120" fill="url(#springGradient)" />
            <path
              d="M 220,128 A 92,92 0 1,1 36,128"
              fill="none"
              stroke="white"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="170" cy="85" r="22" fill="white" />
            <text
              x="128"
              y="200"
              fontFamily="Arial, sans-serif"
              fontSize="48"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              S
            </text>
          </svg>
        )

      case 'programacion-4':
        // Logo de FastAPI (colores oficiales: teal/verde azulado)
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <defs>
              <linearGradient id="fastapiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#009688', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#05998B', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Círculo de fondo */}
            <circle cx="128" cy="128" r="120" fill="url(#fastapiGradient)" />

            {/* Rayo/Lightning de FastAPI (simplificado) */}
            <path
              d="M 128,40 L 100,120 L 140,120 L 128,216 L 180,100 L 140,100 Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Texto FastAPI */}
            <text
              x="128"
              y="240"
              fontFamily="Arial, sans-serif"
              fontSize="24"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              FastAPI
            </text>
          </svg>
        )

      case 'paradigmas':
        // Logos combinados: Java, Prolog y Haskell (OBLIGATORIO)
        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Logo de Java */}
            <svg
              width={size * 0.6}
              height={size * 0.8}
              viewBox="0 0 256 346"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532"
                fill="#5382A1"
              />
              <path
                d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6"
                fill="#E76F00"
              />
            </svg>

            {/* Logo de SWI-Prolog (búho característico con colores oficiales) */}
            <svg
              width={size * 0.6}
              height={size * 0.6}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <defs>
                <linearGradient id="swiPrologGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#E61B23', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#C41E3A', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Fondo rojo de SWI-Prolog */}
              <circle cx="128" cy="128" r="120" fill="url(#swiPrologGradient)" />

              {/* Búho simplificado (icónico de SWI-Prolog) */}
              {/* Cuerpo del búho */}
              <ellipse cx="128" cy="140" rx="50" ry="65" fill="#FFF" />

              {/* Ojos del búho */}
              <circle cx="110" cy="120" r="18" fill="#333" />
              <circle cx="146" cy="120" r="18" fill="#333" />
              <circle cx="112" cy="118" r="8" fill="#FFF" />
              <circle cx="148" cy="118" r="8" fill="#FFF" />

              {/* Pico */}
              <path d="M 128,130 L 118,140 L 138,140 Z" fill="#FF8C00" />

              {/* Orejas/plumas */}
              <path d="M 90,95 L 100,80 L 105,95 Z" fill="#FFF" />
              <path d="M 166,95 L 156,80 L 151,95 Z" fill="#FFF" />

              {/* Texto SWI */}
              <text
                x="128"
                y="220"
                fontFamily="Arial, sans-serif"
                fontSize="24"
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
              >
                SWI
              </text>
            </svg>

            {/* Logo de Haskell (Lambda con colores oficiales) */}
            <svg
              width={size * 0.6}
              height={size * 0.6}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <defs>
                <linearGradient id="haskellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#5E5086', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#8F4E8B', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="128" cy="128" r="120" fill="url(#haskellGradient)" />
              {/* Lambda λ */}
              <text
                x="128"
                y="170"
                fontFamily="Arial, sans-serif"
                fontSize="110"
                fontWeight="bold"
                fill="white"
                textAnchor="middle"
              >
                λ
              </text>
            </svg>
          </div>
        )

      case 'algoritmos':
        // Logo de PSeInt (colores azul/celeste característicos)
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <defs>
              <linearGradient id="pseintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#357ABD', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Fondo azul */}
            <rect x="0" y="0" width="256" height="256" rx="20" fill="url(#pseintGradient)" />

            {/* Diagrama de flujo característico de PSeInt */}
            {/* Inicio (círculo) */}
            <ellipse cx="128" cy="40" rx="30" ry="15" fill="white" stroke="#333" strokeWidth="2" />

            {/* Flecha */}
            <line x1="128" y1="55" x2="128" y2="75" stroke="white" strokeWidth="3" />
            <polygon points="128,75 123,68 133,68" fill="white" />

            {/* Proceso (rectángulo) */}
            <rect x="88" y="80" width="80" height="40" fill="white" stroke="#333" strokeWidth="2" />
            <text
              x="128"
              y="105"
              fontFamily="Arial, sans-serif"
              fontSize="16"
              fill="#333"
              textAnchor="middle"
            >
              Proceso
            </text>

            {/* Flecha */}
            <line x1="128" y1="120" x2="128" y2="140" stroke="white" strokeWidth="3" />
            <polygon points="128,140 123,133 133,133" fill="white" />

            {/* Decisión (rombo) */}
            <path
              d="M 128,145 L 168,170 L 128,195 L 88,170 Z"
              fill="white"
              stroke="#333"
              strokeWidth="2"
            />
            <text
              x="128"
              y="175"
              fontFamily="Arial, sans-serif"
              fontSize="14"
              fill="#333"
              textAnchor="middle"
            >
              ¿Si?
            </text>

            {/* Texto PSeInt */}
            <text
              x="128"
              y="235"
              fontFamily="Arial, sans-serif"
              fontSize="32"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              PSeInt
            </text>
          </svg>
        )

      case 'frontend':
        // Logos combinados: HTML, CSS, JavaScript y TypeScript (OBLIGATORIO)
        return (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {/* Logo de HTML5 */}
            <svg
              width={size * 0.5}
              height={size * 0.55}
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                fill="#E44D26"
                d="M107.644 470.877l-33.771-378.74h364.253l-33.789 378.72-151.984 42.142z"
              />
              <path fill="#F16529" d="M256 480.523l122.813-34.035 28.885-323.598H256z" />
              <path
                fill="#EBEBEB"
                d="M256 268.217h-60.09l-4.15-46.501H256v-45.411H142.132l1.087 12.183 11.161 125.139H256z"
              />
              <path
                fill="#FFF"
                d="M255.843 379.599l-.253.069-64.253-17.35-4.108-46.039h-45.689l8.087 90.613 118.158 32.786.28-.078z"
              />
            </svg>

            {/* Logo de CSS3 */}
            <svg
              width={size * 0.5}
              height={size * 0.55}
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                fill="#1572B6"
                d="M107.644 470.877l-33.771-378.74h364.253l-33.789 378.72-151.984 42.142z"
              />
              <path fill="#33A9DC" d="M256 480.523l122.813-34.035 28.885-323.598H256z" />
              <path
                fill="#EBEBEB"
                d="M256 268.217h-60.09l-4.15-46.501H256v-45.411H142.132l1.087 12.183 11.161 125.139H256z"
              />
              <path
                fill="#FFF"
                d="M255.843 379.599l-.253.069-64.253-17.35-4.108-46.039h-45.689l8.087 90.613 118.158 32.786.28-.078z"
              />
            </svg>

            {/* Logo de JavaScript */}
            <svg
              width={size * 0.5}
              height={size * 0.5}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <rect width="256" height="256" fill="#F7DF1E" />
              <path
                d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"
                fill="#000"
              />
            </svg>

            {/* Logo de TypeScript */}
            <svg
              width={size * 0.5}
              height={size * 0.5}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <rect width="256" height="256" fill="#3178C6" rx="28" />
              <path
                fill="#FFF"
                d="M56.611 128.85l-.081 10.483h33.32v94.68h23.568v-94.68h33.32v-10.283c0-5.69-.122-10.444-.284-10.566-.122-.162-20.4-.244-44.983-.203l-44.74.122-.12 10.447zm149.955-10.742c6.501 1.626 11.459 4.51 16.01 9.224 2.357 2.52 5.851 7.111 6.136 8.208.08.325-11.053 7.802-17.798 11.987-.244.163-1.22-.894-2.317-2.52-3.291-4.795-6.745-6.868-12.028-7.233-7.76-.528-12.759 3.535-12.718 10.32 0 1.992.284 3.17 1.097 4.795 1.707 3.536 4.876 5.649 14.832 9.955 18.326 7.884 26.168 13.084 31.045 20.48 5.445 8.249 6.664 21.415 2.966 31.208-4.063 10.646-14.14 17.88-28.323 20.277-4.388.772-14.79.65-19.504-.203-10.28-1.829-20.033-6.908-26.047-13.572-2.357-2.601-6.949-9.387-6.664-9.875.122-.163 1.178-.813 2.356-1.504 1.138-.65 5.446-3.129 9.509-5.486l7.355-4.267 1.544 2.276c2.154 3.292 6.867 7.802 9.712 9.305 8.167 4.308 19.383 3.698 24.909-1.26 2.357-2.153 3.332-4.388 3.332-7.68 0-2.966-.366-4.266-1.91-6.501-1.99-2.845-6.054-5.243-17.595-10.24-13.206-5.69-18.895-9.225-24.096-14.833-3.007-3.25-5.852-8.452-7.03-12.8-.975-3.617-1.22-12.678-.447-16.335 2.723-12.76 12.353-21.658 26.25-24.3 4.51-.853 14.994-.528 19.424.569z"
              />
            </svg>
          </div>
        )

      case 'backend':
        // Logos combinados: Python y FastAPI (OBLIGATORIO)
        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {/* Logo de Python */}
            <svg
              width={size * 0.7}
              height={size * 0.7}
              viewBox="0 0 256 255"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <defs>
                <linearGradient id="pyYellowBackend" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#387EB8', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#366994', stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="pyBlueBackend" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFE873', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#FFD43B', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path
                fill="url(#pyYellowBackend)"
                d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
              />
              <path
                fill="url(#pyBlueBackend)"
                d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
              />
            </svg>

            {/* Logo de FastAPI */}
            <svg
              width={size * 0.7}
              height={size * 0.7}
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
            >
              <defs>
                <linearGradient id="fastapiBackendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#009688', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#05998B', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Círculo de fondo */}
              <circle cx="128" cy="128" r="120" fill="url(#fastapiBackendGradient)" />

              {/* Rayo/Lightning de FastAPI */}
              <path
                d="M 128,40 L 100,120 L 140,120 L 128,216 L 180,100 L 140,100 Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )

      default:
        // Logo por defecto (Python)
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 256 255"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin meet"
          >
            <defs>
              <linearGradient id="pyYellowDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#387EB8', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#366994', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="pyBlueDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFE873', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFD43B', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#pyYellowDefault)"
              d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
            />
            <path
              fill="url(#pyBlueDefault)"
              d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
            />
          </svg>
        )
    }
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
      {getLogoContent()}
    </div>
  )
}

export default LanguageLogo
