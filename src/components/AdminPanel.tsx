import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { API_BASE_URL } from '../config'
import { AdminSummary, Submission, AdminSubmissionsResponse } from '../types/api'

function AdminPanel() {
  const [summary, setSummary] = useState<AdminSummary | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [summaryRes, submissionsRes] = await Promise.all([
        axios.get<AdminSummary>(`${API_BASE_URL}/api/admin/summary`),
        axios.get<AdminSubmissionsResponse>(`${API_BASE_URL}/api/admin/submissions?limit=20`)
      ])

      setSummary(summaryRes.data)
      setSubmissions(submissionsRes.data.submissions)
    } catch (err) {
      console.error('Error loading admin data:', err as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="admin-panel">Cargando...</div>
  }

  return (
    <div className="admin-panel">
      <h2>📊 Panel Docente</h2>

      {summary && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{summary.total_submissions}</div>
              <div className="stat-label">Total Envíos</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.completed}</div>
              <div className="stat-label">Completados</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.failed}</div>
              <div className="stat-label">Fallados</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.pending}</div>
              <div className="stat-label">Pendientes</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.avg_score.toFixed(1)}</div>
              <div className="stat-label">Puntaje Promedio</div>
            </div>
          </div>

          {summary.by_problem && summary.by_problem.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <h3>Por Problema</h3>
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>Problema</th>
                    <th>Envíos</th>
                    <th>Puntaje Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.by_problem.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.problem_id}</td>
                      <td>{p.submissions}</td>
                      <td>{p.avg_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <h3>Últimos Envíos</h3>
      <button
        onClick={loadData}
        style={{
          padding: '8px 16px',
          marginBottom: '15px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        🔄 Actualizar
      </button>

      <table className="submissions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estudiante</th>
            <th>Problema</th>
            <th>Estado</th>
            <th>Puntaje</th>
            <th>Tests</th>
            <th>Duración</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.student_id || 'N/A'}</td>
              <td>{sub.problem_id}</td>
              <td>
                <span className={`badge ${sub.status}`}>{sub.status}</span>
              </td>
              <td>
                {sub.status === 'completed' && (
                  <span>
                    {sub.score_total}/{sub.score_max}
                  </span>
                )}
              </td>
              <td>
                {sub.status === 'completed' && (
                  <span>
                    ✅ {sub.passed} / ❌ {sub.failed} / ⚠️ {sub.errors}
                  </span>
                )}
              </td>
              <td>{sub.duration_sec ? `${sub.duration_sec}s` : '-'}</td>
              <td>{new Date(sub.created_at).toLocaleString('es-ES')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPanel
