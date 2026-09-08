import { asset } from '../data.js'

export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <div className="statusbar__side">
        <span className="statusbar__time">9:41</span>
        <img src={asset('location.svg')} width="14" height="14" alt="" />
      </div>
      <div className="statusbar__island">
        <img src={asset('lens.svg')} alt="" />
      </div>
      <div className="statusbar__side statusbar__side--right">
        <img src={asset('signal.svg')} width="18" height="14" alt="" />
        <img src={asset('data.svg')} width="18" height="14" alt="" />
        <div className="statusbar__battery">
          <img src={asset('battery.svg')} alt="" />
          <img className="fill" src={asset('vector.svg')} alt="" />
          <span>32</span>
        </div>
      </div>
    </div>
  )
}

const tabs = [
  ['Explore', 'search.svg'],
  ['Wishlists', 'heart-outline.svg'],
  ['Trips', 'logo.svg'],
  ['Messages', 'message-outline.svg'],
  ['Profile', 'profile-outline.svg'],
]

export function TabBar({ onTab }) {
  return (
    <nav className="tabbar" aria-label="Main">
      <div className="tabbar__tabs">
        {tabs.map(([label, icon], i) => (
          <button key={label} className={`tab ${i === 0 ? 'tab--active' : ''}`} onClick={() => onTab(label)}>
            <img src={asset(icon)} alt="" />
            {label}
          </button>
        ))}
      </div>
      <div className="tabbar__home" />
    </nav>
  )
}
