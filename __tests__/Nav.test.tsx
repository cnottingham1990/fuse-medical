import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

jest.mock('next/navigation', () => ({ usePathname: () => '/' }))

it('renders brand name', () => {
  render(<Nav />)
  expect(screen.getByText('Fuse')).toBeInTheDocument()
})

it('marks Home link active on /', () => {
  render(<Nav />)
  const home = screen.getByRole('link', { name: 'Home' })
  expect(home).toHaveClass('active')
})

it('renders Book appointment link to /schedule', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /Book appointment/ })).toHaveAttribute('href', '/schedule')
})
