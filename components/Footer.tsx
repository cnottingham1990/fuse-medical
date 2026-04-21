import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="footer-mega">
          Let&apos;s care<br />for you — <span className="it">together.</span>
        </div>
        <div className="footer-grid">
          <div>
            <p>Physical, mental, emotional — we believe in caring for the whole person. Reach out any time.</p>
          </div>
          <div className="footer-col">
            <h5>Visit</h5>
            <ul>
              <li>202 W 7th Street</li>
              <li>London, KY 40741</li>
              <li>info@fusemedical.org</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Call</h5>
            <ul>
              <li>Office (606) 770‑5161</li>
              <li>FAX (606) 770‑5168</li>
              <li>Intake (859) 972‑5886</li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/restoration-living">Restoration Living</Link></li>
              <li><Link href="/schedule">Schedule</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <div>© 2026 Fuse Medical, LLC · All rights reserved</div>
          <div>For inquiries: info@fusemedical.org</div>
        </div>
      </div>
    </footer>
  )
}
