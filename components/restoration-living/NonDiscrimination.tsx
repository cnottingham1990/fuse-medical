const tags = [
  'Race','Religion','Gender','Gender Identity','Sexual Orientation',
  'National Origin','Disability','HIV Status','Age',
]

export default function NonDiscrimination() {
  return (
    <section className="ndiscrim">
      <div className="ndiscrim-wrap">
        <div>
          <div className="mono mono-label">№ 03 — Non-Discrimination</div>
          <h2>Everyone<br />is <span className="it">welcome.</span></h2>
        </div>
        <div>
          <p>
            Fuse Restoration Living does not discriminate in admission, housing, services, or
            employment. All applicants meeting admission criteria are considered equally under
            Fair Housing Protections.
          </p>
          <div className="nd-tags">
            {tags.map((t) => <span key={t}>{t}</span>)}
          </div>
          <p style={{ color: 'rgba(253,251,245,.6)', fontSize: '14px' }}>
            Fuse Restoration Living LLC follows all local, state and federal laws with respect
            to discrimination.
          </p>
        </div>
      </div>
    </section>
  )
}
