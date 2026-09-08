import { useEffect, useState } from 'react'
import { Sheet, FollowUp } from './Sheet.jsx'
import { asset, askSuggestions, answerFor } from '../data.js'

// Phases: input → analysing → results (→ analysing on refine / follow-up)
export default function AskSheet({ initialQuery = '', onClose, onToast }) {
  const [phase, setPhase] = useState(initialQuery ? 'analysing' : 'input')
  const [query, setQuery] = useState(initialQuery)
  const [answer, setAnswer] = useState(null)
  const [pending, setPending] = useState(initialQuery ? fresh(initialQuery) : null)

  useEffect(() => {
    if (phase !== 'analysing') return
    const t = setTimeout(() => {
      setAnswer(pending)
      setPhase('results')
    }, answer ? 1300 : 1900)
    return () => clearTimeout(t)
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function fresh(q) {
    const set = answerFor(q)
    return { set, brief: set.brief, results: set.results, refine: set.refine, note: null }
  }

  const submit = () => {
    const q = query.trim()
    if (!q) return
    setPending(fresh(q))
    setPhase('analysing')
  }

  const refine = (label) => {
    const r = answer.set.refined[label]
    if (!r) return
    setPending({ ...answer, results: r.results, note: r.note, refine: answer.refine.filter((x) => x !== label) })
    setPhase('analysing')
  }

  const followUp = (text) => {
    setPending({ ...answer, note: `Applied “${text}”. Dates and prices re-checked.` })
    setPhase('analysing')
  }

  const title = phase === 'input' ? 'Where to next?' : query

  return (
    <Sheet title={title} onClose={onClose} footer={phase === 'results' ? <FollowUp onSend={followUp} /> : null}>
      {phase === 'input' && (
        <>
          <div className="card card--compact rainbow">
            <div className="card__head">
              <img className="ai24" src={asset('ai-icon.png')} alt="" />
              <p className="card__title">Tell me about the trip</p>
            </div>
            <textarea
              className="ask-input"
              autoFocus
              rows={3}
              placeholder="Where, when, who's coming, what matters…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
            />
            <div className="chips chips--wrap">
              {askSuggestions.map((s) => (
                <button key={s} className="chip" onClick={() => setQuery(s)}>{s}</button>
              ))}
            </div>
            <p className="ask-hint">I'll turn this into a brief you can edit, then pick 2–3 stays that fit.</p>
          </div>
          <button className="btn-primary" disabled={!query.trim()} onClick={submit}>Find my trip</button>
        </>
      )}

      {phase === 'analysing' && (
        <div className="card card--compact rainbow">
          <div className="card__head">
            <img className="ai24 ai-spin" src={asset('ai-icon.png')} alt="" />
            <p className="card__title card__title--muted">Analysing your request...</p>
          </div>
        </div>
      )}

      {phase === 'results' && answer && (
        <>
          <div className="card rainbow">
            <div className="card__head">
              <img className="ai24" src={asset('ai-icon.png')} alt="" />
              <p className="card__title card__title--rausch">Here is what I found for your next trip</p>
            </div>
            <div className="brief">
              <span>{answer.brief}</span>
              <button className="link" onClick={() => setPhase('input')}>Edit</button>
            </div>
            <div className="results">
              {answer.results.map((r) => (
                <button className="card-r" key={r.title + r.price} onClick={() => onToast('Listing page: not part of this prototype')}>
                  <img src={asset(r.img)} alt="" />
                  <div className="card-r__body">
                    <p className="card-r__title">{r.title}</p>
                    <p className="card-r__desc">{r.lines[0]}<br />{r.lines[1]}</p>
                    <p className="card-r__price">{r.price}</p>
                  </div>
                </button>
              ))}
            </div>
            {answer.note && (
              <p className="note">
                <img className="ai16" src={asset('ai-icon.png')} alt="" />
                <span>{answer.note}</span>
              </p>
            )}
          </div>
          {answer.refine.length > 0 && (
            <div className="chips">
              {answer.refine.map((l) => (
                <button key={l} className="chip chip--raised" onClick={() => refine(l)}>{l}</button>
              ))}
            </div>
          )}
        </>
      )}
    </Sheet>
  )
}
