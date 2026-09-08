import { asset, categories, trip, stateLabel, popularExperiences, exploreCategories, popularHomes } from '../data.js'

function SectionHead({ title, ai, onMore }) {
  return (
    <div className="section__head">
      <h2 className="section__title">
        {ai && <img className="ai24" src={asset('ai-icon.png')} alt="" />}
        {title}
      </h2>
      <button className="iconbtn" aria-label="See all" onClick={onMore}>
        <img src={asset('icons.svg')} alt="" />
      </button>
    </div>
  )
}

function TaskCard({ task, onReview }) {
  const cta = task.state === 'attention' ? 'Review' : task.state === 'done' ? 'Details' : 'Review'
  return (
    <article className="task">
      <div>
        <p className="task__title">{task.title}</p>
        <p className="task__desc">{task.desc}</p>
      </div>
      <div className="task__foot">
        <span className={`state state--${task.state}`}>{stateLabel[task.state]}</span>
        <button className="chip" onClick={() => onReview(task)}>{cta}</button>
      </div>
    </article>
  )
}

export default function Home({ tasks, onAsk, onTripAction, onReview, onToast }) {
  const soon = (what) => () => onToast(`${what}: not part of this prototype`)
  return (
    <div className="content">
      {/* Search pill — the intent entry point */}
      <div className="pill-wrap">
        <button className="pill rainbow" onClick={() => onAsk('')}>
          <span className="pill__left">
            <img className="search" src={asset('magnifying-glass.svg')} alt="" />
            Where to next?
          </span>
          <img className="pill__chevron" src={asset('chevron-left.svg')} alt="" />
        </button>
      </div>

      {/* Category chips */}
      <div className="cats">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`cat ${c.selected ? 'cat--selected' : ''}`}
            onClick={c.action === 'ask' ? () => onAsk('') : soon(c.label)}
          >
            <img src={asset(c.icon)} alt="" />
            {c.label}
          </button>
        ))}
      </div>

      {/* Upcoming trip with suggested actions */}
      <div className="trip-wrap">
        <div className="trip">
          <div className="trip__row">
            <div className="trip__text">
              <p className="trip__title">{trip.title[0]}<br />{trip.title[1]}</p>
              <button className="trip__dates" onClick={soon('Trip details')}>
                {trip.dates}
                <img src={asset('caret-right.svg')} alt="" />
              </button>
            </div>
            <img className="trip__img" src={asset('suitcase.png')} alt="" />
          </div>
          <div className="trip__actions">
            {trip.actions.map((a) => (
              <button key={a.id} className="chip" onClick={() => onTripAction(a.id)}>{a.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Agent task queue */}
      <section className="section">
        <SectionHead title="Working on it" ai onMore={soon('All tasks (Trips tab)')} />
        <div className="tasks">
          {tasks.map((t) => <TaskCard key={t.id} task={t} onReview={onReview} />)}
        </div>
      </section>

      {/* Browse rows, unchanged Airbnb */}
      <section className="section section--tight">
        <SectionHead title="Popular experiences in Como" onMore={soon('Experiences')} />
        <div className="hscroll">
          {popularExperiences.map((e) => (
            <button className="card-l" key={e.title} onClick={soon('Experience page')}>
              <div className="card-l__img">
                <img className="photo" src={asset(e.img)} alt="" />
                <span className="badge">{e.badge}</span>
                <img className="card-l__heart" src={asset('favorite-icon.svg')} alt="" />
              </div>
              <div className="card-l__body">
                <p className="card-l__title">{e.title}</p>
                <p className="card-l__meta">{e.kind}</p>
                <p className="card-l__meta">{e.price}<span className="rating"><img src={asset('star.svg')} alt="" />{e.rating}</span></p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Explore experiences in Como" onMore={soon('Experiences')} />
        <div className="hscroll">
          {exploreCategories.map((e) => (
            <button className="card-l card-s" key={e.title} onClick={soon(e.title)}>
              <div className="card-l__img">
                <img className="photo" src={asset(e.img)} alt="" />
                <img className="card-l__heart" src={asset('favorite-icon.svg')} alt="" />
              </div>
              <div className="card-l__body"><p className="card-l__title">{e.title}</p></div>
            </button>
          ))}
        </div>
      </section>

      <section className="section section--tight">
        <SectionHead title="Popular homes in Italy" onMore={soon('Homes')} />
        <div className="hscroll">
          {popularHomes.map((h, i) => (
            <button className="card-l card-s" key={h.title + i} onClick={soon('Listing page')}>
              <div className="card-l__img">
                <img className="photo" src={asset(h.img)} alt="" />
                <img className="card-l__heart" src={asset('favorite-icon.svg')} alt="" />
              </div>
              <div className="card-l__body">
                <p className="card-l__title">{h.title}</p>
                <p className="card-l__meta card-l__meta--lg">{h.meta}<span className="rating"><img src={asset('star.svg')} alt="" />{h.rating}</span></p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
