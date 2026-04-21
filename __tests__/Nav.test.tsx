import { render, screen } from '@testing-library/react'

const mockUsePathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

import Nav from '@/components/Nav'

beforeEach(() => {
  mockUsePathname.mockReturnValue('/')
})

it('renders brand name', () => {
  render(<Nav />)
  expect(screen.getByText('Fuse')).toBeInTheDocument()
})

it('marks Home link active on /', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('active')
})

it('renders Book appointment link to /schedule', () => {
  render(<Nav />)
  expect(screen.getByRole('link', { name: /Book appointment/ })).toHaveAttribute('href', '/schedule')
})

it('marks Team link active on /team and Home not active', () => {
  mockUsePathname.mockReturnValue('/team')
  render(<Nav />)
  expect(screen.getByRole('link', { name: 'Team' })).toHaveClass('active')
  expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active')
})

it('marks Restoration Living active on sub-path', () => {
  mockUsePathname.mockReturnValue('/restoration-living/some-sub-page')
  render(<Nav />)
  expect(screen.getByRole('link', { name: 'Restoration Living' })).toHaveClass('active')
})
