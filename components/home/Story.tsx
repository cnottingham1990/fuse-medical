const pillars = [
  {
    num: '01.',
    img: 'p1',
    title: 'Patient-centered',
    tag: 'Compassionate treatment.',
    body: 'We listen, understand, and create a plan of care that is personalized, respectful and supportive.',
  },
  {
    num: '02.',
    img: 'p2',
    title: 'Experienced team',
    tag: 'Quality you can trust.',
    body: 'Highly trained professionals bring expertise, knowledge and genuine compassion to every interaction.',
  },
  {
    num: '03.',
    img: 'p3',
    title: 'Whole-family care',
    tag: 'For children, adults, families.',
    body: 'From routine medical needs to complex behavioral health and recovery services, focused on long-term wellness.',
  },
  {
    num: '04.',
    img: 'p4',
    title: 'One coordinated team',
    tag: 'Convenient & connected.',
    body: 'Care without the stress of navigating multiple providers — accessible, connected, effective.',
  },
]

export default function Story() {
  return (
    <section className="story">
      <div className="story-wrap">
        <div className="story-head">
          <div className="story-head-l">
            <div className="mono mono-label">№ 02 — Why Fuse</div>
            <h2>
              The care<br />you deserve,<br />
              <span className="it">delivered with heart.</span>
            </h2>
          </div>
          <div className="story-head-img">
            <span className="ph-tag">Feature image · care in action</span>
          </div>
        </div>
        <div className="story-pillars">
          {pillars.map((p) => (
            <div className="pillar" key={p.num}>
              <div className={`pillar-img ${p.img}`}>
                <span className="ph-tag">Image · {p.title.toLowerCase()}</span>
              </div>
              <div className="pillar-body">
                <div className="num">{p.num}</div>
                <h4>{p.title}</h4>
                <div className="it">{p.tag}</div>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
