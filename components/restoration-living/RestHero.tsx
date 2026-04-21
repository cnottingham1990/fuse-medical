export default function RestHero() {
  return (
    <section className="rest-hero">
      <div className="rest-hero-l">
        <div className="rest-hero-l-inner">
          <div className="mono mono-label">
            № 03 — Recovery Housing · KYARR &amp; NARR aligned
          </div>
          <h1>Fuse<br />Restoration<br /><span className="it">Living.</span></h1>
          <p>
            Structured, peer-supported recovery housing for men, women, and transgender individuals
            recovering from Substance Use Disorders and co-occurring behavioral health conditions.
          </p>
        </div>
        <div className="intake-bar">
          <div style={{ flex: 1 }}>
            <div className="k">Call for intake</div>
            <a href="tel:8599725886" className="n" style={{ color: 'inherit', textDecoration: 'none' }}>
              (859) 972‑5886
            </a>
          </div>
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="rest-hero-r">
        <div className="rest-hero-r-inner">
          <div className="ph">▢ Recovery housing imagery</div>
          <div className="rest-graphic">
            <div className="rest-doors">
              <div className="rest-door d1"><span>Men&apos;s</span></div>
              <div className="rest-door d2"><span>Women&apos;s</span></div>
              <div className="rest-door d3"><span>Transgender</span></div>
            </div>
          </div>
          <div className="ph" style={{ textAlign: 'right' }}>Peer-supported · Alcohol &amp; drug free</div>
        </div>
      </div>
    </section>
  )
}
