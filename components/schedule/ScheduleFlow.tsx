'use client'
import { useState } from 'react'
import Link from 'next/link'

type Reason = { id: string; title: string; desc: string; icon: keyof typeof ICONS }
type Provider = { id: string; name: string; role: string; avBg?: string; init: string }

const ICONS = {
  heart: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14s-5-3.2-5-7A3 3 0 0 1 8 5a3 3 0 0 1 5 2c0 3.8-5 7-5 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  brain: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3a2 2 0 0 0-2 2v.5A2 2 0 0 0 2 7.5c0 .8.5 1.5 1 2 0 1 .5 2 2 2.5M10 3a2 2 0 0 1 2 2v.5a2 2 0 0 1 2 2c0 .8-.5 1.5-1 2 0 1-.5 2-2 2.5M8 3v10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  child: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.3"/><path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  leaf: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 2c0 6-4 10-10 10M4 12c0-4 3-8 8-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  user: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M3 14c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  chat: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10v7H6l-3 2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
}

const REASONS: Reason[] = [
  { id: 'primary',  title: 'Primary care visit',   desc: 'Annual physical, check-ups, chronic care, acute illness.', icon: 'heart' },
  { id: 'behavior', title: 'Behavioral health',    desc: 'Therapy, medication management, psychiatric care.',        icon: 'brain' },
  { id: 'peds',     title: 'Pediatric care',       desc: 'For children and adolescents.',                            icon: 'child' },
  { id: 'recovery', title: 'Addiction & recovery', desc: 'IOP, outpatient, MAT consultation.',                       icon: 'leaf'  },
  { id: 'newpt',    title: 'New patient consult',  desc: 'First visit — get established with a provider.',           icon: 'user'  },
  { id: 'other',    title: 'Something else',       desc: "Not sure? We'll help you find the right care.",            icon: 'chat'  },
]

const AV_GR: Record<string, string> = {
  'a-blue':   'linear-gradient(135deg,#1F8BCC,#0C4466)',
  'a-purple': 'linear-gradient(135deg,#8A6FD6,#4F3A85)',
  'a-deep':   'linear-gradient(135deg,#0C4466,#072C44)',
}

const PROVIDERS: Provider[] = [
  { id: 'any',      name: 'First available',  role: 'Soonest appointment',         init: '*' },
  { id: 'tammy',    name: 'Tammy Whitehead',  role: 'Lead Clinician · PMHNP',      avBg: 'a-blue',   init: 'T' },
  { id: 'devin',    name: 'Devin Whitehead',  role: 'Family Nurse Practitioner',   avBg: 'a-purple', init: 'D' },
  { id: 'hannah',   name: 'Hannah Norris',    role: 'Family Nurse Practitioner',   avBg: 'a-deep',   init: 'H' },
  { id: 'cheyenne', name: 'Cheyenne Hamblin', role: 'Psychiatric Mental Health NP',avBg: 'a-purple', init: 'C' },
  { id: 'bobbie',   name: 'Bobbie Zhang',     role: 'Psychiatric Mental Health NP',avBg: 'a-deep',   init: 'B' },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function hashStr(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0 }
  return Math.abs(h)
}

function dateKey(d: Date) { return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` }

function dayAvailability(d: Date) {
  const dow = d.getDay()
  if (dow === 0 || dow === 6) return { open: false, start: 0, end: 0 }
  return { open: true, start: 9, end: dow === 5 ? 12 : 17 }
}

function getSlotsFor(d: Date, providerId: string) {
  const a = dayAvailability(d)
  if (!a.open) return []
  const today = new Date(); today.setHours(0,0,0,0)
  const cmp = new Date(d); cmp.setHours(0,0,0,0)
  const isToday = cmp.getTime() === today.getTime()
  const now = new Date()
  const slots: string[] = []
  for (let h = a.start; h < a.end; h++) {
    for (const m of [0, 30]) {
      if (isToday) {
        if (h < now.getHours()) continue
        if (h === now.getHours() && m <= now.getMinutes()) continue
      }
      const hh = h > 12 ? h - 12 : h === 0 ? 12 : h
      const ampm = h >= 12 ? 'PM' : 'AM'
      slots.push(`${hh}:${m === 0 ? '00' : '30'} ${ampm}`)
    }
  }
  const seed = hashStr((providerId || 'any') + '_' + dateKey(d))
  return slots.filter((_, i) => { const v = (seed + i * 17) % 7; return v !== 0 && v !== 3 })
}

function hasSlotsFor(d: Date, providerId: string) {
  const a = dayAvailability(d)
  if (!a.open) return false
  const today = new Date(); today.setHours(0,0,0,0)
  const cmp = new Date(d); cmp.setHours(0,0,0,0)
  if (cmp < today) return false
  if (cmp.getTime() === today.getTime()) return new Date().getHours() < a.end - 1
  return getSlotsFor(d, providerId).length > 0
}

type FormData = { first: string; last: string; dob: string; phone: string; email: string; kind: string; ins: string; notes: string; consent: boolean }

const emptyForm: FormData = { first: '', last: '', dob: '', phone: '', email: '', kind: '', ins: '', notes: '', consent: false }

function nowCursor() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), 1) }

export default function ScheduleFlow() {
  const [stepIdx, setStepIdx] = useState(0)
  const [reason, setReason] = useState<Reason | null>(null)
  const [provider, setProvider] = useState<Provider | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [cursor, setCursor] = useState<Date>(nowCursor)
  const [confirmed, setConfirmed] = useState(false)

  const canContinue =
    (stepIdx === 0 && !!reason) ||
    (stepIdx === 1 && !!provider) ||
    (stepIdx === 2 && !!(date && slot)) ||
    (stepIdx === 3 && !!(form.first && form.last && form.dob && form.phone && form.email && form.kind && form.consent))

  const next = () => {
    if (stepIdx < 3) { setStepIdx(stepIdx + 1) }
    else { setConfirmed(true) }
  }
  const back = () => { if (stepIdx > 0) setStepIdx(stepIdx - 1) }

  const today = new Date(); today.setHours(0,0,0,0)
  const firstDow = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay()
  const lastDate = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate()
  const maxCursor = new Date(); maxCursor.setMonth(maxCursor.getMonth() + 3); maxCursor.setDate(1)
  const atMin = cursor.getFullYear() === today.getFullYear() && cursor.getMonth() === today.getMonth()
  const atMax = cursor.getFullYear() === maxCursor.getFullYear() && cursor.getMonth() === maxCursor.getMonth()

  const slots = date ? getSlotsFor(date, provider?.id ?? 'any') : []
  const morning = slots.filter(s => s.includes('AM'))
  const afternoon = slots.filter(s => s.includes('PM'))

  if (confirmed) {
    const when = date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    return (
      <div className="sch-shell">
        <div className="sch-wrap">
          <div className="sch-confirm" style={{ gridColumn: '1/-1' }}>
            <div className="check">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M8 17l6 6 12-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>You&apos;re <span className="it">booked.</span></h2>
            <p className="conf-sub">
              We&apos;ve sent a confirmation to <strong>{form.email || 'your inbox'}</strong>. A member of our team
              may reach out beforehand to verify insurance and answer any questions.
            </p>
            <div className="sch-confirm-card">
              <div><div className="k">Reason</div><div className="v it">{reason?.title}</div></div>
              <div><div className="k">Provider</div><div className="v">{provider?.name}</div></div>
              <div><div className="k">When</div><div className="v it">{when} at {slot}</div></div>
              <div><div className="k">Patient</div><div className="v">{form.first} {form.last}</div></div>
              <div><div className="k">Phone</div><div className="v">{form.phone}</div></div>
              <div><div className="k">Location</div><div className="v">202 W 7th St, London KY</div></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/" className="btn btn-d">Back to home</Link>
              <button className="btn btn-o" onClick={() => {
                setStepIdx(0); setReason(null); setProvider(null)
                setDate(null); setSlot(null); setForm(emptyForm)
                setCursor(nowCursor()); setConfirmed(false)
              }}>Book another <span className="arr">→</span></button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="sch-shell">
      <div className="sch-wrap">
        <div className="sch-panel">

          {/* Step 1: Reason */}
          {stepIdx === 0 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§01</span>
                <h2>What brings you in?</h2>
                <span className="hint">Select one</span>
              </div>
              <div className="sch-reasons">
                {REASONS.map((r) => (
                  <button
                    key={r.id}
                    className={`sch-reason${reason?.id === r.id ? ' selected' : ''}`}
                    onClick={() => setReason(r)}
                  >
                    <span className="icn">{ICONS[r.icon]}</span>
                    <span className="ttl">{r.title}</span>
                    <span className="dsc">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Provider */}
          {stepIdx === 1 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§02</span>
                <h2>Choose a provider</h2>
                <span className="hint">Or let us match you</span>
              </div>
              <div className="sch-providers">
                {PROVIDERS.map((p) => (
                  <button
                    key={p.id}
                    className={`sch-prov${provider?.id === p.id ? ' selected' : ''}`}
                    onClick={() => { setProvider(p); setDate(null); setSlot(null) }}
                  >
                    <div
                      className={`av${!p.avBg ? ' av-any' : ''}`}
                      style={p.avBg ? { background: AV_GR[p.avBg] } : undefined}
                    >
                      {p.init}
                    </div>
                    <div className="meta">
                      <h4>{p.name}</h4>
                      <div className="sub">{p.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {stepIdx === 2 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§03</span>
                <h2>Pick a date &amp; time</h2>
                <span className="hint">Eastern time (ET)</span>
              </div>
              <div className="sch-cal-wrap">
                <div>
                  <div className="sch-cal-head">
                    <div className="mo">
                      {MONTHS[cursor.getMonth()]} <span className="yr">{cursor.getFullYear()}</span>
                    </div>
                    <div className="sch-cal-nav">
                      <button disabled={atMin} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="Previous month">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                      <button disabled={atMax} onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="Next month">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </div>
                  </div>
                  <div className="sch-cal">
                    <div className="sch-cal-dow">
                      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d}>{d}</span>)}
                    </div>
                    <div className="sch-cal-grid">
                      {Array.from({ length: firstDow }, (_, i) => (
                        <button key={`e${i}`} className="empty" disabled />
                      ))}
                      {Array.from({ length: lastDate }, (_, i) => {
                        const d = i + 1
                        const dt = new Date(cursor.getFullYear(), cursor.getMonth(), d)
                        const cmp = new Date(dt); cmp.setHours(0,0,0,0)
                        const isToday = cmp.getTime() === today.getTime()
                        const isPast = cmp < today
                        const avail = !isPast && hasSlotsFor(dt, provider?.id ?? 'any')
                        const isSelected = date && date.getTime() === dt.getTime()
                        return (
                          <button
                            key={d}
                            disabled={!avail}
                            className={[
                              isToday ? 'today' : '',
                              isPast ? 'past' : avail ? 'avail' : 'closed',
                              isSelected ? 'selected' : '',
                            ].filter(Boolean).join(' ')}
                            onClick={() => { setDate(dt); setSlot(null) }}
                          >
                            {d}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="sch-slots-col">
                  {!date ? (
                    <div className="sch-slots-empty">Pick a date<small>to see available times</small></div>
                  ) : slots.length === 0 ? (
                    <div className="sch-slots-empty">No times available<small>Try another day</small></div>
                  ) : (
                    <>
                      <div className="slots-head">
                        <span className="dt">{date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        {', '}{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </div>
                      <div className="slots-sub">{slots.length} times available · 30 minutes each</div>
                      {morning.length > 0 && (
                        <div className="sch-slot-group">
                          <div className="lbl">Morning</div>
                          <div className="sch-slot-grid">
                            {morning.map(s => (
                              <button key={s} className={`sch-slot${slot === s ? ' selected' : ''}`} onClick={() => setSlot(s)}>{s}</button>
                            ))}
                          </div>
                        </div>
                      )}
                      {afternoon.length > 0 && (
                        <div className="sch-slot-group">
                          <div className="lbl">Afternoon</div>
                          <div className="sch-slot-grid">
                            {afternoon.map(s => (
                              <button key={s} className={`sch-slot${slot === s ? ' selected' : ''}`} onClick={() => setSlot(s)}>{s}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Patient info */}
          {stepIdx === 3 && (
            <div className="sch-step">
              <div className="sch-step-head">
                <span className="num">§04</span>
                <h2>Your information</h2>
                <span className="hint">Kept private</span>
              </div>
              <div className="sch-form">
                <div><label htmlFor="sch-first">First name *</label><input id="sch-first" type="text" value={form.first} onChange={e => setForm({...form, first: e.target.value})} required /></div>
                <div><label htmlFor="sch-last">Last name *</label><input id="sch-last" type="text" value={form.last} onChange={e => setForm({...form, last: e.target.value})} required /></div>
                <div><label htmlFor="sch-dob">Date of birth *</label><input id="sch-dob" type="text" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} placeholder="MM / DD / YYYY" required /></div>
                <div><label htmlFor="sch-phone">Phone *</label><input id="sch-phone" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="(606) 555‑0123" required /></div>
                <div className="full"><label htmlFor="sch-email">Email *</label><input id="sch-email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                <div>
                  <label htmlFor="sch-kind">New or returning? *</label>
                  <select id="sch-kind" value={form.kind} onChange={e => setForm({...form, kind: e.target.value})} required>
                    <option value="">Select one</option>
                    <option>New patient</option>
                    <option>Returning patient</option>
                  </select>
                </div>
                <div><label htmlFor="sch-ins">Insurance (optional)</label><input id="sch-ins" type="text" value={form.ins} onChange={e => setForm({...form, ins: e.target.value})} placeholder="e.g. Anthem BCBS" /></div>
                <div className="full"><label htmlFor="sch-notes">Anything we should know? (optional)</label><textarea id="sch-notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Concerns, accessibility needs, preferred contact…" /></div>
                <label className="chk full">
                  <input type="checkbox" checked={form.consent} onChange={e => setForm({...form, consent: e.target.checked})} required />
                  <span>I consent to Fuse Medical contacting me about this appointment at the phone number and email provided.</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="sch-summary">
          <div className="sch-summary-inner">
            <div className="sum-kicker">Your appointment</div>
            <h3>A visit<br />tailored for <span className="it">you.</span></h3>
            <div className="sum-row">
              <div className="k">Reason</div>
              <div className={`v${!reason ? ' empty' : ''}`}>{reason?.title ?? 'Not yet selected'}</div>
            </div>
            <div className="sum-row">
              <div className="k">Provider</div>
              <div className={`v${!provider ? ' empty' : ''}`}>{provider?.name ?? 'Not yet selected'}</div>
            </div>
            <div className="sum-row">
              <div className="k">When</div>
              <div className={`v${!(date && slot) ? ' empty' : ''}`}>
                {date && slot
                  ? `${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${slot}`
                  : 'Pick a date & time'}
              </div>
            </div>
            <div className="sum-row">
              <div className="k">Patient</div>
              <div className={`v${!form.first ? ' empty' : ''}`}>
                {form.first ? `${form.first} ${form.last}` : 'Enter your information'}
              </div>
            </div>
            <div className="sum-office">
              <div><span className="k">Visit</span>202 W 7th St<br />London, KY 40741</div>
              <div><span className="k">Questions</span><a href="tel:6067705161" style={{ color: 'inherit' }}>(606) 770‑5161</a></div>
            </div>
            <div className="sch-actions">
              <button className="sch-back" disabled={stepIdx === 0} onClick={back}>Back</button>
              <button className="sch-next" disabled={!canContinue} onClick={next}>
                {stepIdx === 3 ? <>Confirm booking <span className="arr">✓</span></> : <>Continue <span className="arr">→</span></>}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
