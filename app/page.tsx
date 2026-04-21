import Hero from '@/components/home/Hero'
import Ticker from '@/components/home/Ticker'
import Services from '@/components/home/Services'
import Story from '@/components/home/Story'
import Feature from '@/components/home/Feature'
import Contact from '@/components/home/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Services />
      <Story />
      <Feature />
      <Contact />
    </main>
  )
}
