'use client'
import { useState } from 'react'
import Image from 'next/image'
import { TEAM, AV_GRADIENTS, type TeamMember } from './teamData'

type Filter = 'all' | 'clinical' | 'support' | 'ops'
type CardStyle = 'feat' | 'warm' | 'sky' | ''

// pos: objectPosition (works when image is portrait — vertical overflow exists)
// shift: translateY% with scale(1.15) for square images (no natural vertical overflow)
//   positive shift = image moves down = reveals more top of photo
//   negative shift = image moves up = reveals more bottom of photo
const LAYOUT: Record<string, { span: number; style: CardStyle; pos?: string; shift?: number }> = {
  tammy:    { span: 6, style: 'feat' },
  devin:    { span: 6, style: 'warm' },
  hannah:   { span: 4, style: '' },
  cheyenne: { span: 4, style: 'sky' },
  bobbie:   { span: 4, style: 'feat', pos: 'center 15%' },
  alyssa:   { span: 4, style: 'warm' },
  quinn:    { span: 4, style: '',     shift: -6 },
  krystal:  { span: 4, style: 'sky' },
  breckan:  { span: 3, style: 'warm' },
  josie:    { span: 3, style: '' },
  kelsey:   { span: 3, style: 'sky' },
  haley:    { span: 3, style: 'feat' },
}

const filters: { key: Filter; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'clinical', label: 'Clinical Providers' },
  { key: 'support',  label: 'Clinical Support' },
  { key: 'ops',      label: 'Operations' },
]

export default function TeamGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const [modal, setModal] = useState<TeamMember | null>(null)

  const visible = filter === 'all' ? TEAM : TEAM.filter((m) => m.cat === filter)

  return (
    <div className="team-grid-section">
      <div className="team-grid-filter">
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

      <div className="team-grid">
        {visible.map((m) => {
          const { span, style, pos, shift } = LAYOUT[m.id] ?? { span: 4, style: '' as CardStyle }
          return (
            <div
              key={m.id}
              className={`member-card m-span-${span}${style ? ' ' + style : ''}`}
              onClick={() => setModal(m)}
            >
              <div className="member-portrait">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: pos ?? 'center',
                      transform: shift !== undefined ? `scale(1.15) translateY(${shift}%)` : undefined,
                    }}
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="member-init">{m.init}</div>
                )}
              </div>
              <div className="member-body">
                <div className="m-role">{m.role}</div>
                <h3>{m.name}</h3>
                <div className="m-creds">{m.creds}</div>
                <span className="m-read">Read bio</span>
              </div>
            </div>
          )
        })}
      </div>

      {modal && (
        <div className="member-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setModal(null) }}>
          <div className="member-modal">
            <div className="member-modal-portrait" style={!modal.photo ? { background: AV_GRADIENTS[modal.av] } : undefined}>
              {modal.photo ? (
                <Image
                  src={modal.photo}
                  alt={modal.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top' }}
                  sizes="360px"
                />
              ) : (
                <div className="member-modal-init">{modal.init}</div>
              )}
              <button className="member-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="member-modal-content">
              <div className="member-modal-role">{modal.role}</div>
              <div className="member-modal-name">{modal.name}</div>
              <div className="member-modal-creds">{modal.creds}</div>
              <div
                className="member-modal-bio"
                dangerouslySetInnerHTML={{
                  __html: modal.bio.split('<br><br>').map(p => `<p>${p}</p>`).join('')
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
