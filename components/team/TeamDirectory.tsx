'use client'
import { useState } from 'react'
import Image from 'next/image'
import { TEAM, AV_GRADIENTS, type TeamMember } from './teamData'

type Filter = 'all' | 'clinical' | 'support' | 'ops'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'clinical', label: 'Clinical' },
  { key: 'support', label: 'Support' },
  { key: 'ops', label: 'Operations' },
]

export default function TeamDirectory() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<TeamMember>(TEAM[0])

  const visible = filter === 'all' ? TEAM : TEAM.filter((m) => m.cat === filter)

  return (
    <div className="team-shell">
      <aside className="team-list">
        <div className="team-filter">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <div>
          {visible.map((m) => (
            <div
              key={m.id}
              className={`team-row${selected.id === m.id ? ' active' : ''}`}
              onClick={() => setSelected(m)}
            >
              <div className={`avatar ${m.av}`}>
                <span>{m.init}</span>
              </div>
              <div className="info">
                <h3>{m.name}</h3>
                <div className="role">{m.role}</div>
                <div className="cred">{m.creds}</div>
              </div>
              <svg className="caret" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
      </aside>
      <div className="team-detail">
        <div className="detail-inner" key={selected.id}>
          {selected.photo ? (
            <div className="detail-portrait" style={{ padding: 0, overflow: 'hidden' }}>
              <Image
                src={selected.photo}
                alt={selected.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          ) : (
            <div
              className="detail-portrait"
              style={{ background: AV_GRADIENTS[selected.av] }}
            >
              <span className="ph-badge">Portrait · {selected.name.split(' ')[0]}</span>
              <span className="big-init">{selected.init}</span>
            </div>
          )}
          <h2 className="detail-heading">{selected.name} · {selected.role}</h2>
          <div className="creds">{selected.creds}</div>
          <div
            className="bio"
            dangerouslySetInnerHTML={{ __html: selected.bio.split('<br><br>').map(p => `<p>${p}</p>`).join('') }}
          />
        </div>
      </div>
    </div>
  )
}
