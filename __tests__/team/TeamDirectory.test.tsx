import { render, screen, fireEvent } from '@testing-library/react'
import TeamGrid from '@/components/team/TeamGrid'

it('renders team member cards', () => {
  render(<TeamGrid />)
  expect(screen.getByText('Tammy Whitehead')).toBeInTheDocument()
  expect(screen.getByText('Devin Whitehead')).toBeInTheDocument()
})

it('filter buttons narrow the grid', () => {
  render(<TeamGrid />)
  fireEvent.click(screen.getByRole('button', { name: 'Operations' }))
  expect(screen.getByText('Alyssa Thomas')).toBeInTheDocument()
  expect(screen.queryByText('Krystal Philpot')).not.toBeInTheDocument()
})

it('clicking a card opens modal with bio', () => {
  render(<TeamGrid />)
  fireEvent.click(screen.getAllByText('Tammy Whitehead')[0].closest('.member-card')!)
  expect(screen.getByText(/31 years of experience/)).toBeInTheDocument()
})
