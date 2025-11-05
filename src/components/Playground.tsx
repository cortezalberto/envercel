import { useState, useEffect, useCallback, useRef } from 'react'
import Editor from '@monaco-editor/react'
import axios, { AxiosError } from 'axios'
import { API_BASE_URL } from '../config'
import {
  Subject,
  Unit,
  Problem,
  ProblemsResponse,
  SubmissionResult,
  SubmitRequest,
  SubmitResponse,
  SubjectsResponse,
  UnitsResponse
} from '../types/api'

interface PlaygroundProps {
  onSubjectChange?: (subjectId: string) => void
}

function Playground({ onSubjectChange }: PlaygroundProps) {
  // Hierarchy state
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('')
  const [units, setUnits] = useState<Unit[]>([])
  const [selectedUnitId, setSelectedUnitId] = useState<string>('')

  // Problems state
  const [problems, setProblems] = useState<Record<string, Problem>>({})
  const [selectedProblemId, setSelectedProblemId] = useState<string>('')
  const [code, setCode] = useState<string>('')

  // Loading states
  const [subjectsLoading, setSubjectsLoading] = useState<boolean>(true)
  const [unitsLoading, setUnitsLoading] = useState<boolean>(false)
  const [problemsLoading, setProblemsLoading] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [polling, setPolling] = useState<boolean>(false)

  // Result state
  const [result, setResult] = useState<SubmissionResult | null>(null)

  // Hint system state
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0)

  // Refs for cleanup
  const pollingControllerRef = useRef<AbortController | null>(null)
  const pollingTimeoutRef = useRef<number | null>(null)

  // Derived state
  const selectedProblem = problems[selectedProblemId]

  // Anti-cheating: Detect tab/window changes
  useEffect(() => {
    let warningCount = 0
    const MAX_WARNINGS = 2

    const handleVisibilityChange = () => {
      if (document.hidden) {
        warningCount++

        if (warningCount >= MAX_WARNINGS) {
          // Close the window/tab after max warnings
          alert(
            '🚫 NO TE DEJO VER OTRA PÁGINA, SOY UN VIEJO GARCA! 🚫\n\nSe detectó que saliste de la página múltiples veces. La sesión se cerrará por intento de copia.'
          )

          // Try to close the window
          window.close()

          // If window.close() doesn't work (some browsers block it), redirect to a locked page
          setTimeout(() => {
            window.location.href = 'about:blank'
          }, 100)
        } else {
          // First warning
          alert(
            `⚠️ ADVERTENCIA ${warningCount}/${MAX_WARNINGS} ⚠️\n\n¡No cambies de pestaña!\n\nSe detectó que saliste del playground. Esto se considera un intento de copia.\n\nSi sales ${MAX_WARNINGS - warningCount} vez(ces) más, la sesión se cerrará automáticamente.`
          )
        }
      }
    }

    const handleBlur = () => {
      // Additional check for window blur (alt-tab, minimize)
      if (!document.hidden) {
        console.warn('Window lost focus - possible tab switching')
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Prevent easy closing of the tab
      e.preventDefault()
      e.returnValue = '¡Alto ahí! ¿Intentas salir? Esto se considera sospechoso.'
      return '¡Alto ahí! ¿Intentas salir? Esto se considera sospechoso.'
    }

    // Disable right-click context menu to prevent "Open in new tab"
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      alert('🚫 Click derecho deshabilitado durante la sesión de evaluación.')
      return false
    }

    // Detect keyboard shortcuts for new tabs
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+T (new tab), Ctrl+N (new window), Ctrl+Shift+N (incognito)
      if ((e.ctrlKey || e.metaKey) && (e.key === 't' || e.key === 'n' || e.key === 'w')) {
        e.preventDefault()
        alert('🚫 Atajos de teclado para abrir pestañas están bloqueados.')
      }
    }

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Load subjects on mount
  useEffect(() => {
    setSubjectsLoading(true)
    axios
      .get<SubjectsResponse>(`${API_BASE_URL}/api/subjects`)
      .then((res) => {
        const subjectsList = res.data.subjects || []
        setSubjects(subjectsList)
        if (subjectsList.length > 0) {
          setSelectedSubjectId(subjectsList[0].id)
        }
      })
      .catch((err: AxiosError) => {
        console.error('Error loading subjects:', err)
        setResult({
          status: 'error',
          error_message: 'Error al cargar materias. Por favor, recarga la página.'
        })
      })
      .finally(() => setSubjectsLoading(false))
  }, [])

  // Notify parent when subject changes
  useEffect(() => {
    if (selectedSubjectId && onSubjectChange) {
      onSubjectChange(selectedSubjectId)
    }
  }, [selectedSubjectId, onSubjectChange])

  // Load units when subject changes
  useEffect(() => {
    if (!selectedSubjectId) {
      setUnits([])
      setSelectedUnitId('')
      setProblems({})
      setSelectedProblemId('')
      return
    }

    setUnitsLoading(true)
    axios
      .get<UnitsResponse>(`${API_BASE_URL}/api/subjects/${selectedSubjectId}/units`)
      .then((res) => {
        const unitsList = res.data.units || []
        setUnits(unitsList)
        if (unitsList.length > 0) {
          setSelectedUnitId(unitsList[0].id)
        } else {
          setSelectedUnitId('')
        }
      })
      .catch((err: AxiosError) => {
        console.error('Error loading units:', err)
        setUnits([])
        setResult({
          status: 'error',
          error_message: 'Error al cargar unidades temáticas'
        })
      })
      .finally(() => setUnitsLoading(false))
  }, [selectedSubjectId])

  // Load problems when unit changes
  useEffect(() => {
    if (!selectedSubjectId || !selectedUnitId) {
      setProblems({})
      setSelectedProblemId('')
      setCode('')
      return
    }

    setProblemsLoading(true)
    axios
      .get<ProblemsResponse>(
        `${API_BASE_URL}/api/subjects/${selectedSubjectId}/units/${selectedUnitId}/problems`
      )
      .then((res) => {
        const problemsData = res.data.problems || {}
        setProblems(problemsData)
        const firstProblemId = Object.keys(problemsData)[0]
        if (firstProblemId) {
          setSelectedProblemId(firstProblemId)
        } else {
          setSelectedProblemId('')
          setCode('')
        }
      })
      .catch((err: AxiosError) => {
        console.error('Error loading problems:', err)
        setProblems({})
        setResult({
          status: 'error',
          error_message: 'Error al cargar ejercicios'
        })
      })
      .finally(() => setProblemsLoading(false))
  }, [selectedSubjectId, selectedUnitId])

  // Load starter code when problem changes
  useEffect(() => {
    if (selectedProblem) {
      // Store the server's starter code hash to detect changes
      const starterHash = `starter_${selectedProblemId}`
      const currentStarterHash = selectedProblem.starter
        ? selectedProblem.starter.substring(0, 50)
        : ''
      const savedStarterHash = localStorage.getItem(starterHash)

      // If starter code changed on server, clear saved code
      if (savedStarterHash && savedStarterHash !== currentStarterHash) {
        localStorage.removeItem(`code_${selectedProblemId}`)
      }

      // Save current starter hash
      localStorage.setItem(starterHash, currentStarterHash)

      // Try to load saved code from localStorage
      const savedCode = localStorage.getItem(`code_${selectedProblemId}`)
      setCode(savedCode || selectedProblem.starter || '')
      setResult(null)
    }
  }, [selectedProblemId, selectedProblem])

  // Save code to localStorage when it changes
  useEffect(() => {
    if (selectedProblemId && code) {
      localStorage.setItem(`code_${selectedProblemId}`, code)
    }
  }, [code, selectedProblemId])

  // Reset hint level when problem changes
  useEffect(() => {
    setCurrentHintLevel(0)
  }, [selectedProblemId])

  // Cleanup polling on unmount or when problem changes
  useEffect(() => {
    return () => {
      if (pollingControllerRef.current) {
        pollingControllerRef.current.abort()
      }
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current)
      }
    }
  }, [selectedProblemId])

  const pollResult = useCallback(async (jobId: string) => {
    // Create abort controller for this polling session
    const controller = new AbortController()
    pollingControllerRef.current = controller

    const maxAttempts = 30
    let attempts = 0

    const poll = async (): Promise<void> => {
      try {
        const res = await axios.get<SubmissionResult>(`${API_BASE_URL}/api/result/${jobId}`, {
          signal: controller.signal
        })
        const data = res.data

        if (data.status === 'completed' || data.status === 'failed' || data.status === 'timeout') {
          setResult(data)
          setPolling(false)
        } else {
          attempts++
          if (attempts < maxAttempts) {
            pollingTimeoutRef.current = window.setTimeout(poll, 1000)
          } else {
            setResult({
              status: 'error',
              error_message:
                'Timeout esperando resultado (30 segundos). El trabajo puede seguir en ejecución.'
            })
            setPolling(false)
          }
        }
      } catch (err) {
        // Don't show error if polling was cancelled (user changed problem or resubmitted)
        if (axios.isCancel(err) || (err as Error).name === 'AbortError') {
          return
        }

        console.error('Error polling:', err)
        setResult({
          status: 'error',
          error_message: 'Error consultando resultado'
        })
        setPolling(false)
      }
    }

    poll()
  }, [])

  const handleSubmit = async () => {
    if (!selectedProblemId || !code.trim()) {
      setResult({
        status: 'error',
        error_message: 'Debes seleccionar un problema y escribir código'
      })
      return
    }

    // Cancel any ongoing polling
    if (pollingControllerRef.current) {
      pollingControllerRef.current.abort()
    }
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current)
    }

    setSubmitting(true)

    try {
      const submitData: SubmitRequest = {
        problem_id: selectedProblemId,
        code: code,
        student_id: 'demo-student'
      }

      const submitRes = await axios.post<SubmitResponse>(`${API_BASE_URL}/api/submit`, submitData)
      const jobId = submitRes.data.job_id

      // Clear previous result and start polling
      setResult(null)
      setSubmitting(false)
      setPolling(true)
      pollResult(jobId)
    } catch (err) {
      console.error('Error submitting:', err)

      let errorMessage = 'Error desconocido al enviar código'

      if (axios.isAxiosError(err)) {
        if (err.response) {
          // Server responded with error status
          errorMessage = err.response.data?.detail || `Error del servidor: ${err.response.status}`
        } else if (err.request) {
          // Request made but no response
          errorMessage = 'Error de conexión. Verifica tu conexión a internet.'
        }
      }

      setResult({
        status: 'error',
        error_message: errorMessage
      })
      setSubmitting(false)
      setPolling(false)
    }
  }

  const handleReset = () => {
    if (selectedProblem) {
      setCode(selectedProblem.starter || '')
      localStorage.removeItem(`code_${selectedProblemId}`)
      setResult(null)
    }
  }

  const handleHint = () => {
    if (
      !selectedProblem ||
      !selectedProblem.metadata.hints ||
      selectedProblem.metadata.hints.length === 0
    ) {
      alert(
        '💡 Pista: Lee cuidadosamente el enunciado del problema. Asegúrate de usar la función main() y leer la entrada con input().'
      )
      return
    }

    const hints = selectedProblem.metadata.hints
    const maxLevel = hints.length

    if (currentHintLevel >= maxLevel) {
      alert(
        `🎓 Ya has visto todas las pistas disponibles (${maxLevel}/${maxLevel}).\n\n¡Intenta resolver el problema con la información que tienes!`
      )
      return
    }

    const hintMessage = `💡 Pista ${currentHintLevel + 1} de ${maxLevel}:\n\n${hints[currentHintLevel]}`

    if (currentHintLevel === maxLevel - 1) {
      alert(`${hintMessage}\n\n⚠️ Esta es la última pista disponible.`)
    } else {
      alert(hintMessage)
    }

    setCurrentHintLevel(currentHintLevel + 1)
  }

  const loading = submitting || polling

  return (
    <>
      {/* Anti-cheating warning banner */}
      <div
        style={{
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '12px 20px',
          marginBottom: '20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          border: '2px solid #cc0000',
          boxShadow: '0 2px 8px rgba(255,68,68,0.3)'
        }}
      >
        🚨 <strong>ADVERTENCIA DE INTEGRIDAD ACADÉMICA</strong> 🚨
        <div style={{ fontSize: '13px', marginTop: '8px', fontWeight: 'normal' }}>
          Esta sesión está siendo monitoreada. Si cambias de pestaña o minimizas la ventana,
          recibirás advertencias. Después de 2 advertencias, la sesión se cerrará automáticamente.
          ¡No intentes copiar!
        </div>
      </div>

      <div className="problem-selector">
        <div className="selector-group">
          <label htmlFor="subject-select">📚 Materia:</label>
          <select
            id="subject-select"
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            disabled={subjectsLoading}
          >
            {subjectsLoading ? (
              <option value="">Cargando materias...</option>
            ) : (
              <>
                <option value="">Selecciona una materia...</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="unit-select">📖 Unidad Temática:</label>
          <select
            id="unit-select"
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value)}
            disabled={!selectedSubjectId || unitsLoading}
          >
            {unitsLoading ? (
              <option value="">Cargando unidades...</option>
            ) : (
              <>
                <option value="">Selecciona una unidad...</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="problem-select">🎯 Ejercicio:</label>
          <select
            id="problem-select"
            value={selectedProblemId}
            onChange={(e) => setSelectedProblemId(e.target.value)}
            disabled={!selectedUnitId || problemsLoading}
          >
            {problemsLoading ? (
              <option value="">Cargando ejercicios...</option>
            ) : (
              <>
                <option value="">Selecciona un ejercicio...</option>
                {Object.keys(problems).map((key) => (
                  <option key={key} value={key}>
                    {problems[key].metadata?.title || key}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      <div className="editor-container">
        <div className="panel">
          <h2>📝 Enunciado</h2>
          <div className="prompt">
            {selectedProblem?.prompt ? (
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {selectedProblem.prompt}
              </pre>
            ) : (
              <p>Selecciona un problema para comenzar</p>
            )}
          </div>
        </div>

        <div className="panel">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <h2 style={{ margin: 0 }}>💻 Editor</h2>
            <button
              onClick={handleHint}
              style={{
                backgroundColor:
                  currentHintLevel >= (selectedProblem?.metadata.hints?.length || 0) &&
                  selectedProblem?.metadata.hints
                    ? '#9E9E9E'
                    : '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: !selectedProblem ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.3s',
                opacity: !selectedProblem ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (
                  selectedProblem &&
                  currentHintLevel < (selectedProblem?.metadata.hints?.length || 0)
                ) {
                  e.currentTarget.style.backgroundColor = '#45a049'
                }
              }}
              onMouseLeave={(e) => {
                if (
                  currentHintLevel >= (selectedProblem?.metadata.hints?.length || 0) &&
                  selectedProblem?.metadata.hints
                ) {
                  e.currentTarget.style.backgroundColor = '#9E9E9E'
                } else {
                  e.currentTarget.style.backgroundColor = '#4CAF50'
                }
              }}
              disabled={!selectedProblem}
              title={
                !selectedProblem
                  ? 'Selecciona un problema primero'
                  : currentHintLevel >= (selectedProblem?.metadata.hints?.length || 0) &&
                      selectedProblem?.metadata.hints
                    ? `Has visto todas las pistas (${currentHintLevel}/${selectedProblem.metadata.hints.length})`
                    : selectedProblem?.metadata.hints
                      ? `Pista ${currentHintLevel + 1} de ${selectedProblem.metadata.hints.length}`
                      : 'Ver pista'
              }
            >
              💡 Dame una pista{' '}
              {selectedProblem?.metadata.hints &&
                currentHintLevel > 0 &&
                `(${currentHintLevel}/${selectedProblem.metadata.hints.length})`}
            </button>
          </div>
          <div
            className="paste-warning"
            style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '8px 12px',
              borderRadius: '4px',
              marginBottom: '10px',
              fontSize: '13px',
              border: '1px solid #ffeaa7'
            }}
          >
            ℹ️ <strong>Nota:</strong> Pegar código está deshabilitado para fomentar el aprendizaje.
            Escribe tu solución.
          </div>
          <div className="editor-wrapper">
            <Editor
              height="400px"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={(editor, monaco) => {
                // Prevent paste via keyboard shortcuts
                editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
                  // Block paste command
                  alert('⚠️ Pegar código está deshabilitado. Por favor, escribe tu solución.')
                  return null // Return null to prevent default paste behavior
                })

                // Prevent paste via context menu
                const domNode = editor.getDomNode()
                if (domNode) {
                  domNode.addEventListener('paste', (e) => {
                    e.preventDefault()
                    alert('⚠️ Pegar código está deshabilitado. Por favor, escribe tu solución.')
                  })
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false
              }}
            />
          </div>
          <div className="button-group">
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
            >
              {submitting
                ? '📤 Enviando...'
                : polling
                  ? '⏳ Ejecutando tests...'
                  : '▶️ Ejecutar tests'}
            </button>
            <button
              className="reset-btn"
              onClick={handleReset}
              disabled={loading || !selectedProblem}
            >
              🔄 Reiniciar código
            </button>
          </div>

          {/* Resultados de tests - Movido aquí debajo de los botones */}
          {result && (
            <div className="results" style={{ marginTop: '20px' }}>
              <h3>📊 Resultados</h3>

              {result.status === 'completed' && (
                <>
                  <div className={`status ${result.ok ? 'success' : 'error'}`}>
                    {result.ok ? '✅ Todos los tests pasaron!' : '❌ Algunos tests fallaron'}
                  </div>

                  <div className="score">
                    Puntaje: {result.score_total || 0} / {result.score_max || 0}
                  </div>

                  <div>
                    <strong>Tests:</strong> {result.passed || 0} pasados, {result.failed || 0}{' '}
                    fallados, {result.errors || 0} errores
                  </div>
                  <div>
                    <strong>Duración:</strong> {result.duration_sec || 0}s
                  </div>

                  {result.test_results && result.test_results.length > 0 && (
                    <div className="test-results">
                      <h4>Detalle de tests:</h4>
                      {result.test_results
                        .filter((t) => t.visibility === 'public')
                        .map((test, idx) => (
                          <div key={idx} className={`test-item ${test.outcome}`}>
                            <div className="test-name">
                              {test.outcome === 'passed' && '✅ '}
                              {test.outcome === 'failed' && '❌ '}
                              {test.outcome === 'error' && '⚠️ '}
                              {test.test_name} ({test.points}/{test.max_points} pts)
                            </div>
                            {test.message && <div className="test-message">{test.message}</div>}
                          </div>
                        ))}

                      {result.test_results.some((t) => t.visibility === 'hidden') && (
                        <div className="test-item" style={{ borderLeftColor: '#94a3b8' }}>
                          <div className="test-name">🔒 Tests ocultos ejecutados</div>
                          <div className="test-message">
                            Los detalles de los tests ocultos no son visibles
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {result.stdout && (
                    <div className="output-section">
                      <h4>Salida estándar:</h4>
                      <pre className="output-pre">{result.stdout}</pre>
                    </div>
                  )}

                  {result.stderr && (
                    <div className="output-section">
                      <h4>Errores:</h4>
                      <pre className="output-pre">{result.stderr}</pre>
                    </div>
                  )}
                </>
              )}

              {result.status === 'timeout' && (
                <div className="status error">⏱️ Timeout: {result.error_message}</div>
              )}

              {result.status === 'failed' && (
                <div className="status error">❌ Error: {result.error_message}</div>
              )}

              {result.status === 'error' && (
                <div className="status error">❌ {result.error_message}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Playground
