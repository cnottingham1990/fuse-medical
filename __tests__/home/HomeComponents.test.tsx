import { render, screen } from '@testing-library/react'
import Hero from '@/components/home/Hero'
import Ticker from '@/components/home/Ticker'
import Story from '@/components/home/Story'
import Feature from '@/components/home/Feature'
import Contact from '@/components/home/Contact'

describe('Hero', () => {
  it('renders headline text', () => {
    render(<Hero />)
    expect(screen.getByText('Your health,')).toBeInTheDocument()
  })
  it('renders Book appointment link to /schedule', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Book appointment/ })).toHaveAttribute('href', '/schedule')
  })
  it('renders 4 stat items', () => {
    render(<Hero />)
    expect(screen.getAllByRole('article')).toHaveLength(4)
  })
})

describe('Ticker', () => {
  it('renders Primary Care text', () => {
    render(<Ticker />)
    expect(screen.getAllByText('Primary Care').length).toBeGreaterThan(0)
  })
})

describe('Story', () => {
  it('renders 4 pillars', () => {
    render(<Story />)
    expect(screen.getByText('Patient-centered')).toBeInTheDocument()
    expect(screen.getByText('Experienced team')).toBeInTheDocument()
    expect(screen.getByText('Whole-family care')).toBeInTheDocument()
    expect(screen.getByText('One coordinated team')).toBeInTheDocument()
  })
})

describe('Feature', () => {
  it('renders the Quinn Hunt quote', () => {
    render(<Feature />)
    expect(screen.getByText('Quinn Hunt')).toBeInTheDocument()
  })
})

describe('Contact', () => {
  it('renders phone number', () => {
    render(<Contact />)
    expect(screen.getByText('(606) 770\u20115161')).toBeInTheDocument()
  })
  it('renders address', () => {
    render(<Contact />)
    expect(screen.getByText(/202 W 7th Street/)).toBeInTheDocument()
  })
})
