import { useEffect, useRef, useState } from 'react'
import { Sheet, FollowUp } from './Sheet.jsx'
import { asset } from '../data.js'

export default function DecisionSheet({ decision, onClose, onAccept, onAlt, onDecline, onFollowUp }) {
  const [thread, setThread] = useState(decision.thread)
  const [resolved, setResolved] = useState(null)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [thread])

  const send = (text) => {
    setThread((t) => [...t, { from: 'you', text }, { from: 'agent', text: decision.followUp(text) }])
    setResolved('followup')
    onFollowUp(text)
  }

  return (
    <Sheet title={decision.title} sub={decision.sub} onClose={onClose} footer={!resolved ? <FollowUp onSend={send} /> : null}>
      <div className="thread">
        {thread.map((m, i) => {
          if (m.from === 'you') return <div className="msg--you" key={i}><p className="bubble bubble--you">{m.text}</p></div>
          if (m.from === 'host') return (
            <div className="msg--host" key={i}>
              <div className="avatar">{m.initial}</div>
              <div>
                <p className="msg__meta">{m.meta}</p>
                <p className="bubble bubble--host">{m.text}</p>
              </div>
            </div>
          )
          return (
            <div className="card card--agent rainbow" key={i}>
              <img className="ai24" src={asset('ai-icon.png')} alt="" />
              <p>{m.text}</p>
            </div>
          )
        })}

        {!resolved && (
          <>
            <button className="btn-primary" onClick={() => { setResolved('accepted'); onAccept() }}>{decision.primary}</button>
            <div className="chips">
              <button className="chip chip--raised" onClick={onAlt}>{decision.alt.label}</button>
              <button className="chip chip--raised" onClick={onDecline}>{decision.decline.label}</button>
            </div>
          </>
        )}
        {resolved === 'followup' && <p className="resolved">Sent · I'll ping you when there is an answer</p>}
        <div ref={endRef} />
      </div>
    </Sheet>
  )
}
