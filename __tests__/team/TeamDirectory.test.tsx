import { render, screen, fireEvent } from '@testing-library/react'
import TeamDirectory from '@/components/team/TeamDirectory'

it('renders the team list', () => {
  render(<TeamDirectory />)
  expect(screen.getByText('Tammy Whitehead')).toBeInTheDocument()
  expect(screen.getByText('Devin Whitehead')).toBeInTheDocument()
})

it('shows Tammy detail panel by default', () => {
  render(<TeamDirectory />)
  expect(screen.getByText(/31 years of experience/)).toBeInTheDocument()
})

it('clicking a member updates the detail panel', () => {
  render(<TeamDirectory />)
  fireEvent.click(screen.getByText('Hannah Norris'))
  expect(screen.getByText(/Hannah Norris, MSN, APRN, FNP-BC/)).toBeInTheDocument()
})

it('filter buttons narrow the list', () => {
  render(<TeamDirectory />)
  fireEvent.click(screen.getByRole('button', { name: 'Operations' }))
  expect(screen.getByText('Alyssa Thomas')).toBeInTheDocument()
  expect(screen.queryByText('Krystal Philpot')).not.toBeInTheDocument()
})
