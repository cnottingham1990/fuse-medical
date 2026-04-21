'use client'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-wrap">
        <div className="contact-head">
          <div className="mono mono-label">№ 04 — Connect</div>
          <h2>
            We&apos;re here<br />to <span className="it">help.</span>
          </h2>
        </div>
        <div className="contact-grid">
          <div className="contact-left">
            <div className="c-row">
              <div className="k">Call today</div>
              <div className="v">
                <a href="tel:6067705161">(606) 770‑5161</a>
                <span className="sub">FAX (606) 770‑5168</span>
              </div>
            </div>
            <div className="c-row">
              <div className="k">Hours</div>
              <div className="v hrs">
                <div><span>Mon — Thu</span><span className="mono">9 AM — 5 PM</span></div>
                <div><span>Friday</span><span className="mono">9 AM — 12 PM</span></div>
                <div style={{ color: 'var(--muted)' }}><span>Sat — Sun</span><span className="mono">Closed</span></div>
              </div>
            </div>
            <div className="c-row">
              <div className="k">Visit</div>
              <div className="v">202 W 7th Street<br />London, KY 40741</div>
            </div>
            <div className="c-row">
              <div className="k">Recovery intake</div>
              <div className="v"><a href="tel:8599725886">(859) 972‑5886</a></div>
            </div>
          </div>
          <div className="contact-right">
            <h3>Send a message</h3>
            <div className="sub">
              Don&apos;t feel like calling? We&apos;ll get back to you as soon as possible.
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="f-field">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="f-row">
                <div className="f-field">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="f-field">
                  <label htmlFor="phone">Phone *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
              </div>
              <div className="f-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Type your message here" />
              </div>
              <button className="submit" type="submit">Send message →</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
