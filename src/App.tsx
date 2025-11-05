import { useState } from 'react'
import Playground from './components/Playground'
import AdminPanel from './components/AdminPanel'
import LanguageLogo from './components/LanguageLogo'

type TabType = 'playground' | 'admin'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('playground')
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('programacion-1')

  return (
    <div className="container">
      <div className="header-with-logo">
        <LanguageLogo subjectId={selectedSubjectId} size={50} />
        <h1 style={{ marginLeft: '15px' }}>Code Playground</h1>
      </div>

      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'playground' ? 'active' : ''}`}
          onClick={() => setActiveTab('playground')}
        >
          Ejercicios
        </button>
        <button
          className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          Panel Docente
        </button>
      </div>

      {activeTab === 'playground' && <Playground onSubjectChange={setSelectedSubjectId} />}
      {activeTab === 'admin' && <AdminPanel />}
    </div>
  )
}

export default App
