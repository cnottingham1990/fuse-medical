import RestHero from '@/components/restoration-living/RestHero'
import Mission from '@/components/restoration-living/Mission'
import Values from '@/components/restoration-living/Values'
import NonDiscrimination from '@/components/restoration-living/NonDiscrimination'
import Testimonials from '@/components/restoration-living/Testimonials'

export const metadata = { title: 'Restoration Living — Fuse Medical' }

export default function RestorationLivingPage() {
  return (
    <main>
      <RestHero />
      <Mission />
      <Values />
      <NonDiscrimination />
      <Testimonials />
    </main>
  )
}
