'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/team', label: 'Team' },
  { href: '/restoration-living', label: 'Restoration Living' },
  { href: '/schedule', label: 'Schedule' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="top" id="topnav">
      <Link href="/" className="brand">
        <div className="brand-ring" />
        <div className="brand-txt">Fuse</div>
      </Link>
      <div className="middle">
        {links.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} className={isActive ? 'active' : ''}>
              {label}
            </Link>
          )
        })}
      </div>
      <div className="right">
        <span className="dot" />
        <span className="mono">London, KY</span>
        <span className="mono">·</span>
        <span className="mono">(606) 770‑5161</span>
        <Link href="/schedule" className="btn-book">Book appointment</Link>
      </div>
    </nav>
  )
}
