import Link from 'next/link'

export default function Feature() {
  return (
    <section className="feature">
      <div className="feature-grid">
        <div className="feature-l">
          <div className="mono mono-label">№ 03 — Support for recovery</div>
          <h2>
            Healing begins<br />with being <span className="it">heard</span>,<br />
            and <span className="it">understood</span>.
          </h2>
          <p>
            A safe, welcoming, and judgment-free environment for those seeking help with mental health
            concerns, substance use, and recovery support. Because your story matters here.
          </p>
          <Link
            href="/restoration-living"
            className="btn"
            style={{ background: 'var(--purple-lt)', color: 'var(--blue-ink)', borderColor: 'var(--purple-lt)' }}
          >
            Fuse Restoration Living <span className="arr">→</span>
          </Link>
        </div>
        <div className="feature-r">
          <blockquote>
            &ldquo;Here, you are never judged for your past — you are welcomed for who you are and
            supported for who you are becoming.&rdquo;
          </blockquote>
          <div className="quoter">
            <div className="qp">Q</div>
            <div>
              <div className="qn">Quinn Hunt</div>
              <div className="qr">Clinical Treatment Coordinator</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
