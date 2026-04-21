import { render, screen } from '@testing-library/react'
import RestHero from '@/components/restoration-living/RestHero'
import Mission from '@/components/restoration-living/Mission'
import Values from '@/components/restoration-living/Values'
import NonDiscrimination from '@/components/restoration-living/NonDiscrimination'
import Testimonials from '@/components/restoration-living/Testimonials'

it('RestHero renders intake number', () => {
  render(<RestHero />)
  expect(screen.getByText('(859) 972\u20115886')).toBeInTheDocument()
})

it('Mission renders headline', () => {
  render(<Mission />)
  expect(screen.getByText(/home-like/)).toBeInTheDocument()
})

it('Values renders all 6 rows', () => {
  render(<Values />)
  expect(screen.getByText(/Recovery is possible/)).toBeInTheDocument()
  expect(screen.getByText(/Transparency and compliance/)).toBeInTheDocument()
})

it('NonDiscrimination renders tag list', () => {
  render(<NonDiscrimination />)
  expect(screen.getByText('HIV Status')).toBeInTheDocument()
})

it('Testimonials renders all 4 quotes', () => {
  render(<Testimonials />)
  expect(screen.getByText('Quinn')).toBeInTheDocument()
  expect(screen.getByText('Breckan')).toBeInTheDocument()
  expect(screen.getByText('Alyssa')).toBeInTheDocument()
  expect(screen.getByText('Krystal')).toBeInTheDocument()
})
