import { useCallback, useEffect, useRef, useState } from 'react'
import { StatusBar, TabBar } from './components/Chrome.jsx'
import Home from './components/Home.jsx'
import AskSheet from './components/AskSheet.jsx'
import DecisionSheet from './components/DecisionSheet.jsx'
import { initialTasks, decisions, newCarTask } from './data.js'

// Scale the 440×954 phone to fit the desktop viewport; on phones it goes full-bleed via CSS.
function useScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () => {
      if (window.innerWidth <= 520) return setScale(1)
      setScale(Math.min(1, (window.innerHeight - 40) / 954, (window.innerWidth - 40) / 440))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

export default function App() {
  const scale = useScale()
  const [tasks, setTasks] = useState(initialTasks)
  const [sheet, setSheet] = useState(null) // { kind: 'ask', query } | { kind: 'decision', taskId }
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const carTimer = useRef(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  useEffect(() => () => { clearTimeout(toastTimer.current); clearTimeout(carTimer.current) }, [])

  const updateTask = (id, patch) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  const closeSheet = useCallback(() => setSheet(null), [])
  const openAsk = (query = '') => setSheet({ kind: 'ask', query })
  const openDecision = (taskId) => setSheet({ kind: 'decision', taskId })

  // --- Do flow: suggested actions on the trip card ---
  const onTripAction = (id) => {
    if (id === 'checkin') {
      const t = tasks.find((x) => x.id === 'checkin')
      if (!t) return showToast('Asked Mark · usually replies within 2 hours')
      if (t.state === 'attention') return openDecision('checkin')
      if (t.state === 'done') return showToast('Already sorted · check-in at 14:00')
      return showToast('Already asked Mark · waiting for his reply')
    }
    if (id === 'car') {
      if (tasks.some((x) => x.id === 'car')) return showToast('Already working on it')
      setTasks((ts) => [newCarTask, ...ts])
      showToast('On it · comparing rentals for Sept 9–11')
      carTimer.current = setTimeout(() => {
        updateTask('car', { state: 'attention', desc: 'Best option: Sixt at Malpensa, €41/day, free cancellation. Needs your OK' })
      }, 6000)
    }
  }

  const onReview = (task) => {
    if (task.state === 'attention' && decisions[task.id]) return openDecision(task.id)
    if (task.state === 'done') return showToast('All set · details are in your trip')
    showToast('Still running · I will ping you when there is something to decide')
  }

  // --- Decision handlers ---
  const d = sheet?.kind === 'decision' ? decisions[sheet.taskId] : null
  const onAccept = () => { updateTask(sheet.taskId, d.accept.task); closeSheet(); showToast(d.accept.toast) }
  const onAlt = () => { updateTask(sheet.taskId, d.alt.task); closeSheet(); showToast(d.alt.toast) }
  const onDecline = () => { setTasks((ts) => ts.filter((t) => t.id !== sheet.taskId)); closeSheet(); showToast(d.decline.toast) }
  const onFollowUp = () => updateTask(sheet.taskId, { state: 'running', desc: 'Follow-up sent · waiting for a reply' })

  return (
    <div className="stage">
      <div className="phone" style={{ transform: `scale(${scale})` }}>
        <div className="screen">
          <StatusBar />
          <div className={`scroll ${sheet ? 'scroll--dimmed' : ''}`} inert={sheet ? true : undefined}>
            <div className="scroll__bg" />
            <Home tasks={tasks} onAsk={openAsk} onTripAction={onTripAction} onReview={onReview} onToast={showToast} />
          </div>
          <TabBar onTab={(t) => (t === 'Explore' ? null : showToast(`${t}: not part of this prototype`))} />
        </div>

        {sheet?.kind === 'ask' && <AskSheet key={sheet.query} initialQuery={sheet.query} onClose={closeSheet} onToast={showToast} />}
        {sheet?.kind === 'decision' && d && (
          <DecisionSheet decision={d} onClose={closeSheet} onAccept={onAccept} onAlt={onAlt} onDecline={onDecline} onFollowUp={onFollowUp} />
        )}

        {toast && <div className="toast" role="status">{toast}</div>}
      </div>
      <p className="stage__hint">
        Airbnb, AI-native · interactive prototype. Try the search pill, the trip-card actions, and <em>Review</em> under “Working on it”.
      </p>
    </div>
  )
}
