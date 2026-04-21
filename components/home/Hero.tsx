import Link from 'next/link'

const stats = [
  { num: '10', sup: '+', label: 'Integrated services under one roof' },
  { num: '31', sup: 'yr', label: 'Lead clinician experience' },
  { num: "'21", sup: '', label: 'Locally owned, independent', purple: true },
  { num: '3', sup: '+', label: 'Recovery housing programs' },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-spheres">
        <div className="hero-sphere s-blue" />
        <div className="hero-sphere s-purple" />
        <div className="hero-sphere s-sky" />
      </div>

      <div className="hero-rail">
        <div className="badge">
          <span className="d" />
          Accepting new patients · Walk-ins welcome
        </div>
        <div className="tr">
          <span>London, KY</span>
          <span className="sep" />
          <span>Est. 2021</span>
          <span className="sep" />
          <span>Mon–Fri</span>
        </div>
      </div>

      <div className="hero-l">
        <div className="hero-kicker">
          <span className="mono">Family &amp; Behavioral Medicine</span>
          <span className="n">№ 01</span>
          <span className="mono">— The Fuse approach</span>
        </div>
        <h1 className="hero-h">
          <span className="line">Your health,</span>
          <span className="line">
            <span className="ingood">in good</span>{' '}
            <span className="pp">hands.</span>
          </span>
        </h1>
        <div className="hero-bot">
          <p>
            A truly comprehensive clinic — primary care, behavioral health, medication management,
            addiction treatment and recovery support — all under one warm, welcoming roof in London, Kentucky.
          </p>
          <div className="actions">
            <Link href="/schedule" className="btn btn-d">
              Book appointment <span className="arr">→</span>
            </Link>
            <a href="#services" className="btn btn-o">
              Explore services
            </a>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        {stats.map(({ num, sup, label, purple }) => (
          <article className="hero-stat" key={label}>
            <div className="num">
              {purple ? <span className="pp">{num}</span> : num}
              {sup && <em>{sup}</em>}
            </div>
            <div className="lbl">{label}</div>
          </article>
        ))}
      </div>

    </section>
  )
}
