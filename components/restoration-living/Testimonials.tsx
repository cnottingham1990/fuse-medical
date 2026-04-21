const quotes = [
  { init: 'Q', cls: 'a1', name: 'Quinn', quote: 'Here, you are never judged for your past — you are welcomed for who you are and supported for who you are becoming.' },
  { init: 'B', cls: 'a2', name: 'Breckan', quote: 'We want every client to feel safe, valued, and reminded that they do not have to walk this journey alone.' },
  { init: 'A', cls: 'a3', name: 'Alyssa', quote: 'Our goal is to meet people with compassion and understanding, offering hope and support every step of the way.' },
  { init: 'K', cls: 'a4', name: 'Krystal', quote: 'At Fuse Restoration Living, we believe healing happens best when people are surrounded by kindness, encouragement, and genuine care.' },
]

export default function Testimonials() {
  return (
    <section className="family">
      <div className="family-wrap">
        <div className="mono mono-label">№ 04 — Meet the Family</div>
        <h2>
          Welcomed for who you are,<br />supported for who<br />
          you are <span className="it">becoming.</span>
        </h2>
        <p className="family-intro">
          Every person deserves to be welcomed with kindness, compassion, and dignity. From the
          moment someone walks through our doors, they are met with encouragement, respect, and
          people who truly care.
        </p>
        <div className="q-grid">
          {quotes.map(({ init, cls, name, quote }) => (
            <div className="q-item" key={name}>
              <div className={`av ${cls}`}>{init}</div>
              <div>
                <div className="nm">{name}</div>
                <blockquote>&ldquo;{quote}&rdquo;</blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
