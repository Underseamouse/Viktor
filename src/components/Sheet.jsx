import { useEffect, useState } from 'react'
import { asset } from '../data.js'

export function Sheet({ title, sub, onClose, footer, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      <button className="sheet__backdrop" aria-label="Close" onClick={onClose} />
      <section className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet__grab" />
        <div className="sheet__head">
          <div>
            <p className="sheet__title">{title}</p>
            {sub && <p className="sheet__sub">{sub}</p>}
          </div>
          <button className="sheet__close" onClick={onClose} aria-label="Close">
            <img src={asset('close.svg')} alt="" />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
        {footer}
      </section>
    </>
  )
}

export function FollowUp({ onSend, placeholder = 'Ask a follow-up…' }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')

  if (!open) {
    return (
      <button className="followup rainbow" onClick={() => setOpen(true)}>
        <span className="followup__left">
          <img className="ai32" src={asset('ai-icon.png')} alt="" />
          {placeholder}
        </span>
        <img className="followup__chevron" src={asset('chevron-left.svg')} alt="" />
      </button>
    )
  }

  const submit = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    onSend(t)
    setText('')
    setOpen(false)
  }

  return (
    <form className="followup rainbow" onSubmit={submit}>
      <img className="ai32" src={asset('ai-icon.png')} alt="" />
      <input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      <button className="followup__send" type="submit" disabled={!text.trim()} aria-label="Send">↑</button>
    </form>
  )
}
