import { render, screen, fireEvent } from '@testing-library/react'
import ScheduleFlow from '@/components/schedule/ScheduleFlow'

it('renders step 1 reason tiles', () => {
  render(<ScheduleFlow />)
  expect(screen.getByText('Primary care visit')).toBeInTheDocument()
  expect(screen.getByText('Behavioral health')).toBeInTheDocument()
})

it('Continue button is disabled until a reason is selected', () => {
  render(<ScheduleFlow />)
  expect(screen.getByRole('button', { name: /Continue/ })).toBeDisabled()
})

it('Continue button enables after selecting a reason', () => {
  render(<ScheduleFlow />)
  fireEvent.click(screen.getByText('Primary care visit').closest('.sch-reason')!)
  expect(screen.getByRole('button', { name: /Continue/ })).not.toBeDisabled()
})

it('advances to step 2 after clicking Continue', () => {
  render(<ScheduleFlow />)
  fireEvent.click(screen.getByText('Primary care visit').closest('.sch-reason')!)
  fireEvent.click(screen.getByRole('button', { name: /Continue/ }))
  expect(screen.getByText('Choose a provider')).toBeInTheDocument()
})
