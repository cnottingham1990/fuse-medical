'use client'
import { useRef } from 'react'

const cards = [
  {
    index: '01 / PRIMARY CARE',
    imgClass: 'img-stripes-b',
    title: 'Acute & Chronic Adult Primary Care',
    tag: 'Reliable care for every stage of adult life.',
    body: 'Our commitment extends to both immediate and ongoing health needs, providing thorough care for adults through all their life stages.',
  },
  {
    index: '02 / BEHAVIORAL HEALTH',
    imgClass: 'img-stripes-p',
    extraClass: 'accent-p',
    title: 'Behavioral Health Understanding & Support',
    tag: 'Compassionate mental health care.',
    body: 'We prioritize mental well-being alongside physical health and recovery, offering empathetic and comprehensive support for emotional and psychological challenges.',
  },
  {
    index: '03 / PEDIATRICS',
    imgClass: 'img-stripes-crm',
    title: 'Pediatric Care — Tailored for Little Ones',
    tag: "Nurturing your child's health and development.",
    body: 'A nurturing partnership focused on the comprehensive well-being of your child. Our pediatric services go beyond basic healthcare.',
  },
  {
    index: '04 / ADDICTION TREATMENT',
    imgClass: 'img-stripes-d',
    extraClass: 'inv',
    title: 'A full continuum of addiction treatment.',
    tag: 'Meeting people at every stage of recovery.',
    body: 'Intensive Outpatient (IOP) and Outpatient services, psychoeducation, peer and community support, and targeted case management.',
    chips: ['IOP', 'Outpatient', 'Psychoeducation', 'Peer Support', 'Community', 'Case Mgmt'],
  },
  {
    index: '05 / MEDICATION MGMT',
    imgClass: 'img-stripes-b',
    title: 'Medication Management',
    tag: 'Thoughtful, evidence-based prescribing.',
    body: 'Board-certified clinicians work collaboratively with patients to support long-term wellness and improve overall quality of life.',
  },
]

export default function Services() {
  const railRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (!railRef.current) return
    const card = railRef.current.querySelector('.s-card') as HTMLElement | null
    if (!card) return
    railRef.current.scrollBy({ left: (card.offsetWidth + 16) * dir, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!railRef.current || !barRef.current) return
    const pct = railRef.current.scrollLeft / (railRef.current.scrollWidth - railRef.current.clientWidth)
    barRef.current.style.width = Math.min(100, Math.max(5, pct * 100)) + '%'
  }

  return (
    <section className="services" id="services">
      <div className="services-head">
        <div>
          <div className="mono mono-label">№ 01 — Services</div>
          <h2>Total care.<br /><span className="it">One roof.</span></h2>
        </div>
        <p>
          Physical health, mental wellness, and recovery — our integrated approach means you&apos;ll
          find the right support without navigating between multiple providers. Swipe through to explore.
        </p>
      </div>
      <div className="hscroll-wrap">
        <div className="hscroll-rail" ref={railRef} onScroll={handleScroll}>
          {cards.map((card) => (
            <article className={`s-card${card.extraClass ? ' ' + card.extraClass : ''}`} key={card.index}>
              <span className="index">{card.index}</span>
              <div className={`img-slot ${card.imgClass}`} />
              <h3>{card.title}</h3>
              <span className="tag">{card.tag}</span>
              <p>{card.body}</p>
              {card.chips && (
                <div className="sub-chips">
                  {card.chips.map((c) => <span key={c}>{c}</span>)}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
      <div className="hs-controls">
        <div className="progress"><div className="bar" ref={barRef} /></div>
        <button className="hs-arr" onClick={() => scroll(-1)} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button className="hs-arr" onClick={() => scroll(1)} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
