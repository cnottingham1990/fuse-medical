import ScheduleFlow from '@/components/schedule/ScheduleFlow'

export const metadata = { title: 'Schedule — Fuse Medical' }

function ProgressRail() {
  return (
    <div className="progress-rail">
      {['Reason', 'Provider', 'Date', 'Details'].map((label, i) => (
        <div key={label} style={{ display: 'contents' }}>
          {i > 0 && <span className="link" />}
          <div className="step">
            <span className="nm">{i + 1}</span>
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SchedulePage() {
  return (
    <main>
      <section className="sch-hero">
        <div className="sch-hero-wrap">
          <div className="mono mono-label">№ 04 — Book an appointment</div>
          <h1>Schedule<br />a <span className="it">visit.</span></h1>
          <div className="sch-hero-sub">
            <p>
              Reserve a time in just a few steps. For same-day walk-ins, urgent mental health
              concerns, or recovery intake, please call{' '}
              <a href="tel:6067705161" style={{ color: 'var(--blue)', fontWeight: 500 }}>
                (606) 770‑5161
              </a>.
            </p>
            <ProgressRail />
          </div>
        </div>
      </section>
      <ScheduleFlow />
    </main>
  )
}
