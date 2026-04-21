import { render, screen } from '@testing-library/react'
import Services from '@/components/home/Services'

it('renders all 5 service cards', () => {
  render(<Services />)
  expect(screen.getByText('Acute & Chronic Adult Primary Care')).toBeInTheDocument()
  expect(screen.getByText('Behavioral Health Understanding & Support')).toBeInTheDocument()
  expect(screen.getByText('Pediatric Care — Tailored for Little Ones')).toBeInTheDocument()
  expect(screen.getByText('A full continuum of addiction treatment.')).toBeInTheDocument()
  expect(screen.getByText('Medication Management')).toBeInTheDocument()
})

it('renders scroll prev/next buttons', () => {
  render(<Services />)
  expect(screen.getByLabelText('Previous')).toBeInTheDocument()
  expect(screen.getByLabelText('Next')).toBeInTheDocument()
})
