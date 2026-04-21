const values = [
  'Recovery is possible for every individual.',
  'Residents deserve dignity, respect, and safety.',
  'Accountability and structure are essential to early recovery.',
  'Ethical operations protect the integrity of recovery housing.',
  'Community integration strengthens sobriety outcomes.',
  'Transparency and compliance are mandatory.',
]

export default function Values() {
  return (
    <section className="values">
      <div className="values-wrap">
        <div className="mono mono-label">№ 02 — Core Values</div>
        <h2>The principles<br />we <span className="it">operate under.</span></h2>
        <div className="values-rows">
          {values.map((v, i) => (
            <div className="v-row" key={i}>
              <div className="no">0{i + 1}.</div>
              <div className="txt">{v}</div>
              <div className="arr">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
