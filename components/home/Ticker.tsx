const items = [
  'Primary Care','Behavioral Health','Medication Management',
  'Addiction Treatment','Intensive Outpatient','Peer Support',
  'Community Support','Case Management','Psychoeducation',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
