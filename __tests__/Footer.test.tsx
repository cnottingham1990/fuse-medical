import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

it('renders the mega headline', () => {
  render(<Footer />)
  expect(screen.getByText(/Let's care/)).toBeInTheDocument()
})

it('renders the office address', () => {
  render(<Footer />)
  expect(screen.getByText('202 W 7th Street')).toBeInTheDocument()
})
