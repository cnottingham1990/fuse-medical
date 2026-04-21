import TeamHero from '@/components/team/TeamHero'
import TeamDirectory from '@/components/team/TeamDirectory'

export const metadata = { title: 'Team — Fuse Medical' }

export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <TeamDirectory />
    </main>
  )
}
