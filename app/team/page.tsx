import TeamHero from '@/components/team/TeamHero'
import TeamGrid from '@/components/team/TeamGrid'

export const metadata = { title: 'Team — Fuse Medical' }

export default function TeamPage() {
  return (
    <main>
      <TeamHero />
      <TeamGrid />
    </main>
  )
}
